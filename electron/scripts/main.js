window.onload = function () {
    showSection('Readme');

    document.getElementById('applyBtn').addEventListener('click', () => {
        const vertical = parseInt(document.getElementById('vertical').value);
        localStorage.setItem("vertical", vertical);
        const horizontal = parseInt(document.getElementById('horizontal').value);
        localStorage.setItem("horizontal", horizontal);
        const deleteRight = parseInt(document.getElementById('deleteRight').value) || 0;
        localStorage.setItem("deleteRight", deleteRight);
        const deleteLeft = parseInt(document.getElementById('deleteLeft').value) || 0;
        localStorage.setItem("deleteLeft", deleteLeft);
        const eyesightText = document.getElementById('eyesight').value.trim();
        localStorage.setItem("eyesightText", eyesightText);
        const eyesightList = eyesightText ? eyesightText.split(',').map(x => x.trim()) : [];
        const girlSeatsText = document.getElementById('girlsSeats').value.trim();
        localStorage.setItem("girlSeatsText", girlSeatsText);
        const girlSeatIndexes = girlSeatsText ? girlSeatsText.split(',').map(x => parseInt(x.trim())) : [];

        const fileInput = document.getElementById('userJson');
        const file = fileInput.files[0];

        if (!vertical || !horizontal || !file) {
            alert("縦横の席数とJSONファイルを指定してください。");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const students = JSON.parse(e.target.result);
                const totalSeats = vertical * horizontal;
                const adjustedSeats = totalSeats - deleteLeft - deleteRight;

                if (girlSeatIndexes.length > 0) {
                    const girlCount = students.filter(s => s.gender === 'female').length;
                    if (girlSeatIndexes.length > girlCount) {
                        alert("女子専用席が女子の人数を超えています。");
                        return;
                    }
                }

                const seats2D = Array.from({ length: vertical }, (_, i) =>
                    Array.from({ length: horizontal }, (_, j) =>
                        (i === vertical - 1 && (j < deleteLeft || j >= horizontal - deleteRight)) ? null : null
                    )
                );

                const eyesightSet = new Set(eyesightList.map(String));
                const girlStudents = students.filter(s => s.gender === 'female');
                const boyStudents = students.filter(s => s.gender === 'male');
                const otherStudents = students.filter(s => !['female', 'male'].includes(s.gender));

                const girlEyeStudents = girlStudents.filter(s => eyesightSet.has(String(s.number)));
                const girlNormalStudents = girlStudents.filter(s => !eyesightSet.has(String(s.number)));
                const boyEyeStudents = boyStudents.filter(s => eyesightSet.has(String(s.number)));
                const boyNormalStudents = boyStudents.filter(s => !eyesightSet.has(String(s.number)));

                const usedNumbers = new Set();

                const girlSeatPositions = girlSeatIndexes.map(index => ({
                    row: Math.floor(index / horizontal),
                    col: index % horizontal
                }));

                const shuffledGirls = shuffleArray([...girlEyeStudents, ...girlNormalStudents]);
                girlSeatPositions.forEach(pos => {
                    const student = shuffledGirls.shift();
                    if (student) {
                        seats2D[pos.row][pos.col] = student;
                        usedNumbers.add(student.number);
                    }
                });

                const targetRow = 1;
                if (vertical > targetRow) {
                    const validCols = [];
                    for (let j = 0; j < horizontal; j++) {
                        if (targetRow === vertical - 1 && (j < deleteLeft || j >= horizontal - deleteRight)) continue;
                        if (girlSeatPositions.some(pos => pos.row === targetRow && pos.col === j)) continue;
                        if (!seats2D[targetRow][j]) validCols.push(j);
                    }
                    const shuffledCols = shuffleArray(validCols);
                    const remainingEyeStudents = shuffleArray(
                        students.filter(s => eyesightSet.has(String(s.number)) && !usedNumbers.has(s.number))
                    );
                    shuffledCols.forEach(col => {
                        if (remainingEyeStudents.length === 0) return;
                        const student = remainingEyeStudents.shift();
                        seats2D[targetRow][col] = student;
                        usedNumbers.add(student.number);
                    });
                }

                const remainingStudents = shuffleArray(
                    students.filter(s => !usedNumbers.has(s.number))
                );

                for (let i = 0; i < vertical; i++) {
                    for (let j = 0; j < horizontal; j++) {
                        if (i === vertical - 1 && (j < deleteLeft || j >= horizontal - deleteRight)) continue;
                        if (!seats2D[i][j] && remainingStudents.length > 0) {
                            const student = remainingStudents.shift();
                            seats2D[i][j] = student;
                            usedNumbers.add(student.number);
                        }
                    }
                }

                Helper(seats2D);
                displaySeats(seats2D);
                showSection('Main');
                setTimeout(() => animateSeats(), 100);

            } catch (err) {
                alert("JSONの読み込みに失敗しました。形式が正しいか確認してください。");
                console.error(err);
            }
        };

        reader.readAsText(file);
    });
};

function shuffleArray(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function displaySeats(seats) {
    currentSeats2D = seats;
    let output = '<table border="1" style="border-collapse: collapse;">';
    for (let row of seats) {
        output += "<tr>";
        for (let seat of row) {
            if (!seat || seat.name === "空席") {
                output += `<td class="seat empty"></td>`;
            } else {
                let bgColor = "#ffffff";
                if (seat.gender === "male") bgColor = "#d0e6ff";
                else if (seat.gender === "female") bgColor = "#ffe0f0";
                output += `<td class="seat" style="background: ${bgColor};">${seat.name} (${seat.number})</td>`;
            }
        }
        output += "</tr>";
    }
    output += "</table>";

    let container = document.getElementById("seatDisplay");
    if (!container) {
        container = document.createElement("div");
        container.id = "seatDisplay";
        document.getElementById("sheets").appendChild(container);
    }
    container.innerHTML = output;
}

function shuffleArray(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function displaySeats(seats) {
    currentSeats2D = seats;
    let output = '<table border="1" style="border-collapse: collapse;">';
    for (let row of seats) {
        output += "<tr>";
        for (let seat of row) {
            if (!seat || seat.name === "空席") {
                output += `<td class="seat empty"></td>`;
            } else {
                let bgColor = "#ffffff";
                if (seat.gender === "male") {
                    bgColor = "#d0e6ff";
                } else if (seat.gender === "female") {
                    bgColor = "#ffe0f0";
                }
                output += `<td class="seat" style="background: ${bgColor};">
                    ${seat.name} (${seat.number})
                </td>`;
            }
        }
        output += "</tr>";
    }
    output += "</table>";

    let container = document.getElementById("seatDisplay");
    if (!container) {
        container = document.createElement("div");
        container.id = "seatDisplay";
        document.getElementById("sheets").appendChild(container);
    }
    container.innerHTML = output;

}