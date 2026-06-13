export type Experience = {
  id: number;
  period: string;
  periodEn: string;
  org: string;
  orgEn: string;
  role: string;
  roleEn: string;
  description: string;
  descriptionEn: string;
  highlights: string[];
  highlightsEn: string[];
  image: string;
  side: "left" | "right";
  unwritten?: boolean;
};

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface Quote {
  text: string;
  author: string;
}

export interface Highlight {
  image: string;
  alt: string;
  caption: string;
  captionEn: string;
  imageScale?: number;
}

// ─── 个人经历 ──────────────────────────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: 0,
    period: "2026.09 ~",
    periodEn: "Sep 2026 –",
    org: "香港大学",
    orgEn: "The University of Hong Kong",
    role: "26 Fall · Unwritten",
    roleEn: "26 Fall · Unwritten",
    description: "等待书写……",
    descriptionEn: "A chapter yet to be written...",
    highlights: [],
    highlightsEn: [],
    image: "/images/timeline/01-hku.jpg",
    side: "right",
    unwritten: true,
  },
  {
    id: 1,
    period: "2025.09 ~ 2026.02",
    periodEn: "Sep 2025 – Feb 2026",
    org: "汉阳大学",
    orgEn: "Hanyang University",
    role: "媒体研究专业交换生",
    roleEn: "Exchange Student in Media Studies",
    description:
      "赴韩国《中央日报》大学综合排名韩国第3，汉阳大学媒体研究专业交换学习。",
    descriptionEn:
      "Korea JoongAng Daily University Comprehensive Ranking, 3rd in Korea. Exchange Study in Media Studies at Hanyang University.",
    highlights: ["韩国第3"],
    highlightsEn: ["3rd in Korea"],
    image: "/images/timeline/02-hanyang.jpg",
    side: "left",
  },
  {
    id: 2,
    period: "2025.03 ~ 2025.08",
    periodEn: "Mar 2025 – Aug 2025",
    org: "Ulike",
    orgEn: "Ulike",
    role: "海外 PR 实习生",
    roleEn: "Overseas PR Intern",
    description:
      "品牌传播：参与策划与落地 Ulike 首次亮相 AAD 2025（美国皮肤病学会年会）与德国 IFA 国际消费电子展，协助 PR 部门对接欧美媒体，取得 30＋ 现场医生与 KOL 测试视频或背书内容；媒体关系：结合市场各业务部门宣传节点需求，pitch 符合媒体调性的稿件，AAD 期间成功 pitch 包括 Yahoo! 等 5 家 Top Tier 媒体，单日最高媒体 mention 达 330＋。",
    descriptionEn:
      "Overseas PR Intern at global consumer electronics brand Ulike. Brand Communications: Participated in planning and executing Ulike's debut at AAD 2025 (American Academy of Dermatology Annual Meeting) and IFA Berlin; liaised with European and American media, established early media relationships, and secured 30+ on-site physician and KOL endorsement videos. Media Relations: Pitched stories aligned with media tone based on business milestones; successfully pitched 5 Top Tier outlets including Yahoo! during AAD, with a single-day media mention peak of 330+.",
    highlights: ["30＋", "5 家 Top Tier 媒体", "330＋"],
    highlightsEn: ["30+", "5 Top Tier outlets", "330+"],
    image: "/images/timeline/03-ulike.jpg",
    side: "right",
  },
  {
    id: 3,
    period: "2025.07 ~ 2025.09",
    periodEn: "Jul 2025 – Sep 2025",
    org: "南方周末",
    orgEn: "Southern Weekly",
    role: "城市区域研究中心实习生",
    roleEn: "Intern, Urban and Regional Research Center",
    description:
      "南方周末城市区域研究中心实习生，采集、分析数据上万条，制作可视化数据新闻。",
    descriptionEn:
      "Intern at the Southern Weekly Urban and Regional Research Center. Collected and analyzed tens of thousands of data points, and produced visual data reports.",
    highlights: ["数据上万条", "可视化数据新闻"],
    highlightsEn: ["tens of thousands of data points", "visual data reports"],
    image: "/images/timeline/04-nanfangzhoumo.jpg",
    side: "right",
  },
  {
    id: 4,
    period: "2024.11 ~ 2025.03",
    periodEn: "Nov 2024 – Mar 2025",
    org: "南风窗",
    orgEn: "South Reviews",
    role: "AI专栏实习记者",
    roleEn: "Intern Reporter, AI Column",
    description:
      "南风窗AI专栏实习记者，发布稿件7篇，每篇稿件阅读量均破10万+。",
    descriptionEn:
      "Intern Reporter for the AI Column of South Review. Published 7 articles, with each article achieving a readership exceeding 100,000+.",
    highlights: ["7篇", "10万+"],
    highlightsEn: ["7 articles", "100,000+"],
    image: "/images/timeline/05-nanfengchuang.jpg",
    side: "left",
  },
  {
    id: 5,
    period: "2024.10 ~ 2024.11",
    periodEn: "Oct 2024 – Nov 2024",
    org: "沙特阿拉伯国际传播交流活动",
    orgEn: "International Communication Exchange, Saudi Arabia",
    role: "领队",
    roleEn: "Team Lead",
    description:
      "沙特阿拉伯国际传播交流活动领队，制作传播策划案，文字报道6篇，视频vlog七部。",
    descriptionEn:
      "Team Lead for International Communication Exchange Activities in Saudi Arabia. Developed communication proposals, produced 6 written articles, and created 7 video vlogs.",
    highlights: ["文字报道6篇", "视频vlog七部"],
    highlightsEn: ["6 written articles", "7 video vlogs"],
    image: "/images/timeline/06-saudi.jpg",
    side: "right",
  },
  {
    id: 6,
    period: "2024.06 ~ 2024.12",
    periodEn: "Jun 2024 – Dec 2024",
    org: "光明日报",
    orgEn: "Guangming Daily",
    role: "全媒体通讯员",
    roleEn: "All-Media Correspondent",
    description: "发布视频文字通讯稿 7 篇，阅读量 4 万＋。",
    descriptionEn:
      "Published 7 video-text news features, with a readership of over 40,000.",
    highlights: ["7 篇", "4 万＋"],
    highlightsEn: ["7 video-text", "40,000"],
    image: "/images/timeline/07-guangming.jpg",
    side: "left",
  },
];
export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Project Alpha",
    description:
      "基于 WebSocket 与 Canvas API 构建的实时协作设计工具，支持多人同步编辑。",
    tags: ["React", "WebSockets", "Canvas API", "Node.js"],
    featured: true,
  },
  {
    id: "proj-2",
    title: "Project Beta",
    description:
      "AI 驱动的写作助手，帮助开发者撰写更清晰的技术文档，内置 GPT-4 润色流水线。",
    tags: ["Next.js", "OpenAI", "Tailwind CSS", "TypeScript"],
    featured: true,
  },
  {
    id: "proj-3",
    title: "Project Gamma",
    description:
      "极简高性能静态站点生成器，内置 i18n 支持，Rust 编写，毫秒级构建。",
    tags: ["Rust", "CLI", "Markdown", "WASM"],
    featured: false,
  },
  {
    id: "proj-4",
    title: "Project Delta",
    description:
      "开源组件库，50+ 无障碍、有动效的 React 组件，完整 Storybook 文档。",
    tags: ["React", "Framer Motion", "Storybook", "Radix UI"],
    featured: false,
  },
];

// ─── 金句 ──────────────────────────────────────────────────────────────────────
export const quotes: Quote[] = [
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
];

// ─── 高光展示 ──────────────────────────────────────────────────────────────────
export const highlights: Highlight[] = [
  {
    image: "/images/highlights/01-olympic.jpg",
    alt: "Interview with Paris Olympic Champions",
    caption: "巴黎奥运冠军专访",
    captionEn: "Interview with Paris Olympic Champions · Shenzhen",
  },
  {
    image: "/images/highlights/02-ai-column.jpg",
    alt: "AI Column journalism",
    caption: "南风窗 AI 专栏",
    captionEn: "Retired at 25: Gen Z, AI & the Youth Nursing Home",
  },
  {
    image: "/images/highlights/03-hanyang.jpg",
    alt: "Exchange at Hanyang University",
    caption: "汉阳大学交换经历",
    captionEn: "Exchange Experience in Hanyang University · Seoul",
  },
  {
    image: "/images/highlights/04-saudi.jpg",
    alt: "Global Communication in Saudi Arabia",
    caption: "沙特国际传播交流",
    captionEn: "Global Communication in Saudi Arabia · Riyadh",
    imageScale: 1.45,
  },
];
