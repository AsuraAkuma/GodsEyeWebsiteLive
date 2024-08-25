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
const channelInput = document.getElementById('body-section-settings-row-input-channel');
const messageInput = document.getElementById('body-section-settings-row-input-message');
const xpMultInput = document.getElementById('body-section-settings-row-input-xpMult');
const noXpChannelInput = document.getElementById('body-section-settings-row-input-noXp-channel');
const noXpRoleInput = document.getElementById('body-section-settings-row-input-noXp-role');
const noXpChannelList = document.getElementById('body-section-settings-row-noXpLists-channel');
const noXpRoleList = document.getElementById('body-section-settings-row-noXpLists-role');
const xpSaveButton = document.getElementById('body-section-settings-row-button-xp-save');
const msgSaveButton = document.getElementById('body-section-settings-row-button-message-save');
const xpMultMsg = document.getElementById('body-section-settings-row-text-xpMult');
let noXpChannelsArr = new Array();
let noXpRolesArr = new Array();
const rankButtonAdd = document.getElementById('body-section-rankRoles-row-rank-button');
const rankRoleInput = document.getElementById('body-section-rankRoles-row-role-input');
const rankLevelInput = document.getElementById('body-section-rankRoles-row-rank-input');
const rankRewardList = document.getElementById('body-section-rankRoles-row-rankRewards');
let targetRankRole = '';

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
            }).then(({ channels }) => {
                channels.forEach((channel) => {
                    const option = document.createElement('option');
                    option.innerHTML = `${channel.name}`;
                    channelList.appendChild(option);
                });
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/roles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then(({ roles }) => {
                    roles.forEach((role) => {
                        const option = document.createElement('option');
                        option.innerHTML = `${role.name}`;
                        roleList.appendChild(option);
                    });
                    fetch('https://api.godseyeofficial.xyz/api/guild/user/rank/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ msg, settings }) => {
                        if (msg === 'Success') {
                            if (settings.channelId) {
                                const channelName = channels.find(c => c.id === settings.channelId).name;
                                channelInput.value = channelName;
                            };
                            if (settings.message) {
                                messageInput.value = settings.message;
                            };
                            if (settings.xpMultiplier) {
                                xpMultInput.value = settings.xpMultiplier;
                                xpMultMsg.innerHTML = `XP/Msg: ${10 * parseInt(settings.xpMultiplier)}`;
                            };
                            if (settings.noXpChannels) {
                                settings.noXpChannels.forEach((channel) => {
                                    const targetChannel = channels.find(c => c.id === channel);
                                    const item = document.createElement('li');
                                    item.className = 'body-section-row-list-item';
                                    noXpChannelList.appendChild(item);
                                    const div = document.createElement('div');
                                    div.className = 'center-vert';
                                    div.style.width = '100%';
                                    div.style.height = '100%';
                                    item.appendChild(div);
                                    const name = document.createElement('h1');
                                    name.className = 'body-section-row-list-item-name';
                                    div.appendChild(name);
                                    if (targetChannel) {
                                        name.innerHTML = targetChannel.name;
                                        noXpChannelsArr.push(targetChannel.id);
                                        noXpChannelInput.value = "";
                                        item.addEventListener('click', () => {
                                            noXpChannelsArr = noXpChannelsArr.filter(c => c !== targetChannel.id);
                                            item.remove();
                                        });
                                    } else {
                                        item.remove();
                                    };
                                });
                            };
                            if (settings.noXpRoles) {
                                settings.noXpRoles.forEach((role) => {
                                    const targetRole = roles.find(c => c.id === role);
                                    const item = document.createElement('li');
                                    item.className = 'body-section-row-list-item';
                                    noXpRoleList.appendChild(item);
                                    const div = document.createElement('div');
                                    div.className = 'center-vert';
                                    div.style.width = '100%';
                                    div.style.height = '100%';
                                    item.appendChild(div);
                                    const name = document.createElement('h1');
                                    name.className = 'body-section-row-list-item-name';
                                    div.appendChild(name);
                                    if (targetRole) {
                                        name.innerHTML = targetRole.name;
                                        noXpRolesArr.push(targetRole.id);
                                        noXpRoleInput.value = "";
                                        item.addEventListener('click', () => {
                                            noXpRolesArr = noXpRolesArr.filter(r => r !== targetRole.id);
                                            item.remove();
                                        });
                                    } else {
                                        item.remove();
                                    };
                                });
                            };
                        };
                        function createRankRewards() {
                            fetch('https://api.godseyeofficial.xyz/api/guild/user/rank/rewards?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then(({ msg, rewards }) => {
                                if (msg === 'Success') {
                                    rankRewardList.innerHTML = '';
                                    rewards.forEach((reward) => {
                                        const item = document.createElement('div');
                                        item.className = 'body-section-list-rankRewards-item';
                                        rankRewardList.appendChild(item);
                                        const center = document.createElement('div');
                                        center.className = 'center-vert body-section-list-rankRewards-item-center1';
                                        item.appendChild(center);
                                        const roleName = document.createElement('h1');
                                        roleName.className = 'body-section-list-rankRewards-item-roleName';
                                        const role = roles.find(r => r.id === reward.roleId);
                                        if (role) {
                                            roleName.innerHTML = role.name;
                                        } else {
                                            roleName.innerHTML = 'Deleted Role';
                                        };
                                        center.appendChild(roleName);
                                        const center2 = document.createElement('div');
                                        center2.className = 'center-vert body-section-list-rankRewards-item-center2';
                                        item.appendChild(center2);
                                        const rankNumber = document.createElement('h1');
                                        rankNumber.className = 'body-section-list-rankRewards-item-rankNumber';
                                        rankNumber.innerHTML = `Rank: ${reward.levelReq}`;
                                        center2.appendChild(rankNumber);
                                        const buttonContainer = document.createElement('span');
                                        buttonContainer.className = 'body-section-list-rankRewards-item-buttonContainer';
                                        item.appendChild(buttonContainer);
                                        const editButton = document.createElement('button');
                                        editButton.className = 'body-section-list-rankRewards-item-buttonContainer-button';
                                        editButton.innerHTML = "Edit";
                                        buttonContainer.appendChild(editButton);
                                        const deleteButton = document.createElement('button');
                                        deleteButton.className = 'body-section-list-rankRewards-item-buttonContainer-button';
                                        deleteButton.innerHTML = "Delete";
                                        buttonContainer.appendChild(deleteButton);
                                        editButton.addEventListener('click', () => {
                                            rankRoleInput.value = role.name;
                                            rankLevelInput.value = reward.levelReq;
                                            targetRankRole = role.id;
                                            rankButtonAdd.innerHTML = "Save";
                                        });
                                        deleteButton.addEventListener('click', () => {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/user/rank/reward/delete?' + new URLSearchParams({ roleId: role.id })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg === 'Success') {
                                                    successPopup();
                                                    setTimeout(() => {
                                                        createRankRewards();
                                                    }, 2500);
                                                };
                                            });
                                        });
                                    });
                                };
                            });
                        };
                        createRankRewards();
                        let index = [];
                        function createRankboard() {
                            index[targetGuildId] = 0;
                            const list = document.getElementById('body-section-memberRanks-list');
                            list.innerHTML = '';
                            fetch('https://api.godseyeofficial.xyz/api/guild/user/ranks?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then((response) => {
                                response.ranks.forEach((member) => {
                                    index[targetGuildId] = index[targetGuildId] + 1;
                                    const li = document.createElement('li');
                                    li.className = 'body-section-memberRanks-list-item';
                                    li.id = `body-section-memberRanks-list-item-${member.memberId}`;
                                    list.appendChild(li);
                                    const center1 = document.createElement('div')
                                    center1.className = 'center-vert';
                                    li.appendChild(center1);
                                    const h1_1 = document.createElement('h1');
                                    h1_1.className = 'body-section-memberRanks-list-item-username';
                                    h1_1.id = `body-section-memberRanks-list-item-username-${member.memberId}`;
                                    h1_1.innerHTML = `${index[targetGuildId]}. ${member.username}#${member.discriminator}`;
                                    center1.appendChild(h1_1);
                                    const xpContainer = document.createElement('div');
                                    xpContainer.className = "body-section-memberRanks-list-item-xpContainer";
                                    li.appendChild(xpContainer);
                                    const h1_3 = document.createElement('h1');
                                    h1_3.className = 'body-section-memberRanks-list-item-xp';
                                    h1_3.id = `body-section-memberRanks-list-item-xp-${member.memberId}`;
                                    h1_3.innerHTML = `Lvl: ${member.level.toLocaleString()} [${member.xp.toLocaleString()} XP]`;
                                    xpContainer.appendChild(h1_3);
                                    const span = document.createElement('span');
                                    span.className = 'body-section-memberRanks-list-item-span';
                                    span.id = `body-section-memberRanks-list-item-span-${member.memberId}`;
                                    li.appendChild(span);
                                    const button = document.createElement('button');
                                    button.className = 'body-section-memberRanks-list-item-button';
                                    button.id = `body-section-memberRanks-list-item-button-${member.memberId}`;
                                    button.innerHTML = '⟳ Reset XP';
                                    span.appendChild(button);
                                    button.addEventListener('click', () => {
                                        fetch('https://api.godseyeofficial.xyz/api/guild/user/rank/reset?' + new URLSearchParams({ guildId: targetGuildId, userId: member.memberId })).then((result) => {
                                            return result.json();
                                        }).then((response) => {
                                            if (response.msg === 'Success') {
                                                successPopup();
                                                setTimeout(() => {
                                                    createRankboard()
                                                }, 2500);
                                            };
                                        });
                                    });
                                })
                            });
                        };
                        createRankboard()
                        rankButtonAdd.addEventListener('click', () => {
                            if (!rankRoleInput.value) {
                                alert('You must provide a role!');
                                return;
                            };
                            if (!rankLevelInput.value) {
                                alert('You must provide a rank number!');
                                return;
                            };
                            const targetRole = roles.find(r => r.name.toLowerCase() === rankRoleInput.value.toLowerCase());
                            if (!targetRole) {
                                alert('This role was not found please check spelling!');
                                return;
                            };
                            if (rankButtonAdd.innerHTML.includes('Add')) {
                                fetch('https://api.godseyeofficial.xyz/api/guild/user/rank/reward/add?' + new URLSearchParams({ guildId: targetGuildId, roleId: targetRole.id, rank: rankLevelInput.value })).then((result) => {
                                    return result.json();
                                }).then(({ msg }) => {
                                    if (msg === 'Success') {
                                        successPopup();
                                        setTimeout(() => {
                                            createRankRewards();
                                        }, 2500);
                                    } else {
                                        alert(msg);
                                        return;
                                    };
                                });
                            };
                            if (rankButtonAdd.innerHTML.includes('Save')) {
                                fetch('https://api.godseyeofficial.xyz/api/guild/user/rank/reward/edit?' + new URLSearchParams({ targetRank: targetRankRole, rank: rankLevelInput.value, roleId: targetRole.id, guildId: targetGuildId })).then((result) => {
                                    return result.json();
                                }).then(({ msg }) => {
                                    if (msg === 'Success') {
                                        successPopup();
                                        setTimeout(() => {
                                            createRankRewards();
                                        }, 2500);
                                    } else {
                                        alert(msg);
                                        return;
                                    };
                                });
                            };
                        });

                        msgSaveButton.addEventListener('click', () => {
                            if (!channelInput.value) {
                                alert('You must provide a channel!');
                                return;
                            };
                            if (!messageInput.value) {
                                alert('You must provide a message!');
                                return;
                            };
                            if (!messageInput.value.includes("<user>")) {
                                alert('You must use <user> in your message!');
                                return;
                            };
                            if (!messageInput.value.includes("<rank>")) {
                                alert('You must use <rank> in your message!');
                                return;
                            };
                            const targetChannel = channels.find(c => c.name.toLowerCase() === channelInput.value.toLowerCase());
                            if (!targetChannel) {
                                alert('This channel was not found, please check the spelling!');
                                return;
                            }
                            fetch('https://api.godseyeofficial.xyz/api/guild/user/rank/settings/message/save?' + new URLSearchParams({ guildId: targetGuildId, channel: targetChannel.id, message: messageInput.value })).then((result) => {
                                return result.json();
                            }).then(({ msg }) => {
                                if (msg === 'Success') {
                                    successPopup();
                                };
                            });
                        });
                        xpSaveButton.addEventListener('click', () => {
                            fetch('https://api.godseyeofficial.xyz/api/guild/user/rank/settings/xp/save?' + new URLSearchParams({ guildId: targetGuildId, multiplier: xpMultInput.value, noXpChannels: noXpChannelsArr.join(","), noXpRoles: noXpRolesArr.join(",") })).then((result) => {
                                return result.json();
                            }).then(({ msg }) => {
                                if (msg === 'Success') {
                                    successPopup();
                                };
                            });
                        });
                        xpMultInput.addEventListener('input', () => {
                            if (!xpMultInput.value) {
                                xpMultInput.value = 1;
                            };
                            xpMultMsg.innerHTML = `XP/Msg: ${10 * xpMultInput.value}`;
                        });
                        noXpChannelInput.addEventListener('keypress', ({ key }) => {
                            if (key === "Enter") {
                                const targetChannel = channels.find(c => c.name.toLowerCase() === noXpChannelInput.value.toLowerCase());
                                if (noXpChannelsArr.includes(targetChannel.id)) {
                                    alert('This channel has already been added!');
                                    noXpChannelInput.value = "";
                                    return;
                                };
                                const item = document.createElement('li');
                                item.className = 'body-section-row-list-item';
                                noXpChannelList.appendChild(item);
                                const div = document.createElement('div');
                                div.className = 'center-vert';
                                div.style.width = '100%';
                                div.style.height = '100%';
                                item.appendChild(div);
                                const name = document.createElement('h1');
                                name.className = 'body-section-row-list-item-name';
                                div.appendChild(name);
                                if (targetChannel) {
                                    name.innerHTML = targetChannel.name;
                                    noXpChannelsArr.push(targetChannel.id);
                                    noXpChannelInput.value = "";
                                    item.addEventListener('click', () => {
                                        noXpChannelsArr.filter(c => c.id !== targetChannel.id);
                                        item.remove();
                                    });
                                } else {
                                    item.remove();
                                };
                            };
                        });
                        noXpRoleInput.addEventListener('keypress', ({ key }) => {
                            if (key === "Enter") {
                                const targetRole = roles.find(c => c.name.toLowerCase() === noXpRoleInput.value.toLowerCase());
                                if (noXpRolesArr.includes(targetRole.id)) {
                                    alert('This role has already been added!');
                                    noXpRoleInput.value = "";
                                    return;
                                };
                                const item = document.createElement('li');
                                item.className = 'body-section-row-list-item';
                                noXpRoleList.appendChild(item);
                                const div = document.createElement('div');
                                div.className = 'center-vert';
                                div.style.width = '100%';
                                div.style.height = '100%';
                                item.appendChild(div);
                                const name = document.createElement('h1');
                                name.className = 'body-section-row-list-item-name';
                                div.appendChild(name);
                                if (targetRole) {
                                    name.innerHTML = targetRole.name;
                                    noXpRolesArr.push(targetRole.id);
                                    noXpRoleInput.value = "";
                                    item.addEventListener('click', () => {
                                        noXpRolesArr.filter(r => r.id !== targetRole.id);
                                        item.remove();
                                    });
                                } else {
                                    item.remove();
                                };
                            };
                        });
                    });
                });
            });
            loaderContainer.style.display = 'none';
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
