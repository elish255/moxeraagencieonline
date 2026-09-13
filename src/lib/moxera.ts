export const ACTIVATION_FEE = 16000;

export type MoxeraUser = {
  username: string;
  fullName?: string;
  phone?: string;
  country?: string;
};

export type Foreigner = {
  id: string;
  name: string;
  country: string;
  age: number;
  flag: string;
  platform: string;
  online: boolean;
  rate: number;
  avatar: string;
  bio: string;
  opener: string[];
  replies: string[];
};

const foreigners: Foreigner[] = [
  { id: "emma", name: "Emma", country: "United Kingdom", age: 26, flag: "🇬🇧", platform: "Language", online: true, rate: 5000, avatar: "https://i.pravatar.cc/512?img=47", bio: "Nataka kujifunza Kiswahili kupitia mazungumzo ya kawaida.", opener: ["Hi! Naitwa Emma, nifundishe Kiswahili 😊"], replies: ["Asante! Nimejifunza kitu kipya leo 😊", "Hilo neno la Kiswahili ni zuri sana!"] },
  { id: "oliver", name: "Oliver", country: "Australia", age: 29, flag: "🇦🇺", platform: "Language", online: true, rate: 6000, avatar: "https://i.pravatar.cc/512?img=12", bio: "Ninapenda Tanzania na nataka kuzoea Kiswahili cha kila siku.", opener: ["Hello! Naomba unifundishe salamu za Kiswahili."], replies: ["Aah, nimeelewa. Asante!", "Nitajaribu kulitumia leo."] },
  { id: "sophia", name: "Sophia", country: "Canada", age: 24, flag: "🇨🇦", platform: "Language", online: true, rate: 4500, avatar: "https://i.pravatar.cc/512?img=32", bio: "Ninajifunza Kiswahili kabla ya safari yangu ya Afrika Mashariki.", opener: ["Habari! Niko Canada, unaweza kunifundisha Kiswahili?"], replies: ["Perfect, asante kwa kunisaidia!", "Sasa naweza kusema hilo vizuri 😊"] },
  { id: "lucas", name: "Lucas", country: "Germany", age: 31, flag: "🇩🇪", platform: "Language", online: false, rate: 5500, avatar: "https://i.pravatar.cc/512?img=11", bio: "Ninapenda lugha na nataka kujifunza maneno ya Kiswahili kwa mazoezi.", opener: ["Jambo! Nisaidie kujifunza Kiswahili kidogo."], replies: ["Hiyo ni rahisi kukumbuka, asante!", "Tutazungumza tena hivi karibuni."] },
  { id: "mia", name: "Mia", country: "United States", age: 27, flag: "🇺🇸", platform: "Language", online: true, rate: 7000, avatar: "https://i.pravatar.cc/512?img=44", bio: "Ninajiandaa kutembelea Zanzibar na nataka kujua Kiswahili cha msingi.", opener: ["Hey! Nifundishe sentensi moja ya Kiswahili 😊"], replies: ["Wow, hilo ni zuri!", "Asante sana kwa somo hilo."] },
  { id: "daniel", name: "Daniel", country: "Netherlands", age: 30, flag: "🇳🇱", platform: "Language", online: true, rate: 5000, avatar: "https://i.pravatar.cc/512?img=13", bio: "Nataka kufanya mazoezi ya Kiswahili kabla ya kuja Afrika.", opener: ["Habari rafiki! Unaweza kunifundisha neno jipya?"], replies: ["Nimeandika hilo ili nisahau. Asante!", "Kiswahili kinafurahisha kujifunza."] },
];

export function pickForeigners(count = 4): Foreigner[] {
  const pool = [...foreigners];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

export function getForeigner(id: string) {
  return foreigners.find((f) => f.id === id);
}

export function loadUser(): MoxeraUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("moxera_user") ?? localStorage.getItem("moxera_signup");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<MoxeraUser>;
    if (!parsed.username) return null;
    return { username: parsed.username, fullName: parsed.fullName, phone: parsed.phone, country: parsed.country };
  } catch {
    return null;
  }
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("moxera_user");
  localStorage.removeItem("moxera_signup");
}
