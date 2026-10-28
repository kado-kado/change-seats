function decodeBase64Url(str) {
    const base64 = decodeURIComponent(str).replace(/-/g, '+').replace(/_/g, '/');
    return atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
}

function deserializeSeats(str) {
    const json = decodeBase64Url(str);
    const payload = JSON.parse(json);

    const { r, c, d } = payload;
    if (!Number.isInteger(r) || !Number.isInteger(c) || r < 1 || c < 1 || !Array.isArray(d) || d.length !== r * c) {
        throw new Error('席データの形式が正しくありません');
    }

    const seats2D = [];
    let index = 0;

    for (let i = 0; i < r; i++) {
        const row = [];
        for (let j = 0; j < c; j++) {
            const token = d[index++];

            if (token === "__" || token === "null" || token === "") {
                row.push(null);
            } else {
                const number = parseInt(token.slice(0, -1));
                const gender = token.slice(-1) === "f" ? "female" : "male";

                row.push({
                    number,
                    gender,
                    name: `#${number}`
                });
            }
        }
        seats2D.push(row);
    }

    return seats2D;
}

window.onload = function () {

    const hash = location.hash.slice(1);

    if (!hash) {
        document.getElementById("seatDisplay").innerHTML = "データがありません";
        return;
    }

    try {
        const seats = deserializeSeats(hash);
        displaySeats(seats);
    } catch (e) {
        console.error(e);
        document.getElementById("seatDisplay").innerHTML = "復元失敗";
    }
};

function displaySeats(seats) {
    const rows = seats.length;
    const cols = seats[0].length;

    // 最終行だけ、席削除分として左端に空席を追加して他の席を右へずらす。
    if (cols > 1) {
        seats[rows - 1].pop();
        seats[rows - 1].unshift(null);
    }

    const container = document.getElementById("seatDisplay");

    const cellSize = Math.max(64, Math.floor((window.innerHeight - 120) / rows));

    let output = `<table style="border-collapse: collapse; margin: auto;">`;

    for (let row of seats) {
        output += "<tr>";
        for (let seat of row) {
            if (!seat) {
                output += `<td class="empty-seat" style="width:${cellSize}px;height:${cellSize}px;"></td>`;
            } else {
                const genderClass = seat.gender === "female" ? "female-seat" : "male-seat";

                output += `<td class="${genderClass}" style="
                    width:${cellSize}px;
                    height:${cellSize}px;
                    text-align:center;
                    vertical-align:middle;
                    font-size:${cellSize * 0.4}px;
                ">
                    ${seat.number}
                </td>`;
            }
        }
        output += "</tr>";
    }

    output += "</table>";

    container.innerHTML = output;

}