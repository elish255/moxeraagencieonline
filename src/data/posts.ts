import logoBrown from "@/assets/moxera-logo-brown.jpg";
import logoOrange from "@/assets/moxera-logo-orange.jpg";
import pesa from "@/assets/pesa.jpg";
import cheti from "@/assets/cheti.jpg";

export const REGISTER_URL = "https://kozenasite.com/register?ref=JAMESS";
export const WHATSAPP_URL = "https://wa.me/255700000000";
export const SMS_URL = "sms:+255700000000";
export const JOIN_FEE_TZS = 16000;

export type Post = {
  slug: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "moxera-agencies-ni-nini",
    title: "Moxera Agencies Ni Nini??Na Inafanyeje Kazi,Utanufaika Vipi Bonyeza Hapa",
    author: "MOXERA AGENCIES",
    date: "September 09, 2026",
    image: logoBrown,
    excerpt:
      "BONYEZA HAPA KUJISAJILI MOXERA AGENCIES. SOMA SUMMARY HII HAPA CHINI ILI UWEZE KUJUA MOXERA AGENCIES NI NINI NA INAFANYEJE KAZI PIA ITAKUSAIDIA VIPI...",
    body: [
      "MOXERA AGENCIES ni platform ya kidijitali inayowasaidia Watanzania kuingiza kipato kwa kutumia simu yao ya mkononi, kwa mtaji mdogo na muda wako mwenyewe.",
      "Inafanyaje kazi? Unajisajili kwenye platform, unapata akaunti yako binafsi, kisha unaanza kufanya kazi rahisi za kila siku na kutangaza fursa kwa wengine. Kila kazi unayokamilisha inaongeza kipato kwenye akaunti yako.",
      "Utanufaika vipi? Unapata malipo yanayolipwa moja kwa moja kwenye simu yako, unapata mafunzo ya bure ya kufanya biashara mtandaoni, na unaingia kwenye jamii ya wanachama wanaosaidiana kukua.",
      "Usajili ni wa mara moja tu na akaunti yako inakuwa yako milele. Bonyeza kitufe cha JISAJILI HAPA ili kuanza leo.",
    ],
  },
  {
    slug: "usajili-ni-salama",
    title: "Usajili Wa Moxera Agencies Platform Ni Salama Na Uhakika.",
    author: "MOXERA AGENCIES",
    date: "September 09, 2026",
    image: cheti,
    excerpt:
      "Bonyeza Hapa Kujisajili Na Moxera Agencies. Platform ya Moxera Agencies imesajiliwa na Ni sehemu salama ya kujiingizia Kipato kwa Mtaji kidogo,U...",
    body: [
      "Platform ya MOXERA AGENCIES imesajiliwa kisheria na inafanya kazi kwa uwazi. Hii inakupa uhakika kwamba pesa zako na taarifa zako binafsi ziko salama.",
      "Usajili unafanyika kwa hatua rahisi: jaza jina lako, namba ya simu, na tengeneza neno la siri. Baada ya hapo unathibitisha akaunti na unaanza kazi mara moja.",
      "Hakuna malipo ya kificho. Kila kitu unacholipia kinaonekana kwenye akaunti yako na unaweza kuangalia historia ya malipo wakati wowote.",
      "Kama unahitaji msaada wa usajili, tuma ujumbe kwenye WhatsApp yetu na timu yetu itakusaidia hatua kwa hatua.",
    ],
  },
  {
    slug: "tunavyotoa-pesa",
    title: "Tizama Tunavyotoa Pesa Hapa Moxera Agencies",
    author: "MOXERA AGENCIES",
    date: "September 09, 2026",
    image: pesa,
    excerpt:
      "BONYEZA HAPA KUJISAJILI MOXERA AGENCIES. Bonyeza hii Video uone Tunavyotoa Pesa Hapa Moxera Agencies ?...",
    body: [
      "Malipo hapa MOXERA AGENCIES yanatolewa kwa njia ya simu: M-Pesa, Airtel Money, Mixx by Yas na Halopesa.",
      "Unaweza kutoa pesa yako mara tu unapofikisha kiwango cha chini cha kutoa. Maombi ya kutoa yanashughulikiwa kwa muda mfupi siku za kazi.",
      "Wanachama wengi wanaanza kwa kipato kidogo cha kila siku, na wanakua kadri wanavyojifunza namna ya kutangaza na kufanya kazi kwa uaminifu.",
      "Jiunge leo, fanya kazi kwa nidhamu, na uone matokeo kwenye akaunti yako.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
