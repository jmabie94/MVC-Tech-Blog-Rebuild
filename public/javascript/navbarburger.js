// got this solution from stackoverflow, apparently certain features of Bulma styling require javascript logic in order to work properly, without this, on smaller screen sizes, the entire navbar turns into a hoverable button without a dropdown or any click function.

document.addEventListener('DOMContentLoaded', () => {
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarStart = document.getElementById('navstart');
    const navbarEnd = document.getElementById('navend');

    navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');

        if (navbarMenu.classList.contains('is-active')) {
            navbarStart.style.textAlignLast = 'right';
            navbarEnd.style.display = 'flex';
            navbarEnd.style.justifyContent = 'flex-end';
        } else {
            navbarStart.style.textAlignLast = '';
            navbarEnd.style.display = '';
            navbarEnd.style.justifyContent = '';
        }
    });
});