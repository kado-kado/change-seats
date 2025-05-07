window.onload = function () {
    showSection('Main');

    document.getElementById('applyBtn').addEventListener('click', () => {
        const vertical = parseInt(document.getElementById('vertical').value);
        const horizontal = parseInt(document.getElementById('horizontal').value);
        const deleteRight = parseInt(document.getElementById('deleteRight').value) || 0;
        const deleteLeft = parseInt(document.getElementById('deleteLeft').value) || 0;
        const eyesightText = document.getElementById('eyesight').value.trim();
        const eyesightList = eyesightText ? eyesightText.split(',').map(x => x.trim()) : [];
        const girlSeatsText = document.getElementById('girlsSeats').value.trim();
        const girlSeatIndexes = girlSeatsText ? girlSeatsText.split(',').map(x => parseInt(x.trim())) : null;

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

                const girls = students.filter(s => s.gender === 'female');
                const boys = students.filter(s => s.gender === 'male');
                const eyesightStudents = students.filter(s => eyesightList.includes(String(s.number)));
                const others = students.filter(s => !eyesightList.includes(String(s.number)));

                if (girlSeatIndexes && girlSeatIndexes.length !== girls.length) {
                    alert("女子の人数と指定席数が一致しません。");
                    return;
                }

                const seats = Array(adjustedSeats).fill(null);
                const shuffledGirls = shuffleArray(girls);
                const shuffledBoys = shuffleArray(boys);
                const shuffledOthers = shuffleArray(others);

                if (girlSeatIndexes) {
                    girlSeatIndexes.forEach((idx, i) => {
                        seats[idx] = shuffledGirls[i];
                    });
                }

                const frontIndexes = [];
                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < horizontal; j++) {
                        const index = i * horizontal + j;
                        if (i === vertical - 1 && (j < deleteLeft || j >= horizontal - deleteRight)) continue;
                        if (index < adjustedSeats && !girlSeatIndexes?.includes(index)) {
                            frontIndexes.push(index);
                        }
                    }
                }

                const availableFrontIndexes = frontIndexes.filter(idx => seats[idx] === null);
                const eyesightQueue = shuffleArray(eyesightStudents);
                for (let i = 0; i < availableFrontIndexes.length && eyesightQueue.length > 0; i++) {
                    seats[availableFrontIndexes[i]] = eyesightQueue.shift();
                }

                const remainingStudents = shuffleArray([
                    ...shuffledBoys,
                    ...shuffledGirls.slice(girlSeatIndexes ? girls.length : 0),
                    ...eyesightQueue,
                    ...shuffledOthers
                ]);
                for (let i = 0; i < seats.length; i++) {
                    if (!seats[i] && remainingStudents.length > 0) {
                        seats[i] = remainingStudents.shift();
                    }
                }

                while (seats.length < adjustedSeats) {
                    seats.push({ name: "空席", number: null });
                }

                const seats2D = [];
                let index = 0;
                for (let i = 0; i < vertical; i++) {
                    const row = [];
                    for (let j = 0; j < horizontal; j++) {
                        if (i === vertical - 1 && (j < deleteLeft || j >= horizontal - deleteRight)) {
                            row.push(null);
                        } else {
                            row.push(seats[index++] || null);
                        }
                    }
                    seats2D.push(row);
                }

                displaySeats(seats2D);
                showSection('Main');

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
                output += `<td style="width: 100px; height: 60px; background: #ccc;"></td>`;
            } else {
                let bgColor = "#ffffff";
                if (seat.gender === "male") {
                    bgColor = "#d0e6ff";
                } else if (seat.gender === "female") {
                    bgColor = "#ffe0f0";
                }
                output += `<td style="width: 100px; height: 60px; text-align: center; vertical-align: middle; background: ${bgColor};">
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

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }
}

function exportSeatsToCSV(seats2D) {
    let csvContent = "";

    for (let i = 0; i < seats2D.length; i++) {
        const row = seats2D[i].map(seat => {
            if (seat && seat.name !== "空席") {
                return `${seat.number},${seat.name}`;
            } else {
                return ",";
            }
        }).join(",");

        csvContent += row + "\n";
    }

    const blob = new Blob([new TextEncoder("shift-jis").encode(csvContent)], {type: "text/csv;charset=shift-jis;"});
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'seats.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    alert('Excelでインポートする場合は、UTF-8のため文字化けする恐れがあります。');
}