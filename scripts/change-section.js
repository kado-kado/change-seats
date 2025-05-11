function showSection(sectionId) {
    alert('どんだけこのページみたいの？');
    alert('仕方ないなぁ');
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }
    saveLocalstorage();
}