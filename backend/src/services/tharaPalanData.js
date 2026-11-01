/**
 * Master Data for 27 Nakshatra Thara Palan (Navatara Cycle)
 * Supports 6 Languages: English, Tamil, Hindi, Telugu, Kannada, Malayalam
 */

export const NAVATARA_BASE_DEFS = {
  1: {
    taraNumber: 1,
    key: 'janma',
    ratingType: 'moderate',
    isAuspicious: false,
    badgeBg: '#fef3c7',
    badgeColor: '#b45309',
    taraName: {
      name: 'Janma',
      nameTa: 'ஜன்மம்',
      nameHi: 'जन्म',
      nameTe: 'జన్మ',
      nameKn: 'ಜನ್ಮ',
      nameMl: 'ജന്മം'
    },
    status: {
      name: 'Moderate',
      nameTa: 'மிதம்',
      nameHi: 'मध्यम',
      nameTe: 'మధ్యమం',
      nameKn: 'ಮಧ್ಯಮ',
      nameMl: 'മിതമായത്'
    },
    palan: {
      name: 'Body, health, and peace of mind - requires careful and measured actions.',
      nameTa: 'உடல்நலம், மன அமைதி ஆகியவற்றில் கூடுதல் கவனம் தேவை.',
      nameHi: 'स्वास्थ्य और मानसिक शांति पर ध्यान दें, सावधानी आवश्यक है।',
      nameTe: 'ఆరోగ్యం మరియు మనశ్శాంతిపై శ్రద్ధ అవసరం.',
      nameKn: 'ಆರೋಗ್ಯ ಮತ್ತು ಮನಸ್ಸಿನ ಶಾಂತಿಯ ಬಗ್ಗೆ ಕಾಳಜಿ ವಹಿಸಿ.',
      nameMl: 'ആരോഗ്യത്തിലും മനസ്സിന്റെ സമാധാനത്തിലും ശ്രദ്ധ വേണം.'
    }
  },
  2: {
    taraNumber: 2,
    key: 'sampat',
    ratingType: 'good',
    isAuspicious: true,
    badgeBg: '#dcfce7',
    badgeColor: '#15803d',
    taraName: {
      name: 'Sampat',
      nameTa: 'சம்பத்து',
      nameHi: 'सम्पत्',
      nameTe: 'సంపత్',
      nameKn: 'ಸಂಪತ್',
      nameMl: 'സമ്പത്ത്'
    },
    status: {
      name: 'Auspicious',
      nameTa: 'சுபம்',
      nameHi: 'शुभ',
      nameTe: 'శుభం',
      nameKn: 'ಶುಭ',
      nameMl: 'ശുഭം'
    },
    palan: {
      name: 'Wealth, financial gain, and accomplishment of desires.',
      nameTa: 'செல்வம், தன லாபம், காரிய சித்தி தரும் சுப நிலை.',
      nameHi: 'धन, संपत्ति और कार्यों में मनोवांछित सफलता।',
      nameTe: 'ధన లాభం, సంపద మరియు కార్య సిద్ధి కలుగును.',
      nameKn: 'ಧನ ಲಾಭ, ಸಂಪತ್ತು ಮತ್ತು ಕಾರ್ಯ ಸಿದ್ಧಿ ಉಂಟಾಗುತ್ತದೆ.',
      nameMl: 'ധനലാഭം, സമൃദ്ധി, കാര്യവിജയം എന്നിവ ലഭിക്കും.'
    }
  },
  3: {
    taraNumber: 3,
    key: 'vipat',
    ratingType: 'bad',
    isAuspicious: false,
    badgeBg: '#fee2e2',
    badgeColor: '#b91c1c',
    taraName: {
      name: 'Vipat',
      nameTa: 'விபத்து',
      nameHi: 'विपत्',
      nameTe: 'విపత్',
      nameKn: 'ವಿಪತ್',
      nameMl: 'വിപത്ത്'
    },
    status: {
      name: 'Inauspicious',
      nameTa: 'அசுபம்',
      nameHi: 'अशुभ',
      nameTe: 'అశుభం',
      nameKn: 'ಅಶುಭ',
      nameMl: 'അശുഭം'
    },
    palan: {
      name: 'Danger, obstacles, and potential loss. Caution is advised.',
      nameTa: 'ஆபத்து, நஷ்டம், தடைகள் ஏற்பட வாய்ப்பு. விழிப்புணர்வு தேவை.',
      nameHi: 'हानि, बाधाएं और विपत्तियां आ सकती हैं। सतर्क रहें।',
      nameTe: 'నష్టం, ఆటంకాలు మరియు ప్రమాదాలకు అవకాశం.',
      nameKn: 'ನಷ್ಟ, ಅಡೆತಡೆಗಳು ಮತ್ತು ಅಪಾಯದ ಸಾಧ್ಯತೆ. ಎಚ್ಚರವಿರಲಿ.',
      nameMl: 'നഷ്ടം, തടസ്സങ്ങൾ, ആപത്തുകൾ എന്നിവ ഉണ്ടാകാം.'
    }
  },
  4: {
    taraNumber: 4,
    key: 'kshema',
    ratingType: 'good',
    isAuspicious: true,
    badgeBg: '#dcfce7',
    badgeColor: '#15803d',
    taraName: {
      name: 'Kshema',
      nameTa: 'க்ஷேமம்',
      nameHi: 'क्षेम',
      nameTe: 'క్షేమ',
      nameKn: 'ಕ್ಷೇಮ',
      nameMl: 'ക്ഷേമം'
    },
    status: {
      name: 'Auspicious',
      nameTa: 'சுபம்',
      nameHi: 'शुभ',
      nameTe: 'శుభం',
      nameKn: 'ಶುಭ',
      nameMl: 'ശുഭം'
    },
    palan: {
      name: 'Safety, well-being, happiness, and family comfort.',
      nameTa: 'பாதுகாப்பு, சுகம், நல்வாழ்வு, குடும்ப நலன் கூடும்.',
      nameHi: 'सुरक्षा, आराम, सुख-शांति और कल्याणकारी परिणाम।',
      nameTe: 'రక్షణ, సౌఖ్యం, క్షేమం మరియు శుభ ఫలితాలు.',
      nameKn: 'ರಕ್ಷಣೆ, ಸೌಖ್ಯ, ಕ್ಷೇಮ ಮತ್ತು ಶುಭ ಫಲಗಳು.',
      nameMl: 'സുരക്ഷിതത്വം, സുഖം, ക്ഷേമം എന്നിവ ഉറപ്പാകുന്നു.'
    }
  },
  5: {
    taraNumber: 5,
    key: 'pratyak',
    ratingType: 'bad',
    isAuspicious: false,
    badgeBg: '#fee2e2',
    badgeColor: '#b91c1c',
    taraName: {
      name: 'Pratyak',
      nameTa: 'பிரத்யக்',
      nameHi: 'प्रत्यक्',
      nameTe: 'ప్రత్యక్',
      nameKn: 'ಪ್ರತ್ಯಕ್',
      nameMl: 'പ്രത്യക്ക്'
    },
    status: {
      name: 'Inauspicious',
      nameTa: 'அசுபம்',
      nameHi: 'अशुभ',
      nameTe: 'అశుభం',
      nameKn: 'ಅಶುಭ',
      nameMl: 'അശുഭം'
    },
    palan: {
      name: 'Opposition, enmity, delays, and task obstructions.',
      nameTa: 'எதிர்ப்புகள், விரோதங்கள், காரியத் தடைகள் வரலாம்.',
      nameHi: 'विरोध, रुकावटें और कठिनाइयां आ सकती हैं।',
      nameTe: 'వ్యతిరేకతలు, శత్రుత్వం మరియు పనులలో అడ్డంకులు.',
      nameKn: 'ವಿರೋಧ, ಅಡೆತಡೆಗಳು ಮತ್ತು ತೊಂದರೆಗಳು ಬರಬಹುದು.',
      nameMl: 'എതിർപ്പുകൾ, തടസ്സങ്ങൾ എന്നിവ നേരിടേണ്ടി വരാം.'
    }
  },
  6: {
    taraNumber: 6,
    key: 'sadhana',
    ratingType: 'good',
    isAuspicious: true,
    badgeBg: '#dcfce7',
    badgeColor: '#15803d',
    taraName: {
      name: 'Sadhana',
      nameTa: 'சாதகம்',
      nameHi: 'साधक',
      nameTe: 'సాధక',
      nameKn: 'ಸಾಧಕ',
      nameMl: 'സാധകം'
    },
    status: {
      name: 'Auspicious',
      nameTa: 'சுபம்',
      nameHi: 'शुभ',
      nameTe: 'శుభం',
      nameKn: 'ಶುಭ',
      nameMl: 'ശുഭം'
    },
    palan: {
      name: 'Success in efforts, task fulfillment, and favorable outcome.',
      nameTa: 'முயற்சிகள் வெற்றி பெறும், காரிய சித்தி, அனுகூல நிலை.',
      nameHi: 'प्रयासों में सफलता, मनोकामना पूर्ति और प्रगति।',
      nameTe: 'ప్రయత్నాలలో విజయం, కార్య సిద్ధి కలుగును.',
      nameKn: 'ಪ್ರಯತ್ನಗಳಲ್ಲಿ ಯಶಸ್ಸು, ಕಾರ್ಯ ಸಿದ್ಧಿ ಉಂಟಾಗುತ್ತದೆ.',
      nameMl: 'ശ്രമങ്ങൾ വിജയിക്കും, കാര്യസിദ്ധി കൈവരും.'
    }
  },
  7: {
    taraNumber: 7,
    key: 'naidhana',
    ratingType: 'bad',
    isAuspicious: false,
    badgeBg: '#fee2e2',
    badgeColor: '#991b1b',
    taraName: {
      name: 'Naidhana (Vadha)',
      nameTa: 'வதம் (நைதனம்)',
      nameHi: 'वध (नैधन)',
      nameTe: 'వధ (నైధన)',
      nameKn: 'ವಧ (ನೈಧನ)',
      nameMl: 'വധം (നൈധനം)'
    },
    status: {
      name: 'Harmful',
      nameTa: 'மிகத் தீது',
      nameHi: 'कष्टकारी',
      nameTe: 'తీవ్ర అశుభం',
      nameKn: 'ತೀವ್ರ ಅಶುಭ',
      nameMl: 'ഏറ്റവും ദോഷം'
    },
    palan: {
      name: 'Severe blockages, hardship, and critical danger. Avoid vital ventures.',
      nameTa: 'கடும் இன்னல்கள், காரிய முடக்கம், இழப்புகள் ஏற்படலாம்.',
      nameHi: 'गंभीर परेशानियां, रुकावटें और बड़ी हानि का भय।',
      nameTe: 'తీవ్రమైన ఆటంకాలు, పనులలో స్తబ్దత మరియు నష్టాలు.',
      nameKn: 'ತೀವ್ರ ತೊಂದರೆಗಳು, ಕಾರ್ಯ ಸ್ಥಗಿತ ಮತ್ತು ನಷ್ಟಗಳು.',
      nameMl: 'കഠിനമായ തടസ്സങ്ങൾ, കാര്യസ്തംഭനം എന്നിവയുണ്ടാകാം.'
    }
  },
  8: {
    taraNumber: 8,
    key: 'mitra',
    ratingType: 'good',
    isAuspicious: true,
    badgeBg: '#dcfce7',
    badgeColor: '#15803d',
    taraName: {
      name: 'Mitra',
      nameTa: 'மைத்ரம்',
      nameHi: 'मित्र',
      nameTe: 'మిత్ర',
      nameKn: 'ಮಿತ್ರ',
      nameMl: 'മിത്രം'
    },
    status: {
      name: 'Auspicious',
      nameTa: 'சுபம்',
      nameHi: 'शुभ',
      nameTe: 'శుభం',
      nameKn: 'ಶುಭ',
      nameMl: 'ശുഭം'
    },
    palan: {
      name: 'Friendship, helpful assistance, pleasant outcomes, and peace.',
      nameTa: 'நட்பு, உதவி, நன்மைகள், சுமூகமான தீர்வு கிடைக்கும்.',
      nameHi: 'मित्रता, सहायता, खुशहाली और अनुकूल समाधान।',
      nameTe: 'స్నేహం, సహాయం, అనుకూలతలు మరియు సంతోషం.',
      nameKn: 'ಸ್ನೇಹ, ಸಹಾಯ, ಅನುಕೂಲತೆ ಮತ್ತು ಸಂತೋಷ.',
      nameMl: 'സൗഹൃദം, സഹായം, അനുകൂല ഫലങ്ങൾ എന്നിവ ലഭിക്കും.'
    }
  },
  9: {
    taraNumber: 9,
    key: 'parama_mitra',
    ratingType: 'good',
    isAuspicious: true,
    badgeBg: '#dcfce7',
    badgeColor: '#047857',
    taraName: {
      name: 'Parama Mitra',
      nameTa: 'பரம மைத்ரம்',
      nameHi: 'परम मित्र',
      nameTe: 'పరమ మిత్ర',
      nameKn: 'ಪರಮ ಮಿತ್ರ',
      nameMl: 'പരമ മിത്രം'
    },
    status: {
      name: 'Most Auspicious',
      nameTa: 'உத்தமம்',
      nameHi: 'अति शुभ',
      nameTe: 'ఉత్తమ శుభం',
      nameKn: 'ಉತ್ತಮ ಶುಭ',
      nameMl: 'ഉത്തമം'
    },
    palan: {
      name: 'Supreme fortune, joyful success, utmost alliance and victory.',
      nameTa: 'மகிழ்ச்சி, பேரானந்தம், உன்னத வெற்றி, சிறந்த ஆதரவு.',
      nameHi: 'अत्यंत शुभ, महान सफलता, आनंद और गहरा समर्थन।',
      nameTe: 'గొప్ప విజయం, అత్యుత్తమ అదృష్టం మరియు పరిపూర్ణ మద్దతు.',
      nameKn: 'ದೊಡ್ಡ ಯಶಸ್ಸು, ಅತ್ಯುತ್ತಮ ಅದೃಷ್ಟ ಮತ್ತು ಪರಿಪೂರ್ಣ ಬೆಂಬಲ.',
      nameMl: 'വലിയ വിജയം, ഉത്തമ ഭാഗ്യം, പൂർണ്ണ പിന്തുണ.'
    }
  }
};

const CYCLE_DEFS = {
  1: {
    name: 'Prathama Paryaya (Janma Tara)',
    nameTa: 'முதல் சுற்று (ஜன்ம பரியாயம்)',
    nameHi: 'प्रथम पर्याय (जन्म तारा)',
    nameTe: 'మొదటి పర్యాయం (జన్మ తార)',
    nameKn: 'ಮೊದಲ ಪರ್ಯಾಯ (ಜನ್ಮ ತಾರಾ)',
    nameMl: 'ഒന്നാം പര്യായം (ജന്മ താര)'
  },
  2: {
    name: 'Dvitiya Paryaya (Anujanma Tara)',
    nameTa: 'இரண்டாம் சுற்று (அனுஜன்ம பரியாயம்)',
    nameHi: 'द्वितीय पर्याय (अनुजन्म तारा)',
    nameTe: 'రెండవ పర్యాయం (అనుజన్మ తార)',
    nameKn: 'ಎರಡನೇ ಪರ್ಯಾಯ (ಅನುಜನ್ಮ ತಾರಾ)',
    nameMl: 'രണ്ടാം പര്യായം (അനുജന്മ താര)'
  },
  3: {
    name: 'Tritiya Paryaya (Trijanma Tara)',
    nameTa: 'மூன்றாம் சுற்று (திரிஜன்ம பரியாயம்)',
    nameHi: 'तृतीय पर्याय (त्रिजन्म तारा)',
    nameTe: 'మూడవ పర్యాయం (త్రిజన్మ తార)',
    nameKn: 'ಮೂರನೇ ಪರ್ಯಾಯ (ತ್ರಿಜನ್ಮ ತಾರಾ)',
    nameMl: 'മൂന്നാം പര്യായം (ത്രിജന്മ താര)'
  }
};

/**
 * 27 Full Records - 1 for each count distance from Udhayam to Aarudam
 */
export const THARA_PALAN_MASTER_DATA = Array.from({ length: 27 }, (_, i) => {
  const order = i + 1; // 1 to 27
  const taraNumber = ((order - 1) % 9) + 1; // 1 to 9
  const cycle = Math.floor((order - 1) / 9) + 1; // 1, 2, or 3
  const baseDef = NAVATARA_BASE_DEFS[taraNumber];
  const cycleName = CYCLE_DEFS[cycle];

  return {
    order,
    taraNumber,
    cycle,
    cycleName,
    key: `${baseDef.key}_${order}`,
    taraName: baseDef.taraName,
    status: baseDef.status,
    palan: baseDef.palan,
    ratingType: baseDef.ratingType,
    isAuspicious: baseDef.isAuspicious,
    badgeBg: baseDef.badgeBg,
    badgeColor: baseDef.badgeColor
  };
});

export default THARA_PALAN_MASTER_DATA;

