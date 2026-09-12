import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TABLE_CONFIGS, getTableConfig } from '../config/tableSchemas.config';
import { useAuth } from '../../../app/providers/AuthContext';

export default function AdminSidebar({
  activeTable,
  onSelectTable,
  stats = {},
  isDashboard,
  onSelectDashboard,
  isPermissionsView,
  onSelectPermissions,
  userPermissions
}) {
  const { t, i18n } = useTranslation(['admin', 'common']);
  const currentLang = i18n.language || 'en';
  const { user, logout } = useAuth();
  const isSuperAdmin = user?.role === 'superadmin';

  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Define Category & Subcategory Schema
  const CATEGORIES = useMemo(
    () => [
      {
        id: 'system',
        icon: '⚙️',
        title: t('admin:categories.system', 'System & Overview'),
        items: [
          {
            id: 'dashboard',
            type: 'dashboard',
            icon: '📊',
            title: t('admin:dashboard', 'Dashboard Overview'),
            subtitle: 'overview',
            color: '#6366f1',
            onClick: onSelectDashboard,
            isActive: isDashboard,
            count: null
          },
          {
            id: 'users',
            type: 'table',
            tableKey: 'users',
            icon: '👥',
            color: '#059669',
            onClick: () => onSelectTable('users'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'users',
            count: stats['users']?.count ?? 0
          },
          {
            id: 'permissions',
            type: 'permissions',
            icon: '🔐',
            title: t('admin:permissionManager', 'Role & Permissions Matrix'),
            subtitle: 'rbac-permissions',
            color: '#dc2626',
            badge: 'RBAC',
            onClick: onSelectPermissions,
            isActive: isPermissionsView,
            count: null,
            visible: isSuperAdmin || userPermissions?.canManagePermissions
          }
        ]
      },
      {
        id: 'clients',
        icon: '👤',
        title: t('admin:categories.clients', 'Horoscopes & Client Data'),
        items: [
          {
            id: 'horoscopeprofiles',
            type: 'table',
            tableKey: 'horoscopeprofiles',
            icon: '📜',
            color: '#8b5cf6',
            onClick: () => onSelectTable('horoscopeprofiles'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'horoscopeprofiles',
            count: stats['horoscopeprofiles']?.count ?? 0
          }
        ]
      },
      {
        id: 'astronomy',
        icon: '🪐',
        title: t('admin:categories.astronomy', 'Planetary & Zodiac Masters'),
        items: [
          {
            id: 'planets',
            type: 'table',
            tableKey: 'planets',
            icon: '☀️',
            color: '#ea580c',
            onClick: () => onSelectTable('planets'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'planets',
            count: stats['planets']?.count ?? 0
          },
          {
            id: 'rasis',
            type: 'table',
            tableKey: 'rasis',
            icon: '♈',
            color: '#0284c7',
            onClick: () => onSelectTable('rasis'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'rasis',
            count: stats['rasis']?.count ?? 0
          },
          {
            id: 'nakshatras',
            type: 'table',
            tableKey: 'nakshatras',
            icon: '✨',
            color: '#10b981',
            onClick: () => onSelectTable('nakshatras'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'nakshatras',
            count: stats['nakshatras']?.count ?? 0
          },
          {
            id: 'nakshatra-padas',
            type: 'table',
            tableKey: 'nakshatra-padas',
            icon: '🧭',
            color: '#6366f1',
            onClick: () => onSelectTable('nakshatra-padas'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'nakshatra-padas',
            count: stats['nakshatra-padas']?.count ?? 0
          },
          {
            id: 'kalachakram',
            type: 'table',
            tableKey: 'kalachakram',
            icon: '🎯',
            color: '#dc2626',
            onClick: () => onSelectTable('kalachakram'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'kalachakram',
            count: stats['kalachakram']?.count ?? 0
          }
        ]
      },
      {
        id: 'kp',
        icon: '🔮',
        title: t('admin:categories.kpSystem', 'KP Stellar Astrology'),
        items: [
          {
            id: 'kp-horary',
            type: 'table',
            tableKey: 'kp-horary',
            icon: '🔢',
            color: '#d97706',
            onClick: () => onSelectTable('kp-horary'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'kp-horary',
            count: stats['kp-horary']?.count ?? 0
          }
        ]
      },
      {
        id: 'panchangam',
        icon: '🌙',
        title: t('admin:categories.panchangam', 'Vedic Panchangam & Calendar'),
        items: [
          {
            id: 'tithis',
            type: 'table',
            tableKey: 'tithis',
            icon: '🌘',
            color: '#d97706',
            onClick: () => onSelectTable('tithis'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'tithis',
            count: stats['tithis']?.count ?? 0
          },
          {
            id: 'yogas',
            type: 'table',
            tableKey: 'yogas',
            icon: '🧘',
            color: '#059669',
            onClick: () => onSelectTable('yogas'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'yogas',
            count: stats['yogas']?.count ?? 0
          },
          {
            id: 'karanas',
            type: 'table',
            tableKey: 'karanas',
            icon: '🌗',
            color: '#6366f1',
            onClick: () => onSelectTable('karanas'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'karanas',
            count: stats['karanas']?.count ?? 0
          },
          {
            id: 'tamil-years',
            type: 'table',
            tableKey: 'tamil-years',
            icon: '🗓️',
            color: '#0891b2',
            onClick: () => onSelectTable('tamil-years'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'tamil-years',
            count: stats['tamil-years']?.count ?? 0
          },
          {
            id: 'tamil-months',
            type: 'table',
            tableKey: 'tamil-months',
            icon: '📅',
            color: '#db2777',
            onClick: () => onSelectTable('tamil-months'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'tamil-months',
            count: stats['tamil-months']?.count ?? 0
          }
        ]
      },
      {
        id: 'prasannam',
        icon: '⏱️',
        title: t('admin:categories.prasannam', 'Prasannam Astrology'),
        items: [
          {
            id: 'kadikara-prasannam',
            type: 'table',
            tableKey: 'kadikara-prasannam',
            icon: '🕰️',
            color: '#9333ea',
            onClick: () => onSelectTable('kadikara-prasannam'),
            isActive: !isDashboard && !isPermissionsView && activeTable === 'kadikara-prasannam',
            count: stats['kadikara-prasannam']?.count ?? 0
          }
        ]
      }
    ],
    [
      t,
      currentLang,
      stats,
      isDashboard,
      isPermissionsView,
      activeTable,
      isSuperAdmin,
      userPermissions,
      onSelectDashboard,
      onSelectPermissions,
      onSelectTable
    ]
  );

  // Process categories and hydrate table info
  const processedCategories = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();

    return CATEGORIES.map((cat) => {
      const visibleItems = cat.items
        .map((item) => {
          if (item.visible === false) return null;

          let displayTitle = item.title;
          let displaySubtitle = item.subtitle;

          if (item.type === 'table') {
            const tableConfig = getTableConfig(item.tableKey, currentLang);
            // Check permission
            const canRead =
              isSuperAdmin ||
              !userPermissions ||
              userPermissions.tablePermissions?.[item.tableKey]?.read !== false;
            if (!canRead) return null;

            displayTitle = tableConfig.displayName;
            displaySubtitle = item.tableKey;
          }

          // Filter matching
          if (cleanSearch) {
            const matchTitle = displayTitle?.toLowerCase().includes(cleanSearch);
            const matchSubtitle = displaySubtitle?.toLowerCase().includes(cleanSearch);
            const matchCat = cat.title.toLowerCase().includes(cleanSearch);
            if (!matchTitle && !matchSubtitle && !matchCat) {
              return null;
            }
          }

          return {
            ...item,
            displayTitle,
            displaySubtitle
          };
        })
        .filter(Boolean);

      return {
        ...cat,
        items: visibleItems
      };
    }).filter((cat) => cat.items.length > 0);
  }, [CATEGORIES, currentLang, isSuperAdmin, userPermissions, searchTerm]);

  const userDisplayName = user?.role
    ? t(`admin:permissions.roles.${user.role}`, user.fullName || user.username)
    : user?.fullName || user?.username;

  return (
    <aside className="admin-sidebar">
      {/* Sidebar Top Header Branding */}
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-title">
          <span className="admin-logo-icon">🕉️</span>
          <div>
            <h3 className="admin-panel-title">{t('admin:panelTitle', 'Admin Control Panel')}</h3>
            <span className="admin-panel-subtitle">
              {t('admin:panelSubtitle', 'Database & Tables Manager')}
            </span>
          </div>
        </div>

        {/* Sidebar Search Filter Box */}
        <div className="admin-sidebar-search-box">
          <svg
            className="sidebar-search-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="admin-sidebar-search-input"
            placeholder={t('admin:filterMenuPlaceholder', 'Filter menus & tables...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="sidebar-search-clear-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Categorized Navigation Menu */}
      <nav className="admin-nav-menu admin-categorized-nav">
        {processedCategories.map((category) => {
          const isCollapsed = !searchTerm && collapsedCategories[category.id];
          const hasActiveItem = category.items.some((it) => it.isActive);

          return (
            <div
              key={category.id}
              className={`admin-nav-category-group ${hasActiveItem ? 'has-active-item' : ''}`}
            >
              {/* Category Header with Accordion Toggle */}
              <button
                type="button"
                className={`admin-category-header-btn ${isCollapsed ? 'collapsed' : 'expanded'}`}
                onClick={() => toggleCategory(category.id)}
                title={`Toggle ${category.title}`}
              >
                <div className="category-header-left">
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-title">{category.title}</span>
                </div>
                <div className="category-header-right">
                  <span className="category-count-pill">{category.items.length}</span>
                  <svg
                    className={`category-chevron-icon ${isCollapsed ? 'is-collapsed' : ''}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {/* Subcategories List */}
              {!isCollapsed && (
                <div className="admin-subcategories-list">
                  {category.items.map((subItem) => (
                    <button
                      key={subItem.id}
                      type="button"
                      className={`admin-nav-item admin-subcategory-item ${
                        subItem.isActive ? 'active' : ''
                      }`}
                      onClick={subItem.onClick}
                    >
                      <div
                        className="nav-item-icon subcategory-icon"
                        style={{
                          backgroundColor: `${subItem.color}15`,
                          color: subItem.color
                        }}
                      >
                        {subItem.icon}
                      </div>

                      <div className="nav-item-info">
                        <span className="nav-item-title">{subItem.displayTitle}</span>
                        <span className="nav-item-desc">{subItem.displaySubtitle}</span>
                      </div>

                      {subItem.badge && (
                        <span
                          className="nav-item-count-badge rbac-badge"
                          style={{
                            borderColor: subItem.color,
                            color: subItem.color
                          }}
                        >
                          {subItem.badge}
                        </span>
                      )}

                      {subItem.count !== null && (
                        <span
                          className="nav-item-count-badge"
                          style={{ borderColor: `${subItem.color}60` }}
                        >
                          {subItem.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {processedCategories.length === 0 && (
          <div className="sidebar-no-results">
            <span>🔍 No tables match "{searchTerm}"</span>
            <button
              type="button"
              className="sidebar-reset-search-btn"
              onClick={() => setSearchTerm('')}
            >
              Reset filter
            </button>
          </div>
        )}
      </nav>

      {/* User Session Info Card in Sidebar Bottom */}
      {user && (
        <div className="sidebar-user-card admin-sidebar-user-footer">
          <div className="user-avatar-sm">
            {user.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="sidebar-user-details">
            <span className="user-display-name">{userDisplayName}</span>
            <span className={`role-pill role-${user.role}`}>
              {user.role?.toUpperCase()}
            </span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="sidebar-logout-btn"
            title={t('common:nav.logout', 'Logout')}
          >
            <svg
              width="15"
              height="15"
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
          </button>
        </div>
      )}
    </aside>
  );
}
