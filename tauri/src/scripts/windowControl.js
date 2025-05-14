window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('closeBtn')?.addEventListener('click', () => {
    window.api.closeApp();
});

document.getElementById('maximizeBtn')?.addEventListener('click', () => {
    window.api.toggleMaximize();
});
});