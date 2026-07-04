import type { Language } from "@/lib/translations"

export type L10n<T = string> = Record<Language, T>

export type TourStatus = "active" | "archived"

export interface Tour {
  id: string
  slug: string
  status: TourStatus
  title: L10n
  route: L10n
  /** Display string for the nearest departure, e.g. "21–30 июля" */
  dates: L10n
  durationDays?: number
  durationNights?: number
  /** Price in USD */
  priceFrom?: number
  /** Render the "from / dan" prefix before the price */
  priceIsFrom?: boolean
  /** e.g. "международный авиаперелёт не включён" */
  priceNote?: L10n
  /** All departure windows when a tour runs multiple times */
  departures?: L10n<string[]>
  photos: string[]
  highlights: L10n<string[]>
  included?: L10n<string[]>
  notIncluded?: L10n<string[]>
  content: L10n
  updatedAt?: string
}

export function formatPrice(tour: Tour, lang: Language): string | null {
  if (!tour.priceFrom) return null
  const amount = `${tour.priceFrom} $`
  if (!tour.priceIsFrom) return amount
  return lang === "ru" ? `от ${amount}` : `${amount} dan`
}

export function formatDuration(tour: Tour, lang: Language): string | null {
  if (!tour.durationDays) return null
  const d = tour.durationDays
  const n = tour.durationNights
  if (lang === "ru") return n ? `${d} дней / ${n} ночей` : `${d} дней`
  return n ? `${d} kun / ${n} kecha` : `${d} kun`
}

const SEED_DATE = "2026-07-04T00:00:00.000Z"

export const seedTours: Tour[] = [
  {
    id: "family-guangzhou-zhangjiajie",
    slug: "family-guangzhou-zhangjiajie",
    status: "active",
    title: {
      ru: "Семейный тур: Гуанчжоу – Чжанцзяцзе",
      uz: "Oilaviy tur: Guangzhou – Chjanczyatsze",
    },
    route: {
      ru: "Гуанчжоу – Чжанцзяцзе – Гуанчжоу",
      uz: "Guangzhou – Chjanczyatsze – Guangzhou",
    },
    dates: {
      ru: "21–30 июля",
      uz: "21–30 iyul",
    },
    durationDays: 10,
    durationNights: 9,
    priceFrom: 1300,
    priceIsFrom: true,
    priceNote: {
      ru: "международный авиаперелёт не включён",
      uz: "xalqaro aviachipta narxga kirmagan",
    },
    photos: [
      "/tours/family-guangzhou-zhangjiajie/tianmen-road.jpg",
      "/tours/family-guangzhou-zhangjiajie/canton-tower.jpg",
      "/tours/family-guangzhou-zhangjiajie/zhangjiajie-park.jpg",
      "/tours/family-guangzhou-zhangjiajie/glass-bridge.jpg",
      "/tours/family-guangzhou-zhangjiajie/guangzhou-square.jpg",
    ],
    highlights: {
      ru: [
        "Гуанчжоу — парк Юэсю и пешеходная Пекинская улица",
        "Вечерний круиз по Жемчужной реке",
        "Чжанцзяцзе — Национальный лесной парк, мир «Аватара»",
        "Пещера Хуанлун и гора Тяньмэнь с «Небесными вратами»",
        "Гранд-каньон и знаменитый стеклянный мост",
        "Chimelong Resort — аттракционы и шоу для всей семьи",
      ],
      uz: [
        "Guangzhou — Yuexiu bog'i va piyodalar Pekin ko'chasi",
        "Marvarid daryosi bo'ylab kechki kruiz",
        "Chjanczyatsze — Milliy o'rmon parki, «Avatar» olami",
        "Xuanlong g'ori va «Osmon darvozalari» bilan Tyanmen tog'i",
        "Grand-kanyon va mashhur shisha ko'prik",
        "Chimelong Resort — butun oila uchun attraksionlar va shoular",
      ],
    },
    notIncluded: {
      ru: ["Международный авиаперелёт"],
      uz: ["Xalqaro aviaparvoz"],
    },
    content: {
      ru: `Путешествие для всей семьи: современные города, невероятная природа и лучшие развлечения Китая — всё в одном маршруте.

Гуанчжоу встретит вас южным колоритом: прогулка по зелёному парку Юэсю, оживлённая пешеходная Пекинская улица и вечерний круиз по Жемчужной реке с огнями небоскрёбов.

Чжанцзяцзе — мир «Аватара» наяву. Вас ждут парящие скалы Национального лесного парка, сказочная пещера Хуанлун, подъём на гору Тяньмэнь к «Небесным вратам», Гранд-каньон и прогулка по знаменитому стеклянному мосту.

Финал путешествия — Chimelong Resort: аттракционы мирового уровня, шоу и развлечения, которые запомнятся и детям, и взрослым.

Стоимость — от 1300 $ на человека. Международный авиаперелёт оплачивается отдельно. Количество мест в группе ограничено.`,
      uz: `Butun oila uchun sayohat: zamonaviy shaharlar, aql bovar qilmas tabiat va Xitoyning eng zo'r ko'ngilochar maskanlari — barchasi bitta marshrutda.

Guangzhou sizni janubiy fayzi bilan kutib oladi: yam-yashil Yuexiu bog'ida sayr, gavjum piyodalar Pekin ko'chasi va osmono'par binolar chiroqlari ostida Marvarid daryosi bo'ylab kechki kruiz.

Chjanczyatsze — «Avatar» olamining o'zi. Sizni Milliy o'rmon parkining osmonda suzayotgan qoyalari, afsonaviy Xuanlong g'ori, «Osmon darvozalari» sari Tyanmen tog'iga ko'tarilish, Grand-kanyon va mashhur shisha ko'prik bo'ylab sayr kutmoqda.

Sayohat yakuni — Chimelong Resort: jahon darajasidagi attraksionlar, shoular va bolalaru kattalarga birdek unutilmas taassurot beradigan o'yin-kulgilar.

Narxi — kishi boshiga 1300 $ dan. Xalqaro aviachipta alohida to'lanadi. Guruhdagi joylar soni cheklangan.`,
    },
    updatedAt: SEED_DATE,
  },
  {
    id: "fairy-tale-china",
    slug: "fairy-tale-china",
    status: "active",
    title: {
      ru: "Путешествие по сказочному Китаю",
      uz: "Ertakdagi Xitoy bo'ylab sayohat",
    },
    route: {
      ru: "Чэнду – Чжанцзяцзе – Фужун – Сиань",
      uz: "Chengdu – Chjanczyatsze – Furong – Sian",
    },
    dates: {
      ru: "Май – июль, 7 заездов",
      uz: "May – iyul, 7 ta jo'nash",
    },
    durationDays: 9,
    durationNights: 8,
    priceFrom: 1524,
    priceIsFrom: false,
    priceNote: {
      ru: "включая международный авиаперелёт",
      uz: "xalqaro aviachiptalar narxga kiritilgan",
    },
    departures: {
      ru: [
        "11–19 мая",
        "18–26 мая",
        "25 мая – 2 июня",
        "8–16 июня",
        "15–23 июня",
        "22–30 июня",
        "29 июня – 7 июля",
      ],
      uz: [
        "11–19 may",
        "18–26 may",
        "25 may – 2 iyun",
        "8–16 iyun",
        "15–23 iyun",
        "22–30 iyun",
        "29 iyun – 7 iyul",
      ],
    },
    photos: [
      "/tours/fairy-tale-china/furong-town.jpg",
      "/tours/fairy-tale-china/chengdu-panda.jpg",
      "/tours/fairy-tale-china/zhangjiajie-pillars.jpg",
      "/tours/fairy-tale-china/tianmen-skywalk.jpg",
      "/tours/fairy-tale-china/terracotta-army.jpg",
      "/tours/fairy-tale-china/xian-wall.jpg",
    ],
    highlights: {
      ru: [
        "Чэнду (2 ночи) — знаменитые панды и сычуаньская кухня",
        "Чжанцзяцзе (2 ночи) — горы «Аватара» и стеклянные мосты",
        "Фужун (1 ночь) — древний город над водопадом",
        "Сиань (3 ночи) — древняя столица Китая",
        "Пандами, скалами и водопадами — всё в одном туре",
      ],
      uz: [
        "Chengdu (2 kecha) — mashhur pandalar va Sichuan taomlari",
        "Chjanczyatsze (2 kecha) — «Avatar» tog'lari va oynali ko'priklar",
        "Furong (1 kecha) — sharshara ustidagi qadimiy shahar",
        "Sian (3 kecha) — Xitoyning qadimiy poytaxti",
        "Pandalar, qoyalar va sharsharalar — barchasi bitta safarda",
      ],
    },
    included: {
      ru: [
        "Международные авиабилеты",
        "Отели 4★",
        "Завтраки",
        "Внутренние перелёты и поезда",
        "Все входные билеты",
        "Русскоговорящий гид",
      ],
      uz: [
        "Xalqaro aviachiptalar",
        "4★ mehmonxonalar",
        "Nonushta",
        "Ichki reyslar va poezdlar",
        "Barcha kirish chiptalari",
        "Rus tilida gid",
      ],
    },
    content: {
      ru: `Панды, горы «Аватара», древние города, стеклянные мосты и город над водопадом — всё это в одном путешествии по самым сказочным уголкам Китая.

Маршрут начинается в Чэнду (2 ночи) — вы увидите знаменитых панд в их «столице» и попробуете настоящую сычуаньскую кухню. Дальше — Чжанцзяцзе (2 ночи): парящие скалы, вдохновившие создателей «Аватара», канатные дороги и головокружительные стеклянные мосты.

Фужун (1 ночь) — уникальный древний город, построенный прямо над водопадом: вечером он подсвечивается тысячами огней. Завершает маршрут Сиань (3 ночи) — древняя столица Китая, где история встречается на каждом шагу.

В стоимость 1524 $ включено всё основное: международные авиабилеты, отели 4★ с завтраками, внутренние перелёты и поезда, все входные билеты и сопровождение русскоговорящего гида.

Настоящий Китай откроем вместе!`,
      uz: `Pandalar, «Avatar» tog'lari, qadimiy shaharlar, oynali ko'priklar, sharshara ustidagi shahar — barchasi Xitoyning eng ertaknamo go'shalari bo'ylab bitta safarda.

Marshrut Chengdudan boshlanadi (2 kecha) — pandalar «poytaxtida» mashhur pandalarni ko'rasiz va haqiqiy Sichuan taomlaridan tatib ko'rasiz. Keyin — Chjanczyatsze (2 kecha): «Avatar» ijodkorlarini ilhomlantirgan osmonda suzayotgan qoyalar, osma yo'llar va bosh aylantiruvchi oynali ko'priklar.

Furong (1 kecha) — to'g'ridan-to'g'ri sharshara ustiga qurilgan noyob qadimiy shahar: kechqurun u minglab chiroqlar bilan yoritiladi. Marshrutni Sian (3 kecha) yakunlaydi — har qadamda tarix nafasi ufurib turgan Xitoyning qadimiy poytaxti.

1524 $ narxga barcha asosiylari kiritilgan: xalqaro aviachiptalar, nonushta bilan 4★ mehmonxonalar, ichki reyslar va poezdlar, barcha kirish chiptalari hamda rus tilida gid hamrohligi.

Haqiqiy Xitoyni birga kashf qilamiz!`,
    },
    updatedAt: SEED_DATE,
  },
  {
    id: "health-guangzhou-gulong",
    slug: "health-guangzhou-gulong",
    status: "active",
    title: {
      ru: "Оздоровительный тур в Китай",
      uz: "Xitoyga sog'lomlashtiruvchi tur",
    },
    route: {
      ru: "Гуанчжоу – Ущелье Гулун",
      uz: "Guangzhou – Gulun darasi",
    },
    dates: {
      ru: "22–30 июля",
      uz: "22–30 iyul",
    },
    durationDays: 9,
    durationNights: 8,
    priceFrom: 1090,
    priceIsFrom: true,
    priceNote: {
      ru: "без авиаперелёта",
      uz: "aviachiptasiz",
    },
    photos: [
      "/tours/health-guangzhou-gulong/IMG_0221.JPG",
      "/tours/health-guangzhou-gulong/guangzhou-aerial.jpg",
      "/tours/health-guangzhou-gulong/gorge-waterfall-1.jpg",
      "/tours/health-guangzhou-gulong/gorge-waterfall-2.jpg",
      "/tours/health-guangzhou-gulong/IMG_0223.jpg",
    ],
    highlights: {
      ru: [
        "Гуанчжоу — центр традиционной китайской медицины",
        "Консультация специалистов традиционной китайской медицины",
        "Оздоровительные процедуры и массаж туйна",
        "Ущелье Гулун — водопады и тропические леса",
        "Прогулка по долине «Тайна Гулун»",
        "Стеклянный мост над ущельем с потрясающими видами",
      ],
      uz: [
        "Guangzhou — an'anaviy xitoy tibbiyot markazi",
        "An'anaviy xitoy tibbiyoti mutaxassislari konsultatsiyasi",
        "Sog'lomlashtiruvchi muolajalar va tuyna massaji",
        "Gulun darasi — sharsharalar va tropik o'rmonlar",
        "«Gulun siri» vodiysida sayr",
        "Dara ustidagi shisha ko'prik va ajoyib manzaralar",
      ],
    },
    included: {
      ru: [
        "Отель 4★ + завтраки",
        "Консультация и массаж",
        "Все трансферы",
        "Входные билеты",
        "Русскоговорящий гид",
        "Страховка",
      ],
      uz: [
        "4★ mehmonxona + nonushta",
        "Konsultatsiya va massaj",
        "Barcha transferlar",
        "Kirish chiptalari",
        "Rus tilida gid",
        "Sug'urta",
      ],
    },
    notIncluded: {
      ru: ["Авиаперелёт"],
      uz: ["Aviaparvoz"],
    },
    content: {
      ru: `Совместите отдых с заботой о здоровье! Оздоровительный тур в Китай — идеальное сочетание восстановления организма и знакомства с природными красотами юга страны.

Гуанчжоу — один из главных центров традиционной китайской медицины. Во время тура вас ждёт консультация специалистов, которые подберут процедуры для восстановления организма, оздоровительные процедуры и лечебный массаж туйна.

Вторая часть путешествия проходит в живописном ущелье Гулун — одном из самых красивых природных мест юга Китая: тропические леса, каскадные водопады и прогулка по долине «Тайна Гулун».

Особое впечатление оставит прогулка по знаменитому стеклянному мосту над ущельем, открывающему захватывающие виды на горные пейзажи.

Стоимость — от 1090 $ без авиаперелёта. В стоимость входят: отель 4★ с завтраками, консультация и массаж, все трансферы, входные билеты, русскоговорящий гид и страховка.`,
      uz: `Dam olishni salomatlik haqidagi g'amxo'rlik bilan birlashtiring! Xitoyga sog'lomlashtiruvchi tur — organizmni tiklash va mamlakat janubining go'zal tabiatini kashf qilishning mukammal uyg'unligi.

Guangzhou — an'anaviy xitoy tibbiyotining eng muhim markazlaridan biri. Safar davomida sizni mutaxassislar konsultatsiyasi kutadi: ular organizmni tiklash uchun muolajalarni tanlab beradilar, shuningdek sog'lomlashtiruvchi muolajalar va davolovchi tuyna massaji o'tkaziladi.

Sayohatning ikkinchi qismi Xitoy janubidagi eng chiroyli tabiiy joylardan biri — manzarali Gulun darasida davom etadi: tropik o'rmonlar, kaskad sharsharalar va «Gulun siri» vodiysida sayr.

Dara ustidagi mashhur shisha ko'prik bo'ylab yurish alohida taassurot qoldiradi — undan tog' manzaralarining hayratlanarli ko'rinishi ochiladi.

Narxi — aviachiptasiz 1090 $ dan. Narxga kiradi: nonushta bilan 4★ mehmonxona, konsultatsiya va massaj, barcha transferlar, kirish chiptalari, rus tilida gid va sug'urta.`,
    },
    updatedAt: SEED_DATE,
  },
  {
    id: "dental-south-china-2026",
    slug: "dental-south-china-2026",
    status: "archived",
    title: {
      ru: "Dental South China 2026",
      uz: "Dental South China 2026",
    },
    route: {
      ru: "Гуанчжоу",
      uz: "Guangzhou",
    },
    dates: {
      ru: "2–5 марта 2026",
      uz: "2–5 mart 2026",
    },
    photos: [
      "/tours/dental-south-china/IMG_0201.JPG",
      "/tours/dental-south-china/IMG_0202.jpg",
    ],
    highlights: {
      ru: [
        "Одна из крупнейших стоматологических выставок Азии",
        "Более 100 000 специалистов со всего мира",
        "Свыше 1000 брендов и поставщиков оборудования",
        "Профессиональный нетворкинг и B2B переговоры",
        "В стоимость включены перелёт, отель, переводчик и сопровождение",
        "Комиссия для агентства - 50 USD",
      ],
      uz: [
        "Osiyodagi eng yirik stomatologiya ko'rgazmalaridan biri",
        "Dunyo bo'ylab 100 000 dan ortiq mutaxassis",
        "1000 dan ortiq brend va uskunalar yetkazib beruvchilari",
        "Professional networking va B2B muzokaralar",
        "Narxga: parvoz, mehmonxona, tarjimon va hamrohlik kiradi",
        "Agent komissiyasi - 50 USD",
      ],
    },
    content: {
      ru: `Dental South China - одна из крупнейших стоматологических выставок в Азии, ежегодно собирающая свыше 100 000 специалистов из десятков стран. Это уникальная возможность познакомиться с передовыми технологиями в стоматологии, наладить партнёрские связи и напрямую пообщаться с производителями оборудования.

Urban Travel организует полное сопровождение: вы просто прилетаете - всё остальное берём на себя мы. Наши опытные переводчики помогут в переговорах и на стендах выставки, а наша команда обеспечит комфортный трансфер, расселение и логистику на все дни пребывания.

Поездка идеально подходит для владельцев стоматологических клиник, дистрибьюторов медицинского оборудования и врачей, которые хотят быть в курсе последних трендов отрасли.`,
      uz: `Dental South China - Osiyodagi eng yirik stomatologiya ko'rgazmalaridan biri bo'lib, har yili o'nlab mamlakatlardan 100 000 dan ortiq mutaxassisni yig'adi. Bu stomatologiyadagi ilg'or texnologiyalar bilan tanishish, hamkorlik aloqalarini o'rnatish va uskunalar ishlab chiqaruvchilari bilan bevosita muloqot qilishning noyob imkoniyati.

Urban Travel to'liq hamrohlikni tashkil etadi: siz shunchaki uchib kelasiz - qolgani bizning zimmamizda. Tajribali tarjimonlarimiz ko'rgazma stendlarida va muzokaralarda yordam beradi, jamoamiz esa barcha kunlar davomida qulay transfer, joylashtirish va logistikani ta'minlaydi.

Bu safari stomatologiya klinikasi egalari, tibbiy uskunalar distribyutorlari va sohadagi so'nggi tendentsiyalardan xabardor bo'lishni istagan shifokorlar uchun ideal.`,
    },
    updatedAt: SEED_DATE,
  },
  {
    id: "it-ai-business-trip",
    slug: "it-ai-business-trip",
    status: "archived",
    title: {
      ru: "Бизнес поездка IT и AI",
      uz: "IT va AI biznes safari",
    },
    route: {
      ru: "Шанхай – Уси – Нанкин",
      uz: "Shanxay – Uxi – Nankin",
    },
    dates: {
      ru: "Уточняйте",
      uz: "Aniqlashtiring",
    },
    priceFrom: 1090,
    priceIsFrom: true,
    photos: [
      "/tours/it-ai-business-trip/IMG_0195.JPG",
      "/tours/it-ai-business-trip/IMG_0197.JPG",
    ],
    highlights: {
      ru: [
        "Шанхай - встречи с ведущими AI и tech-компаниями",
        "Уси - технопарки нового поколения, автоматизированные производства",
        "Нанкин - университеты и исследовательские лаборатории",
        "B2B переговоры с китайскими IT-партнёрами",
        "Форумы и конференции по искусственному интеллекту",
        "Авиабилет от 470 USD",
      ],
      uz: [
        "Shanxay - yetakchi AI va tech-kompaniyalar bilan uchrashuvlar",
        "Uxi - yangi avlod texnoparklar, avtomatlashtirilgan ishlab chiqarishlar",
        "Nankin - universitetlar va tadqiqot laboratoriyalari",
        "Xitoylik IT-hamkorlar bilan B2B muzokaralar",
        "Sun'iy intellekt bo'yicha forum va konferentsiyalar",
        "Aviachipта narxi 470 USD dan",
      ],
    },
    content: {
      ru: `Бизнес-поездка охватывает три ключевых города технологического Китая. Шанхай - глобальный финансовый и инновационный хаб, где вас ждут встречи с представителями крупнейших AI-компаний и участие в международных форумах. Уси - промышленное сердце янцзыдельты, где нового поколения технопарки демонстрируют производство, на 80% автоматизированное с помощью роботов. Нанкин - родина Chinese Silicon Valley с ведущими университетами и исследовательскими центрами.

Поездка рассчитана на предпринимателей и IT-специалистов, которые хотят наладить прямые деловые контакты с китайскими партнёрами, изучить рынок и технологии, определяющие облик ближайшего будущего.

Urban Travel обеспечивает трансфер, переводчика и всю организационную логистику маршрута.`,
      uz: `Biznes safari texnologik Xitoyning uchta asosiy shahrini qamrab oladi. Shanxay - global moliya va innovatsiya markazi bo'lib, bu yerda yetakchi AI kompaniyalar vakillari bilan uchrashuvlar va xalqaro forumlarda qatnashish kutadi. Uxi - Yangtze deltasining sanoat yuragi, bu yerda yangi avlod texnoparklari 80% robotlar bilan avtomatlashtirilgan ishlab chiqarishni namoyish etadi. Nankin - yetakchi universitetlar va tadqiqot markazlari bilan Xitoyning Silicon Valley shahrining vatani.

Bu safari xitoylik hamkorlar bilan bevosita biznes aloqalarini o'rnatishni, yaqin kelajak qiyofasini belgilovchi bozor va texnologiyalarni o'rganishni istagan tadbirkorlar va IT mutaxassislari uchun mo'ljallangan.

Urban Travel transfer, tarjimon va marshrutning barcha tashkiliy logistikasini ta'minlaydi.`,
    },
    updatedAt: SEED_DATE,
  },
  {
    id: "spring-fairy-tale",
    slug: "spring-fairy-tale",
    status: "archived",
    title: {
      ru: "Весенняя сказка",
      uz: "Bahoriy ertak",
    },
    route: {
      ru: "Чэнду – Чунцин – Гуйчжоу",
      uz: "Chengdu – Chongqing – Guizhou",
    },
    dates: {
      ru: "Уточняйте",
      uz: "Aniqlashtiring",
    },
    priceFrom: 1090,
    priceIsFrom: true,
    photos: [
      "/tours/spring-fairy-tale/IMG_0210.JPG",
      "/tours/spring-fairy-tale/IMG_0209.jpg",
    ],
    highlights: {
      ru: [
        "Чэнду - знаменитый заповедник панд и парки цветущей сакуры",
        "Чунцин - круиз по великой реке Янцзы",
        "Гуйчжоу - живописные водопады и традиционные деревни",
        "Аутентичная сычуаньская кухня в культурном ресторане",
        "Спа, сауна и массаж - роскошный отдых по-китайски",
        "Стоимость от 1090 USD (двухместное), от 1290 USD (одноместное)",
      ],
      uz: [
        "Chengdu - mashhur panda qo'riqxonasi va gullayotgan sakura bog'lari",
        "Chongqing - buyuk Yangtze daryosi bo'ylab kruiz",
        "Guizhou - manzarali sharsharalar va an'anaviy qishloqlar",
        "Madaniy restoranda haqiqiy Sichuan taomlari",
        "Spa, sauna va massaj - xitoycha hashamatli dam olish",
        "Narxi: 1090 USD dan (2 kishilik), 1290 USD dan (1 kishilik)",
      ],
    },
    content: {
      ru: `«Весенняя сказка» - маршрут, созданный для тех, кто хочет увидеть Китай в его сказочном весеннем облике. Три города с совершенно разным характером: уютный Чэнду с пандами и одним из крупнейших в мире парков цветущей сакуры; свирепый и яркий Чунцин, стоящий на скалах над слиянием двух рек, где вас ждёт незабываемый круиз по Янцзы; и загадочное Гуйчжоу с многоярусными водопадами и деревушками коренных народов.

Вечером - аутентичный сычуаньский ужин в культурном ресторане, а потом - настоящий китайский спа: традиционный массаж и сауна, снимающие усталость после насыщенных экскурсионных дней.

Стоимость тура - 1090 USD при двухместном размещении, 1290 USD при одноместном. Авиабилеты - от 280 до 400 USD. Все остальное организует Urban Travel.`,
      uz: `"Bahoriy ertak" - Xitoyni uning sehrli bahoriy qiyofasida ko'rmoqchi bo'lganlar uchun yaratilgan marshrut. Uchta mutlaqo boshqa xarakterli shahar: pandalar va dunyodagi eng katta gullayotgan sakura bog'laridan biri bilan do'stona Chengdu; ikki daryoning qo'shilish joyidagi qoyalarda turgan, Yangtze bo'ylab unutilmas kruiz kuting, qizg'in va yorqin Chongqing; va ko'p qavatli sharsharalar va mahalliy xalqlar qishloqlari bilan sirli Guizhou.

Kechqurun - madaniy restoranda haqiqiy Sichuan kechki ovqati, keyin esa haqiqiy xitoycha spa: ziddiyatli ekskursiya kunlaridan so'ng charchoqni bosadigan an'anaviy massaj va sauna.

Tur narxi - ikki kishilik xonada 1090 USD, bir kishilik xonada 1290 USD. Aviachiptalar - 280 dan 400 USD gacha. Qolganini Urban Travel tashkil etadi.`,
    },
    updatedAt: SEED_DATE,
  },
  {
    id: "avatar-mountains",
    slug: "avatar-mountains",
    status: "archived",
    title: {
      ru: "Горы Аватара",
      uz: "Avatar tog'lari",
    },
    route: {
      ru: "Пекин – Чжанцзяцзе – Гуанчжоу",
      uz: "Pekin – Chjanczyatsze – Guangzhou",
    },
    dates: {
      ru: "20–28 марта",
      uz: "20–28 mart",
    },
    priceFrom: 1290,
    photos: [
      "/tours/avatar-mountains/IMG_0215.JPG",
      "/tours/avatar-mountains/IMG_0212.JPG",
    ],
    highlights: {
      ru: [
        "Пекин - Великая Китайская стена, Храм Неба, Летний дворец",
        "Чжанцзяцзе - парящие скалы Национального парка «Аватар»",
        "Гора Тяньмэнь - «Небесные врата» и захватывающий дух вид",
        "Самый длинный стеклянный мост в мире",
        "Гуанчжоу - вечерний круиз и лучшая кантонская кухня",
        "Стоимость 1290 USD (двухместное) + авиа 400–500 USD",
      ],
      uz: [
        "Pekin - Buyuk Xitoy devori, Osmon ibodatxonasi, Yozgi saroy",
        'Chjanczyatsze - "Avatar" milliy parkining osmonda suzayotgan qoyalari',
        'Tyannmen tog\'i - "Osmon darvozalari" va nafas oldiradigan manzara',
        "Dunyodagi eng uzun shisha ko'prik",
        "Guangzhou - kechki kruiz va eng yaxshi kanton taomlari",
        "Narxi 1290 USD (2 kishilik) + avia 400–500 USD",
      ],
    },
    content: {
      ru: `Тур «Горы Аватара» - самый эффектный маршрут по Китаю, объединяющий три абсолютно разных лица этой великой страны за девять дней.

Пекин - живая история: по Великой стене можно идти часами, не встретив ни одного другого туриста; Запретный город хранит тысячелетия императорских тайн; а олимпийский стадион «Птичье гнездо» напоминает, что Китай смотрит и в будущее.

Чжанцзяцзе - место, которое невозможно описать словами. Столбы-скалы высотой до 800 метров, плавающие в облаках, вдохновили Джеймса Кэмерона на «Аватар». Подъём на гору Тяньмэнь с «Небесными вратами» и прогулка по самому длинному в мире стеклянному мосту - впечатления на всю жизнь.

Гуанчжоу завершает путешествие: вечерний круиз по Жемчужной реке, огни ночного мегаполиса и лучшая кантонская кухня. Даты: 20–28 марта. Количество мест ограничено.`,
      uz: `"Avatar tog'lari" turi - to'qqiz kun ichida bu buyuk mamlakatning uchta mutlaqo boshqa yuzini birlashtirgan Xitoy bo'ylab eng ta'sirchan marshrut.

Pekin - tirik tarix: Buyuk devor bo'ylab boshqa sayyohlar bilan uchrashmasdan soatlab yurishingiz mumkin; Taqiqlangan shahar ming yillik imperatorlik sirlarini saqlaydi; Olimpiya stadioni "Qushlar uyasi" esa Xitoy kelajakka ham nazar solayotganini eslatadi.

Chjanczyatsze - so'z bilan ta'riflab bo'lmaydigan joy. Bulutlarda suzayotgan, balandligi 800 metrgacha bo'lgan qoya-ustunlar Jeyms Kameronni "Avatar" ga ilhomlantirdi. "Osmon darvozalari" bilan Tyannmen tog'iga ko'tarilish va dunyodagi eng uzun shisha ko'prik ustida yurish - umrbod taassurotlar.

Guangzhou sayohatni yakun yasaydi: Marvarid daryosi bo'ylab kechki kruiz, tungi megapolisning chiroqlari va eng yaxshi kanton taomlari. Sanalar: 20–28 mart. Joylar soni cheklangan.`,
    },
    updatedAt: SEED_DATE,
  },
  {
    id: "family-beijing",
    slug: "family-beijing",
    status: "archived",
    title: {
      ru: "Семейный тур в Пекин",
      uz: "Pekinga oilaviy tur",
    },
    route: {
      ru: "Ташкент – Пекин",
      uz: "Toshkent – Pekin",
    },
    dates: {
      ru: "21–28 марта",
      uz: "21–28 mart",
    },
    priceFrom: 1090,
    photos: [
      "/tours/family-beijing/IMG_0211.JPG",
      "/tours/family-beijing/IMG_0219.JPG",
    ],
    highlights: {
      ru: [
        "Великая Китайская стена — подъём по канатной дороге и потрясающие виды",
        "Мастер-класс по кунг-фу для детей",
        "Прогулка по атмосферной улице Цяньмэнь",
        "Храм Неба — символ древнего Китая",
        "Мастер-класс по китайской каллиграфии",
        "Universal Studios Beijing — аттракционы мирового уровня",
        "Музей науки и технологий и планетарий",
        "Сафари-парк — путешествие среди диких животных",
        "Свободный день для отдыха и шоппинга",
        "Стоимость 1090 USD (двухместное размещение)",
      ],
      uz: [
        "Buyuk Xitoy devori — kanat yo'li orqali ko'tarilish va ajoyib manzaralar",
        "Bolalar uchun kung-fu mahorat darsi",
        "Qianmen ko'chasida sayr — an'anaviy Pekin muhiti",
        "Osmon ibodatxonasi — qadimgi Xitoy ramzi",
        "Xitoy kaligrafiyasi bo'yicha mahorat darsi",
        "Universal Studios Beijing — butun oila uchun mashhur attraksionlar",
        "Fan va texnologiya muzeyi hamda planetariy",
        "Safari park — yovvoyi hayvonlar orasida sayohat",
        "Dam olish va shopping uchun erkin kun",
        "Narxi 1090 USD (2 kishilik joylashuv)",
      ],
    },
    content: {
      ru: `Семейный тур в Пекин — идеальное путешествие для родителей и детей во время весенних каникул.

Это не просто экскурсии, а настоящее приключение, где история оживает, технологии удивляют, а каждый день приносит новые эмоции.

Вы подниметесь на Великую Китайскую стену на канатной дороге и увидите одно из чудес света с высоты. Дети попробуют себя в роли учеников мастера на мастер-классе по кунг-фу и научатся писать своё имя иероглифами на уроке китайской каллиграфии.

Прогулка по атмосферной улице Цяньмэнь позволит почувствовать традиционный Пекин, а посещение Храма Неба откроет историю древнего Китая.

Один из самых ярких дней — поездка в Universal Studios Beijing с аттракционами мирового уровня. Также вас ждёт Музей науки и технологий и планетарий с интерактивными экспозициями, роботами и экспериментами.

В сафари-парке вы отправитесь в настоящее путешествие среди диких животных. А свободный день позволит отдохнуть, заняться шоппингом и провести время всей семьёй.

Стоимость тура — 1090 USD при двухместном размещении. Это путешествие объединяет семью и дарит детям впечатления на всю жизнь.`,
      uz: `Pekinga oilaviy tur — bahorgi ta'tilda ota-onalar va bolalar uchun mukammal sayohat.

Bu oddiy ekskursiya emas, balki tarix jonlanadigan, texnologiyalar hayratga soladigan va har bir kun yangi taassurotlarga boy bo'lgan haqiqiy sarguzashtdir.

Siz kanat yo'li orqali Buyuk Xitoy devoriga ko'tarilib, dunyoning eng mashhur mo'jizalaridan birini balandlikdan tomosha qilasiz. Bolalar kung-fu mahorat darsida o'zlarini haqiqiy shogirddek his qiladilar va xitoy kaligrafiyasi darsida o'z ismlarini ierogliflar bilan yozishni o'rganadilar.

Qianmen ko'chasida sayr qilish orqali an'anaviy Pekin muhitini his qilasiz, Osmon ibodatxonasi esa qadimgi Xitoy tarixini ochib beradi.

Sayohatning eng yorqin kunlaridan biri — Universal Studios Beijing parkiga tashrif. Bu yerda butun oila uchun jahon darajasidagi attraksionlar mavjud. Shuningdek, Fan va texnologiya muzeyi hamda planetariyda robotlar, tajribalar va interaktiv ko'rgazmalar orqali o'rganish imkoniyati bo'ladi.

Safari parkda esa yovvoyi hayvonlar orasida haqiqiy sarguzasht kutmoqda. Erkin kun esa dam olish, shopping qilish va oilaviy vaqt o'tkazish uchun ajratiladi.

Tur narxi — 1090 USD (ikki kishilik joylashuv). Bu sayohat oilani yanada yaqinlashtiradi va bolalar uchun unutilmas xotiralar qoldiradi.`,
    },
    updatedAt: SEED_DATE,
  },
]
