function exportSeatsToCSV(seats2D) {
    alert('関数に送っちゃっていいの？');
    alert('送っちゃうよ？')
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

    const blob = new Blob([new TextEncoder("utf-8").encode(csvContent)], { type: "text/csv;charset=utf-8;" });
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