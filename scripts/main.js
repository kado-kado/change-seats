function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }
}

window.onload = function () {
    showSection('Main');

    document.getElementById('Settings').appendChild(applyBtn);

    document.getElementById('applyBtn').addEventListener('click', () => {
        const vertical = parseInt(document.getElementById('vertical').value);
        const horizontal = parseInt(document.getElementById('horizontal').value);
        const deleteRight = parseInt(document.getElementById('deleteRight').value) || 0; // 右側の席の削除数
        const deleteLeft = parseInt(document.getElementById('deleteLeft').value) || 0; // 左側の席の削除数
        const eyesightText = document.getElementById('eyesight').value.trim();
        const eyesightList = eyesightText ? eyesightText.split(',').map(name => name.trim()) : [];

        const fileInput = document.getElementById('userJson');
        const file = fileInput.files[0];

        if (!vertical || !horizontal || !file) {
            alert("縦横の席数とJSONファイルを指定してください。");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const students = JSON.parse(e.target.result); // [{name:"田中", number:1}, ...]
                const seatCount = vertical * horizontal - deleteRight - deleteLeft; // 左右削除した分だけ席数を調整

                if (students.length > seatCount) {
                    alert(`席数（${seatCount}）より生徒数（${students.length}）が多いです。`);
                    return;
                }

                // シャッフル
                const shuffled = students.slice().sort(() => Math.random() - 0.5);

                // 空席追加
                while (shuffled.length < seatCount) {
                    shuffled.push({ name: "空席", number: null });
                }

                // 前の席にする生徒を配置
                const frontSeats = students.filter(student => eyesightList.includes(student.number.toString()));

                // 2次元配列を作成
                const seats = [];
                let frontIndex = 0;
                for (let row = 0; row < vertical; row++) {
                    const start = row * horizontal;
                    let rowSeats = shuffled.slice(start, start + horizontal);

                    // 最後の行に対して左右の席を削除
                    if (row === vertical - 1) {
                        for (let i = 0; i < deleteLeft; i++) {
                            rowSeats[i] = null; // 左側から削除
                        }
                        for (let i = 0; i < deleteRight; i++) {
                            rowSeats[horizontal - 1 - i] = null; // 右側から削除
                        }
                    }

                    // 前の席に入る生徒を配置
                    for (let i = 0; i < rowSeats.length; i++) {
                        if (rowSeats[i] === null && frontIndex < frontSeats.length) {
                            rowSeats[i] = frontSeats[frontIndex];
                            frontIndex++;
                        }
                    }

                    seats.push(rowSeats);
                }

                displaySeats(seats);
                showSection('Main');

            } catch (err) {
                alert("JSONの読み込みに失敗しました。形式が正しいか確認してください。");
                console.error(err);
            }
        };

        reader.readAsText(file);
    });
};

function displaySeats(seats) {
    let output = '<table border="1" style="border-collapse: collapse;">';
    for (let row of seats) {
        output += "<tr>";
        for (let seat of row) {
            if (seat === null) {
                output += `<td style="width: 80px; height: 40px; background: #ccc;"></td>`;
            } else {
                output += `<td style="width: 80px; height: 40px; text-align: center;">
                            ${seat.name} (${seat.number !== null ? seat.number : ''})
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
