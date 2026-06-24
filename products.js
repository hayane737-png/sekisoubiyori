// =============================================
// 積層日和 — 商品データ
// 商品の追加・編集・削除はここだけ変更すればOK
// =============================================
//
// 【写真エリア④】商品カード・商品詳細モーダルの写真
//
// 各商品に "image" プロパティを追加すると写真が表示されます。
// 現在は shape プロパティに基づくSVGイラストが表示されています。
//
// ▼ 写真を追加する方法:
// 各商品オブジェクトに image プロパティを追加してください。
//
// 例）
// {
//   id: "tape-stand",
//   name: "マステの特等席スタンド",
//   ...
//   image: "images/tape-stand.jpg",  ← これを追加
// }
//
// ▼ 画像ファイルの置き場所:
// GitHubリポジトリに「images」フォルダを作成して
// その中に写真を入れてください。
//
// ▼ 推奨する写真の内容（各商品2種類あると理想的）:
//   白背景写真  → 商品カードに使用（例: tape-stand-white.jpg）
//   生活感写真  → 詳細モーダルに使用（例: tape-stand-life.jpg）
//
// ▼ 推奨サイズ:
//   商品カード用  : 横600px × 縦560px（横長）
//   詳細モーダル用: 正方形 600px × 600px 以上
//
// ※ imageプロパティを追加したらscript.jsのart()関数も
//   imgタグを返すよう更新が必要です。
//   必要な場合はClaudeに「商品写真を表示できるようにして」
//   と伝えてください。
// =============================================
const products = [
  {
    id: "tape-stand",
    name: "マステの特等席スタンド",
    category: "tape",
    categoryLabel: "マステ周り",
    description: "お気に入りのマスキングテープを、選びやすく飾れるスタンド。",
    detail: "横並びでも積み重ねてもかわいく見える高さに整えました。机の上や棚に置いたとき、柄が自然に目に入る角度です。",
    price: 1800,
    colors: ["#fff8f2", "#edd9cd", "#e6e0d2"],
    shape: "tape",
    soldOut: false,
  },
  {
    id: "lip-holder",
    name: "リップの小さな居場所",
    category: "lip",
    categoryLabel: "リップ周り",
    description: "毎日使うリップを、一本ずつきれいに立てておけるホルダー。",
    detail: "朝の支度で手に取りやすく、置いたままでも生活感が出にくい丸みのある形。洗面台にもデスクにもなじみます。",
    price: 1400,
    colors: ["#faf8f5", "#edd9cd", "#c5957a"],
    shape: "lip",
    soldOut: false,
  },
  {
    id: "ring-rest",
    name: "リングレスト",
    category: "accessory",
    categoryLabel: "アクセサリー周り",
    description: "外したリングをそっと預けられる、小さな台座。",
    detail: "指輪のカーブに沿うように、やわらかな傾斜をつけました。玄関やベッドサイドの定位置づくりに。",
    price: 1200,
    colors: ["#fffdfb", "#f0ede6", "#edd9cd"],
    shape: "ring",
    soldOut: false,
  },
  {
    id: "mini-tray",
    name: "余白のミニトレイ",
    category: "accessory",
    categoryLabel: "アクセサリー周り",
    description: "ピアスやヘアピンをまとめる、浅めのアクセサリートレイ。",
    detail: "底面のゆるやかな凹みで、小物が散らばりにくい設計。白背景の写真にも合う静かな佇まいです。",
    price: 1600,
    colors: ["#faf8f5", "#e6e0d2", "#edd9cd"],
    shape: "tray",
    soldOut: false,
  },
  {
    id: "tape-tower",
    name: "マステタワー",
    category: "tape",
    categoryLabel: "マステ周り",
    description: "縦に重ねて飾れる、コレクション向けのマステ収納。",
    detail: "省スペースでも柄が見えるように、柱の太さと台座の安定感を調整しました。複数色で組み合わせても楽しめます。",
    price: 2200,
    colors: ["#fff8f2", "#edd9cd", "#c5957a"],
    shape: "tower",
    soldOut: true,
  },
  {
    id: "brush-cup",
    name: "ブラシとリップのカップ",
    category: "lip",
    categoryLabel: "リップ周り",
    description: "リップ、細いブラシ、ペンをまとめられる軽やかなカップ。",
    detail: "縁を薄く、底を少し重めに。見た目は繊細でも倒れにくいバランスを目指しました。",
    price: 1900,
    colors: ["#faf8f5", "#f0ede6", "#edd9cd"],
    shape: "cup",
    soldOut: false,
  },
];
