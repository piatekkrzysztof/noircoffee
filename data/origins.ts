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
    title: 'Kolebka kawy',
    lead: 'Tu zaczęła się historia kawy. Dzikie odmiany heirloom wciąż rosną w cieniu lasów pierwotnych.',
    altitude: '1900–2200 m',
    processing: 'Washed',
    imageUrl: '/images/ethiopia.jpg',
    notes: ['jaśmin', 'bergamotka', 'biała herbata'],
    body: [
      '<strong>Yirgacheffe</strong> to święta ziemia każdego coffee geeka. Na wysokości 1900–2200 m n.p.m., w cieniu lasów pierwotnych, dojrzewają ziarna o profilu, który zmienił świat.',
      '<em>Heirloom varieties</em> rosną tu od tysiącleci, dzikie i nieposkromione. Lokalni farmerzy zbierają owoce ręcznie, z drzew, które pamiętają początki historii kawy.',
      'Proces washed podkreśla czystość terroir: bergamotka, jaśmin, biała herbata. To profil floralny, który definiuje region.',
    ],
  },
  {
    slug: 'kolumbia',
    order: 2,
    country: 'Kolumbia',
    region: 'Huila',
    title: 'Kraina mikroklimatów',
    lead: 'Jedna dolina, tysiące parceli i za każdym razem inny smak w filiżance.',
    altitude: '1500–2000 m',
    processing: 'Natural / Honey',
    imageUrl: '/images/colombia.jpg',
    notes: ['ananas', 'passion fruit', 'ciemna śliwka'],
    body: [
      'Dolina rzeki Magdalena kryje tysiące <strong>małych ferm</strong>, gdzie każda rodzina uprawia swoją własną historię.',
      'Bogactwo odmian (Bourbon, Caturra, Colombia) tworzy nieporównywalną różnorodność profili smakowych. Każda parcela smakuje inaczej, nawet w tym samym roku.',
      '<em>Proceso natural</em> i <em>honey</em> eksponują owocową złożoność: ananas, passion fruit, ciemna śliwka. Kwasowość malinowa, body jak aksamit.',
    ],
  },
  {
    slug: 'gwatemala',
    order: 3,
    country: 'Gwatemala',
    region: 'Huehuetenango',
    title: 'Zimny wiatr z Meksyku',
    lead: 'Kawa, która smakuje jak czerwone wino i zostaje w pamięci długo po ostatnim łyku.',
    altitude: '1800–2100 m',
    processing: 'Anaerobic',
    imageUrl: '/images/guatemala.jpg',
    notes: ['czerwone winogrono', 'śliwka w czekoladzie', 'kakao'],
    body: [
      'Zimny wiatr wiejący z meksykańskich terenów chroni plantacje przed przymrozkami na wyjątkowych 2000 m n.p.m.',
      'Ten mikroklimat tworzy kawę jak wino: owocową, złożoną, zapamiętywaną na długo po ostatnim łyku.',
      'Fermentacja beztlenowa wyciąga z owocu wszystko, co najlepsze: czerwone winogrona, śliwka w czekoladzie, nuty fermentacyjne, które nie są błędem. Są zamierzoną głębią.',
    ],
  },
  {
    slug: 'rwanda',
    order: 4,
    country: 'Rwanda',
    region: 'Nyamasheke',
    title: 'Kraj tysiąca wzgórz',
    lead: 'Tysiąc wzgórz, setki drobnych farmerów i jedna z najczystszych filiżanek Afryki.',
    altitude: '1700–2000 m',
    processing: 'Washed',
    imageUrl: '/images/rwanda.jpg',
    notes: ['czerwona porzeczka', 'hibiskus', 'rumianek'],
    body: [
      'Rwanda to opowieść o odbudowie. Po traumie lat 90. przemysł kawowy stał się symbolem <strong>odrodzenia</strong> i jakości.',
      'Spółdzielnie takie jak Nyamasheke łączą setki drobnych farmerów, którzy razem dbają o każdy etap obróbki. Dominuje odmiana Bourbon.',
      'Proces washed podkreśla czystość i elegancję: czerwona porzeczka, hibiskus, herbata rumiankowa. <em>Herbaciana</em> delikatność, która zapada w pamięć.',
    ],
  },
]
