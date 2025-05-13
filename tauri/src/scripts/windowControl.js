document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.getElementById("closeButton");

    if (!closeBtn || !window.__TAURI__?.window?.appWindow) {
        console.warn("閉じるボタンまたは Tauri API が利用できません。");
        return;
    }

    closeBtn.addEventListener("click", () => {
        window.__TAURI__.window.appWindow.close();
    });
});