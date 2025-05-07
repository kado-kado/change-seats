# change-seats

A seat arrangement system that considers **vision, gender, and seat preferences** for use in schools and similar environments. It also supports CSV export.

## Key Features

* Random seat assignment based on names and student numbers
* Assignment of seats for females only
* Placement of students with poor vision in the front seats
* CSV export (in a format that can be opened in Excel)

## File Structure

```
root/
├── index.html (Includes README)
├── main.js
├── package.json
├── styles/main.css
├── scripts/main.js
└── README.md
```

## How to Use

1. Open **change-seats.exe**
2. Enter student names and attendance numbers (via JSON or form)
3. Specify options such as "female-only seats" or "front seat preference"
4. Generate the seat arrangement
5. If necessary, click the "CSV export" button

*Note 1: Fields marked as optional can be skipped.*
*Note 2: The female-only seat option makes group division smoother.*

## Input Specification (JSON format)

```json
[
    { "name": "Tanaka", "number": 1, "gender": "male" },
    { "name": "Suzuki", "number": 2, "gender": "female" }
]
```

Gender and preferences (female-only seats, front seat preference) can be specified via the HTML form.

## CSV Export Format

* Export File Name: **seats.csv**
* Encoding: **UTF-8**
* Format: Attendance number, Name

## Technologies Used

* HTML, CSS, JavaScript
* Browser-based
* CSV export functionality (Blob API)
* Node.js
* Electron ^29.4.6

## License

MIT