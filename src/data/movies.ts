export interface Movie {
  id: number;
  title: string;
  originalTitle?: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  director: string;
  cast: string[];
  description: string;
  poster: string;
  backdrop: string;
  category: string;
  trending?: boolean;
  newRelease?: boolean;
  topRated?: boolean;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: '星际穿越',
    originalTitle: 'Interstellar',
    year: 2014,
    rating: 9.4,
    duration: '169分钟',
    genres: ['科幻', '冒险', '剧情'],
    director: '克里斯托弗·诺兰',
    cast: ['马修·麦康纳', '安妮·海瑟薇', '杰西卡·查斯坦'],
    description:
      '在不久的将来，地球面临着严重的粮食危机和环境恶化。前NASA宇航员库珀被选中执行一项穿越虫洞的太空任务，寻找适合人类居住的新星球。在浩瀚宇宙中，他不仅要面对未知的危险，还要承受与家人分离的痛苦。时间在不同星球上以不同速度流逝，当他返回时，女儿已经老去...',
    poster: 'https://picsum.photos/seed/interstellar/400/600',
    backdrop: 'https://picsum.photos/seed/interstellar-bg/1920/800',
    category: '科幻',
    trending: true,
    topRated: true,
  },
  {
    id: 2,
    title: '盗梦空间',
    originalTitle: 'Inception',
    year: 2010,
    rating: 9.3,
    duration: '148分钟',
    genres: ['科幻', '动作', '悬疑'],
    director: '克里斯托弗·诺兰',
    cast: ['莱昂纳多·迪卡普里奥', '约瑟夫·高登-莱维特', '艾伦·佩吉'],
    description:
      '道姆·柯布是一名技艺精湛的盗梦者，能够潜入人们的梦境中窃取最深层的秘密。为了回到自己的孩子身边，他接受了一项看似不可能的任务——不是窃取想法，而是在目标人物的潜意识中植入一个想法。他组建了一支精英团队，深入层层梦境，面对潜意识中的防御机制...',
    poster: 'https://picsum.photos/seed/inception/400/600',
    backdrop: 'https://picsum.photos/seed/inception-bg/1920/800',
    category: '动作',
    trending: true,
    topRated: true,
  },
  {
    id: 3,
    title: '肖申克的救赎',
    originalTitle: 'The Shawshank Redemption',
    year: 1994,
    rating: 9.7,
    duration: '142分钟',
    genres: ['剧情', '犯罪'],
    director: '弗兰克·德拉邦特',
    cast: ['蒂姆·罗宾斯', '摩根·弗里曼'],
    description:
      '银行家安迪·杜弗兰因被误判谋杀妻子及其情人而入狱。在肖申克监狱中，他结识了黑人囚犯瑞德，两人建立了深厚的友谊。安迪凭借自己的智慧和毅力，在监狱中创造了奇迹，最终实现了越狱计划，重获自由。这是一个关于希望、友谊和救赎的永恒故事。',
    poster: 'https://picsum.photos/seed/shawshank/400/600',
    backdrop: 'https://picsum.photos/seed/shawshank-bg/1920/800',
    category: '剧情',
    topRated: true,
  },
  {
    id: 4,
    title: '流浪地球2',
    originalTitle: 'The Wandering Earth 2',
    year: 2023,
    rating: 8.3,
    duration: '173分钟',
    genres: ['科幻', '冒险', '灾难'],
    director: '郭帆',
    cast: ['吴京', '刘德华', '李雪健'],
    description:
      '太阳即将毁灭，人类在地球表面建造了巨大的推进器，寻找新的家园。然而通往宇宙的道路危机四伏，为了拯救地球，流浪地球时代的年轻人再次挺身而出，展开争分夺秒的生死之战。影片展现了人类面对末日危机时的勇气与团结。',
    poster: 'https://picsum.photos/seed/wandering-earth2/400/600',
    backdrop: 'https://picsum.photos/seed/wandering-earth2-bg/1920/800',
    category: '科幻',
    newRelease: true,
  },
  {
    id: 5,
    title: '奥本海默',
    originalTitle: 'Oppenheimer',
    year: 2023,
    rating: 8.9,
    duration: '180分钟',
    genres: ['剧情', '传记', '历史'],
    director: '克里斯托弗·诺兰',
    cast: ['基里安·墨菲', '小罗伯特·唐尼', '艾米莉·布朗特'],
    description:
      '讲述了美国理论物理学家罗伯特·奥本海默领导曼哈顿计划研发原子弹的故事。从他在伯克利的学术生涯，到洛斯阿拉莫斯的秘密实验室，再到原子弹试爆成功后的道德挣扎，影片深入探讨了一个科学天才在改变世界进程后所面临的内心冲突。',
    poster: 'https://picsum.photos/seed/oppenheimer/400/600',
    backdrop: 'https://picsum.photos/seed/oppenheimer-bg/1920/800',
    category: '剧情',
    newRelease: true,
    topRated: true,
  },
  {
    id: 6,
    title: '速度与激情10',
    originalTitle: 'Fast X',
    year: 2023,
    rating: 7.2,
    duration: '141分钟',
    genres: ['动作', '冒险', '犯罪'],
    director: '路易斯·莱特里尔',
    cast: ['范·迪塞尔', '杰森·莫玛', '布丽·拉尔森'],
    description:
      '多姆·托雷托和他的家人成为了但丁——大反派赫尔南·雷耶斯之子的目标。但丁对多姆怀恨在心，策划了一个精心设计的复仇计划，威胁着多姆所爱的一切。多姆必须在全球范围内与时间赛跑，保护他的家人和团队。',
    poster: 'https://picsum.photos/seed/fast-x/400/600',
    backdrop: 'https://picsum.photos/seed/fast-x-bg/1920/800',
    category: '动作',
    newRelease: true,
    trending: true,
  },
  {
    id: 7,
    title: '千与千寻',
    originalTitle: 'Spirited Away',
    year: 2001,
    rating: 9.4,
    duration: '125分钟',
    genres: ['动画', '奇幻', '冒险'],
    director: '宫崎骏',
    cast: ['柊瑠美', '入野自由', '夏木真理'],
    description:
      '10岁的千寻随父母搬家途中，误入了一个神秘的灵异小镇。她的父母因贪吃变成了猪，千寻为了拯救父母，在汤婆婆经营的澡堂里工作。在这个奇幻的世界里，她遇到了白龙、无脸男等各种奇异的角色，逐渐成长并找到了回家的路。',
    poster: 'https://picsum.photos/seed/spirited-away/400/600',
    backdrop: 'https://picsum.photos/seed/spirited-away-bg/1920/800',
    category: '动画',
    topRated: true,
  },
  {
    id: 8,
    title: '满江红',
    originalTitle: 'Full River Red',
    year: 2023,
    rating: 7.8,
    duration: '159分钟',
    genres: ['喜剧', '悬疑', '历史'],
    director: '张艺谋',
    cast: ['沈腾', '易烊千玺', '张译'],
    description:
      '南宋绍兴年间，岳飞死后四年，秦桧率兵与金国会谈。会谈前夜，金国使者死在宰相驻地，所携密信也不翼而飞。一个小兵与亲兵营副统领机缘巧合被裹挟进这巨大阴谋之中，寻找凶手的过程中，一件更大的阴谋逐渐浮出水面。',
    poster: 'https://picsum.photos/seed/full-river-red/400/600',
    backdrop: 'https://picsum.photos/seed/full-river-red-bg/1920/800',
    category: '喜剧',
    newRelease: true,
  },
  {
    id: 9,
    title: '阿凡达：水之道',
    originalTitle: 'Avatar: The Way of Water',
    year: 2022,
    rating: 8.1,
    duration: '192分钟',
    genres: ['科幻', '动作', '冒险'],
    director: '詹姆斯·卡梅隆',
    cast: ['萨姆·沃辛顿', '佐伊·索尔达娜', '凯特·温斯莱特'],
    description:
      '杰克·萨利与奈蒂莉组建了家庭，他们尽一切努力在一起生活。然而，他们必须离开家园，探索潘多拉的不同区域。当熟悉的威胁卷土重来，杰克必须与纳威族和人类之间的一场大战作斗争，保护他所爱的人。',
    poster: 'https://picsum.photos/seed/avatar2/400/600',
    backdrop: 'https://picsum.photos/seed/avatar2-bg/1920/800',
    category: '科幻',
    trending: true,
  },
  {
    id: 10,
    title: '你的名字。',
    originalTitle: '君の名は。',
    year: 2016,
    rating: 8.4,
    duration: '106分钟',
    genres: ['动画', '爱情', '奇幻'],
    director: '新海诚',
    cast: ['神木隆之介', '上白石萌音'],
    description:
      '住在日本乡下的女高中生三叶和住在东京的男高中生�的体互换。在寻找彼此的过程中，他们发现了一个跨越时间的秘密。当一颗彗星即将撞击小镇时，泷必须想尽一切办法拯救三叶和整个小镇。',
    poster: 'https://picsum.photos/seed/your-name/400/600',
    backdrop: 'https://picsum.photos/seed/your-name-bg/1920/800',
    category: '动画',
    topRated: true,
  },
  {
    id: 11,
    title: '消失的她',
    originalTitle: 'Lost in the Stars',
    year: 2023,
    rating: 7.5,
    duration: '122分钟',
    genres: ['悬疑', '犯罪', '剧情'],
    director: '崔睿',
    cast: ['朱一龙', '倪妮', '文咏珊'],
    description:
      '何非的妻子李木子在结婚周年旅行中离奇消失。当何非报警后，出现在他面前的女人却声称自己才是真正的李木子。随着调查的深入，一个精心策划的阴谋逐渐浮出水面，真相远比想象中更加令人震惊。',
    poster: 'https://picsum.photos/seed/lost-stars/400/600',
    backdrop: 'https://picsum.photos/seed/lost-stars-bg/1920/800',
    category: '悬疑',
    newRelease: true,
    trending: true,
  },
  {
    id: 12,
    title: '霸王别姬',
    originalTitle: 'Farewell My Concubine',
    year: 1993,
    rating: 9.6,
    duration: '171分钟',
    genres: ['剧情', '爱情', '历史'],
    director: '陈凯歌',
    cast: ['张国荣', '张丰毅', '巩俐'],
    description:
      '段小楼与程蝶衣是一对从小一起长大的师兄弟，两人凭借一出《霸王别姬》名满京城。然而在时代的洪流中，两人的命运发生了翻天覆地的变化。程蝶衣对艺术和感情的执着追求，最终酿成了一场悲剧。影片跨越半个世纪，展现了中国社会的巨大变迁。',
    poster: 'https://picsum.photos/seed/farewell-concubine/400/600',
    backdrop: 'https://picsum.photos/seed/farewell-concubine-bg/1920/800',
    category: '剧情',
    topRated: true,
  },
  {
    id: 13,
    title: '孤注一掷',
    originalTitle: 'No More Bets',
    year: 2023,
    rating: 7.3,
    duration: '130分钟',
    genres: ['犯罪', '剧情'],
    director: '申奥',
    cast: ['张艺兴', '金晨', '王传君'],
    description:
      '程序员潘生和模特安娜被高薪工作诱惑，出国进入一家网络诈骗公司。他们发现所谓的"高薪工作"实际上是参与网络诈骗活动。在试图逃离的过程中，他们经历了种种磨难，最终配合警方捣毁了这个庞大的诈骗团伙。',
    poster: 'https://picsum.photos/seed/no-more-bets/400/600',
    backdrop: 'https://picsum.photos/seed/no-more-bets-bg/1920/800',
    category: '犯罪',
    newRelease: true,
  },
  {
    id: 14,
    title: '疯狂动物城',
    originalTitle: 'Zootopia',
    year: 2016,
    rating: 9.2,
    duration: '108分钟',
    genres: ['动画', '喜剧', '冒险'],
    director: '拜伦·霍华德',
    cast: ['金妮弗·古德温', '杰森·贝特曼'],
    description:
      '在一个所有动物和平共处的大都市"动物城"中，兔子朱迪成为了第一个兔子警官。为了证明自己，她接手了一桩神秘的失踪案，不得不与狡猾的狐狸尼克搭档合作。在调查过程中，他们发现了一个威胁整个动物城的阴谋。',
    poster: 'https://picsum.photos/seed/zootopia/400/600',
    backdrop: 'https://picsum.photos/seed/zootopia-bg/1920/800',
    category: '动画',
    topRated: true,
  },
  {
    id: 15,
    title: '封神第一部',
    originalTitle: 'Creation of the Gods I',
    year: 2023,
    rating: 7.9,
    duration: '148分钟',
    genres: ['奇幻', '动作', '历史'],
    director: '乌尔善',
    cast: ['费翔', '李雪健', '黄渤'],
    description:
      '商王殷寿与狐妖妲己勾结，引发封神大战。姜子牙携封神榜下山，寻找天下共主以解救苍生。姬发逐渐发现殷寿的残暴本质，最终决定起兵反抗。影片以全新的视角重新演绎了中国经典神话故事。',
    poster: 'https://picsum.photos/seed/creation-gods/400/600',
    backdrop: 'https://picsum.photos/seed/creation-gods-bg/1920/800',
    category: '奇幻',
    newRelease: true,
  },
  {
    id: 16,
    title: '泰坦尼克号',
    originalTitle: 'Titanic',
    year: 1997,
    rating: 9.5,
    duration: '194分钟',
    genres: ['爱情', '剧情', '灾难'],
    director: '詹姆斯·卡梅隆',
    cast: ['莱昂纳多·迪卡普里奥', '凯特·温斯莱特'],
    description:
      '1912年，号称"永不沉没"的泰坦尼克号从英国南安普顿港出发驶往美国纽约。贫穷的艺术家杰克和上流社会的贵族女子露丝在船上相遇并坠入爱河。然而，当这艘巨轮撞上冰山后，他们的爱情面临着生死考验。',
    poster: 'https://picsum.photos/seed/titanic/400/600',
    backdrop: 'https://picsum.photos/seed/titanic-bg/1920/800',
    category: '爱情',
    topRated: true,
  },
];

export const categories = [
  { id: 'all', name: '全部' },
  { id: 'action', name: '动作' },
  { id: 'scifi', name: '科幻' },
  { id: 'drama', name: '剧情' },
  { id: 'comedy', name: '喜剧' },
  { id: 'animation', name: '动画' },
  { id: 'suspense', name: '悬疑' },
  { id: 'romance', name: '爱情' },
  { id: 'fantasy', name: '奇幻' },
  { id: 'crime', name: '犯罪' },
];

export const categoryMap: Record<string, string> = {
  all: '全部',
  action: '动作',
  scifi: '科幻',
  drama: '剧情',
  comedy: '喜剧',
  animation: '动画',
  suspense: '悬疑',
  romance: '爱情',
  fantasy: '奇幻',
  crime: '犯罪',
};

export function getMoviesByCategory(categoryId: string): Movie[] {
  if (categoryId === 'all') return movies;
  const categoryName = categoryMap[categoryId];
  if (!categoryName) return movies;
  return movies.filter((m) => m.category === categoryName);
}

export function searchMovies(query: string): Movie[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];
  return movies.filter(
    (m) =>
      m.title.toLowerCase().includes(lower) ||
      m.originalTitle?.toLowerCase().includes(lower) ||
      m.director.toLowerCase().includes(lower) ||
      m.cast.some((c) => c.toLowerCase().includes(lower)) ||
      m.genres.some((g) => g.toLowerCase().includes(lower))
  );
}

export function getMovieById(id: number): Movie | undefined {
  return movies.find((m) => m.id === id);
}

export function getRelatedMovies(movieId: number, limit = 6): Movie[] {
  const movie = getMovieById(movieId);
  if (!movie) return movies.slice(0, limit);
  return movies
    .filter(
      (m) =>
        m.id !== movieId &&
        (m.genres.some((g) => movie.genres.includes(g)) || m.category === movie.category)
    )
    .slice(0, limit);
}
