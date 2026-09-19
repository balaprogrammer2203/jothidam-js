import React from 'react';

/**
 * Reusable Empty State Display
 */
export default function EmptyState({
  icon = '🔍',
  title = 'No records found',
  description = 'Try adjusting your search filters or parameters.',
  action = null
}) {
  return (
    <div
      className="portal-empty-state"
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: 'var(--bg-surface-elevated, rgba(255, 255, 255, 0.02))',
        borderRadius: '12px',
        border: '1px dashed var(--border-color, rgba(255, 255, 255, 0.1))',
        margin: '20px 0'
      }}
    >
      <div style={{ fontSize: '36px', marginBottom: '12px' }}>{icon}</div>
      <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary, #fef3c7)', margin: '0 0 6px 0' }}>
        {title}
      </h4>
      <p style={{ fontSize: '13px', color: 'var(--text-muted, #a8a29e)', margin: 0 }}>
        {description}
      </p>
      {action && <div style={{ marginTop: '16px' }}>{action}</div>}
    </div>
  );
}
