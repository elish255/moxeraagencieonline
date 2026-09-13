export type MoxeraUser = {
  fullName: string;
  username: string;
  phone: string;
  country: string;
};

export type Foreigner = {
  id: string;
  name: string;
  age: number;
  country: string;
  flag: string;
  platform: string;
  online: boolean;
  rate: number;
  avatar: string;
  bio: string;
  opener: string[];
  replies: string[];
};

export const ACTIVATION_FEE = 16_000;

const FOREIGNERS: Foreigner[] = [
  {
    id: "emma-uk",
    name: "Emma",
    age: 27,
    country: "United Kingdom",
    flag: "🇬🇧",
    platform: "Chat",
    online: true,
    rate: 2500,
    avatar: "https://i.pravatar.cc/512?img=47",
    bio: "Ninajifunza Kiswahili na napenda mazungumzo ya kawaida.",
    opener: ["Naitwa Emma, nifundishe Kiswahili 😊"],
    replies: ["Asante! Nimejifunza neno jipya leo 😊", "Hilo neno linatumikaje kwenye sentensi?"],
  },
  {
    id: "oliver-canada",
    name: "Oliver",
    age: 31,
    country: "Canada",
    flag: "🇨🇦",
    platform: "Chat",
    online: true,
    rate: 3000,
    avatar: "https://i.pravatar.cc/512?img=12",
    bio: "Nataka kujua zaidi kuhusu Tanzania na Kiswahili.",
    opener: ["Habari! Mimi ni Oliver kutoka Canada. Unaweza kunifundisha Kiswahili?"],
    replies: ["Hiyo ni nzuri sana. Naweza kujaribu kusema hivyo?", "Asante kwa kunisaidia, rafiki!"],
  },
  {
    id: "sophie-france",
    name: "Sophie",
    age: 25,
    country: "France",
    flag: "🇫🇷",
    platform: "Chat",
    online: true,
    rate: 2800,
    avatar: "https://i.pravatar.cc/512?img=32",
    bio: "Ninapenda lugha, safari na kujifunza maneno mapya.",
    opener: ["Mambo! Nataka kujifunza Kiswahili cha mazungumzo ya kila siku."],
    replies: ["Nimeipenda hiyo! Unasemaje 'good morning' kwa Kiswahili?", "Pole kama nimekosea, naendelea kujifunza 😊"],
  },
  {
    id: "liam-australia",
    name: "Liam",
    age: 29,
    country: "Australia",
    flag: "🇦🇺",
    platform: "Chat",
    online: false,
    rate: 3200,
    avatar: "https://i.pravatar.cc/512?img=11",
    bio: "Ninajifunza Kiswahili kwa ajili ya safari yangu ya Afrika.",
    opener: ["Habari! Nitasafiri Afrika Mashariki. Nisaidie na Kiswahili kidogo?"],
    replies: ["Asante sana! Hilo litakuwa muhimu kwenye safari yangu.", "Sawa, nitalikariri hilo neno 😊"],
  },
  {
    id: "mia-usa",
    name: "Mia",
    age: 24,
    country: "United States",
    flag: "🇺🇸",
    platform: "Chat",
    online: true,
    rate: 2700,
    avatar: "https://i.pravatar.cc/512?img=44",
    bio: "Ninapenda kujifunza lugha na kuzungumza na watu wa tamaduni tofauti.",
    opener: ["Hi! Nataka kujifunza misemo rahisi ya Kiswahili 😊"],
    replies: ["Wow, hiyo ni rahisi kukumbuka!", "Asante kwa kunifundisha, nimefurahi sana."],
  },
  {
    id: "noah-germany",
    name: "Noah",
    age: 30,
    country: "Germany",
    flag: "🇩🇪",
    platform: "Chat",
    online: true,
    rate: 2900,
    avatar: "https://i.pravatar.cc/512?img=13",
    bio: "Nataka kuzoea Kiswahili kabla ya kutembelea Afrika Mashariki.",
    opener: ["Habari! Ni salamu gani maarufu zaidi Tanzania?"],
    replies: ["Aah, nimeelewa sasa. Asante!", "Nitaitumia mara nitakapofika Tanzania."],
  },
];

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export function pickForeigners(count = 4): Foreigner[] {
  return shuffle(FOREIGNERS).slice(0, Math.max(0, count));
}

export function getForeigner(id: string): Foreigner | null {
  return FOREIGNERS.find((foreigner) => foreigner.id === id) ?? null;
}

export function loadUser(): MoxeraUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("moxera_signup");
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const value = parsed as Partial<MoxeraUser>;
    if (
      typeof value.fullName !== "string" ||
      typeof value.username !== "string" ||
      typeof value.phone !== "string" ||
      typeof value.country !== "string"
    ) {
      return null;
    }
    return {
      fullName: value.fullName,
      username: value.username,
      phone: value.phone,
      country: value.country,
    };
  } catch {
    return null;
  }
}

export function clearUser(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("moxera_signup");
}
