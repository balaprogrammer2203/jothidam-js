import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/common/SEOHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { ROUTES } from '../config/routes.config';
import './AboutPage.css';

export default function AboutPage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ta';
  const isTa = currentLang === 'ta';

  const breadcrumbs = [
    { label: isTa ? 'முகப்பு' : 'Home', link: ROUTES.HOME },
    { label: isTa ? 'எங்களைப் பற்றி' : 'About Jothidam', link: ROUTES.ABOUT, active: true }
  ];

  return (
    <>
      <SEOHead
        pageKey="about"
        breadcrumbs={[
          { name: 'Home', path: ROUTES.HOME },
          { name: isTa ? 'எங்களைப் பற்றி' : 'About Jothidam', path: ROUTES.ABOUT }
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <main className="about-page-container">
        {/* 1. Page Header (Portal Hero Banner) */}
        <header className="about-page-header">
          <div className="about-hero-content">
            <div className="about-hero-badge">🕉️</div>
            <div className="about-hero-text">
              <h1 className="about-page-title">
                {isTa ? 'எங்களைப் பற்றி' : 'About Jothidam'}
              </h1>
              <p className="about-page-subtitle">
                {isTa ? 'ஜோதிடம் போர்ட்டல் — துல்லியமான வேத கணிப்புகள் & பாரம்பரிய வழிகாட்டி' : 'Jothidam Portal — High-Precision Vedic Calculations & Traditional Guidance'}
              </p>
            </div>
          </div>
        </header>

        {/* 2. Platform Introduction */}
        <section className="about-intro-section">
          <p>
            <span className="about-brand-highlight">Jothidam</span> (Jothidam.in) என்பது
            தமிழ் மக்களுக்காக உருவாக்கப்பட்ட ஜோதிட இணையதளம். பஞ்சாங்கம், ஜாதகம், எண் கணிதம்
            போன்ற பாரம்பரிய அறிவுத் தொகுப்புகளை — தெளிவாக, நம்பகமாக, முழுக்க முழுக்கத்
            தமிழில் — அனைவருக்கும் இலவசமாகக் கிடைக்கச் செய்வதே எங்கள் நோக்கம்.
          </p>
        </section>

        {/* 3. Our Services */}
        <section className="about-section">
          <h2 className="about-section-heading">எங்கள் சேவைகள்</h2>
          <div className="about-cards-list">
            {/* Service 1: Daily Panchangam */}
            <article className="about-card">
              <h3 className="about-card-title">
                <span className="about-card-icon">📅</span>
                <span>தினசரி பஞ்சாங்கம்</span>
              </h3>
              <p className="about-card-desc">
                திதி, நட்சத்திரம், யோகம், கரணம், ராகு காலம், எமகண்டம், குளிகை, நல்ல நேரம்,
                கௌரி நல்ல நேரம் — தினமும் புதுப்பிக்கப்படும். இவற்றுள் திதி, நட்சத்திரம்,
                யோகம், கரணம், ராகு காலம், எமகண்டம், குளிகை ஆகியவை{' '}
                <span className="about-highlight-text">திருக்கணித முறையில்</span>, லஹிரி அயனாம்சத்தைப்
                (Lahiri ayanamsa) பயன்படுத்தி, அன்றைய உண்மையான சூரிய உதயத்தின் அடிப்படையில்
                வானியல்ரீதியாகக் கணக்கிடப்படுகின்றன. நல்ல நேரம், கௌரி நல்ல நேரம் ஆகியவை
                பாரம்பரிய வாரநாள் அட்டவணைகள் — அவை கணக்கிடப்படுவதில்லை (
                <a href="#kanippu" className="about-inline-link">விளக்கம்</a>).
              </p>
              <div className="about-card-actions">
                <Link to={ROUTES.PANCHANGAM.DAILY} className="about-card-link-btn">
                  📅 இன்றைய பஞ்சாங்கம் பார்க்க →
                </Link>
              </div>
            </article>

            {/* Service 2: Free Horoscope */}
            <article className="about-card">
              <h3 className="about-card-title">
                <span className="about-card-icon">🪐</span>
                <span>இலவச ஜாதகம்</span>
              </h3>
              <p className="about-card-desc">
                பிறந்த தேதி, நேரம், இடம் கொடுத்து ராசி கட்டம், நவாம்சம், தசா புத்தி
                விவரங்களுடன் உங்கள் ஜாதகத்தை இலவசமாகப் பெறலாம்.
              </p>
              <div className="about-card-actions">
                <Link to={ROUTES.HOME} className="about-card-link-btn">
                  🪐 இலவச ஜாதகம் கணிக்க →
                </Link>
              </div>
            </article>

            {/* Service 3: Numerology Tools */}
            <article className="about-card">
              <h3 className="about-card-title">
                <span className="about-card-icon">🔢</span>
                <span>எண் கணிதக் கருவிகள்</span>
              </h3>
              <p className="about-card-desc">
                பெயர் எண், பிறந்த தேதி எண், கைபேசி எண் — உங்கள் அதிர்ஷ்ட எண்களையும்
                அவற்றின் பலன்களையும் அறிய எளிய கருவிகள்.
              </p>
            </article>
          </div>
        </section>

        {/* 4. How We Calculate (Calculation Methodology) */}
        <section id="kanippu" className="about-section">
          <h2 className="about-section-heading">எப்படிக் கணக்கிடுகிறோம்</h2>
          <div className="about-cards-list">
            {/* Calculation Card 1 */}
            <article className="about-card">
              <h3 className="about-card-title">
                <span className="about-card-icon">✨</span>
                <span>கணக்கிடப்படுபவை — நகலெடுக்கப்பட்டவை அல்ல</span>
              </h3>
              <p className="about-card-desc">
                சூரிய உதயம், அஸ்தமனம், திதி, நட்சத்திரம், யோகம், கரணம், ஒன்பது கிரக நிலைகள்,
                லக்னம், ஓரை — இவை ஒவ்வொரு நாளுக்கும் தனித்தனியாக வானியல் ரீதியாகக்
                கணக்கிடப்படுகின்றன. ராகு காலம், எமகண்டம், குளிகை, கௌரி பஞ்சாங்கம் ஆகியவை
                அன்றைய <span className="about-highlight-text">உண்மையான பகல்–இரவு நேரத்தைப்</span>{' '}
                பிரித்துப் பெறப்படுகின்றன. எந்த அச்சுப் பஞ்சாங்கத்திலிருந்தும் நகலெடுக்கவில்லை;
                எந்த வெளித் தளத்திடமும் கேட்கவில்லை.
              </p>
            </article>

            {/* Calculation Card 2 */}
            <article className="about-card">
              <h3 className="about-card-title">
                <span className="about-card-icon">📜</span>
                <span>பாரம்பரிய அட்டவணைகள் — கணக்கீடு அல்ல</span>
              </h3>
              <p className="about-card-desc">
                <span className="about-highlight-text">நல்ல நேரம்</span> மற்றும்{' '}
                <span className="about-highlight-text">கௌரி நல்ல நேரம்</span> ஆகியவை வாரநாள் அடிப்படையிலான
                பாரம்பரிய அட்டவணைகள். அவை சூரிய உதயத்தைப் பொறுத்தோ இடத்தைப் பொறுத்தோ மாறாது —
                சென்னையிலும் கோயம்புத்தூரிலும் ஒன்றுதான். வாசகர்கள் எதிர்பார்ப்பதால் அவற்றைக்
                காட்டுகிறோம்; ஆனால் அவை கணக்கிடப்பட்டவை அல்ல என்பதை மறைக்காமல் சொல்கிறோம்.
                முகூர்த்த நாட்கள், கரி நாட்கள், பண்டிகை–விரத நாட்கள் ஆகியவையும் பாரம்பரியப்
                பட்டியல்களே.
              </p>
            </article>

            {/* Calculation Card 3 */}
            <article className="about-card">
              <h3 className="about-card-title">
                <span className="about-card-icon">📍</span>
                <span>இடத்திற்கேற்ற நேரம் — செயலியில் மட்டும்</span>
              </h3>
              <p className="about-card-desc">
                நிறுவப்பட்ட செயலியில் (app) சூரியன் சார்ந்த நேரங்கள் உங்கள் ஊருக்கேற்ப மாறும்.
                இணையதளத்தில் அவை சென்னை நேரம். நல்ல நேரம் இரண்டிலும் மாறாது — ஏனெனில் அது
                அட்டவணை, கணக்கீடு அல்ல. இடத்திற்கேற்ப அதை நகர்த்தினால் அது தரவை
                இட்டுக்கட்டியதாகிவிடும்.
              </p>
            </article>

            {/* Calculation Card 4 */}
            <article className="about-card">
              <h3 className="about-card-title">
                <span className="about-card-icon">🔮</span>
                <span>ஜாதகமும், பலன்களும்</span>
              </h3>
              <p className="about-card-desc">
                ஜாதகக் கட்டங்கள் ஒரு <span className="about-highlight-text">மூன்றாம் தரப்புச் சேவை</span>{' '}
                மூலம் உருவாக்கப்படுகின்றன; அதன் உள் கணிப்பு முறை எங்கள் கட்டுப்பாட்டில் இல்லை.
                ராசி பலன், எண் கணிதப் பலன் போன்றவை பாரம்பரிய விளக்கங்கள் — அவை கணக்கீட்டின்
                முடிவுகள் அல்ல.
              </p>
            </article>

            {/* Calculation Card 5: Boundary & Scientific Stance */}
            <article className="about-callout-card">
              <h3 className="about-card-title">
                <span className="about-card-icon">⚖️</span>
                <span>ஓர் எல்லை — வெளிப்படையாக</span>
              </h3>
              <p className="about-card-desc">
                கிரக நிலைகளைத் துல்லியமாகக் கணக்கிடுவது வானியல். அந்த நிலைகள் மனித வாழ்வில்
                பலன் தருகின்றன என்பது <span className="about-highlight-text">பாரம்பரிய நம்பிக்கை —
                  அறிவியல் கண்டுபிடிப்பு அல்ல</span>. கணக்கீடு துல்லியமாக இருப்பதால் அதன்
                விளக்கமும் அறிவியல் ஆகிவிடாது. இரண்டையும் நாங்கள் கலந்து சொல்வதில்லை.
              </p>
              <p className="about-testing-note">
                கணக்கீட்டைச் சரிபார்க்க ஒரு தானியங்கிச் சோதனை உள்ளது: 1,826 நாட்களுக்கான
                52,954 மதிப்புகளைத் தனியாக மறுகணக்கீடு செய்து ஒப்பிடுகிறது — வேறுபாடு பூஜ்யம்.
              </p>
            </article>
          </div>
        </section>

        {/* 5. Our Purpose / Mission */}
        <section className="about-section about-mission-section">
          <h2 className="about-section-heading">எங்கள் நோக்கம்</h2>
          <p>
            ஜோதிடம் தொடர்பான தகவல்கள் இணையத்தில் பெரும்பாலும் ஆங்கிலத்திலோ, குழப்பமான
            வடிவிலோ இருக்கின்றன. தமிழில், தெளிவான விளக்கத்துடன், மறைமுகக் கட்டணங்கள்
            இல்லாமல் இந்தத் தகவல்களை வழங்குவதே எங்கள் இலக்கு.
          </p>
          <p>
            Jothidam ஒரு <span className="about-highlight-text">புதிய, வளர்ந்து வரும் தளம்</span>.
            பாரம்பரியக் கணித முறைகளையும் வானியல் கணக்கீடுகளையும்
            அடிப்படையாகக் கொண்டு கருவிகளையும் தகவல்களையும் தொழில்நுட்ப ரீதியாக
            உருவாக்கி உள்ளோம். எங்கள் கணிப்பு முறைகளை (திருக்கணிதம், லஹிரி அயனாம்சம்)
            வெளிப்படையாகக் குறிப்பிடுகிறோம்; தவறுகள் சுட்டிக்காட்டப்பட்டால் திருத்த
            எப்போதும் தயாராக இருக்கிறோம்.
          </p>
          <p>
            கருத்துகள், திருத்தங்கள், பரிந்துரைகளுக்கு:{' '}
            <a href="#" className="about-inline-link">
              தொடர்பு பக்கம்
            </a>.
          </p>
        </section>
      </main>
    </>
  );
}
