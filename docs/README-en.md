# change-seats - Smart Seating Arrangement Tool

A browser-based tool to automate seating arrangements with consideration for eyesight, gender, and custom preferences. Runs entirely offline and supports CSV export.

## Key Features

* Randomized seating from student data (JSON input)
* Female seat pre-assignment to avoid isolation
* Prioritized front-row seating for students with poor eyesight
* Supports gaps (e.g., left/right seat removal)
* Export to CSV (Excel-compatible format)
* Works offline with Electron

## Installation

### Github

[Can be installed from this page](https://github.com/kado-kado/change-seats/releases)

## Directory Structure

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

## JSON Input Format

```json
[
    { "name": "Tanaka", "number": 1, "gender": "male" },
    { "name": "Suzuki", "number": 2, "gender": "female" }
]
```

## Configuration Options

| Field             | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| Vertical Seats    | Number of seat rows                                                |
| Horizontal        | Number of seat columns                                             |
| Delete Left/Right | Remove seats at both ends of the last row (for uneven layout)      |
| Eyesight          | List of student numbers who need front-row seats (comma-separated) |
| Girls Seats       | Indexes (flattened) where female students are pre-assigned         |

## CSV Export

* File name: `seats.csv`
* Encoding: UTF-8
* Format: student number, name (empty seat: empty cell)

## Technologies Used

* HTML/CSS/JavaScript
* Electron (desktop support)
* Blob API for CSV download

## License

MIT

## Acknowledgements

This project includes third-party code licensed under the MIT License.
See [THIRD_PARTY.md](./THIRD_PARTY.md) for full details.