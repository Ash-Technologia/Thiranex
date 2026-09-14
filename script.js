const tabLinks = document.querySelectorAll('.tab-links');
const tabContents = document.querySelectorAll('.tab-contents');

for (const tabLink of tabLinks) {
    tabLink.addEventListener('click', () => {
        const targetId = tabLink.getAttribute('data-target');

        tabLinks.forEach((link) => link.classList.remove('active-link'));
        tabContents.forEach((content) => content.classList.remove('active-tab'));

        tabLink.classList.add('active-link');
        document.getElementById(targetId).classList.add('active-tab');
    });
}
