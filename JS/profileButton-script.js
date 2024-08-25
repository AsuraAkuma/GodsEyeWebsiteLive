// Variables
const myServersButton = document.getElementById('header-profile-dropdown-menu-list-item-button-servers');
const premiumButton = document.getElementById('header-profile-dropdown-menu-list-item-premium-management');
const supportButton = document.getElementById('header-profile-dropdown-menu-list-item-support-server');
const homeButton = document.getElementById('header-profile-dropdown-menu-list-item-home');
const buttons = [myServersButton, premiumButton, supportButton, homeButton];
// Event handler loop
buttons.forEach((button) => {
    button.addEventListener('click', ({ target }) => {
        if (target.id === 'header-profile-dropdown-menu-list-item-button-servers') {
            window.location.pathname = 'user/servers';
        } else if (target.id === 'header-profile-dropdown-menu-list-item-button-premium-management') {
            window.location.href = 'https://billing.stripe.com/p/login/cN26pA3lX0Q941ifYY';
        } else if (target.id === 'header-profile-dropdown-menu-list-item-button-support-server') {
            window.location.href = 'https://discord.gg/suYDTYbVpY';
        } else if (target.id === 'header-profile-dropdown-menu-list-item-button-home') {
            window.location.href = '/home';
        };
    });
});
