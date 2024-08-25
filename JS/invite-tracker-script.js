// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const list = document.getElementById('body-section-list-leaderboard');
const searchButton = document.getElementById('body-section-button-search');
const searchInput = document.getElementById('body-section-input-search');
const memberDataList = document.getElementById('member-list');
const list2 = document.getElementById('body-section-list-rewards');
const roleDataList = document.getElementById('role-list');
const invitesInput = document.getElementById('body-section-input-invites');
const roleInput = document.getElementById('body-section-input-roles');
const activeRoleList = document.getElementById('body-section-list-roles');
const createButton = document.getElementById('body-section-button-create');
const inviteChannelInput = document.getElementById('body-section-subsection-input-channel');
const inviteChannelDataList = document.getElementById('inviteChannel-list');
const inviteChannelButton = document.getElementById('body-section-subsection-button-channel');
const inviteManagerList = document.getElementById('body-section-subsection-list-inviteManager');
const personManagerList = document.getElementById('body-section-subsection-list-personManager');
const bonusInviteInput = document.getElementById('body-section-subsection-input-bonusInvites');
const bonusInviteButton = document.getElementById('body-section-subsection-button-bonusInvites');
const inviteRoleManagerList = document.getElementById('body-section-subsection-list-inviteRoleManager');
const inviteCodeInput = document.getElementById('body-section-subsection-input-inviteCode');
const inviteCodeList = document.getElementById('inviteCodes-list');
const inviteCodeRoleDataList = document.getElementById('inviteRoles-list');
const inviteCodeRoleInput = document.getElementById('body-section-subsection-input-inviteRoles');
const inviteRoleManagerButton = document.getElementById('body-section-subsection-button-inviteRoleManager');
const activeInviteCodeRoleList = document.getElementById('body-section-subsection-list-activeCodeRoles');
const inviteManagerDeleteAllButton = document.getElementById('body-section-subsection-button-deleteAll');
const memberSearchInput = document.getElementById('body-section-subsection-input-memberSearch');
const memberSearchDataList = document.getElementById('bonusInviteMember-list');
const memberSearchButton = document.getElementById('body-section-subsection-button-memberSearch');
const syncButton = document.getElementById('body-section-button-sync');
const inviteManagerPauseAllButton = document.getElementById('body-section-subsection-button-pauseAll');
let activeRoles = new Array();
let targetGuildId;
let selectedRoles = new Array();
selectedRoles[targetGuildId] = new Array();
let index2;
let activeUserId;

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
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/members?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ members }) => {
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then(({ trackerInvites }) => {
                    // Leaderboard
                    let index = 0;
                    if (trackerInvites !== undefined) {
                        trackerInvites.forEach((invite) => {
                            const user = members.find(m => m.id === invite.userId);
                            if (user) {
                                if (invite.realInvites > 0 || invite.bonusInvites > 0) {
                                    const item = document.createElement('li');
                                    item.className = 'body-section-list-item';
                                    item.id = `body-section-list-item-${invite.userId}`;
                                    list.appendChild(item);
                                    const name = document.createElement('h1');
                                    name.className = 'body-section-list-item-name';
                                    name.id = `body-section-list-item-name-${invite.userId}`;
                                    name.innerHTML = `${index + 1}. ${user.name}`;
                                    index++;
                                    item.appendChild(name);
                                    const inviteCount = document.createElement('h1');
                                    inviteCount.className = 'body-section-list-item-inviteCount';
                                    inviteCount.id = `body-section-list-item-inviteCount-${invite.userId}`;
                                    inviteCount.innerHTML = `Real: ${invite.realInvites} | Bonus: ${invite.bonusInvites}`;
                                    item.appendChild(inviteCount);
                                    const span = document.createElement('span');
                                    span.className = 'body-section-list-item-span';
                                    span.id = `body-section-list-item-span-${invite.userId}`;
                                    item.appendChild(span);
                                    const button = document.createElement('button');
                                    button.className = 'body-section-list-item-button-reset';
                                    button.id = `body-section-list-item-button-reset-${invite.userId}`;
                                    button.innerHTML = '⟳ Reset';
                                    span.appendChild(button);
                                    button.addEventListener('click', () => {
                                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/save?' + new URLSearchParams({ guildId: targetGuildId, userId: user.id, invites: '0' })).then((result) => {
                                            return result.json();
                                        }).then(({ msg }) => {
                                            if (msg === 'Success') {
                                                item.remove();
                                                successPopup();
                                            };
                                        });
                                    });
                                    const option = document.createElement('option');
                                    option.innerHTML = `${user.name}`;
                                    memberDataList.appendChild(option);
                                };
                            };
                        });
                    };
                    searchButton.addEventListener('click', () => {
                        const user = members.find((member) => member.name.toLowerCase() == searchInput.value.toLowerCase());
                        const invite = invites.find((invite) => invite.userId === user.id);
                        const item = document.getElementById(`body-section-list-item-${invite.userId}`);
                        item.addEventListener('mouseover', () => {
                            item.style.border = '2px solid red';
                            item.style.boxShadow = '0px 0px 10px 0px red';
                        });
                        item.addEventListener('mouseout', () => {
                            item.style.border = '2px solid var(--geMidGrey)';
                            item.style.boxShadow = 'none';
                        });
                        let pingCount = 0;
                        item.style.border = '2px solid red';
                        item.style.boxShadow = '0px 0px 10px 0px red';
                        setTimeout(() => {
                            item.style.border = '2px solid var(--geMidGrey)';
                            item.style.boxShadow = 'none';
                        }, 500);
                        const ping = setInterval(() => {
                            if (pingCount < 2) {
                                item.style.border = '2px solid red';
                                item.style.boxShadow = '0px 0px 10px 0px red';
                                setTimeout(() => {
                                    item.style.border = '2px solid var(--geMidGrey)';
                                    item.style.boxShadow = 'none';
                                }, 500);
                            } else {
                                clearInterval(ping)
                            };
                            pingCount++;
                        }, 1000);
                        item.parentNode.scrollTop = item.offsetTop - 10;
                    });
                    syncButton.addEventListener('click', () => {
                        window.alert('Syncing Invites!')
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/sync?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                            return result.json();
                        }).then(({ msg }) => {
                            if (msg === 'Success') {
                                syncPopup();
                                list.innerHTML = '';
                                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                    return result.json();
                                }).then(({ trackerInvites }) => {
                                    // Leaderboard
                                    let index = 0;
                                    if (trackerInvites !== undefined) {
                                        trackerInvites.forEach((invite) => {
                                            const user = members.find(m => m.id === invite.userId);
                                            if (user) {
                                                if (invite.realInvites > 0 || invite.bonusInvites > 0) {
                                                    const item = document.createElement('li');
                                                    item.className = 'body-section-list-item';
                                                    item.id = `body-section-list-item-${invite.userId}`;
                                                    list.appendChild(item);
                                                    const name = document.createElement('h1');
                                                    name.className = 'body-section-list-item-name';
                                                    name.id = `body-section-list-item-name-${invite.userId}`;
                                                    name.innerHTML = `${index + 1}. ${user.name}`;
                                                    index++;
                                                    item.appendChild(name);
                                                    const inviteCount = document.createElement('h1');
                                                    inviteCount.className = 'body-section-list-item-inviteCount';
                                                    inviteCount.id = `body-section-list-item-inviteCount-${invite.userId}`;
                                                    inviteCount.innerHTML = `Real: ${invite.realInvites} | Bonus: ${invite.bonusInvites}`;
                                                    item.appendChild(inviteCount);
                                                    const span = document.createElement('span');
                                                    span.className = 'body-section-list-item-span';
                                                    span.id = `body-section-list-item-span-${invite.userId}`;
                                                    item.appendChild(span);
                                                    const button = document.createElement('button');
                                                    button.className = 'body-section-list-item-button-reset';
                                                    button.id = `body-section-list-item-button-reset-${invite.userId}`;
                                                    button.innerHTML = '⟳ Reset';
                                                    span.appendChild(button);
                                                    button.addEventListener('click', () => {
                                                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/save?' + new URLSearchParams({ guildId: targetGuildId, userId: user.id, invites: '0' })).then((result) => {
                                                            return result.json();
                                                        }).then(({ msg }) => {
                                                            if (msg === 'Success') {
                                                                item.remove();
                                                                successPopup();
                                                            };
                                                        });
                                                    });
                                                    const option = document.createElement('option');
                                                    option.innerHTML = `${user.name}`;
                                                    memberDataList.appendChild(option);
                                                };
                                            };
                                        });
                                    };
                                });
                            };
                        });
                    });
                    // Rewards
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/roles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ roles }) => {
                        roles.forEach((role) => {
                            const option = document.createElement('option');
                            option.innerHTML = `${role.name}`;
                            roleDataList.appendChild(option);
                        });
                        createRewardsList(roles);
                    });
                    // Settings
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ msg, invites, trackerInvites }) => {
                        if (msg === 'Success') {
                            invites.forEach((invite) => {
                                const option = document.createElement('option');
                                option.innerHTML = `${invite.code}`;
                                inviteCodeList.appendChild(option);
                            });
                            invites.forEach((invite) => {
                                const item = document.createElement('li');
                                item.className = 'body-section-subsection-list-inviteManager-item';
                                item.id = `body-section-subsection-list-inviteManager-item-${invite.code}`;
                                inviteManagerList.appendChild(item);
                                const h1 = document.createElement('h1');
                                h1.className = 'body-section-subsection-list-inviteManager-item-h1';
                                h1.id = `body-section-subsection-list-inviteManager-item-h1-${invite.code}`;
                                h1.innerHTML = `Code: ${invite.code} <br> Inviter: ${invite.inviter.name} <br> Uses: ${invite.uses}`;
                                item.appendChild(h1);
                                const span = document.createElement('span');
                                span.className = 'body-section-subsection-list-inviteManager-item-span';
                                span.id = `body-section-subsection-list-inviteManager-item-span-${invite.code}`;
                                item.appendChild(span);
                                const button = document.createElement('button');
                                button.className = 'body-section-subsection-list-inviteManager-item-button-delete';
                                button.id = `body-section-subsection-list-inviteManager-item-button-delete-${invite.code}`;
                                button.innerHTML = 'Delete';
                                span.appendChild(button);
                                button.addEventListener('click', () => {
                                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/delete/member?' + new URLSearchParams({ guildId: targetGuildId, code: invite.code })).then((result) => {
                                        return result.json();
                                    }).then((response) => {
                                        if (response.msg === 'Success') {
                                            item.remove();
                                            successPopup();
                                        };
                                    });
                                });
                            });
                        };
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                            return result.json();
                        }).then(({ msg, channels }) => {
                            channels.forEach((channel) => {
                                const option = document.createElement('option');
                                option.innerHTML = `${channel.name}`;
                                inviteChannelDataList.appendChild(option);
                            });
                            const roles = new Array();
                            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/roles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then((response) => {
                                response.roles.forEach((role) => {
                                    roles.push(role);
                                    const option = document.createElement('option');
                                    option.innerHTML = `${role.name}`;
                                    inviteCodeRoleDataList.appendChild(option);
                                });
                            });
                            createInviteRoles(channels, roles);
                            inviteChannelButton.addEventListener('click', () => {
                                const targetChannel = channels.find((channel) => channel.name === inviteChannelInput.value).id;
                                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/settings/save?' + new URLSearchParams({ guildId: targetGuildId, channelId: targetChannel })).then((result) => {
                                    return result.json();
                                }).then((response) => {
                                    if (response.msg === 'Success') {
                                        successPopup();
                                        createInviteRoles(channels, roles);
                                    };
                                });
                            });
                            inviteManagerDeleteAllButton.addEventListener('click', () => {
                                const confirmation = window.confirm('If you wish to proceed with deleting all invite codes to this server press "OK", if not press "Cancel"! This will effect only the invite codes and real invites, bonus invites will not be affected.');
                                if (confirmation === true) {
                                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/delete/all?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                        return result.json();
                                    }).then((response) => {
                                        if (response.msg === 'Success') {
                                            successPopup();
                                            createInviteRoles(channels, roles);
                                        };
                                    });
                                };
                            });
                            // inviteManagerPauseAllButton.addEventListener('click', () => {
                            //     const confirmation = window.confirm('If you wish to proceed with pausing all invite codes to this server press "OK", if not press "Cancel"! This will disable anyone from joining the server with any code new or old.');
                            //     if (confirmation === true) {
                            //         fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/delete/all?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                            //             return result.json();
                            //         }).then((response) => {
                            //             if (response.msg === 'Success') {
                            //                 window.location.reload();
                            //             };
                            //         });
                            //     };
                            // });
                        });
                    });
                    bonusInviteButton.addEventListener('click', () => {
                        if (bonusInviteInput.value) {
                            if (activeUserId) {
                                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/bonusInvite/save?' + new URLSearchParams({ guildId: targetGuildId, userId: activeUserId, invites: bonusInviteInput.value.toString() })).then((result) => {
                                    return result.json();
                                }).then((response) => {
                                    if (response.msg === 'Success') {
                                        successPopup();
                                        personManagerList.innerHTML = '';
                                        const targetIndex = trackerInvites.findIndex(t => t._id === `${activeUserId},${targetGuildId}`);
                                        trackerInvites[targetIndex]['bonusInvites'] = bonusInviteInput.value;
                                        createBonusInvites(trackerInvites, members);
                                    };
                                });
                            };
                        };
                    });
                    memberSearchButton.addEventListener('click', () => {
                        if (memberSearchInput.value !== '') {
                            const targetMember = members.find((member) => member.name.toLowerCase() === memberSearchInput.value.toLowerCase());
                            const targetElement = document.getElementById(`body-section-subsection-list-personManager-item-${targetMember.id}`);
                            personManagerList.scrollTop = targetElement.offsetTop;
                        };
                    });
                    createBonusInvites(trackerInvites, members);
                });
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
function syncPopup() {
    const popup = document.getElementById('success-popup-sync');
    const bar = document.getElementById('success-popup-bar-sync');
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

function createRoleList(roleList, roles, selectedRoles) {
    activeRoleList.innerHTML = '';
    roleList.forEach((role) => {
        const item = document.createElement('li');
        item.className = 'body-section-list-roles-item';
        item.id = `body-section-list-roles-item-${role.id}`;
        item.innerHTML = `${role.name}`;
        item.style.color = `${role.color}`;
        activeRoleList.appendChild(item);
        item.addEventListener('click', () => {
            item.remove();
            const newList = new Array();
            roleDataList.innerHTML = '';
            roleList.forEach((r) => {
                if (r.id !== role.id) {
                    newList.push(r);
                };
            });
            selectedRoles[targetGuildId] = newList;
            createRoleList(newList, roles, selectedRoles);
        });
    });
    roles.forEach((role) => {
        if (!selectedRoles[targetGuildId].includes(role)) {
            const option = document.createElement('option');
            option.id = `${role.id}`;
            option.innerHTML = `${role.name}`;
            roleDataList.appendChild(option);
        };
    });
};
function createRoles(selectedRoles, roles) {
    roles.forEach((role) => {
        const target = selectedRoles.find(r => r.id === role.id)
        if (!target) {
            const option = document.createElement('option');
            option.innerHTML = `${role.name}`;
            inviteCodeRoleDataList.appendChild(option);
        }
    });
    inviteCodeRoleInput.value = '';
    activeInviteCodeRoleList.innerHTML = '';
    selectedRoles.forEach((selectedRole) => {
        const item = document.createElement('li');
        item.className = 'body-section-subsection-list-activeCodeRoles-item';
        item.id = `body-section-subsection-list-activeCodeRoles-item-${selectedRole.id}`;
        item.innerHTML = `${selectedRole.name}`;
        item.style.color = `${selectedRole.color}`;
        activeInviteCodeRoleList.appendChild(item);
        const span = document.createElement('span');
        span.className = 'body-section-subsection-list-activeCodeRoles-span';
        span.id = `body-section-subsection-list-activeCodeRoles-span-${selectedRole.id}`;
        item.appendChild(span);
        const img = document.createElement('img');
        img.className = 'body-section-subsection-list-activeCodeRoles-img';
        img.id = `body-section-subsection-list-activeCodeRoles-img-${selectedRole.id}`;
        img.src = '../images/x-solid.svg';
        span.appendChild(img);
        span.addEventListener('click', () => {
            const newList = new Array();
            selectedRoles.forEach((role) => {
                if (role.id !== selectedRole.id) {
                    newList.push(role);
                };
            })
            inviteCodeRoleDataList.innerHTML = "";
            activeRoles = newList;
            createRoles(newList, roles);
        });
    });
};

function createRewardsList(roles) {
    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/rewards?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
        return result.json();
    }).then((response) => {
        if (response.msg === 'Success') {
            list2.innerHTML = '';
            response.rewards.forEach((reward) => {
                const roleNames = new Array();
                const roleObjs = new Array();
                reward.roleId.forEach((id) => {
                    roleNames.push(roles.find(r => r.id === id).name);
                    roleObjs.push(roles.find(r => r.id === id));
                });
                const item = document.createElement('li');
                item.className = 'body-section-list-item';
                item.id = `body-section-list-item-${reward.index}`;
                list2.appendChild(item);
                const inviteReq = document.createElement('h1');
                inviteReq.className = 'body-section-list-item-invites';
                inviteReq.id = `body-section-list-item-invites-${reward.index}`;
                inviteReq.innerHTML = `Invites: ${reward.inviteReq}`;
                item.appendChild(inviteReq);
                const rolesGiven = document.createElement('h1');
                rolesGiven.className = 'body-section-list-item-roles';
                rolesGiven.id = `body-section-list-item-roles-${reward.index}`;
                rolesGiven.innerHTML = `${roleNames.join(" | ")}`;
                item.appendChild(rolesGiven);
                const span = document.createElement('span');
                span.className = 'body-section-list-item-span';
                span.id = `body-section-list-item-span-${reward.index}`;
                item.appendChild(span);
                const button = document.createElement('button');
                button.className = 'body-section-list-item-button-delete';
                button.id = `body-section-list-item-button-delete-${reward.index}`;
                button.innerHTML = 'Delete';
                span.appendChild(button);
                span.addEventListener('click', () => {
                    index2 = reward.index;
                    invitesInput.value = `${reward.inviteReq}`;
                    selectedRoles[targetGuildId] = roleObjs;
                    createRoleList(roleObjs, roles, selectedRoles);
                    createButton.innerHTML = 'Save';
                });
                button.addEventListener('click', ({ target }) => {
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/rewards/delete?' + new URLSearchParams({ guildId: targetGuildId, index: target.id.split("-")[6].toString() })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg === 'Success') {
                            invitesInput.value = '';
                            selectedRoles[targetGuildId] = new Array();
                            createButton.innerHTML = 'Create';
                            successPopup();
                            item.remove();
                            activeRoleList.innerHTML = '';
                        };
                    });
                });
            });
        };
        roleInput.addEventListener('change', () => {
            const targetRole = roles.find(r => r.name.toLowerCase() === roleInput.value.toLowerCase());
            if (targetRole) {
                if (!selectedRoles[targetGuildId]) {
                    selectedRoles[targetGuildId] = new Array();
                };
                selectedRoles[targetGuildId].push(targetRole);
                roleInput.value = '';
                createRoleList(selectedRoles[targetGuildId], roles, selectedRoles);
            };
        });
        createButton.addEventListener('click', ({ target }) => {
            if (createButton.innerHTML.includes('Create')) {
                if (invitesInput.value > 0 && invitesInput.value && selectedRoles[targetGuildId].length > 0) {
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/rewards/create?' + new URLSearchParams({ guildId: targetGuildId, level: invitesInput.value.toString(), roles: selectedRoles[targetGuildId].map((v, i) => v.id).join(",") })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg === 'Success') {
                            successPopup();
                            list2.innerHTML = '';
                            invitesInput.value = '';
                            selectedRoles[targetGuildId] = new Array();
                            activeRoleList.innerHTML = '';
                            createRewardsList(roles);
                        };
                    });
                };
            } else if (createButton.innerHTML.includes('Save')) {
                if (invitesInput.value > 0 && invitesInput.value && selectedRoles[targetGuildId].length > 0) {
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/rewards/save?' + new URLSearchParams({ guildId: targetGuildId, level: invitesInput.value.toString(), roles: selectedRoles[targetGuildId].map((v, i) => v.id).join(","), index: index2 })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg === 'Success') {
                            successPopup();
                            list2.innerHTML = '';
                            invitesInput.value = '';
                            selectedRoles[targetGuildId] = new Array();
                            activeRoleList.innerHTML = '';
                            createRewardsList(roles);
                            createButton.innerHTML = 'Create';
                        };
                    });
                };
            };
        });
    });
};

function createInviteRoles(channels, roles) {
    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
        return result.json();
    }).then(({ msg, settings }) => {
        if (msg === 'Success') {
            if (settings.inviteChannelId) {
                const targetChannel = channels.find((c) => c.id === settings.inviteChannelId);
                if (targetChannel) {
                    inviteChannelInput.value = targetChannel.name;
                };
            };
            if (settings.codeRoles) {
                settings.codeRoles.forEach((codeRole) => {
                    selectedRoles[codeRole.code] = new Array();
                    codeRole.roles.forEach((roleId) => {
                        selectedRoles[codeRole.code].push(roles.find(r => r.id === roleId));
                    });
                    const item = document.createElement('li');
                    item.className = 'body-section-subsection-list-inviteRoleManager-item';
                    item.id = `body-section-subsection-list-inviteRoleManager-item-${codeRole.code}`;
                    inviteRoleManagerList.appendChild(item);
                    const h1 = document.createElement('h1');
                    h1.className = 'body-section-subsection-list-inviteRoleManager-item-h1';
                    h1.id = `body-section-subsection-list-inviteRoleManager-item-h1-${codeRole.code}`;
                    h1.innerHTML = `Code: ${codeRole.code} <br> Roles: ${selectedRoles[codeRole.code].map((v, i) => v.name).join("|")}`;
                    item.appendChild(h1);
                    const span = document.createElement('span');
                    span.className = 'body-section-subsection-list-inviteRoleManager-item-span';
                    span.id = `body-section-subsection-list-inviteRoleManager-item-span-${codeRole.code}`;
                    item.appendChild(span);
                    const button = document.createElement('button');
                    button.className = 'body-section-subsection-list-inviteRoleManager-item-button-delete';
                    button.id = `body-section-subsection-list-inviteRoleManager-item-button-delete-${codeRole.code}`;
                    button.innerHTML = 'Delete';
                    span.appendChild(button);
                    button.addEventListener('click', () => {
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/roles/delete?' + new URLSearchParams({ guildId: targetGuildId, code: codeRole.code })).then((result) => {
                            return result.json();
                        }).then((response) => {
                            if (response.msg === 'Success') {
                                item.remove();
                                successPopup();
                                inviteCodeInput.value = '';
                                inviteCodeRoleDataList.innerHTML = "";
                                activeRoles = [];
                                activeInviteCodeRoleList.innerHTML = '';
                            };
                        });
                    });
                    item.addEventListener('click', () => {
                        inviteRoleManagerButton.innerHTML = 'Save';
                        inviteCodeInput.value = `${codeRole.code}`;
                        inviteCodeRoleDataList.innerHTML = "";
                        activeRoles = selectedRoles;
                        createRoles(selectedRoles, roles);
                    });
                });
            };
        };
        inviteCodeRoleInput.addEventListener('change', () => {
            if (inviteCodeRoleInput.value) {
                const targetRole = roles.find(r => r.name === inviteCodeRoleInput.value);
                activeRoles.push(targetRole);
                inviteCodeRoleDataList.innerHTML = "";
                createRoles(activeRoles, roles);
            }
        });
        inviteRoleManagerButton.addEventListener('click', () => {
            if (inviteRoleManagerButton.innerHTML.includes('Create')) {
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/roles/create?' + new URLSearchParams({ guildId: targetGuildId, code: inviteCodeInput.value, roles: activeRoles.map((v, i) => v.id).join("-") })).then((result) => {
                    return result.json();
                }).then((response) => {
                    if (response.msg === 'Success') {
                        successPopup();
                        createInviteRoles(channels, roles);
                        inviteCodeInput.value = '';
                        inviteCodeRoleDataList.innerHTML = "";
                        inviteRoleManagerList.innerHTML = "";
                        activeRoles = [];
                        selectedRoles = [];
                        activeInviteCodeRoleList.innerHTML = '';
                    };
                });
            } else if (inviteRoleManagerButton.innerHTML.includes('Save')) {
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/invites/roles/save?' + new URLSearchParams({ guildId: targetGuildId, code: inviteCodeInput.value, roles: activeRoles.map((v, i) => v.id).join("-") })).then((result) => {
                    return result.json();
                }).then((response) => {
                    if (response.msg === 'Success') {
                        successPopup();
                        createInviteRoles(channels, roles);
                        inviteCodeInput.value = '';
                        inviteCodeRoleDataList.innerHTML = "";
                        inviteRoleManagerList.innerHTML = "";
                        activeRoles = [];
                        selectedRoles = [];
                        activeInviteCodeRoleList.innerHTML = '';
                    };
                });
            };
        });
    });
};
function createBonusInvites(trackerInvites) {
    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/members?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
        return result.json();
    }).then((response) => {
        if (response.msg === 'Success') {
            let oldItem;
            response.members.forEach((member) => {
                const result = trackerInvites.find(i => i.userId === member.id);
                const option = document.createElement('option');
                option.innerHTML = `${member.name}`;
                memberSearchDataList.appendChild(option);
                const item = document.createElement('li');
                item.className = 'body-section-subsection-list-personManager-item';
                item.id = `body-section-subsection-list-personManager-item-${member.id}`;
                personManagerList.appendChild(item);
                const h1 = document.createElement('h1');
                h1.className = 'body-section-subsection-list-personManager-item-h1';
                h1.id = `body-section-subsection-list-personManager-item-h1-${member.id}`;
                if (trackerInvites !== undefined) {
                    if (result) {
                        h1.innerHTML = `${member.name}<br>Bonus Invites: ${result.bonusInvites}`;
                    } else {
                        h1.innerHTML = `${member.name}<br>Bonus Invites: 0`;
                    };
                } else {
                    h1.innerHTML = `${member.name}<br>Bonus Invites: 0`;
                };
                item.appendChild(h1);
                const span = document.createElement('span');
                span.className = 'body-section-subsection-list-personManager-item-span';
                span.id = `body-section-subsection-list-personManager-item-span-${member.id}`;
                item.appendChild(span);
                const button = document.createElement('button');
                button.className = 'body-section-subsection-list-personManager-item-button-delete';
                button.id = `body-section-subsection-list-personManager-item-button-delete-${member.id}`;
                button.innerHTML = 'Delete';
                span.appendChild(button);
                span.addEventListener('click', () => {
                    if (oldItem) {
                        if (oldItem !== item.id) {
                            const targetItem = document.getElementById(oldItem);
                            targetItem.style.border = '2px solid #ffffff00';
                            targetItem.style.boxShadow = 'none';
                            oldItem = item.id;
                        }
                    } else {
                        oldItem = item.id;
                    };
                    activeUserId = member.id;
                    item.style.border = '2px solid red';
                    item.style.boxShadow = '0px 0px 10px 0px red';
                    item.addEventListener('mouseover', () => {
                        if (activeUserId !== member.id) {
                            item.style.border = '2px solid red';
                            item.style.boxShadow = '0px 0px 10px 0px red';
                        };
                    });
                    item.addEventListener('mouseout', () => {
                        if (activeUserId !== member.id) {
                            item.style.border = '2px solid #ffffff00';
                            item.style.boxShadow = 'none';
                        };
                    });
                    if (result) {
                        bonusInviteInput.value = result.bonusInvites;
                    } else {
                        bonusInviteInput.value = 0;
                    };
                });
            });
            memberSearchButton.click();
        };
    });
};
