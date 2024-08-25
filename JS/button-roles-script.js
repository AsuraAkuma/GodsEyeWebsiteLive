// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const activePanelList = document.getElementById('role-list');
const message = document.getElementById('message');
const panelInput = document.getElementById('creation-panel-input-panel');
const channelInput = document.getElementById('creation-panel-input-channel');
const roleInput = document.getElementById('creation-panel-input-role');
const channelDataList = document.getElementById('channel-selection-list');
const roleDataList = document.getElementById('role-selection-list');
const panelDataList = document.getElementById('panel-selection-list');
const activeRoleList = document.getElementById('creation-panel-roles-list');
const cancelButton = document.getElementById('creation-panel-button-cancel');
const deleteButton = document.getElementById('creation-panel-button-delete');
const createButton = document.getElementById('creation-panel-button-create');
const previousButton = document.getElementById('creation-panel-button-previous');
const nextButton = document.getElementById('creation-panel-button-next');
const indexIndicator = document.getElementById('creation-panel-index');
let channelList = [];
let roleList = [];
let panelList = [];
let roleStatus = [];
let index = 0;
let buttonCount = [];
let selectedRoles = [];
let panelCount = 0;
let targetGuildId;
let targetPanel = [];

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
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/buttonroles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ panels }) => {
                selectedRoles[targetGuildId] = new Array();
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then(({ channels }) => {
                    if (channels) {
                        channelList[targetGuildId] = new Array();
                        channels.forEach((channel) => {
                            channelList[targetGuildId].push(channel);
                            const option = document.createElement('option');
                            option.id = `${channel.id}`;
                            option.innerHTML = `${channel.name}`;
                            channelDataList.appendChild(option);
                        });
                    };
                });
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/roles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then((info) => {
                    const roles = info.roles;
                    if (roles) {
                        roleList[targetGuildId] = new Array();
                        roles.forEach((role) => {
                            roleList[targetGuildId].push(role);
                            const option = document.createElement('option');
                            option.id = `${role.id}`;
                            option.innerHTML = `${role.name}`;
                            roleDataList.appendChild(option);
                        });
                    };
                });
                if (panels) {
                    if (panels.length > 0) {
                        const messageIds = new Array();
                        let panelList2 = [];
                        panels.forEach(async (button) => {
                            if (!panelList2[button.messageId]) {
                                panelList2[button.messageId] = [];
                                messageIds.push(button.messageId);
                            };
                            panelList2[button.messageId].push(button);
                        });
                        messageIds.forEach((id) => {
                            panelList.push(panelList2[id]);
                        });
                        panelCount = panelList.length;
                        createPanels(panelList);
                    } else {
                        message.style.display = 'block';
                    };
                } else {
                    message.style.display = 'block';
                };
                // Input events
                panelInput.addEventListener('change', () => {
                    if (panelInput.value.length > 0) {
                        if (channelInput.value.length > 0) {
                            if (selectedRoles[targetGuildId].length > 0) {
                                cancelButton.style.display = 'block';
                                deleteButton.style.display = 'block';
                                createButton.style.display = 'block';
                                previousButton.style.display = 'block';
                                nextButton.style.display = 'block';
                            }
                        };
                    };
                    if (panelInput.value.length === 0 && panechannelInputlInput.value.length === 0 && selectedRoles[targetGuildId].value.length === 0) {
                        cancelButton.style.display = 'none';
                        deleteButton.style.display = 'none';
                        createButton.style.display = 'none';
                        previousButton.style.display = 'none';
                        nextButton.style.display = 'none';
                    };
                });
                channelInput.addEventListener('change', () => {
                    if (panelInput.value.length > 0) {
                        if (channelInput.value.length > 0) {
                            if (selectedRoles[targetGuildId].length > 0) {
                                cancelButton.style.display = 'block';
                                deleteButton.style.display = 'block';
                                createButton.style.display = 'block';
                                previousButton.style.display = 'block';
                                nextButton.style.display = 'block';
                            }
                        };
                    };
                    if (panelInput.value.length === 0 && panechannelInputlInput.value.length === 0 && selectedRoles[targetGuildId].value.length === 0) {
                        cancelButton.style.display = 'none';
                        deleteButton.style.display = 'none';
                        createButton.style.display = 'none';
                        previousButton.style.display = 'none';
                        nextButton.style.display = 'none';
                    };
                });
                roleInput.addEventListener('change', () => {
                    const roleObj = roleList[targetGuildId].find(r => r.name === roleInput.value);
                    if (!roleObj) {
                        return;
                    };
                    selectedRoles[targetGuildId].push(roleObj);
                    roleInput.value = '';
                    if (!targetPanel || targetPanel.length === 0) {
                        targetPanel[index] = {
                            _id: '',
                            channelId: '',
                            guildID: targetGuildId,
                            index: index,
                            messageId: '',
                            status: true,
                            roles: selectedRoles[targetGuildId].map((v, i) => v.id)
                        };
                    } else {
                        targetPanel[index]['roles'] = selectedRoles[targetGuildId].map((v, i) => v.id);
                    };

                    for (let i = 0; i < panelList.length; i++) {
                        for (let i2 = 0; i2 < panelList[i].length; i2++) {
                            const button = panelList[i][i2];
                            if (button.messageId === targetPanel[0].messageId) {
                                panelList[i][i2] = targetPanel[i2];
                            };
                        };
                    }
                    if (!panelList[panelCount - 1]) {
                        panelList[panelList.length] = targetPanel;
                    };
                    createRoleList(selectedRoles[targetGuildId].map((v, i) => v.id));
                    indexIndicator.innerHTML = `Button: ${index + 1}/${targetPanel.length}`;
                    if (panelInput.value.length > 0) {
                        if (channelInput.value.length > 0) {
                            if (selectedRoles[targetGuildId].length > 0) {
                                cancelButton.style.display = 'block';
                                deleteButton.style.display = 'block';
                                createButton.style.display = 'block';
                                previousButton.style.display = 'block';
                                nextButton.style.display = 'block';
                            };
                        };
                    };
                    if (panelInput.value.length === 0 && panechannelInputlInput.value.length === 0 && selectedRoles[targetGuildId].value.length === 0) {
                        cancelButton.style.display = 'none';
                        deleteButton.style.display = 'none';
                        createButton.style.display = 'none';
                        previousButton.style.display = 'none';
                        nextButton.style.display = 'none';
                    };
                });
                // buttons
                cancelButton.addEventListener('click', () => {
                    window.location.reload()
                });
                deleteButton.addEventListener('click', () => {
                    const channelId = targetPanel[index].channelId;
                    const messageId = targetPanel[index].messageId;
                    if (!messageId) {
                        alert('Please refresh the page and try again!');
                        return;
                    }
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/buttonrole/delete?' + new URLSearchParams({ guildId: targetGuildId, channelId: channelId, messageId: messageId })).then((result) => {
                        return result.json();
                    }).then((response) => {
                        if (response.msg === 'Success') {
                            window.location.reload()
                        };
                    });
                    createButton.innerHTML = 'Create';
                });
                createButton.addEventListener('click', () => {
                    for (let index = 0; index < panelList.length; index++) {
                        const panel = panelList[index];
                        for (let index2 = 0; index2 < panel.length; index2++) {
                            const button = panel[index2];
                            if (button.roles.length === 0) {
                                panelList[index][index2].roles.pop();
                            };
                        };
                    };
                    const channelId = channelList[targetGuildId].find(channel => channel.name.toLowerCase() === channelInput.value.toLowerCase()).id;
                    if (!channelId) {
                        alert('The channel provided can not be found please check spelling!');
                        return;
                    };
                    if (createButton.innerHTML.includes("Create")) {
                        targetPanel.forEach((button) => {
                            button['panel'] = panelInput.value;
                            button['channelId'] = channelId;
                        });
                        panelList.push(targetPanel)
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/buttonroles/create?', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 'panel': targetPanel, 'guildId': targetGuildId, 'channelId': channelId, 'panelName': panelInput.value, 'update': 'false' })
                        }).then((result) => {
                            return result.json();
                        }).then((response) => {
                            if (response.msg === 'Success') {
                                successPopup();
                                createPanels(panelList);
                            } else {
                                alert(response.msg);
                            };
                        });
                    } else if (createButton.innerHTML.includes("Save")) {
                        // fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/buttonroles/create?', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(targetPanel[targetGuildId]) } + new URLSearchParams({ guildId: targetGuildId, channelId: channelId, panelName: panelInput.value, roleIds: selectedRoles[targetGuildId].map((v, i) => v.id).join("-"), update: "true", index: index })).then((result) => {
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/buttonroles/create?', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 'panel': targetPanel, 'guildId': targetGuildId, 'channelId': channelId, 'panelName': panelInput.value, 'update': 'true', 'messageId': targetPanel[0].messageId })
                        }).then((result) => {
                            return result.json();
                        }).then((response) => {
                            if (response.msg === 'Success') {
                                successPopup();
                                createPanels(panelList);
                            } else {
                                alert(response.msg);
                            };
                        });
                    };
                });
                // Add function to make previous and next button switch between buttons and effect activeRoleList and indexIndicator and index
                previousButton.addEventListener('click', () => {
                    if (index > 0) {
                        if (selectedRoles[targetGuildId].length === 0) {
                            targetPanel.pop();
                        };
                        index = index - 1;
                        if (index < targetPanel.length) {
                            indexIndicator.innerHTML = `Button: ${index + 1}/${targetPanel.length}`;
                        } else if (index === targetPanel.length) {
                            indexIndicator.innerHTML = `Button: ${index + 1}/${targetPanel.length}`;
                        };
                        selectedRoles[targetGuildId] = [];
                        if (targetPanel[index]) {
                            createRoleList(targetPanel[index].roles);
                        };
                    };
                });
                nextButton.addEventListener('click', () => {
                    // if (index < 25 && index <= targetPanel.length - 1) {
                    if (selectedRoles[targetGuildId].length === 0) {
                        return
                    }
                    selectedRoles[targetGuildId] = [];
                    if (index < 25) {
                        index = index + 1;
                        if (targetPanel[index] === undefined || !targetPanel[index]) {
                            activeRoleList.innerHTML = '';
                            indexIndicator.innerHTML = `Button: ${index + 1}/${targetPanel.length + 1}`;
                            selectedRoles[targetGuildId] = new Array();
                            targetPanel[index] = {
                                _id: '',
                                channelId: '',
                                guildID: targetGuildId,
                                index: index,
                                messageId: '',
                                status: true,
                                roles: []
                            };

                        } else {
                            indexIndicator.innerHTML = `Button: ${index + 1}/${targetPanel.length}`;
                            createRoleList(targetPanel[index].roles);
                        };
                    };
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
async function createPanels(panelArrays) {
    activePanelList.innerHTML = '';
    panelArrays.forEach(async (p) => {
        const panel = p.sort((a, b) => a.index - b.index);
        const item = document.createElement('li');
        item.className = 'role-list-item';
        item.id = `role-list-item-${panel[0].messageId}`;
        activePanelList.appendChild(item);
        // const label = document.createElement('label');
        // label.className = 'switch role-list-item-switch';
        // label.id = `role-list-item-switch-${panel[0].messageId}`;
        // item.appendChild(label);
        // const input = document.createElement('input');
        // input.type = 'checkbox';
        // label.appendChild(input);
        // if (panel[0].status === true) {
        //     input.checked = true;
        // } else {
        //     input.checked = false;
        // };
        // const span = document.createElement('span');
        // span.className = 'slider round';
        // label.appendChild(span);

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';
        item.appendChild(sliderContainer);
        const sliderRail = document.createElement('div');
        sliderRail.className = 'center-vert center-slider-rail';
        sliderContainer.appendChild(sliderRail);
        const rail = document.createElement('span');
        rail.className = 'slider-container-rail';
        sliderRail.appendChild(rail);
        const slider = document.createElement('span');
        slider.className = 'slider-container-slider glowRed';
        sliderRail.appendChild(slider);
        if (panel[0].status === true) {
            slider.style.left = '60%';
            slider.style.backgroundColor = 'var(--geGreen)';
            slider.className = 'slider-container-slider glowGreen';
        } else {
            slider.style.left = '5%';
            slider.style.backgroundColor = 'red';
            slider.className = 'slider-container-slider glowRed';
        };

        const h1 = document.createElement('h1');
        h1.className = 'role-list-item-name';
        h1.id = `role-list-item-name-${panel[0].messageId}`;
        h1.innerHTML = `${panel[0].panel}`;
        item.appendChild(h1);
        const h2 = document.createElement('h2');
        h2.className = 'role-list-item-count';
        h2.id = `role-list-item-count-${panel[0].messageId}`;
        h2.innerHTML = `${panel.length}/25`;
        item.appendChild(h2);
        const span2 = document.createElement('span');
        span2.className = 'role-list-item-cover';
        span2.id = `role-list-item-cover-${panel[0].messageId}`;
        item.appendChild(span2);
        // Datalist entry
        const option = document.createElement('option');
        option.id = `${panel[0].messageId}`;
        option.innerHTML = `${panel[0].panel}`;
        panelDataList.appendChild(option);
        // Panel Select
        span2.addEventListener('click', () => {
            index = 0;
            indexIndicator.innerHTML = `Button: ${index + 1}/${panel.length}`;
            cancelButton.style.display = 'block';
            deleteButton.style.display = 'block';
            createButton.style.display = 'block';
            previousButton.style.display = 'block';
            nextButton.style.display = 'block';
            createButton.innerHTML = 'Save';
            const channel = channelList[targetGuildId].find(channel => channel.id === panel[0].channelId).name;
            panelInput.value = `${panel[0].panel}`;
            channelInput.value = `${channel}`;
            roleStatus[panel[0].index] = panel[0].status;
            targetPanel = panel;
            createRoleList(panel[0].roles);
        });
        // switch event
        sliderContainer.addEventListener('click', () => {
            if (panel[0].status === true) {
                panel[0]['status'] = false;
            } else {
                panel[0]['status'] = true;
            };
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/buttonroles/statusChange?' + new URLSearchParams({ guildId: targetGuildId, status: `${panel[0].status}`, messageId: panel[0].messageId })).then((result) => {
                return result.json();
            }).then((response) => {
                if (response.msg === 'Success') {
                    successPopup();
                    if (panel[0].status === true) {
                        slider.style.left = '60%';
                        slider.style.backgroundColor = 'var(--geGreen)';
                        slider.className = 'slider-container-slider glowGreen';
                    } else {
                        slider.style.left = '5%';
                        slider.style.backgroundColor = 'red';
                        slider.className = 'slider-container-slider glowRed';
                    };
                };
            });
        });
    });
};

function createRoleList(roles) {
    selectedRoles[targetGuildId] = new Array();
    activeRoleList.innerHTML = ''
    roles.forEach((activeRole) => {
        const roleObj = roleList[targetGuildId].find(r => r.id === activeRole);
        if (roleObj) {
            const item = document.createElement('li');
            item.className = 'creation-panel-roles-list-item';
            item.id = `creation-panel-roles-list-item-${roleObj.id}`;
            item.innerHTML = `${roleObj.name}`;
            item.style.color = `${roleObj.color}`;
            activeRoleList.appendChild(item);
            item.addEventListener('click', () => {
                item.remove();
                const newList = new Array();
                roles.forEach((r) => {
                    if (r !== roleObj.id) {
                        newList.push(r);
                    };
                });
                selectedRoles[targetGuildId] = newList;
                targetPanel[index]['roles'] = newList;
                if (newList.length === 0) {
                    targetPanel.splice(index, 1);
                    index = index - 1;
                    if (targetPanel.length === 0) {
                        indexIndicator.innerHTML = `Button: 0/0`;
                        targetPanel = new Array();
                    } else {
                        createRoleList(targetPanel[index].roles);
                        indexIndicator.innerHTML = `Button: ${index + 1}/${targetPanel.length}`;
                    };
                } else {
                    createRoleList(newList);
                }
            });
            selectedRoles[targetGuildId].push(roleObj);
        };
    });
    targetPanel[index]['index'] = targetPanel[index].index - 1;
};
