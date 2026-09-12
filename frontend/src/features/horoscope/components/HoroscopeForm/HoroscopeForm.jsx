import React from 'react';
import NameSection from './NameSection';
import DateTimeSection from './DateTimeSection';
import GenderSection from './GenderSection';
import AyanamsaSection from './AyanamsaSection';
import LocationSection from './LocationSection';
import FormActions from './FormActions';
import Toast from '../../../../components/common/Toast';

export default function HoroscopeForm({
  formState,
  loading,
  saving,
  saveMessage,
  onClearToast,
  onSubmit,
  onSave
}) {
  const {
    fullName, setFullName,
    birthMonth, setBirthMonth,
    birthDay, setBirthDay,
    birthYear, setBirthYear,
    birthHour, setBirthHour,
    birthMinute, setBirthMinute,
    birthSecond, setBirthSecond,
    birthAmPm, setBirthAmPm,
    gender, setGender,
    ayanamsa, setAyanamsa,
    chartType, setChartType,
    placeQuery, setPlaceQuery,
    selectedPlaceId, setSelectedPlaceId,
    latitude, setLatitude,
    longitude, setLongitude,
    latDeg, setLatDeg,
    latMin, setLatMin,
    latSec, setLatSec,
    latDir, setLatDir,
    lngDeg, setLngDeg,
    lngMin, setLngMin,
    lngSec, setLngSec,
    lngDir, setLngDir,
    handleLatDmsChange,
    handleLngDmsChange,
    timezone, setTimezone,
    handleTimezoneChange,
    gmt, setGmt,
    dstType, setDstType,
    dst, setDst,
    handleDstTypeChange,
    placeSuggestions, handleSelectPlace,
    daysList,
    formErrors,
    handleFullNameChange,
    handleGenderChange,
    handlePlaceQueryChange
  } = formState;

  return (
    <form onSubmit={onSubmit} className="epanchang-form-container" noValidate>
      {/* 1. Full Name */}
      <NameSection
        value={fullName}
        onChange={handleFullNameChange || setFullName}
        error={formErrors?.fullName}
      />

      {/* 2. Gender */}
      <GenderSection
        value={gender}
        onChange={handleGenderChange || setGender}
        error={formErrors?.gender}
      />

      {/* 3. Date & Time of Birth */}
      <DateTimeSection
        birthMonth={birthMonth} setBirthMonth={setBirthMonth}
        birthDay={birthDay} setBirthDay={setBirthDay}
        birthYear={birthYear} setBirthYear={setBirthYear}
        birthHour={birthHour} setBirthHour={setBirthHour}
        birthMinute={birthMinute} setBirthMinute={setBirthMinute}
        birthSecond={birthSecond} setBirthSecond={setBirthSecond}
        birthAmPm={birthAmPm} setBirthAmPm={setBirthAmPm}
        daysList={daysList}
      />

      {/* 4. Birth Place, DMS Coordinates, Timezone (GMT), & DST */}
      <LocationSection
        placeQuery={placeQuery} setPlaceQuery={handlePlaceQueryChange || setPlaceQuery}
        selectedPlaceId={selectedPlaceId} setSelectedPlaceId={setSelectedPlaceId}
        latitude={latitude} setLatitude={setLatitude}
        longitude={longitude} setLongitude={setLongitude}
        latDeg={latDeg} latMin={latMin} latSec={latSec} latDir={latDir}
        lngDeg={lngDeg} lngMin={lngMin} lngSec={lngSec} lngDir={lngDir}
        handleLatDmsChange={handleLatDmsChange}
        handleLngDmsChange={handleLngDmsChange}
        timezone={timezone} setTimezone={setTimezone}
        handleTimezoneChange={handleTimezoneChange}
        gmt={gmt} setGmt={setGmt}
        dstType={dstType} setDstType={setDstType}
        dst={dst} setDst={setDst}
        handleDstTypeChange={handleDstTypeChange}
        placeSuggestions={placeSuggestions} handleSelectPlace={handleSelectPlace}
        placeError={formErrors?.placeQuery}
        coordsError={formErrors?.coordinates}
      />

      {/* 5. Ayanamsa */}
      <AyanamsaSection value={ayanamsa} onChange={setAyanamsa} />

      {/* 6. Form Actions (Chart Style Toggle, Calculate & Save) */}
      <FormActions
        chartType={chartType}
        setChartType={setChartType}
        loading={loading}
        saving={saving}
        onSave={onSave}
      />

      {/* Notification Toast */}
      {saveMessage && (
        <Toast message={saveMessage} onClose={onClearToast} />
      )}
    </form>
  );
}
