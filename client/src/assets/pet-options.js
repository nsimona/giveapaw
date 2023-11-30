export const petTypeOptions = [
  { title: "куче", value: "dog" },
  { title: "котка", value: "cat" },
  { title: "птица", value: "bird" },
  { title: "друго", value: "other" },
];

export const houseConditionsOptions = [
  { title: "с деца", value: "withKids" },
  { title: "с други домашни любимци", value: "withPets" },
  { title: "без други домашни любимци", value: "withoutPets" },
  { title: "с двор", value: "withYard" },
  { title: "в апартамент", value: "apartment" },
];

export const healthStateOptions = [
  {
    title: "всички ваксини препоръчани за съответната възраст",
    value: "allVaccines",
  },
  { title: "без вакисни", value: "noVaccines" },
  {
    title:
      "с 1 или повече операции (включително счупвания, наранявания от общ характер)",
    value: "multipleSurgeries",
  },
  { title: "в недобро здравословно състояние", value: "notWell" },
  { title: "в добро здравословно състояние", value: "well" },
  { title: "с изяснена болест, която изисква лечение", value: "illNotHealthy" },
  {
    title: "с изяснена болест, която не изисква лечение",
    value: "illButHealthy",
  },
  { title: "не се знае", value: "unknown" },
];

export const goodWithOptions = [
  {
    title: "деца",
    value: "kids",
  },
  { title: "други животни", value: "otherAnimals" },
  {
    title: "непознати",
    value: "strangers",
  },
  { title: "пътувания", value: "travelling" },
  { title: "активен начин на живот", value: "activeLifestyle" },
  {
    title: "тиха, спокойна обстановка",
    value: "quietEnvironment",
  },
  { title: "живот в апартамент", value: "apartmentLiving" },
];

export const characteristicsOptions = [
  { title: "дружелюбен", value: "friendly" },
  { title: "игрив", value: "playful" },
  { title: "нежен", value: "gentle" },
  { title: "енергичен", value: "energetic" },
  { title: "спокоен", value: "calm" },
  { title: "любопитен", value: "curious" },
  { title: "лоялен", value: "loyal" },
  { title: "социален", value: "social" },
  { title: "самостоятелен", value: "independent" },
  { title: "умен", value: "smart" },
  { title: "добре възпитан", value: "wellBehaved" },
  { title: "хигиеничен", value: "hygienic" },
  { title: "приучен към дома", value: "houseTrained" },
  { title: "послушен", value: "obedient" },
  { title: "тих", value: "quiet" },
  { title: "активен", value: "active" },
  { title: "лесен за грижа", value: "easyToGroom" },
  { title: "търпелив", value: "patient" },
  { title: "социализиран", value: "socialized" },
  { title: "защитнически настроен", value: "protective" },
  { title: "бързо се адаптира", value: "adaptable" },
];

export const basicBreedsOptions = [
  { value: "unknown", title: "не се знае" },
  { value: "mixed", title: "смесена" },
  { value: "other", title: "друго" },
];

export const petColorsOptions = [
  { value: "black", title: "черен" },
  { value: "white", title: "бял" },
  { value: "brown", title: "кафяв" },
  { value: "gray", title: "сив" },
  { value: "red", title: "рус" },
  { value: "orange", title: "оранжев" },
  { value: "cream", title: "кремав" },
  { value: "black_white", title: "черно-бял" },
  { value: "calico", title: "пъстър" },
  { value: "other", title: "друг" },
];

export const petAgeOptions = [
  { value: "unknown", title: "не се знае" },
  { value: 0, title: "0 години" },
  { value: 1, title: "1 година" },
  { value: 2, title: "2 години" },
  { value: 3, title: "3 години" },
  { value: 4, title: "4 години" },
  { value: 5, title: "5-10 години" },
  { value: 10, title: "10+ години" },
];

export const petGenderOptions = [
  { value: "unknown", title: "не се знае" },
  { value: "female", title: "женски" },
  { value: "male", title: "мъжки" },
];

export const petSizeOptions = [
  { value: "small", title: "малък" },
  { value: "medium", title: "среден" },
  { value: "big", title: "голям" },
];

export const petTrainedOptions = [
  { value: true, title: "да" },
  { value: false, title: "не" },
];

export const breedsOptions = {
  dog: [
    { value: "akita", title: "акита" },
    { value: "german", title: "немска овчарка" },
    { value: "labrador", title: "лабрадор" },
    { value: "bulldog", title: "булдог" },
    { value: "shpitz", title: "финландски шпиц" },
    { value: "husky", title: "хъски" },
    { value: "greatDane", title: "немски дог" },
    { value: "wolfdog", title: "чехословашки вълчак" },
    { value: "terrier", title: "Джак Ръсел териер" },
  ],
  cat: [
    { value: "per", title: "персийска" },
    { value: "eu", title: "европейска" },
    { value: "siam", title: "сиамска" },
    { value: "brit", title: "британска" },
    { value: "sphinx", title: "сфинкс" },
    { value: "aler", title: "алерка" },
    { value: "ben", title: "бенгалска" },
  ],
  bird: [
    { value: "can", title: "канарче" },
    { value: "amad", title: "амадин" },
    { value: "parr", title: "вълнист папагал" },
    { value: "corel", title: "корел" },
  ],
  other: [...basicBreedsOptions],
  all: [...basicBreedsOptions],
};
