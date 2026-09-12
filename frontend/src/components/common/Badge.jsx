import React from 'react';

export default function Badge({ color = 'purple', icon, children }) {
  const badgeClass = `icon-badge badge-${color}`;
  return (
    <div className={badgeClass}>
      {icon}
      {children}
    </div>
  );
}
