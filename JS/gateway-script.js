// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const channelInput = document.getElementById('body-panel-input-channel');
const rolesInput = document.getElementById('body-panel-input-roles');
const channelDataList = document.getElementById('channel-list');
const roleDataList = document.getElementById('role-list');
const roleList = document.getElementById('body-panel-roleList');
const saveButton = document.getElementById('body-panel-button-save');
let activeRoles = new Array();

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
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ msg, channels }) => {
                if (!channels.msg) {
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/roles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ msg, roles }) => {
                        if (msg === "Success") {
                            channels.forEach((channel) => {
                                const option = document.createElement('option');
                                option.innerHTML = `${channel.name}`;
                                channelDataList.appendChild(option);
                            });
                            roles.forEach((role) => {
                                const option = document.createElement('option');
                                option.innerHTML = `${role.name}`;
                                roleDataList.appendChild(option);
                            });
                            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/gateway?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then(({ msg, info }) => {
                                if (msg === 'Success') {
                                    const targetChannel = channels.find(c => c.id === info.channelId);
                                    if (targetChannel) {
                                        channelInput.value = `${targetChannel.name}`;
                                    };
                                    info.roles.forEach((role) => {
                                        const targetRole = roles.find(r => r.id === role);
                                        if (targetRole) {
                                            activeRoles.push(targetRole);
                                        };
                                    });
                                    createRoles(activeRoles, roles);
                                };
                            });
                        };
                        rolesInput.addEventListener('change', () => {
                            const targetRole = roles.find(r => r.name === rolesInput.value);
                            activeRoles.push(targetRole);
                            roleDataList.innerHTML = "";
                            roles.forEach((role) => {
                                if (!activeRoles.includes(role)) {
                                    const option = document.createElement('option');
                                    option.innerHTML = `${role.name}`;
                                    roleDataList.appendChild(option);
                                }
                            });
                            createRoles(activeRoles, roles);
                            rolesInput.value = "";
                        });
                        saveButton.addEventListener('click', () => {
                            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/gateway/update?' + new URLSearchParams({ guildId: targetGuildId, roles: activeRoles.map((v, i) => v.id).join(","), channel: channels.find(c => c.name === channelInput.value).id })).then((result) => {
                                return result.json();
                            }).then(({ msg }) => {
                                if (msg === "Success") {
                                    successPopup();
                                    createRoles(activeRoles, roles);
                                };
                            });
                        });
                    });
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
function createRoles(newRoles, roles) {
    roleList.innerHTML = "";
    newRoles.forEach((role) => {
        const item = document.createElement('li');
        item.className = 'body-panel-roleList-item';
        item.id = `body-panel-roleList-item-${role.id}`;
        roleList.appendChild(item);
        const h1 = document.createElement('h1');
        h1.className = 'body-panel-roleList-item-h1';
        h1.id = `body-panel-roleList-item-h1-${role.id}`;
        h1.innerHTML = `${role.name}`;
        h1.style.color = `${role.color}`;
        item.appendChild(h1);
        item.addEventListener('click', () => {
            const newList = new Array();
            activeRoles.forEach((r) => {
                if (r.id !== role.id) {
                    newList.push(r)
                };
            });
            activeRoles = newList;
            createRoles(newList, newList, roles);
            roleDataList.innerHTML = "";
            roles.forEach((role) => {
                if (!activeRoles.includes(role)) {
                    const option = document.createElement('option');
                    option.innerHTML = `${role.name}`;
                    roleDataList.appendChild(option);
                }
            });
        });
    });
};
