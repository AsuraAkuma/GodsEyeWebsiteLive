// Variables
const loaderContainer = document.getElementById('loader-container');
const wrapper = document.getElementById('wrapper');
// Page load event listener
window.addEventListener('load', () => {
    // Code to execute once page is loaded
    loaderContainer.style.display = 'none';
    wrapper.style.overflowY = 'auto';
    wrapper.style.overflowX = 'hidden';

    if (!document.cookie.includes('cconfirm') || document.cookie.includes('cconfirm=true')) {
        const confirmation = confirm('By clicking "Ok" you agree to the use of cookies that allow this site to function. No advertising or tracking cookies are used.')
        if (confirmation === true) {
            document.cookie = 'cconfirm=true';
        };
    };
    // Header menu highlight
    const selector = document.getElementById('header-menu-link-home');
    const selectorText = document.getElementById('header-menu-link-text-home');
    selectorText.style.color = 'var(--geRed)';
    selectorText.style.textShadow = '0px 0px 3px var(--geRed)';

    // Body buttons
    const inviteButton = document.getElementById('body-button-invite')
    const commandsButton = document.getElementById('body-button-commands');
    const loginButton = document.getElementById('header-button-login');
    const commandsButton2 = document.getElementById('header-dropdown-menu-list-item-button-commands');
    const loginButton2 = document.getElementById('header-dropdown-menu-list-item-button-login');
    // Event listeners
    inviteButton.addEventListener('click', () => {
        window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1059540116021981224&permissions=8&scope=bot%20applications.commands';
    });
    commandsButton.addEventListener('click', () => {
        if (window.location.origin.includes("http://127.0.0.1:3000")) {
            window.location.pathname = './commands.html';
        } else {
            window.location.pathname = './commands';
        };
    });
    loginButton.addEventListener('click', () => {
        if (window.location.origin.includes("http://127.0.0.1:3000")) {
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1059540116021981224&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fuser%2Fservers.html&response_type=token&scope=identify%20guilds%20email';
        } else {
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1059540116021981224&redirect_uri=https%3A%2F%2Fgodseyeofficial.xyz%2Fuser%2Fservers&response_type=token&scope=identify%20guilds%20email';
        };
    });
    commandsButton2.addEventListener('click', () => {
        if (window.location.origin.includes("http://127.0.0.1:3000")) {
            window.location.pathname = '/commands.html';
        } else {
            window.location.pathname = '/commands';
        };
    });
    loginButton2.addEventListener('click', () => {
        if (window.location.origin.includes("http://127.0.0.1:3000")) {
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1059540116021981224&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fuser%2Fservers.html&response_type=token&scope=identify%20guilds%20email';
        } else {
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1059540116021981224&redirect_uri=https%3A%2F%2Fgodseyeofficial.xyz%2Fuser%2Fservers&response_type=token&scope=identify%20guilds%20email';
        };
    });

});

// Functions

// Hamburger Menu Opener
let menuOpen = false;
const hamButton = document.getElementById('header-dropdown-button');
const hamButtonPiece = document.getElementById('hamburger-peice-1');
const dropMenu = document.getElementById('header-dropdown-menu');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const bodyContainer = document.getElementById('body-container');
hamButton.addEventListener('mouseover', () => {
    if (menuOpen === false) {
        hamButtonPiece.style.backgroundColor = 'red';
        hamButtonPiece.style.boxShadow = '0px 0px 20px 0px red';
    };
});
hamButton.addEventListener('mouseout', () => {
    if (menuOpen === false) {
        hamButtonPiece.style.backgroundColor = 'var(--geRed)';
        hamButtonPiece.style.boxShadow = '0px 0px 10px 0px var(--geRed)';
    }
});
hamButton.addEventListener("click", () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
        hamButtonPiece.classList.add('open');
        hamButton.classList.add('open');
        dropdownMenuCover.style.animation = 'headerDropdownCoverAppear .2s linear';
        hamButtonPiece.style.backgroundColor = 'transparent';
        hamButtonPiece.style.boxShadow = 'none';
        dropMenu.style.animation = 'headerDropdownMenuContainerAppear .2s linear';
        setTimeout(() => {
            dropMenu.style.display = 'flex';
            dropdownMenuCover.style.display = 'block';
            bodyContainer.style.filter = 'blur(5px)';
        }, 200);
    } else {
        hamButton.classList.remove('open');
        hamButtonPiece.classList.remove('open');
        dropdownMenuCover.style.animation = 'headerDropdownCoverDisappear .2s linear';
        hamButtonPiece.style.backgroundColor = 'red';
        hamButtonPiece.style.boxShadow = '0px 0px 20px 0px red';
        dropMenu.style.animation = 'headerDropdownMenuContainerDisappear .2s linear';
        setTimeout(() => {
            dropMenu.style.display = 'none';
            dropdownMenuCover.style.display = 'none';
            bodyContainer.style.filter = 'none';
        }, 200);
    }
})
window.addEventListener('resize', () => {
    if (window.innerWidth > 630) {
        hamButton.classList.remove('open');
        hamButtonPiece.classList.remove('open');
        dropdownMenuCover.style.animation = 'headerDropdownCoverDisappear .2s linear';
        hamButtonPiece.style.backgroundColor = 'red';
        hamButtonPiece.style.boxShadow = '0px 0px 20px 0px red';
        dropMenu.style.animation = 'headerDropdownMenuContainerDisappear .2s linear';
        setTimeout(() => {
            dropMenu.style.display = 'none';
            dropdownMenuCover.style.display = 'none';
            bodyContainer.style.filter = 'none';
        }, 200);
    } else {
        if (menuOpen === true) {
            hamButtonPiece.classList.add('open');
            hamButton.classList.add('open');
            dropdownMenuCover.style.animation = 'headerDropdownCoverAppear .2s linear';
            hamButtonPiece.style.backgroundColor = 'transparent';
            hamButtonPiece.style.boxShadow = 'none';
            dropMenu.style.animation = 'headerDropdownMenuContainerAppear .2s linear';
            setTimeout(() => {
                dropMenu.style.display = 'flex';
                dropdownMenuCover.style.display = 'block';
                bodyContainer.style.filter = 'blur(5px)';
            }, 200);
        }
    };
});
