// Variables
const loaderContainer = document.getElementById('loader-container');

// Page load event listener
window.addEventListener('load', () => {
    // Code to execute once page is loaded
    loaderContainer.style.display = 'none';

    // Header menu highlight
    const selector = document.getElementById('header-menu-link-modules');
    const selectorText = document.getElementById('header-menu-link-text-modules');
    selector.style.borderBottom = '1px solid var(--geLightYellow)';
    selectorText.style.color = 'var(--geRed)';
    selectorText.style.textShadow = '0px 0px 3px var(--geRed)';
    // Body buttons
    const loginButton = document.getElementById('header-button-login');
    // Event listeners
    loginButton.addEventListener('click', () => {
        window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=774290723390226452&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2Fuser%2Fservers&response_type=token&scope=identify%20email%20guilds';
    });

});

// Functions