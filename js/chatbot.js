/* =====================================================
   チャットボット — エアコンクリーニング専門店向け
   ★ FAQ内容はこのファイルの「FAQ_DB」を編集してください
   ===================================================== */

/* ── FAQ データベース ─────────────────────────────── */
const FAQ_DB = [
  {
    keywords: ['料金', '費用', 'いくら', 'いくらか', 'コスト', '値段', '価格'],
    answer: '料金はサービスにより異なります。<br>壁掛けエアコン：<strong>¥【●,●●●】〜</strong>から承っています。<br>詳細は <a href="price.html">料金ページ</a> をご確認ください。'
  },
  {
    keywords: ['時間', 'どれくらい', '何分', '何時間', '所要'],
    answer: '標準的な壁掛けエアコンの清掃は <strong>約1.5〜2時間</strong> です。<br>天井埋め込み型や業務用は2〜3時間ほどかかる場合があります。'
  },
  {
    keywords: ['エアコン', 'クリーニング', '掃除', '洗浄', 'サービス', '内容', '何'],
    answer: 'エアコンクリーニングでは内部フィルター・熱交換器・送風ファンを高圧洗浄します。<br>カビ・ホコリ・ニオイの原因となる汚れを根こそぎ除去します。<br>詳しくは <a href="index.html#services">サービス紹介</a> をご覧ください。'
  },
  {
    keywords: ['臭い', 'におい', 'カビ', 'くさい', '黒い', 'ほこり'],
    answer: 'エアコン内部のカビ・ホコリが原因のニオイは、高圧洗浄でしっかり除去できます。<br>クリーニング後は清潔な風が出るようになります。<br>お早めのご予約をおすすめします。'
  },
  {
    keywords: ['申し込み', '予約', '申請', '申込', '登録'],
    answer: 'お申し込みは <a href="contact.html">お問い合わせフォーム</a> またはLINEから承っています。<br>ご希望日時・サービス内容をお知らせください。2営業日以内にご連絡いたします。'
  },
  {
    keywords: ['当日', '即日', '急ぎ', 'すぐ', '最短'],
    answer: '最短翌日のご対応が可能です（空き状況による）。<br>お急ぎの場合はお問い合わせフォームで「急ぎ希望」とご記入いただくか、LINEからご相談ください。'
  },
  {
    keywords: ['キャンセル', '解約', 'やめ', '取り消し'],
    answer: 'ご予約のキャンセルは <strong>前日までなら無料</strong> です。<br>当日キャンセルはキャンセル料が発生する場合があります。詳しくはお問い合わせください。'
  },
  {
    keywords: ['エリア', '地域', 'どこ', '対応', '来て', '出張'],
    answer: '【地域名】エリアを中心に対応しています。<br>エリア外の場合も出張費にてご対応できる場合があります。まずはお問い合わせください。'
  },
  {
    keywords: ['支払い', '決済', 'クレジット', '現金', '振込', 'paypay'],
    answer: '現金・クレジットカード・PayPayに対応しています。<br>お支払いは施工完了後にその場でお支払いいただけます。'
  },
  {
    keywords: ['女性', 'レディース', '一人暮らし', '安心', '安全'],
    answer: '女性スタッフによる対応も可能です。お申し込みの際に「女性スタッフ希望」とお知らせください。<br>一人暮らしの方も安心してご利用いただけます。'
  },
  {
    keywords: ['保証', 'アフター', '故障', 'トラブル'],
    answer: '施工後のトラブルにも対応いたします。万が一の際はお気軽にご連絡ください。<br>お客様に安心してご利用いただけるよう、アフターフォローを大切にしています。'
  },
  {
    keywords: ['水回り', '浴室', 'お風呂', 'トイレ', 'キッチン', '換気扇'],
    answer: '水回りのクリーニングも承っています。<br>・浴室クリーニング<br>・キッチン換気扇クリーニング<br>・トイレクリーニング（予定）<br>料金は <a href="price.html">料金ページ</a> をご確認ください。'
  },
  {
    keywords: ['複数', 'まとめ', '台数', '2台', '3台', 'セット'],
    answer: '複数台のご依頼は <strong>セット割引</strong> が適用されます。<br>2台以上の場合はお得になりますので、まずはお問い合わせください。'
  },
  {
    keywords: ['こんにちは', 'はじめまして', 'hello', 'こんばんは', 'おはよう'],
    answer: 'こんにちは！エアコンクリーニング専門店のサポートです🌀<br>お見積もり・予約・サービスについて、お気軽にご質問ください！'
  }
];

/* フォールバック */
const FALLBACK = 'ご質問ありがとうございます。担当スタッフがご回答いたします。<br>お手数ですが <a href="contact.html">お問い合わせフォーム</a> またはLINEよりご連絡ください。2営業日以内にご返答いたします。';

/* クイック質問 */
const QUICK_QUESTIONS = [
  '料金を教えて',
  '所要時間は？',
  '申し込み方法は？',
  '当日対応できる？',
  '女性スタッフ希望',
];

/* ── DOM要素 ──────────────────────────────────────── */
const launcher  = document.querySelector('.chatbot-launcher');
const window_   = document.querySelector('.chatbot-window');
const closeBtn  = document.querySelector('.chatbot-close');
const msgList   = document.querySelector('.chatbot-messages');
const inputEl   = document.querySelector('.chatbot-input');
const sendBtn   = document.querySelector('.chatbot-send');
const quickArea = document.querySelector('.chatbot-quick');

if (launcher && window_ && msgList) {
  let isOpen = false;
  let welcomed = false;

  launcher.addEventListener('click', () => toggleChat());
  closeBtn?.addEventListener('click', () => toggleChat(false));

  function toggleChat(force) {
    isOpen = force !== undefined ? force : !isOpen;
    window_.classList.toggle('open', isOpen);
    const dot = launcher.querySelector('.badge-dot');
    if (dot && isOpen) dot.remove();
    if (isOpen && !welcomed) {
      welcomed = true;
      setTimeout(() => addBotMsg('こんにちは！エアコンクリーニング専門店のサポートです🌀<br>お気軽にご質問ください！'), 400);
    }
  }

  /* クイックボタン */
  if (quickArea) {
    QUICK_QUESTIONS.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'quick-btn';
      btn.textContent = q;
      btn.addEventListener('click', () => sendMessage(q));
      quickArea.appendChild(btn);
    });
  }

  /* 送信 */
  sendBtn?.addEventListener('click', () => {
    const text = inputEl.value.trim();
    if (text) { sendMessage(text); inputEl.value = ''; }
  });
  inputEl?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = inputEl.value.trim();
      if (text) { sendMessage(text); inputEl.value = ''; }
    }
  });

  function sendMessage(text) {
    addUserMsg(text);
    const typing = addTyping();
    setTimeout(() => {
      typing.remove();
      addBotMsg(getAnswer(text));
    }, 900 + Math.random() * 500);
  }

  function getAnswer(text) {
    const lower = text.toLowerCase();
    for (const faq of FAQ_DB) {
      if (faq.keywords.some(k => lower.includes(k))) return faq.answer;
    }
    return FALLBACK;
  }

  function addBotMsg(html) {
    const el = document.createElement('div');
    el.className = 'chat-msg bot';
    el.innerHTML = `<div class="chat-bubble">${html}</div>`;
    msgList.appendChild(el);
    msgList.scrollTop = msgList.scrollHeight;
    return el;
  }

  function addUserMsg(text) {
    const el = document.createElement('div');
    el.className = 'chat-msg user';
    el.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
    msgList.appendChild(el);
    msgList.scrollTop = msgList.scrollHeight;
    return el;
  }

  function addTyping() {
    const el = document.createElement('div');
    el.className = 'chat-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgList.appendChild(el);
    msgList.scrollTop = msgList.scrollHeight;
    return el;
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
}
