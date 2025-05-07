window.onload = function () {
    showSection('Main');

    document.getElementById('applyBtn').addEventListener('click', () => {
        const vertical = parseInt(document.getElementById('vertical').value);
        const horizontal = parseInt(document.getElementById('horizontal').value);
        const deleteRight = parseInt(document.getElementById('deleteRight').value) || 0;
        const deleteLeft = parseInt(document.getElementById('deleteLeft').value) || 0;
        const eyesightText = document.getElementById('eyesight').value.trim();
        const eyesightList = eyesightText ? eyesightText.split(',').map(x => x.trim()) : [];

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

                if (students.length > adjustedSeats) {
                    alert(`席数（${adjustedSeats}）より生徒数（${students.length}）が多いです。`);
                    return;
                }

                const frontRowSeatCount = horizontal * 2;
                const eyesightStudents = students.filter(s => eyesightList.includes(String(s.number)));
                const others = students.filter(s => !eyesightList.includes(String(s.number)));

                const frontCount = Math.min(eyesightStudents.length, frontRowSeatCount);
                const remainingFrontSlots = frontRowSeatCount - frontCount;

                const extraFrontStudents = shuffleArray(others).slice(0, remainingFrontSlots);
                const remainingOthers = others.filter(s => !extraFrontStudents.includes(s));

                const frontStudents = shuffleArray([...eyesightStudents.slice(0, frontCount), ...extraFrontStudents]);
                const backStudents = shuffleArray(remainingOthers);

                const allStudents = [...frontStudents, ...backStudents];

                while (allStudents.length < adjustedSeats) {
                    allStudents.push({ name: "空席", number: null });
                }

                const seats2D = [];
                for (let i = 0; i < vertical; i++) {
                    const row = [];
                    for (let j = 0; j < horizontal; j++) {
                        row.push(null);
                    }
                    seats2D.push(row);
                }

                let index = 0;
                for (let i = 0; i < vertical; i++) {
                    for (let j = 0; j < horizontal; j++) {
                        if (i === vertical - 1) {
                            if (j < deleteLeft || j >= horizontal - deleteRight) {
                                continue;
                            }
                        }
                        if (index < allStudents.length) {
                            seats2D[i][j] = allStudents[index++];
                        }
                    }
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
    let output = '<table border="1" style="border-collapse: collapse;">';
    for (const row of seats) {
        output += '<tr>';
        for (const seat of row) {
            if (seat === null) {
                output += '<td style="width: 100px; height: 60px; background: #ccc;"></td>';
            } else {
                output += `<td style="width: 100px; height: 60px; text-align: center; vertical-align: middle;">
                            ${seat.name} (${seat.number !== null ? seat.number : ''})
                           </td>`;
            }
        }
        output += '</tr>';
    }
    output += '</table>';

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