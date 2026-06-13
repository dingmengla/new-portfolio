export type ObserveArticleSize = "sm" | "md" | "lg";

export interface ObserveArticle {
  id: string;
  title: string;
  titleEn: string;
  media: string;
  publishedAt: string;
  views?: string;
  image: string;
  quotes: string[];
  summary: string;
  url: string;
}

export interface ObserveQuoteSlide {
  text: string;
  articleId: string;
  articleTitle: string;
  articleMedia: string;
}

export const observeArticles: ObserveArticle[] = [
  {
    id: "obs-1",
    title: "《网红涌进联合国》",
    titleEn: "Influencers Flock to the United Nations",
    media: "南风窗",
    publishedAt: "2025.12.23",
    views: "10万＋",
    image: "/images/observe/news/obs-1.png",
    quotes: [
      "对于联合国，国内有很大的信息差，大家不知道参加联合国会议的途径，所以都归结到包装上，其实联合国的很多会议，大众通过申请都可以参加。",
    ],
    summary:
      "对于联合国，国内有很大的信息差，大家不知道参加联合国会议的途径，所以都归结到包装上，其实联合国的很多会议，大众通过申请都可以参加。",
    url: "https://mp.weixin.qq.com/s/GN7LZuAy0rkfd16E3OSsfQ",
  },
  {
    id: "obs-2",
    title: "《美国人涌入小红书，真实想法是什么》",
    titleEn: "What Americans Really Think About Joining Xiaohongshu",
    media: "南风窗",
    publishedAt: "2025.01.21",
    views: "10万＋",
    image: "/images/observe/news/obs-2.png",
    quotes: [
      "「在我的国家，我们应该有言论和表达的自由，但是他们剥夺了我们的权利。政府把社交网络当作替罪羊，他们讨厌TikTok，因为他们无法控制它或控制使用它的人。」",
      "「他们声称TikTok窃取数据，但真正掌握我们数据并控制政府的是美国公司，所以我要用一个中国应用来报复他们。」",
      "「我不再相信美国政府对其他国家的任何说法，我一直对东方文化很感兴趣，我想这可能是了解中国文化和中国人的有趣方式。」",
    ],
    summary:
      "Rock 对南风窗解释，TikTok 禁令之下，一批美国用户涌入小红书，寻找表达自由与了解东方文化的窗口。",
    url: "https://mp.weixin.qq.com/s/dgrcGBSAUajXKF92q1KUYg?scene=1",
  },
  {
    id: "obs-3",
    title: "《失联女演员获救，曝光新型短剧骗局》",
    titleEn: "Missing Actress Rescued, Exposing New Short-Drama Scams",
    media: "南风窗",
    publishedAt: "2025.10.15",
    views: "10万＋",
    image: "/images/observe/news/obs-3.png",
    quotes: [
      "「常规剧组有表格明确哪些人员在哪些地点拍哪几幕的景，不会转移原本定好的拍摄地点；组讯制作也会更仔细；定人会拉群；剧组也可以根据组讯备案号在国电网搜索到。」",
      "「现在短剧很火，短剧演员的门槛也比较低，很多人都想去做。也正是这个心思被抓住了。」",
      "「对没有资本积累，没有大公司支持的小演员来说，就会想，我是不是有这个机会能够上去？我就想去试戏，就想去抓住这个机会。」",
    ],
    summary:
      "失联女演员获救事件，暴露出短剧行业新型骗局与从业者面临的结构性风险。",
    url: "https://mp.weixin.qq.com/s/EZRVMvLmCF331iNdWpAPiQ",
  },
  {
    id: "obs-4",
    title: "《让AI帮忙挣钱，他们月入十万》",
    titleEn: "Earning a Hundred Thousand a Month with AI",
    media: "南风窗",
    publishedAt: "2025.05.08",
    views: "10万＋",
    image: "/images/observe/news/obs-4.png",
    quotes: [
      "当下，利用AI挣到钱的普通人主要集中在AIGC（AI生成内容）、数字营销、软件开发、自媒体以及知识付费领域。",
      "更快的赚钱路子，还来自那些贩卖信息差的人。多位受访AI创作者都发现，AI属于信息差较大、学习有门槛的领域，因此，在这一行，很多先挣到钱的人是边贩卖焦虑，边卖知识、课程和信息差的。",
    ],
    summary:
      "盐财经采访调查发现，AI 变现路径与信息差经济正在重塑普通人的收入结构。",
    url: "https://mp.weixin.qq.com/s/-AGCXE4MaX0g2rbYaYPNNw?scene=1&click_id=1",
  },
  {
    id: "obs-5",
    title: "《这些大专生，教出人形机器人》",
    titleEn: "These Junior College Students Are Teaching Humanoid Robots",
    media: "南风窗",
    publishedAt: "2025.08.27",
    views: "10万＋",
    image: "/images/observe/news/obs-5.png",
    quotes: [
      "事实上，业内人士都清楚，这波数据采集员的招聘热，最早是由全球顶尖机器人公司带动的。2024年8月，特斯拉率先为旗下Optimus人形机器人招募数据采集操作员。",
      "采集员需要穿戴设备，在工作过程中站立、坐下、行走、弯腰、伸展、蹲伏和扭转身体。特斯拉还给这群数据采集员提供了有竞争力的薪酬：每小时25-48美元，以及股权刺激。",
    ],
    summary:
      "人形机器人数据采集员岗位热潮背后，是大专生群体进入前沿科技产业链的新路径。",
    url: "https://mp.weixin.qq.com/s/BZCagBANkicAGYfDlCC9cQ",
  },
  {
    id: "obs-6",
    title: "《这场龙舟赛，不一般！》",
    titleEn: "This Dragon Boat Race is Extraordinary!",
    media: "光明日报",
    publishedAt: "2025.06.11",
    image: "/images/observe/news/obs-6.png",
    quotes: [
      "6月10日，在素有「深圳小塞纳」之称的南山区大沙河，第六届大沙河龙舟邀请赛共25支队伍约550名参赛选手逐浪大沙河，龙舟犹如蛟龙出海，气势磅礴。",
      "现场气氛热烈，桨声阵阵，伴随着观众的欢呼声，龙舟如离弦之箭，在大沙河中破浪前行。",
    ],
    summary:
      "第六届大沙河龙舟邀请赛现场报道，记录深圳南山龙舟竞渡的磅礴气势。",
    url: "https://mp.weixin.qq.com/s/Twu3PWInTVUv31KLxVHBVA",
  },
  {
    id: "obs-7",
    title: "《高交会上的科技新亮点》",
    titleEn: "Tech Highlights at the High-Tech Fair",
    media: "光明日报",
    publishedAt: "2025.11.15",
    image: "/images/observe/news/obs-7.png",
    quotes: [
      "在第二十六届中国国际高新技术成果交易会上，可以看到会发电的光伏建材，还有像搭积木一般的模块化集成建筑技术……",
      "作为「中国科技第一展」，各种机器人自然不能缺席，有可以调酒的机器人，也有横着上楼的机器狗，还有机器人的「蓝翔技校」……",
    ],
    summary: "第二十六届高交会现场视频通讯，呈现光伏建材、模块化建筑与机器人等科技亮点。",
    url: "https://weibo.com/1402977920/P0JmME6oy?refer_flag=1001030103_",
  },
  {
    id: "obs-8",
    title: "《集体婚礼上演中式浪漫》",
    titleEn: "Collective Wedding Ceremony Showcases Traditional Chinese Romance",
    media: "光明日报",
    publishedAt: "2024.08.12",
    image: "/images/observe/news/obs-8.png",
    quotes: [
      "集体婚礼现场，新人们身着中式礼服，在传统仪式中演绎属于当代中国的浪漫表达。",
    ],
    summary: "光明日报视频通讯，记录集体婚礼中的中式浪漫仪式。",
    url: "https://weibo.com/1402977920/OycKW7xOn?refer_flag=1001030103_",
  },
  {
    id: "obs-9",
    title: "《在深圳大学感受语言文化之美》",
    titleEn: "Experiencing the Beauty of Language and Culture at Shenzhen University",
    media: "光明日报",
    publishedAt: "2024.05.16",
    image: "/images/observe/news/obs-9.png",
    quotes: [
      "在深圳大学，语言与文化的交汇呈现出多元而鲜活的面貌，学生们用声音与文字传递跨越边界的美。",
    ],
    summary: "光明日报视频通讯，走进深圳大学感受语言文化之美。",
    url: "https://weibo.com/1402977920/Oj8t3iUDi?refer_flag=1001030103_",
  },
  {
    id: "obs-10",
    title: "《用画笔描绘心中的碳中和世界》",
    titleEn: "Painting the Carbon Neutral World in Our Hearts",
    media: "光明日报",
    publishedAt: "2024.09.20",
    image: "/images/observe/news/obs-10.png",
    quotes: [
      "孩子们用画笔描绘心中的碳中和世界，将环保理念化作色彩与线条，在纸上生长。",
    ],
    summary: "光明日报视频通讯，记录青少年以绘画表达碳中和愿景。",
    url: "https://weibo.com/1402977920/Ozg6KoPGX?refer_flag=1001030103_",
  },
];

export const observeQuoteSlides: ObserveQuoteSlide[] = observeArticles.flatMap(
  (article) =>
    article.quotes.map((text) => ({
      text,
      articleId: article.id,
      articleTitle: article.title,
      articleMedia: article.media,
    }))
);

export const OBSERVE_SIZE_PX: Record<ObserveArticleSize, { w: number; h: number }> = {
  sm: { w: 128, h: 168 },
  md: { w: 148, h: 192 },
  lg: { w: 168, h: 216 },
};
