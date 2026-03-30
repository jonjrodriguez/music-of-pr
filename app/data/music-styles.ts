export type MusicStyleSlug = "bomba" | "plena" | "reggaeton" | "salsa";

type ThemeColors = {
  background: string;
  accent: string;
  foreground: string;
};

export type MusicStyle = {
  slug: MusicStyleSlug;
  title: string;
  shortLabel: string;
  summary: string;
  description: string;
  posterSrc: string;
  videoSrc: string;
  themeColors: ThemeColors;
};

export const musicStyles: MusicStyle[] = [
  {
    slug: "bomba",
    title: "Bomba",
    shortLabel: "Roots",
    summary:
      "A call-and-response tradition where the dancer leads and the drummer answers in real time.",
    description:
      "Bomba is one of Puerto Rico's oldest musical expressions, shaped by Afro-Puerto Rican communities who turned rhythm, movement, and improvisation into a living conversation. Barriles, maracas, and voice drive the form, but the dancer's body is what cues the lead drum.",
    posterSrc: "/posters/bomba.png",
    videoSrc: "/videos/bomba.mp4",
    themeColors: {
      background: "#471B0F",
      accent: "#A64721",
      foreground: "#F8EBDD",
    },
  },
  {
    slug: "plena",
    title: "Plena",
    shortLabel: "Story",
    summary:
      "A vibrant street music known for carrying news, gossip, and everyday life through rhythm.",
    description:
      "Plena emerged from working-class neighborhoods and became known as el periodico cantado, the sung newspaper. Panderetas and chorus lines create an immediate, communal feel that makes the style both social and sharply observant.",
    posterSrc: "/posters/plena.png",
    videoSrc: "/videos/plena.mp4",
    themeColors: {
      background: "#3B2336",
      accent: "#9C4B76",
      foreground: "#FAEAF2",
    },
  },
  {
    slug: "reggaeton",
    title: "Reggaeton",
    shortLabel: "Pulse",
    summary:
      "A global sound forged in Puerto Rico, built on dembow rhythms, texture, and swagger.",
    description:
      "Reggaeton connects underground mixtape culture, Caribbean rhythmic traditions, and modern pop scale. Its production language is direct and physical, but the genre also carries place, migration, nightlife, and the island's cultural reach into every beat.",
    posterSrc: "/posters/reggaeton.png",
    videoSrc: "/videos/reggaeton.mp4",
    themeColors: {
      background: "#152033",
      accent: "#1FA2A6",
      foreground: "#E8F8F8",
    },
  },
  {
    slug: "salsa",
    title: "Salsa",
    shortLabel: "Movement",
    summary:
      "A powerful dance-floor language of brass, piano, percussion, and relentless forward motion.",
    description:
      "Puerto Rican musicians helped shape salsa's sound and identity across New York, San Juan, and beyond. The style blends layered percussion with tightly arranged horns and storytelling vocals, making it both communal celebration and emotional release.",
    posterSrc: "/posters/salsa.png",
    videoSrc: "/videos/salsa.mp4",
    themeColors: {
      background: "#502312",
      accent: "#D36B1F",
      foreground: "#FFF1E1",
    },
  },
];
