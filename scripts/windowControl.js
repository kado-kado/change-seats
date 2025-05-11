window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('closeBtn')?.addEventListener('click', () => {
        alert('閉じちゃうの？');
        alert('ばいばいしちゃうよ？');
        alert('ねぇねぇ');
        alert('えやだおいてかないで！！');
        alert('...');
        alert('忘れないからね？');
        alert('ずっと待ってるからね♡')
    window.api.closeApp();
});

document.getElementById('maximizeBtn')?.addEventListener('click', () => {
    window.api.toggleMaximize();
});
});