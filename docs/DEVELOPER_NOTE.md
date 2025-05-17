# 席替えアプリ 技術者向けノート

このドキュメントは、Webベースの席替えアプリの内部構造と実装技術についてまとめた技術者向けノートです。HTML/CSS/JavaScript/Node.js/Rust/Electron/Tauri によって構成されています。
Electronを使用したビルドされています。
また、Tauriを使用したビルドされています。

---

## ファイル構成

```
root/
├── .gitignore
├── LICENSE
├── README.md
├── SECURITY.md
├── gh-pages
    ├── 
├── docs
    ├── DEVELOPER_NOTE.md
    ├── README-en.md
    ├── README.md
    └── THIRD_PARTY.md
├── electron
    ├── index.html
    ├── main.js
    ├── package-lock.json
    ├── package.json
    ├── preload.js
    ├── scripts
    │   ├── animation.js
    │   ├── change-section.js
    │   ├── cursor.js
    │   ├── export.js
    │   ├── hint.js
    │   ├── load.js
    │   ├── localstorage.js
    │   ├── main.js
    │   ├── toggleUI.js
    │   └── windowControl.js
    └── styles
    │   ├── cursor.css
    │   ├── load.css
    │   ├── main.css
    │   ├── neumorphismUI.css
    │   ├── section-main.css
    │   ├── section-settings.css
    │   └── sidebar.css
├── tauri
    ├── .vscode
    │   └── extensions.json
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── src-tauri
    │   ├── Cargo.lock
    │   ├── Cargo.toml
    │   ├── build.rs
    │   ├── capabilities
    │   │   └── default.json
    │   ├── icons
    │   │   ├── 128x128.png
    │   │   ├── 128x128@2x.png
    │   │   ├── 32x32.png
    │   │   ├── Square107x107Logo.png
    │   │   ├── Square142x142Logo.png
    │   │   ├── Square150x150Logo.png
    │   │   ├── Square284x284Logo.png
    │   │   ├── Square30x30Logo.png
    │   │   ├── Square310x310Logo.png
    │   │   ├── Square44x44Logo.png
    │   │   ├── Square71x71Logo.png
    │   │   ├── Square89x89Logo.png
    │   │   ├── StoreLogo.png
    │   │   ├── icon.icns
    │   │   ├── icon.ico
    │   │   └── icon.png
    │   ├── src
    │   │   ├── lib.rs
    │   │   └── main.rs
    │   └── tauri.conf.json
    └── src
    │   ├── index.html
    │   ├── scripts
    │       ├── animation.js
    │       ├── change-section.js
    │       ├── cursor.js
    │       ├── export.js
    │       ├── hint.js
    │       ├── load.js
    │       ├── localstorage.js
    │       ├── main.js
    │       └── toggleUI.js
    │   └── styles
    │       ├── cursor.css
    │       ├── load.css
    │       ├── main.css
    │       ├── neumorphismUI.css
    │       ├── section-main.css
    │       ├── section-settings.css
    │       └── sidebar.css
└── testData.json
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
* BOM付きUTF-8 形式、。

### `localstorage.js`

* `localstorage` を使用し、入力情報の保存を行う。

### `hint.js`

* `alertHint(param)` により対象フォームに応じた説明を `alert()`。
* `switch(param)` で分岐管理し、UX補助として機能。

### `cursor.js`

* `cursor`の見た目の変更を行う。

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
* **localstorageを使用している**