export type Locale = "ru" | "en" | "fr";

export const locales: Locale[] = ["ru", "en", "fr"];

export const localeNames: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  fr: "Français",
};

export interface TranslatedCity {
  id: string;
  name: string;
  description: string;
  objectCount: number;
  slug: string;
}

export interface TranslatedObject {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  workingHours: string;
  transport: string;
  ticketPrices: string;
  citySlug: string;
  audioUrl?: string;
}

export interface UiStrings {
  appName: string;
  objectsCount: (count: number) => string;
  backToHome: string;
  backToCity: (cityName: string) => string;
  noObjects: string;
  workingHours: string;
  transport: string;
  ticketPrices: string;
  heroTitle: string;
  heroDescription: string;
  copyright: string;
  objectsLabel: string;
  cityLabel: string;
}

const ru: UiStrings = {
  appName: "Одигитрия. Путешествия по святым местам России",
  objectsCount: (count: number) =>
    count === 1 ? `${count} святыня` : `${count} святынь`,
  backToHome: "На главную",
  backToCity: (cityName: string) => `Вернуться к ${cityName}`,
  noObjects: "В этом городе пока нет святынь.",
  workingHours: "Режим работы",
  transport: "Как добраться",
  ticketPrices: "Стоимость билетов",
  heroTitle: "Святые места России",
  heroDescription:
    "Интерактивный путеводитель по православным святыням России. Выберите город, чтобы узнать о его храмах, монастырях и чудотворных иконах.",
  copyright: "Все права защищены",
  objectsLabel: "святыни",
  cityLabel: "Город",
};

const en: UiStrings = {
  appName: "Hodegetria. Journeys to Russia's Holy Places",
  objectsCount: (count: number) =>
    count === 1 ? `${count} shrine` : `${count} shrines`,
  backToHome: "Back to home",
  backToCity: (cityName: string) => `Back to ${cityName}`,
  noObjects: "No shrines in this city yet.",
  workingHours: "Opening hours",
  transport: "How to get there",
  ticketPrices: "Ticket prices",
  heroTitle: "Holy Places of Russia",
  heroDescription:
    "An interactive guide to the Orthodox shrines of Russia. Choose a city to learn about its churches, monasteries, and miracle-working icons.",
  copyright: "All rights reserved",
  objectsLabel: "shrines",
  cityLabel: "City",
};

const fr: UiStrings = {
  appName: "Hodigitria. Voyages aux lieux saints de Russie",
  objectsCount: (count: number) =>
    count === 1 ? `${count} sanctuaire` : `${count} sanctuaires`,
  backToHome: "Retour à l'accueil",
  backToCity: (cityName: string) => `Retour à ${cityName}`,
  noObjects: "Aucun sanctuaire dans cette ville pour le moment.",
  workingHours: "Horaires d'ouverture",
  transport: "Comment s'y rendre",
  ticketPrices: "Prix des billets",
  heroTitle: "Lieux saints de Russie",
  heroDescription:
    "Un guide interactif des sanctuaires orthodoxes de Russie. Choisissez une ville pour découvrir ses églises, monastères et icônes miraculeuses.",
  copyright: "Tous droits réservés",
  objectsLabel: "sanctuaires",
  cityLabel: "Ville",
};

export const uiStrings: Record<Locale, UiStrings> = { ru, en, fr };

export const translatedCities: Record<Locale, TranslatedCity[]> = {
  ru: [
    {
      id: "moscow",
      name: "Москва",
      description:
        "Сердце православной России. В Москве находятся древние соборы Кремля, чудотворные иконы и знаменитые монастыри, составляющие духовное наследие страны.",
      objectCount: 4,
      slug: "moscow",
    },
    {
      id: "sergiyev-posad",
      name: "Сергиев Посад",
      description:
        "Духовный центр православия. Здесь расположена Свято-Троицкая Сергиева лавра — крупнейший мужской монастырь России, основанный преподобным Сергием Радонежским.",
      objectCount: 4,
      slug: "sergiyev-posad",
    },
    {
      id: "suzdal",
      name: "Суздаль",
      description:
        "Город-музей под открытым небом. Суздаль славится своими древними монастырями, соборами и церквями, многие из которых входят в список Всемирного наследия ЮНЕСКО.",
      objectCount: 4,
      slug: "suzdal",
    },
    {
      id: "pskov",
      name: "Псков",
      description:
        "Древний православный центр северо-запада России. Псков известен своими древними соборами, Мирожским монастырем с уникальными фресками и Псково-Печерским монастырём.",
      objectCount: 3,
      slug: "pskov",
    },
    {
      id: "veliky-novgorod",
      name: "Великий Новгород",
      description:
        "Колыбель русской государственности и православия. Великий Новгород хранит древнейшие памятники русской церковной архитектуры, включая Софийский собор XI века.",
      objectCount: 3,
      slug: "veliky-novgorod",
    },
    {
      id: "ishimbay",
      name: "Ишимбай",
      description:
        "Город в Башкортостане, место подвига местночтимой святой Варвары Скворчихиной. Здесь находится святой источник и храмы, привлекающие паломников со всей России.",
      objectCount: 2,
      slug: "ishimbay",
    },
  ],
  en: [
    {
      id: "moscow",
      name: "Moscow",
      description:
        "The heart of Orthodox Russia. Moscow is home to the ancient cathedrals of the Kremlin, miracle-working icons, and renowned monasteries that form the country's spiritual heritage.",
      objectCount: 4,
      slug: "moscow",
    },
    {
      id: "sergiyev-posad",
      name: "Sergiyev Posad",
      description:
        "The spiritual center of Orthodoxy. The Holy Trinity Lavra of St. Sergius, the largest male monastery in Russia, founded by St. Sergius of Radonezh, is located here.",
      objectCount: 4,
      slug: "sergiyev-posad",
    },
    {
      id: "suzdal",
      name: "Suzdal",
      description:
        "An open-air museum city. Suzdal is famous for its ancient monasteries, cathedrals, and churches, many of which are UNESCO World Heritage sites.",
      objectCount: 4,
      slug: "suzdal",
    },
    {
      id: "pskov",
      name: "Pskov",
      description:
        "An ancient Orthodox center of northwestern Russia. Pskov is known for its ancient cathedrals, the Mirozhsky Monastery with unique frescoes, and the Pskov-Caves Monastery.",
      objectCount: 3,
      slug: "pskov",
    },
    {
      id: "veliky-novgorod",
      name: "Veliky Novgorod",
      description:
        "The cradle of Russian statehood and Orthodoxy. Veliky Novgorod preserves the most ancient monuments of Russian church architecture, including the 11th-century St. Sophia Cathedral.",
      objectCount: 3,
      slug: "veliky-novgorod",
    },
    {
      id: "ishimbay",
      name: "Ishimbay",
      description:
        "A city in Bashkortostan, the site of the spiritual feat of locally venerated saint Varvara Skvorchikhinskaya. The holy spring and churches here attract pilgrims from all over Russia.",
      objectCount: 2,
      slug: "ishimbay",
    },
  ],
  fr: [
    {
      id: "moscow",
      name: "Moscou",
      description:
        "Le cœur de la Russie orthodoxe. Moscou abrite les anciennes cathédrales du Kremlin, des icônes miraculeuses et de célèbres monastères qui forment le patrimoine spirituel du pays.",
      objectCount: 4,
      slug: "moscow",
    },
    {
      id: "sergiyev-posad",
      name: "Serguiev Possad",
      description:
        "Le centre spirituel de l'orthodoxie. La Laure de la Trinité-Saint-Serge, le plus grand monastère masculin de Russie, fondé par saint Serge de Radonège, s'y trouve.",
      objectCount: 4,
      slug: "sergiyev-posad",
    },
    {
      id: "suzdal",
      name: "Souzdal",
      description:
        "Une ville-musée à ciel ouvert. Souzdal est célèbre pour ses anciens monastères, cathédrales et églises, dont beaucoup sont classés au patrimoine mondial de l'UNESCO.",
      objectCount: 4,
      slug: "suzdal",
    },
    {
      id: "pskov",
      name: "Pskov",
      description:
        "Un ancien centre orthodoxe du nord-ouest de la Russie. Pskov est connu pour ses anciennes cathédrales, le monastère de Miroj avec ses fresques uniques et le monastère des Grottes de Pskov.",
      objectCount: 3,
      slug: "pskov",
    },
    {
      id: "veliky-novgorod",
      name: "Veliki Novgorod",
      description:
        "Le berceau de l'État russe et de l'orthodoxie. Veliki Novgorod préserve les monuments les plus anciens de l'architecture ecclésiastique russe, dont la cathédrale Sainte-Sophie du XIe siècle.",
      objectCount: 3,
      slug: "veliky-novgorod",
    },
    {
      id: "ishimbay",
      name: "Ichimbaï",
      description:
        "Une ville en Bachkirie, lieu de l'exploit spirituel de la sainte localement vénérée Varvara Skvortchikhinskaïa. La source sacrée et les églises attirent des pèlerins de toute la Russie.",
      objectCount: 2,
      slug: "ishimbay",
    },
  ],
};

export const translatedObjects: Record<Locale, TranslatedObject[]> = {
  ru: [
    {
      id: "moscow-christ-saviour",
      name: "Храм Христа Спасителя",
      slug: "christ-saviour-cathedral",
      description: "Главный кафедральный собор Русской православной церкви",
      longDescription:
        "Храм Христа Спасителя — кафедральный собор Русской православной церкви, расположенный в центре Москвы на улице Волхонка. Храм был построен в память о победе в Отечественной войне 1812 года. Построен по проекту архитектора Константина Тона в XIX веке, разрушен в 1931 году и воссоздан в 1990-е годы. Высота храма — 103 метра, это один из самых высоких православных храмов в мире. В храме хранятся чтимые святыни: частица Ризы Господней, Гвоздь Креста Господня, мощи святых.",
      workingHours: "Ежедневно: 8:00–20:00",
      transport: "м. Кропоткинская, ул. Волхонка, 15",
      ticketPrices: "Вход свободный, экскурсии — от 400₽",
      citySlug: "moscow",
    },
    {
      id: "moscow-novodevichy",
      name: "Новодевичий монастырь",
      slug: "novodevichy-convent",
      description: "Женский монастырь, объект Всемирного наследия ЮНЕСКО",
      longDescription:
        "Новодевичий Богородице-Смоленский монастырь — один из самых красивых монастырских ансамблей Москвы, основанный в 1524 году великим князем Василием III. Монастырь является объектом Всемирного наследия ЮНЕСКО. Главный собор — Смоленский (в честь Смоленской иконы Божией Матери) с уникальными фресками XVI века. На территории монастыря похоронены многие выдающиеся деятели России. Здесь находится Новодевичье кладбище — один из самых известных некрополей Москвы.",
      workingHours: "Ежедневно: 7:00–19:00",
      transport: "м. Спортивная, ул. Большая Пироговская, 2",
      ticketPrices: "Вход свободный",
      citySlug: "moscow",
    },
    {
      id: "moscow-dormition-cathedral",
      name: "Успенский собор Московского Кремля",
      slug: "dormition-cathedral-kremlin",
      description: "Главный храм Московского государства",
      longDescription:
        "Успенский собор Московского Кремля — один из главных православных храмов России, построенный в 1475–1479 годах под руководством итальянского архитектора Аристотеля Фиораванти. На протяжении веков собор был главным кафедральным храмом Русского государства: здесь венчались на царство цари, короновались императоры, оглашались государственные указы. В соборе хранятся чтимые иконы: Владимирская икона Божией Матери, икона «Спас Ярое Око», фрески и иконостас с уникальными древними образами.",
      workingHours: "Чт–Вс: 10:00–17:00, касса до 16:00",
      transport: "м. Александровский сад, Кремль, Соборная площадь",
      ticketPrices: "Взрослый — 500₽, Льготный — 250₽",
      citySlug: "moscow",
    },
    {
      id: "moscow-danilov",
      name: "Данилов монастырь",
      slug: "danilov-monastery",
      description: "Древнейший монастырь Москвы, резиденция Патриарха",
      longDescription:
        "Свято-Данилов монастырь — древнейший монастырь Москвы, основанный в 1282 году князем Даниилом Московским, сыном Александра Невского. Сегодня монастырь является резиденцией Святейшего Патриарха Московского и всея Руси и местом расположения Отдела внешних церковных связей. На территории монастыря находятся Свято-Троицкий собор, храм Святых Отцов Семи Вселенских Соборов, храм преподобного Даниила Столпника. В монастыре хранятся мощи святого князя Даниила Московского.",
      workingHours: "Ежедневно: 6:30–20:00",
      transport: "м. Тульская, Даниловский вал, 22",
      ticketPrices: "Вход свободный",
      citySlug: "moscow",
    },
    {
      id: "sergiyev-lavra",
      name: "Свято-Троицкая Сергиева лавра",
      slug: "trinity-lavra",
      description:
        "Крупнейший мужской монастырь России, духовный центр православия",
      longDescription:
        "Свято-Троицкая Сергиева лавра — крупнейший ставропигиальный мужской монастырь Русской православной церкви, основанный в 1337 году преподобным Сергием Радонежским. Лавра является объектом Всемирного наследия ЮНЕСКО. В Троицком соборе лавры находятся мощи преподобного Сергия Радонежского — одна из самых почитаемых святынь России. На территории лавры расположены 10 храмов, Московская духовная академия, семинария и иконописная школа.",
      workingHours: "Ежедневно: 5:00–21:00",
      transport:
        "г. Сергиев Посад, Свято-Троицкая Сергиева лавра (электричка с Ярославского вокзала до ст. Сергиев Посад)",
      ticketPrices: "Вход свободный",
      citySlug: "sergiyev-posad",
    },
    {
      id: "sergiyev-dormition",
      name: "Успенский собор Троице-Сергиевой лавры",
      slug: "lavra-dormition-cathedral",
      description: "Величественный собор на территории Лавры",
      longDescription:
        "Успенский собор Троице-Сергиевой лавры — один из крупнейших православных храмов России, построенный в 1559–1585 годах по указу царя Ивана Грозного. Высота собора — 69 метров. В его архитектуре сочетаются черты московского и владимирского зодчества. Внутри собора сохранились фрески XVII–XIX веков и пятиярусный резной иконостас. В соборе находится рака с мощами святителя Филарета (Дроздова) и других святых.",
      workingHours: "Ежедневно: 8:00–18:00",
      transport: "г. Сергиев Посад, территория Лавры",
      ticketPrices: "Вход свободный",
      citySlug: "sergiyev-posad",
    },
    {
      id: "sergiyev-refectory",
      name: "Церковь преподобного Сергия с Трапезной палатой",
      slug: "sergius-refectory-church",
      description: "Уникальный памятник русской архитектуры XVII века",
      longDescription:
        "Церковь преподобного Сергия Радонежского с Трапезной палатой построена в 1686–1692 годах по указу царей Ивана и Петра Алексеевичей. Это одно из самых роскошных зданий лавры, украшенное богатым белокаменным резным декором. Трапезная палата — одно из самых больших сводчатых помещений своего времени, площадью более 500 квадратных метров, перекрытое единым сводом без опорных столбов.",
      workingHours: "Ежедневно: 8:00–18:00",
      transport: "г. Сергиев Посад, территория Лавры",
      ticketPrices: "Вход свободный",
      citySlug: "sergiyev-posad",
    },
    {
      id: "sergiyev-chernigov",
      name: "Черниговский скит",
      slug: "chernigov-skete",
      description: "Уединённый скит в окрестностях Лавры",
      longDescription:
        "Гефсиманский Черниговский скит расположен в 3 км от Троице-Сергиевой лавры, в живописном лесном массиве. Основан в 1844 году как место уединённой молитвы монахов. В 1851 году здесь была построена пещерная церковь Архистратига Михаила, а в 1889 году — величественный Черниговский собор в неовизантийском стиле. Скит получил название в честь Черниговской-Гефсиманской иконы Божией Матери, явленной здесь в 1852 году.",
      workingHours: "Ежедневно: 7:00–19:00",
      transport: "г. Сергиев Посад, 3 км от Лавры (автобус №38 от ж/д вокзала)",
      ticketPrices: "Вход свободный",
      citySlug: "sergiyev-posad",
    },
    {
      id: "suzdal-kremlin",
      name: "Суздальский кремль. Рождественский собор",
      slug: "suzdal-kremlin",
      description: "Древнейшая часть Суздаля, сердце города",
      longDescription:
        "Суздальский кремль — древнейшая часть города, его историческое и духовное ядро. Главный храм кремля — Рождественский собор, построенный в 1222–1225 годах. Это один из немногих сохранившихся памятников белокаменного зодчества домонгольской эпохи. Собор знаменит своими уникальными «Златыми вратами» — дверями из медных пластин, покрытых тончайшим слоем золота с изображениями евангельских сюжетов. В интерьере сохранились фрески XIII и XV веков.",
      workingHours: "Ежедневно: 9:00–18:00, Пн: выходной",
      transport: "г. Суздаль, ул. Кремлёвская, 20",
      ticketPrices: "Взрослый — 400₽, Льготный — 200₽",
      citySlug: "suzdal",
    },
    {
      id: "suzdal-spaso-evtimiev",
      name: "Спасо-Евфимиев монастырь",
      slug: "spaso-evtimiev-monastery",
      description: "Мужской монастырь, объект Всемирного наследия ЮНЕСКО",
      longDescription:
        "Спасо-Евфимиев монастырь основан в 1352 году суздальско-нижегородским князем Борисом Константиновичем как крепость для защиты города. Монастырь является объектом Всемирного наследия ЮНЕСКО. Главный собор — Спасо-Преображенский, построенный в XVI веке, с фресками знаменитых иконописцев Гурия Никитина и Силы Савина. На территории монастыря — звонница с уникальным набором колоколов XVII–XVIII веков, музей «Суздальская тюрьма».",
      workingHours: "Ежедневно: 9:00–18:00, касса до 17:00",
      transport: "г. Суздаль, ул. Кремлёвская (левый берег Каменки)",
      ticketPrices: "Взрослый — 450₽, Льготный — 200₽",
      citySlug: "suzdal",
    },
    {
      id: "suzdal-pokrovsky",
      name: "Покровский монастырь",
      slug: "pokrovsky-convent",
      description: "Женский монастырь, место ссылки знатных женщин",
      longDescription:
        "Покровский монастырь основан в 1364 году при князе Дмитрии Константиновиче. В XVI–XVII веках монастырь служил местом пострижения и ссылки знатных женщин: царицы Соломонии Сабуровой (первой жены Василия III), царевны Евдокии Лопухиной (первой жены Петра I). Покровский собор монастыря — один из красивейших во Владимирской земле. В подклете собора находится усыпальница знатных инокинь.",
      workingHours: "Ежедневно: 8:00–19:00",
      transport: "г. Суздаль, ул. Покровская, 76",
      ticketPrices: "Вход свободный",
      citySlug: "suzdal",
    },
    {
      id: "suzdal-wooden-architecture",
      name: "Музей деревянного зодчества",
      slug: "wooden-architecture-museum",
      description:
        "Собрание памятников деревянной архитектуры под открытым небом",
      longDescription:
        "Музей деревянного зодчества и крестьянского быта расположен на берегу реки Каменки, рядом с Суздальским кремлём. На территории музея собраны уникальные памятники деревянной архитектуры XVII–XIX веков из разных районов Владимирской области: деревянные церкви (Никольская из села Глотово и Преображенская из села Козлятьево), избы, амбары, бани, ветряные мельницы.",
      workingHours: "Ежедневно: 9:00–19:00, Пн: 9:00–15:00",
      transport: "г. Суздаль, ул. Кремлёвская, 2",
      ticketPrices: "Взрослый — 350₽, Льготный — 150₽",
      citySlug: "suzdal",
    },
    {
      id: "pskov-trinity-cathedral",
      name: "Свято-Троицкий кафедральный собор",
      slug: "pskov-trinity-cathedral",
      description: "Главный храм Псковского крома",
      longDescription:
        "Свято-Троицкий кафедральный собор — главный храм Пскова, расположенный на территории Псковского крома (кремля). Современное здание собора построено в 1682–1699 годах на месте более древних храмов. Первый собор на этом месте был заложен в X веке по указу княгини Ольги. Высота собора — 78 метров. В храме хранятся чтимые святыни: Псково-Покровская икона Божией Матери, мощи святых псковских князей.",
      workingHours: "Ежедневно: 7:30–20:00",
      transport: "г. Псков, Псковский кром, ул. Кром",
      ticketPrices: "Вход свободный",
      citySlug: "pskov",
    },
    {
      id: "pskov-mirozhsky",
      name: "Спасо-Преображенский Мирожский монастырь",
      slug: "mirozhsky-monastery",
      description: "Древний монастырь с уникальными фресками XII века",
      longDescription:
        "Спасо-Преображенский Мирожский монастырь основан в XII веке при архиепископе Нифонте. Главная святыня монастыря — Спасо-Преображенский собор, построенный в 1130–1140 годах. Это один из немногих храмов, где полностью сохранились домонгольские фрески (около 1140 года) — уникальный памятник византийской и древнерусской монументальной живописи. Фрески Мирожского монастыря являются объектом Всемирного наследия ЮНЕСКО.",
      workingHours: "Ср–Вс: 10:00–17:00, Пн–Вт: выходной",
      transport: "г. Псков, Мирожская набережная, 2",
      ticketPrices:
        "Взрослый — 300₽, Льготный — 150₽, вход на территорию — свободный",
      citySlug: "pskov",
    },
    {
      id: "pskov-caves",
      name: "Свято-Успенский Псково-Печерский монастырь",
      slug: "pskov-caves-monastery",
      description: "Один из древнейших монастырей России с пещерными храмами",
      longDescription:
        "Свято-Успенский Псково-Печерский монастырь — один из старейших и крупнейших мужских монастырей России, основанный в 1473 году в пещерах у ручья Каменец. Монастырь никогда не закрывался, даже в советское время. Главные святыни: Успенский собор, вырубленный в скале, мощи преподобных Марка, Ионы, Корнилия и других печерских святых, чудотворные иконы «Успение Божией Матери» и «Одигитрия».",
      workingHours: "Ежедневно: 6:00–21:00",
      transport:
        "г. Печоры, ул. Международная, 5 (автобус из Пскова, 50 км на запад)",
      ticketPrices: "Вход свободный",
      citySlug: "pskov",
    },
    {
      id: "novgorod-sophia",
      name: "Софийский собор",
      slug: "novgorod-sophia-cathedral",
      description: "Древнейший сохранившийся каменный храм России",
      longDescription:
        "Софийский собор в Великом Новгороде — древнейший сохранившийся каменный православный храм на территории России, построенный в 1045–1050 годах по указу князя Владимира Ярославича, сына Ярослава Мудрого. Собор является объектом Всемирного наследия ЮНЕСКО. Знаменит своими уникальными фресками XII века, древним иконостасом и чудотворной иконой «Знамение Божией Матери».",
      workingHours: "Ежедневно: 8:00–20:00",
      transport: "Великий Новгород, Кремль, 11",
      ticketPrices: "Вход свободный",
      citySlug: "veliky-novgorod",
    },
    {
      id: "novgorod-yuriev",
      name: "Свято-Юрьев монастырь",
      slug: "yuriev-monastery",
      description: "Древнейший монастырь Великого Новгорода",
      longDescription:
        "Свято-Юрьев (Георгиевский) монастырь основан в 1030 году князем Ярославом Мудрым. Это один из древнейших монастырей России. Главный храм — Георгиевский собор, построенный в 1119–1130 годах по заказу князя Всеволода Мстиславича. Собор знаменит своими фресками XII века (сохранились фрагментарно) и строгими пропорциями. Высота собора — 32 метра. В монастыре похоронены многие новгородские князья и архиепископы.",
      workingHours: "Ежедневно: 8:00–19:00",
      transport: "Великий Новгород, Юрьевское шоссе (автобус №7 от Кремля)",
      ticketPrices: "Вход свободный",
      citySlug: "veliky-novgorod",
    },
    {
      id: "novgorod-nereditsa",
      name: "Церковь Спаса на Нередице",
      slug: "nereditsa-church",
      description: "Знаменитая церковь с фресками XII века",
      longDescription:
        "Церковь Спаса Преображения на Нередице (Спас-Нередица) построена в 1198 году князем Ярославом Владимировичем. Церковь знаменита своими уникальными фресками 1199 года, которые были одними из самых полных комплексов домонгольской монументальной живописи в России. Во время Великой Отечественной войны церковь была разрушена, фрески сильно повреждены. В 1950–1960-е годы храм был восстановлен, сохранённые фрагменты фресок законсервированы. Церковь является объектом Всемирного наследия ЮНЕСКО.",
      workingHours: "Ср–Вс: 10:00–17:00, Пн–Вт: выходной",
      transport:
        "Великий Новгород, 2 км к юго-востоку от Кремля (автобус №110 от Кремля)",
      ticketPrices: "Взрослый — 200₽",
      citySlug: "veliky-novgorod",
    },
    {
      id: "ishimbay-trinity",
      name: "Храм Пресвятой Троицы",
      slug: "ishimbay-trinity-church",
      description: "Главный православный храм города Ишимбай",
      longDescription:
        "Храм Пресвятой Троицы — главный православный храм города Ишимбай, построенный в 2002–2007 годах. Это красивое кирпичное здание в русско-византийском стиле с золотыми куполами. В храме находятся чтимые иконы и святыни. При храме действует воскресная школа для детей, библиотека православной литературы. Храм играет важную роль в духовной жизни города и окрестных районов Башкортостана.",
      workingHours: "Ежедневно: 7:00–19:00",
      transport: "г. Ишимбай, ул. Гагарина, 50",
      ticketPrices: "Вход свободный",
      citySlug: "ishimbay",
    },
    {
      id: "ishimbay-varvara",
      name: "Святой источник Варвары Скворчихиной",
      slug: "varvara-spring-ishimbay",
      description: "Место подвига местночтимой святой Варвары Скворчихиной",
      longDescription:
        "Святой источник и место подвигов блаженной Варвары Скворчихиной (1890–1972) — одна из главных святынь Ишимбая и всей Башкортостанской митрополии. Варвара Скворчихина, местночтимая святая, вела подвижническую жизнь в окрестностях Ишимбая, помогая людям молитвой и советом в годы гонений на церковь. На источнике оборудована купальня, построена часовня. Сюда приезжают паломники со всей России и из-за рубежа.",
      workingHours: "Ежедневно: круглосуточно",
      transport:
        "г. Ишимбай, окрестности города (справки в Храме Пресвятой Троицы)",
      ticketPrices: "Бесплатно",
      citySlug: "ishimbay",
    },
  ],
  en: [
    {
      id: "moscow-christ-saviour",
      name: "Cathedral of Christ the Saviour",
      slug: "christ-saviour-cathedral",
      description: "The main cathedral of the Russian Orthodox Church",
      longDescription:
        "The Cathedral of Christ the Saviour is the main cathedral of the Russian Orthodox Church, located in the center of Moscow on Volkhonka Street. The cathedral was built to commemorate the victory in the Patriotic War of 1812. Designed by architect Konstantin Ton in the 19th century, it was destroyed in 1931 and rebuilt in the 1990s. At 103 meters high, it is one of the tallest Orthodox churches in the world. The cathedral houses venerated relics: a fragment of the Lord's Robe, the Nail of the Holy Cross, and relics of saints.",
      workingHours: "Daily: 8:00–20:00",
      transport: "Kropotkinskaya metro station, Volkhonka St., 15",
      ticketPrices: "Free entry, guided tours from 400₽",
      citySlug: "moscow",
    },
    {
      id: "moscow-novodevichy",
      name: "Novodevichy Convent",
      slug: "novodevichy-convent",
      description: "A convent, UNESCO World Heritage site",
      longDescription:
        "Novodevichy Mother of God of Smolensk Convent is one of the most beautiful monastic ensembles in Moscow, founded in 1524 by Grand Prince Vasily III. The convent is a UNESCO World Heritage site. The main cathedral is the Smolensk Cathedral (dedicated to the Smolensk Icon of the Mother of God) with unique 16th-century frescoes. Many outstanding Russian figures are buried on the grounds. The Novodevichy Cemetery is one of Moscow's most famous necropolises.",
      workingHours: "Daily: 7:00–19:00",
      transport: "Sportivnaya metro station, Bolshaya Pirogovskaya St., 2",
      ticketPrices: "Free entry",
      citySlug: "moscow",
    },
    {
      id: "moscow-dormition-cathedral",
      name: "Dormition Cathedral of the Moscow Kremlin",
      slug: "dormition-cathedral-kremlin",
      description: "The main church of the Moscow state",
      longDescription:
        "The Dormition Cathedral of the Moscow Kremlin is one of the main Orthodox churches in Russia, built in 1475–1479 under the direction of Italian architect Aristotle Fioravanti. For centuries, it served as the main cathedral of the Russian state: tsars were crowned here, emperors were anointed, and state decrees were proclaimed. The cathedral houses venerated icons: the Vladimir Icon of the Mother of God, the icon 'Saviour of the Fiery Eye,' frescoes, and an iconostasis with unique ancient images.",
      workingHours: "Thu–Sun: 10:00–17:00, ticket office until 16:00",
      transport: "Alexandrovsky Sad metro station, Kremlin, Cathedral Square",
      ticketPrices: "Adult — 500₽, Reduced — 250₽",
      citySlug: "moscow",
    },
    {
      id: "moscow-danilov",
      name: "Danilov Monastery",
      slug: "danilov-monastery",
      description: "The oldest monastery in Moscow, residence of the Patriarch",
      longDescription:
        "St. Danilov Monastery is the oldest monastery in Moscow, founded in 1282 by Prince Daniel of Moscow, son of Alexander Nevsky. Today it serves as the residence of His Holiness the Patriarch of Moscow and All Rus' and houses the Department for External Church Relations. The monastery grounds include the Holy Trinity Cathedral, the Church of the Holy Fathers of the Seven Ecumenical Councils, and the Church of St. Daniel the Stylite. The monastery preserves the relics of St. Prince Daniel of Moscow.",
      workingHours: "Daily: 6:30–20:00",
      transport: "Tulskaya metro station, Danilovsky Val, 22",
      ticketPrices: "Free entry",
      citySlug: "moscow",
    },
    {
      id: "sergiyev-lavra",
      name: "Holy Trinity Lavra of St. Sergius",
      slug: "trinity-lavra",
      description:
        "Russia's largest male monastery, spiritual center of Orthodoxy",
      longDescription:
        "The Holy Trinity Lavra of St. Sergius is the largest stauropegic male monastery of the Russian Orthodox Church, founded in 1337 by St. Sergius of Radonezh. The Lavra is a UNESCO World Heritage site. The Trinity Cathedral houses the relics of St. Sergius of Radonezh — one of the most venerated shrines in Russia. The monastery grounds contain 10 churches, the Moscow Theological Academy, seminary, and icon-painting school.",
      workingHours: "Daily: 5:00–21:00",
      transport:
        "Sergiyev Posad, Holy Trinity Lavra of St. Sergius (train from Yaroslavsky Station to Sergiyev Posad station)",
      ticketPrices: "Free entry",
      citySlug: "sergiyev-posad",
    },
    {
      id: "sergiyev-dormition",
      name: "Dormition Cathedral of the Trinity Lavra",
      slug: "lavra-dormition-cathedral",
      description: "A majestic cathedral on the Lavra grounds",
      longDescription:
        "The Dormition Cathedral of the Trinity Lavra of St. Sergius is one of the largest Orthodox churches in Russia, built in 1559–1585 by order of Tsar Ivan the Terrible. The cathedral is 69 meters high. Its architecture blends Moscow and Vladimir traditions. Inside, 17th–19th century frescoes and a five-tier carved iconostasis have been preserved. The cathedral contains a reliquary with the relics of St. Philaret (Drozdov) and other saints.",
      workingHours: "Daily: 8:00–18:00",
      transport: "Sergiyev Posad, Lavra grounds",
      ticketPrices: "Free entry",
      citySlug: "sergiyev-posad",
    },
    {
      id: "sergiyev-refectory",
      name: "Church of St. Sergius with the Refectory Chamber",
      slug: "sergius-refectory-church",
      description: "A unique monument of 17th-century Russian architecture",
      longDescription:
        "The Church of St. Sergius of Radonezh with the Refectory Chamber was built in 1686–1692 by order of Tsars Ivan and Peter Alexeyevich. It is one of the Lavra's most ornate buildings, adorned with rich white-stone carved decoration. The Refectory Chamber is one of the largest vaulted halls of its time, covering over 500 square meters with a single vault without supporting columns.",
      workingHours: "Daily: 8:00–18:00",
      transport: "Sergiyev Posad, Lavra grounds",
      ticketPrices: "Free entry",
      citySlug: "sergiyev-posad",
    },
    {
      id: "sergiyev-chernigov",
      name: "Chernigov Skete",
      slug: "chernigov-skete",
      description: "A secluded skete near the Lavra",
      longDescription:
        "The Gethsemane Chernigov Skete is located 3 km from the Trinity Lavra of St. Sergius, in a picturesque forest area. Founded in 1844 as a place of solitary prayer for monks. In 1851, a cave church of the Archangel Michael was built here, and in 1889, the majestic Chernigov Cathedral in Neo-Byzantine style. The skete was named after the Chernigov-Gethsemane Icon of the Mother of God, revealed here in 1852.",
      workingHours: "Daily: 7:00–19:00",
      transport:
        "Sergiyev Posad, 3 km from Lavra (bus No. 38 from railway station)",
      ticketPrices: "Free entry",
      citySlug: "sergiyev-posad",
    },
    {
      id: "suzdal-kremlin",
      name: "Suzdal Kremlin. Nativity Cathedral",
      slug: "suzdal-kremlin",
      description: "The oldest part of Suzdal, the heart of the city",
      longDescription:
        "The Suzdal Kremlin is the oldest part of the city, its historical and spiritual core. The main church of the Kremlin is the Nativity Cathedral, built in 1222–1225. It is one of the few surviving monuments of white-stone architecture from the pre-Mongol era. The cathedral is famous for its unique 'Golden Doors' — panels of copper plates coated with a thin layer of gold depicting Gospel scenes.",
      workingHours: "Daily: 9:00–18:00, Mon: closed",
      transport: "Suzdal, Kremlyovskaya St., 20",
      ticketPrices: "Adult — 400₽, Reduced — 200₽",
      citySlug: "suzdal",
    },
    {
      id: "suzdal-spaso-evtimiev",
      name: "Saviour Monastery of St. Euthymius",
      slug: "spaso-evtimiev-monastery",
      description: "A male monastery, UNESCO World Heritage site",
      longDescription:
        "The Saviour Monastery of St. Euthymius was founded in 1352 by Suzdal-Nizhny Novgorod Prince Boris Konstantinovich as a fortress to protect the city. The monastery is a UNESCO World Heritage site. The main cathedral is the Transfiguration Cathedral, built in the 16th century, with frescoes by famous icon painters Gury Nikitin and Sila Savin. The monastery grounds include a belfry with a unique set of 17th–18th century bells and the 'Suzdal Prison' museum.",
      workingHours: "Daily: 9:00–18:00, ticket office until 17:00",
      transport: "Suzdal, Kremlyovskaya St. (left bank of Kamenka River)",
      ticketPrices: "Adult — 450₽, Reduced — 200₽",
      citySlug: "suzdal",
    },
    {
      id: "suzdal-pokrovsky",
      name: "Intercession Convent",
      slug: "pokrovsky-convent",
      description: "A convent, place of exile for noble women",
      longDescription:
        "The Intercession Convent was founded in 1364 under Prince Dmitry Konstantinovich. In the 16th–17th centuries, it served as a place of tonsure and exile for noble women: Tsarina Solomonia Saburova (first wife of Vasily III), Tsarevna Evdokia Lopukhina (first wife of Peter I). The Intercession Cathedral is one of the most beautiful in the Vladimir region.",
      workingHours: "Daily: 8:00–19:00",
      transport: "Suzdal, Pokrovskaya St., 76",
      ticketPrices: "Free entry",
      citySlug: "suzdal",
    },
    {
      id: "suzdal-wooden-architecture",
      name: "Museum of Wooden Architecture",
      slug: "wooden-architecture-museum",
      description:
        "A collection of wooden architecture monuments in the open air",
      longDescription:
        "The Museum of Wooden Architecture and Peasant Life is located on the bank of the Kamenka River, near the Suzdal Kremlin. The museum grounds feature unique monuments of 17th–19th century wooden architecture from different regions of the Vladimir region: wooden churches (St. Nicholas Church from Glotovo village and Transfiguration Church from Kozlyatyevo village), peasant houses, barns, bathhouses, and windmills.",
      workingHours: "Daily: 9:00–19:00, Mon: 9:00–15:00",
      transport: "Suzdal, Kremlyovskaya St., 2",
      ticketPrices: "Adult — 350₽, Reduced — 150₽",
      citySlug: "suzdal",
    },
    {
      id: "pskov-trinity-cathedral",
      name: "Holy Trinity Cathedral",
      slug: "pskov-trinity-cathedral",
      description: "The main church of the Pskov Krom",
      longDescription:
        "The Holy Trinity Cathedral is the main church of Pskov, located on the grounds of the Pskov Krom (Kremlin). The present cathedral was built in 1682–1699 on the site of earlier churches. The first cathedral on this site was founded in the 10th century by order of Princess Olga. The cathedral is 78 meters high. It houses venerated relics: the Pskov-Pokrov Icon of the Mother of God, relics of holy Pskov princes.",
      workingHours: "Daily: 7:30–20:00",
      transport: "Pskov, Pskov Krom, Krom St.",
      ticketPrices: "Free entry",
      citySlug: "pskov",
    },
    {
      id: "pskov-mirozhsky",
      name: "Transfiguration Mirozhsky Monastery",
      slug: "mirozhsky-monastery",
      description: "An ancient monastery with unique 12th-century frescoes",
      longDescription:
        "The Transfiguration Mirozhsky Monastery was founded in the 12th century under Archbishop Nifont. The main shrine of the monastery is the Transfiguration Cathedral, built in 1130–1140. It is one of the few churches that fully preserves pre-Mongol frescoes (circa 1140) — a unique monument of Byzantine and Old Russian monumental painting. The Mirozhsky Monastery frescoes are a UNESCO World Heritage site.",
      workingHours: "Wed–Sun: 10:00–17:00, Mon–Tue: closed",
      transport: "Pskov, Mirozhskaya Embankment, 2",
      ticketPrices: "Adult — 300₽, Reduced — 150₽, grounds entry free",
      citySlug: "pskov",
    },
    {
      id: "pskov-caves",
      name: "Pskov-Caves Monastery of the Dormition",
      slug: "pskov-caves-monastery",
      description: "One of Russia's oldest monasteries with cave churches",
      longDescription:
        "The Pskov-Caves Monastery of the Dormition is one of the oldest and largest male monasteries in Russia, founded in 1473 in caves by the Kamenets stream. The monastery never closed, even during the Soviet era. Its main shrines include the Dormition Cathedral carved into the rock, the relics of Sts. Mark, Jonah, Cornelius and other cave saints, and the miracle-working icons 'Dormition of the Mother of God' and 'Hodegetria.'",
      workingHours: "Daily: 6:00–21:00",
      transport: "Pechory, Mezhdunarodnaya St., 5 (bus from Pskov, 50 km west)",
      ticketPrices: "Free entry",
      citySlug: "pskov",
    },
    {
      id: "novgorod-sophia",
      name: "Saint Sophia Cathedral",
      slug: "novgorod-sophia-cathedral",
      description: "The oldest surviving stone church in Russia",
      longDescription:
        "Saint Sophia Cathedral in Veliky Novgorod is the oldest surviving stone Orthodox church in Russia, built in 1045–1050 by order of Prince Vladimir Yaroslavich, son of Yaroslav the Wise. The cathedral is a UNESCO World Heritage site. It is famous for its unique 12th-century frescoes, ancient iconostasis, and the miracle-working icon 'The Sign of the Mother of God.'",
      workingHours: "Daily: 8:00–20:00",
      transport: "Veliky Novgorod, Kremlin, 11",
      ticketPrices: "Free entry",
      citySlug: "veliky-novgorod",
    },
    {
      id: "novgorod-yuriev",
      name: "St. George's Monastery",
      slug: "yuriev-monastery",
      description: "The oldest monastery in Veliky Novgorod",
      longDescription:
        "St. George's (Yuriev) Monastery was founded in 1030 by Prince Yaroslav the Wise. It is one of the oldest monasteries in Russia. The main church is the St. George's Cathedral, built in 1119–1130 by order of Prince Vsevolod Mstislavich. The cathedral is famous for its 12th-century frescoes (fragmentarily preserved) and strict proportions. The cathedral is 32 meters high. Many Novgorod princes and archbishops are buried in the monastery.",
      workingHours: "Daily: 8:00–19:00",
      transport:
        "Veliky Novgorod, Yurievskoye Highway (bus No. 7 from the Kremlin)",
      ticketPrices: "Free entry",
      citySlug: "veliky-novgorod",
    },
    {
      id: "novgorod-nereditsa",
      name: "Church of the Saviour on Nereditsa",
      slug: "nereditsa-church",
      description: "A famous church with 12th-century frescoes",
      longDescription:
        "The Church of the Transfiguration of the Saviour on Nereditsa (Spas-Nereditsa) was built in 1198 by Prince Yaroslav Vladimirovich. The church is famous for its unique 1199 frescoes, which were among the most complete ensembles of pre-Mongol monumental painting in Russia. During World War II, the church was destroyed and the frescoes heavily damaged. In the 1950s–1960s, the church was restored and surviving fresco fragments were preserved. The church is a UNESCO World Heritage site.",
      workingHours: "Wed–Sun: 10:00–17:00, Mon–Tue: closed",
      transport:
        "Veliky Novgorod, 2 km southeast of the Kremlin (bus No. 110 from the Kremlin)",
      ticketPrices: "Adult — 200₽",
      citySlug: "veliky-novgorod",
    },
    {
      id: "ishimbay-trinity",
      name: "Holy Trinity Church",
      slug: "ishimbay-trinity-church",
      description: "The main Orthodox church of Ishimbay",
      longDescription:
        "The Holy Trinity Church is the main Orthodox church of Ishimbay, built in 2002–2007. It is a beautiful brick building in the Russo-Byzantine style with golden domes. The church houses venerated icons and relics. A Sunday school for children and an Orthodox literature library operate at the church. The church plays an important role in the spiritual life of the city and surrounding districts of Bashkortostan.",
      workingHours: "Daily: 7:00–19:00",
      transport: "Ishimbay, Gagarina St., 50",
      ticketPrices: "Free entry",
      citySlug: "ishimbay",
    },
    {
      id: "ishimbay-varvara",
      name: "Holy Spring of Varvara Skvorchikhinskaya",
      slug: "varvara-spring-ishimbay",
      description:
        "The site of the spiritual feat of locally venerated saint Varvara Skvorchikhinskaya",
      longDescription:
        "The holy spring and site of the spiritual labors of blessed Varvara Skvorchikhinskaya (1890–1972) is one of the main shrines of Ishimbay and the entire Bashkortostan Metropolis. Varvara Skvorchikhinskaya, a locally venerated saint, led an ascetic life in the outskirts of Ishimbay, helping people through prayer and counsel during the years of persecution of the church. A bathing pool has been built at the spring, and a chapel has been constructed. Pilgrims come from all over Russia and abroad.",
      workingHours: "Daily: 24 hours",
      transport: "Ishimbay, city outskirts (inquire at Holy Trinity Church)",
      ticketPrices: "Free",
      citySlug: "ishimbay",
    },
  ],
  fr: [
    {
      id: "moscow-christ-saviour",
      name: "Cathédrale du Christ-Sauveur",
      slug: "christ-saviour-cathedral",
      description: "La cathédrale principale de l'Église orthodoxe russe",
      longDescription:
        "La Cathédrale du Christ-Sauveur est la cathédrale principale de l'Église orthodoxe russe, située au centre de Moscou rue Volkhonka. Construite en mémoire de la victoire dans la guerre patriotique de 1812. Conçue par l'architecte Konstantin Ton au XIXe siècle, elle fut détruite en 1931 et reconstruite dans les années 1990. Avec ses 103 mètres de haut, c'est l'une des plus hautes églises orthodoxes du monde. La cathédrale abrite des reliques vénérées : un fragment de la Robe du Seigneur, le Clou de la Sainte Croix et des reliques de saints.",
      workingHours: "Tous les jours : 8h00–20h00",
      transport: "Station de métro Kropotkinskaya, rue Volkhonka, 15",
      ticketPrices: "Entrée libre, visites guidées à partir de 400₽",
      citySlug: "moscow",
    },
    {
      id: "moscow-novodevichy",
      name: "Couvent de Novodievitchi",
      slug: "novodevichy-convent",
      description: "Un couvent, site du patrimoine mondial de l'UNESCO",
      longDescription:
        "Le Couvent de la Mère de Dieu de Smolensk à Novodievitchi est l'un des plus beaux ensembles monastiques de Moscou, fondé en 1524 par le Grand Prince Vassili III. Le couvent est un site du patrimoine mondial de l'UNESCO. La cathédrale principale est la Cathédrale de Smolensk, avec des fresques uniques du XVIe siècle. De nombreuses personnalités russes sont enterrées sur le terrain.",
      workingHours: "Tous les jours : 7h00–19h00",
      transport: "Station de métro Sportivnaya, rue Bolchaïa Pirogovskaïa, 2",
      ticketPrices: "Entrée libre",
      citySlug: "moscow",
    },
    {
      id: "moscow-dormition-cathedral",
      name: "Cathédrale de la Dormition du Kremlin de Moscou",
      slug: "dormition-cathedral-kremlin",
      description: "L'église principale de l'État moscovite",
      longDescription:
        "La Cathédrale de la Dormition du Kremlin de Moscou est l'une des principales églises orthodoxes de Russie, construite en 1475–1479 sous la direction de l'architecte italien Aristote Fioravanti. Pendant des siècles, elle fut la cathédrale principale de l'État russe : les tsars y étaient couronnés, les empereurs y étaient oints, et les décrets d'État y étaient proclamés.",
      workingHours: "Jeu–Dim : 10h00–17h00, billetterie jusqu'à 16h00",
      transport:
        "Station de métro Alexandrovsky Sad, Kremlin, Place des Cathédrales",
      ticketPrices: "Adulte — 500₽, Tarif réduit — 250₽",
      citySlug: "moscow",
    },
    {
      id: "moscow-danilov",
      name: "Monastère Danilov",
      slug: "danilov-monastery",
      description:
        "Le plus ancien monastère de Moscou, résidence du Patriarche",
      longDescription:
        "Le Monastère Saint-Daniel est le plus ancien monastère de Moscou, fondé en 1282 par le Prince Daniel de Moscou, fils d'Alexandre Nevski. Aujourd'hui, il sert de résidence à Sa Sainteté le Patriarche de Moscou et de toute la Russie et abrite le Département des relations ecclésiastiques extérieures.",
      workingHours: "Tous les jours : 6h30–20h00",
      transport: "Station de métro Tulskaïa, Danilovsky Val, 22",
      ticketPrices: "Entrée libre",
      citySlug: "moscow",
    },
    {
      id: "sergiyev-lavra",
      name: "Laure de la Trinité-Saint-Serge",
      slug: "trinity-lavra",
      description:
        "Le plus grand monastère masculin de Russie, centre spirituel de l'orthodoxie",
      longDescription:
        "La Laure de la Trinité-Saint-Serge est le plus grand monastère masculin stauropégique de l'Église orthodoxe russe, fondé en 1337 par saint Serge de Radonège. La Laure est un site du patrimoine mondial de l'UNESCO. La Cathédrale de la Trinité abrite les reliques de saint Serge de Radonège — l'un des sanctuaires les plus vénérés de Russie.",
      workingHours: "Tous les jours : 5h00–21h00",
      transport:
        "Serguiev Possad, Laure de la Trinité-Saint-Serge (train depuis la gare Iaroslavski jusqu'à la gare de Serguiev Possad)",
      ticketPrices: "Entrée libre",
      citySlug: "sergiyev-posad",
    },
    {
      id: "sergiyev-dormition",
      name: "Cathédrale de la Dormition de la Laure de la Trinité",
      slug: "lavra-dormition-cathedral",
      description: "Une cathédrale majestueuse sur le terrain de la Laure",
      longDescription:
        "La Cathédrale de la Dormition de la Laure de la Trinité-Saint-Serge est l'une des plus grandes églises orthodoxes de Russie, construite en 1559–1585 sur ordre du tsar Ivan le Terrible. La cathédrale mesure 69 mètres de haut. Son architecture mêle les traditions de Moscou et de Vladimir.",
      workingHours: "Tous les jours : 8h00–18h00",
      transport: "Serguiev Possad, terrain de la Laure",
      ticketPrices: "Entrée libre",
      citySlug: "sergiyev-posad",
    },
    {
      id: "sergiyev-refectory",
      name: "Église Saint-Serge avec la Salle du Réfectoire",
      slug: "sergius-refectory-church",
      description: "Un monument unique de l'architecture russe du XVIIe siècle",
      longDescription:
        "L'Église Saint-Serge de Radonège avec la Salle du Réfectoire fut construite en 1686–1692 sur ordre des tsars Ivan et Pierre Alexeïevitch. C'est l'un des bâtiments les plus ornés de la Laure, décoré de riches sculptures en pierre blanche. La Salle du Réfectoire est l'une des plus grandes salles voûtées de son époque.",
      workingHours: "Tous les jours : 8h00–18h00",
      transport: "Serguiev Possad, terrain de la Laure",
      ticketPrices: "Entrée libre",
      citySlug: "sergiyev-posad",
    },
    {
      id: "sergiyev-chernigov",
      name: "Skite de Tchernigov",
      slug: "chernigov-skete",
      description: "Un skite isolé près de la Laure",
      longDescription:
        "Le Skite de Gethsémani-Tchernigov est situé à 3 km de la Laure de la Trinité-Saint-Serge, dans une zone forestière pittoresque. Fondé en 1844 comme lieu de prière solitaire pour les moines. En 1851, une église troglodytique de l'Archange Michel fut construite ici, et en 1889, la majestueuse Cathédrale de Tchernigov de style néo-byzantin.",
      workingHours: "Tous les jours : 7h00–19h00",
      transport:
        "Serguiev Possad, à 3 km de la Laure (bus n°38 depuis la gare)",
      ticketPrices: "Entrée libre",
      citySlug: "sergiyev-posad",
    },
    {
      id: "suzdal-kremlin",
      name: "Kremlin de Souzdal. Cathédrale de la Nativité",
      slug: "suzdal-kremlin",
      description: "La partie la plus ancienne de Souzdal, le cœur de la ville",
      longDescription:
        "Le Kremlin de Souzdal est la partie la plus ancienne de la ville, son noyau historique et spirituel. L'église principale du Kremlin est la Cathédrale de la Nativité, construite en 1222–1225. C'est l'un des rares monuments d'architecture en pierre blanche de l'époque pré-mongole. La cathédrale est célèbre pour ses 'Portes d'Or'.",
      workingHours: "Tous les jours : 9h00–18h00, Lun : fermé",
      transport: "Souzdal, rue Kremliovskaïa, 20",
      ticketPrices: "Adulte — 400₽, Tarif réduit — 200₽",
      citySlug: "suzdal",
    },
    {
      id: "suzdal-spaso-evtimiev",
      name: "Monastère Saint-Euthyme",
      slug: "spaso-evtimiev-monastery",
      description: "Un monastère masculin, site UNESCO",
      longDescription:
        "Le Monastère Saint-Euthyme fut fondé en 1352 par le prince Boris Konstantinovitch de Souzdal-Nijni Novgorod comme forteresse pour protéger la ville. Le monastère est un site du patrimoine mondial de l'UNESCO. La cathédrale principale est la Cathédrale de la Transfiguration, construite au XVIe siècle, avec des fresques des célèbres iconographes Gouri Nikitine et Sila Savine.",
      workingHours: "Tous les jours : 9h00–18h00, billetterie jusqu'à 17h00",
      transport: "Souzdal, rue Kremliovskaïa (rive gauche de la Kamenka)",
      ticketPrices: "Adulte — 450₽, Tarif réduit — 200₽",
      citySlug: "suzdal",
    },
    {
      id: "suzdal-pokrovsky",
      name: "Couvent de l'Intercession",
      slug: "pokrovsky-convent",
      description: "Un couvent, lieu d'exil pour les femmes nobles",
      longDescription:
        "Le Couvent de l'Intercession fut fondé en 1364 sous le prince Dmitri Konstantinovitch. Aux XVIe–XVIIe siècles, il servit de lieu de tonsure et d'exil pour les femmes nobles : la tsarine Salomonia Sabourova (première épouse de Vassili III), la tsarevna Evdokia Lopoukhina (première épouse de Pierre Ier).",
      workingHours: "Tous les jours : 8h00–19h00",
      transport: "Souzdal, rue Pokrovskaïa, 76",
      ticketPrices: "Entrée libre",
      citySlug: "suzdal",
    },
    {
      id: "suzdal-wooden-architecture",
      name: "Musée d'architecture en bois",
      slug: "wooden-architecture-museum",
      description:
        "Une collection de monuments d'architecture en bois en plein air",
      longDescription:
        "Le Musée d'architecture en bois et de la vie paysanne est situé sur la rive de la rivière Kamenka, près du Kremlin de Souzdal. Le musée présente des monuments uniques d'architecture en bois des XVIIe–XIXe siècles de différentes régions de Vladimir : églises en bois, maisons paysannes, granges, bains et moulins à vent.",
      workingHours: "Tous les jours : 9h00–19h00, Lun : 9h00–15h00",
      transport: "Souzdal, rue Kremliovskaïa, 2",
      ticketPrices: "Adulte — 350₽, Tarif réduit — 150₽",
      citySlug: "suzdal",
    },
    {
      id: "pskov-trinity-cathedral",
      name: "Cathédrale de la Sainte-Trinité",
      slug: "pskov-trinity-cathedral",
      description: "L'église principale du Krom de Pskov",
      longDescription:
        "La Cathédrale de la Sainte-Trinité est l'église principale de Pskov, située sur le terrain du Krom de Pskov (Kremlin). La cathédrale actuelle fut construite en 1682–1699 sur le site d'églises plus anciennes. La première cathédrale sur ce site fut fondée au Xe siècle sur ordre de la princesse Olga.",
      workingHours: "Tous les jours : 7h30–20h00",
      transport: "Pskov, Krom de Pskov, rue Krom",
      ticketPrices: "Entrée libre",
      citySlug: "pskov",
    },
    {
      id: "pskov-mirozhsky",
      name: "Monastère de la Transfiguration de Miroj",
      slug: "mirozhsky-monastery",
      description: "Un ancien monastère aux fresques uniques du XIIe siècle",
      longDescription:
        "Le Monastère de la Transfiguration de Miroj fut fondé au XIIe siècle sous l'archevêque Nifont. Le sanctuaire principal est la Cathédrale de la Transfiguration, construite en 1130–1140. C'est l'une des rares églises qui préserve entièrement des fresques pré-mongoles (vers 1140) — un monument unique de la peinture monumentale byzantine et russe ancienne.",
      workingHours: "Mer–Dim : 10h00–17h00, Lun–Mar : fermé",
      transport: "Pskov, Quai de Miroj, 2",
      ticketPrices:
        "Adulte — 300₽, Tarif réduit — 150₽, entrée du terrain gratuite",
      citySlug: "pskov",
    },
    {
      id: "pskov-caves",
      name: "Monastère des Grottes de Pskov",
      slug: "pskov-caves-monastery",
      description:
        "L'un des plus anciens monastères de Russie avec des églises troglodytiques",
      longDescription:
        "Le Monastère des Grottes de Pskov (Monastère de la Dormition) est l'un des plus anciens et des plus grands monastères masculins de Russie, fondé en 1473 dans des grottes près du ruisseau Kamenets. Le monastère n'a jamais fermé, même pendant l'ère soviétique.",
      workingHours: "Tous les jours : 6h00–21h00",
      transport:
        "Petchory, rue Mejdounarodnaïa, 5 (bus depuis Pskov, 50 km à l'ouest)",
      ticketPrices: "Entrée libre",
      citySlug: "pskov",
    },
    {
      id: "novgorod-sophia",
      name: "Cathédrale Sainte-Sophie",
      slug: "novgorod-sophia-cathedral",
      description: "La plus ancienne église en pierre conservée de Russie",
      longDescription:
        "La Cathédrale Sainte-Sophie de Veliki Novgorod est la plus ancienne église orthodoxe en pierre conservée de Russie, construite en 1045–1050 sur ordre du prince Vladimir Iaroslavitch, fils de Iaroslav le Sage. La cathédrale est un site du patrimoine mondial de l'UNESCO.",
      workingHours: "Tous les jours : 8h00–20h00",
      transport: "Veliki Novgorod, Kremlin, 11",
      ticketPrices: "Entrée libre",
      citySlug: "veliky-novgorod",
    },
    {
      id: "novgorod-yuriev",
      name: "Monastère Saint-Georges",
      slug: "yuriev-monastery",
      description: "Le plus ancien monastère de Veliki Novgorod",
      longDescription:
        "Le Monastère Saint-Georges (Iouriev) fut fondé en 1030 par le prince Iaroslav le Sage. C'est l'un des plus anciens monastères de Russie. L'église principale est la Cathédrale Saint-Georges, construite en 1119–1130 sur ordre du prince Vsevolod Mstislavitch.",
      workingHours: "Tous les jours : 8h00–19h00",
      transport:
        "Veliki Novgorod, autoroute Iourievskoïe (bus n°7 depuis le Kremlin)",
      ticketPrices: "Entrée libre",
      citySlug: "veliky-novgorod",
    },
    {
      id: "novgorod-nereditsa",
      name: "Église du Sauveur-sur-Néréditsa",
      slug: "nereditsa-church",
      description: "Une célèbre église aux fresques du XIIe siècle",
      longDescription:
        "L'Église de la Transfiguration du Sauveur-sur-Néréditsa (Spas-Néréditsa) fut construite en 1198 par le prince Iaroslav Vladimirovitch. L'église est célèbre pour ses fresques uniques de 1199, qui étaient parmi les ensembles les plus complets de peinture monumentale pré-mongole en Russie.",
      workingHours: "Mer–Dim : 10h00–17h00, Lun–Mar : fermé",
      transport:
        "Veliki Novgorod, à 2 km au sud-est du Kremlin (bus n°110 depuis le Kremlin)",
      ticketPrices: "Adulte — 200₽",
      citySlug: "veliky-novgorod",
    },
    {
      id: "ishimbay-trinity",
      name: "Église de la Sainte-Trinité",
      slug: "ishimbay-trinity-church",
      description: "L'église orthodoxe principale d'Ichimbaï",
      longDescription:
        "L'Église de la Sainte-Trinité est l'église orthodoxe principale d'Ichimbaï, construite en 2002–2007. C'est un magnifique bâtiment en brique de style russo-byzantin avec des dômes dorés. L'église abrite des icônes et des reliques vénérées.",
      workingHours: "Tous les jours : 7h00–19h00",
      transport: "Ichimbaï, rue Gagarina, 50",
      ticketPrices: "Entrée libre",
      citySlug: "ishimbay",
    },
    {
      id: "ishimbay-varvara",
      name: "Source Sainte de Varvara Skvortchikhinskaïa",
      slug: "varvara-spring-ishimbay",
      description:
        "Le lieu de l'exploit spirituel de la sainte localement vénérée Varvara Skvortchikhinskaïa",
      longDescription:
        "La source sacrée et le lieu des labeurs spirituels de la bienheureuse Varvara Skvortchikhinskaïa (1890–1972) est l'un des principaux sanctuaires d'Ichimbaï et de toute la métropole de Bachkirie. Varvara Skvortchikhinskaïa, sainte localement vénérée, mena une vie ascétique dans les environs d'Ichimbaï.",
      workingHours: "Tous les jours : 24h/24",
      transport:
        "Ichimbaï, environs de la ville (se renseigner à l'Église de la Sainte-Trinité)",
      ticketPrices: "Gratuit",
      citySlug: "ishimbay",
    },
  ],
};
