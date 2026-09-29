import React, { useMemo } from 'react';
import { calculateJamakkolKeyNotes } from '../../../utils/jamakkol.utils';

/**
 * JamakolKeyNotesCard (முக்கிய பிரசன்ன குறிப்புகள்)
 * Displays the 11 classical essential observation points:
 * 1. உதயத்தில் நின்ற கிரகம் பார்க்கும் கிரகங்கள்
 * 2. உதயத்தை பார்க்கும் கிரகங்கள்
 * 3. உதயத்திலிருந்து ஆருடம் உள்ள இடம்
 * 4. ஆருடத்திலிருந்து உதயம் உள்ள இடம்
 * 5. ஆருடத்தில் நின்ற கிரகம் பார்க்கும் கிரகங்கள்
 * 6. ஆருடத்தை பார்க்கும் கிரகங்கள்
 * 7. உதயம் அடுத்ததாக தொட இருக்கும் கிரகம்
 * 8. ஆருடம் அடுத்ததாக தொட இருக்கும் கிரகம்
 * 9. கவிப்பை பார்க்கும் கிரகங்கள்
 * 10. கவிப்பில் நின்ற கிரகம் பார்க்கும் கிரகங்கள்
 * 11. கவிப்பு அடுத்ததாக தொட இருக்கும் கிரகம்
 */
export default function JamakolKeyNotesCard({ chartData, lang = 'ta' }) {
  const isTa = lang === 'ta';

  const notes = useMemo(() => {
    if (!chartData) return null;
    if (isTa && chartData.keyNotesTa) return chartData.keyNotesTa;
    if (!isTa && chartData.keyNotesEn) return chartData.keyNotesEn;
    if (chartData.keyNotes) return chartData.keyNotes;
    return calculateJamakkolKeyNotes(chartData, lang);
  }, [chartData, lang, isTa]);

  if (!notes) return null;

  return (
    <div className="jk-key-notes-card">
      <div className="jk-key-notes-header">
        <span className="jk-key-notes-icon">📖</span>
        <h3 className="jk-key-notes-title">
          {isTa ? 'முக்கிய பிரசன்ன குறிப்புகள்' : 'Key Prasanna Notes'}
        </h3>
      </div>

      <div className="jk-key-notes-content">
        {/* Group 1: Udhayam & Distance */}
        <div className="jk-kn-group">
          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'உதயத்தில் நின்ற கிரகம் பார்க்கும் கிரகங்கள்' : 'Planets in Udhayam aspecting'}:
            </span>
            <span className="jk-kn-val jk-val-pairs">{notes.udhayamStandingAspects}</span>
          </div>

          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'உதயத்தை பார்க்கும் கிரகங்கள்' : 'Planets aspecting Udhayam'}:
            </span>
            <span className="jk-kn-val jk-val-aspects">{notes.udhayamAspectingPlanets}</span>
          </div>

          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'உதயத்திலிருந்து ஆருடம் உள்ள இடம்' : 'House of Aarudam from Udhayam'}:
            </span>
            <span className="jk-kn-val jk-val-number">{notes.arudamFromUdhayam}</span>
          </div>

          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'ஆருடத்திலிருந்து உதயம் உள்ள இடம்' : 'House of Udhayam from Aarudam'}:
            </span>
            <span className="jk-kn-val jk-val-number">{notes.udhayamFromArudam}</span>
          </div>
        </div>

        {/* Group 2: Aarudam */}
        <div className="jk-kn-group">
          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'ஆருடத்தில் நின்ற கிரகம் பார்க்கும் கிரகங்கள்' : 'Planets in Aarudam aspecting'}:
            </span>
            <span className="jk-kn-val jk-val-pairs">{notes.aarudamStandingAspects}</span>
          </div>

          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'ஆருடத்தை பார்க்கும் கிரகங்கள்' : 'Planets aspecting Aarudam'}:
            </span>
            <span className="jk-kn-val jk-val-aspects">{notes.aarudamAspectingPlanets}</span>
          </div>
        </div>

        {/* Group 3: Next touches (Forward) */}
        <div className="jk-kn-group">
          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'உதயம் அடுத்ததாக தொட இருக்கும் கிரகம்' : 'Next planet Udhayam will touch'}:
            </span>
            <span className="jk-kn-val jk-val-touch">{notes.udhayamNextTouch}</span>
          </div>

          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'ஆருடம் அடுத்ததாக தொட இருக்கும் கிரகம்' : 'Next planet Aarudam will touch'}:
            </span>
            <span className="jk-kn-val jk-val-touch">{notes.aarudamNextTouch}</span>
          </div>
        </div>

        {/* Group 4: Kavippu */}
        <div className="jk-kn-group">
          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'கவிப்பை பார்க்கும் கிரகங்கள்' : 'Planets aspecting Kavippu'}:
            </span>
            <span className="jk-kn-val jk-val-aspects">{notes.kavippuAspectingPlanets}</span>
          </div>

          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'கவிப்பில் நின்ற கிரகம் பார்க்கும் கிரகங்கள்' : 'Planets in Kavippu aspecting'}:
            </span>
            <span className="jk-kn-val jk-val-pairs">{notes.kavippuStandingAspects}</span>
          </div>

          <div className="jk-kn-row">
            <span className="jk-kn-label">
              {isTa ? 'கவிப்பு அடுத்ததாக தொட இருக்கும் கிரகம்' : 'Next planet Kavippu will touch'}:
            </span>
            <span className="jk-kn-val jk-val-touch">
              {notes.kavippuNextTouchPlanet} {notes.kavippuNextTouchDegree} <span className="jk-kn-retro">{notes.kavippuNextTouchRetro}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
