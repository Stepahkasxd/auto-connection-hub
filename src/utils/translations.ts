export const translations = {
  ru: {
    // Header
    support: 'Техподдержка',
    carSelection: 'Подбор автомобиля',
    internationalOrder: 'Заказ из другой страны',
    // Car filters
    filters: 'Фильтры',
    price: 'Цена',
    color: 'Цвет',
    power: 'Мощность',
    allPrices: 'Все цены',
    from: 'от',
    searchPlaceholder: 'Поиск по названию или описанию...',
    // Colors
    black: 'Черный',
    white: 'Белый',
    silver: 'Серебристый',
    blue: 'Синий',
    // Car details
    specifications: 'Характеристики',
    acceleration: 'Разгон',
    range: 'Запас хода',
    battery: 'Батарея',
    features: 'Особенности комплектации',
    trim: 'Комплектация',
    selectTrim: 'Выберите комплектацию',
    selectColor: 'Выберите цвет',
  },
  en: {
    // Header
    support: 'Support',
    carSelection: 'Car Selection',
    internationalOrder: 'International Order',
    // Car filters
    filters: 'Filters',
    price: 'Price',
    color: 'Color',
    power: 'Power',
    allPrices: 'All prices',
    from: 'from',
    searchPlaceholder: 'Search by name or description...',
    // Colors
    black: 'Black',
    white: 'White',
    silver: 'Silver',
    blue: 'Blue',
    // Car details
    specifications: 'Specifications',
    acceleration: 'Acceleration',
    range: 'Range',
    battery: 'Battery',
    features: 'Features',
    trim: 'Trim',
    selectTrim: 'Select trim',
    selectColor: 'Select color',
  }
};

export type TranslationKey = keyof typeof translations.en;