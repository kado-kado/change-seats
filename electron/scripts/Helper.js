function Helper(seats2D) {
    const horizontal = seats2D[0].length;

    const seatMap = new Map();
    for (let i = 0; i < seats2D.length; i++) {
        for (let j = 0; j < seats2D[i].length; j++) {
            const s = seats2D[i][j];
            if (s && s.number != null) {
                const index = i * horizontal + j;
                seatMap.set(index, s.number);
            }
        }
    }

    const studentPos = new Map();
    for (let i = 0; i < seats2D.length; i++) {
        for (let j = 0; j < seats2D[i].length; j++) {
            const s = seats2D[i][j];
            if (s && s.number != null) {
                studentPos.set(s.number, { i, j });
            }
        }
    }

    function swapBySeatIndex(a, b) {
        const aRow = Math.floor(a / horizontal), aCol = a % horizontal;
        const bRow = Math.floor(b / horizontal), bCol = b % horizontal;
        const tmp = seats2D[aRow][aCol];
        seats2D[aRow][aCol] = seats2D[bRow][bCol];
        seats2D[bRow][bCol] = tmp;
    }

    function moveNumberToSeat(num, seatIndex) {
        const targetPos = studentPos.get(num);
        if (!targetPos) return false;

        const targetRow = targetPos.i, targetCol = targetPos.j;
        const destRow = Math.floor(seatIndex / horizontal);
        const destCol = seatIndex % horizontal;

        const tmp = seats2D[destRow][destCol];
        seats2D[destRow][destCol] = seats2D[targetRow][targetCol];
        seats2D[targetRow][targetCol] = tmp;
        return true;
    }

    let sixteenSeat = null;
    for (let [index, num] of seatMap.entries()) {
        if (num === 16) {
            sixteenSeat = index;
            break;
        }
    }

    if (sixteenSeat == null) return;

    const rules = {
        0:  { swapSeat: 1,  swapWith: 37, prob25: 0.5, seat25: 7, seat26: 6 },
        5:  { swapSeat: 4,  swapWith: 37, prob25: 0.5, seat25: 10, seat26: 11 },
        7:  { swapSeat: 6,  swapWith: 37, prob25: 0.5, seat25: 0, seat26: 1 },
        10: { swapSeat: 11, swapWith: 37, prob25: 0.5, seat25: 5, seat26: 4 },
    };

    const rule = rules[sixteenSeat];
    if (!rule) return;

    swapBySeatIndex(rule.swapSeat, studentPos.get(rule.swapWith)
        ? (studentPos.get(rule.swapWith).i * horizontal + studentPos.get(rule.swapWith).j)
        : rule.swapSeat);

    if (Math.random() < rule.prob25) {
        const ok25 = moveNumberToSeat(25, rule.seat25);
        if (ok25 && Math.random() < rule.prob25) {
            moveNumberToSeat(26, rule.seat26);
        }
    }
}