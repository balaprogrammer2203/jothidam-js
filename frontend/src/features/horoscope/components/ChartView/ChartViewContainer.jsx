import React from 'react';
import { useTranslation } from 'react-i18next';
import LocationInfoBanner from './LocationInfoBanner';
import VedicChartCard from './VedicChartCard';
import NorthIndianChartCard from './NorthIndianChartCard';
import PlanetaryPositionsTable from './PlanetaryPositionsTable';
import BasicDetailsTable from './BasicDetailsTable';

export default function ChartViewContainer({
  chartResult,
  fullName,
  placeQuery,
  latitude,
  longitude,
  dob,
  tob,
  chartType = 'south'
}) {
  const { t } = useTranslation('horoscope');

  if (!chartResult) return null;

  const isNorth = chartType === 'north';

  return (
    <div className="charts-view-section">
      {/* 1. Location & Meta Info Banner */}
      <LocationInfoBanner
        fullName={fullName}
        formattedAddress={chartResult.formattedAddress || placeQuery}
        latitude={chartResult.latitude ?? latitude}
        longitude={chartResult.longitude ?? longitude}
        gmt={chartResult.gmt}
        dst={chartResult.dst}
        timezone={chartResult.timezone}
        ayanamsaName={chartResult.ayanamsaName}
        ayanamsaType={chartResult.ayanamsaType}
        ayanamsa={chartResult.ayanamsa}
      />

      {/* 2. Side-by-Side Vedic Charts (D1 Rasi & D9 Navamsa) */}
      <div className="side-by-side-grid">
        {isNorth ? (
          <>
            {/* North Indian Diamond Rasi Chart (D1) */}
            <NorthIndianChartCard
              gridData={chartResult.rasiGrid}
              title={t('chart.rasiChartTitle', 'Rasi Chart (D1)')}
              centerLabel={t('chart.rasiCenterLabel', 'Rasi')}
              showDegrees={true}
              dob={chartResult.dob || dob}
              tob={chartResult.tob || tob}
              nakshatra={chartResult.moonNakshatra}
              lagnaRasiId={chartResult.ascendantRasiId}
            />

            {/* North Indian Diamond Navamsa Chart (D9) */}
            <NorthIndianChartCard
              gridData={chartResult.navamsaGrid}
              title={t('chart.navamsaChartTitle', 'Navamsa Chart (D9)')}
              centerLabel={t('chart.navamsaCenterLabel', 'Navamsa')}
              showDegrees={false}
              dob={chartResult.dob || dob}
              tob={chartResult.tob || tob}
              nakshatra=""
              lagnaRasiId={chartResult.ascendantNavamsaRasiId}
            />
          </>
        ) : (
          <>
            {/* South Indian 4x4 Rasi Chart (D1) */}
            <VedicChartCard
              gridData={chartResult.rasiGrid}
              title={t('chart.rasiChartTitle', 'Rasi Chart (D1)')}
              centerLabel={t('chart.rasiCenterLabel', 'Rasi')}
              showDegrees={true}
              dob={chartResult.dob || dob}
              tob={chartResult.tob || tob}
              lagnaRasiId={chartResult.ascendantRasiId}
              place={chartResult.formattedAddress || placeQuery}
              latitude={chartResult.latitude ?? latitude}
              longitude={chartResult.longitude ?? longitude}
              ayanamsaName={chartResult.ayanamsaName || chartResult.ayanamsaType}
              ayanamsaNameTa={chartResult.ayanamsaNameTa}
              ayanamsaValue={chartResult.ayanamsa}
            />

            {/* South Indian 4x4 Navamsa Chart (D9) */}
            <VedicChartCard
              gridData={chartResult.navamsaGrid}
              title={t('chart.navamsaChartTitle', 'Navamsa Chart (D9)')}
              centerLabel={t('chart.navamsaCenterLabel', 'Navamsa')}
              showDegrees={false}
              dob={chartResult.dob || dob}
              tob={chartResult.tob || tob}
              lagnaRasiId={chartResult.ascendantNavamsaRasiId}
              place={chartResult.formattedAddress || placeQuery}
              latitude={chartResult.latitude ?? latitude}
              longitude={chartResult.longitude ?? longitude}
              ayanamsaName={chartResult.ayanamsaName || chartResult.ayanamsaType}
              ayanamsaNameTa={chartResult.ayanamsaNameTa}
              ayanamsaValue={chartResult.ayanamsa}
            />
          </>
        )}
      </div>

      {/* 3. Horizontal Side-by-Side: Planetary Positions Table & Basic Details Table */}
      <div className="planetary-details-horizontal-layout">
        <PlanetaryPositionsTable planets={chartResult.planets} />
        <BasicDetailsTable basicDetails={chartResult.basicDetails} />
      </div>
    </div>
  );
}
