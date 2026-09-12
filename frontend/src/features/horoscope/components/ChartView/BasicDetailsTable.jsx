import React from 'react';
import { useTranslation } from 'react-i18next';
import { localizeBasicDetails } from '../../../../utils/astrologyLocalization';

export default function BasicDetailsTable({ basicDetails }) {
  const { t, i18n } = useTranslation(['horoscope', 'common']);
  const currentLang = i18n.language || 'ta';

  if (!basicDetails) return null;

  // Reactively localizes all Panchangam and Natal attributes across all 6 languages
  const loc = localizeBasicDetails(basicDetails, basicDetails.nakshatraId ?? 0, currentLang);

  const rows = [
    { 
      label: t('basicDetails.tamilDate', 'Tamil / Vedic Date'), 
      value: loc.tamilDate 
    },
    { 
      label: t('basicDetails.nakshatraWithPada', 'Janma Nakshatra (Pada)'), 
      value: loc.nakshatraWithPada,
      isHighlight: true,
      badgeType: 'star'
    },
    { 
      label: t('basicDetails.vaaram', 'Weekday (Vaaram)'), 
      value: loc.vaaram 
    },
    { 
      label: t('basicDetails.tithi', 'Tithi (Lunar Day)'), 
      value: loc.tithi 
    },
    { 
      label: t('basicDetails.yogam', 'Nithya Yogam'), 
      value: loc.yogam 
    },
    { 
      label: t('basicDetails.karanam', 'Karanam (Half Tithi)'), 
      value: loc.karanam 
    },
    { 
      label: t('basicDetails.nakshatraLord', 'Nakshatra Lord'), 
      value: loc.nakshatraLord 
    },
    { 
      label: t('basicDetails.nakshatraDeity', 'Nakshatra Deity'), 
      value: loc.nakshatraDeity 
    },
    { 
      label: t('basicDetails.animal', 'Yoni Animal'), 
      value: loc.animal 
    },
    { 
      label: t('basicDetails.rasi', 'Janma Rasi (Moon Sign)'), 
      value: loc.rasi,
      isHighlight: true 
    },
    { 
      label: t('basicDetails.rasiLord', 'Rasi Lord'), 
      value: loc.rasiLord 
    },
    { 
      label: t('basicDetails.lagna', 'Ascendant (Lagna)'), 
      value: loc.lagna,
      isHighlight: true,
      badgeType: 'lagna'
    },
    { 
      label: t('basicDetails.lagnaLord', 'Lagna Lord'), 
      value: loc.lagnaLord 
    },
    { 
      label: t('basicDetails.tree', 'Sacred Tree (Vruksha)'), 
      value: loc.tree 
    },
    { 
      label: t('basicDetails.gana', 'Gana'), 
      value: loc.gana 
    },
    { 
      label: t('basicDetails.bird', 'Sacred Bird (Pakshi)'), 
      value: loc.bird 
    },
    { 
      label: t('basicDetails.yoniGender', 'Yoni Gender'), 
      value: loc.yoniGender 
    },
    { 
      label: t('basicDetails.sunrise', 'Sunrise'), 
      value: loc.sunrise 
    },
    { 
      label: t('basicDetails.sunset', 'Sunset'), 
      value: loc.sunset 
    }
  ];

  return (
    <div className="basic-details-section">
      {/* Enterprise Card Header */}
      <div className="table-card-header-bar">
        <div className="table-card-title-box">
          <span className="table-card-icon">📜</span>
          <div>
            <h3 className="basic-details-heading">{t('basicDetails.title', 'Basic Details & Panchangam')}</h3>
            <p className="basic-details-sub">
              {t('basicDetails.subtitle', 'Panchangam Attributes & Natal Specifications')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="basic-details-table-container">
        <table className="basic-details-table">
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className={row.isHighlight ? 'highlight-row' : ''}>
                <td className="basic-lbl-cell">{row.label}</td>
                <td className="basic-val-cell">
                  {row.isHighlight && row.badgeType === 'star' ? (
                    <span className="basic-star-badge">{row.value || '-'}</span>
                  ) : row.isHighlight && row.badgeType === 'lagna' ? (
                    <span className="basic-lagna-badge">{row.value || '-'}</span>
                  ) : (
                    <span className={row.isHighlight ? 'highlight-bold' : ''}>
                      {row.value || '-'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
