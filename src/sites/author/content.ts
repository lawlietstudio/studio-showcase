// Iris Calloway: a fictional novelist and essayist. Every book, review, event and person is invented.
import type { Rec } from '../../lib/i18n';

export const C = {
  name: 'Iris Calloway',
  phone: '',
  email: 'iris@example.com',
  tagline: { en: 'Novelist and essayist', zh: '小說家及散文家' } as Rec,
  metaDescription: { en: 'Iris Calloway writes novels and essays about the places we keep returning to. Read about her books, upcoming readings and the writing life.', zh: 'Iris Calloway 的小說與散文，寫的是我們一再回望的地方。了解她的作品、近期朗讀會及寫作生活。' },
  demo: { en: 'Demonstration website. Author, books, reviews and events are fictional.', zh: '示範網站。作者、書籍、書評及活動全屬虛構。' } as Rec,
  nav: [
    { path: '/', label: { en: 'Home', zh: '首頁' } },
    { path: '/books/', label: { en: 'Books', zh: '作品' } },
    { path: '/about/', label: { en: 'About', zh: '關於作者' } },
    { path: '/events/', label: { en: 'Events', zh: '活動' } },
    { path: '/contact/', label: { en: 'Contact', zh: '聯絡' } },
  ],
  cta: { en: 'Join the newsletter', zh: '訂閱通訊' } as Rec,
  hero: {
    eyebrow: { en: 'New book · The Orchard Year', zh: '新書 · The Orchard Year' } as Rec,
    title: { en: 'Stories about the places we keep returning to.', zh: '關於我們一再回望之地的故事。' } as Rec,
    lead: { en: 'Iris Calloway is the author of two novels, a collection of essays and, this autumn, a memoir of a year spent restoring her grandfather’s orchard.', zh: 'Iris Calloway 著有兩部小說、一部散文集，今年秋天更推出回憶錄，記述她用一年時間修復祖父果園的故事。' } as Rec,
    latest: { en: 'The latest book', zh: '最新作品' } as Rec,
  },
  books: [
    { slug: 'the-orchard-year', year: 2026, kind: { en: 'Memoir', zh: '回憶錄' }, pages: 288, cover: 'cover-orchard', title: 'The Orchard Year', sub: { en: 'A memoir of fruit, family and starting over', zh: '關於果實、家人與重新開始的回憶錄' }, blurb: [
      { en: 'When Iris inherits her grandfather’s neglected orchard, she plans a quiet weekend of clearing brush. She stays for a year. Season by season, she learns to prune, to wait, and to forgive the people who left the trees to fend for themselves.', zh: '當 Iris 繼承祖父荒廢的果園，她原本只打算花一個週末清理雜草，結果留了下來整整一年。她隨四季學習修剪與等待，也學會原諒那些任由樹木自生自滅的人。' },
      { en: 'Warm, funny and quietly devastating, The Orchard Year is a book about inheritance in every sense.', zh: '《The Orchard Year》溫暖、幽默又默默動人，是一本關於「繼承」的書，從各種意義而言皆然。' },
    ], excerpt: { en: 'The first thing my grandfather’s orchard taught me was that nothing in it was waiting for me.', zh: '祖父的果園教我的第一件事，就是這裡沒有任何東西在等我。' }, praise: { en: '“A beautiful, unhurried book.” — The Harbourview Review', zh: '「一本美麗而從容的書。」—《Harbourview 書評》' } },
    { slug: 'a-small-weather', year: 2023, kind: { en: 'Essays', zh: '散文集' }, pages: 224, cover: 'cover-weather', title: 'A Small Weather', sub: { en: 'Essays on rain, kitchens and paying attention', zh: '關於雨、廚房與專注的散文' }, blurb: [
      { en: 'Fourteen essays that begin with something small, such as a teacup, a leak in the roof or a neighbour’s radio, and widen until they hold a whole life.', zh: '十四篇散文，由微小的事物開始，例如一隻茶杯、屋頂的漏水或鄰居的收音機，然後漸漸擴闊，容納整個人生。' },
      { en: 'Calloway writes with the patience of someone who believes attention is a form of love.', zh: 'Calloway 以耐性寫作，她相信專注本身就是一種愛。' },
    ], excerpt: { en: 'It rained for nine days, and on the tenth I finally noticed the sound.', zh: '雨連下了九天，到了第十天，我才終於留意到那聲音。' }, praise: { en: '“Wise, funny and exact.” — Northern Letters', zh: '「睿智、風趣而精準。」—《北方信箋》' } },
    { slug: 'letters-to-the-lighthouse', year: 2021, kind: { en: 'Novel', zh: '小說' }, pages: 336, cover: 'cover-lighthouse', title: 'Letters to the Lighthouse', sub: { en: 'A novel of fog, letters and a very long marriage', zh: '關於濃霧、書信與漫長婚姻的小說' }, blurb: [
      { en: 'Every Sunday for forty years, Marguerite has written to her husband, the keeper of a remote lighthouse. When the letters stop, her daughter travels to the coast to find out why.', zh: '四十年來，Marguerite 每個星期天都寫信給在偏遠燈塔工作的丈夫。當信件突然中斷，女兒前往海岸探究原因。' },
      { en: 'A slow, absorbing novel about what couples keep from each other, and what they keep for each other.', zh: '一部緩慢而引人入勝的小說，寫夫妻之間隱瞞了什麼，又為彼此留下了什麼。' },
    ], excerpt: { en: 'The fog came in at four, as it always did, and with it the first of the letters.', zh: '霧在四點湧來，一如往常，隨之而來的是第一封信。' }, praise: { en: '“Quietly unforgettable.” — Coastline Books', zh: '「靜靜地令人難忘。」—《海岸線圖書》' } },
    { slug: 'the-salt-road', year: 2019, kind: { en: 'Novel', zh: '小說' }, pages: 312, cover: 'cover-salt-road', title: 'The Salt Road', sub: { en: 'A debut novel about a journey that goes the wrong way', zh: '關於一場走錯方向的旅程的首部小說' }, blurb: [
      { en: 'Two sisters set out across the salt flats to scatter their father’s ashes. By the second night, only one of them knows where they are really going.', zh: '兩姊妹穿越鹽灘，準備撒下父親的骨灰。到了第二個晚上，只有一人知道她們真正的目的地。' },
      { en: 'The Salt Road was a finalist for the Harbourview First Novel Prize.', zh: '《The Salt Road》入圍 Harbourview 首部小說獎。' },
    ], excerpt: { en: 'We left before dawn so that the road would not have time to change its mind.', zh: '我們在黎明前出發，免得道路有時間改變主意。' }, praise: { en: '“A debut of rare confidence.” — The Daily Page', zh: '「少有的自信首作。」—《每日書頁》' } },
  ],
  booksTitle: { en: 'Books', zh: '作品' } as Rec,
  booksLead: { en: 'Two novels, a collection of essays and a memoir.', zh: '兩部小說、一部散文集及一部回憶錄。' } as Rec,
  buy: { en: 'Where to buy', zh: '購買途徑' } as Rec,
  retailers: [{ en: 'Independent bookshops', zh: '獨立書店' }, { en: 'Online retailers', zh: '網上書店' }, { en: 'Audiobook', zh: '有聲書' }] as Rec[],
  excerptLabel: { en: 'From the first page', zh: '開篇文字' } as Rec,
  facts: { year: { en: 'Published', zh: '出版年份' }, pages: { en: 'Pages', zh: '頁數' }, kind: { en: 'Type', zh: '類型' } },
  praiseTitle: { en: 'What readers and critics say', zh: '讀者與評論怎麼說' } as Rec,
  praise: [
    { text: { en: 'Calloway writes about ordinary places until they become unforgettable.', zh: 'Calloway 筆下的尋常地方，寫到最後都變得難以忘懷。' }, who: 'The Harbourview Review' },
    { text: { en: 'The most patient and generous prose I read all year.', zh: '我今年讀過最有耐性、最慷慨的文字。' }, who: 'Northern Letters' },
    { text: { en: 'I finished it in a weekend and then started it again.', zh: '我一個週末讀完，然後又重讀一遍。' }, who: { en: 'A reader in Eastbrook', zh: 'Eastbrook 一位讀者' } },
  ],
  about: {
    title: { en: 'About Iris', zh: '關於 Iris' } as Rec,
    lead: { en: 'Iris Calloway writes novels and essays about home, memory and the slow work of paying attention.', zh: 'Iris Calloway 的小說與散文，寫家、記憶，以及緩慢而專注的功夫。' } as Rec,
    bio: [
      { en: 'Iris grew up in a coastal town, the daughter of a schoolteacher and a ferry mechanic. She wrote her first story on the back of a ferry timetable, and has been writing on whatever is nearest ever since.', zh: 'Iris 在海邊小鎮長大，父親是渡輪技工，母親是教師。她第一個故事寫在渡輪時間表的背面，從此便在手邊任何東西上寫作。' },
      { en: 'Her first novel, The Salt Road, was a finalist for the Harbourview First Novel Prize. Her essays have appeared in literary journals on both sides of the ocean, and A Small Weather won the Eastbrook Essay Award.', zh: '她的首部小說《The Salt Road》入圍 Harbourview 首部小說獎，散文發表於大洋兩岸的文學雜誌，《A Small Weather》更獲 Eastbrook 散文獎。' },
      { en: 'She lives and writes in an old farmhouse with an orchard, two cats and a typewriter she is not entirely sure she needs.', zh: '她住在有果園的老農舍裡寫作，與兩隻貓和一部她不太確定是否需要的打字機為伴。' },
    ] as Rec[],
    awardsTitle: { en: 'Recognition', zh: '獲獎及入圍' } as Rec,
    awards: [
      { year: '2019', text: { en: 'Finalist, Harbourview First Novel Prize', zh: 'Harbourview 首部小說獎入圍' } },
      { year: '2021', text: { en: 'Longlisted, Coastline Fiction Award', zh: '海岸線小說獎長名單' } },
      { year: '2023', text: { en: 'Winner, Eastbrook Essay Award', zh: 'Eastbrook 散文獎得主' } },
      { year: '2026', text: { en: 'The Orchard Year, a Spring Reading Society pick', zh: '《The Orchard Year》入選春季閱讀會推薦' } },
    ],
    qaTitle: { en: 'A few questions', zh: '幾個問題' } as Rec,
    qa: [
      { q: { en: 'Where do you write?', zh: '您在哪裡寫作？' }, a: { en: 'At a table by the kitchen window, usually before anyone else is awake. Rain helps.', zh: '在廚房窗邊的桌子，通常在其他人起床之前。下雨天更好。' } },
      { q: { en: 'Do you plan your books?', zh: '您會預先計劃書的內容嗎？' }, a: { en: 'Only the ending, and I usually change it. I plan the weather first.', zh: '只計劃結局，而且通常會改。我最先計劃的是天氣。' } },
      { q: { en: 'What are you reading now?', zh: '您現在在讀什麼？' }, a: { en: 'Old gardening manuals. They are better written than most novels.', zh: '舊的園藝手冊。它們比大部分小說寫得更好。' } },
    ],
  },
  eventsTitle: { en: 'Readings and events', zh: '朗讀會及活動' } as Rec,
  eventsLead: { en: 'Come and say hello. Most events are free and end with a signing.', zh: '歡迎前來打個招呼。大部分活動免費，並設簽名環節。' } as Rec,
  events: [
    { day: '14', month: { en: 'Nov', zh: '11 月' }, title: { en: 'The Orchard Year: launch reading', zh: '《The Orchard Year》新書朗讀會' }, where: { en: 'Corner Books, Harbourview · 19:00', zh: 'Harbourview Corner 書店 · 19:00' } },
    { day: '22', month: { en: 'Nov', zh: '11 月' }, title: { en: 'In conversation: writing about family', zh: '對談：書寫家人' }, where: { en: 'Eastbrook Literary Festival · 15:30', zh: 'Eastbrook 文學節 · 15:30' } },
    { day: '05', month: { en: 'Dec', zh: '12 月' }, title: { en: 'Workshop: one small thing, one page', zh: '工作坊：一件小事，一頁文字' }, where: { en: 'Riverside Library · 10:00', zh: 'Riverside 圖書館 · 10:00' } },
    { day: '12', month: { en: 'Dec', zh: '12 月' }, title: { en: 'Online book club with Iris', zh: '與 Iris 的網上讀書會' }, where: { en: 'Video call · 20:00', zh: '視像通話 · 20:00' } },
  ],
  rsvp: { en: 'RSVP', zh: '報名' } as Rec,
  newsletter: { title: { en: 'A letter, now and then', zh: '偶爾寫給您的一封信' } as Rec, text: { en: 'News of new books, readings and what is growing in the orchard. Six letters a year, never more.', zh: '新書、朗讀會及果園近況。每年六封，絕不多寄。' } as Rec },
  contact: {
    title: { en: 'Get in touch', zh: '聯絡' } as Rec,
    lead: { en: 'For events, press and rights enquiries, or just to say hello.', zh: '活動、傳媒及版權查詢，或只是打個招呼。' } as Rec,
    form: {
      title: { en: 'Write to Iris', zh: '寫信給 Iris' },
      first: { en: 'First name', zh: '名' }, last: { en: 'Last name', zh: '姓' }, email: { en: 'Email', zh: '電郵' }, phone: { en: 'Phone', zh: '電話' },
      topic: { en: 'Subject', zh: '主題' }, message: { en: 'Your message', zh: '訊息' },
      consent: { en: 'I agree to be contacted about my message.', zh: '我同意就我的訊息獲聯絡。' },
      submit: { en: 'Send letter', zh: '寄出信件' },
      success: { en: 'Thank you. Your email app should open with the message ready to send.', zh: '多謝。您的電郵程式應會開啟，訊息已準備好發送。' },
    },
    topics: [{ en: 'Newsletter', zh: '訂閱通訊' }, { en: 'Events and bookings', zh: '活動及邀請' }, { en: 'Press and media', zh: '傳媒查詢' }, { en: 'Rights and translation', zh: '版權及翻譯' }, { en: 'Just saying hello', zh: '打個招呼' }] as Rec[],
  },
  strings: {
    menu: { en: 'Menu', zh: '選單' }, language: { en: 'Language', zh: '語言' }, skip: { en: 'Skip to content', zh: '跳至內容' },
    explore: { en: 'Explore', zh: '探索' }, contact: { en: 'Contact', zh: '聯絡' }, demo: { en: 'Demo', zh: '示範' },
    by: { en: 'by', zh: '作者：' }, readMore: { en: 'Read more', zh: '了解更多' }, back: { en: 'All books', zh: '全部作品' },
  },
};
