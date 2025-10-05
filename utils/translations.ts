export const translations = {
  humidity: {
    en: 'Humidity',
    es: 'Humedad',
    fr: 'Humidité',
    de: 'Luftfeuchtigkeit',
    ja: '湿度',
    pt: 'Umidade',
    it: 'Umidità',
    hi: 'नमी',
    zh: '湿度'
  },
  wind: {
    en: 'Wind',
    es: 'Viento',
    fr: 'Vent',
    de: 'Wind',
    ja: '風',
    pt: 'Vento',
    it: 'Vento',
    hi: 'हवा',
    zh: '风'
  },
  locationPlaceholder: {
    en: 'Location',
    es: 'Ubicación',
    fr: 'Emplacement',
    de: 'Standort',
    ja: '場所',
    pt: 'Localização',
    it: 'Posizione',
    hi: 'स्थान',
    zh: '地点'
  },
  startDatePlaceholder: {
    en: 'Start Date',
    es: 'Fecha de Inicio',
    fr: 'Date de Début',
    de: 'Startdatum',
    ja: '開始日',
    pt: 'Data de Início',
    it: 'Data di Inizio',
    hi: 'प्रारंभ तिथि',
    zh: '开始日期'
  },
  endDatePlaceholder: {
    en: 'End Date (Optional)',
    es: 'Fecha de Fin (Opcional)',
    fr: 'Date de Fin (Optionnel)',
    de: 'Enddatum (Optional)',
    ja: '終了日（任意）',
    pt: 'Data Final (Opcional)',
    it: 'Data di Fine (Opzionale)',
    hi: 'अंतिम तिथि (वैकल्पिक)',
    zh: '结束日期（可选）'
  },
  weatherPlaceholder: {
    en: 'Weather (Optional)',
    es: 'Clima (Opcional)',
    fr: 'Météo (Optionnel)',
    de: 'Wetter (Optional)',
    ja: '天気（任意）',
    pt: 'Clima (Opcional)',
    it: 'Meteo (Opzionale)',
    hi: 'मौसम (वैकल्पिक)',
    zh: '天气（可选）'
  },
  searchButton: {
      en: 'Search',
      es: 'Buscar',
      fr: 'Rechercher',
      de: 'Suchen',
      ja: '検索',
      pt: 'Buscar',
      it: 'Cerca',
      hi: 'खोजें',
      zh: '搜索'
  },
  weatherAny: {
      en: 'Any',
      es: 'Cualquiera',
      fr: 'Tout',
      de: 'Jedes',
      ja: 'すべて',
      pt: 'Qualquer',
      it: 'Qualsiasi',
      hi: 'कोई भी',
      zh: '任何'
  },
  weatherSunny: {
      en: 'Sunny',
      es: 'Soleado',
      fr: 'Ensoleillé',
      de: 'Sonnig',
      ja: '晴れ',
      pt: 'Ensolarado',
      it: 'Soleggiato',
      hi: 'धूप',
      zh: '晴天'
  },
  weatherCloudy: {
      en: 'Cloudy',
      es: 'Nublado',
      fr: 'Nuageux',
      de: 'Bewölkt',
      ja: '曇り',
      pt: 'Nublado',
      it: 'Nuvoloso',
      hi: 'बादल',
      zh: '多云'
  },
  weatherRain: {
      en: 'Rain',
      es: 'Lluvia',
      fr: 'Pluie',
      de: 'Regen',
      ja: '雨',
      pt: 'Chuva',
      it: 'Pioggia',
      hi: 'बारिश',
      zh: '雨'
  },
  weatherSnow: {
      en: 'Snow',
      es: 'Nieve',
      fr: 'Neige',
      de: 'Schnee',
      ja: '雪',
      pt: 'Neve',
      it: 'Neve',
      hi: 'बर्फ़',
      zh: '雪'
  },
  weatherThunderstorm: {
      en: 'Thunderstorm',
      es: 'Tormenta',
      fr: 'Orage',
      de: 'Gewitter',
      ja: '雷雨',
      pt: 'Trovoada',
      it: 'Temporale',
      hi: 'आंधी',
      zh: '雷暴'
  },
  weatherFoggy: {
    en: 'Foggy',
    es: 'Nebuloso',
    fr: 'Brouillard',
    de: 'Neblig',
    ja: '霧',
    pt: 'Nevoeiro',
    it: 'Nebbioso',
    hi: 'धुंध',
    zh: '有雾'
  }
};

export type TranslationKey = keyof typeof translations;