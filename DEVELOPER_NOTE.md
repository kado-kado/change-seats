# 席替えアプリ 技術者向けノート

このドキュメントは、Webベースの席替えアプリの内部構造と実装技術についてまとめた技術者向けノートです。HTML/CSS/JavaScript によって構成されています。

---

## ファイル構成

```
root/
├── index.html
├── main.js
├── package.json
├── styles/
│   ├── main.css
│   ├── section-main.css
│   ├── section-settings.css
│   └── sidebar.css
├── scripts/
│   ├── main.js
│   ├── animation.js
│   ├── change-section.js
│   ├── export.js
│   └── hint.js
├── LICENSE
├── README-en.md
└── README.md
```

---

## モジュール別技術概要

### `index.html`

* UI構造のベース。セクションは `Main`, `Settings`, `README`, `Credit`。
* 各設定フォームに hint ボタンを設置し、`alertHint()` で内容説明を提供。

### `main.js`

* `window.onload`で初期化処理。
* ユーザー入力に基づき、生徒データを読み込んで2D座席配列を構築。
* 視力弱者・女子席・削除席などのロジックを反映。
* 最終的に `displaySeats()` によりHTMLに描画。

### `animation.js`

* `animateSeats()`：座席セル（`.seat`）をランダム順で `.show-seat` を付与。
* `setTimeout` + `Math.random()` を用いて自然な動き。
* 遅延単位は `delayUnit = 150` など調整可能。

### `change-section.js`

* `.content-section` の表示制御。クリック時にアクティブセクションを切替。

### `export.js`

* `exportSeatsToCSV()` で `seats2D` 配列をCSV文字列化。
* `Blob + createObjectURL` によりローカルで `seats.csv` をダウンロード。
* UTF-8 形式、Shift-JISは非採用（※必要時に変換要）。

### `hint.js`

* `alertHint(param)` により対象フォームに応じた説明を `alert()`。
* `switch(param)` で分岐管理し、UX補助として機能。

### CSS（スタイルファイル）

* `main.css`：全体の基本スタイル、フォント・テーブル構造など
* `section-*.css`：各セクション固有のデザイン調整
* `sidebar.css`：サイドメニューの色・レイアウト設定
* `.seat`：座席セルの非表示・表示切替アニメーション
* `.show-seat`：表示時に `opacity` / `translateY` アニメーション適用

---

## 処理フロー（概要）

1. **初期表示**：READMEセクションを表示。
2. **ユーザー入力**：フォームで席数、視力、女子席、JSONファイル等を指定。
3. **ファイル読込**：`FileReader`でJSONデータを読み込み、パース。
4. **座席構築**：以下の順でロジック処理：

   * 削除席反映（最後列の左右）
   * 女子席優先配置（視力弱者優先）
   * 前方2列への視力弱者配置（男子・その他）
   * 残りの生徒をランダム配置
5. **描画**：`displaySeats()` → `#seatDisplay` に `<table>` を出力。
6. **アニメーション**：`animateSeats()` が `.seat` に `show-seat` を付与。
7. **CSV出力**：ユーザーがボタンを押せばCSV形式で席情報を保存可能。

---

## 注意点・ベストプラクティス

* **一貫したID管理**：席位置は通し番号（0スタート）で管理
* **視力優先処理は必ず前方列のみ対象**
* **ファイル読み込みは`try-catch`で安全性確保**
* **アニメーションと表示処理は完全分離（可読性・再利用性向上）**
* **UTF-8 でエクスポート → 文字化け注意の `alert` 表示あり**