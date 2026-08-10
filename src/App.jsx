import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BriefcaseBusiness, Droplets, Baby, Crown, Plane, Building2, UserCheck, Sparkles, Battery, Award, HelpCircle, MapPin, Trash2, Phone, User, CalendarDays, X, MessageCircle, Copy, Mic } from 'lucide-react'
import * as QRCode from 'qrcode'


const whatsappNumber = '77781556699'
const maxPhoneNumber = '+77055909091'
const alibekPhoneNumber = '+77781556699'
const maxPhoneLabel = '+7 705 590 9091 — Максим'
const alibekPhoneLabel = '+7 778 155 6699 — Алибек'

const translations = {
  ru: {
    home: 'Главная',
    services: 'Услуги',
    standards: 'Стандарты',
    contacts: 'Контакты',
    booking: 'Заказ',
    price: 'Прайс',
    history: 'История',
    favorites: 'Избранное',
    saved: '✓ Сохранено',
    menu: 'Меню',
    menuMore: 'Ещё',
    close: 'Закрыть',
    whatsapp: 'WhatsApp',
    continueDraft: 'Продолжить заявку',
    startOrder: 'Начать заказ',
    startOrderAlt: 'Получить цену за 30 секунд',
    draftReminder: 'У вас есть незавершенная заявка',
    continueDraftShort: 'Продолжить',
    installAppTitle: 'Установите приложение MAX',
    installAppHint: 'Открывайте быстрее и заказывайте поездку в два клика.',
    installAppButton: 'Установить',
    installAppLater: 'Позже',
    quickScenarios: 'Быстрые сценарии',
    quickChoice: 'Быстрый выбор',
    reviews: 'Отзывы клиентов',
    noOrders: 'Нет заказов',
    noFavorites: 'Нет избранных адресов',
    clearHistory: 'Очистить',
    clearHistoryFull: 'Очистить историю',
    repeat: 'Повторить',
    hideDetails: 'Скрыть доп. поля',
    showDetails: 'Добавить адрес и комментарий',
    saveAddress: 'Сохранить адрес в избранное',
    submitNow: 'Заказать сейчас',
    fillForm: 'Заполните форму',
    submitWhatsapp: 'Отправить в WhatsApp',
    bookingProgress: 'Прогресс заявки',
    progressStep1: '1. Контакты',
    progressStep2: '2. Услуга и дата',
    progressStep3: '3. Детали (опционально)',
    phoneInvalid: 'Введите корректный номер (+7XXXXXXXXXX)',
    bookingTitle: 'Готовы к комфортной поездке?',
    bookingSubtitle: 'Закажите такси по городу, трансфер в аэропорт или корпоративную поездку — мы на связи 24/7.',
    bookingSubtitleShort: 'Оставьте контакты и дату. Подтверждаем быстро в WhatsApp или по звонку.',
    heroBadge: 'Астана · Таксопарк MAX · партнер Яндекс Такси',
    heroTitle: 'Таксопарк MAX — комфортные поездки по Астане и за город',
    heroP1: 'Мы оказываем услуги такси, трансферов и корпоративных поездок с акцентом на безопасность, комфорт и точность маршрута.',
    heroP2: 'MAX — это современный таксопарк с водителями, готовыми обслуживать ваши поездки по Астане и за её пределами.',
    heroP3: 'Независимо от того, нужен ли вам городской рейс, аэропорт или персональный трансфер — мы подберем удобный вариант.',
    standardsTitleDesktop: 'Стандарты',
    contactsHint: 'Позвоните или напишите в WhatsApp — мы на связи 24/7',
    nameLabel: 'Ваше имя *',
    phoneLabel: 'Номер телефона *',
    serviceLabel: 'Выберите услугу *',
    dateLabel: 'Дата поездки *',
    addressLabel: 'Адрес подачи',
    commentLabel: 'Дополнительные пожелания',
    commentDesktopLabel: 'Комментарий',
    namePlaceholder: 'Например: Дархан',
    phonePlaceholder: '+7 (___) ___-__-__',
    addressPlaceholder: 'Например: Астана, Кабанбай батыра 53',
    commentPlaceholder: 'Поделитесь своими пожеланиями...',
    favoriteAddressPrefix: 'Адрес',
    submitSuccess: 'Заявка открыта в WhatsApp. Мы также сохранили её в истории.',
    removeFavoriteAria: 'Удалить адрес',
    waMessageTitle: 'Заявка MAX Taxi:',
    waName: 'Имя',
    waPhone: 'Телефон',
    waService: 'Услуга',
    waDate: 'Дата',
    waAddress: 'Адрес',
    role: 'Роль',
    roleClient: 'Клиент',
    roleAdmin: 'Администратор',
    roleDriver: 'Водитель',
    adminPanel: 'Панель администратора',
    adminSubtitle: 'Контроль заявок и управление статусами',
    driverPanel: 'Кабинет водителя',
    driverSubtitle: 'Просмотр заказов и отметка этапов поездки',
    orderStatus: 'Статус',
    noOrdersForRole: 'Заказов пока нет',
    orderCreated: 'Создан',
    statusNew: 'Новый',
    statusConfirmed: 'Подтверждён',
    statusOnWay: 'В пути',
    statusCompleted: 'Завершён',
    statusCanceled: 'Отменён',
    setStatus: 'Установить статус',
    ordersTotal: 'Всего заказов',
    ordersActive: 'Активные',
    ordersDone: 'Завершённые',
    loyaltyLevel: 'Уровень клиента',
    loyaltyBronze: 'Bronze',
    loyaltySilver: 'Silver',
    loyaltyGold: 'Gold',
    loyaltyPoints: 'Баллы',
    loyaltyNext: 'До следующего уровня',
    birthdayLabel: 'Дата рождения (опционально)',
    birthdayBonus: 'Бонус ко дню рождения',
    birthdayClaim: 'Получить +50 баллов',
    birthdayClaimed: 'Бонус начислен',
    referralTitle: 'Реферальная программа',
    referralHint: 'Пригласите друга и получите 5% скидку на следующий заказ.',
    referralShare: 'Скопировать текст для WhatsApp',
    referralCopied: 'Текст скопирован',
    monthOrders: 'заказов',
    monthCompleted: 'завершено',
    monthActive: 'активно',
    monthTopService: 'топ услуга',
    priceEstimateLabel: 'Ориентировочная стоимость',
    pricingDetailsToggle: 'Как формируется цена и оплата',
    pricingDetailsHide: 'Скрыть цену и оплату',
    pricingDetailsTitle: 'Прозрачная цена',
    pricingWeekendNote: 'Выходной день: +15% к базовой ставке',
    pricingFinalNote: 'Финальную сумму подтверждает менеджер перед поездкой.',
    paymentMethodsTitle: 'Способы оплаты',
    paymentMethodsList: 'Kaspi, Halyk, наличные, счет для компаний',
    partnerOfferTitle: 'Партнерское предложение',
    partnerOfferOpen: 'Открыть предложение',
    partnerOfferHotelTitle: 'Скидка на отель рядом с аэропортом',
    partnerOfferHotelHint: 'Для маршрутов аэропорт → город доступны спецусловия проживания.',
    partnerOfferFoodTitle: 'Подборка ресторанов в центре',
    partnerOfferFoodHint: 'Если едете в центр, посмотрите лучшие места рядом с точкой прибытия.',
    partnerOfferInsuranceTitle: 'Страховка путешественника',
    partnerOfferInsuranceHint: 'Для дальних поездок рекомендуем оформить короткий страховой полис.',
    summaryTotalSpent: 'Потрачено всего',
    summaryAvgCheck: 'Средний чек',
    summaryFavService: 'Любимая услуга',
    referralAfterOrder: 'Поделитесь реферальным кодом и получите бонус на следующий заказ.',
    analyticsTitle: 'CTA аналитика (локально)',
    analyticsVariant: 'Вариант',
    analyticsOpens: 'Открытия бронирования',
    analyticsSubmits: 'Отправки заявки',
    analyticsConversion: 'Конверсия',
    analyticsReset: 'Сбросить',
    analyticsTopSource: 'Лучший источник',
    analyticsInsufficient: 'Недостаточно данных для вывода',
    funnelTitle: 'Воронка формы (локально)',
    funnelStep1: 'Шаг 1: контакты',
    funnelStep2: 'Шаг 2: услуга и дата',
    funnelStep3: 'Шаг 3: детали',
    funnelSubmit: 'Отправлено',
    funnelConversion: 'Конверсия формы',
    funnelReset: 'Сбросить воронку',
    orderHabitTitle: 'Похоже, у вас есть привычный день заказа',
    orderHabitHint: 'Чаще всего вы заказываете в',
    orderHabitAction: 'Поставить дату',
    orderHabitDismiss: 'Скрыть на 7 дней',
    orderHabitApplied: 'Дата подставлена в форму',
    markConfirmed: 'Подтвердить',
    markOnWay: 'Отметить: в пути',
    markCompleted: 'Отметить: завершён',
    staffLogin: 'Вход для персонала',
    loginLabel: 'Логин',
    passwordLabel: 'Пароль',
    signIn: 'Войти',
    signOut: 'Выйти',
    invalidCredentials: 'Неверный логин или пароль',
    addDriver: 'Добавить водителя',
    driverLogin: 'Логин водителя',
    driverPassword: 'Пароль водителя',
    driversList: 'Список водителей',
    noDrivers: 'Водители пока не добавлены',
    transferSchedule: 'График трансферов',
    transferScheduleSubtitle: 'Назначение водителя и машины с проверкой конфликтов',
    createTransfer: 'Добавить трансфер',
    clientName: 'Клиент',
    routeFrom: 'Откуда',
    routeTo: 'Куда',
    startTime: 'Начало',
    endTime: 'Окончание',
    assignedDriver: 'Водитель',
    vehicle: 'Машина',
    conflictDetected: 'Конфликт: водитель или машина уже заняты в это время',
    invalidTimeRange: 'Время окончания должно быть позже начала',
    transferSaved: 'Трансфер добавлен в график',
    noTransfers: 'Нет запланированных трансферов',
    myTransfers: 'Мои трансферы',
    noTransfersForRole: 'Нет назначенных трансферов',
    filters: 'Фильтры',
    filterDate: 'Дата',
    filterDriver: 'Водитель',
    filterVehicle: 'Машина',
    searchTransfers: 'Поиск по клиенту/маршруту',
    clearFilters: 'Сбросить фильтры',
    bufferLabel: 'Буфер (мин) к проверке конфликтов',
    bufferHelper: 'Добавляет запас ко времени начала/конца для водителя и машины',
    exportJson: 'Экспорт JSON',
    importJson: 'Импорт JSON',
    printSchedule: 'Печать / PDF',
    importSuccess: 'Импорт выполнен',
    importError: 'Ошибка импорта: неверный файл',
    notifyLabel: 'Уведомления о заявке',
    notifyEnable: 'Включите браузерные уведомления, чтобы не пропустить ответ менеджера',
    notifyEnabled: 'Уведомления включены',
    notifyBlocked: 'Браузер отклонил уведомления. Проверьте настройки',
    notifyButton: 'Включить уведомления',
    notifyTitle: 'Заявка отправлена',
    notifyBody: 'Мы свяжемся с вами для подтверждения бронирования',
    supportCardTitle: 'Связаться с менеджером',
    supportCall: 'Позвонить',
    supportEmail: 'Написать на почту',
    supportWhatsapp: 'Открыть WhatsApp',
    preferredContactTitle: 'Предпочитаемый канал',
    preferCall: 'Звонок',
    preferWhatsapp: 'WhatsApp',
    primaryCtaCall: 'Позвонить сейчас',
    receiptEmailButton: 'Квитанция на email',
    receiptPdfButton: 'Скачать PDF',
    receiptPrompt: 'Введите email для квитанции',
    receiptInvalid: 'Введите корректный email адрес',
    receiptOpened: 'Черновик письма с квитанцией открыт',
    receiptPdfReady: 'PDF-квитанция скачивается',
    receiptPdfFailed: 'Не удалось сформировать PDF-квитанцию',
    lastOrderTitle: 'Последняя заявка',
    lastOrderEmpty: 'У вас пока нет заявок',
    statusTimeline: 'Этапы',
    staffLoginPlaceholder: 'admin или driver@mail.ru',
    staffLoginHint: 'Вход персонала доступен только в защищённом backend-контуре.',
    transferSearchPlaceholder: 'Имя, адрес, маршрут',
    clientNamePlaceholder: 'Имя клиента',
    routeFromPlaceholder: 'Астана, аэропорт',
    routeToPlaceholder: 'Отель',
    driverLoginPlaceholder: 'driver@mail.ru',
    vehiclePlaceholder: 'Mercedes V-class',
    detectLocation: 'Определить мое место',
    locating: 'Определяем место...',
    locationSuccess: 'Адрес подставлен в форму',
    locationDenied: 'Доступ к геолокации запрещен',
    locationUnavailable: 'Геолокация недоступна в этом браузере',
    locationFailed: 'Не удалось определить адрес, проверьте интернет или разрешение',
    voiceInputAddress: 'Сказать адрес',
    voiceInputListening: 'Слушаем...',
    voiceInputUnsupported: 'Голосовой ввод недоступен в этом браузере',
    voiceInputNoSpeech: 'Речь не распознана, попробуйте еще раз',
    voiceInputApplied: 'Адрес добавлен голосом',
    trustNoHiddenFees: 'Без скрытых доплат',
    trustNda: 'Конфиденциальность поездок и маршрутов',
    trustInsured: 'Страхование пассажиров и ответственности',
    privacyConsentLabel: 'Я согласен(а) на обработку персональных данных для оформления заявки',
    privacyPolicyLabel: 'Политика конфиденциальности',
    termsLabel: 'Условия обслуживания',
    rememberDataLabel: 'Запомнить данные на этом устройстве',
    rememberDataHint: 'Если отключено, данные сохраняются только в текущей сессии браузера',
    clearMyData: 'Удалить мои данные с устройства',
    dataCleared: 'Локальные данные удалены',
    submitConsentRequired: 'Подтвердите согласие на обработку данных',
    waIncludeSensitive: 'Добавить адрес и комментарий в WhatsApp',
    waPrivacyHint: 'В WhatsApp отправляются только базовые данные. Адрес и комментарий добавляются только по вашему выбору.',
    staffLoginDisabled: 'Вход для персонала доступен только в защищенном контуре (backend). Демо-вход отключен.',
    waComment: 'Комментарий',
    legalDisclaimer: 'Работаем по договору и соблюдаем политику конфиденциальности.',
    priceFromTrip: 'от 10 000 ₸ за поездку',
    moreItems: 'ещё',
    callAriaLabel: 'Позвонить',
    bottomBrand: 'MAX · Таксопарк',
    orderNowCta: 'Заказать сейчас ->',
    offlineDemo: 'Оффлайн демо',
    deleteTransferAria: 'Удалить трансфер',
    footerTagline: 'Таксопарк MAX в Астане: такси и трансферы',
    favNoteEdit: 'Заметка',
    favNotePlaceholder: 'Например: паркинг слева',
    reactivationTitle: 'Давно не заказывали?',
    reactivationHint: 'Вернитесь и получите скидку 5% на следующую поездку — введите промокод',
    reactivationCode: 'WELCOME5',
    reactivationDismiss: 'Не сейчас',
    reactivationOrder: 'Заказать со скидкой',
    historyAutoCleanedNotice: 'Старые заказы (>90 дней) автоматически удалены для вашей конфиденциальности.',
  },
  kk: {
    home: 'Басты бет',
    services: 'Қызметтер',
    standards: 'Стандарттар',
    contacts: 'Байланыс',
    booking: 'Тапсырыс',
    price: 'Баға',
    history: 'Тарих',
    favorites: 'Таңдаулылар',
    saved: '✓ Сақталды',
    menu: 'Мәзір',
    menuMore: 'Қосымша',
    close: 'Жабу',
    whatsapp: 'WhatsApp',
    continueDraft: 'Өтінімді жалғастыру',
    startOrder: 'Тапсырысты бастау',
    startOrderAlt: '30 секундта баға алу',
    draftReminder: 'Сізде аяқталмаған өтінім бар',
    continueDraftShort: 'Жалғастыру',
    installAppTitle: 'MAX қолданбасын орнатыңыз',
    installAppHint: 'Тезірек ашыңыз және поездкаңызды екі рет басумен ұйымдастырыңыз.',
    installAppButton: 'Орнату',
    installAppLater: 'Кейінірек',
    quickScenarios: 'Жылдам сценарийлер',
    quickChoice: 'Жылдам таңдау',
    reviews: 'Клиент пікірлері',
    noOrders: 'Тапсырыстар жоқ',
    noFavorites: 'Таңдаулы мекенжайлар жоқ',
    clearHistory: 'Тазарту',
    clearHistoryFull: 'Тарихты тазарту',
    repeat: 'Қайта тапсыру',
    hideDetails: 'Қосымша өрістерді жасыру',
    showDetails: 'Мекенжай мен пікір қосу',
    saveAddress: 'Мекенжайды таңдаулыға сақтау',
    submitNow: 'Қазір тапсырыс беру',
    fillForm: 'Форманы толтырыңыз',
    submitWhatsapp: 'WhatsApp-қа жіберу',
    bookingProgress: 'Өтінім прогресі',
    progressStep1: '1. Байланыс',
    progressStep2: '2. Қызмет және күн',
    progressStep3: '3. Детальдар (міндетті емес)',
    phoneInvalid: 'Дұрыс нөмір енгізіңіз (+7XXXXXXXXXX)',
    bookingTitle: 'Ыңғайлы сапарға дайынсыз ба?',
    bookingSubtitle: 'Астана ішінде такси, әуежайға трансфер немесе корпоративтік сапарға тапсырыс беріңіз — біз 24/7 байланыстамыз.',
    bookingSubtitleShort: 'Байланыс пен күнді енгізіңіз. WhatsApp не қоңырау арқылы жылдам растаймыз.',
    heroBadge: 'Астана · MAX таксопаркі · Яндекс Такси серіктесі',
    heroTitle: 'MAX таксопаркі — Астанадағы және қала сыртындағы ыңғайлы сапарлар',
    heroP1: 'Біз такси, трансфер және корпоративтік сапарлардың қызметтерін қауіпсіздік, комфорт және маршрут дәлдігіне баса жүргіземіз.',
    heroP2: 'MAX — Астанада және оның айналасында сапарларыңызды ұсынуға дайын қазіргі заманғы таксопарк.',
    heroP3: 'Сізге қала ішіндегі рейс, әуежайға сапар немесе жеке трансфер қажет болса — біз ыңғайлы нұсқаны ұсынамыз.',
    standardsTitleDesktop: 'Стандарттар',
    contactsHint: 'Қоңырау шалыңыз немесе WhatsApp-қа жазыңыз — біз 24/7 байланыстамыз',
    nameLabel: 'Атыңыз *',
    phoneLabel: 'Телефон нөмірі *',
    serviceLabel: 'Қызметті таңдаңыз *',
    dateLabel: 'Сапар күні *',
    addressLabel: 'Жіберу мекенжайы',
    commentLabel: 'Қосымша тілектер',
    commentDesktopLabel: 'Пікір',
    namePlaceholder: 'Мысалы: Дархан',
    phonePlaceholder: '+7 (___) ___-__-__',
    addressPlaceholder: 'Мысалы: Астана, Қабанбай батыр 53',
    commentPlaceholder: 'Тілектеріңізді жазыңыз...',
    favoriteAddressPrefix: 'Мекенжай',
    submitSuccess: 'Өтінім WhatsApp-та ашылды. Сондай-ақ, тарихта сақталды.',
    removeFavoriteAria: 'Мекенжайды жою',
    waMessageTitle: 'MAX Taxi өтінімі:',
    waName: 'Аты',
    waPhone: 'Телефон',
    waService: 'Қызмет',
    waDate: 'Күні',
    waAddress: 'Мекенжай',
    role: 'Рөл',
    roleClient: 'Клиент',
    roleAdmin: 'Әкімші',
    roleDriver: 'Жүргізуші',
    adminPanel: 'Әкімші панелі',
    adminSubtitle: 'Өтінімдерді бақылау және мәртебені басқару',
    driverPanel: 'Жүргізуші кабинеті',
    driverSubtitle: 'Тапсырыстарды көру және сапар кезеңдерін белгілеу',
    orderStatus: 'Мәртебе',
    noOrdersForRole: 'Тапсырыстар әлі жоқ',
    orderCreated: 'Құрылған',
    statusNew: 'Жаңа',
    statusConfirmed: 'Расталған',
    statusOnWay: 'Жолда',
    statusCompleted: 'Аяқталды',
    statusCanceled: 'Бас тартылды',
    setStatus: 'Мәртебені орнату',
    ordersTotal: 'Барлық тапсырыс',
    ordersActive: 'Белсенді',
    ordersDone: 'Аяқталған',
    loyaltyLevel: 'Клиент деңгейі',
    loyaltyBronze: 'Bronze',
    loyaltySilver: 'Silver',
    loyaltyGold: 'Gold',
    loyaltyPoints: 'Ұпайлар',
    loyaltyNext: 'Келесі деңгейге дейін',
    birthdayLabel: 'Туған күн (міндетті емес)',
    birthdayBonus: 'Туған күн бонусы',
    birthdayClaim: '+50 ұпай алу',
    birthdayClaimed: 'Бонус қосылды',
    referralTitle: 'Реферал бағдарлама',
    referralHint: 'Досыңызды шақырып, келесі тапсырысқа 5% жеңілдік алыңыз.',
    referralShare: 'WhatsApp мәтінін көшіру',
    referralCopied: 'Мәтін көшірілді',
    monthOrders: 'тапсырыс',
    monthCompleted: 'аяқталған',
    monthActive: 'белсенді',
    monthTopService: 'топ қызмет',
    priceEstimateLabel: 'Шамаланған құны',
    pricingDetailsToggle: 'Баға мен төлем қалай есептеледі',
    pricingDetailsHide: 'Баға мен төлемді жасыру',
    pricingDetailsTitle: 'Ашық баға',
    pricingWeekendNote: 'Демалыс күні: базалық тарифке +15%',
    pricingFinalNote: 'Соңғы соманы сапар алдында менеджер растайды.',
    paymentMethodsTitle: 'Төлем тәсілдері',
    paymentMethodsList: 'Kaspi, Halyk, қолма-қол, компанияларға шот',
    partnerOfferTitle: 'Серіктестік ұсыныс',
    partnerOfferOpen: 'Ұсынысты ашу',
    partnerOfferHotelTitle: 'Әуежай маңындағы қонақүйге жеңілдік',
    partnerOfferHotelHint: 'Әуежай → қала бағыттарына арнайы тұру шарттары қолжетімді.',
    partnerOfferFoodTitle: 'Орталықтағы мейрамханалар топтамасы',
    partnerOfferFoodHint: 'Орталыққа бара жатсаңыз, келу нүктесі маңындағы үздік орындарды қараңыз.',
    partnerOfferInsuranceTitle: 'Саяхат сақтандыруы',
    partnerOfferInsuranceHint: 'Ұзақ сапарлар үшін қысқа сақтандыру полисін ұсынамыз.',
    summaryTotalSpent: 'Жалпы шығын',
    summaryAvgCheck: 'Орташа чек',
    summaryFavService: 'Таңдаулы қызмет',
    referralAfterOrder: 'Реферал кодын бөлісіп, келесі тапсырысқа бонус алыңыз.',
    analyticsTitle: 'CTA аналитикасы (локалды)',
    analyticsVariant: 'Нұсқа',
    analyticsOpens: 'Брондау ашылуы',
    analyticsSubmits: 'Өтінім жіберілді',
    analyticsConversion: 'Конверсия',
    analyticsReset: 'Тазалау',
    analyticsTopSource: 'Ең тиімді арна',
    analyticsInsufficient: 'Қорытындыға дерек аз',
    funnelTitle: 'Форма воронкасы (локалды)',
    funnelStep1: '1-қадам: байланыс',
    funnelStep2: '2-қадам: қызмет және күн',
    funnelStep3: '3-қадам: детальдар',
    funnelSubmit: 'Жіберілді',
    funnelConversion: 'Форма конверсиясы',
    funnelReset: 'Воронканы тазалау',
    orderHabitTitle: 'Сізде тұрақты тапсырыс күні бар сияқты',
    orderHabitHint: 'Сіз көбіне мына күні тапсырыс бересіз:',
    orderHabitAction: 'Күнді қою',
    orderHabitDismiss: '7 күнге жасыру',
    orderHabitApplied: 'Күн формаға қойылды',
    markConfirmed: 'Растау',
    markOnWay: 'Белгілеу: жолда',
    markCompleted: 'Белгілеу: аяқталды',
    staffLogin: 'Персоналға кіру',
    loginLabel: 'Логин',
    passwordLabel: 'Құпиясөз',
    signIn: 'Кіру',
    signOut: 'Шығу',
    invalidCredentials: 'Логин немесе құпиясөз қате',
    addDriver: 'Жүргізуші қосу',
    driverLogin: 'Жүргізуші логині',
    driverPassword: 'Жүргізуші құпиясөзі',
    driversList: 'Жүргізушілер тізімі',
    noDrivers: 'Жүргізушілер әлі қосылмаған',
    transferSchedule: 'Трансфер кестесі',
    transferScheduleSubtitle: 'Жүргізуші мен көлікті тағайындау, қақтығысты тексеру',
    createTransfer: 'Трансфер қосу',
    clientName: 'Клиент',
    routeFrom: 'Қайдан',
    routeTo: 'Қайда',
    startTime: 'Басталуы',
    endTime: 'Аяқталуы',
    assignedDriver: 'Жүргізуші',
    vehicle: 'Көлік',
    conflictDetected: 'Қақтығыс: жүргізуші немесе көлік осы уақытта бос емес',
    invalidTimeRange: 'Аяқталу уақыты басталу уақытынан кейін болуы керек',
    transferSaved: 'Трансфер кестеге қосылды',
    noTransfers: 'Жоспарланған трансфер жоқ',
    myTransfers: 'Менің трансферлерім',
    noTransfersForRole: 'Сізге тағайындалған трансфер жоқ',
    filters: 'Сүзгілер',
    filterDate: 'Күні',
    filterDriver: 'Жүргізуші',
    filterVehicle: 'Көлік',
    searchTransfers: 'Клиент/маршрут бойынша іздеу',
    clearFilters: 'Сүзгілерді тазарту',
    bufferLabel: 'Қақтығысқа буфер (мин)',
    bufferHelper: 'Жүргізуші/көлік уақытына запас қосады',
    exportJson: 'JSON экспорт',
    importJson: 'JSON импорт',
    printSchedule: 'Басып шығару / PDF',
    importSuccess: 'Импорт орындалды',
    importError: 'Импорт қатесі: файл дұрыс емес',
    notifyLabel: 'Өтінім хабарламалары',
    notifyEnable: 'Менеджер жауаптарын жіберіп алмау үшін браузер хабарламаларын қосыңыз',
    notifyEnabled: 'Хабарламалар қосылған',
    notifyBlocked: 'Браузер хабарламаны бұғаттады. Баптауды тексеріңіз',
    notifyButton: 'Хабарламаларды қосу',
    notifyTitle: 'Өтінім жіберілді',
    notifyBody: 'Брондауды растау үшін хабарласамыз',
    supportCardTitle: 'Менеджермен байланыс',
    supportCall: 'Қоңырау шалу',
    supportEmail: 'Поштаға жазу',
    supportWhatsapp: 'WhatsApp ашу',
    preferredContactTitle: 'Қалаулы байланыс арнасы',
    preferCall: 'Қоңырау',
    preferWhatsapp: 'WhatsApp',
    primaryCtaCall: 'Қазір қоңырау шалу',
    receiptEmailButton: 'Квитанцияны email-ға',
    receiptPdfButton: 'PDF жүктеу',
    receiptPrompt: 'Квитанция үшін email енгізіңіз',
    receiptInvalid: 'Дұрыс email мекенжайын енгізіңіз',
    receiptOpened: 'Квитанция бар хат жобасы ашылды',
    receiptPdfReady: 'PDF-квитанция жүктеліп жатыр',
    receiptPdfFailed: 'PDF-квитанцияны жасау мүмкін болмады',
    lastOrderTitle: 'Соңғы өтінім',
    lastOrderEmpty: 'Өтінімдер әлі жоқ',
    statusTimeline: 'Кезеңдер',
    staffLoginPlaceholder: 'admin немесе driver@mail.ru',
    staffLoginHint: 'Персоналға кіру тек қорғалған backend контурында қолжетімді.',
    transferSearchPlaceholder: 'Аты, мекенжайы, маршрут',
    clientNamePlaceholder: 'Клиент аты',
    routeFromPlaceholder: 'Астана, әуежай',
    routeToPlaceholder: 'Қонақ үй',
    driverLoginPlaceholder: 'driver@mail.ru',
    vehiclePlaceholder: 'Mercedes V-class',
    detectLocation: 'Менің орнымды анықтау',
    locating: 'Орын анықталып жатыр...',
    locationSuccess: 'Мекенжай формаға қойылды',
    locationDenied: 'Геолокацияға рұқсат берілмеді',
    locationUnavailable: 'Бұл браузерде геолокация қолжетімсіз',
    locationFailed: 'Мекенжайды анықтау мүмкін болмады, интернет пен рұқсатты тексеріңіз',
    voiceInputAddress: 'Мекенжайды айту',
    voiceInputListening: 'Тыңдап тұрмыз...',
    voiceInputUnsupported: 'Дауыспен енгізу бұл браузерде қолжетімсіз',
    voiceInputNoSpeech: 'Сөйлеу танылмады, қайта көріңіз',
    voiceInputApplied: 'Мекенжай дауыспен қосылды',
    trustNoHiddenFees: 'Жасырын төлемдер жоқ',
    trustNda: 'Сапар мен маршрут құпиялығы',
    trustInsured: 'Жолаушы және жауапкершілік сақтандырылған',
    privacyConsentLabel: 'Өтінімді рәсімдеу үшін дербес деректерді өңдеуге келісемін',
    privacyPolicyLabel: 'Құпиялылық саясаты',
    termsLabel: 'Қызмет көрсету шарттары',
    rememberDataLabel: 'Осы құрылғыда деректерді сақтау',
    rememberDataHint: 'Өшірілсе, деректер тек ағымдағы браузер сессиясында сақталады',
    clearMyData: 'Құрылғыдан менің деректерімді өшіру',
    dataCleared: 'Жергілікті деректер өшірілді',
    submitConsentRequired: 'Деректерді өңдеуге келісімді растаңыз',
    waIncludeSensitive: 'WhatsApp-қа мекенжай мен пікірді қосу',
    waPrivacyHint: 'WhatsApp-қа тек негізгі деректер жіберіледі. Мекенжай мен пікір тек сіз таңдасаңыз қосылады.',
    staffLoginDisabled: 'Персоналға кіру тек қорғалған контурда (backend) қолжетімді. Демо-кіру өшірілген.',
    waComment: 'Пікір',
    legalDisclaimer: 'Келісімшартпен жұмыс істейміз және құпиялылық саясатын сақтаймыз.',
    priceFromTrip: 'сапарға 10 000 ₸ бастап',
    moreItems: 'тағы',
    callAriaLabel: 'Қоңырау шалу',
    bottomBrand: 'MAX · Таксопарк',
    orderNowCta: 'Қазір тапсырыс беру ->',
    offlineDemo: 'Офлайн демо',
    deleteTransferAria: 'Трансферді жою',
    footerTagline: 'Астанадағы MAX таксопаркі: такси және трансферлер',
    favNoteEdit: 'Ескертпе',
    favNotePlaceholder: 'Мысалы: сол жақта тұрақ',
    reactivationTitle: 'Дұрыс тапсырыс етпедіңіз бе?',
    reactivationHint: 'Оралыңыз және келіңіз — промокодпен 5% жеңілдік алыңыз',
    reactivationCode: 'WELCOME5',
    reactivationDismiss: 'Қазір емес',
    reactivationOrder: 'Жеңілікпен тапсырис беру',
    historyAutoCleanedNotice: 'Ескі тапсырыстар (>90 күн) конфиденциалдылық ушін автоматты жойылды.',
  },
  en: {
    home: 'Home',
    services: 'Services',
    standards: 'Standards',
    contacts: 'Contacts',
    booking: 'Booking',
    price: 'Pricing',
    history: 'History',
    favorites: 'Favorites',
    saved: '✓ Saved',
    menu: 'Menu',
    menuMore: 'More',
    close: 'Close',
    whatsapp: 'WhatsApp',
    continueDraft: 'Continue request',
    startOrder: 'Start booking',
    startOrderAlt: 'Get price in 30 seconds',
    draftReminder: 'You have an unfinished booking',
    continueDraftShort: 'Continue',
    installAppTitle: 'Install MAX app',
    installAppHint: 'Open faster and book your trip in a couple of taps.',
    installAppButton: 'Install',
    installAppLater: 'Later',
    quickScenarios: 'Quick scenarios',
    quickChoice: 'Quick choice',
    reviews: 'Client reviews',
    noOrders: 'No orders yet',
    noFavorites: 'No favorite addresses',
    clearHistory: 'Clear',
    clearHistoryFull: 'Clear history',
    repeat: 'Repeat',
    hideDetails: 'Hide optional fields',
    showDetails: 'Add address and comment',
    saveAddress: 'Save address to favorites',
    submitNow: 'Book now',
    fillForm: 'Fill required fields',
    submitWhatsapp: 'Send to WhatsApp',
    bookingProgress: 'Booking progress',
    progressStep1: '1. Contacts',
    progressStep2: '2. Service and date',
    progressStep3: '3. Details (optional)',
    phoneInvalid: 'Enter a valid number (+7XXXXXXXXXX)',
    bookingTitle: 'Ready for a comfortable ride?',
    bookingSubtitle: 'Book city taxi, airport transfer, or a corporate ride — our team is available 24/7.',
    bookingSubtitleShort: 'Leave contact details and date. We confirm quickly via WhatsApp or phone.',
    heroBadge: 'Astana · MAX taxi park · Yandex Taxi partner',
    heroTitle: 'MAX taxi park — comfortable rides across Astana and beyond',
    heroP1: 'We provide taxi, transfer, and corporate travel services with a focus on safety, comfort, and route precision.',
    heroP2: 'MAX is a modern taxi park with drivers ready to handle your trips in Astana and beyond.',
    heroP3: 'Whether you need a city ride, airport transfer, or a personalised transfer — we will find the right option.',
    standardsTitleDesktop: 'Standard of Excellence',
    contactsHint: 'Call or message us on WhatsApp — available 24/7',
    nameLabel: 'Your name *',
    phoneLabel: 'Phone number *',
    serviceLabel: 'Choose service *',
    dateLabel: 'Trip date *',
    addressLabel: 'Pickup address',
    commentLabel: 'Additional notes',
    commentDesktopLabel: 'Comment',
    namePlaceholder: 'Example: Darkhan',
    phonePlaceholder: '+7 (___) ___-__-__',
    addressPlaceholder: 'Example: Astana, Kabanbay Batyr 53',
    commentPlaceholder: 'Share your preferences...',
    favoriteAddressPrefix: 'Address',
    submitSuccess: 'Request opened in WhatsApp and saved to history.',
    removeFavoriteAria: 'Remove address',
    waMessageTitle: 'MAX Taxi request:',
    waName: 'Name',
    waPhone: 'Phone',
    waService: 'Service',
    waDate: 'Date',
    waAddress: 'Address',
    role: 'Role',
    roleClient: 'Client',
    roleAdmin: 'Administrator',
    roleDriver: 'Driver',
    adminPanel: 'Administrator panel',
    adminSubtitle: 'Order control and status management',
    driverPanel: 'Driver workspace',
    driverSubtitle: 'View orders and mark trip status',
    orderStatus: 'Status',
    noOrdersForRole: 'No orders yet',
    orderCreated: 'Created',
    statusNew: 'New',
    statusConfirmed: 'Confirmed',
    statusOnWay: 'On the way',
    statusCompleted: 'Completed',
    statusCanceled: 'Canceled',
    setStatus: 'Set status',
    ordersTotal: 'Total orders',
    ordersActive: 'Active',
    ordersDone: 'Completed',
    loyaltyLevel: 'Client level',
    loyaltyBronze: 'Bronze',
    loyaltySilver: 'Silver',
    loyaltyGold: 'Gold',
    loyaltyPoints: 'Points',
    loyaltyNext: 'To next level',
    birthdayLabel: 'Birthday (optional)',
    birthdayBonus: 'Birthday bonus',
    birthdayClaim: 'Claim +50 points',
    birthdayClaimed: 'Bonus claimed',
    referralTitle: 'Referral program',
    referralHint: 'Invite a friend and get 5% off your next booking.',
    referralShare: 'Copy WhatsApp text',
    referralCopied: 'Text copied',
    monthOrders: 'orders',
    monthCompleted: 'completed',
    monthActive: 'active',
    monthTopService: 'top service',
    priceEstimateLabel: 'Estimated price',
    pricingDetailsToggle: 'How pricing and payment work',
    pricingDetailsHide: 'Hide pricing and payment',
    pricingDetailsTitle: 'Transparent pricing',
    pricingWeekendNote: 'Weekend day: +15% to the base rate',
    pricingFinalNote: 'Final amount is confirmed by the manager before the trip.',
    paymentMethodsTitle: 'Payment methods',
    paymentMethodsList: 'Kaspi, Halyk, cash, invoice for companies',
    partnerOfferTitle: 'Partner offer',
    partnerOfferOpen: 'Open offer',
    partnerOfferHotelTitle: 'Hotel discount near the airport',
    partnerOfferHotelHint: 'Special accommodation terms are available for airport-to-city routes.',
    partnerOfferFoodTitle: 'Best restaurants in the city center',
    partnerOfferFoodHint: 'If you are going downtown, check top places near your arrival point.',
    partnerOfferInsuranceTitle: 'Travel insurance option',
    partnerOfferInsuranceHint: 'For longer trips we recommend a short-term travel policy.',
    summaryTotalSpent: 'Total spent',
    summaryAvgCheck: 'Average check',
    summaryFavService: 'Favorite service',
    referralAfterOrder: 'Share your referral code and get a bonus on your next booking.',
    analyticsTitle: 'CTA analytics (local)',
    analyticsVariant: 'Variant',
    analyticsOpens: 'Booking opens',
    analyticsSubmits: 'Submitted orders',
    analyticsConversion: 'Conversion',
    analyticsReset: 'Reset',
    analyticsTopSource: 'Top source',
    analyticsInsufficient: 'Not enough data yet',
    funnelTitle: 'Form funnel (local)',
    funnelStep1: 'Step 1: contacts',
    funnelStep2: 'Step 2: service and date',
    funnelStep3: 'Step 3: details',
    funnelSubmit: 'Submitted',
    funnelConversion: 'Form conversion',
    funnelReset: 'Reset funnel',
    orderHabitTitle: 'You seem to have a usual booking day',
    orderHabitHint: 'You most often book on',
    orderHabitAction: 'Set date',
    orderHabitDismiss: 'Hide for 7 days',
    orderHabitApplied: 'Date has been set in the form',
    markConfirmed: 'Confirm',
    markOnWay: 'Mark: on the way',
    markCompleted: 'Mark: completed',
    staffLogin: 'Staff login',
    loginLabel: 'Login',
    passwordLabel: 'Password',
    signIn: 'Sign in',
    signOut: 'Sign out',
    invalidCredentials: 'Invalid login or password',
    addDriver: 'Add driver',
    driverLogin: 'Driver login',
    driverPassword: 'Driver password',
    driversList: 'Drivers list',
    noDrivers: 'No drivers added yet',
    transferSchedule: 'Transfer schedule',
    transferScheduleSubtitle: 'Assign driver and vehicle with conflict checks',
    createTransfer: 'Add transfer',
    clientName: 'Client',
    routeFrom: 'From',
    routeTo: 'To',
    startTime: 'Start time',
    endTime: 'End time',
    assignedDriver: 'Driver',
    vehicle: 'Vehicle',
    conflictDetected: 'Conflict: the driver or vehicle is already booked for this slot',
    invalidTimeRange: 'End time must be after start time',
    transferSaved: 'Transfer saved to schedule',
    noTransfers: 'No scheduled transfers',
    myTransfers: 'My transfers',
    noTransfersForRole: 'No transfers assigned yet',
    filters: 'Filters',
    filterDate: 'Date',
    filterDriver: 'Driver',
    filterVehicle: 'Vehicle',
    searchTransfers: 'Search by client/route',
    clearFilters: 'Clear filters',
    bufferLabel: 'Buffer (min) for conflict check',
    bufferHelper: 'Adds slack to start/end time for driver and vehicle',
    exportJson: 'Export JSON',
    importJson: 'Import JSON',
    printSchedule: 'Print / PDF',
    importSuccess: 'Import completed',
    importError: 'Import error: invalid file',
    notifyLabel: 'Booking notifications',
    notifyEnable: 'Enable browser notifications to stay updated',
    notifyEnabled: 'Notifications are on',
    notifyBlocked: 'Notifications are blocked. Check browser settings',
    notifyButton: 'Enable notifications',
    notifyTitle: 'Request sent',
    notifyBody: 'We will get back to confirm your booking',
    supportCardTitle: 'Reach a manager',
    supportCall: 'Call',
    supportEmail: 'Email',
    supportWhatsapp: 'Open WhatsApp',
    preferredContactTitle: 'Preferred contact',
    preferCall: 'Call',
    preferWhatsapp: 'WhatsApp',
    primaryCtaCall: 'Call now',
    receiptEmailButton: 'Email receipt',
    receiptPdfButton: 'Download PDF',
    receiptPrompt: 'Enter email for receipt',
    receiptInvalid: 'Enter a valid email address',
    receiptOpened: 'Receipt email draft was opened',
    receiptPdfReady: 'PDF receipt is downloading',
    receiptPdfFailed: 'Could not generate PDF receipt',
    lastOrderTitle: 'Last request',
    lastOrderEmpty: 'No requests yet',
    statusTimeline: 'Steps',
    staffLoginPlaceholder: 'admin or driver@mail.ru',
    staffLoginHint: 'Staff access is available only inside a secured backend environment.',
    transferSearchPlaceholder: 'Name, address, route',
    clientNamePlaceholder: 'Client name',
    routeFromPlaceholder: 'Astana airport',
    routeToPlaceholder: 'Hotel',
    driverLoginPlaceholder: 'driver@mail.ru',
    vehiclePlaceholder: 'Mercedes V-class',
    detectLocation: 'Detect my location',
    locating: 'Detecting location...',
    locationSuccess: 'Address was added to the form',
    locationDenied: 'Location access was denied',
    locationUnavailable: 'Geolocation is not available in this browser',
    locationFailed: 'Could not resolve address, check internet or permission',
    voiceInputAddress: 'Speak address',
    voiceInputListening: 'Listening...',
    voiceInputUnsupported: 'Voice input is not available in this browser',
    voiceInputNoSpeech: 'No speech detected, try again',
    voiceInputApplied: 'Address was added by voice',
    trustNoHiddenFees: 'No hidden fees',
    trustNda: 'Trip and route confidentiality',
    trustInsured: 'Passenger and liability insurance',
    privacyConsentLabel: 'I agree to personal data processing for booking purposes',
    privacyPolicyLabel: 'Privacy Policy',
    termsLabel: 'Terms of Service',
    rememberDataLabel: 'Remember data on this device',
    rememberDataHint: 'If disabled, data is saved only for the current browser session',
    clearMyData: 'Delete my data from this device',
    dataCleared: 'Local data deleted',
    submitConsentRequired: 'Please confirm consent to data processing',
    waIncludeSensitive: 'Include address and comment in WhatsApp',
    waPrivacyHint: 'Only essential details are sent to WhatsApp by default. Address and comment are optional.',
    staffLoginDisabled: 'Staff login is available only in a secured backend environment. Demo login is disabled.',
    waComment: 'Comment',
    legalDisclaimer: 'Service is provided under contract and privacy policy compliance.',
    priceFromTrip: 'from 10,000 KZT per trip',
    moreItems: 'more',
    callAriaLabel: 'Call',
    bottomBrand: 'MAX · Taxi Park',
    orderNowCta: 'Book now ->',
    offlineDemo: 'Offline demo',
    deleteTransferAria: 'Delete transfer',
    footerTagline: 'MAX taxi park in Astana: taxi and transfers',
    favNoteEdit: 'Note',
    favNotePlaceholder: 'E.g.: parking on the left',
    reactivationTitle: "Haven't ordered in a while?",
    reactivationHint: 'Come back and get 5% off your next trip with promo code',
    reactivationCode: 'WELCOME5',
    reactivationDismiss: 'Not now',
    reactivationOrder: 'Book with discount',
    historyAutoCleanedNotice: 'Old orders (>90 days) were auto-removed for your privacy.',
  },
}

const serviceCatalog = [
  {
    icon: Plane,
    title: {
      ru: 'Аэропорт и вокзал',
      kk: 'Әуежай және вокзал',
      en: 'Airport and train station',
    },
    subtitle: {
      ru: 'Трансфер в аэропорт и из аэропорта',
      kk: 'Әуежайға және әуежайдан трансфер',
      en: 'Airport transfer to and from the terminal',
    },
    price: {
      ru: 'от 15 000 ₸',
      kk: '15 000 ₸ бастап',
      en: 'from 15,000 KZT',
    },
    details: {
      ru: [
        'Подача автомобиля в удобное время',
        'Помощь с багажом и парковкой',
        'До 60 мин ожидания при задержке рейса',
        'Чистый салон и комфортный маршрут',
        'Поддержка по WhatsApp и телефону',
      ],
      kk: [
        'Көлікті ыңғайлы уақытта жеткізу',
        'Жүкпен және паркингпен көмек',
        'Рейс кешіксе 60 минутқа дейін күту',
        'Таза салон және ыңғайлы маршрут',
        'WhatsApp және телефон арқылы қолдау',
      ],
      en: [
        'Vehicle pickup at a convenient time',
        'Assistance with luggage and parking',
        'Up to 60 minutes waiting for delayed flights',
        'Clean cabin and comfortable route',
        'Support by WhatsApp and phone',
      ],
    },
  },
  {
    icon: Baby,
    title: {
      ru: 'Семейные и детские поездки',
      kk: 'Отбасылық және балалық сапарлар',
      en: 'Family and kids rides',
    },
    subtitle: {
      ru: 'Школьный и детский трансфер',
      kk: 'Мектеп және балалар трансфері',
      en: 'School and kids transfer',
    },
    price: {
      ru: 'от 100 000 ₸ / мес',
      kk: '100 000 ₸ / ай бастап',
      en: 'from 100,000 KZT / month',
    },
    details: {
      ru: [
        'Поездки от двери до двери',
        'Надежный водитель и чистый салон',
        'Регулярные маршруты по утрам и вечерам',
        'Поддержка по расписанию и по запросу',
      ],
      kk: [
        'Есіктен есікке дейін сапар',
        'Сенімді жүргізуші және таза салон',
        'Таңертеңгі және кешкі тұрақты бағыттар',
        'Кесте бойынша және сұраныс бойынша қолдау',
      ],
      en: [
        'Door-to-door rides',
        'Reliable driver and clean cabin',
        'Regular morning and evening routes',
        'Scheduled or on-demand support',
      ],
    },
  },
  {
    icon: BriefcaseBusiness,
    title: {
      ru: 'Корпоративное такси',
      kk: 'Корпоративтік такси',
      en: 'Corporate taxi',
    },
    subtitle: {
      ru: 'Поездки для бизнеса',
      kk: 'Бизнес үшін сапарлар',
      en: 'Business rides',
    },
    price: {
      ru: 'от 10 000 ₸ / час',
      kk: '10 000 ₸ / сағ бастап',
      en: 'from 10,000 KZT / hour',
    },
    details: {
      ru: [
        'Поездки для сотрудников, встреч и переговоров',
        'Пунктуальность и порядок маршрутов',
        'Поддержка в любое время дня и ночи',
        'Подбор автомобиля под задачу',
      ],
      kk: [
        'Қызметкерлер, кездесулер және келіссөздер сапарлары',
        'Уақыттылық және маршрут тәртібі',
        'Түнгі де күндізгі де қолдау',
        'Міндетке сәйкес көлік таңдау',
      ],
      en: [
        'Trips for staff, meetings, and negotiations',
        'Punctuality and clear routing',
        'Support day and night',
        'Vehicle selection based on your task',
      ],
    },
  },
  {
    icon: Building2,
    title: {
      ru: 'Корпоративный парк',
      kk: 'Корпоративтік парк',
      en: 'Corporate fleet',
    },
    subtitle: {
      ru: 'Регулярные поездки для компаний',
      kk: 'Компаниялар үшін тұрақты сапарлар',
      en: 'Regular trips for companies',
    },
    price: {
      ru: 'Индивидуальный тариф',
      kk: 'Жеке тариф',
      en: 'Custom pricing',
    },
    details: {
      ru: [
        'Бронируйте поездки заранее и без лишней суеты',
        'Поддержка для бухгалтерии и менеджеров',
        'Подмена автомобиля при необходимости',
        'Персональный менеджер 24/7',
      ],
      kk: [
        'Сапарларды алдын ала брондай аласыз',
        'Бухгалтерия мен менеджерлерге қолдау',
        'Қажет болған кезде көлікті ауыстыру',
        '24/7 жеке менеджер',
      ],
      en: [
        'Book rides in advance without extra hassle',
        'Support for finance and management teams',
        'Vehicle replacement when needed',
        'Dedicated manager available 24/7',
      ],
    },
  },
  {
    icon: MapPin,
    title: {
      ru: 'Межгород и поездки по области',
      kk: 'Қалааралық және ауданаралық сапарлар',
      en: 'Intercity and regional rides',
    },
    subtitle: {
      ru: 'Комфортные поездки за город',
      kk: 'Қала сыртындағы ыңғайлы сапарлар',
      en: 'Comfortable rides outside the city',
    },
    price: {
      ru: 'По запросу',
      kk: 'Сұраныс бойынша',
      en: 'On request',
    },
    details: {
      ru: [
        'Маршруты по области и в популярные курортные точки',
        'Надежный водитель и спокойная дорога',
        'Остановки по желанию',
        'Подготовка машины перед выездом',
      ],
      kk: [
        'Аудан және танымал курорт нүктелеріне бағыттар',
        'Сенімді жүргізуші және тыныш жол',
        'Қалауы бойынша аялдамалар',
        'Сапар алдында көлікті дайындау',
      ],
      en: [
        'Routes across the region and to popular resort areas',
        'Reliable driver and calm road experience',
        'Stops on request',
        'Vehicle preparation before departure',
      ],
    },
  },
  {
    icon: HelpCircle,
    title: {
      ru: 'Другое',
      kk: 'Басқа қызметтер',
      en: 'Other Requests',
    },
    subtitle: {
      ru: 'Индивидуальные решения',
      kk: 'Жеке шешімдер',
      en: 'Custom Services',
    },
    price: {
      ru: 'Уточняйте',
      kk: 'Нақтылаңыз',
      en: 'Ask for quote',
    },
    details: {
      ru: [
        'Вам нужен нестандартный сервис?',
        'Специальные требования к маршруту?',
        'Особые пожелания к авто или водителю?',
        'Свяжитесь с нами напрямую в WhatsApp',
        'Мы найдем идеальное решение для вас',
      ],
      kk: [
        'Стандарттан тыс қызмет керек пе?',
        'Маршрутқа арнайы талаптарыңыз бар ма?',
        'Көлікке немесе жүргізушіге ерекше тілек бар ма?',
        'WhatsApp арқылы тікелей бізге жазыңыз',
        'Сізге ең тиімді шешімді ұсынамыз',
      ],
      en: [
        'Need a non-standard service?',
        'Special route requirements?',
        'Specific requests for vehicle or driver?',
        'Contact us directly on WhatsApp',
        'We will tailor the best solution for you',
      ],
    },
  },
]

const getServices = (language) => serviceCatalog.map((service) => ({
  icon: service.icon,
  title: service.title[language],
  subtitle: service.subtitle[language],
  price: service.price[language],
  details: service.details[language],
}))

const getStandards = (language) => {
  const standardsByLanguage = {
    ru: [
      { title: 'Идеальная чистота', icon: Sparkles, desc: 'Автомобиль подается после комплексной мойки и химчистки салона.' },
      { title: 'Дресс-код и этикет', icon: Crown, desc: 'Водители в строгих костюмах, соблюдение протокола тишины и профессиональная вежливость.' },
      { title: 'Напитки на борту', icon: Droplets, desc: 'Свежая питьевая вода в каждой поездке.' },
      { title: 'Энергия для гаджетов', icon: Battery, desc: 'Зарядные устройства для всех типов смартфонов (Type-C, Lightning).' },
      { title: 'Опытные водители', icon: UserCheck, desc: 'Профессиональный и безаварийный многолетний стаж.' },
      { title: 'Полная страховка', icon: Award, desc: 'Страховое покрытие пассажира, водителя и автомобиля.' },
    ],
    kk: [
      { title: 'Мінсіз тазалық', icon: Sparkles, desc: 'Көлік кешенді жуу және салонды химиялық тазалаудан кейін беріледі.' },
      { title: 'Дресс-код және этикет', icon: Crown, desc: 'Жүргізушілер қатаң костюммен, тыныштық протоколын және кәсіби сыпайылықты сақтайды.' },
      { title: 'Жолдағы сусындар', icon: Droplets, desc: 'Әр сапарда таза ауыз су ұсынылады.' },
      { title: 'Гаджеттерге қуат', icon: Battery, desc: 'Смартфондардың барлық түріне арналған қуаттағыштар (Type-C, Lightning).' },
      { title: 'Тәжірибелі жүргізушілер', icon: UserCheck, desc: 'Көпжылдық тәжірибесі бар кәсіби және апатсыз жүргізушілер.' },
      { title: 'Толық сақтандыру', icon: Award, desc: 'Жолаушы, жүргізуші және көлік толық сақтандырылған.' },
    ],
    en: [
      { title: 'Spotless Cleanliness', icon: Sparkles, desc: 'Each vehicle is delivered after a full exterior wash and interior detailing.' },
      { title: 'Dress Code & Etiquette', icon: Crown, desc: 'Drivers wear formal suits, follow silence protocol, and maintain professional courtesy.' },
      { title: 'On-Board Refreshments', icon: Droplets, desc: 'Fresh drinking water is provided on every trip.' },
      { title: 'Power for Devices', icon: Battery, desc: 'Charging cables for all major smartphone types (Type-C, Lightning).' },
      { title: 'Experienced Drivers', icon: UserCheck, desc: 'Professional, safety-focused drivers with long-term experience.' },
      { title: 'Full Insurance', icon: Award, desc: 'Comprehensive coverage for passenger, driver, and vehicle.' },
    ],
  }

  return standardsByLanguage[language] || standardsByLanguage.ru
}

const getQuickScenarios = (language) => {
  const services = getServices(language)
  const quickScenariosByLanguage = {
    ru: [
      { label: 'Аэропорт', serviceIndex: 0, address: 'Аэропорт Астана' },
      { label: 'Детский маршрут', serviceIndex: 1, address: 'Школа / дом' },
      { label: 'Бизнес-день', serviceIndex: 2, address: 'Офис / встречи' },
    ],
    kk: [
      { label: 'Әуежай', serviceIndex: 0, address: 'Астана әуежайы' },
      { label: 'Балалар маршруты', serviceIndex: 1, address: 'Мектеп / үй' },
      { label: 'Бизнес-күн', serviceIndex: 2, address: 'Кеңсе / кездесулер' },
    ],
    en: [
      { label: 'Airport', serviceIndex: 0, address: 'Astana Airport' },
      { label: 'Kids Route', serviceIndex: 1, address: 'School / home' },
      { label: 'Business Day', serviceIndex: 2, address: 'Office / meetings' },
    ],
  }

  return (quickScenariosByLanguage[language] || quickScenariosByLanguage.ru).map((scenario) => ({
    ...scenario,
    service: services[scenario.serviceIndex]?.title || services[0]?.title || '',
  }))
}

const getReviews = (language) => {
  const reviewsByLanguage = {
    ru: [
      {
        author: 'Алия К.',
        text: 'Всегда вовремя, салон чистый, водитель вежливый. Для аэропорта - лучший вариант.',
      },
      {
        author: 'N. Consulting',
        text: 'Используем для корпоративных гостей. Сервис стабильный, отчетность и коммуникация на уровне.',
      },
      {
        author: 'Руслан М.',
        text: 'Быстро подтвердили заказ в WhatsApp и сразу закрыли вопрос с маршрутом.',
      },
    ],
    kk: [
      {
        author: 'Алия К.',
        text: 'Әрдайым уақытында келеді, салон таза, жүргізуші сыпайы. Әуежайға өте ыңғайлы.',
      },
      {
        author: 'N. Consulting',
        text: 'Корпоративтік қонақтар үшін қолданамыз. Сервис тұрақты, есеп пен байланыс жоғары деңгейде.',
      },
      {
        author: 'Руслан М.',
        text: 'WhatsApp арқылы тапсырысты тез растады және маршрутты бірден шешті.',
      },
    ],
    en: [
      {
        author: 'Aliya K.',
        text: 'Always on time, clean cabin, polite driver. Best option for airport rides.',
      },
      {
        author: 'N. Consulting',
        text: 'We use MAX for corporate guests. Reliable service and excellent communication.',
      },
      {
        author: 'Ruslan M.',
        text: 'They confirmed my WhatsApp booking quickly and handled route details right away.',
      },
    ],
  }

  return reviewsByLanguage[language] || reviewsByLanguage.ru
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

const ADMIN_LOGIN = 'admin'
const DEMO_STAFF_ENABLED = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_STAFF === 'true'
const SENSITIVE_STORAGE_KEYS = ['staffSession', 'driverAccounts', 'transfers', 'formData', 'orderHistory', 'favorites']
const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000
const ACTIVITY_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'mousemove', 'scroll']
const INSTALL_PROMPT_RESHOW_MS = 7 * 24 * 60 * 60 * 1000

const parseStoredJson = (rawValue, fallback) => {
  if (!rawValue) return fallback
  try {
    const parsed = JSON.parse(rawValue)
    return parsed ?? fallback
  } catch (error) {
    return fallback
  }
}

const getStoredValue = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key)
    if (typeof fallback === 'string') {
      return stored ?? fallback
    }
    return parseStoredJson(stored, fallback)
  } catch (error) {
    return fallback
  }
}

const shouldShowInstallPromptBanner = () => {
  try {
    if (localStorage.getItem('installPromptInstalled') === '1') {
      return false
    }

    const dismissedAtRaw = localStorage.getItem('installPromptDismissedAt')
    const legacyDismissed = localStorage.getItem('installPromptDismissed') === '1'

    if (!dismissedAtRaw) {
      if (legacyDismissed) {
        localStorage.setItem('installPromptDismissedAt', String(Date.now()))
        return false
      }
      return true
    }

    const dismissedAt = Number(dismissedAtRaw)
    if (!Number.isFinite(dismissedAt)) return true

    return Date.now() - dismissedAt >= INSTALL_PROMPT_RESHOW_MS
  } catch (error) {
    return true
  }
}

const getScopedStoredValue = (key, fallback) => {
  try {
    const sessionStored = sessionStorage.getItem(key)
    if (sessionStored !== null) {
      if (typeof fallback === 'string') return sessionStored
      return parseStoredJson(sessionStored, fallback)
    }

    const localStored = localStorage.getItem(key)
    if (localStored !== null) {
      if (typeof fallback === 'string') return localStored
      return parseStoredJson(localStored, fallback)
    }

    return fallback
  } catch (error) {
    return fallback
  }
}

const writeScopedValue = (key, value, persistLocally) => {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value)
    sessionStorage.setItem(key, serialized)
    if (persistLocally) {
      localStorage.setItem(key, serialized)
    } else {
      localStorage.removeItem(key)
    }
  } catch (error) {
    // no-op for private mode/storage access errors
  }
}

const normalizeBufferMinutes = (value) => {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return 0
  return Math.min(120, Math.max(0, Math.round(parsed)))
}

const LoyaltyCard = ({ t, level, points, nextLevelOrders, progressPercent }) => {
  const levelColor = level.key === 'gold'
    ? 'from-amber-500/30 to-yellow-500/20 border-amber-400/40 text-amber-100'
    : level.key === 'silver'
      ? 'from-slate-400/25 to-slate-500/20 border-slate-300/35 text-slate-100'
      : 'from-orange-700/30 to-amber-700/20 border-orange-400/35 text-orange-100'

  const levelLabel = level.key === 'gold'
    ? t.loyaltyGold
    : level.key === 'silver'
      ? t.loyaltySilver
      : t.loyaltyBronze

  return (
    <div className={`rounded-xl border bg-gradient-to-r px-4 py-3 ${levelColor}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">{t.loyaltyLevel}: {levelLabel}</p>
        <p className="text-xs opacity-90">{t.loyaltyPoints}: {points}</p>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-black/35">
        <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${progressPercent}%` }} />
      </div>
      <p className="mt-1 text-xs opacity-90">
        {nextLevelOrders > 0 ? `${t.loyaltyNext}: ${nextLevelOrders}` : `${t.loyaltyGold} max`}
      </p>
    </div>
  )
}

// 🎯 УЛУЧШЕНИЕ 1: Быстрый звонок в один клик
const CallButton = ({ phoneNumber = alibekPhoneNumber.replace('+', ''), label = '☎️', className = '' }) => (
  <a
    href={`tel:+${phoneNumber}`}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-black font-bold hover:bg-accent/90 transition shadow-lg ${className}`}
  >
    <Phone size={18} />
    {label}
  </a>
)

// 🎯 УЛУЧШЕНИЕ 2: WhatsApp QR-код модал
const WhatsAppQRModal = ({ isOpen, onClose, whatsappNumber }) => {
  const qrValue = `https://wa.me/${whatsappNumber}`
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrValue, { width: 220, margin: 1, color: { dark: '#000', light: '#fff' } })
        .catch(() => {
          // fallback if QR generation fails
        })
    }
  }, [isOpen, qrValue])

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-gray-900 rounded-lg p-8 max-w-sm w-full mx-4 border border-white/20"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">WhatsApp</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition">
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="flex justify-center mb-6 bg-white p-4 rounded-lg">
          <canvas ref={canvasRef} />
        </div>

        <p className="text-center text-gray-300 text-sm mb-4">
          Отсканируйте QR-кодом или нажмите кнопку ниже
        </p>

        <div className="flex gap-3">
          <a
            href={qrValue}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition"
          >
            <MessageCircle size={18} />
            Открыть
          </a>
          <button
            onClick={handleCopy}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition flex items-center justify-center gap-2"
          >
            <Copy size={18} />
            {copied ? '✓' : 'Копировать'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// 🎯 УЛУЧШЕНИЕ 3: Exit-Intent Popup
const ExitIntentPopup = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-t border-accent/30 p-6 rounded-t-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-accent">⏰ Не уходите!</h3>
          <button onClick={onClose} className="p-1">
            <X size={20} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        <p className="text-white mb-6">
          Не нашли ответ на вопрос? Спросите нашего менеджера в WhatsApp — ответ за 30 секунд!
        </p>

        <div className="flex gap-3">
          <a
            href={`https://wa.me/77781556699?text=${encodeURIComponent('Привет! 👋 У меня есть вопрос...')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            Закрыть
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function App() {
  const prefersReducedMotion = useReducedMotion()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileTab, setMobileTab] = useState('home')
  const [desktopTab, setDesktopTab] = useState('home')
  const [language, setLanguage] = useState(() => getStoredValue('language', 'ru'))
  const services = useMemo(() => getServices(language), [language])
  const standards = useMemo(() => getStandards(language), [language])
  const quickScenarios = useMemo(() => getQuickScenarios(language), [language])
  const reviews = useMemo(() => getReviews(language), [language])
  const [rememberDataOnDevice, setRememberDataOnDevice] = useState(() => getStoredValue('privacyRememberData', '0') === '1')
  const [privacyConsentChecked, setPrivacyConsentChecked] = useState(false)
  const [includeSensitiveInMessage, setIncludeSensitiveInMessage] = useState(false)
  const [staffSession, setStaffSession] = useState(() => getScopedStoredValue('staffSession', null))
  const [driverAccounts, setDriverAccounts] = useState(() => getScopedStoredValue('driverAccounts', []))
  const [showStaffAuth, setShowStaffAuth] = useState(false)
  const [authLogin, setAuthLogin] = useState('')
  const [authError, setAuthError] = useState('')
  const [newDriverLogin, setNewDriverLogin] = useState('')
  const [savedSince, setSavedSince] = useState('')
  const [submitNotice, setSubmitNotice] = useState('')
  const [orderHistory, setOrderHistory] = useState(() => getScopedStoredValue('orderHistory', []))
  const [transfers, setTransfers] = useState(() => getScopedStoredValue('transfers', []))
  const [transferDraft, setTransferDraft] = useState(() => getEmptyTransferDraft())
  const [transferConflict, setTransferConflict] = useState('')
  const [transferNotice, setTransferNotice] = useState('')
  const [transferFilters, setTransferFilters] = useState({ date: '', driver: '', vehicle: '', query: '' })
  const [bufferMinutes, setBufferMinutes] = useState(() => normalizeBufferMinutes(getStoredValue('transferBuffer', '15')))
  const [importNotice, setImportNotice] = useState('')
  const [favorites, setFavorites] = useState(() => getScopedStoredValue('favorites', []))
  const [showMobileDetails, setShowMobileDetails] = useState(false)
  const [showDesktopDetails, setShowDesktopDetails] = useState(false)
  const [showPricingDetails, setShowPricingDetails] = useState(false)
  const [notificationsAllowed, setNotificationsAllowed] = useState(() => (typeof Notification !== 'undefined' && Notification.permission === 'granted'))
  const [notificationHint, setNotificationHint] = useState('')
  const [locationLookupInProgress, setLocationLookupInProgress] = useState(false)
  const [locationNotice, setLocationNotice] = useState('')
  const [voiceInputActive, setVoiceInputActive] = useState(false)
  const [voiceInputNotice, setVoiceInputNotice] = useState('')
  const speechRecognitionRef = useRef(null)
  
  // 🎯 НОВЫЕ СОСТОЯНИЯ ДЛЯ УЛУЧШЕНИЙ
  const [editingFavNoteId, setEditingFavNoteId] = useState(null)
  const [favNoteDraft, setFavNoteDraft] = useState('')
  const [historyAutoCleanNotice, setHistoryAutoCleanNotice] = useState('')
  const [showReactivationNudge, setShowReactivationNudge] = useState(false)
  const [reactivationCopied, setReactivationCopied] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [exitIntentShownInSession, setExitIntentShownInSession] = useState(false)
  const [promoCopied, setPromoCopied] = useState(false)
  const [birthdayBonusYear, setBirthdayBonusYear] = useState(() => getStoredValue('birthdayBonusYear', ''))
  const [referralCopied, setReferralCopied] = useState(false)
  const [showReferralNudge, setShowReferralNudge] = useState(false)
  const [showOrderHabitNudge, setShowOrderHabitNudge] = useState(() => {
    const dismissedAt = Number(getStoredValue('orderHabitNudgeDismissedAt', '0'))
    if (!Number.isFinite(dismissedAt)) return true
    return Date.now() - dismissedAt >= 7 * 24 * 60 * 60 * 1000
  })
  const [preferredContact, setPreferredContact] = useState(() => {
    const stored = getStoredValue('preferredContact', 'whatsapp')
    return stored === 'call' ? 'call' : 'whatsapp'
  })
  const [ctaVariant, setCtaVariant] = useState(() => getStoredValue('ctaVariant', ''))
  const [ctaMetrics, setCtaMetrics] = useState(() => getStoredValue('ctaMetrics', {}))
  const [ctaVariantAssignedAt, setCtaVariantAssignedAt] = useState(() => getStoredValue('ctaVariantAssignedAt', ''))
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState(null)
  const [showInstallBanner, setShowInstallBanner] = useState(() => shouldShowInstallPromptBanner())
  
  const closeMobileMenu = () => setMobileMenuOpen(false)
  const t = translations[language]
  const bookingSubtitleCompact = t.bookingSubtitleShort || t.bookingSubtitle
  const role = DEMO_STAFF_ENABLED ? (staffSession?.role || 'client') : 'client'
  const legalPageQuery = `?lang=${language}`
  
  const [formData, setFormData] = useState(() => {
    const defaultFormData = {
      name: '',
      phone: '+7',
      service: services[0]?.title || '',
      date: '',
      birthDate: '',
      comment: '',
      address: '',
    }

    const saved = getScopedStoredValue('formData', null)
    if (!saved || typeof saved !== 'object') {
      return defaultFormData
    }

    return {
      ...defaultFormData,
      ...saved,
      phone: typeof saved.phone === 'string' ? saved.phone : defaultFormData.phone,
    }
  })

  const sectionMotionProps = prefersReducedMotion
    ? {}
    : { variants: fadeUp, initial: 'hidden', animate: 'show', transition: { duration: 0.6 } }

  const cardMotionProps = (delay) => (
    prefersReducedMotion
      ? {}
      : {
        variants: fadeUp,
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.45, delay },
      }
  )

  // Сохранение языка
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    localStorage.setItem('privacyRememberData', rememberDataOnDevice ? '1' : '0')
    if (!rememberDataOnDevice) {
      SENSITIVE_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
    }
  }, [rememberDataOnDevice])

  useEffect(() => {
    writeScopedValue('staffSession', staffSession, rememberDataOnDevice)
  }, [staffSession, rememberDataOnDevice])

  useEffect(() => {
    writeScopedValue('driverAccounts', driverAccounts, rememberDataOnDevice)
  }, [driverAccounts, rememberDataOnDevice])

  useEffect(() => {
    writeScopedValue('transfers', transfers, rememberDataOnDevice)
  }, [transfers, rememberDataOnDevice])

  useEffect(() => {
    localStorage.setItem('transferBuffer', String(bufferMinutes || 0))
  }, [bufferMinutes])

  useEffect(() => {
    localStorage.setItem('birthdayBonusYear', birthdayBonusYear || '')
  }, [birthdayBonusYear])

  useEffect(() => {
    document.documentElement.style.colorScheme = 'dark'
  }, [])

  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      setNotificationsAllowed(true)
    }
  }, [])

  useEffect(() => {
    const now = Date.now()
    const assignedAtTs = Number(ctaVariantAssignedAt || 0)
    const shouldRotate = assignedAtTs > 0 && now - assignedAtTs > 7 * 24 * 60 * 60 * 1000

    if (!ctaVariant || shouldRotate) {
      const picked = Math.random() >= 0.5 ? 'A' : 'B'
      setCtaVariant(picked)
      setCtaVariantAssignedAt(String(now))
      localStorage.setItem('ctaVariant', picked)
      localStorage.setItem('ctaVariantAssignedAt', String(now))
      return
    }

    if (!ctaVariantAssignedAt) {
      setCtaVariantAssignedAt(String(now))
      localStorage.setItem('ctaVariantAssignedAt', String(now))
    }
  }, [ctaVariant, ctaVariantAssignedAt])

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
    if (standalone) {
      setShowInstallBanner(false)
      try {
        localStorage.setItem('installPromptInstalled', '1')
      } catch (error) {
        // ignore storage errors
      }
      return undefined
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredInstallPrompt(event)
      setShowInstallBanner(shouldShowInstallPromptBanner())
    }

    const handleAppInstalled = () => {
      setShowInstallBanner(false)
      setDeferredInstallPrompt(null)
      try {
        localStorage.setItem('installPromptInstalled', '1')
      } catch (error) {
        // ignore storage errors
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  useEffect(() => {
    if (!DEMO_STAFF_ENABLED && staffSession) {
      setStaffSession(null)
    }
  }, [staffSession])

  // Автосохранение формы
  useEffect(() => {
    writeScopedValue('formData', formData, rememberDataOnDevice)
    setSavedSince('just-now')
    const timer = setTimeout(() => setSavedSince(''), 2000)
    return () => clearTimeout(timer)
  }, [formData, rememberDataOnDevice])

  useEffect(() => {
    if (!services.some((service) => service.title === formData.service)) {
      setFormData((prev) => ({ ...prev, service: services[0]?.title || '' }))
    }
  }, [formData.service, services])

  // 🎯 УЛУЧШЕНИЕ 3: Exit-Intent Detection
  useEffect(() => {
    const handleMouseLeave = (event) => {
      // Проверяем если мышь выходит из верхней границы окна
      if (event.clientY <= 0 && !exitIntentShownInSession) {
        setShowExitIntent(true)
        setExitIntentShownInSession(true)
        // Показать popup максимум 1 раз в сессию
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [exitIntentShownInSession])

  // 🎯 Автоочистка истории старше 90 дней
  useEffect(() => {
    const ninety = 90 * 24 * 60 * 60 * 1000
    const threshold = Date.now() - ninety
    const filtered = orderHistory.filter((order) => {
      const ts = order.createdAt ? new Date(order.createdAt).getTime() : Date.now()
      return ts >= threshold
    })
    if (filtered.length < orderHistory.length) {
      setOrderHistory(filtered)
      writeScopedValue('orderHistory', filtered, rememberDataOnDevice)
      setHistoryAutoCleanNotice('auto-cleaned')
      const t2 = setTimeout(() => setHistoryAutoCleanNotice(''), 5000)
      return () => clearTimeout(t2)
    }
    return undefined
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 🎯 Реактивация: показать баннер если нет новых заказов 7+ дней
  useEffect(() => {
    if (orderHistory.length === 0) return
    const REACTIVATION_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000
    try {
      const installedFlag = localStorage.getItem('installPromptInstalled')
      if (installedFlag === '1') return // уже установлено — не бомбардировать
      const dismissedAt = Number(localStorage.getItem('reactivationDismissedAt') || '0')
      if (Date.now() - dismissedAt < REACTIVATION_COOLDOWN_MS) return

      const lastOrderTime = orderHistory.reduce((max, order) => {
        const ts = order.createdAt ? new Date(order.createdAt).getTime() : 0
        return ts > max ? ts : max
      }, 0)
      if (lastOrderTime > 0 && Date.now() - lastOrderTime >= REACTIVATION_COOLDOWN_MS) {
        setShowReactivationNudge(true)
      }
    } catch (error) {
      // ignore storage errors
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getTodayDate() {
    // Keep date inputs aligned with local calendar day instead of UTC day.
    const today = new Date()
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
    return today.toISOString().slice(0, 10)
  }

  function getEmptyTransferDraft() {
    return {
      clientName: '',
      service: services[0]?.title || '',
      routeFrom: '',
      routeTo: '',
      date: getTodayDate(),
      startTime: '09:00',
      endTime: '10:00',
      driver: driverAccounts[0]?.login || '',
      vehicle: '',
      status: 'confirmed',
    }
  }

  const isValidPhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '')
    return digitsOnly.length === 11 && digitsOnly.startsWith('7')
  }

  const timeToMinutes = (time) => {
    if (!time || !time.includes(':')) return null
    const [hours, minutes] = time.split(':').map(Number)
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null
    return hours * 60 + minutes
  }

  const findTransferConflict = (candidate, ignoreId) => {
    const start = timeToMinutes(candidate.startTime)
    const end = timeToMinutes(candidate.endTime)
    if (start === null || end === null) return ''
    if (end <= start) return t.invalidTimeRange

    const buffer = Math.max(0, Number(bufferMinutes) || 0)
    const startBuffered = Math.max(0, start - buffer)
    const endBuffered = end + buffer

    const conflicting = transfers.find((transfer) => {
      if (transfer.id === ignoreId) return false
      if (transfer.date !== candidate.date) return false
      const otherStartRaw = timeToMinutes(transfer.startTime)
      const otherEndRaw = timeToMinutes(transfer.endTime)
      if (otherStartRaw === null || otherEndRaw === null) return false
      const otherStart = Math.max(0, otherStartRaw - buffer)
      const otherEnd = otherEndRaw + buffer
      const overlaps = startBuffered < otherEnd && otherStart < endBuffered
      const sameDriver = candidate.driver && transfer.driver && transfer.driver.toLowerCase() === candidate.driver.toLowerCase()
      const sameVehicle = candidate.vehicle && transfer.vehicle && transfer.vehicle.toLowerCase().trim() === candidate.vehicle.toLowerCase().trim()
      return overlaps && (sameDriver || sameVehicle)
    })

    if (!conflicting) return ''
    return `${t.conflictDetected} · ${conflicting.date} ${conflicting.startTime}-${conflicting.endTime}`
  }

  const canSubmit = formData.name.trim() && isValidPhone(formData.phone) && formData.date && privacyConsentChecked
  const primaryStepComplete = formData.name.trim() && isValidPhone(formData.phone)
  const secondStepComplete = formData.service && formData.date
  const thirdStepComplete = true
  const completedSteps = [primaryStepComplete, secondStepComplete, thirdStepComplete].filter(Boolean).length
  const progressPercent = Math.round((completedSteps / 3) * 100)
  const hasDraft = formData.name.trim() || formData.date || formData.birthDate || formData.address.trim() || formData.comment.trim()
  const trustPoints = [t.trustNoHiddenFees, t.trustNda, t.trustInsured]
  const primaryStartCta = preferredContact === 'call'
    ? t.primaryCtaCall
    : (ctaVariant === 'B' ? t.startOrderAlt : t.startOrder)
  const serviceBasePriceByIndex = [15000, 100000, 10000, 18000, 25000, 12000]
  const resolveServiceBasePrice = (serviceName) => {
    const serviceIndex = services.findIndex((service) => service.title === serviceName)
    return serviceBasePriceByIndex[serviceIndex] || 10000
  }
  const estimatePriceKzt = (serviceName, dateValue) => {
    const base = resolveServiceBasePrice(serviceName)
    if (!dateValue) return base
    const tripDate = new Date(dateValue)
    const isWeekend = tripDate.getDay() === 0 || tripDate.getDay() === 6
    const surcharge = isWeekend ? 0.15 : 0
    return Math.round(base * (1 + surcharge))
  }
  const estimatedPriceKzt = estimatePriceKzt(formData.service, formData.date)
  const selectedTripDate = formData.date ? new Date(formData.date) : null
  const isWeekendEstimate = Boolean(selectedTripDate && !Number.isNaN(selectedTripDate.getTime()) && (selectedTripDate.getDay() === 0 || selectedTripDate.getDay() === 6))
  const pricingOverviewRows = useMemo(() => ([
    { label: services[0]?.title || '', value: services[0]?.price || '' },
    { label: services[2]?.title || '', value: services[2]?.price || '' },
    { label: services[1]?.title || '', value: services[1]?.price || '' },
    { label: services[4]?.title || '', value: services[4]?.price || '' },
  ].filter((row) => row.label && row.value)), [services])
  const partnerOffer = useMemo(() => {
    const service = (formData.service || '').toLowerCase()
    const address = (formData.address || '').toLowerCase()
    const isAirportRoute = ['аэропорт', 'әуежай', 'airport'].some((k) => service.includes(k) || address.includes(k))
    const isDowntownRoute = ['центр', 'орталық', 'center', 'downtown'].some((k) => address.includes(k))
    const isIntercityRoute = ['межгород', 'қалааралық', 'intercity'].some((k) => service.includes(k))

    if (isAirportRoute) {
      return {
        key: 'hotel',
        title: t.partnerOfferHotelTitle,
        hint: t.partnerOfferHotelHint,
        href: 'https://www.booking.com/city/kz/astana.html',
      }
    }

    if (isDowntownRoute) {
      return {
        key: 'food',
        title: t.partnerOfferFoodTitle,
        hint: t.partnerOfferFoodHint,
        href: 'https://2gis.kz/astana/search/%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D1%8B',
      }
    }

    if (isIntercityRoute) {
      return {
        key: 'insurance',
        title: t.partnerOfferInsuranceTitle,
        hint: t.partnerOfferInsuranceHint,
        href: 'https://kaspi.kz/guide/insurance/',
      }
    }

    return null
  }, [formData.service, formData.address, t])
  const maskPhone = (phone) => {
    const digits = (phone || '').replace(/\D/g, '')
    if (digits.length < 4) return ''
    return `+7***${digits.slice(-4)}`
  }

  const addToHistory = () => {
    const newOrder = {
      id: Date.now(),
      service: formData.service,
      date: formData.date,
      birthDate: formData.birthDate,
      estimatedPriceKzt,
      name: formData.name.trim(),
      phone: formData.phone,
      phoneMasked: maskPhone(formData.phone),
      address: formData.address.trim(),
      comment: formData.comment.trim(),
      status: 'new',
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    }
    const nextHistory = [newOrder, ...orderHistory.slice(0, 9)]
    setOrderHistory(nextHistory)
    writeScopedValue('orderHistory', nextHistory, rememberDataOnDevice)
  }

  const clearHistory = () => {
    setOrderHistory([])
    sessionStorage.removeItem('orderHistory')
    localStorage.removeItem('orderHistory')
  }

  const updateOrderStatus = (orderId, nextStatus) => {
    const updatedOrders = orderHistory.map((order) => (
      order.id === orderId
        ? { ...order, status: nextStatus, updatedAt: new Date().toLocaleString() }
        : order
    ))
    setOrderHistory(updatedOrders)
    writeScopedValue('orderHistory', updatedOrders, rememberDataOnDevice)
  }

  const statusLabels = {
    new: t.statusNew,
    confirmed: t.statusConfirmed,
    on_way: t.statusOnWay,
    completed: t.statusCompleted,
    canceled: t.statusCanceled,
  }

  const getStatusLabel = (status) => statusLabels[status] || t.statusNew

  const statusSteps = ['new', 'confirmed', 'on_way', 'completed']
  const latestOrder = orderHistory[0]
  const currentStatusIndex = latestOrder ? statusSteps.indexOf(latestOrder.status || 'new') : -1

  const repeatDiscount = useMemo(() => {
    if (!latestOrder?.id) {
      return { eligible: false, code: '' }
    }

    const lastOrderTs = Number(latestOrder.id)
    if (!Number.isFinite(lastOrderTs)) {
      return { eligible: false, code: '' }
    }

    const daysSinceLastOrder = (Date.now() - lastOrderTs) / (1000 * 60 * 60 * 24)
    if (daysSinceLastOrder < 5) {
      return { eligible: false, code: '' }
    }

    const code = `RETURN10-${new Date(lastOrderTs).toISOString().slice(0, 10).replace(/-/g, '')}`
    return { eligible: true, code }
  }, [latestOrder])

  const orderHabitReminder = useMemo(() => {
    if (orderHistory.length < 3) return null

    const weekdayCounts = orderHistory.reduce((acc, order) => {
      const ts = Number(order.id || 0)
      if (!Number.isFinite(ts) || ts <= 0) return acc
      const day = new Date(ts).getDay()
      acc[day] = (acc[day] || 0) + 1
      return acc
    }, {})

    const [topDayRaw, topCountRaw] = Object.entries(weekdayCounts).sort((a, b) => b[1] - a[1])[0] || []
    const topCount = Number(topCountRaw || 0)
    const topDay = Number(topDayRaw)
    if (!Number.isFinite(topDay) || topCount < 3) return null

    const today = new Date()
    const currentDay = today.getDay()
    let daysUntil = (topDay - currentDay + 7) % 7
    if (daysUntil === 0) daysUntil = 7

    const nextDate = new Date(today)
    nextDate.setHours(0, 0, 0, 0)
    nextDate.setDate(nextDate.getDate() + daysUntil)

    const locale = language === 'kk' ? 'kk-KZ' : (language === 'en' ? 'en-US' : 'ru-RU')
    const weekdayLabel = nextDate.toLocaleDateString(locale, { weekday: 'long' })
    const nextDateLabel = nextDate.toLocaleDateString(locale, { day: '2-digit', month: 'long' })

    const inputDate = new Date(nextDate)
    inputDate.setMinutes(inputDate.getMinutes() - inputDate.getTimezoneOffset())

    return {
      weekdayLabel,
      nextDateLabel,
      nextDateInput: inputDate.toISOString().slice(0, 10),
    }
  }, [orderHistory, language])

  const isBirthdayToday = useMemo(() => {
    if (!formData.birthDate) return false
    const today = new Date()
    const birthDate = new Date(formData.birthDate)
    if (Number.isNaN(birthDate.getTime())) return false
    return today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate()
  }, [formData.birthDate])

  const currentYear = String(new Date().getFullYear())
  const birthdayBonusClaimed = birthdayBonusYear === currentYear

  const claimBirthdayBonus = () => {
    if (!isBirthdayToday || birthdayBonusClaimed) return
    setBirthdayBonusYear(currentYear)
  }

  const referralCode = useMemo(() => {
    const suffix = (formData.phone || '').replace(/\D/g, '').slice(-4) || '0000'
    const namePart = (formData.name || 'TP').trim().slice(0, 2).toUpperCase() || 'TP'
    return `REF-${namePart}${suffix}`
  }, [formData.name, formData.phone])

  const copyReferralText = async () => {
    trackCtaClick('copy_referral_text')
    const referralMessage = [
      'MAX Taxi Park — такси и трансферы в Астане',
      `Промокод друга: ${referralCode}`,
      'Скажите этот код менеджеру в WhatsApp и получите скидку 5%',
      `https://wa.me/${whatsappNumber}`,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(referralMessage)
      setReferralCopied(true)
      setTimeout(() => setReferralCopied(false), 1800)
    } catch (error) {
      // ignore clipboard errors
    }
  }

  const loyaltyStats = useMemo(() => {
    const ordersCount = orderHistory.length
    const points = ordersCount * 10 + (birthdayBonusClaimed ? 50 : 0)
    const levels = [
      { key: 'bronze', minOrders: 1, nextAt: 3 },
      { key: 'silver', minOrders: 3, nextAt: 10 },
      { key: 'gold', minOrders: 10, nextAt: 10 },
    ]

    let currentLevel = { key: 'bronze', minOrders: 1, nextAt: 3 }
    if (ordersCount >= 10) {
      currentLevel = levels[2]
    } else if (ordersCount >= 3) {
      currentLevel = levels[1]
    }

    const nextLevelOrders = currentLevel.key === 'gold'
      ? 0
      : Math.max(0, currentLevel.nextAt - ordersCount)

    const progressPercent = currentLevel.key === 'gold'
      ? 100
      : Math.min(100, Math.round((ordersCount / currentLevel.nextAt) * 100))

    return {
      ordersCount,
      points,
      level: currentLevel,
      nextLevelOrders,
      progressPercent,
    }
  }, [orderHistory, birthdayBonusClaimed])

  const monthlyOrders = useMemo(() => {
    const byMonth = orderHistory.reduce((acc, order) => {
      const timestamp = Number(order.id)
      const date = Number.isFinite(timestamp) ? new Date(timestamp) : new Date()
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      if (!acc[key]) {
        acc[key] = { date, orders: [] }
      }
      acc[key].orders.push(order)
      return acc
    }, {})

    return Object.keys(byMonth)
      .sort((a, b) => (a < b ? 1 : -1))
      .map((key) => {
        const group = byMonth[key]
        const completed = group.orders.filter((order) => (order.status || 'new') === 'completed').length
        const active = group.orders.filter((order) => !['completed', 'canceled'].includes(order.status || 'new')).length
        const serviceCounts = group.orders.reduce((acc, order) => {
          const serviceName = order.service || '-'
          acc[serviceName] = (acc[serviceName] || 0) + 1
          return acc
        }, {})
        const topService = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'
        return {
          key,
          label: group.date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'kk' ? 'kk-KZ' : 'ru-RU', {
            month: 'long',
            year: 'numeric',
          }),
          orders: group.orders,
          stats: { completed, active, topService },
        }
      })
  }, [orderHistory, language])

  const historyFinancialSummary = useMemo(() => {
    if (!orderHistory.length) {
      return { totalSpent: 0, avgCheck: 0, favoriteService: '-' }
    }

    const totalSpent = orderHistory.reduce((sum, order) => {
      const orderPrice = Number(order.estimatedPriceKzt || 0) || estimatePriceKzt(order.service, order.date)
      return sum + orderPrice
    }, 0)

    const avgCheck = Math.round(totalSpent / orderHistory.length)
    const serviceCounter = orderHistory.reduce((acc, order) => {
      const key = order.service || '-'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
    const favoriteService = Object.entries(serviceCounter).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'

    return { totalSpent, avgCheck, favoriteService }
  }, [orderHistory])

  const copyPromoCode = async () => {
    if (!repeatDiscount.code) return
    try {
      await navigator.clipboard.writeText(repeatDiscount.code)
      setPromoCopied(true)
      setTimeout(() => setPromoCopied(false), 1800)
      setFormData((prev) => ({
        ...prev,
        comment: prev.comment?.includes(repeatDiscount.code)
          ? prev.comment
          : `${prev.comment ? `${prev.comment} | ` : ''}Промокод: ${repeatDiscount.code}`,
      }))
    } catch (error) {
      // ignore clipboard errors
    }
  }

  const activeOrdersCount = orderHistory.filter((order) => !['completed', 'canceled'].includes(order.status || 'new')).length
  const completedOrdersCount = orderHistory.filter((order) => (order.status || 'new') === 'completed').length
  const isTransferReady = Boolean(
    transferDraft.clientName.trim()
    && transferDraft.routeFrom.trim()
    && transferDraft.routeTo.trim()
    && transferDraft.driver.trim()
    && transferDraft.vehicle.trim()
    && transferDraft.date
    && transferDraft.startTime
    && transferDraft.endTime
    && !transferConflict
  )
  const visibleTransfers = role === 'admin'
    ? transfers
    : transfers.filter((transfer) => transfer.driver && staffSession?.login && transfer.driver.toLowerCase() === staffSession.login.toLowerCase())
  const filteredTransfers = visibleTransfers.filter((transfer) => {
    const matchDate = !transferFilters.date || transfer.date === transferFilters.date
    const matchDriver = !transferFilters.driver || (transfer.driver || '').toLowerCase() === transferFilters.driver.toLowerCase()
    const matchVehicle = !transferFilters.vehicle || (transfer.vehicle || '').toLowerCase().includes(transferFilters.vehicle.toLowerCase())
    const q = transferFilters.query.trim().toLowerCase()
    const matchQuery = !q || [transfer.clientName, transfer.routeFrom, transfer.routeTo, transfer.vehicle, transfer.driver, transfer.service]
      .some((field) => (field || '').toLowerCase().includes(q))
    return matchDate && matchDriver && matchVehicle && matchQuery
  })
  const transfersToDisplay = role === 'admin' ? filteredTransfers : visibleTransfers

  const handleStaffLogin = (event) => {
    event.preventDefault()
    if (!DEMO_STAFF_ENABLED) {
      setAuthError(t.staffLoginDisabled)
      return
    }

    const login = authLogin.trim().toLowerCase()
    if (!login) {
      setAuthError(t.invalidCredentials)
      return
    }

    if (login === ADMIN_LOGIN) {
      setStaffSession({ role: 'admin', login: ADMIN_LOGIN })
      setAuthError('')
      setShowStaffAuth(false)
      setAuthLogin('')
      return
    }

    const matchedDriver = driverAccounts.find((driver) => driver.login.toLowerCase() === login)
    if (matchedDriver) {
      setStaffSession({ role: 'driver', login: matchedDriver.login })
      setAuthError('')
      setShowStaffAuth(false)
      setAuthLogin('')
      return
    }

    setAuthError(t.invalidCredentials)
  }

  const handleStaffLogout = () => {
    setStaffSession(null)
    setDesktopTab('home')
    setMobileTab('home')
  }

  const addDriverAccount = (event) => {
    event.preventDefault()
    const login = newDriverLogin.trim().toLowerCase()
    if (!login) return
    if (login === ADMIN_LOGIN) return
    if (driverAccounts.some((driver) => driver.login.toLowerCase() === login)) return
    const newDriver = { id: Date.now(), login }
    setDriverAccounts((prev) => [newDriver, ...prev])
    setNewDriverLogin('')
  }

  const repeatOrder = (order) => {
    setFormData({
      name: order.name || '',
      phone: order.phone || '+7',
      service: order.service || services[0]?.title || '',
      date: getTodayDate(),
      birthDate: order.birthDate || formData.birthDate || '',
      comment: order.comment || '',
      address: order.address || '',
    })
    setMobileTab('booking')
    setDesktopTab('booking')
  }

  const sendReceiptByEmail = (order) => {
    const savedEmail = getStoredValue('receiptEmail', '')
    const rawEmail = window.prompt(t.receiptPrompt, savedEmail)
    if (rawEmail === null) return

    const email = rawEmail.trim()
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitNotice(t.receiptInvalid)
      setTimeout(() => setSubmitNotice(''), 2500)
      return
    }

    const orderPrice = Number(order.estimatedPriceKzt || 0) || estimatePriceKzt(order.service, order.date)
    const subject = `MAX Taxi - ${order.service || '-'} - ${order.createdAt || ''}`
    const body = [
      'MAX Taxi',
      `${t.waService}: ${order.service || '-'}`,
      `${t.waDate}: ${order.date || '-'}`,
      `${t.waName}: ${order.name || '-'}`,
      `${t.waPhone}: ${order.phoneMasked || order.phone || '-'}`,
      `${t.waAddress}: ${order.address || '-'}`,
      `${t.priceEstimateLabel}: ${Number(orderPrice).toLocaleString()} KZT`,
      `${t.orderStatus}: ${getStatusLabel(order.status || 'new')}`,
      `${t.orderCreated}: ${order.createdAt || '-'}`,
    ].join('\n')

    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto

    try {
      if (email) {
        localStorage.setItem('receiptEmail', email)
      }
    } catch (error) {
      // ignore storage errors
    }

    const updatedOrders = orderHistory.map((item) => (
      item.id === order.id
        ? { ...item, receiptEmail: email || item.receiptEmail || '', receiptSentAt: new Date().toLocaleString() }
        : item
    ))
    setOrderHistory(updatedOrders)
    writeScopedValue('orderHistory', updatedOrders, rememberDataOnDevice)
    setSubmitNotice(t.receiptOpened)
    setTimeout(() => setSubmitNotice(''), 2500)
  }

  const downloadReceiptPdf = async (order) => {
    const { default: html2pdf } = await import('html2pdf.js')
    const orderPrice = Number(order.estimatedPriceKzt || 0) || estimatePriceKzt(order.service, order.date)
    const wrapper = document.createElement('div')
    wrapper.style.position = 'fixed'
    wrapper.style.left = '-9999px'
    wrapper.style.top = '0'
    wrapper.style.width = '800px'
    wrapper.style.background = '#ffffff'
    wrapper.style.color = '#111827'
    wrapper.style.padding = '32px'
    wrapper.style.fontFamily = 'Arial, sans-serif'
    wrapper.innerHTML = `
      <div style="border:1px solid #e5e7eb; border-radius:16px; padding:24px;">
        <h1 style="margin:0 0 8px; font-size:28px;">MAX Taxi</h1>
        <p style="margin:0 0 24px; color:#6b7280; font-size:14px;">${t.receiptPdfButton}</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:14px;">
          <div><strong>${t.waService}:</strong><br>${order.service || '-'}</div>
          <div><strong>${t.orderStatus}:</strong><br>${getStatusLabel(order.status || 'new')}</div>
          <div><strong>${t.waDate}:</strong><br>${order.date || '-'}</div>
          <div><strong>${t.orderCreated}:</strong><br>${order.createdAt || '-'}</div>
          <div><strong>${t.waName}:</strong><br>${order.name || '-'}</div>
          <div><strong>${t.waPhone}:</strong><br>${order.phoneMasked || order.phone || '-'}</div>
        </div>
        <div style="margin-top:18px; font-size:14px;">
          <strong>${t.waAddress}:</strong>
          <div style="margin-top:6px; color:#374151;">${order.address || '-'}</div>
        </div>
        <div style="margin-top:18px; font-size:14px;">
          <strong>${t.waComment}:</strong>
          <div style="margin-top:6px; color:#374151;">${order.comment || '-'}</div>
        </div>
        <div style="margin-top:24px; padding-top:16px; border-top:1px solid #e5e7eb; font-size:16px;">
          <strong>${t.priceEstimateLabel}: ${Number(orderPrice).toLocaleString()} ₸</strong>
        </div>
      </div>
    `

    document.body.appendChild(wrapper)

    try {
      await html2pdf()
        .set({
          margin: 10,
          filename: `max-taxi-receipt-${order.id}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(wrapper)
        .save()
      setSubmitNotice(t.receiptPdfReady)
      setTimeout(() => setSubmitNotice(''), 2500)
    } catch (error) {
      setSubmitNotice(t.receiptPdfFailed)
      setTimeout(() => setSubmitNotice(''), 2500)
    } finally {
      document.body.removeChild(wrapper)
    }
  }

  const addFavorite = () => {
    const normalizedAddress = formData.address.trim()
    if (!normalizedAddress) return

    const exists = favorites.some((favorite) => favorite.address.trim().toLowerCase() === normalizedAddress.toLowerCase())
    if (exists) return

    const newFav = { address: normalizedAddress, name: `${t.favoriteAddressPrefix} ${favorites.length + 1}`, id: Date.now() }
    const nextFavorites = [...favorites, newFav]
    setFavorites(nextFavorites)
    writeScopedValue('favorites', nextFavorites, rememberDataOnDevice)
  }

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f.id !== id)
    setFavorites(updated)
    writeScopedValue('favorites', updated, rememberDataOnDevice)
  }

  const clearSessionSensitiveState = () => {
    const defaultService = services[0]?.title || ''
    setFormData({ name: '', phone: '+7', service: defaultService, date: '', birthDate: '', comment: '', address: '' })
    setOrderHistory([])
    setFavorites([])
    setStaffSession(null)
    setDriverAccounts([])
    setTransfers([])
    SENSITIVE_STORAGE_KEYS.forEach((key) => sessionStorage.removeItem(key))
  }

  const clearSensitiveData = () => {
    const defaultService = services[0]?.title || ''
    const resetFormData = { name: '', phone: '+7', service: defaultService, date: '', birthDate: '', comment: '', address: '' }
    setFormData(resetFormData)
    setOrderHistory([])
    setFavorites([])
    setStaffSession(null)
    setDriverAccounts([])
    setTransfers([])
    setSubmitNotice(t.dataCleared)
    SENSITIVE_STORAGE_KEYS.forEach((key) => {
      sessionStorage.removeItem(key)
      localStorage.removeItem(key)
    })
  }

  useEffect(() => {
    if (rememberDataOnDevice) return

    let timeoutId
    const scheduleExpiry = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        clearSessionSensitiveState()
        setSubmitNotice(t.dataCleared)
      }, INACTIVITY_TIMEOUT_MS)
    }

    ACTIVITY_EVENTS.forEach((eventName) => window.addEventListener(eventName, scheduleExpiry, { passive: true }))
    scheduleExpiry()

    return () => {
      clearTimeout(timeoutId)
      ACTIVITY_EVENTS.forEach((eventName) => window.removeEventListener(eventName, scheduleExpiry))
    }
  }, [rememberDataOnDevice, t.dataCleared])

  const updateTransferDraftField = (field, value) => {
    const nextDraft = { ...transferDraft, [field]: value }
    setTransferDraft(nextDraft)
    setTransferNotice('')
    setTransferConflict(findTransferConflict(nextDraft))
  }

  const updateTransferFilter = (field, value) => {
    setTransferFilters((prev) => ({ ...prev, [field]: value }))
  }

  const trackCtaClick = (key) => {
    setCtaMetrics((prev) => {
      const next = { ...prev, [key]: (prev?.[key] || 0) + 1 }
      try {
        localStorage.setItem('ctaMetrics', JSON.stringify(next))
      } catch (error) {
        // ignore storage errors
      }
      return next
    })
  }

  const goToBooking = (source = 'unknown') => {
    trackCtaClick(`open_booking_${source}`)
    setMobileTab('booking')
    setDesktopTab('booking')
  }

  const setPreferredContactChannel = (channel) => {
    const next = channel === 'call' ? 'call' : 'whatsapp'
    setPreferredContact(next)
    trackCtaClick(`preferred_contact_${next}`)
    try {
      localStorage.setItem('preferredContact', next)
    } catch (error) {
      // ignore storage errors
    }
  }

  const handlePrimaryCta = (source = 'unknown') => {
    if (preferredContact === 'call') {
      trackCtaClick(`open_call_${source}`)
      window.location.href = `tel:+${whatsappNumber}`
      return
    }
    goToBooking(source)
  }

  const openPartnerOffer = () => {
    if (!partnerOffer?.href) return
    trackCtaClick(`partner_offer_${partnerOffer.key}`)
    window.open(partnerOffer.href, '_blank', 'noopener,noreferrer')
  }

  const dismissInstallBanner = () => {
    setShowInstallBanner(false)
    try {
      localStorage.setItem('installPromptDismissed', '1')
      localStorage.setItem('installPromptDismissedAt', String(Date.now()))
    } catch (error) {
      // ignore storage errors
    }
  }

  const installApp = async () => {
    if (!deferredInstallPrompt) return
    try {
      deferredInstallPrompt.prompt()
      const choiceResult = await deferredInstallPrompt.userChoice
      if (choiceResult?.outcome === 'accepted') {
        setShowInstallBanner(false)
      } else {
        setShowInstallBanner(false)
        localStorage.setItem('installPromptDismissed', '1')
        localStorage.setItem('installPromptDismissedAt', String(Date.now()))
      }
    } catch (error) {
      // ignore prompt errors
    }
    setDeferredInstallPrompt(null)
  }

  const clearTransferFilters = () => setTransferFilters({ date: '', driver: '', vehicle: '', query: '' })

  const dismissReactivationNudge = () => {
    setShowReactivationNudge(false)
    try {
      localStorage.setItem('reactivationDismissedAt', String(Date.now()))
    } catch (error) {
      // ignore
    }
  }

  const copyReactivationCode = () => {
    const t = translations[language]
    try {
      navigator.clipboard.writeText(t.reactivationCode || 'WELCOME5')
    } catch (error) {
      // ignore
    }
    setReactivationCopied(true)
    setTimeout(() => setReactivationCopied(false), 2000)
  }

  const applyOrderHabitDate = () => {
    if (!orderHabitReminder?.nextDateInput) return
    setFormData((prev) => ({ ...prev, date: orderHabitReminder.nextDateInput }))
    setShowOrderHabitNudge(false)
    trackCtaClick('order_habit_apply_date')
    setSubmitNotice(t.orderHabitApplied)
    setTimeout(() => setSubmitNotice(''), 2500)
  }

  const dismissOrderHabitNudge = () => {
    setShowOrderHabitNudge(false)
    trackCtaClick('order_habit_dismiss')
    try {
      localStorage.setItem('orderHabitNudgeDismissedAt', String(Date.now()))
    } catch (error) {
      // ignore storage errors
    }
  }

  const saveFavNote = (favId) => {
    const updated = favorites.map((fav) => fav.id === favId ? { ...fav, note: favNoteDraft.trim() } : fav)
    setFavorites(updated)
    writeScopedValue('favorites', updated, rememberDataOnDevice)
    setEditingFavNoteId(null)
    setFavNoteDraft('')
  }

  const startEditFavNote = (fav) => {
    setEditingFavNoteId(fav.id)
    setFavNoteDraft(fav.note || '')
  }

  const createTransfer = (event) => {
    event.preventDefault()
    const conflictMessage = findTransferConflict(transferDraft)
    if (conflictMessage) {
      setTransferConflict(conflictMessage)
      setTransferNotice('')
      return
    }
    const newTransfer = { ...transferDraft, id: Date.now() }
    setTransfers((prev) => [newTransfer, ...prev])
    setTransferDraft(getEmptyTransferDraft())
    setTransferConflict('')
    setTransferNotice(t.transferSaved)
    setImportNotice('')
  }

  const removeTransfer = (transferId) => {
    setTransfers((prev) => prev.filter((transfer) => transfer.id !== transferId))
  }

  const exportTransfers = () => {
    const dataStr = JSON.stringify(transfers, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transfers.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importTransfers = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const raw = typeof reader.result === 'string' ? reader.result : ''
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) throw new Error('invalid')
        const normalized = parsed.map((item) => {
          const hasRequired = typeof item === 'object' && item !== null && item.clientName && item.routeFrom && item.routeTo
          if (!hasRequired) throw new Error('invalid')
          return {
            id: item.id || Date.now() + Math.random(),
            clientName: item.clientName || '',
            service: item.service || services[0]?.title || '',
            routeFrom: item.routeFrom || '',
            routeTo: item.routeTo || '',
            date: item.date || getTodayDate(),
            startTime: item.startTime || '09:00',
            endTime: item.endTime || '10:00',
            driver: item.driver || '',
            vehicle: item.vehicle || '',
            status: item.status || 'confirmed',
          }
        })
        setTransfers(normalized)
        setImportNotice(t.importSuccess)
        setTransferNotice('')
        setTransferConflict('')
      } catch (error) {
        setImportNotice(t.importError)
      } finally {
        // Reset value so selecting the same file triggers onChange again.
        event.target.value = ''
      }
    }
    reader.readAsText(file)
  }

  const printSchedule = () => window.print()

  const applyQuickScenario = (scenario, target = 'mobile') => {
    setFormData((prev) => ({
      ...prev,
      service: scenario.service,
      address: prev.address || scenario.address,
      date: prev.date || getTodayDate(),
    }))
    if (target === 'mobile') {
      setMobileTab('booking')
    } else {
      setDesktopTab('booking')
    }
  }

  const requestNotifications = async () => {
    if (typeof Notification === 'undefined') {
      setNotificationHint(t.notifyBlocked)
      return
    }
    try {
      const permission = await Notification.requestPermission()
      const allowed = permission === 'granted'
      setNotificationsAllowed(allowed)
      setNotificationHint(allowed ? t.notifyEnabled : t.notifyBlocked)
    } catch (error) {
      setNotificationsAllowed(false)
      setNotificationHint(t.notifyBlocked)
    }
  }

  const pushLocalNotification = (title, body) => {
    if (!notificationsAllowed) return
    if (typeof Notification === 'undefined') return
    try {
      new Notification(title, { body })
    } catch (error) {
      // ignore notification errors
    }
  }

  const detectCurrentLocation = async () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocationNotice(t.locationUnavailable)
      return
    }

    setLocationLookupInProgress(true)
    setLocationNotice('')
    trackCtaClick('detect_location')

    const getPosition = () => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      })
    })

    try {
      const position = await getPosition()
      const { latitude, longitude } = position.coords

      let resolvedAddress = ''
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=${language}`)
        if (response.ok) {
          const data = await response.json()
          resolvedAddress = data?.display_name || ''
        }
      } catch (error) {
        // ignore reverse geocoding errors and use coordinates fallback
      }

      const fallbackAddress = `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
      setFormData((prev) => ({ ...prev, address: resolvedAddress || fallbackAddress }))
      setLocationNotice(resolvedAddress ? t.locationSuccess : `${t.locationSuccess} (${fallbackAddress})`)
    } catch (error) {
      if (error?.code === 1) {
        setLocationNotice(t.locationDenied)
      } else {
        setLocationNotice(t.locationFailed)
      }
    } finally {
      setLocationLookupInProgress(false)
    }
  }

  const startVoiceInputForAddress = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setVoiceInputNotice(t.voiceInputUnsupported)
      return
    }

    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop()
      } catch (error) {
        // ignore stop errors
      }
    }

    const recognition = new SpeechRecognition()
    speechRecognitionRef.current = recognition
    recognition.lang = language === 'kk' ? 'kk-KZ' : language === 'en' ? 'en-US' : 'ru-RU'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    setVoiceInputActive(true)
    setVoiceInputNotice('')
    trackCtaClick('voice_input_address')

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript?.trim()
      if (!transcript) {
        setVoiceInputNotice(t.voiceInputNoSpeech)
        return
      }
      setFormData((prev) => ({
        ...prev,
        address: prev.address ? `${prev.address} ${transcript}`.trim() : transcript,
      }))
      setVoiceInputNotice(t.voiceInputApplied)
    }

    recognition.onerror = () => {
      setVoiceInputNotice(t.voiceInputNoSpeech)
    }

    recognition.onend = () => {
      setVoiceInputActive(false)
      speechRecognitionRef.current = null
    }

    recognition.start()
  }

  useEffect(() => () => {
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop()
      } catch (error) {
        // ignore stop errors
      }
    }
  }, [])

  const whatsappHref = useMemo(() => {
    const messageParts = [
      t.waMessageTitle,
      `${t.waName}: ${formData.name || '-'}`,
      `${t.waPhone}: ${formData.phone || '-'}`,
      `${t.waService}: ${formData.service || '-'}`,
      `${t.waDate}: ${formData.date || '-'}`,
    ]

    if (includeSensitiveInMessage) {
      messageParts.push(`${t.waAddress}: ${formData.address || '-'}`)
      messageParts.push(`${t.waComment}: ${formData.comment || '-'}`)
    }

    const message = messageParts.join('\n')
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  }, [formData, includeSensitiveInMessage, t])

  const submitOrder = () => {
    if (!privacyConsentChecked) {
      setSubmitNotice(t.submitConsentRequired)
      return
    }
    if (!canSubmit) return
    trackCtaClick('submit_order')
    addToHistory()
    const popup = window.open(whatsappHref, '_blank', 'noopener,noreferrer')
    if (!popup) {
      window.location.href = whatsappHref
      return
    }
    setSubmitNotice(t.submitSuccess)
    setShowReferralNudge(true)
    setTimeout(() => setSubmitNotice(''), 3500)
    setTimeout(() => setShowReferralNudge(false), 8000)
    pushLocalNotification(t.notifyTitle, `${t.notifyBody}: ${formData.service || ''}`)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitOrder()
  }

  const updateField = (event) => {
    const { name, value } = event.target
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '')
      let normalized = digits
      
      // Handle empty input
      if (!digits) {
        setFormData((prev) => ({ ...prev, phone: '+7' }))
        return
      }
      
      // Convert leading 8 to 7 (old format)
      if (digits.startsWith('8')) {
        normalized = `7${digits.slice(1)}`
      } 
      // If doesn't start with 7, prepend it
      else if (!digits.startsWith('7')) {
        normalized = `7${digits}`
      }
      
      // Limit to 11 digits and ensure format is correct
      const sliced = normalized.slice(0, 11)
      const formatted = `+${sliced}`
      
      setFormData((prev) => ({ ...prev, phone: formatted }))
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="dark app-shell">
      {/* 🎯 Компоненты улучшений */}
      <WhatsAppQRModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} whatsappNumber={whatsappNumber} />
      <ExitIntentPopup isOpen={showExitIntent} onClose={() => setShowExitIntent(false)} t={t} />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl supports-[backdrop-filter]:bg-black/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <a href="#top" className="font-serif text-lg tracking-[0.2em] text-accent drop-shadow-[0_0_10px_rgba(245,200,106,0.35)]">MAX</a>
          
          <div className="hidden md:flex gap-5 items-center text-sm">
            {role === 'client' && (
              <nav className="flex gap-5">
                <button onClick={() => setDesktopTab('services')} className="hover:text-accent transition">{t.services}</button>
                <button onClick={() => setDesktopTab('standards')} className="hover:text-accent transition">{t.standards}</button>
                <button onClick={() => setDesktopTab('booking')} className="hover:text-accent transition">{t.booking}</button>
                <button onClick={() => setDesktopTab('contacts')} className="hover:text-accent transition">{t.contacts}</button>
              </nav>
            )}
            
            <div className="flex gap-2 border-l border-white/20 pl-5">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs cursor-pointer hover:border-accent transition">
                <option value="ru">РУ</option>
                <option value="kk">KK</option>
                <option value="en">EN</option>
              </select>
              {role === 'client' && DEMO_STAFF_ENABLED ? (
                <button onClick={() => setShowStaffAuth(true)} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs hover:border-accent transition">
                  {t.staffLogin}
                </button>
              ) : role !== 'client' ? (
                <button onClick={handleStaffLogout} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs hover:border-accent transition">
                  {t.signOut}
                </button>
              ) : null}
              
              {/* 🎯 Быстрый звонок и QR-код */}
              {role === 'client' && (
                <>
                  <a href={`tel:+${whatsappNumber}`} className="flex items-center gap-1 px-3 py-1.5 bg-accent text-black text-xs font-bold rounded hover:bg-accent/90 transition">
                    <Phone size={16} />
                    <span className="hidden sm:inline">Звонок</span>
                  </a>
                  <button onClick={() => setShowQRModal(true)} className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded hover:bg-green-600 transition">
                    <MessageCircle size={16} />
                    <span className="hidden sm:inline">QR</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5"
            aria-label={t.menuMore}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-white/10 bg-black/95">
            <nav className="flex flex-col gap-2 px-4 py-4 text-sm">
              {role === 'client' && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setMobileMenuOpen(false); setMobileTab('home') }}
                    className={`w-full text-left py-2 px-3 rounded-lg border transition ${mobileTab === 'home' ? 'bg-accent text-black border-accent font-semibold' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                  >
                    {t.home}
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); setMobileTab('services') }}
                    className={`w-full text-left py-2 px-3 rounded-lg border transition ${mobileTab === 'services' ? 'bg-accent text-black border-accent font-semibold' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                  >
                    {t.services}
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); setMobileTab('standards') }}
                    className={`w-full text-left py-2 px-3 rounded-lg border transition ${mobileTab === 'standards' ? 'bg-accent text-black border-accent font-semibold' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                  >
                    {t.standards}
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); setMobileTab('contacts') }}
                    className={`w-full text-left py-2 px-3 rounded-lg border transition ${mobileTab === 'contacts' ? 'bg-accent text-black border-accent font-semibold' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                  >
                    {t.contacts}
                  </button>
                </div>
              )}
              <div className="border-t border-white/10 my-2 pt-2">
                {role === 'client' && (
                  <>
                    <button
                      onClick={() => { setMobileMenuOpen(false); setMobileTab('history') }}
                      className="w-full text-left py-2 px-3 rounded-lg bg-cyan-950/20 hover:bg-cyan-950/30 transition text-xs"
                    >
                      📋 {t.history} ({orderHistory.length})
                    </button>
                    <button
                      onClick={() => { setMobileMenuOpen(false); setMobileTab('favorites') }}
                      className="w-full text-left py-2 px-3 rounded-lg bg-pink-950/20 hover:bg-pink-950/30 transition text-xs mt-2"
                    >
                      ❤️ {t.favorites} ({favorites.length})
                    </button>
                  </>
                )}
                
                {/* 🎯 Быстрая связь в мобильном меню */}
                {role === 'client' && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    <a 
                      href={`tel:+${whatsappNumber}`} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-accent text-black text-xs font-bold rounded hover:bg-accent/90 transition"
                    >
                      <Phone size={14} />
                      {t.supportCall}
                    </a>
                    <button 
                      onClick={() => { setShowQRModal(true); setMobileMenuOpen(false) }}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500 text-white text-xs font-bold rounded hover:bg-green-600 transition"
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </button>
                  </div>
                )}
                
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-2 w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs cursor-pointer hover:border-accent transition">
                  <option value="ru">РУ</option>
                  <option value="kk">KK</option>
                  <option value="en">EN</option>
                </select>
                {role === 'client' && DEMO_STAFF_ENABLED ? (
                  <button onClick={() => { setShowStaffAuth(true); setMobileMenuOpen(false) }} className="mt-2 w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs hover:border-accent transition">
                    {t.staffLogin}
                  </button>
                ) : role !== 'client' ? (
                  <button onClick={() => { handleStaffLogout(); setMobileMenuOpen(false) }} className="mt-2 w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs hover:border-accent transition">
                    {t.signOut}
                  </button>
                ) : null}
              </div>
              <button
                onClick={closeMobileMenu}
                className="w-full py-2 text-center rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                {t.close}
              </button>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-2 w-full block py-3 text-center rounded-lg bg-accent text-black font-semibold">{t.whatsapp}</a>
            </nav>
          </div>
        )}
      </header>

      {role === 'client' && repeatDiscount.eligible && (
        <div className="mx-auto mt-3 w-[calc(100%-2rem)] max-w-6xl rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-emerald-100">
              Для вас доступна скидка 10% на повторный заказ. Используйте промокод:
              <span className="ml-2 rounded-md bg-black/40 px-2 py-1 font-semibold text-emerald-300">{repeatDiscount.code}</span>
            </p>
            <button
              type="button"
              onClick={copyPromoCode}
              className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-black hover:bg-emerald-400 transition"
            >
              {promoCopied ? '✓ Скопировано' : 'Скопировать и добавить в комментарий'}
            </button>
          </div>
        </div>
      )}

      {role === 'client' && hasDraft && mobileTab !== 'booking' && desktopTab !== 'booking' && (
        <div className="mx-auto mt-3 w-[calc(100%-2rem)] max-w-6xl rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-amber-100">{t.draftReminder}</p>
            <button
              type="button"
              onClick={() => goToBooking('draft_reminder')}
              className="rounded-lg bg-amber-400 px-3 py-2 text-xs font-semibold text-black hover:bg-amber-300 transition"
            >
              {t.continueDraftShort}
            </button>
          </div>
        </div>
      )}

      {role === 'client' && showInstallBanner && deferredInstallPrompt && (
        <div className="mx-auto mt-3 w-[calc(100%-2rem)] max-w-6xl rounded-xl border border-cyan-500/35 bg-cyan-500/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-cyan-100">{t.installAppTitle}</p>
            <p className="text-xs text-cyan-100/85">{t.installAppHint}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={installApp}
                className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-semibold text-black hover:bg-cyan-300 transition"
              >
                {t.installAppButton}
              </button>
              <button
                type="button"
                onClick={dismissInstallBanner}
                className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15 transition"
              >
                {t.installAppLater}
              </button>
            </div>
          </div>
        </div>
      )}

      {role === 'client' && showReactivationNudge && (
        <div className="mx-auto mt-3 w-[calc(100%-2rem)] max-w-6xl rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-amber-200">{t.reactivationTitle}</p>
            <p className="text-xs text-amber-100/85">{t.reactivationHint}: <span className="font-mono font-bold">{t.reactivationCode}</span></p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { copyReactivationCode(); goToBooking('reactivation_nudge') }}
                className="rounded-lg bg-amber-400 px-3 py-2 text-xs font-semibold text-black hover:bg-amber-300 transition"
              >
                {reactivationCopied ? '✓ Скопировано' : t.reactivationOrder}
              </button>
              <button
                type="button"
                onClick={dismissReactivationNudge}
                className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/15 transition"
              >
                {t.reactivationDismiss}
              </button>
            </div>
          </div>
        </div>
      )}

      {showStaffAuth && DEMO_STAFF_ENABLED && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <form onSubmit={handleStaffLogin} className="w-full max-w-md rounded-2xl border border-white/15 bg-black p-5 space-y-4">
            <h3 className="text-xl font-serif text-accent">{t.staffLogin}</h3>
            <div>
              <label className="text-xs text-white/80">{t.loginLabel}</label>
              <input
                value={authLogin}
                onChange={(event) => setAuthLogin(event.target.value)}
                placeholder={t.staffLoginPlaceholder}
                className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <p className="text-[11px] text-white/60 mt-1">{t.staffLoginHint}</p>
            </div>
            {authError && <p className="text-xs text-red-400">{authError}</p>}
            <div className="flex gap-2">
              <button type="button" onClick={() => setShowStaffAuth(false)} className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15 transition">{t.close}</button>
              <button type="submit" className="flex-1 rounded-lg bg-accent text-black px-3 py-2 text-sm font-semibold hover:bg-accent/90 transition">{t.signIn}</button>
            </div>
          </form>
        </div>
      )}

      {role === 'client' ? (
      <>
      {/* Mobile single-screen tabbed view */}
      <div onPointerDown={closeMobileMenu} className="md:hidden relative min-h-[calc(100vh-120px)] w-full flex flex-col bg-gradient-to-b from-transparent via-black/20 to-black/35 pb-24">
        <div className="flex-1 flex flex-col justify-start items-start px-4 sm:px-5 py-6 sm:py-8 overflow-y-auto">
          {mobileTab === 'home' && (
            <motion.div className="w-full space-y-5 sm:space-y-6 bg-gradient-to-b from-black/70 via-amber-950/20 to-black/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl" {...sectionMotionProps}>
              <div className="border-l-2 border-accent pl-4 sm:pl-5">
                <p className="text-accent text-sm sm:text-base font-bold tracking-wide">{t.heroBadge}</p>
              </div>
              
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight text-white">{t.heroTitle}</h1>
              
              <motion.div
                className="space-y-3 sm:space-y-4 text-white text-sm sm:text-base leading-relaxed font-light"
                {...(prefersReducedMotion ? {} : { variants: heroStagger, initial: 'hidden', animate: 'show' })}
              >
                <motion.p variants={prefersReducedMotion ? {} : fadeUp} transition={{ duration: 0.5 }}>{t.heroP1}</motion.p>
                <motion.p variants={prefersReducedMotion ? {} : fadeUp} transition={{ duration: 0.5 }}>{t.heroP2}</motion.p>
                <motion.p variants={prefersReducedMotion ? {} : fadeUp} transition={{ duration: 0.5 }}>{t.heroP3}</motion.p>
              </motion.div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-white/65 mb-2">{t.preferredContactTitle}</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredContactChannel('call')}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${preferredContact === 'call' ? 'bg-accent text-black' : 'bg-white/10 text-white hover:bg-white/15'}`}
                  >
                    {t.preferCall}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredContactChannel('whatsapp')}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${preferredContact === 'whatsapp' ? 'bg-accent text-black' : 'bg-white/10 text-white hover:bg-white/15'}`}
                  >
                    {t.preferWhatsapp}
                  </button>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 space-y-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-accent/30 animate-ping pointer-events-none" />
                  <button
                    onClick={() => handlePrimaryCta('hero_mobile')}
                    className="relative w-full py-3.5 sm:py-4 rounded-xl bg-accent text-black font-bold text-base sm:text-lg hover:bg-accent/90 active:scale-95 transition shadow-lg"
                  >
                    {primaryStartCta}
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-white/55 px-1">
                  <span>{t.priceFromTrip}</span>
                  <span>{t.legalDisclaimer}</span>
                </div>
              </div>

              {hasDraft && (
                <button
                  onClick={() => goToBooking('continue_draft_mobile')}
                  className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/15 transition"
                >
                  {t.continueDraft}
                </button>
              )}

              <div className="grid grid-cols-1 gap-2">
                {trustPoints.map((point) => (
                  <div key={point} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/90">
                    ✓ {point}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-accent font-semibold">{t.quickScenarios}</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {quickScenarios.map((scenario) => (
                    <button
                      key={scenario.label}
                      onClick={() => applyQuickScenario(scenario, 'mobile')}
                      className="rounded-lg bg-white/8 border border-white/10 px-2 py-2 text-xs font-semibold hover:bg-white/12 transition"
                    >
                      {scenario.label}
                    </button>
                  ))}
                </div>
              </div>


            </motion.div>
          )}

          {mobileTab === 'services' && (
            <motion.div className="w-full space-y-4 sm:space-y-5 bg-gradient-to-b from-black/70 via-blue-950/20 to-black/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl" {...sectionMotionProps}>
              <h2 className="text-2xl sm:text-3xl font-serif text-accent font-bold">{t.services}</h2>
              
              <div className="space-y-3 sm:space-y-4 text-white/75">
                {services.map((service, idx) => {
                  const Icon = service.icon
                  return (
                    <button
                      key={service.title}
                      onClick={() => { setFormData(prev => ({ ...prev, service: service.title })); setMobileTab('booking') }}
                      className="w-full text-left p-4 sm:p-5 rounded-xl bg-gradient-to-r from-white/5 to-white/3 hover:from-white/10 hover:to-white/5 active:scale-95 transition border-l-4 border-accent shadow-md hover:shadow-lg"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <Icon className="text-accent flex-shrink-0 mt-0.5 w-5 h-5 sm:w-6 sm:h-6" />
                        <div className="flex-1">
                          <p className="font-bold text-accent text-base sm:text-lg">{service.title}</p>
                          <p className="text-xs sm:text-sm text-white/60 mt-0.5">{service.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-accent font-semibold mb-3 text-sm sm:text-base">{service.price}</p>
                      <ul className="text-xs sm:text-sm space-y-1.5 text-white/70">
                        {service.details.slice(0, 3).map((detail, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-accent mt-0.5 flex-shrink-0">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                        {service.details.length > 3 && (
                          <li className="text-accent/80 italic pt-1">+ {service.details.length - 3} {t.moreItems}...</li>
                        )}
                      </ul>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {mobileTab === 'standards' && (
            <motion.div className="w-full space-y-4 sm:space-y-5 bg-gradient-to-b from-black/70 via-slate-900/40 to-black/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl" {...sectionMotionProps}>
              <h2 className="text-2xl sm:text-3xl font-serif text-accent font-bold">{t.standards}</h2>
              
              <div className="space-y-3 sm:space-y-4 text-white/75">
                {standards.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.title}
                      onClick={() => { setMobileTab('booking') }}
                      className="w-full text-left p-4 sm:p-5 rounded-xl bg-gradient-to-r from-white/5 to-white/3 hover:from-white/10 hover:to-white/5 active:scale-95 transition border-l-4 border-accent flex items-start gap-3 sm:gap-4 shadow-md"
                      aria-label={item.title}
                    >
                      <Icon className="text-accent flex-shrink-0 mt-0.5 w-6 h-6 sm:w-7 sm:h-7" />
                      <div className="flex-1">
                        <p className="font-bold text-accent mb-2 text-base sm:text-lg">{item.title}</p>
                        <p className="text-sm sm:text-base leading-relaxed">{item.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {mobileTab === 'contacts' && (
            <motion.div className="w-full space-y-4 sm:space-y-5 bg-gradient-to-b from-black/70 via-emerald-950/20 to-black/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl" {...sectionMotionProps}>
              <h2 className="text-2xl sm:text-3xl font-serif text-accent font-bold">{t.contacts}</h2>
              <div className="space-y-3 sm:space-y-4 text-white/90">
                <a href={`tel:${maxPhoneNumber}`} className="block w-full p-4 sm:p-5 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20 active:scale-95 transition border-l-4 border-accent text-base sm:text-lg font-semibold text-accent shadow-md">{maxPhoneLabel}</a>
                <a href={`tel:${alibekPhoneNumber}`} className="block w-full p-4 sm:p-5 rounded-xl bg-gradient-to-r from-white/5 to-white/3 hover:from-white/10 hover:to-white/5 active:scale-95 transition border-l-4 border-accent text-base sm:text-lg font-semibold shadow-md">{alibekPhoneLabel}</a>
              </div>
            </motion.div>
          )}

          {mobileTab === 'booking' && (
            <motion.div className="w-full space-y-4 sm:space-y-5 bg-gradient-to-b from-black/70 via-rose-950/20 to-black/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl" {...sectionMotionProps}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-serif text-accent font-bold">{t.bookingTitle}</h2>
                  <p className="mt-2 text-white/70 text-sm sm:text-base leading-relaxed">{bookingSubtitleCompact}</p>
                </div>
                {savedSince && <span className="text-xs text-green-400 font-semibold whitespace-nowrap mt-1">{t.saved}</span>}
              </div>

              {submitNotice && <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs text-green-300">{submitNotice}</p>}

              {showOrderHabitNudge && orderHabitReminder && (
                <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs text-indigo-100">
                  <p className="font-semibold">{t.orderHabitTitle}</p>
                  <p className="mt-1 text-indigo-100/85">
                    {t.orderHabitHint} <span className="font-semibold capitalize">{orderHabitReminder.weekdayLabel}</span> ({orderHabitReminder.nextDateLabel})
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button type="button" onClick={applyOrderHabitDate} className="rounded-md bg-indigo-300 px-2 py-1 text-[11px] font-semibold text-black hover:bg-indigo-200 transition">
                      {t.orderHabitAction}
                    </button>
                    <button type="button" onClick={dismissOrderHabitNudge} className="rounded-md bg-white/10 px-2 py-1 text-[11px] text-white hover:bg-white/15 transition">
                      {t.orderHabitDismiss}
                    </button>
                  </div>
                </div>
              )}

              {partnerOffer && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
                  <p className="font-semibold">{t.partnerOfferTitle}: {partnerOffer.title}</p>
                  <p className="mt-1 text-emerald-100/80">{partnerOffer.hint}</p>
                  <button type="button" onClick={openPartnerOffer} className="mt-2 rounded-md bg-emerald-400 px-2 py-1 text-[11px] font-semibold text-black hover:bg-emerald-300 transition">
                    {t.partnerOfferOpen}
                  </button>
                </div>
              )}

              {latestOrder && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/75">
                  <p className="text-white/60">{t.lastOrderTitle}</p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="line-clamp-1">{latestOrder.service} · {latestOrder.date || '-'}</p>
                    <div className="flex gap-2">
                      <button onClick={() => repeatOrder(latestOrder)} className="rounded-md bg-accent/20 px-2 py-1 text-accent hover:bg-accent/30 transition">
                        {t.repeat}
                      </button>
                      <button onClick={() => downloadReceiptPdf(latestOrder)} className="rounded-md bg-white/10 px-2 py-1 text-white hover:bg-white/15 transition">
                        {t.receiptPdfButton}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <form className="space-y-3.5 pb-24 sm:space-y-4 sm:pb-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name_mobile" className="block text-xs sm:text-sm font-bold text-white/90 mb-2">{t.nameLabel}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
                    <input 
                      id="name_mobile" 
                      name="name" 
                      autoComplete="name"
                      enterKeyHint="next"
                      placeholder={t.namePlaceholder} 
                      value={formData.name} 
                      onChange={updateField} 
                      onFocus={closeMobileMenu} 
                      className="w-full rounded-xl border-2 border-accent/35 bg-slate-900/90 pl-11 pr-4 py-3 sm:py-3.5 text-base text-white caret-accent sm:text-lg font-medium outline-none focus:border-accent focus:bg-slate-900 transition placeholder-white/55 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.35)]" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone_mobile" className="block text-xs sm:text-sm font-bold text-white/90 mb-2">{t.phoneLabel}</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
                    <input 
                      id="phone_mobile" 
                      name="phone" 
                      type="tel" 
                      inputMode="tel" 
                      autoComplete="tel-national"
                      enterKeyHint="next"
                      placeholder={t.phonePlaceholder} 
                      value={formData.phone} 
                      onChange={updateField} 
                      onFocus={closeMobileMenu} 
                      className={`w-full rounded-xl border-2 pl-11 pr-4 py-3 sm:py-3.5 text-base text-white caret-accent sm:text-lg font-medium outline-none transition ${
                        formData.phone.length > 2 && !isValidPhone(formData.phone)
                          ? 'border-red-500/60 bg-red-500/10 focus:border-red-500/80 focus:bg-red-500/15'
                          : 'border-accent/35 bg-slate-900/90 focus:border-accent focus:bg-slate-900'
                      } placeholder-white/55 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.35)]`}
                    />
                  </div>
                  {formData.phone.length > 2 && !isValidPhone(formData.phone) && (
                    <p className="mt-1.5 text-xs sm:text-sm text-red-400 font-medium">{t.phoneInvalid}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="service_mobile" className="block text-xs sm:text-sm font-bold text-white/90 mb-2">{t.serviceLabel}</label>
                  <select 
                    id="service_mobile"
                    name="service" 
                    value={formData.service} 
                    onChange={updateField} 
                    onFocus={closeMobileMenu} 
                    className="w-full rounded-xl border-2 border-accent/35 bg-slate-900/90 px-4 sm:px-5 py-3 sm:py-3.5 text-base text-white caret-accent sm:text-lg font-medium outline-none focus:border-accent focus:bg-slate-900 transition shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_24px_rgba(0,0,0,0.35)]"
                  >
                    {services.map((service) => (
                      <option key={service.title} value={service.title}>{service.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date_mobile" className="block text-xs sm:text-sm font-bold text-white/90 mb-2">{t.dateLabel}</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
                    <input 
                      id="date_mobile"
                      name="date" 
                      type="date" 
                      min={getTodayDate()} 
                      value={formData.date} 
                      onChange={updateField} 
                      onFocus={closeMobileMenu} 
                      className="w-full rounded-xl border-2 border-white/20 bg-black/60 pl-11 pr-4 py-3 sm:py-3.5 text-base sm:text-lg font-medium outline-none focus:border-accent focus:bg-black/80 transition shadow-md" 
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-white/85">
                  {t.priceEstimateLabel}: <span className="text-accent font-semibold">{estimatedPriceKzt.toLocaleString()} ₸</span>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setShowPricingDetails((prev) => !prev)}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                  >
                    {showPricingDetails ? t.pricingDetailsHide : t.pricingDetailsToggle}
                  </button>
                </div>

                {showPricingDetails && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3 text-xs text-white/80">
                    <p className="text-sm font-semibold text-accent">{t.pricingDetailsTitle}</p>
                    <div className="space-y-2">
                      {pricingOverviewRows.map((row) => (
                        <div key={row.label} className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
                          <span className="text-white/70">{row.label}</span>
                          <span className="text-accent font-semibold text-right">{row.value}</span>
                        </div>
                      ))}
                    </div>
                    {isWeekendEstimate && <p className="text-[11px] text-amber-200">{t.pricingWeekendNote}</p>}
                    <div className="border-t border-white/10 pt-3">
                      <p className="text-sm font-semibold text-accent">{t.paymentMethodsTitle}</p>
                      <p className="mt-1 text-white/70">{t.paymentMethodsList}</p>
                    </div>
                    <p className="text-[11px] text-white/55">{t.pricingFinalNote}</p>
                  </div>
                )}

                <div>
                  <button
                    type="button"
                    onClick={() => setShowMobileDetails((prev) => !prev)}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                  >
                    {showMobileDetails ? t.hideDetails : t.showDetails}
                  </button>
                </div>

                {showMobileDetails && (
                  <>
                    <div>
                      <label htmlFor="birth_mobile" className="block text-xs sm:text-sm font-bold text-white/90 mb-2">{t.birthdayLabel}</label>
                      <input
                        id="birth_mobile"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={updateField}
                        onFocus={closeMobileMenu}
                        className="w-full rounded-xl border-2 border-white/20 bg-black/60 px-4 py-3 sm:py-3.5 text-base sm:text-lg font-medium outline-none focus:border-accent focus:bg-black/80 transition shadow-md"
                      />
                    </div>

                    <div>
                      <label htmlFor="address_mobile" className="block text-xs sm:text-sm font-bold text-white/90 mb-2">{t.addressLabel}</label>
                      <input
                        id="address_mobile"
                        name="address"
                        autoComplete="street-address"
                        enterKeyHint="next"
                        placeholder={t.addressPlaceholder}
                        value={formData.address}
                        onChange={updateField}
                        onFocus={closeMobileMenu}
                        className="w-full rounded-xl border-2 border-white/20 bg-black/60 px-4 sm:px-5 py-3 sm:py-3.5 text-base sm:text-lg font-medium text-white caret-accent outline-none focus:border-accent focus:bg-black/80 transition placeholder-white/55 shadow-md"
                      />
                      <button
                        type="button"
                        onClick={detectCurrentLocation}
                        disabled={locationLookupInProgress}
                        className={`mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          locationLookupInProgress ? 'bg-white/5 text-white/50 cursor-wait' : 'bg-white/10 text-white hover:bg-white/15'
                        }`}
                      >
                        {locationLookupInProgress ? t.locating : t.detectLocation}
                      </button>
                      <button
                        type="button"
                        onClick={startVoiceInputForAddress}
                        disabled={voiceInputActive}
                        className={`mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          voiceInputActive ? 'bg-white/5 text-white/50 cursor-wait' : 'bg-white/10 text-white hover:bg-white/15'
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          <Mic className="h-4 w-4" />
                          {voiceInputActive ? t.voiceInputListening : t.voiceInputAddress}
                        </span>
                      </button>
                      {locationNotice && <p className="mt-2 text-[11px] text-white/60">{locationNotice}</p>}
                      {voiceInputNotice && <p className="mt-2 text-[11px] text-white/60">{voiceInputNotice}</p>}
                      <button
                        type="button"
                        onClick={addFavorite}
                        disabled={!formData.address}
                        className={`mt-2 w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
                          formData.address ? 'bg-accent/20 text-accent hover:bg-accent/30' : 'bg-white/5 text-white/50 cursor-not-allowed'
                        }`}
                      >
                        {t.saveAddress}
                      </button>
                    </div>

                    <div>
                      <label htmlFor="comment_mobile" className="block text-xs sm:text-sm font-bold text-white/90 mb-2">{t.commentLabel}</label>
                      <textarea 
                        id="comment_mobile"
                        name="comment" 
                        enterKeyHint="done"
                        placeholder={t.commentPlaceholder} 
                        value={formData.comment} 
                        onChange={updateField} 
                        onFocus={closeMobileMenu} 
                        className="w-full rounded-xl border-2 border-white/20 bg-black/60 px-4 sm:px-5 py-3 sm:py-3.5 text-base sm:text-lg font-medium text-white caret-accent outline-none focus:border-accent focus:bg-black/80 transition resize-none placeholder-white/55 shadow-md" 
                        rows="4" 
                      />
                    </div>
                  </>
                )}

                <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-3">
                  <label className="flex items-start gap-2 text-xs text-white/85 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyConsentChecked}
                      onChange={(event) => setPrivacyConsentChecked(event.target.checked)}
                      className="consent-checkbox mt-0.5 shrink-0"
                    />
                    <span>{t.privacyConsentLabel}</span>
                  </label>
                  <label className="flex items-start gap-2 text-xs text-white/75 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSensitiveInMessage}
                      onChange={(event) => setIncludeSensitiveInMessage(event.target.checked)}
                      className="consent-checkbox mt-0.5 shrink-0"
                    />
                    <span>{t.waIncludeSensitive}</span>
                  </label>
                  <p className="text-[11px] text-white/60">{t.waPrivacyHint}</p>
                  <label className="flex items-start gap-2 text-xs text-white/75 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberDataOnDevice}
                      onChange={(event) => setRememberDataOnDevice(event.target.checked)}
                      className="consent-checkbox mt-0.5 shrink-0"
                    />
                    <span>{t.rememberDataLabel}</span>
                  </label>
                  <p className="text-[11px] text-white/60">{t.rememberDataHint}</p>
                  <div className="flex flex-wrap gap-3 text-[11px] text-accent">
                    <a href={`privacy.html${legalPageQuery}`} className="underline underline-offset-2">{t.privacyPolicyLabel}</a>
                    <a href={`terms.html${legalPageQuery}`} className="underline underline-offset-2">{t.termsLabel}</a>
                  </div>
                  <button
                    type="button"
                    onClick={clearSensitiveData}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
                  >
                    {t.clearMyData}
                  </button>
                </div>
              

                <div className="mobile-submit-dock sticky bottom-2 z-20 rounded-2xl border border-white/15 bg-black/75 p-2 shadow-2xl backdrop-blur-md sm:static sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`w-full rounded-xl px-4 sm:px-5 py-4 sm:py-4.5 font-bold text-lg sm:text-xl transition active:scale-95 shadow-lg ${
                      canSubmit
                        ? 'bg-gradient-to-r from-accent to-accent/90 text-black hover:from-accent/95 hover:to-accent/85 cursor-pointer'
                        : 'bg-accent/40 text-black/60 cursor-not-allowed'
                    }`}
                  >
                    {canSubmit ? t.submitNow : (privacyConsentChecked ? t.fillForm : t.submitConsentRequired)}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {mobileTab === 'history' && (
            <motion.div className="w-full space-y-3 bg-gradient-to-b from-black/70 via-cyan-950/20 to-black/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl" {...sectionMotionProps}>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-2xl sm:text-3xl font-serif text-accent font-bold">📋 {t.history}</h2>
                {orderHistory.length > 0 && (
                  <button type="button" onClick={clearHistory} className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 transition">{t.clearHistory}</button>
                )}
              </div>

              {historyAutoCleanNotice === 'auto-cleaned' && (
                <p className="text-[11px] text-white/50 italic">{t.historyAutoCleanedNotice}</p>
              )}

              <LoyaltyCard
                t={t}
                level={loyaltyStats.level}
                points={loyaltyStats.points}
                nextLevelOrders={loyaltyStats.nextLevelOrders}
                progressPercent={loyaltyStats.progressPercent}
              />

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 grid grid-cols-1 gap-2 text-xs">
                <p className="text-white/80">{t.summaryTotalSpent}: <span className="text-accent font-semibold">{historyFinancialSummary.totalSpent.toLocaleString()} ₸</span></p>
                <p className="text-white/80">{t.summaryAvgCheck}: <span className="text-accent font-semibold">{historyFinancialSummary.avgCheck.toLocaleString()} ₸</span></p>
                <p className="text-white/80">{t.summaryFavService}: <span className="text-accent font-semibold">{historyFinancialSummary.favoriteService}</span></p>
              </div>

              {orderHistory.length === 0 ? (
                <p className="text-white/60 text-center py-8">{t.noOrders}</p>
              ) : (
                <div className="space-y-3">
                  {monthlyOrders.map((monthGroup) => (
                    <div key={monthGroup.key} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-accent capitalize">{monthGroup.label}</p>
                        <span className="text-[11px] text-white/70">{monthGroup.orders.length} {t.monthOrders}</span>
                      </div>
                      <div className="mb-2 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded-md bg-white/10 px-2 py-1 text-white/80">{t.monthCompleted}: {monthGroup.stats.completed}</span>
                        <span className="rounded-md bg-white/10 px-2 py-1 text-white/80">{t.monthActive}: {monthGroup.stats.active}</span>
                        <span className="rounded-md bg-accent/15 px-2 py-1 text-accent">{t.monthTopService}: {monthGroup.stats.topService}</span>
                      </div>
                      <div className="space-y-2">
                        {monthGroup.orders.map((order) => (
                          <div key={order.id} className="p-3 bg-black/30 rounded-lg border-l-4 border-accent">
                            <p className="text-sm text-white/80">{order.service}</p>
                            <p className="text-xs text-white/60">{order.name || '—'} • {order.createdAt}</p>
                            <p className="text-xs text-accent mt-1">{t.orderStatus}: {getStatusLabel(order.status || 'new')}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <button onClick={() => repeatOrder(order)} className="text-xs px-3 py-1 bg-accent/20 text-accent rounded hover:bg-accent/30 transition">
                                {t.repeat}
                              </button>
                              <button onClick={() => sendReceiptByEmail(order)} className="text-xs px-3 py-1 bg-white/10 text-white rounded hover:bg-white/15 transition">
                                {t.receiptEmailButton}
                              </button>
                              <button onClick={() => downloadReceiptPdf(order)} className="text-xs px-3 py-1 bg-white/10 text-white rounded hover:bg-white/15 transition">
                                {t.receiptPdfButton}
                              </button>
                            </div>
                            {order.receiptSentAt && (
                              <p className="mt-1 text-[10px] text-white/45">email: {order.receiptEmail || '-'} • {order.receiptSentAt}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {mobileTab === 'favorites' && (
            <motion.div className="w-full space-y-3 bg-gradient-to-b from-black/70 via-pink-950/20 to-black/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl" {...sectionMotionProps}>
              <h2 className="text-2xl sm:text-3xl font-serif text-accent font-bold">❤️ {t.favorites}</h2>
              {favorites.length === 0 ? (
                <p className="text-white/60 text-center py-8">{t.noFavorites}</p>
              ) : (
                <div className="space-y-2">
                  {favorites.map((fav) => (
                    <div key={fav.id} className="p-3 bg-white/5 rounded-lg border-l-4 border-accent">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-accent">{fav.name}</p>
                          <p className="text-xs text-white/60 truncate">{fav.address}</p>
                          {editingFavNoteId === fav.id ? (
                            <div className="mt-1 flex gap-1">
                              <input
                                autoFocus
                                value={favNoteDraft}
                                onChange={(e) => setFavNoteDraft(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') saveFavNote(fav.id); if (e.key === 'Escape') setEditingFavNoteId(null) }}
                                placeholder={t.favNotePlaceholder}
                                className="flex-1 rounded border border-white/20 bg-white/10 px-2 py-1 text-xs text-white outline-none focus:border-accent"
                              />
                              <button type="button" onClick={() => saveFavNote(fav.id)} className="rounded bg-accent px-2 py-1 text-xs font-bold text-black">✓</button>
                              <button type="button" onClick={() => setEditingFavNoteId(null)} className="rounded bg-white/10 px-2 py-1 text-xs text-white">✕</button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => startEditFavNote(fav)}
                              className="mt-1 text-[10px] text-white/40 hover:text-accent transition"
                            >
                              {fav.note ? `📝 ${fav.note}` : `+ ${t.favNoteEdit}`}
                            </button>
                          )}
                        </div>
                        <button onClick={() => removeFavorite(fav.id)} className="text-red-400 hover:text-red-500 shrink-0" aria-label={`${t.removeFavoriteAria}: ${fav.name}`}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        <div className="border-t border-white/10 p-2 sm:p-3 bg-black/90 supports-[backdrop-filter]:bg-black/60 backdrop-blur-xl fixed bottom-0 left-0 right-0 md:hidden">
          <div className="grid grid-cols-3 gap-2 px-2">
            <button
              onClick={() => goToBooking('bottom_nav_mobile')}
              className={`flex items-center justify-center px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 shadow-md ${mobileTab === 'booking' ? 'bg-accent text-black' : 'bg-white/10 text-white hover:bg-white/15'}`}
              aria-label={t.booking}
            >
              {t.booking}
            </button>
            <a href={`tel:${alibekPhoneNumber}`} className="flex items-center justify-center px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-lg bg-white/10 text-white text-xs sm:text-sm font-bold whitespace-nowrap hover:bg-white/15 active:scale-95 transition shadow-md" aria-label={t.callAriaLabel}>
                <Phone className="w-4 h-4" />
            </a>
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-accent/30 animate-ping pointer-events-none" />
              <a onClick={() => trackCtaClick('open_whatsapp_mobile_bottom')} href={whatsappHref} target="_blank" rel="noreferrer" className="relative block w-full text-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-accent text-black text-xs sm:text-sm font-bold whitespace-nowrap hover:bg-accent/90 active:scale-95 transition shadow-md">{t.whatsapp}</a>
            </div>
          </div>
        </div>
      </div>

      <main id="top" className="hidden md:flex md:flex-col md:min-h-screen">
        {/* Desktop Tab Navigation */}
        <div className="sticky top-[60px] z-40 border-b border-white/10 bg-black/80 supports-[backdrop-filter]:bg-black/55 backdrop-blur-xl py-3 px-8">
          <div className="mx-auto max-w-7xl flex gap-4">
            <button onClick={() => setDesktopTab('home')} className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${desktopTab === 'home' ? 'bg-accent text-black border-accent shadow-[0_10px_22px_rgba(245,200,106,0.24)]' : 'bg-white/5 text-white/85 border-white/15 hover:bg-white/10 hover:border-white/25'}`}>{t.home}</button>
            <button onClick={() => setDesktopTab('services')} className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${desktopTab === 'services' ? 'bg-accent text-black border-accent shadow-[0_10px_22px_rgba(245,200,106,0.24)]' : 'bg-white/5 text-white/85 border-white/15 hover:bg-white/10 hover:border-white/25'}`}>{t.services}</button>
            <button onClick={() => setDesktopTab('standards')} className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${desktopTab === 'standards' ? 'bg-accent text-black border-accent shadow-[0_10px_22px_rgba(245,200,106,0.24)]' : 'bg-white/5 text-white/85 border-white/15 hover:bg-white/10 hover:border-white/25'}`}>{t.standards}</button>
            <button onClick={() => setDesktopTab('contacts')} className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${desktopTab === 'contacts' ? 'bg-accent text-black border-accent shadow-[0_10px_22px_rgba(245,200,106,0.24)]' : 'bg-white/5 text-white/85 border-white/15 hover:bg-white/10 hover:border-white/25'}`}>{t.contacts}</button>
            <button onClick={() => setDesktopTab('booking')} className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${desktopTab === 'booking' ? 'bg-accent text-black border-accent shadow-[0_10px_22px_rgba(245,200,106,0.24)]' : 'bg-white/5 text-white/85 border-white/15 hover:bg-white/10 hover:border-white/25'}`}>{t.booking}</button>
          </div>
        </div>

        {/* Desktop Content Area */}
        <div className="flex-1 flex items-start justify-center px-8 py-12">
          <div className="w-full max-w-6xl">
            {desktopTab === 'home' && (
              <motion.div className="space-y-6 bg-gradient-to-br from-black/80 via-amber-950/28 to-black/65 rounded-2xl p-12 border border-white/10 shadow-2xl" {...sectionMotionProps}>
                <div className="border-l-4 border-accent pl-6">
                  <p className="text-accent text-sm font-semibold">{t.heroBadge}</p>
                </div>

                <LoyaltyCard
                  t={t}
                  level={loyaltyStats.level}
                  points={loyaltyStats.points}
                  nextLevelOrders={loyaltyStats.nextLevelOrders}
                  progressPercent={loyaltyStats.progressPercent}
                />

                <div className="grid grid-cols-2 gap-3 max-w-3xl">
                  <div className="rounded-xl border border-white/12 bg-white/5 p-3">
                    <p className="text-xs text-accent font-semibold">{t.birthdayBonus}</p>
                    <div className="mt-2">
                      {isBirthdayToday && !birthdayBonusClaimed ? (
                        <button type="button" onClick={claimBirthdayBonus} className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-black hover:bg-accent/90 transition">
                          {t.birthdayClaim}
                        </button>
                      ) : (
                        <span className="text-xs text-white/70">{birthdayBonusClaimed ? t.birthdayClaimed : '—'}</span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                    <p className="text-xs text-emerald-100 font-semibold">{t.referralTitle}</p>
                    <p className="mt-1 text-[11px] text-emerald-100/80">{t.referralHint}</p>
                    <button type="button" onClick={copyReferralText} className="mt-2 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-black hover:bg-emerald-400 transition">
                      {referralCopied ? t.referralCopied : t.referralShare}
                    </button>
                  </div>
                </div>

                <h1 className="font-serif text-5xl leading-tight text-white max-w-3xl">{t.heroTitle}</h1>
                
                <motion.div
                  className="space-y-4 text-white text-base leading-relaxed max-w-3xl"
                  {...(prefersReducedMotion ? {} : { variants: heroStagger, initial: 'hidden', animate: 'show' })}
                >
                  <motion.p variants={prefersReducedMotion ? {} : fadeUp} transition={{ duration: 0.5 }}>{t.heroP1}</motion.p>
                  <motion.p variants={prefersReducedMotion ? {} : fadeUp} transition={{ duration: 0.5 }}>{t.heroP2}</motion.p>
                  <motion.p variants={prefersReducedMotion ? {} : fadeUp} transition={{ duration: 0.5 }}>{t.heroP3}</motion.p>
                </motion.div>

                <div className="max-w-3xl rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs text-white/65 mb-2">{t.preferredContactTitle}</p>
                  <div className="grid grid-cols-2 gap-2 max-w-sm">
                    <button
                      type="button"
                      onClick={() => setPreferredContactChannel('call')}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${preferredContact === 'call' ? 'bg-accent text-black' : 'bg-white/10 text-white hover:bg-white/15'}`}
                    >
                      {t.preferCall}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredContactChannel('whatsapp')}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${preferredContact === 'whatsapp' ? 'bg-accent text-black' : 'bg-white/10 text-white hover:bg-white/15'}`}
                    >
                      {t.preferWhatsapp}
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-5 flex-wrap">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-lg bg-accent/25 animate-ping pointer-events-none" />
                    <button
                      onClick={() => handlePrimaryCta('hero_desktop')}
                      className="relative px-8 py-3 rounded-lg bg-accent text-black font-bold text-base hover:bg-accent/90 transition shadow-lg shadow-accent/20"
                    >
                      {primaryStartCta}
                    </button>
                  </div>
                  <div className="text-sm text-white/60 space-y-0.5">
                    <p>{t.priceFromTrip}</p>
                    <p className="text-accent/80">{t.legalDisclaimer}</p>
                  </div>
                </div>

                {hasDraft && (
                  <button
                    onClick={() => goToBooking('continue_draft_desktop')}
                    className="mt-2 px-8 py-3 rounded-lg bg-white/10 text-white font-semibold text-base hover:bg-white/15 transition"
                  >
                    {t.continueDraft}
                  </button>
                )}

                <div className="grid grid-cols-3 gap-3 max-w-3xl mt-4">
                  {trustPoints.map((point) => (
                    <div key={point} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90">
                      ✓ {point}
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-accent font-semibold">{t.quickScenarios}</p>
                  <div className="flex gap-2 flex-wrap">
                    {quickScenarios.map((scenario) => (
                      <button
                        key={scenario.label}
                        onClick={() => applyQuickScenario(scenario, 'desktop')}
                        className="rounded-lg bg-white/8 border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/12 transition"
                      >
                        {scenario.label}
                      </button>
                    ))}
                  </div>
                </div>


              </motion.div>
            )}

            {desktopTab === 'services' && (
              <motion.div className="space-y-6 bg-gradient-to-br from-black/80 via-blue-950/28 to-black/65 rounded-2xl p-12 border border-white/10 shadow-2xl" {...sectionMotionProps}>
                <h2 className="section-title text-4xl text-accent">{t.services}</h2>
                
                <div className="grid gap-6 grid-cols-2">
                  {services.map((service, idx) => {
                    const Icon = service.icon
                    return (
                      <motion.article
                        key={service.title}
                        className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6 backdrop-blur transition duration-300 hover:border-accent/60 hover:bg-white/12 hover:shadow-lg hover:-translate-y-2 cursor-pointer"
                        onClick={() => { setFormData(prev => ({ ...prev, service: service.title })); setDesktopTab('booking') }}
                        {...cardMotionProps(idx * 0.08)}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <Icon className="text-accent flex-shrink-0 w-8 h-8" />
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white">{service.title}</h3>
                            <p className="text-sm text-accent/80 font-semibold mt-1">{service.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="text-white/80 text-sm leading-relaxed mb-4">
                          {service.details[0]}
                        </p>
                        
                        <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
                          {service.details.slice(1).map((detail, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                              <span className="text-accent mt-1 flex-shrink-0">✓</span>
                              <span>{detail}</span>

                            </div>
                          ))}
                        </div>
                        
                        <p className="text-accent font-bold text-lg">{service.price}</p>
                      </motion.article>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {desktopTab === 'standards' && (
              <motion.div className="space-y-6 bg-gradient-to-br from-black/80 via-slate-900/40 to-black/65 rounded-2xl p-12 border border-white/10 shadow-2xl" {...sectionMotionProps}>
                <h2 className="section-title text-4xl text-accent">{t.standardsTitleDesktop}</h2>
                
                <div className="grid gap-4 grid-cols-3">
                  {standards.map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.title}
                        className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:border-accent/60 hover:-translate-y-1"
                        {...cardMotionProps(idx * 0.06)}
                      >
                        <Icon className="mx-auto mb-3 text-accent text-base" />
                        <p className="text-base text-center mb-3 text-white">{item.title}</p>
                        <p className="text-white/90 text-sm text-center">{item.desc}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {desktopTab === 'contacts' && (
              <motion.div className="space-y-6 bg-gradient-to-br from-black/80 via-emerald-950/24 to-black/65 rounded-2xl p-12 border border-white/10 shadow-2xl" {...sectionMotionProps}>
                <h2 className="section-title text-4xl text-accent">{t.contacts}</h2>
                <p className="text-white text-base mb-6">{t.contactsHint}</p>
                <div className="flex gap-4 flex-wrap">
                  <a href={`tel:${maxPhoneNumber}`} className="px-6 py-3 rounded-lg bg-accent text-black font-semibold text-base hover:bg-accent/90 transition">{maxPhoneLabel}</a>
                  <a href={`tel:${alibekPhoneNumber}`} className="px-6 py-3 rounded-lg bg-accent text-black font-semibold text-base hover:bg-accent/90 transition">{alibekPhoneLabel}</a>
                </div>
              </motion.div>
            )}

            {desktopTab === 'booking' && (
              <motion.div
                className="rounded-2xl border border-accent/35 bg-gradient-to-br from-rose-950/20 via-black to-black p-8 max-w-2xl"
                {...(prefersReducedMotion ? {} : { variants: fadeUp, initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } })}
              >
                <h2 className="section-title text-4xl text-accent">{t.booking}</h2>
                <p className="mt-2 text-white/80 text-sm mb-5">{bookingSubtitleCompact}</p>

                {submitNotice && <p className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-xs text-green-300">{submitNotice}</p>}
                {showOrderHabitNudge && orderHabitReminder && (
                  <div className="mb-4 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs text-indigo-100">
                    <p className="font-semibold">{t.orderHabitTitle}</p>
                    <p className="mt-1 text-indigo-100/85">
                      {t.orderHabitHint} <span className="font-semibold capitalize">{orderHabitReminder.weekdayLabel}</span> ({orderHabitReminder.nextDateLabel})
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button type="button" onClick={applyOrderHabitDate} className="rounded-md bg-indigo-300 px-2 py-1 text-[11px] font-semibold text-black hover:bg-indigo-200 transition">
                        {t.orderHabitAction}
                      </button>
                      <button type="button" onClick={dismissOrderHabitNudge} className="rounded-md bg-white/10 px-2 py-1 text-[11px] text-white hover:bg-white/15 transition">
                        {t.orderHabitDismiss}
                      </button>
                    </div>
                  </div>
                )}
                {showReferralNudge && (
                  <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
                    <p>{t.referralAfterOrder}</p>
                    <button type="button" onClick={copyReferralText} className="mt-2 rounded-md bg-emerald-500 px-2 py-1 text-[11px] font-semibold text-black hover:bg-emerald-400 transition">
                      {referralCopied ? t.referralCopied : t.referralShare}
                    </button>
                  </div>
                )}

                {partnerOffer && (
                  <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
                    <p className="font-semibold">{t.partnerOfferTitle}: {partnerOffer.title}</p>
                    <p className="mt-1 text-emerald-100/80">{partnerOffer.hint}</p>
                    <button type="button" onClick={openPartnerOffer} className="mt-2 rounded-md bg-emerald-400 px-2 py-1 text-[11px] font-semibold text-black hover:bg-emerald-300 transition">
                      {t.partnerOfferOpen}
                    </button>
                  </div>
                )}

                {latestOrder && (
                  <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/75">
                    <p className="text-white/60">{t.lastOrderTitle}</p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="line-clamp-1">{latestOrder.service} · {latestOrder.date || '-'}</p>
                      <div className="flex gap-2">
                        <button onClick={() => repeatOrder(latestOrder)} className="rounded-md bg-accent/20 px-2 py-1 text-accent hover:bg-accent/30 transition">
                          {t.repeat}
                        </button>
                        <button onClick={() => downloadReceiptPdf(latestOrder)} className="rounded-md bg-white/10 px-2 py-1 text-white hover:bg-white/15 transition">
                          {t.receiptPdfButton}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name_desktop" className="text-sm font-semibold text-white">{t.nameLabel}</label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
                      <input id="name_desktop" name="name" required placeholder={t.namePlaceholder} value={formData.name} onChange={updateField} className="w-full rounded-lg border border-accent/35 bg-slate-900/85 pl-10 pr-4 py-2 text-base font-medium text-white placeholder-white/60 outline-none transition focus:border-accent focus:bg-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_20px_rgba(0,0,0,0.28)]" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone_desktop" className="text-sm font-semibold text-white">{t.phoneLabel}</label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
                      <input id="phone_desktop" name="phone" type="tel" inputMode="tel" required placeholder={t.phonePlaceholder} value={formData.phone} onChange={updateField} className={`w-full rounded-lg border pl-10 pr-4 py-2 text-base font-medium text-white placeholder-white/60 outline-none transition ${
                        formData.phone.length > 2 && !isValidPhone(formData.phone)
                          ? 'border-red-500/50 bg-red-500/10 focus:bg-red-500/15 focus:border-red-500'
                          : 'border-accent/35 bg-slate-900/85 focus:border-accent focus:bg-slate-900'
                      } shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_20px_rgba(0,0,0,0.28)]`} />
                    </div>
                    {formData.phone.length > 2 && !isValidPhone(formData.phone) && (
                      <p className="mt-1 text-xs text-red-400">{t.phoneInvalid}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="service_desktop" className="text-sm font-semibold text-white">{t.serviceLabel}</label>
                    <select id="service_desktop" name="service" value={formData.service} onChange={updateField} className="mt-1 w-full rounded-lg border border-accent/35 bg-slate-900/85 px-4 py-2 text-base font-medium text-white outline-none transition focus:border-accent focus:bg-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_20px_rgba(0,0,0,0.28)]">
                      {services.map((service) => (
                        <option key={service.title} value={service.title} className="text-black">{service.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date_desktop" className="text-sm font-semibold text-white">{t.dateLabel}</label>
                    <div className="relative mt-1">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
                      <input id="date_desktop" name="date" type="date" required min={getTodayDate()} value={formData.date} onChange={updateField} className="w-full rounded-lg border border-white/30 bg-white/10 pl-10 pr-4 py-2 text-base font-medium text-white outline-none transition focus:border-accent focus:bg-white/15" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-white/85">
                    {t.priceEstimateLabel}: <span className="text-accent font-semibold">{estimatedPriceKzt.toLocaleString()} ₸</span>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowPricingDetails((prev) => !prev)}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      {showPricingDetails ? t.pricingDetailsHide : t.pricingDetailsToggle}
                    </button>
                  </div>

                  {showPricingDetails && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3 text-xs text-white/80">
                      <p className="text-sm font-semibold text-accent">{t.pricingDetailsTitle}</p>
                      <div className="space-y-2">
                        {pricingOverviewRows.map((row) => (
                          <div key={row.label} className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
                            <span className="text-white/70">{row.label}</span>
                            <span className="text-accent font-semibold text-right">{row.value}</span>
                          </div>
                        ))}
                      </div>
                      {isWeekendEstimate && <p className="text-[11px] text-amber-200">{t.pricingWeekendNote}</p>}
                      <div className="border-t border-white/10 pt-3">
                        <p className="text-sm font-semibold text-accent">{t.paymentMethodsTitle}</p>
                        <p className="mt-1 text-white/70">{t.paymentMethodsList}</p>
                      </div>
                      <p className="text-[11px] text-white/55">{t.pricingFinalNote}</p>
                    </div>
                  )}

                  <div>
                    <button
                      type="button"
                      onClick={() => setShowDesktopDetails((prev) => !prev)}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      {showDesktopDetails ? t.hideDetails : t.showDetails}
                    </button>
                  </div>

                  {showDesktopDetails && (
                    <>
                      <div>
                        <label htmlFor="birth_desktop" className="text-sm font-semibold text-white">{t.birthdayLabel}</label>
                        <input id="birth_desktop" name="birthDate" type="date" value={formData.birthDate} onChange={updateField} className="mt-1 w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-base font-medium text-white outline-none transition focus:border-accent focus:bg-white/15" />
                      </div>

                      <div>
                        <label htmlFor="address_desktop" className="text-sm font-semibold text-white">{t.addressLabel}</label>
                        <input id="address_desktop" name="address" placeholder={t.addressPlaceholder} value={formData.address} onChange={updateField} className="mt-1 w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-base font-medium text-white caret-accent placeholder-white/60 outline-none transition focus:border-accent focus:bg-white/15" />
                        <button
                          type="button"
                          onClick={detectCurrentLocation}
                          disabled={locationLookupInProgress}
                          className={`mt-2 w-full rounded-lg px-4 py-2 text-sm font-semibold transition ${
                            locationLookupInProgress ? 'bg-white/5 text-white/50 cursor-wait' : 'bg-white/10 text-white hover:bg-white/15'
                          }`}
                        >
                          {locationLookupInProgress ? t.locating : t.detectLocation}
                        </button>
                        <button
                          type="button"
                          onClick={startVoiceInputForAddress}
                          disabled={voiceInputActive}
                          className={`mt-2 w-full rounded-lg px-4 py-2 text-sm font-semibold transition ${
                            voiceInputActive ? 'bg-white/5 text-white/50 cursor-wait' : 'bg-white/10 text-white hover:bg-white/15'
                          }`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <Mic className="h-4 w-4" />
                            {voiceInputActive ? t.voiceInputListening : t.voiceInputAddress}
                          </span>
                        </button>
                        {locationNotice && <p className="mt-2 text-[11px] text-white/60">{locationNotice}</p>}
                        {voiceInputNotice && <p className="mt-2 text-[11px] text-white/60">{voiceInputNotice}</p>}
                        <button
                          type="button"
                          onClick={addFavorite}
                          disabled={!formData.address}
                          className={`mt-2 w-full rounded-lg px-4 py-2 text-sm font-semibold transition ${
                            formData.address ? 'bg-accent/20 text-accent hover:bg-accent/30' : 'bg-white/5 text-white/50 cursor-not-allowed'
                          }`}
                        >
                          {t.saveAddress}
                        </button>
                      </div>
                      <div>
                        <label htmlFor="comment_desktop" className="text-sm font-semibold text-white">{t.commentDesktopLabel}</label>
                        <textarea id="comment_desktop" name="comment" placeholder={t.commentPlaceholder} value={formData.comment} onChange={updateField} className="mt-1 w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-base font-medium text-white placeholder-white/60 outline-none transition focus:border-accent focus:bg-white/15 resize-none" rows="3" />
                      </div>
                    </>
                  )}

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                    <label className="flex items-start gap-2 text-xs text-white/85 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyConsentChecked}
                        onChange={(event) => setPrivacyConsentChecked(event.target.checked)}
                        className="consent-checkbox mt-0.5 shrink-0"
                      />
                      <span>{t.privacyConsentLabel}</span>
                    </label>
                    <label className="flex items-start gap-2 text-xs text-white/75 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeSensitiveInMessage}
                        onChange={(event) => setIncludeSensitiveInMessage(event.target.checked)}
                        className="consent-checkbox mt-0.5 shrink-0"
                      />
                      <span>{t.waIncludeSensitive}</span>
                    </label>
                    <p className="text-[11px] text-white/60">{t.waPrivacyHint}</p>
                    <label className="flex items-start gap-2 text-xs text-white/75 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberDataOnDevice}
                        onChange={(event) => setRememberDataOnDevice(event.target.checked)}
                        className="consent-checkbox mt-0.5 shrink-0"
                      />
                      <span>{t.rememberDataLabel}</span>
                    </label>
                    <p className="text-[11px] text-white/60">{t.rememberDataHint}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-accent">
                      <a href={`privacy.html${legalPageQuery}`} className="underline underline-offset-2">{t.privacyPolicyLabel}</a>
                      <a href={`terms.html${legalPageQuery}`} className="underline underline-offset-2">{t.termsLabel}</a>
                    </div>
                    <button
                      type="button"
                      onClick={clearSensitiveData}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
                    >
                      {t.clearMyData}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`w-full mt-4 px-4 py-3 rounded-lg text-base font-semibold transition ${
                      canSubmit
                        ? 'bg-accent text-black hover:bg-accent/90 cursor-pointer'
                        : 'bg-accent/40 text-black/60 cursor-not-allowed'
                    }`}
                  >
                    {canSubmit ? t.submitWhatsapp : (privacyConsentChecked ? t.fillForm : t.submitConsentRequired)}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {desktopTab === 'home' && (
        <div className="hidden md:block fixed bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-xl border-t border-accent/25 py-3 px-8">
          <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider">{t.bottomBrand}</p>
              <p className="text-sm font-semibold">
                <span className="text-white">{t.priceFromTrip}</span>
                <span className="text-accent/80"> · {t.legalDisclaimer}</span>
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <a href={`tel:${alibekPhoneNumber}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/8 border border-white/15 text-white text-sm font-semibold hover:bg-white/12 transition">
                <Phone className="w-3.5 h-3.5" /> {t.supportCall}
              </a>
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-accent/25 animate-ping pointer-events-none" />
                <button
                  onClick={() => handlePrimaryCta('bottom_cta_desktop')}
                  className="relative px-6 py-2 rounded-lg bg-accent text-black font-bold text-sm hover:bg-accent/90 transition shadow-lg shadow-accent/25"
                >
                  {preferredContact === 'call' ? t.primaryCtaCall : (ctaVariant === 'B' ? primaryStartCta : t.orderNowCta)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      </>
      ) : (
      <main className="min-h-[calc(100vh-140px)] px-4 py-6 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl space-y-4">
          <motion.section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-8" {...sectionMotionProps}>
            <h1 className="text-2xl md:text-3xl font-serif text-accent font-bold">
              {role === 'admin' ? t.adminPanel : t.driverPanel}
            </h1>
            <p className="mt-2 text-white/70 text-sm md:text-base">
              {role === 'admin' ? t.adminSubtitle : t.driverSubtitle}
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90">{t.ordersTotal}: {orderHistory.length}</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90">{t.ordersActive}: {activeOrdersCount}</div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90">{t.ordersDone}: {completedOrdersCount}</div>
            </div>

            {role === 'admin' && (
              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                <form onSubmit={addDriverAccount} className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                  <p className="text-sm font-semibold text-accent">{t.addDriver}</p>
                  <div>
                    <label className="text-xs text-white/70">{t.driverLogin}</label>
                    <input
                      value={newDriverLogin}
                      onChange={(event) => setNewDriverLogin(event.target.value)}
                      className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                      placeholder={t.driverLoginPlaceholder}
                    />
                  </div>
                  <button type="submit" className="w-full rounded-lg bg-accent text-black px-3 py-2 text-sm font-semibold hover:bg-accent/90 transition">
                    {t.addDriver}
                  </button>
                </form>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-accent mb-2">{t.driversList}</p>
                  {driverAccounts.length === 0 ? (
                    <p className="text-xs text-white/60">{t.noDrivers}</p>
                  ) : (
                    <div className="space-y-2">
                      {driverAccounts.map((driver) => (
                        <div key={driver.id} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                          <p className="text-sm text-white">{driver.login}</p>
                          <p className="text-xs text-white/50">{t.offlineDemo}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{role === 'admin' ? t.transferSchedule : t.myTransfers}</p>
                  <p className="text-sm text-white/60">{t.transferScheduleSubtitle}</p>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs">
                  {transferNotice && (
                    <span className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-1 text-green-200">{transferNotice}</span>
                  )}
                  {transferConflict && (
                    <span className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1 text-red-200">{transferConflict}</span>
                  )}
                  {importNotice && (
                    <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-amber-200">{importNotice}</span>
                  )}
                </div>
              </div>

              {role === 'admin' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-white/70">{t.filterDate}</label>
                      <input
                        type="date"
                        value={transferFilters.date}
                        onChange={(event) => updateTransferFilter('date', event.target.value)}
                        className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-white/70">{t.filterDriver}</label>
                      <input
                        value={transferFilters.driver}
                        onChange={(event) => updateTransferFilter('driver', event.target.value)}
                        placeholder={t.driverLoginPlaceholder}
                        className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-white/70">{t.filterVehicle}</label>
                      <input
                        value={transferFilters.vehicle}
                        onChange={(event) => updateTransferFilter('vehicle', event.target.value)}
                        placeholder={t.vehiclePlaceholder}
                        className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-white/70">{t.searchTransfers}</label>
                      <input
                        value={transferFilters.query}
                        onChange={(event) => updateTransferFilter('query', event.target.value)}
                        placeholder={t.transferSearchPlaceholder}
                        className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                      />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs text-white/70">{t.bufferLabel}</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          max="120"
                          value={bufferMinutes}
                          onChange={(event) => setBufferMinutes(normalizeBufferMinutes(event.target.value))}
                          className="w-28 rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                        />
                        <p className="text-xs text-white/60 self-center">{t.bufferHelper}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2 md:items-end">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={clearTransferFilters} className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">{t.clearFilters}</button>
                        <button type="button" onClick={exportTransfers} className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">{t.exportJson}</button>
                        <label className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10 cursor-pointer">
                          {t.importJson}
                          <input type="file" accept="application/json" className="hidden" onChange={importTransfers} />
                        </label>
                        <button type="button" onClick={printSchedule} className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">{t.printSchedule}</button>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={createTransfer} className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/70">{t.clientName}</label>
                    <input
                      value={transferDraft.clientName}
                      onChange={(event) => updateTransferDraftField('clientName', event.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                      placeholder={t.clientNamePlaceholder}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/70">{t.serviceLabel}</label>
                    <select
                      value={transferDraft.service}
                      onChange={(event) => updateTransferDraftField('service', event.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                    >
                      {services.map((service) => (
                        <option key={service.title} value={service.title} className="text-black">{service.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/70">{t.dateLabel}</label>
                    <input
                      type="date"
                      min={getTodayDate()}
                      value={transferDraft.date}
                      onChange={(event) => updateTransferDraftField('date', event.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/70">{t.startTime}</label>
                    <input
                      type="time"
                      value={transferDraft.startTime}
                      onChange={(event) => updateTransferDraftField('startTime', event.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/70">{t.endTime}</label>
                    <input
                      type="time"
                      value={transferDraft.endTime}
                      onChange={(event) => updateTransferDraftField('endTime', event.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/70">{t.routeFrom}</label>
                    <input
                      value={transferDraft.routeFrom}
                      onChange={(event) => updateTransferDraftField('routeFrom', event.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                      placeholder={t.routeFromPlaceholder}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/70">{t.routeTo}</label>
                    <input
                      value={transferDraft.routeTo}
                      onChange={(event) => updateTransferDraftField('routeTo', event.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                      placeholder={t.routeToPlaceholder}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/70">{t.assignedDriver}</label>
                    {driverAccounts.length > 0 ? (
                      <select
                        value={transferDraft.driver}
                        onChange={(event) => updateTransferDraftField('driver', event.target.value)}
                        className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                      >
                        <option value="" className="text-black">—</option>
                        {driverAccounts.map((driver) => (
                          <option key={driver.id} value={driver.login} className="text-black">{driver.login}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={transferDraft.driver}
                        onChange={(event) => updateTransferDraftField('driver', event.target.value)}
                        className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                        placeholder={t.driverLoginPlaceholder}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-white/70">{t.vehicle}</label>
                    <input
                      value={transferDraft.vehicle}
                      onChange={(event) => updateTransferDraftField('vehicle', event.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm outline-none focus:border-accent"
                      placeholder={t.vehiclePlaceholder}
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <button
                      type="submit"
                      disabled={!isTransferReady}
                      className={`w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        isTransferReady ? 'bg-accent text-black hover:bg-accent/90' : 'bg-white/5 text-white/50 cursor-not-allowed'
                      }`}
                    >
                      {t.createTransfer}
                    </button>
                  </div>
                </form>
              </div>
              )}

              <div className="space-y-2">
                {transfersToDisplay.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/70">
                    {role === 'admin' ? t.noTransfers : t.noTransfersForRole}
                  </div>
                ) : (
                  transfersToDisplay.map((transfer) => {
                    const conflictMessage = findTransferConflict(transfer, transfer.id)
                    return (
                      <div
                        key={transfer.id}
                        className={`rounded-xl border p-4 ${
                          conflictMessage ? 'border-red-400/50 bg-red-500/5' : 'border-white/10 bg-white/5'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-white font-semibold">{transfer.service || t.transferSchedule}</p>
                            <p className="text-xs text-white/60">{transfer.clientName || t.clientName}</p>
                          </div>
                          {role === 'admin' && (
                            <button
                              type="button"
                              onClick={() => removeTransfer(transfer.id)}
                              className="rounded-lg border border-white/15 bg-white/5 p-2 text-white/70 hover:bg-white/10"
                              aria-label={t.deleteTransferAria}
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3 text-sm text-white/80">
                          <div>{transfer.date} · {transfer.startTime}–{transfer.endTime}</div>
                          <div>{t.routeFrom}: {transfer.routeFrom || '—'}</div>
                          <div>{t.routeTo}: {transfer.routeTo || '—'}</div>
                          <div>{t.assignedDriver}: {transfer.driver || '—'}</div>
                          <div>{t.vehicle}: {transfer.vehicle || '—'}</div>
                        </div>
                        {conflictMessage && <p className="mt-2 text-xs text-red-300">{conflictMessage}</p>}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </motion.section>

          <div className="space-y-3">
            {orderHistory.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-white/70">{t.noOrdersForRole}</div>
            ) : (
              <div className="flex justify-end">
                <button type="button" onClick={clearHistory} className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 transition">{t.clearHistoryFull}</button>
              </div>
            )}
            {orderHistory.length !== 0 && (
              orderHistory.map((order) => {
                const currentStatus = order.status || 'new'
                return (
                  <div key={order.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <p className="text-white font-semibold">{order.service}</p>
                      <p className="text-xs text-accent">{t.orderStatus}: {getStatusLabel(currentStatus)}</p>
                    </div>
                    <p className="mt-1 text-sm text-white/80">{order.name || '—'} · {order.phoneMasked || '—'}</p>
                    <p className="mt-1 text-xs text-white/60">{t.orderCreated}: {order.createdAt}</p>

                    {role === 'admin' ? (
                      <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center">
                        <span className="text-xs text-white/70">{t.setStatus}</span>
                        <select
                          value={currentStatus}
                          onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                          className="w-full md:w-64 rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-sm"
                        >
                          <option value="new">{t.statusNew}</option>
                          <option value="confirmed">{t.statusConfirmed}</option>
                          <option value="on_way">{t.statusOnWay}</option>
                          <option value="completed">{t.statusCompleted}</option>
                          <option value="canceled">{t.statusCanceled}</option>
                        </select>
                      </div>
                    ) : (
                      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
                        <button type="button" onClick={() => updateOrderStatus(order.id, 'confirmed')} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/15 transition">{t.markConfirmed}</button>
                        <button type="button" onClick={() => updateOrderStatus(order.id, 'on_way')} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/15 transition">{t.markOnWay}</button>
                        <button type="button" onClick={() => updateOrderStatus(order.id, 'completed')} className="rounded-lg bg-accent/20 text-accent px-3 py-2 text-xs font-semibold hover:bg-accent/30 transition">{t.markCompleted}</button>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </main>
      )}

      <footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/60 md:px-8 md:translate-y-0">
        <div className="space-y-2">
          <p>© {new Date().getFullYear()} MAX · {t.footerTagline}</p>
          <div className="flex items-center justify-center gap-4">
            <a href={`privacy.html${legalPageQuery}`} className="text-accent/90 hover:text-accent underline underline-offset-2">{t.privacyPolicyLabel}</a>
            <a href={`terms.html${legalPageQuery}`} className="text-accent/90 hover:text-accent underline underline-offset-2">{t.termsLabel}</a>
          </div>
        </div>
      </footer>

      {role === 'client' && (
        <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col gap-2">
          <button
            onClick={() => setShowQRModal(true)}
            className="px-4 py-2 rounded-full bg-green-500 text-white font-bold shadow-lg hover:bg-green-600 transition"
          >
            QR WhatsApp
          </button>
          <a
            href={`tel:+${whatsappNumber}`}
            className="px-4 py-2 rounded-full bg-white/90 text-black font-bold shadow-lg hover:bg-white transition text-center"
          >
            {t.supportCall}
          </a>
          <a
            onClick={() => trackCtaClick('open_whatsapp_floating_desktop')}
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-full bg-accent text-black font-bold shadow-lg hover:bg-accent/90 transition text-center"
          >
            {t.whatsapp}
          </a>
        </div>
      )}
    </div>
  )
}

export default App
