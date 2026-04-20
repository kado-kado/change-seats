function serializeSeats(seats2D) {
    const flat = seats2D.flat().map(seat => {
        if (!seat) return "__";
        return `${String(seat.number).padStart(2, '0')}${seat.gender[0]}`;
    });

    const payload = {
        v: 1,
        r: seats2D.length,
        c: seats2D[0].length,
        d: flat
    };

    return btoa(JSON.stringify(payload))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function generateQR(seats2D) {
    const encoded = serializeSeats(seats2D);
    const url = `http://change-seats.pages.dev/#${encoded}`;

    const canvas = document.createElement("canvas");

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const size = Math.floor(Math.min(screenWidth, screenHeight) * 0.7);

    QRCode.toCanvas(canvas, url, {
        width: size,
        margin: 2,
        errorCorrectionLevel: 'M'
    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }

        const container = document.getElementById("qr");
        container.innerHTML = "";
        container.appendChild(canvas);
    });
}