const sectionNavigator = name => {
    let sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.classList.contains(name)) {
            section.classList.add('active');
        }
    });
};

// navigation to section

window.addEventListener('load', () => {
    const navList = document.querySelectorAll('.nav-btn');
    navList.forEach(nav => {
        nav.addEventListener('click', function (e) {
            e.preventDefault();
            navList.forEach(el => {
                el.classList.remove('active');
            });
            this.classList.add('active');
            sectionNavigator(this.getAttribute('data-target'));
            screen.width < 768 && toggleMenu();
        });
    });
});

const toggleMenu = () => {
    const menu = document.querySelector('.menu');
    const navmobile = document.querySelector('.nav-mobile');
    menu.classList.toggle('active');
    navmobile.classList.toggle('active');

};