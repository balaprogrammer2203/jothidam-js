import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TABLE_CONFIGS, getTableConfig } from '../config/tableSchemas.config';
import adminService from '../services/admin.service';

export default function PermissionManager({ onToast }) {
  const { t, i18n } = useTranslation(['admin', 'common']);
  const currentLang = i18n.language || 'en';
  const [permissionsMap, setPermissionsMap] = useState({});
  const [selectedRole, setSelectedRole] = useState('admin');
  const [currentPerms, setCurrentPerms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const ROLES_LIST = [
    { key: 'superadmin', label: t('admin:permissions.roles.superadmin', 'Super Administrator'), color: '#dc2626', badgeClass: 'role-superadmin' },
    { key: 'admin', label: t('admin:permissions.roles.admin', 'System Administrator'), color: '#2563eb', badgeClass: 'role-admin' },
    { key: 'user', label: t('admin:permissions.roles.user', 'Standard User'), color: '#16a34a', badgeClass: 'role-user' }
  ];

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    if (permissionsMap[selectedRole]) {
      setCurrentPerms(JSON.parse(JSON.stringify(permissionsMap[selectedRole])));
      setHasChanges(false);
    }
  }, [selectedRole, permissionsMap]);

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const data = await adminService.getPermissions();
      if (data) {
        setPermissionsMap(data);
        if (data[selectedRole]) {
          setCurrentPerms(JSON.parse(JSON.stringify(data[selectedRole])));
        }
      }
    } catch (err) {
      if (onToast) onToast({ type: 'error', text: `${t('common:status.error', 'Error')}: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTablePerm = (tableKey, action) => {
    if (!currentPerms) return;
    const updated = JSON.parse(JSON.stringify(currentPerms));
    if (!updated.tablePermissions) updated.tablePermissions = {};
    if (!updated.tablePermissions[tableKey]) {
      updated.tablePermissions[tableKey] = { read: false, create: false, update: false, delete: false };
    }

    updated.tablePermissions[tableKey][action] = !updated.tablePermissions[tableKey][action];
    setCurrentPerms(updated);
    setHasChanges(true);
  };

  const handleToggleGlobalFlag = (flagName) => {
    if (!currentPerms) return;
    const updated = JSON.parse(JSON.stringify(currentPerms));
    updated[flagName] = !updated[flagName];
    setCurrentPerms(updated);
    setHasChanges(true);
  };

  const handleApplyPreset = (presetType) => {
    if (!currentPerms) return;
    const updated = JSON.parse(JSON.stringify(currentPerms));
    if (!updated.tablePermissions) updated.tablePermissions = {};

    TABLE_CONFIGS.forEach((tbl) => {
      if (presetType === 'grantAll') {
        updated.tablePermissions[tbl.key] = { read: true, create: true, update: true, delete: true };
      } else if (presetType === 'readOnly') {
        updated.tablePermissions[tbl.key] = { read: true, create: false, update: false, delete: false };
      } else if (presetType === 'revokeAll') {
        updated.tablePermissions[tbl.key] = { read: false, create: false, update: false, delete: false };
      }
    });

    setCurrentPerms(updated);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!currentPerms) return;
    setSaving(true);
    try {
      const res = await adminService.updateRolePermission(selectedRole, currentPerms);
      setPermissionsMap((prev) => ({
        ...prev,
        [selectedRole]: res.data
      }));
      setHasChanges(false);
      if (onToast) {
        onToast({
          type: 'success',
          text: t('admin:permissions.saveRoles', 'Permissions saved successfully!')
        });
      }
    } catch (err) {
      if (onToast) onToast({ type: 'error', text: `${t('common:status.error', 'Error')}: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm(t('admin:permissions.resetDefaults', 'Reset all role permissions to default settings?'))) {
      return;
    }
    setSaving(true);
    try {
      await adminService.resetPermissions();
      await fetchPermissions();
      if (onToast) {
        onToast({
          type: 'success',
          text: t('admin:permissions.resetDefaults', 'Permissions reset successfully!')
        });
      }
    } catch (err) {
      if (onToast) onToast({ type: 'error', text: `${t('common:status.error', 'Error')}: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="perm-loading-state">
        <div className="spinner"></div>
        <p>{t('common:status.loading', 'Loading permission matrices...')}</p>
      </div>
    );
  }

  const isSuperAdminRole = selectedRole === 'superadmin';

  return (
    <div className="permission-manager-container">
      {/* 1. Header Banner */}
      <div className="perm-header-banner">
        <div className="perm-banner-text">
          <h2 className="perm-banner-title">🔐 {t('admin:permissions.title', 'Role-Based Access Control (RBAC)')}</h2>
          <p className="perm-banner-desc">
            {t('admin:permissions.subtitle', 'Configure granular permissions for roles across all database tables.')}
          </p>
        </div>

        <div className="perm-header-actions">
          <button
            type="button"
            className="admin-btn secondary-btn"
            onClick={handleResetDefaults}
            disabled={saving}
            title={t('admin:permissions.resetDefaults', 'Reset All Roles to Default Settings')}
          >
            🔄 {t('admin:permissions.resetDefaults', 'Reset to Defaults')}
          </button>

          <button
            type="button"
            className="admin-btn primary-btn save-perm-btn"
            onClick={handleSave}
            disabled={saving || !hasChanges}
          >
            {saving
              ? t('common:buttons.saving', 'Saving...')
              : hasChanges
              ? `💾 ${t('admin:table.saveChanges', 'Save Changes')}*`
              : `✅ ${t('admin:permissions.saveRoles', 'Saved')}`}
          </button>
        </div>
      </div>

      {/* 2. Role Selector Tabs */}
      <div className="perm-role-tabs-bar">
        {ROLES_LIST.map((r) => {
          const isActive = selectedRole === r.key;
          return (
            <button
              key={r.key}
              type="button"
              className={`perm-role-tab ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedRole(r.key)}
              style={{ borderBottomColor: isActive ? r.color : 'transparent' }}
            >
              <span className={`role-pill ${r.badgeClass}`}>{r.key.toUpperCase()}</span>
              <span className="role-tab-title">{r.label}</span>
            </button>
          );
        })}
      </div>

      {currentPerms && (
        <div className="perm-editor-content">
          {/* 3. Global Privileges Card */}
          <div className="perm-card global-privileges-card">
            <h3 className="perm-card-title">{t('admin:permissions.title', 'Role-Based Access Control (RBAC)')}</h3>
            <div className="global-toggles-grid">
              <label className="perm-toggle-item">
                <input
                  type="checkbox"
                  checked={!!currentPerms.canAccessAdmin}
                  onChange={() => handleToggleGlobalFlag('canAccessAdmin')}
                  disabled={isSuperAdminRole}
                />
                <div className="toggle-text">
                  <span className="toggle-title">{t('admin:permissions.canAccessAdmin', 'Access Admin Panel')}</span>
                  <span className="toggle-desc">Allows accessing /admin panel</span>
                </div>
              </label>

              <label className="perm-toggle-item">
                <input
                  type="checkbox"
                  checked={!!currentPerms.canManageUsers}
                  onChange={() => handleToggleGlobalFlag('canManageUsers')}
                  disabled={isSuperAdminRole}
                />
                <div className="toggle-text">
                  <span className="toggle-title">{t('admin:permissions.canManageUsers', 'Manage Users')}</span>
                  <span className="toggle-desc">Create, edit users and update credentials</span>
                </div>
              </label>

              <label className="perm-toggle-item">
                <input
                  type="checkbox"
                  checked={!!currentPerms.canManagePermissions}
                  onChange={() => handleToggleGlobalFlag('canManagePermissions')}
                  disabled={isSuperAdminRole}
                />
                <div className="toggle-text">
                  <span className="toggle-title">{t('admin:permissions.canManagePermissions', 'Manage Permissions Matrix')}</span>
                  <span className="toggle-desc">Modify permissions for other roles</span>
                </div>
              </label>
            </div>
          </div>

          {/* 4. Granular Tables CRUD Matrix */}
          <div className="perm-card tables-matrix-card">
            <div className="matrix-header-row">
              <div>
                <h3 className="perm-card-title">{t('admin:permissions.tablePermissions', 'Table CRUD Permissions')}</h3>
                <span className="perm-card-subtitle">
                  {selectedRole.toUpperCase()} Permissions
                </span>
              </div>

              {/* Presets */}
              <div className="preset-buttons-group">
                <button
                  type="button"
                  className="preset-btn grant-all-btn"
                  onClick={() => handleApplyPreset('grantAll')}
                >
                  ➕ Grant All
                </button>
                <button
                  type="button"
                  className="preset-btn read-only-btn"
                  onClick={() => handleApplyPreset('readOnly')}
                >
                  👁️ Read Only
                </button>
                <button
                  type="button"
                  className="preset-btn revoke-all-btn"
                  onClick={() => handleApplyPreset('revokeAll')}
                >
                  🚫 Revoke All
                </button>
              </div>
            </div>

            <div className="matrix-table-wrapper">
              <table className="perm-matrix-table">
                <thead>
                  <tr>
                    <th className="th-table-info">Table / Collection</th>
                    <th className="th-perm">👁️ {t('admin:permissions.read', 'Read')}</th>
                    <th className="th-perm">➕ {t('admin:permissions.create', 'Create')}</th>
                    <th className="th-perm">✏️ {t('admin:permissions.update', 'Update')}</th>
                    <th className="th-perm">🗑️ {t('admin:permissions.delete', 'Delete')}</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_CONFIGS.map((rawTbl) => {
                    const tbl = getTableConfig(rawTbl.key, currentLang);
                    const tablePerm = currentPerms.tablePermissions?.[tbl.key] || {
                      read: false,
                      create: false,
                      update: false,
                      delete: false
                    };

                    return (
                      <tr key={tbl.key}>
                        <td className="td-table-meta">
                          <div className="table-meta-box">
                            <span
                              className="tbl-icon-badge"
                              style={{ backgroundColor: `${tbl.color}15`, color: tbl.color }}
                            >
                              📁
                            </span>
                            <div>
                              <strong className="tbl-name-ta">{tbl.displayName}</strong>
                              <span className="tbl-key-en">{tbl.key}</span>
                            </div>
                          </div>
                        </td>

                        <td className="td-check">
                          <label className="checkbox-custom-label">
                            <input
                              type="checkbox"
                              checked={!!tablePerm.read}
                              onChange={() => handleToggleTablePerm(tbl.key, 'read')}
                            />
                            <span className="checkbox-text">{t('admin:permissions.read', 'Read')}</span>
                          </label>
                        </td>

                        <td className="td-check">
                          <label className="checkbox-custom-label">
                            <input
                              type="checkbox"
                              checked={!!tablePerm.create}
                              onChange={() => handleToggleTablePerm(tbl.key, 'create')}
                            />
                            <span className="checkbox-text">{t('admin:permissions.create', 'Create')}</span>
                          </label>
                        </td>

                        <td className="td-check">
                          <label className="checkbox-custom-label">
                            <input
                              type="checkbox"
                              checked={!!tablePerm.update}
                              onChange={() => handleToggleTablePerm(tbl.key, 'update')}
                            />
                            <span className="checkbox-text">{t('admin:permissions.update', 'Update')}</span>
                          </label>
                        </td>

                        <td className="td-check">
                          <label className="checkbox-custom-label">
                            <input
                              type="checkbox"
                              checked={!!tablePerm.delete}
                              onChange={() => handleToggleTablePerm(tbl.key, 'delete')}
                            />
                            <span className="checkbox-text">{t('admin:permissions.delete', 'Delete')}</span>
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
