// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const channelList = document.getElementById('channel-list');
const roleList = document.getElementById('role-list');
const activeGiveawayList = document.getElementById('giveaway-activelist-list');
const emojiSelect = document.getElementById('giveaway-settings-reaction');
const settingsSaveButton = document.getElementById('giveaway-settingspanel-button-save');
const channelInput = document.getElementById('giveaway-settings-channel');
const creationSaveButton = document.getElementById('giveaway-creationpanel-button-save');
const nameInput = document.getElementById('giveaway-editor-name');
const prizeInput = document.getElementById('giveaway-editor-prize');
const endDateInput = document.getElementById('giveaway-editor-enddate');
const roleInput = document.getElementById('giveaway-editor-allowedroles');
const roleListElement = document.getElementById('giveaway-editor-role-list');
let targetGiveaway = '';
let activeRoleList = [];
let targetGuildId;
// Page load event listener
window.addEventListener('load', () => {
    // Code to execute once page is loaded
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    let accessToken;
    let tokenType;
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
                if (msg === 'Success') {
                    channels.forEach((channel) => {
                        const option = document.createElement('option');
                        option.innerHTML = channel.name;
                        channelList.appendChild(option);
                    });
                } else {
                    window.location.reload();
                };
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/roles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then(({ msg, roles }) => {
                    if (msg === 'Success') {
                        roles.forEach((role) => {
                            const option = document.createElement('option');
                            option.innerHTML = role.name;
                            roleList.appendChild(option);
                        });
                    } else {
                        window.location.reload();
                    };
                    fetch('https://api.godseyeofficial.xyz/api/client/emojis?').then((result) => {
                        return result.json();
                    }).then(({ msg, emojis }) => {
                        if (msg === 'Success') {
                            emojis.forEach((emoji) => {
                                const targetGroup = document.getElementById(emoji.category);
                                const option = document.createElement('option');
                                option.innerHTML = emoji.emoji;
                                option.value = emoji.emoji;
                                targetGroup.appendChild(option);
                            });
                            fetch('https://api.godseyeofficial.xyz/api/guild/giveaways/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then(({ msg, giveawaySettings }) => {
                                if (msg === 'Success') {
                                    channelInput.value = channels.find(c => c.id === giveawaySettings.giveawayChannel).name;
                                    emojiSelect.value = giveawaySettings.reaction;
                                };
                                settingsSaveButton.addEventListener('click', () => {
                                    if (channelInput === '') {
                                        alert('Please provide a channel');
                                        return;
                                    };
                                    const targetChannel = channels.find(c => c.name.toLowerCase() === channelInput.value);
                                    if (!targetChannel) {
                                        alert('No channel could be found with that name!');
                                        return;
                                    };
                                    fetch('https://api.godseyeofficial.xyz/api/guild/giveaways/settings/save?' + new URLSearchParams({ guildId: targetGuildId, channelId: targetChannel.id, reaction: emojiSelect.value })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            successPopup();
                                        };
                                    });
                                });
                                endDateInput.addEventListener('change', () => {
                                    // console.log(endDateInput.value)
                                })
                                roleInput.addEventListener('change', () => {
                                    const targetRole = roles.find(r => r.name.toLowerCase() === roleInput.value.toLowerCase());
                                    if (targetRole) {
                                        const item = document.createElement('li');
                                        item.className = 'giveaway-editor-role-list-item';
                                        roleListElement.appendChild(item);
                                        const container = document.createElement('div');
                                        container.className = 'giveaway-editor-role-list-item-container';
                                        item.appendChild(container);
                                        const text = document.createElement('h2');
                                        text.className = 'giveaway-editor-role-list-item-container-text';
                                        text.innerHTML = `${targetRole.name}`;
                                        container.appendChild(text);
                                        activeRoleList.push(targetRole.id);
                                        roleInput.value = '';
                                        item.addEventListener('click', () => {
                                            item.remove();
                                            activeRoleList = activeRoleList.filter((a, b) => a !== targetRole.id);
                                        });
                                    };
                                });
                                creationSaveButton.addEventListener('click', () => {
                                    if (nameInput.value === '') {
                                        alert('You must provide a name!');
                                        return;
                                    };
                                    if (prizeInput.value === '') {
                                        alert('You must provide a prize!');
                                        return;
                                    };
                                    if (endDateInput.value === '') {
                                        alert('You must provide an end date!');
                                        return;
                                    };
                                    const endDate = new Date(endDateInput.value);
                                    fetch('https://api.godseyeofficial.xyz/api/guild/giveaways/create?' + new URLSearchParams({ guildId: targetGuildId, name: nameInput.value, prize: prizeInput.value, allowedRoles: activeRoleList.join('-'), endDate: endDate.valueOf(), target: targetGiveaway })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            5
                                            nameInput.value = '';
                                            prizeInput.value = '';
                                            endDateInput.value = '';
                                            activeRoleList = [];
                                            roleListElement.innerHTML = '';
                                            roleInput.value = '';
                                            successPopup();
                                            setTimeout(() => {
                                                createGiveaways();
                                                targetGiveaway = '';
                                            }, 2500);
                                        } else {
                                            alert(msg);
                                        };
                                    });
                                });
                            });
                            createGiveaways();
                        } else {
                            window.location.reload();
                        };
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

                    function createGiveaways() {
                        fetch('https://api.godseyeofficial.xyz/api/guild/giveaways?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                            return result.json();
                        }).then(({ msg, giveaways }) => {
                            if (msg === 'Success') {
                                activeGiveawayList.innerHTML = '';
                                giveaways.forEach((giveaway) => {
                                    const item = document.createElement('li');
                                    item.className = 'giveaway-activelist-list-item';
                                    activeGiveawayList.appendChild(item);
                                    const center = document.createElement('div');
                                    center.className = 'center-vert giveaway-activelist-list-item-center';
                                    item.appendChild(center);
                                    const name = document.createElement('h2');
                                    name.className = 'giveaway-activelist-list-item-name';
                                    name.innerHTML = `Name: ${giveaway.name}`;
                                    center.appendChild(name);
                                    const entries = document.createElement('h2');
                                    entries.className = 'giveaway-activelist-list-item-entries';
                                    entries.innerHTML = `Entries: ${giveaway.participants.length}`;
                                    center.appendChild(entries);
                                    const buttonContainer = document.createElement('div');
                                    buttonContainer.className = 'giveaway-activelist-list-item-buttoncontainer';
                                    item.appendChild(buttonContainer);
                                    if (giveaway.ended === false) {
                                        const editButton = document.createElement('button');
                                        editButton.className = 'giveaway-activelist-list-item-buttoncontainer-button';
                                        editButton.innerHTML = 'Edit';
                                        buttonContainer.appendChild(editButton);
                                        editButton.addEventListener('click', () => {
                                            nameInput.value = giveaway.name;
                                            prizeInput.value = giveaway.prize;
                                            const endDate = new Date(giveaway.endDate).toISOString().split(":");
                                            endDate.splice(2)
                                            endDateInput.value = endDate.join(":");
                                            activeRoleList = [];
                                            targetGiveaway = giveaway._id;
                                            creationSaveButton.innerHTML = 'Save';
                                            giveaway.allowedRoles.forEach((role) => {
                                                const targetRole = roles.find(r => r.id === role);
                                                if (targetRole) {
                                                    const item = document.createElement('li');
                                                    item.className = 'giveaway-editor-role-list-item';
                                                    roleListElement.appendChild(item);
                                                    const container = document.createElement('div');
                                                    container.className = 'giveaway-editor-role-list-item-container';
                                                    item.appendChild(container);
                                                    const text = document.createElement('h2');
                                                    text.className = 'giveaway-editor-role-list-item-container-text';
                                                    text.innerHTML = `${targetRole.name}`;
                                                    container.appendChild(text);
                                                    activeRoleList.push(targetRole.id);
                                                    roleInput.value = '';
                                                    item.addEventListener('click', () => {
                                                        item.remove();
                                                        activeRoleList = activeRoleList.filter((a, b) => a !== targetRole.id);
                                                    });
                                                };
                                            });

                                        });
                                        const endButton = document.createElement('button');
                                        endButton.className = 'giveaway-activelist-list-item-buttoncontainer-button';
                                        endButton.innerHTML = 'End';
                                        buttonContainer.appendChild(endButton);
                                        endButton.addEventListener('click', () => {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/giveaways/end?' + new URLSearchParams({ guildId: targetGuildId, target: giveaway._id })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg === 'Success') {
                                                    successPopup();
                                                    setTimeout(() => {
                                                        createGiveaways();
                                                    }, 2500);
                                                } else {
                                                    alert(msg);
                                                };
                                            });
                                        });
                                    } else {
                                        const rerollButton = document.createElement('button');
                                        rerollButton.className = 'giveaway-activelist-list-item-buttoncontainer-button';
                                        rerollButton.innerHTML = 'Re-Roll';
                                        buttonContainer.appendChild(rerollButton);
                                        rerollButton.addEventListener('click', () => {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/giveaways/reroll?' + new URLSearchParams({ guildId: targetGuildId, target: giveaway._id })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg === 'Success') {
                                                    successPopup();
                                                    setTimeout(() => {
                                                        createGiveaways();
                                                    }, 2500);
                                                } else {
                                                    alert(msg);
                                                };
                                            });
                                        });
                                    };
                                    const deleteButton = document.createElement('button');
                                    deleteButton.className = 'giveaway-activelist-list-item-buttoncontainer-button';
                                    deleteButton.innerHTML = 'Delete';
                                    buttonContainer.appendChild(deleteButton);

                                    deleteButton.addEventListener('click', () => {
                                        fetch('https://api.godseyeofficial.xyz/api/guild/giveaways/delete?' + new URLSearchParams({ guildId: targetGuildId, target: giveaway._id })).then((result) => {
                                            return result.json();
                                        }).then(({ msg }) => {
                                            if (msg === 'Success') {
                                                successPopup();
                                                setTimeout(() => {
                                                    createGiveaways();
                                                }, 2500);
                                            } else {
                                                alert(msg);
                                            };
                                        });
                                    });
                                });
                            };

                        });
                    }
                });
            });

            loaderContainer.style.display = 'none';
            // End of page code
        });
    });
});

