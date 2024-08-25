// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const ranksList = document.getElementById('body-rankboard-list');

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
                    if (window.location.origin.includes("http://127.0.0.1:3000")) {
                        window.location.pathname = 'guild/dashboard.html';
                    } else {
                        window.location.pathname = 'guild/dashboard';
                    };
                };
            });
            // Start of page code
            let index = [];
            index[targetGuildId] = 0;
            function createRankboard(member) {
                index[targetGuildId] = index[targetGuildId] + 1;
                const list = document.getElementById('body-rankboard-list');
                const li = document.createElement('li');
                li.className = 'body-rankboard-list-item';
                li.id = `body-rankboard-list-item-${member.memberId}`;
                list.appendChild(li);
                const h1_1 = document.createElement('h1');
                h1_1.className = 'body-rankboard-list-item-username';
                h1_1.id = `body-rankboard-list-item-username-${member.memberId}`;
                h1_1.innerHTML = `${index[targetGuildId]}. ${member.username}`;
                li.appendChild(h1_1);
                const xpContainer = document.createElement('div');
                xpContainer.className = "body-rankboard-list-item-xpContainer";
                li.appendChild(xpContainer);
                const h1_3 = document.createElement('h1');
                h1_3.className = 'body-rankboard-list-item-xp';
                h1_3.id = `body-rankboard-list-item-xp-${member.memberId}`;
                h1_3.innerHTML = `Lvl: ${member.level.toLocaleString()} [${member.xp.toLocaleString()} XP]`;
                xpContainer.appendChild(h1_3);
                const span = document.createElement('span');
                span.className = 'body-rankboard-list-item-span';
                span.id = `body-rankboard-list-item-span-${member.memberId}`;
                li.appendChild(span);
                const button = document.createElement('button');
                button.className = 'body-rankboard-list-item-button';
                button.id = `body-rankboard-list-item-button-${member.memberId}`;
                button.innerHTML = '⟳ Reset XP';
                span.appendChild(button);
                button.addEventListener('click', () => {
                    fetch('https://api.godseyeofficial.xyz/api/guild/user/rank/reset?' + new URLSearchParams({ guildId: targetGuildId, userId: member.memberId })).then((result) => {
                        return result.json();
                    }).then((response) => {
                        if (response.msg === 'Success') {
                            successPopup();
                            fetch('https://api.godseyeofficial.xyz/api/guild/user/ranks?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then((response) => {
                                setTimeout(() => {
                                    list.innerHTML = '';
                                    index[targetGuildId] = 0;
                                    response.ranks.forEach((member) => {
                                        createRankboard(member);
                                    })
                                }, 2500);
                            });
                        };
                    });
                });
            };
            fetch('https://api.godseyeofficial.xyz/api/guild/user/ranks?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then((response) => {
                if (response.msg === 'Success') {
                    if (response.ranks.length === 0) {
                        const errorMessage = document.getElementById('body-rankboard-message-error-noResults');
                        errorMessage.style.display = 'block';
                    } else {
                        const res = document.getElementById('body-rankboard-list');
                        if (res) {
                            res.remove();
                            const ul = document.createElement('ul');
                            ul.className = 'body-rankboard-list';
                            ul.id = 'body-rankboard-list';
                            bodyContainer.appendChild(ul);
                        };
                        ranksList.innerHTML = '';
                        response.ranks.forEach((member) => {
                            createRankboard(member);
                        })
                    }
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
