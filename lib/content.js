export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Explore", href: "#explore" },
  { label: "Stories", href: "#stories" },
  { label: "Places", href: "#places" },
  { label: "About", href: "#about" },
];

export const storyPaths = [
  {
    number: "01",
    kicker: "BELIEF",
    title: "Faith & ritual",
    description: "Symbols, sacred spaces, and the meaning inside a daily act.",
    tone: "forest",
    filter: "belief",
  },
  {
    number: "02",
    kicker: "ART",
    title: "Art & heritage",
    description: "Objects, techniques, and ideas carried across generations.",
    tone: "sage",
    filter: "craft",
  },
  {
    number: "03",
    kicker: "PLACE",
    title: "Travel diaries",
    description: "What happens when a place is experienced beyond the plan.",
    tone: "yellow",
    destination: "places",
  },
  {
    number: "04",
    kicker: "LIFE",
    title: "Everyday culture",
    description: "Food, customs, and the small things that make a place.",
    tone: "cream",
    filter: "everyday",
  },
];

export const cholaCards = [
  {
    number: "01",
    title: "The drum",
    description: "The first rhythm: creation beginning to move.",
  },
  {
    number: "02",
    title: "The open palm",
    description: "A gesture of reassurance and protection.",
  },
  {
    number: "03",
    title: "The flame",
    description: "Destruction, change, and the possibility of renewal.",
  },
  {
    number: "04",
    title: "The raised foot",
    description: "Grace and release from ignorance.",
  },
];

export const bronzeSteps = [
  { number: "1", label: "Shape in wax" },
  { number: "2", label: "Build a clay mould" },
  { number: "3", label: "Pour the metal" },
  { number: "4", label: "Reveal the form" },
];

export const travelCards = [
  {
    number: "01",
    kicker: "EXPECTED",
    title: "A calm, royal escape",
    description: "Quiet lake views, polished plans, and time for every landmark.",
  },
  {
    number: "02",
    kicker: "HAPPENED",
    title: "The city set its own pace",
    description:
      "Late starts, full streets, changed plans, and an unexpected wedding celebration.",
  },
  {
    number: "03",
    kicker: "REMEMBERED",
    title: "The moments between",
    description:
      "Long conversations, new stories, and a sunset that made us slow down.",
  },
];

export const journalFilters = [
  { key: "all", label: "All stories" },
  { key: "belief", label: "Belief & ritual" },
  { key: "food", label: "Food & tradition" },
  { key: "everyday", label: "Everyday life" },
  { key: "craft", label: "Art & craft" },
];

export const storyCategories = {
  belief: "Belief & ritual",
  food: "Food & tradition",
  everyday: "Everyday life",
  craft: "Art & craft",
};
