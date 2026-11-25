// Aldridge & Wren LLP: a fictional law firm. Every name, number and address is invented.
import type { Rec } from '../../lib/i18n';

export const C = {
  name: 'Aldridge & Wren LLP',
  phone: '+1 (555) 010-0142',
  email: 'counsel@example.com',
  address: { en: '200 Granite Row, Suite 1800, Harbourview', zh: 'Harbourview 市 Granite Row 200 號 1800 室' } as Rec,
  hours: { en: 'Monday – Friday, 8:30 – 18:00', zh: '星期一至五 8:30 – 18:00' } as Rec,
  tagline: { en: 'Counsel for the matters that define you', zh: '為攸關重大的事務提供法律意見' } as Rec,
  metaDescription: {
    en: 'Aldridge & Wren LLP is a boutique law firm advising businesses and families on corporate, litigation, real estate, family and estate matters.',
    zh: 'Aldridge & Wren LLP 是一所精品律師事務所，為企業及家庭提供公司、訴訟、物業、家事及遺產方面的法律意見。',
  },
  demo: { en: 'Demonstration website with fictional content. Not a real law firm and not legal advice.', zh: '示範網站，內容全屬虛構，並非真實律師事務所，亦不構成法律意見。' } as Rec,
  nav: [
    { path: '/', label: { en: 'Home', zh: '首頁' } },
    { path: '/practice/', label: { en: 'Practice Areas', zh: '業務範疇' } },
    { path: '/attorneys/', label: { en: 'Our Attorneys', zh: '我們的律師' } },
    { path: '/insights/', label: { en: 'Insights', zh: '專欄' } },
    { path: '/contact/', label: { en: 'Contact', zh: '聯絡' } },
  ],
  cta: { en: 'Request a consultation', zh: '預約諮詢' } as Rec,
  hero: {
    eyebrow: { en: 'Established 1987 · Harbourview', zh: '創立於 1987 年 · Harbourview' } as Rec,
    title: { en: 'Counsel for the matters that define you.', zh: '為攸關重大的事務，提供可靠的法律意見。' } as Rec,
    lead: {
      en: 'A boutique firm of forty lawyers advising founders, boards and families through the transactions, disputes and decisions that shape a lifetime.',
      zh: '四十位律師組成的精品事務所，陪伴創辦人、董事會及家庭處理影響一生的交易、爭議與決定。',
    } as Rec,
    seePractice: { en: 'Our practice', zh: '業務範疇' } as Rec,
  },
  stats: [
    { n: '37', t: { en: 'years in practice', zh: '年執業經驗' } },
    { n: '40', t: { en: 'lawyers', zh: '位律師' } },
    { n: '1,200', suffix: '+', t: { en: 'matters a year', zh: '宗年度案件' } },
    { n: '9', t: { en: 'of 10 clients return', zh: '成客戶再度委託' } },
  ],
  intro: {
    eyebrow: { en: 'The firm', zh: '事務所' } as Rec,
    title: { en: 'Senior attention on every file.', zh: '每宗案件，都有資深律師親力跟進。' } as Rec,
    body: [
      { en: 'Aldridge & Wren was founded on a simple belief: clients are best served when the lawyer who advises them is also the lawyer who has done the work. We keep our teams small, our partners close to the matter and our advice plain.', zh: 'Aldridge & Wren 憑一個簡單信念創立：提供意見的律師，也應該是親手處理案件的律師。我們讓團隊保持精簡，合夥人貼近每宗案件，意見清晰直接。' },
      { en: 'Whether we are closing a financing, defending a claim or settling a family estate, you will always know who is responsible, what happens next and what it will cost.', zh: '無論是完成融資、抗辯索償，還是處理家族遺產，您都清楚知道由誰負責、下一步是什麼、需要多少費用。' },
    ] as Rec[],
    link: { en: 'Meet our attorneys', zh: '認識我們的律師' } as Rec,
  },
  practiceTitle: { en: 'Where we advise', zh: '我們的專長' } as Rec,
  practiceLead: { en: 'Six practice areas, each led by a partner with decades in the field.', zh: '六大業務範疇，每個範疇均由擁有數十年經驗的合夥人帶領。' } as Rec,
  areas: [
    {
      id: 'corporate',
      name: { en: 'Corporate & Commercial', zh: '公司及商業' },
      short: { en: 'Formations, financings, shareholder agreements and acquisitions for growing companies.', zh: '為成長中的企業處理成立、融資、股東協議及收購。' },
      matters: [
        { en: 'Company formation and governance', zh: '公司成立及管治' },
        { en: 'Venture and growth financing', zh: '創投及增長融資' },
        { en: 'Mergers, acquisitions and divestitures', zh: '併購及出售' },
        { en: 'Commercial contracts and licensing', zh: '商業合約及授權' },
      ],
      image: 'boardroom',
    },
    {
      id: 'litigation',
      name: { en: 'Litigation & Dispute Resolution', zh: '訴訟及爭議解決' },
      short: { en: 'Trial advocacy, arbitration and mediation, with an early focus on resolving the dispute.', zh: '出庭訴訟、仲裁及調解，並盡早尋求解決爭議。' },
      matters: [
        { en: 'Commercial and contract disputes', zh: '商業及合約糾紛' },
        { en: 'Shareholder and partnership disputes', zh: '股東及合夥糾紛' },
        { en: 'Arbitration and mediation', zh: '仲裁及調解' },
        { en: 'Appeals', zh: '上訴' },
      ],
      image: 'detail',
    },
    {
      id: 'real-estate',
      name: { en: 'Real Estate', zh: '物業地產' },
      short: { en: 'Purchases, leases and development, from a first home to a commercial portfolio.', zh: '從首次置業到商業物業組合，處理買賣、租賃及發展項目。' },
      matters: [
        { en: 'Residential and commercial purchases', zh: '住宅及商業物業買賣' },
        { en: 'Commercial leasing', zh: '商業租賃' },
        { en: 'Development and construction', zh: '發展及建築' },
        { en: 'Mortgage and secured lending', zh: '按揭及有抵押借貸' },
      ],
      image: 'lobby',
    },
    {
      id: 'family',
      name: { en: 'Family Law', zh: '家事法' },
      short: { en: 'Separation, parenting and property matters handled with discretion and care.', zh: '以審慎細心的態度處理分居、子女及財產事宜。' },
      matters: [
        { en: 'Separation agreements and divorce', zh: '分居協議及離婚' },
        { en: 'Parenting and support', zh: '子女安排及贍養費' },
        { en: 'Marriage and cohabitation agreements', zh: '婚前協議及同居協議' },
        { en: 'Mediation and collaborative law', zh: '調解及協作法律' },
      ],
      image: 'family',
    },
    {
      id: 'employment',
      name: { en: 'Employment & Labour', zh: '僱傭及勞工' },
      short: { en: 'Advice for employers and executives on contracts, restructuring and disputes.', zh: '為僱主及高級行政人員提供合約、重組及糾紛方面的意見。' },
      matters: [
        { en: 'Executive employment agreements', zh: '高管僱傭協議' },
        { en: 'Restructuring and terminations', zh: '重組及解僱' },
        { en: 'Workplace investigations', zh: '職場調查' },
        { en: 'Restrictive covenants', zh: '限制性條款' },
      ],
      image: 'employment',
    },
    {
      id: 'estates',
      name: { en: 'Wills, Trusts & Estates', zh: '遺囑、信託及遺產' },
      short: { en: 'Planning for the next generation, and steady guidance when an estate must be administered.', zh: '為下一代作長遠規劃，並在處理遺產時提供穩妥指引。' },
      matters: [
        { en: 'Wills and powers of attorney', zh: '遺囑及授權書' },
        { en: 'Family trusts and succession planning', zh: '家族信託及傳承規劃' },
        { en: 'Estate administration', zh: '遺產管理' },
        { en: 'Estate disputes', zh: '遺產糾紛' },
      ],
      image: 'estates',
    },
  ],
  attorneysTitle: { en: 'The people you will work with', zh: '與您合作的律師' } as Rec,
  attorneys: [
    {
      name: 'Jonathan Aldridge', role: { en: 'Founding Partner · Corporate', zh: '創辦合夥人 · 公司法' }, image: 'portrait-1',
      bio: { en: 'Jonathan founded the firm in 1987 and still leads its corporate practice. He has advised on more than two hundred transactions, from first financings to cross-border acquisitions.', zh: 'Jonathan 於 1987 年創辦事務所，至今仍帶領公司法團隊，曾為二百多宗交易提供意見，由首輪融資到跨境收購均有涉獵。' },
      facts: [{ en: 'Admitted 1989', zh: '1989 年取得律師資格' }, { en: 'LL.B., Eastbrook University', zh: 'Eastbrook 大學法學士' }, { en: 'Board member, Harbourview Arts Trust', zh: 'Harbourview 藝術信託董事' }],
    },
    {
      name: 'Margaret Wren', role: { en: 'Managing Partner · Litigation', zh: '管理合夥人 · 訴訟' }, image: 'portrait-2',
      bio: { en: 'Margaret has argued before every level of court and is known for preparing a case so thoroughly that many settle before trial. She chairs the firm.', zh: 'Margaret 曾在各級法院出庭，以準備周詳見稱，不少案件於開審前已達成和解。她同時擔任事務所主席。' },
      facts: [{ en: 'Admitted 1993', zh: '1993 年取得律師資格' }, { en: 'LL.M., Kingsmere University', zh: 'Kingsmere 大學法學碩士' }, { en: 'Fellow, Institute of Trial Advocates', zh: '訴訟律師學會院士' }],
    },
    {
      name: 'Daniel Cho', role: { en: 'Partner · Real Estate & Finance', zh: '合夥人 · 物業及融資' }, image: 'portrait-3',
      bio: { en: 'Daniel acts for developers, lenders and landlords on purchases, leases and construction financing, and enjoys turning a complicated deal into a clear checklist.', zh: 'Daniel 為發展商、貸款機構及業主處理買賣、租賃及建築融資，擅長將複雜交易化為清晰的行動清單。' },
      facts: [{ en: 'Admitted 2012', zh: '2012 年取得律師資格' }, { en: 'J.D., Westfield University', zh: 'Westfield 大學法律博士' }, { en: 'English, Cantonese, Mandarin', zh: '英語、粵語、普通話' }],
    },
    {
      name: 'Priya Nair', role: { en: 'Counsel · Family & Estates', zh: '顧問律師 · 家事及遺產' }, image: 'portrait-4',
      bio: { en: 'Priya advises families through separation, succession and the sensitive conversations in between, combining legal precision with a calm, practical manner.', zh: 'Priya 陪伴家庭處理分居、傳承及其間各種敏感對話，將嚴謹的法律判斷與沉着務實的態度結合。' },
      facts: [{ en: 'Admitted 2014', zh: '2014 年取得律師資格' }, { en: 'LL.B., Eastbrook University', zh: 'Eastbrook 大學法學士' }, { en: 'Accredited family mediator', zh: '認可家事調解員' }],
    },
  ],
  insightsTitle: { en: 'Insights', zh: '專欄' } as Rec,
  insightsLead: { en: 'Short, plain-language notes from our lawyers on questions clients ask us most.', zh: '律師撰寫的短文，用淺白語言回應客戶最常問的問題。' } as Rec,
  articles: [
    {
      slug: 'shareholder-agreements', date: '2026-10-14', area: { en: 'Corporate', zh: '公司法' }, image: 'boardroom', author: 'Jonathan Aldridge',
      title: { en: 'What directors should ask before signing a shareholder agreement', zh: '董事簽署股東協議前應該問的問題' },
      excerpt: { en: 'The clauses that matter most are rarely the ones negotiated first.', zh: '最關鍵的條款，往往不是最先談判的那幾條。' },
      body: [
        { en: 'Most founders spend their negotiating energy on valuation and board seats. The clauses that decide whether a company survives a disagreement, such as deadlock, drag-along rights and what happens when a shareholder leaves, tend to be left until the end.', zh: '大多數創辦人把談判精力放在估值與董事席位上，但真正決定公司能否度過分歧的條款，例如僵局、拖售權及股東離場安排，往往留到最後才處理。' },
        { en: 'Before you sign, ask three questions. How is a deadlock resolved, and by whom? Can the company or the other shareholders buy me out, and at what price formula? And what do I owe the company if I walk away?', zh: '簽署前先問三個問題：僵局如何解決、由誰決定？公司或其他股東能否買斷我的股份，價格如何計算？如果我離開，對公司還有什麼責任？' },
        { en: 'A clear answer to each, written down in plain words, is worth more than any clause borrowed from a template.', zh: '每個問題都有用淺白文字寫下的明確答案，比任何照搬範本的條款更有價值。' },
      ],
    },
    {
      slug: 'mediation-or-court', date: '2026-09-02', area: { en: 'Litigation', zh: '訴訟' }, image: 'detail', author: 'Margaret Wren',
      title: { en: 'Mediation or the courtroom? Choosing the right forum', zh: '調解還是上庭？如何選擇合適的解決途徑' },
      excerpt: { en: 'Winning is not always the same as resolving.', zh: '勝訴並不一定等於解決問題。' },
      body: [
        { en: 'A trial gives you a decision; mediation gives you an agreement. Which is better depends on what you need once the dispute is over.', zh: '審訊給您一個裁決，調解則給您一份協議。哪一個更好，取決於爭議完結後您需要什麼。' },
        { en: 'If the relationship matters, because the other side is a supplier, a partner or a relative, mediation usually preserves more of it. If you need a binding precedent or the other side will not engage, the courtroom may be the only option.', zh: '如果關係仍然重要，例如對方是供應商、合夥人或親人，調解通常更能保存關係；如果您需要具約束力的先例，或對方拒絕協商，上庭可能是唯一選擇。' },
        { en: 'We recommend a short, honest assessment of both routes in the first month, before costs and positions harden.', zh: '我們建議在首個月內，於成本與立場變得僵化之前，坦誠地評估兩條途徑。' },
      ],
    },
    {
      slug: 'commercial-lease-clauses', date: '2026-07-21', area: { en: 'Real estate', zh: '物業' }, image: 'lobby', author: 'Daniel Cho',
      title: { en: 'Buying your first commercial property: five clauses worth negotiating', zh: '首次購買商業物業：值得爭取的五項條款' },
      excerpt: { en: 'Small drafting points can move the price more than the headline number.', zh: '細微的條文措辭，對價格的影響可能比標價更大。' },
      body: [
        { en: 'The purchase price is the number everyone discusses, but it is rarely the number that decides whether the investment works.', zh: '買價是人人都討論的數字，卻很少是決定投資成敗的數字。' },
        { en: 'Look closely at the conditions for financing and inspection, the allocation of environmental risk, the assignment of existing leases, the adjustments on closing and the remedies if the seller delays.', zh: '請細看融資及驗樓條件、環境風險的分配、現有租約的轉讓、交割時的調整，以及賣方延遲時的補救措施。' },
        { en: 'Each can usually be improved if raised early and in writing.', zh: '只要及早以書面提出，這些條款通常都有改善空間。' },
      ],
    },
    {
      slug: 'updating-your-will', date: '2026-05-30', area: { en: 'Estates', zh: '遺產' }, image: 'library', author: 'Priya Nair',
      title: { en: 'A plain-language guide to updating your will after a major life change', zh: '重大人生轉變後更新遺囑的簡明指南' },
      excerpt: { en: 'Marriage, a new child or a move can quietly make an old will wrong.', zh: '結婚、添丁或搬遷，都可能令舊遺囑悄悄變得不合時宜。' },
      body: [
        { en: 'A will is a snapshot of your family and finances on the day you sign it. When either changes, the snapshot goes out of date.', zh: '遺囑是您簽署當日家庭與財務狀況的快照；兩者一旦改變，快照便過時了。' },
        { en: 'Review it after a marriage or separation, the birth of a child, a significant change in assets, a move to another province, or the death of a named executor or beneficiary.', zh: '結婚或分居、子女出生、資產大幅變動、遷往其他省份，或指定的執行人或受益人去世後，都應檢視遺囑。' },
        { en: 'Most updates are short. A brief conversation now is far easier than a dispute later.', zh: '大多數更新都很簡短。現在花少許時間傾談，遠比日後的糾紛容易。' },
      ],
    },
  ],
  contact: {
    title: { en: 'Request a consultation', zh: '預約諮詢' } as Rec,
    lead: { en: 'Tell us briefly what you need. A partner will reply within one business day.', zh: '請簡述您的需要，合夥人會在一個工作天內回覆。' } as Rec,
    form: {
      title: { en: 'Send us a message', zh: '給我們留言' },
      first: { en: 'First name', zh: '名' }, last: { en: 'Last name', zh: '姓' },
      email: { en: 'Email', zh: '電郵' }, phone: { en: 'Phone', zh: '電話' },
      area: { en: 'Area of law', zh: '法律範疇' }, message: { en: 'How can we help?', zh: '我們可以如何協助？' },
      consent: { en: 'I understand that sending this message does not create a lawyer-client relationship, and that I should not include confidential details.', zh: '我明白提交此訊息並不建立律師與客戶關係，亦不應在訊息內附上機密資料。' },
      submit: { en: 'Send message', zh: '發送訊息' },
      success: { en: 'Thank you. Your email app should open with the message ready to send.', zh: '多謝。您的電郵程式應會開啟，訊息已準備好發送。' },
    },
    offices: { en: 'Our office', zh: '辦事處' } as Rec,
  },
  strings: {
    menu: { en: 'Menu', zh: '選單' }, language: { en: 'Language', zh: '語言' }, skip: { en: 'Skip to content', zh: '跳至內容' },
    explore: { en: 'Explore', zh: '探索' }, contact: { en: 'Contact', zh: '聯絡' }, demo: { en: 'Demo', zh: '示範' },
    read: { en: 'Read the article', zh: '閱讀全文' }, back: { en: 'All insights', zh: '全部專欄' }, by: { en: 'By', zh: '作者：' },
    matters: { en: 'Typical matters', zh: '常見事項' },
  },
};
