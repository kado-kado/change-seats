# change-seats

学校などで使用できる、**視力・性別・席希望**を考慮した席替えシステムです。CSV出力にも対応しています。

## 主な機能

- 名前と出席番号を元にランダム席割り
- 女子専用席の指定
- 視力の弱い生徒を前方席に配置
- CSVエクスポート（Excelで開ける形式）

## ファイル構成

```

root/
├── index.html(READMEが含まれている。)
├── main.js
├── package.json
├── styles/main.css
├── scripts/main.js
└── README.md

````

## 使用方法

1. **change-seats.exe**を開く
2. 生徒の名前・出席番号を入力（JSONやフォーム）
3. 「女子席」や「前の席希望」などのオプションを指定
4. 席割りを生成
5. 必要に応じて「CSV出力」ボタンをクリック

※1 任意のタグがある場所は入力しなくても動きます。
※2 女子席の指定により、班分けをスムーズにしています。

## 入力仕様（JSON想定）

```json
[
    { "name": "田中", "number": 1, "gender": "male" },
    { "name": "鈴木", "number": 2, "gender": "female" }
]
````

性別や希望（女子席・前の席希望）はHTMLフォームで指定できます。

## CSV出力形式

* 出力ファイル名： **seats.csv**
* 文字コード： **UTF-8**
* フォーマット： 出席番号,名前

## 使用技術

* HTML, CSS, JavaScript
* ブラウザベース
* CSV出力機能（Blob API）
* Node.js
* Electron ^29.4.6

## ライセンス

MIT