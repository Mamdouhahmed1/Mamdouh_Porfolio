export type GalleryCategory =
  | "background"
  | "concept-art"
  | "character-design"
  | "personal-projects";

export type Artwork = {
  id: string;
  src: string;
  thumb: string;
  title: string;
  category: GalleryCategory;
};

export type ProjectChapter = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  thumb: string;
};

export const site = {
  name: "Mamdouh Ahmed",
  studio: "Mamdouh Studio",
  roles: [
    "Background Artist",
    "Concept Artist",
    "Character Designer",
    "Storyboard Artist",
  ],
  tagline: "I build immersive worlds and bring ideas to life through visual storytelling.",
  // NOTE: email/phone were OCR-recovered from a rasterized PDF and may need verification.
  // Override via environment variables without editing code.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "mamdouh24681@gmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+20 10 1442 2530",
  instagram: "https://instagram.com/mamdouh_studio",
  instagramHandle: "@mamdouh_studio",
  linkedin: "https://www.linkedin.com/in/mamdouh-ahmed-01667b409?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  facebook: "https://www.facebook.com/share/1DHBffAs3P/",
  upwork: "https://www.upwork.com/freelancers/~016719d5d3c301014f?mp_source=share",
};

export const hero = {
  eyebrow: "Portfolio · 2026",
  titleLines: ["Mamdouh", "Ahmed"],
  role: "Visual Storyteller — Backgrounds · Concept Art · Character Design · Personal Projects",
  intro:
    "Background Artist, Concept Artist, Character Designer and Storyboard Artist crafting immersive worlds where color, mood and narrative collide.",
};

export const about = {
  paragraphs: [
    "I'm Mamdouh Ahmed, Background Artist, Concept Artist, Character Designer, and Storyboard Artist with 6+ years of professional experience across 6 animated series and 150+ animated commercials.",
    "I specialize in building immersive environments, designing memorable characters, and crafting story-driven visuals that transform ideas into engaging animated experiences. Passionate about visual storytelling, I bring creativity, technical expertise, and a production-ready mindset to every frame.",
  ],
  disciplines: [
    "Environment & Background Design",
    "Character Design",
    "Concept Art",
    "Storyboard",
    "Comics",
    "Graphic Design",
    "Digital Painting",
    "Color & Light",
  ],
  software: ["Blender", "Maya", "Photoshop", "Procreate", "Clip Studio Paint", "Moho ", "Adobe Animate", "Callipeg", "Adobe After Effects"],
  experience: [
    {
      title: "Tahaleeb",
      type: "Animated Series",
      role: "Background · Concept",
    },
    {
      title: "Spinach",
      type: "Animated Series",
      role: "Background · Concept",
    },
    {
      title: "Ganazer",
      type: "Animated Series",
      role: "Background · Concept",
    },
    {
      title: "Our Master Prophet Mohamed",
      type: "Animated Series",
      role: "Director · Art Director · Storyboard Artist · Background artist · Character designer",
    },
    {
      title: "Tahaleeb Studio Ads",
      type: "Commercial Projects",
      role: "Multi-discipline",
    },
  ],
  stats: [
    { value: "6+", label: "Years of Experience" },
    { value: "150+", label: "Commercial Ads" },
    { value: "6", label: "Animated Series" },
    { value: "∞", label: "Imagination" },
  ],
};

export const featuredProject = {
  kicker: "Featured Personal Project",
  title: "The Color of Zahian",
  meta: ["Animated Short", "World Design · Concept · Characters", "Dieselpunk · Dark Fantasy"],
  synopsis:
    "The film follows Zahian, a being born into a world dominated by artificial, lifeless colors. Wherever he moves, natural color and vitality emerge. When the controlling system discovers his ability, it absorbs him into its industrial core, where color is extracted and controlled. Through suffering and sacrifice, Zahian's remaining light transfers to the world, allowing life and emotion to continue beyond his existence.",
  chapters: [
    {
      id: "world",
      kicker: "World Building",
      title: "A world that runs on color",
      body: "The film takes place in a decaying industrial world where color is the source of life itself. Massive machines, pipes and mechanical systems sustain a rigid order by extracting color from its inhabitants. Characters begin as vibrant beings whose presence brings warmth and vitality, but as they connect to the system, their colors gradually fade, leaving them pale and monochromatic.",
      image: "/artwork/zhiyan/zhiyan-23.webp",
      thumb: "/artwork/zhiyan/zhiyan-23-thumb.webp",
    },
    {
      id: "factory",
      kicker: "Factory Concept Art",
      title: "The industrial core",
      body: "A sprawling dieselpunk machine-landscape where color is harvested and controlled. Hard surfaces, heavy pipes and grim geometry contrast with the few warm, living accents that survive inside it.",
      image: "/artwork/zhiyan/zhiyan-24.webp",
      thumb: "/artwork/zhiyan/zhiyan-24-thumb.webp",
    },
    {
      id: "room",
      kicker: "Room Concept Art",
      title: "Where private life meets the machine",
      body: "Zhiyan and his friends' room reflects the harsh living conditions of the industrial world, cracked walls, damaged flooring and exposed mechanical elements fused into the architecture. Massive metal pipes run straight through the space, a constant reminder of the system that dominates even their most private moments.",
      image: "/artwork/zhiyan/zhiyan-31.webp",
      thumb: "/artwork/zhiyan/zhiyan-31-thumb.webp",
    },
    {
      id: "characters",
      kicker: "Character Design",
      title: "Vibrant souls, fading light",
      body: "Stylized, Cartoon-Saloon-inspired silhouettes carry the film's central metaphor: individuality and creativity slowly drained by a system that feeds on color. Each character's palette tells the story of how much of themselves remains.",
      image: "/artwork/zhiyan/zhiyan-36.webp",
      thumb: "/artwork/zhiyan/zhiyan-36-thumb.webp",
    },
  ] satisfies ProjectChapter[],
};

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "background", label: "Background" },
  { id: "concept-art", label: "Concept Art" },
  { id: "character-design", label: "Character Design" },
  { id: "personal-projects", label: "Personal Projects" },
];

const pageList: Record<GalleryCategory, number[]> = {
  background: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  "concept-art": [61, 25, 26, 27, 28, 29, 30, 62, 33, 63, 64],
  "character-design": [34, 35, 37, 38, 39, 40, 41, 42, 43, 54, 55, 56, 57, 58, 59, 60],
  "personal-projects": [47, 48, 49, 50, 51, 52, 65, 66, 67, 68],
};

const categoryLabels: Record<GalleryCategory, string> = {
  background: "Background",
  "concept-art": "Concept Art",
  "character-design": "Character Design",
  "personal-projects": "Personal Projects",
};

export const gallery: Artwork[] = (
  Object.entries(pageList) as [GalleryCategory, number[]][]
).flatMap(([cat, pages]) =>
  pages.map((p, i) => ({
    id: `${cat}-${p}`,
    src: `/artwork/${cat}/${cat}-${p.toString().padStart(2, "0")}.webp`,
    thumb: `/artwork/${cat}/${cat}-${p.toString().padStart(2, "0")}-thumb.webp`,
    title: `${categoryLabels[cat]} ${i + 1}`,
    category: cat,
  })),
);
