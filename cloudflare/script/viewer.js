function decodeBase64Url(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    return atob(str);
}

function deserializeSeats(str) {
    const json = decodeBase64Url(str);
    const payload = JSON.parse(json);

    const { r, c, d } = payload;

    const seats2D = [];
    let index = 0;

    for (let i = 0; i < r; i++) {
        const row = [];
        for (let j = 0; j < c; j++) {
            const token = d[index++];

            if (token === "__") {
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

    alert('表示専用です。\nすべてのデバイスで正しく表示される保証はできません。')
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

    const container = document.getElementById("seatDisplay");

    const rect = container.getBoundingClientRect();
    const height = window.innerHeight;
    const cellSize = Math.floor(height / rows);

    let output = `<table style="border-collapse: collapse; margin: auto;">`;

    for (let row of seats) {
        output += "<tr>";
        for (let seat of row) {
            if (!seat) {
                output += `<td style="width:${cellSize}px;height:${cellSize}px;"></td>`;
            } else {
                let bgColor = "#fff";
                if (seat.gender === "male") bgColor = "#d0e6ff";
                else if (seat.gender === "female") bgColor = "#ffe0f0";

                output += `<td style="
                    width:${cellSize}px;
                    height:${cellSize}px;
                    background:${bgColor};
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