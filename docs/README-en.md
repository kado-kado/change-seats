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
├── docs/
|    ├── README.md (Japanese)
|    ├── README-en.md (English)
|    └── DEVELOPER_NOTE.md
├── LICENSE
└── README.md (root)
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