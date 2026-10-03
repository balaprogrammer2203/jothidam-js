import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import horoscopeService from '../services/horoscope.service';

export function useHoroscope() {
  const { i18n } = useTranslation();
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
      alert('Error calculating chart: ' + (err.response?.data?.error || err.message));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveHoroscope = async (payload) => {
    setSaving(true);
    setSaveMessage(null);
    const isTa = i18n.language === 'ta';
    try {
      const data = await horoscopeService.saveHoroscope(payload);
      if (data?.success) {
        setSaveMessage({
          type: 'success',
          text: isTa
            ? `ஜாதகம் வெற்றிகரமாக உங்கள் கணக்கில் சேமிக்கப்பட்டது! (Profile ID: ${data.profileId}) - "My Account" பக்கத்தில் எப்போதும் பார்க்கலாம்.`
            : `Horoscope successfully saved to your account! (Profile ID: ${data.profileId}) - You can view and analyze it anytime in "My Account".`
        });
      } else {
        throw new Error(data?.error || 'Failed to save horoscope');
      }
      return data;
    } catch (err) {
      const errorText = err.response?.data?.error 
        || (typeof err.response?.data === 'string' && err.response.data.length < 200 ? err.response.data : null) 
        || err.message 
        || 'Error saving horoscope';
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
