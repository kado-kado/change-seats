function exportCSV_UTF8_BOM(seats2D) {
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

    // UTF-8 BOM（バイト順マーク）を先頭に付ける
    const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const utf8Encoded = new TextEncoder().encode(csvContent);
    const blob = new Blob([BOM, utf8Encoded], { type: "text/csv;charset=utf-8;" });

    // ダウンロード処理
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "seats_utf8_bom.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}