export interface Country {
  name: string
  topLevelDomain: string[]
  alpha2Code: string
  alpha3Code: string
  callingCodes: string[]
  capital?: string
  altSpellings?: string[]
  subregion: string
  region: Region
  population: number
  latlng?: number[]
  demonym: string
  area?: number
  timezones: string[]
  borders?: string[]
  nativeName: string
  numericCode: string
  flags: Flags
  currencies?: Currency[]
  languages: Language[]
  translations: Translations
  flag: string
  regionalBlocs?: RegionalBloc[]
  cioc?: string
  independent: boolean
  gini?: number
}

export interface Currency {
  code: string
  name: string
  symbol: string
}

export interface Flags {
  svg: string
  png: string
}

export interface Language {
  iso639_1?: string
  iso639_2: string
  name: string
  nativeName?: string
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  AntarcticOcean = "Antarctic Ocean",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
  Polar = "Polar",
}

export interface RegionalBloc {
  acronym: Acronym
  name: Name
  otherNames?: OtherName[]
  otherAcronyms?: OtherAcronym[]
}

export enum Acronym {
  Al = "AL",
  Asean = "ASEAN",
  Au = "AU",
  Cais = "CAIS",
  Caricom = "CARICOM",
  Cefta = "CEFTA",
  Eeu = "EEU",
  Efta = "EFTA",
  Eu = "EU",
  Nafta = "NAFTA",
  Pa = "PA",
  Saarc = "SAARC",
  Usan = "USAN",
}

export enum Name {
  AfricanUnion = "African Union",
  ArabLeague = "Arab League",
  AssociationOfSoutheastAsianNations = "Association of Southeast Asian Nations",
  CaribbeanCommunity = "Caribbean Community",
  CentralAmericanIntegrationSystem = "Central American Integration System",
  CentralEuropeanFreeTradeAgreement = "Central European Free Trade Agreement",
  EurasianEconomicUnion = "Eurasian Economic Union",
  EuropeanFreeTradeAssociation = "European Free Trade Association",
  EuropeanUnion = "European Union",
  NorthAmericanFreeTradeAgreement = "North American Free Trade Agreement",
  PacificAlliance = "Pacific Alliance",
  SouthAsianAssociationForRegionalCooperation = "South Asian Association for Regional Cooperation",
  UnionOfSouthAmericanNations = "Union of South American Nations",
}

export enum OtherAcronym {
  Eaeu = "EAEU",
  Sica = "SICA",
  Unasul = "UNASUL",
  Unasur = "UNASUR",
  Uzan = "UZAN",
}

export enum OtherName {
  AccordDeLibreÉchangeNordAméricain = "Accord de Libre-échange Nord-Américain",
  AlianzaDelPacífico = "Alianza del Pacífico",
  CaribischeGemeenschap = "Caribische Gemeenschap",
  CommunautéCaribéenne = "Communauté Caribéenne",
  ComunidadDelCaribe = "Comunidad del Caribe",
  JāmiAtAdDuwalAlArabīyah = "Jāmiʻat ad-Duwal al-ʻArabīyah",
  LeagueOfArabStates = "League of Arab States",
  SistemaDeLaIntegraciónCentroamericana = "Sistema de la Integración Centroamericana,",
  SouthAmericanUnion = "South American Union",
  TratadoDeLibreComercioDeAméricaDelNorte = "Tratado de Libre Comercio de América del Norte",
  UmojaWaAfrika = "Umoja wa Afrika",
  UnieVanZuidAmerikaanseNaties = "Unie van Zuid-Amerikaanse Naties",
  UnionAfricaine = "Union africaine",
  UniãoAfricana = "União Africana",
  UniãoDeNaçõesSulAmericanas = "União de Nações Sul-Americanas",
  UniónAfricana = "Unión Africana",
  UniónDeNacionesSuramericanas = "Unión de Naciones Suramericanas",
  الاتحادالأفريقي = "الاتحاد الأفريقي",
  جامعةالدولالعربية = "جامعة الدول العربية",
}

export interface Translations {
  br: string
  pt: string
  nl: string
  hr: string
  fa?: string
  de: string
  es: string
  fr: string
  ja: string
  it: string
  hu: string
}
