export type ExploreRegion = "asia" | "middleeast" | "europe" | "southeastasia";

export interface ExploreVideo {
  title: string;
  url: string;
}

export interface ExplorePlog {
  title: string;
  url?: string;
  image: string;
}

export interface ExploreSpot {
  id: string;
  city: string;
  cityEn: string;
  country: string;
  countryEn: string;
  date: string;
  lat: number;
  lng: number;
  region: ExploreRegion;
  description: string;
  descriptionEn: string;
  photos: string[];
  videos?: ExploreVideo[];
  plogs?: ExplorePlog[];
}

export interface TravelVideoItem extends ExploreVideo {
  spotId: string;
  spotCity: string;
}

export const REGION_COLORS: Record<ExploreRegion, string> = {
  asia: "#ffffff",
  middleeast: "#ffd6a5",
  europe: "#a0c4ff",
  southeastasia: "#ffffff",
};

const V = "/videos/travel";

export const exploreSpots: ExploreSpot[] = [
  {
    id: "saudi",
    city: "沙特阿拉伯",
    cityEn: "Saudi Arabia",
    country: "利雅得",
    countryEn: "Riyadh",
    date: "2024.10",
    lat: 24.7136,
    lng: 46.6753,
    region: "middleeast",
    description: "沙特国际传播交流纪实，记录跨文化对话与中国品牌出海故事。",
    descriptionEn:
      "Documenting cross-cultural dialogue and Chinese brands going global in Saudi Arabia.",
    photos: ["/images/timeline/06-saudi.jpg", "/images/highlights/04-saudi.jpg"],
    videos: [
      { title: "沙特行记 I", url: `${V}/saudi-1.mp4` },
      { title: "沙特行记 II", url: `${V}/saudi-2.mp4` },
    ],
  },
  {
    id: "italy",
    city: "意大利",
    cityEn: "Italy",
    country: "罗马",
    countryEn: "Rome",
    date: "2024.07",
    lat: 41.9028,
    lng: 12.4964,
    region: "europe",
    description: "漫步罗马与佛罗伦萨，记录欧洲古城的历史肌理与当代生活。",
    descriptionEn:
      "Walking through Rome and Florence, capturing the historical texture and contemporary life of old Europe.",
    photos: ["/images/highlights/01-olympic.jpg"],
    videos: [{ title: "欧洲行记", url: `${V}/europe.mp4` }],
  },
  {
    id: "north-macedonia",
    city: "北马其顿",
    cityEn: "North Macedonia",
    country: "斯科普里",
    countryEn: "Skopje",
    date: "2024.07",
    lat: 41.9981,
    lng: 21.4254,
    region: "europe",
    description: "巴尔干半岛之行，探访北马其顿的城市风貌与人文现场。",
    descriptionEn:
      "A Balkan journey exploring the urban landscape and cultural scenes of North Macedonia.",
    photos: ["/images/vision.jpg"],
    videos: [{ title: "欧洲行记", url: `${V}/europe.mp4` }],
  },
  {
    id: "romania",
    city: "罗马尼亚",
    cityEn: "Romania",
    country: "布加勒斯特",
    countryEn: "Bucharest",
    date: "2024.07",
    lat: 44.4268,
    lng: 26.1025,
    region: "europe",
    description: "东欧旅途中的罗马尼亚站，记录多瑙河畔的城市记忆。",
    descriptionEn:
      "The Romania leg of an Eastern Europe trip, documenting urban memories along the Danube.",
    photos: ["/images/vision-blur.jpg"],
    videos: [{ title: "欧洲行记", url: `${V}/europe.mp4` }],
  },
  {
    id: "central-europe",
    city: "捷克 · 奥地利 · 匈牙利",
    cityEn: "Czech · Austria · Hungary",
    country: "中欧",
    countryEn: "Central Europe",
    date: "2024.08",
    lat: 48.2082,
    lng: 16.3738,
    region: "europe",
    description: "穿越布拉格、维也纳与布达佩斯，记录中欧三国的人文与建筑。",
    descriptionEn:
      "Traveling through Prague, Vienna and Budapest, documenting culture and architecture across Central Europe.",
    photos: ["/images/timeline/02-hanyang.jpg"],
    videos: [{ title: "欧洲行记", url: `${V}/europe.mp4` }],
  },
  {
    id: "xinjiang",
    city: "新疆",
    cityEn: "Xinjiang",
    country: "中国",
    countryEn: "China",
    date: "2023.08",
    lat: 43.8256,
    lng: 87.6168,
    region: "asia",
    description: "新疆旅途，记录广袤地貌与多元民族文化交汇的现场。",
    descriptionEn:
      "A Xinjiang journey capturing vast landscapes and the convergence of diverse ethnic cultures.",
    photos: ["/images/timeline/04-nanfangzhoumo.jpg"],
    videos: [{ title: "新疆行记", url: `${V}/xinjiang.mp4` }],
  },
  {
    id: "hong-kong",
    city: "香港",
    cityEn: "Hong Kong",
    country: "中国",
    countryEn: "China",
    date: "2023.09",
    lat: 22.3193,
    lng: 114.1694,
    region: "asia",
    description: "在香港大学攻读新闻学硕士，记录这座城市的密度、节奏与多元文化交汇。",
    descriptionEn:
      "Pursuing a Master's in Journalism at HKU, documenting this city's density, rhythm and cultural convergence.",
    photos: ["/images/timeline/01-hku.jpg", "/images/timeline/hku.jpg"],
  },
  {
    id: "macau",
    city: "澳门",
    cityEn: "Macau",
    country: "中国",
    countryEn: "China",
    date: "2024.01",
    lat: 22.1987,
    lng: 113.5439,
    region: "asia",
    description: "港澳相邻的另一种节奏，记录半岛历史街区与当代生活的叠合。",
    descriptionEn:
      "A different rhythm next to Hong Kong — historic districts layered with contemporary life.",
    photos: ["/images/timeline/hku.jpg"],
  },
  {
    id: "japan",
    city: "日本",
    cityEn: "Japan",
    country: "东京",
    countryEn: "Tokyo",
    date: "2024.05",
    lat: 35.6762,
    lng: 139.6503,
    region: "asia",
    description: "日本之行，从东京街头到文化现场，记录东亚都市的细腻观察。",
    descriptionEn:
      "A Japan trip from Tokyo streets to cultural scenes, documenting nuanced urban observations in East Asia.",
    photos: ["/images/highlights/02-ai-column.jpg"],
    videos: [
      { title: "日本行记 I", url: `${V}/japan-1.mp4` },
      { title: "日本行记 II", url: `${V}/japan-2.mp4` },
    ],
  },
  {
    id: "korea",
    city: "韩国",
    cityEn: "South Korea",
    country: "首尔",
    countryEn: "Seoul",
    date: "2024.03",
    lat: 37.5665,
    lng: 126.978,
    region: "asia",
    description: "汉阳大学交换期间，用镜头记录韩国媒体生态与青年文化现场。",
    descriptionEn:
      "During exchange at Hanyang University, capturing Korea's media landscape and youth culture.",
    photos: [
      "/images/timeline/02-hanyang.jpg",
      "/images/highlights/03-hanyang.jpg",
    ],
    videos: [{ title: "韩国交换 Vlog", url: `${V}/korea-1.mp4` }],
    plogs: [
      {
        title: "首尔街头",
        image: "/images/timeline/02-hanyang.jpg",
      },
      {
        title: "汉阳校园",
        image: "/images/highlights/03-hanyang.jpg",
      },
      {
        title: "釜山海岸",
        image: "/images/timeline/03-ulike.jpg",
      },
      {
        title: "韩式日常",
        image: "/images/timeline/05-nanfengchuang.jpg",
      },
    ],
  },
  {
    id: "indonesia",
    city: "印度尼西亚",
    cityEn: "Indonesia",
    country: "雅加达",
    countryEn: "Jakarta",
    date: "2024.11",
    lat: -6.2088,
    lng: 106.8456,
    region: "southeastasia",
    description: "印尼群岛之旅，记录热带都市与自然人文的交汇。",
    descriptionEn:
      "An Indonesian archipelago journey documenting tropical cities and natural-cultural intersections.",
    photos: ["/images/timeline/06-saudi.jpg"],
    videos: [
      { title: "印尼行记 I", url: `${V}/indonesia-1.mp4` },
      { title: "印尼行记 II", url: `${V}/indonesia-2.mp4` },
    ],
  },
];

/** 9 支旅行 Vlog（去重，供右侧列表展示） */
export const allTravelVideos: TravelVideoItem[] = [
  { title: "沙特行记 I", url: `${V}/saudi-1.mp4`, spotId: "saudi", spotCity: "沙特阿拉伯" },
  { title: "沙特行记 II", url: `${V}/saudi-2.mp4`, spotId: "saudi", spotCity: "沙特阿拉伯" },
  { title: "欧洲行记", url: `${V}/europe.mp4`, spotId: "central-europe", spotCity: "欧洲" },
  { title: "新疆行记", url: `${V}/xinjiang.mp4`, spotId: "xinjiang", spotCity: "新疆" },
  { title: "日本行记 I", url: `${V}/japan-1.mp4`, spotId: "japan", spotCity: "日本" },
  { title: "日本行记 II", url: `${V}/japan-2.mp4`, spotId: "japan", spotCity: "日本" },
  { title: "韩国交换 Vlog", url: `${V}/korea-1.mp4`, spotId: "korea", spotCity: "韩国" },
  { title: "印尼行记 I", url: `${V}/indonesia-1.mp4`, spotId: "indonesia", spotCity: "印度尼西亚" },
  { title: "印尼行记 II", url: `${V}/indonesia-2.mp4`, spotId: "indonesia", spotCity: "印度尼西亚" },
];

export function getSpotVideos(spot: ExploreSpot): ExploreVideo[] {
  return spot.videos ?? [];
}

export function getDefaultSpot(): ExploreSpot {
  return exploreSpots.find((s) => s.videos?.length) ?? exploreSpots[0];
}

export function getDefaultTravelVideo(): TravelVideoItem {
  return allTravelVideos[0];
}
