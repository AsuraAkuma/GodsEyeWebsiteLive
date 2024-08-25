// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');

// Page load event listener
window.addEventListener('load', () => {
    // Code to execute once page is loaded
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    let accessToken;
    let tokenType;
    let targetGuildId;
    if (fragment.toString() !== '') {
        document.cookie = `accessToken=${fragment.get('access_token')}`;
        document.cookie = `tokenType=${fragment.get('token_type')}`;
        document.cookie = `geid=${fragment.get('geid')}`;
        window.location.href = `${window.location.origin}${window.location.pathname}`;
    } else {
        document.cookie.split(";").forEach((cookie) => {
            const name = cookie.split(" ").join("").split("=")[0];
            const value = cookie.split(" ").join("").split("=")[1];
            if (name === 'accessToken') {
                accessToken = value;
            } else if (name === 'tokenType') {
                tokenType = value;
            } else if (name === 'geid') {
                targetGuildId = value;
            }
            if (!document.cookie.includes('cconfirm')) {
                if (window.location.origin.includes("http://127.0.0.1:3000")) {
                    window.location.pathname = 'home.html';
                } else {
                    window.location.pathname = 'home';
                };
            } else {
                if (name === 'cconfirm') {
                    if (value === 'false') {
                        if (window.location.origin.includes("http://127.0.0.1:3000")) {
                            window.location.pathname = 'home.html';
                        } else {
                            window.location.pathname = 'home';
                        };
                    };
                };
            }
        })
    }
    // fetch account avatar
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    }).then((result) => {
        return result.json()
    }).then((response) => {
        const { id, username, discriminator, avatar, email, banner_color, mfa_enabled, verified, locale } = response;
        fetch('https://api.godseyeofficial.xyz/api/user/avatar?' + new URLSearchParams({ userId: id })).then((result) => {
            return result.json();
        }).then((response) => {
            if (response.msg === 'Success') {
                const img = document.getElementById('header-profile-icon');
                if (response.avatar === null) {
                    img.src = `../images/discord logo.png`;
                } else {
                    img.src = response.avatar;
                };
            }
        });
        // fetch account guilds
        fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                authorization: `${tokenType} ${accessToken}`
            },
        }).then((result) => {
            return result.json()
        }).then((guilds) => {
            loaderContainer.style.display = 'none';
            profileButton.addEventListener('click', () => {
                dropdownMenuCover.style.display = 'block';
                dropdownMenuCover.style.animation = 'headerDropdownCoverAppear .2s linear';
                bodyContainer.style.animation = 'headerDropdownMenuBodyBlurOn .2s linear';
                dropdownMenuContainer.style.animation = 'headerDropdownMenuContainerAppear .2s linear';
                setTimeout(() => {
                    dropdownMenuCover.style.display = 'block';
                    bodyContainer.style.filter = 'blur(5px)';
                    dropdownMenuContainer.style.display = 'flex';
                }, 200);
            });
            dropdownMenuCloseButton.addEventListener('click', () => {
                dropdownMenuCover.style.animation = 'headerDropdownCoverDisappear .2s linear';
                bodyContainer.style.animation = 'headerDropdownMenuBodyBlurOff .2s linear';
                dropdownMenuContainer.style.animation = 'headerDropdownMenuContainerDisappear .2s linear';
                setTimeout(() => {
                    dropdownMenuCover.style.display = 'none';
                    bodyContainer.style.filter = '';
                    dropdownMenuContainer.style.display = 'none';
                }, 200);
            });

            // Back button event handler
            backButton.addEventListener('click', () => {
                if (window.location.origin.includes("http://127.0.0.1:3000")) {
                    window.location.pathname = 'guild/dashboard.html';
                } else {
                    window.location.pathname = 'guild/dashboard';
                };
            });
            // Start of page code
            const channelList = new Array();
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ msg, channels }) => {
                const dataList = document.getElementById('body-welcome-card-datalist-channel');
                channels.forEach((channel) => {
                    const option = document.createElement('option');
                    option.id = `${channel.id}`;
                    option.value = `${channel.name}`;
                    dataList.appendChild(option);
                    channelList.push(channel);
                });
            });
            let channel;
            fetch('https://api.godseyeofficial.xyz/api/guild/welcome/info?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then((response) => {
                if (response.msg === 'Success') {
                    const { channelId, message, color, title } = response.welcomeInfo;
                    const channelInput = document.getElementById('body-welcome-input-channel');
                    const targetChannel = channelList.find(c => c.id === channelId);
                    if (targetChannel) {
                        channelInput.value = targetChannel.name;
                        channel = targetChannel.id;
                    };
                    const titleInput = document.getElementById('body-welcome-input-title');
                    titleInput.innerHTML = title.split("<").join("﹤").split(">").join("﹥");
                    const messageInput = document.getElementById('body-welcome-input-message');
                    messageInput.innerHTML = message.split("<").join("﹤").split(">").join("﹥");
                    const colorInput = document.getElementById('body-welcome-input-color');
                    colorInput.value = color;
                    if (colorInput.value !== '' && colorInput.innerHTML) {
                        card.style.borderColor = colorInput.value;
                    } else {
                        card.style.borderColor = '#FF0000';
                    };
                    if (messageInput.innerHTML !== '' && messageInput.innerHTML) {
                        cardMessage.innerHTML = messageInput.innerHTML.split("<").join("﹤").split(">").join("﹥");
                    } else {
                        cardMessage.innerHTML = 'Welcome Message';
                    };
                    if (titleInput.innerHTML !== '' && titleInput.innerHTML) {
                        cardTitle.innerHTML = titleInput.innerHTML.split("<").join("﹤").split(">").join("﹥");
                    } else {
                        cardTitle.innerHTML = 'Title';
                    };
                };
            });
            const messageInput = document.getElementById('body-welcome-input-message');
            const cardMessage = document.getElementById('body-welcome-card-message');
            messageInput.addEventListener('input', () => {
                const value = messageInput.innerHTML;
                if (value !== '' && value) {
                    cardMessage.innerHTML = value.split("<").join("﹤").split(">").join("﹥");
                } else {
                    cardMessage.innerHTML = 'Welcome Message';
                };
            });
            const titleInput = document.getElementById('body-welcome-input-title');
            const cardTitle = document.getElementById('body-welcome-card-title');
            titleInput.addEventListener('input', () => {
                if (titleInput.innerHTML.length <= 256) {
                    const value = titleInput.innerHTML;
                    if (value !== '' && value) {
                        cardTitle.innerHTML = value.split("<").join("﹤").split(">").join("﹥");
                    } else {
                        cardTitle.innerHTML = 'Title';
                    };
                } else {
                    titleInput.innerHTML = titleInput.innerHTML + '\b';
                }
            });
            const colorInput = document.getElementById('body-welcome-input-color');
            const card = document.getElementById('body-welcome-card');
            colorInput.addEventListener('input', () => {
                const value = colorInput.value;
                if (value !== '' && value) {
                    card.style.borderColor = value;
                    colorCodeInput.value = value;
                } else {
                    card.style.borderColor = '#FF0000';
                    colorCodeInput.value = '';
                };
            });
            const saveButton = document.getElementById('body-welcome-button-save');
            const channelInput = document.getElementById('body-welcome-input-channel');
            channelInput.addEventListener('change', ({ target }) => {
                channel = channelList.find(c => c.name === channelInput.value).id;
            });
            saveButton.addEventListener('click', () => {
                if (channel && titleInput.innerHTML && colorInput.value && messageInput.innerHTML) {
                    fetch('https://api.godseyeofficial.xyz/api/guild/welcome/save?' + new URLSearchParams({ guildId: targetGuildId, channelId: channel, message: messageInput.innerHTML, color: colorInput.value, title: titleInput.innerHTML })).then((result) => {
                        return result.json();
                    }).then((response) => {
                        if (response.msg === 'Success') {
                            successPopup();
                        };
                    });
                } else {
                    const errorContainer = document.getElementById('error-container');
                    const errorMessage = document.getElementById('error-message');
                    errorContainer.style.display = 'block';
                    errorMessage.innerHTML = "Make sure all fields are filled in correctly!";
                    setTimeout(() => {
                        errorContainer.style.display = '';
                        errorMessage.innerHTML = "Error";
                    }, 5000);
                };
            });
            const colorCodeInput = document.getElementById('body-welcome-input-color-code');
            colorCodeInput.addEventListener('input', ({ target }) => {
                if (target.value.length >= 7) {
                    colorInput.value = target.value;
                    card.style.borderColor = target.value;
                };
            });
            // End of page code
        });
    });
});

// Functions
let runningPopup = false;
function successPopup() {
    const popup = document.getElementById('success-popup');
    const bar = document.getElementById('success-popup-bar');
    if (runningPopup === false) {
        runningPopup = true;
        popup.style.display = 'flex';
        popup.style.animation = '5s linear ease-in-out';
        popup.style.animationName = 'successPopup'
        bar.style.animation = '2.5s linear ease-in-out';
        bar.style.animationName = 'successBar'
        setTimeout(() => {
            bar.style.width = '100%'
        }, 2500);
        setTimeout(() => {
            popup.style.animation = '';
            bar.style.animation = '';
            popup.style.display = '';
            runningPopup = false;
        }, 5000);
    };
};
