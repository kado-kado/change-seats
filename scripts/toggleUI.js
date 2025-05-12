function toggleUI() {
    const Neumorphism = document.getElementById('neumorphism');
    if (!Neumorphism) return;

    Neumorphism.disabled = !Neumorphism.disabled;
}