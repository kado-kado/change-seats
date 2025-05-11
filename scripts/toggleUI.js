function toggleUI() {
    alert('見た目変えちゃうの？');
    alert('ユニバーサルデザイン？なんそれ？');
    const Neumorphism = document.getElementById('neumorphism');
    if (!Neumorphism) return;

    Neumorphism.disabled = !Neumorphism.disabled;
}