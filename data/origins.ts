// data/origins.ts
// Origin stories. body holds trusted HTML paragraphs (strong/em only).

export interface Origin {
  slug: string
  order: number
  country: string
  region: string
  title: string
  lead: string
  altitude: string
  processing: string
  imageUrl: string
  notes: string[]
  body: string[]
}

export const ORIGINS: Origin[] = [
  {
    slug: 'etiopia',
    order: 1,
    country: 'Etiopia',
    region: 'Yirgacheffe',
    title: 'Tu kawa rośnie dziko',
    lead: 'W lasach Yirgacheffe kawowce rosną od zawsze, nikt ich nie sadził. Stąd pochodzi najbardziej kwiatowa kawa na naszym barze.',
    altitude: '1900–2200 m',
    processing: 'Washed',
    imageUrl: '/images/ethiopia.jpg',
    notes: ['jaśmin', 'bergamotka', 'biała herbata'],
    body: [
      '<strong>Yirgacheffe</strong> leży na wysokości 1900–2200 m. Kawowce rosną tu w cieniu starych drzew, często dziko, a farmerzy zbierają owoce ręcznie, dopiero gdy są ciemnoczerwone.',
      'Etiopskie odmiany nazywa się po prostu <em>heirloom</em>, czyli tradycyjne. Jest ich tysiące i nikt ich nie policzył. Dlatego kawy z dwóch sąsiednich wiosek potrafią smakować zupełnie inaczej.',
      'Ziarna myje się i suszy bez miąższu. Taka obróbka zostawia czysty smak: bergamotkę, jaśmin, białą herbatę. Pij ją z dripa i bez mleka, wtedy czuć wszystko.',
    ],
  },
  {
    slug: 'kolumbia',
    order: 2,
    country: 'Kolumbia',
    region: 'Huila',
    title: 'Tysiąc małych farm',
    lead: 'Dolina rzeki Magdalena to tysiące rodzinnych farm, a każda daje trochę inną kawę.',
    altitude: '1500–2000 m',
    processing: 'Natural / Honey',
    imageUrl: '/images/colombia.jpg',
    notes: ['ananas', 'marakuja', 'ciemna śliwka'],
    body: [
      'W Huili kawę uprawia się na stokach od 1500 do 2000 m. Większość farm ma dwa, trzy hektary i od pokoleń należy do <strong>jednej rodziny</strong>.',
      'Rosną tu odmiany Bourbon, Caturra i Colombia. Każda parcela ma inne słońce i inną glebę, więc dwa worki z sąsiednich farm smakują inaczej nawet w tym samym roku.',
      'Naszą kawę suszy się w całym owocu (<em>natural</em>). Cukry z miąższu przechodzą do ziarna, stąd smak ananasa, marakui i ciemnej śliwki.',
    ],
  },
  {
    slug: 'gwatemala',
    order: 3,
    country: 'Gwatemala',
    region: 'Huehuetenango',
    title: 'Ciepły wiatr z Meksyku',
    lead: 'Ciepły wiatr z Meksyku chroni tu plantacje przed mrozem, więc kawa dojrzewa wyżej niż gdziekolwiek indziej w Gwatemali.',
    altitude: '1800–2100 m',
    processing: 'Anaerobic',
    imageUrl: '/images/guatemala.jpg',
    notes: ['czerwone winogrono', 'śliwka w czekoladzie', 'kakao'],
    body: [
      'Huehuetenango to najwyżej położony region kawowy Gwatemali. Ciepły, suchy wiatr znad meksykańskiej równiny Tehuantepec chroni plantacje przed przymrozkami, więc kawa rośnie tu nawet na <strong>2000 m</strong>.',
      'Na tej wysokości owoce dojrzewają wolno i zbierają więcej cukru. Kawa jest gęstsza i słodsza niż z niższych upraw.',
      'Nasz worek przeszedł fermentację beztlenową: owoce leżą kilka dni w szczelnych zbiornikach. W filiżance czerwone winogrono, śliwka w czekoladzie i kakao. To nie wada, tak ma smakować.',
    ],
  },
  {
    slug: 'rwanda',
    order: 4,
    country: 'Rwanda',
    region: 'Nyamasheke',
    title: 'Kraj tysiąca wzgórz',
    lead: 'Setki drobnych farmerów, wspólna stacja obróbki nad jeziorem Kiwu i jedna z najczystszych kaw Afryki.',
    altitude: '1700–2000 m',
    processing: 'Washed',
    imageUrl: '/images/rwanda.jpg',
    notes: ['czerwona porzeczka', 'hibiskus', 'rumianek'],
    body: [
      'W Rwandzie kawę uprawiają głównie małe gospodarstwa, często po kilkaset krzewów. Po latach 90. to właśnie kawa stała się jednym z filarów <strong>odbudowy</strong> kraju.',
      'Farmerzy z okolic Nyamasheke oddają owoce do wspólnej stacji nad jeziorem Kiwu. Tam ziarna są myte, sortowane ręcznie i suszone na podwyższonych stołach.',
      'Wychodzi kawa czysta i soczysta: czerwona porzeczka, hibiskus, rumianek. <em>Herbaciana</em>, dobra na popołudnie z dripa albo Chemeksu.',
    ],
  },
]
