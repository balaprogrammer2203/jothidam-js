import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import adminService from '../services/admin.service';
import { useAuth } from '../../../app/providers/AuthContext';
import { TABLE_CONFIGS, getTableConfig } from '../config/tableSchemas.config';
import AdminSidebar from '../components/AdminSidebar';
import AdminDashboard from '../components/AdminDashboard';
import DataTable from '../components/DataTable';
import RecordModal from '../components/RecordModal';
import RecordDetailModal from '../components/RecordDetailModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import PermissionManager from '../components/PermissionManager';
import AdminFooter from '../components/AdminFooter';
import LanguageSelector from '../../../components/common/LanguageSelector';
import Toast from '../../../components/common/Toast';

export default function AdminPage() {
  const { t, i18n } = useTranslation(['admin', 'common']);
  const currentLang = i18n.language || 'en';
  const { table: tableParam } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [stats, setStats] = useState({});
  const isPermissionsParam = tableParam === 'permissions';
  const [activeTable, setActiveTable] = useState(!isPermissionsParam ? tableParam : null);
  const [isDashboard, setIsDashboard] = useState(!tableParam);
  const [isPermissionsView, setIsPermissionsView] = useState(isPermissionsParam);
  const [userPermissions, setUserPermissions] = useState(null);

  // Table Data State
  const [records, setRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);

  // Modal States
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [recordModalMode, setRecordModalMode] = useState('create');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load stats and user role permissions
  useEffect(() => {
    fetchStats();
    if (user?.role) {
      fetchUserPermissions(user.role);
    }
  }, [user]);

  // Update active table when URL parameter changes
  useEffect(() => {
    if (tableParam === 'permissions') {
      setIsPermissionsView(true);
      setIsDashboard(false);
      setActiveTable(null);
    } else if (tableParam) {
      setIsPermissionsView(false);
      setActiveTable(tableParam);
      setIsDashboard(false);
      setPage(1);
      setSearchTerm('');
    } else {
      setIsPermissionsView(false);
      setIsDashboard(true);
      setActiveTable(null);
    }
  }, [tableParam]);

  // Load records when activeTable, page, limit, search, or sort changes
  useEffect(() => {
    if (activeTable && !isDashboard && !isPermissionsView) {
      fetchRecords();
    }
  }, [activeTable, page, limit, searchTerm, sortBy, sortOrder, isDashboard, isPermissionsView]);

  const fetchStats = async () => {
    try {
      const res = await adminService.getStats();
      if (res?.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    }
  };

  const fetchUserPermissions = async (role) => {
    try {
      const perms = await adminService.getRolePermission(role);
      if (perms) {
        setUserPermissions(perms);
      }
    } catch (err) {
      console.error('Failed to load role permissions:', err);
    }
  };

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await adminService.getTableRecords(activeTable, {
        page,
        limit,
        search: searchTerm,
        sortBy,
        sortOrder
      });
      setRecords(res.data || []);
      setTotalRecords(res.totalRecords || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      setToastMessage({ type: 'error', text: `${t('common:status.error', 'Error')}: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTable = (tableKey) => {
    setActiveTable(tableKey);
    setIsDashboard(false);
    setIsPermissionsView(false);
    navigate(`/admin/${tableKey}`);
  };

  const handleSelectDashboard = () => {
    setIsDashboard(true);
    setIsPermissionsView(false);
    setActiveTable(null);
    navigate('/admin');
    fetchStats();
  };

  const handleSelectPermissions = () => {
    setIsPermissionsView(true);
    setIsDashboard(false);
    setActiveTable(null);
    navigate('/admin/permissions');
  };

  const handleSortChange = (colKey) => {
    if (sortBy === colKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(colKey);
      setSortOrder('asc');
    }
  };

  // CRUD Handlers
  const handleOpenCreate = () => {
    setSelectedRecord(null);
    setRecordModalMode('create');
    setRecordModalOpen(true);
  };

  const handleOpenEdit = (record) => {
    setSelectedRecord(record);
    setRecordModalMode('edit');
    setRecordModalOpen(true);
  };

  const handleOpenView = (record) => {
    setSelectedRecord(record);
    setDetailModalOpen(true);
  };

  const handleOpenDelete = (record) => {
    setSelectedRecord(record);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (recordModalMode === 'create') {
        await adminService.createRecord(activeTable, formData);
        setToastMessage({ type: 'success', text: t('admin:table.createSuccess', 'Record created successfully!') });
      } else {
        const id = selectedRecord._id || selectedRecord[currentTableConfig.primaryKey];
        await adminService.updateRecord(activeTable, id, formData);
        setToastMessage({ type: 'success', text: t('admin:table.updateSuccess', 'Record updated successfully!') });
      }
      setRecordModalOpen(false);
      fetchRecords();
      fetchStats();
    } catch (err) {
      setToastMessage({ type: 'error', text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async (record) => {
    setIsSubmitting(true);
    try {
      const id = record._id || record[currentTableConfig.primaryKey];
      await adminService.deleteRecord(activeTable, id);
      setToastMessage({ type: 'success', text: t('admin:table.deleteSuccess', 'Record deleted successfully!') });
      setDeleteModalOpen(false);
      fetchRecords();
      fetchStats();
    } catch (err) {
      setToastMessage({ type: 'error', text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentTableConfig = getTableConfig(activeTable || 'users', currentLang);

  const userDisplayName = user?.role
    ? t(`admin:permissions.roles.${user.role}`, user.fullName || user.username)
    : (user?.fullName || user?.username);

  return (
    <div className="admin-page-layout">
      {/* Toast Alerts */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* Admin Top Header Bar with breadcrumb and dedicated right-corner Logout button */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <span className="admin-topbar-portal-label">🕉️ {t('admin:panelTitle', 'Admin Control Panel')}</span>
          <span className="admin-topbar-separator">/</span>
          <span className="admin-topbar-active-title">
            {isPermissionsView
              ? t('admin:permissionManager', 'Role & Permissions Matrix')
              : isDashboard
              ? t('admin:dashboard', 'Dashboard Overview')
              : currentTableConfig.displayName}
          </span>
        </div>

        <div className="admin-topbar-right">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-topbar-site-link"
            title={t('common:nav.home', 'Home (Opens in new window)')}
          >
            🌐 <span className="topbar-link-text">{t('common:nav.home', 'Home')}</span>
          </a>

          {/* Top Right Admin Header Language Selector */}
          <div className="admin-topbar-lang-box">
            <LanguageSelector variant="admin-header" />
          </div>

          {user && (
            <div className="admin-topbar-user-badge">
              <div className="topbar-user-avatar">
                {user.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="topbar-user-info">
                <span className="topbar-user-name">{userDisplayName}</span>
                <span className={`role-pill role-${user.role}`}>
                  {user.role?.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Dedicated Separate Logout Button in Right Corner */}
          <button
            type="button"
            onClick={logout}
            className="admin-topbar-logout-btn"
            id="admin-logout-btn"
            title={t('common:nav.logout', 'Logout')}
          >
            <svg
              className="logout-svg-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="logout-text">{t('common:nav.logout', 'Logout')}</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="admin-content-grid">
        {/* Left Sidebar */}
        <AdminSidebar
          activeTable={activeTable}
          onSelectTable={handleSelectTable}
          stats={stats}
          isDashboard={isDashboard}
          onSelectDashboard={handleSelectDashboard}
          isPermissionsView={isPermissionsView}
          onSelectPermissions={handleSelectPermissions}
          userPermissions={userPermissions}
        />

        {/* Right Content Area */}
        <main className="admin-main-panel">
          {isPermissionsView ? (
            <PermissionManager onToast={setToastMessage} />
          ) : isDashboard ? (
            <AdminDashboard
              stats={stats}
              onSelectTable={handleSelectTable}
              onRefresh={fetchStats}
            />
          ) : (
            <DataTable
              tableConfig={currentTableConfig}
              records={records}
              loading={loading}
              totalRecords={totalRecords}
              page={page}
              totalPages={totalPages}
              limit={limit}
              searchTerm={searchTerm}
              sortBy={sortBy}
              sortOrder={sortOrder}
              userPermissions={userPermissions}
              isSuperAdmin={user?.role === 'superadmin'}
              onSearchChange={setSearchTerm}
              onPageChange={setPage}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
              onSortChange={handleSortChange}
              onRefresh={fetchRecords}
              onCreate={handleOpenCreate}
              onView={handleOpenView}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          )}
        </main>
      </div>

      {/* Create / Edit Modal */}
      <RecordModal
        isOpen={recordModalOpen}
        mode={recordModalMode}
        tableConfig={currentTableConfig}
        initialData={selectedRecord}
        isSubmitting={isSubmitting}
        onClose={() => setRecordModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Detail View Modal */}
      <RecordDetailModal
        isOpen={detailModalOpen}
        tableConfig={currentTableConfig}
        record={selectedRecord}
        onClose={() => setDetailModalOpen(false)}
        onEdit={(rec) => handleOpenEdit(rec)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        tableConfig={currentTableConfig}
        record={selectedRecord}
        isDeleting={isSubmitting}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Dedicated Admin Footer */}
      <AdminFooter />
    </div>
  );
}
