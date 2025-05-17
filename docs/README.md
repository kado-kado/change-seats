# change-seats - 席替え支援アプリ

学校などで使える、視力や性別、希望を考慮した席替えツールです。
ブラウザ上で完結し、CSV出力もサポートしています。

## 主な特徴

* 生徒情報（JSON形式）からランダムに席配置を生成
* 女子席の事前指定（孤立防止）
* 視力の悪い生徒を前方に優先配置
* 空席にも対応可能
* CSV出力でExcelに取り込み可能
* 完全オフラインで動作

## インストール・起動

### GitHub

[このページからインストール可能](https://github.com/kado-kado/change-seats/releases)　

## ディレクトリ構成

```
├── .gitignore
├── LICENSE
├── README.md
├── SECURITY.md
├── docs
    ├── DEVELOPER_NOTE.md
    ├── README-en.md
    ├── README.md
    └── THIRD_PARTY.md
├── electron
    ├── icon
    │   ├── icon.png
    │   └── icon.png.back
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
├── gh-pages
    ├── icon.png
    ├── index.html
    ├── scripts
    │   ├── change-section.js
    │   └── cursor.js
    └── styles
    │   ├── cursor.css
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
    │   │   ├── icon.icns.back
    │   │   ├── icon.ico
    │   │   ├── icon.ico.back
    │   │   └── icon.png
    │   ├── src
    │   │   ├── lib.rs
    │   │   └── main.rs
    │   └── tauri.conf.json
    └── src
    │   ├── icon.png
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

## JSON 入力形式

```json
[
    { "name": "田中", "number": 1, "gender": "male" },
    { "name": "鈴木", "number": 2, "gender": "female" }
]
```

## 設定オプション（Settings）

| フィールド名       | 説明                   |
| ------------ | -------------------- |
| 縦の席数         | 座席の行数を指定             |
| 横の席数         | 座席の列数を指定             |
| 左・右削除席       | 最後列の両端を削除することで端数席に対応 |
| 視力（eyesight） | 前の席を希望する生徒番号（カンマ区切り） |
| 女子席（girls）   | 女子が固定で座る席（通し番号で指定）   |

## CSV 出力

* 出力ファイル名：`seats.csv`
* 文字コード：UTF-8
* 内容：出席番号,名前（空席はカンマのみ）

## 使用技術

* HTML/CSS/JavaScript
* Electron (オフラインデスクトップ対応)
* Blob API によるCSV保存

## ライセンス

MIT

## 謝辞

このプロジェクトには、MITライセンスのもとで提供されているサードパーティのコードが含まれています。
詳細は [THIRD_PARTY.md](./THIRD_PARTY.md) をご覧ください。
