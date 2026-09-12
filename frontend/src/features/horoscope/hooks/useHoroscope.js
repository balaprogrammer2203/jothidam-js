import { useState } from 'react';
import horoscopeService from '../services/horoscope.service';

export function useHoroscope() {
  const [chartResult, setChartResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const calculateChart = async (payload) => {
    setLoading(true);
    setSaveMessage(null);
    try {
      const data = await horoscopeService.generateChart(payload);
      setChartResult(data);
      return data;
    } catch (err) {
      alert('Error calculating chart: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveHoroscope = async (payload) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const data = await horoscopeService.saveHoroscope(payload);
      if (data?.success) {
        setSaveMessage({
          type: 'success',
          text: `ஜாதகம் வெற்றிகரமாக 'horoscopeprofiles' அட்டவணையில் சேமிக்கப்பட்டது! (Profile ID: ${data.profileId})`
        });
      } else {
        throw new Error(data?.error || 'Failed to save horoscope');
      }
      return data;
    } catch (err) {
      const errorText = err.response?.data?.error || err.message;
      setSaveMessage({
        type: 'error',
        text: errorText
      });
      return { success: false, error: errorText };
    } finally {
      setSaving(false);
    }
  };

  return {
    chartResult,
    setChartResult,
    loading,
    saving,
    saveMessage,
    setSaveMessage,
    calculateChart,
    saveHoroscope
  };
}
