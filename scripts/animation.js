function animateSeats() {
    const seats = document.querySelectorAll('#seatDisplay td.seat');
    const delayUnit = 1000; // ミリ秒単位の最小ディレイ

    const shuffledSeats = Array.from(seats);
    for (let i = shuffledSeats.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledSeats[i], shuffledSeats[j]] = [shuffledSeats[j], shuffledSeats[i]];
    }

    shuffledSeats.forEach((seat, index) => {
        setTimeout(() => {
            seat.classList.add('show-seat');
        }, index * delayUnit + Math.random() * 200); // ランダム要素あり
    });
}