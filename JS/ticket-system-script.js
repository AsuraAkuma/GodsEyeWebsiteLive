// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const panelManagerList = document.getElementById('panel-manager-list');
const panelSummaryList = document.getElementById('panel-summary-list');
const channelDataList = document.getElementById('datalist-panelChannel');
const roleDatalist = document.getElementById('datalist-ticketAdminRoles');
const openCategory = document.getElementById('datalist-openCategory');
const closeCategory = document.getElementById('datalist-closeCategory');
const panelList = document.getElementById('panel-list');
let activeRoles = new Array();
let activePanel = 'none';
let allRoles = "";
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
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/roles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ msg, roles }) => {
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/categories?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then(({ msg, categories }) => {
                    if (msg === 'Success') {
                        categories.forEach((channel) => {
                            const option = document.createElement('option');
                            option.innerHTML = `${channel.name}`;
                            const option2 = document.createElement('option');
                            option2.innerHTML = `${channel.name}`;
                            openCategory.appendChild(option);
                            closeCategory.appendChild(option2);
                        });
                    };
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ msg, channels }) => {
                        if (msg === 'Success') {
                            channels.forEach((channel) => {
                                const option = document.createElement('option');
                                option.innerHTML = `${channel.name}`;
                                channelDataList.appendChild(option);
                            });
                        };
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/ticketPanels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                            return result.json();
                        }).then(({ msg, panels }) => {
                            if (msg === "Success") {
                                buildPanels(panels);
                            };
                        });
                        if (msg === 'Success') {
                            buildPanelManager(roles);
                            buildPanelSummary(channels);
                            buildRolesList(roles);
                        };
                        // Functions
                        function buildPanelManager(roles) {
                            const ItemsArr = [
                                {
                                    name: 'Panel Name',
                                    message: 'The name of the panel for users to create a ticket.',
                                    id: 'panelName',
                                    inputType: ''
                                },
                                {
                                    name: 'Panel Channel',
                                    message: 'The channel where the panel will be sent for users to create a ticket.',
                                    id: 'panelChannel',
                                    inputType: 'search'
                                },
                                {
                                    name: 'Panel Message',
                                    message: 'The message displayed on your panel for users to create a ticket.',
                                    id: 'panelMessage',
                                    inputType: ''
                                },
                                {
                                    name: 'Open Category',
                                    message: 'The category user\'s tickets will be created in or moved to when opened.',
                                    id: 'openCategory',
                                    inputType: 'search'
                                },
                                {
                                    name: 'Close Category',
                                    message: 'The category user\'s tickets will be moved to when closed.',
                                    id: 'closeCategory',
                                    inputType: 'search'
                                },
                                {
                                    name: 'Ticket Admin Roles',
                                    message: 'The roles that will gain access to tickets when opened and closed.',
                                    id: 'ticketAdminRoles',
                                    inputType: 'search'
                                },
                                {
                                    name: 'Ticket Message',
                                    message: 'The message that will be displayed when a user creates a ticket.',
                                    id: 'ticketMessage',
                                    inputType: ''
                                },
                                {
                                    name: 'Ticket Limit',
                                    message: 'The maximum amount of tickets a user can have open at once.',
                                    id: 'ticketLimit',
                                    inputType: 'number'
                                }
                            ];
                            ItemsArr.forEach((targetItem) => {
                                const item = document.createElement('li');
                                item.className = 'panel-manager-list-item';
                                item.id = `panel-manager-list-item-${targetItem.id}`;
                                panelManagerList.appendChild(item);
                                const name = document.createElement('h1');
                                name.className = 'panel-manager-list-item-name';
                                name.id = `panel-manager-list-item-name-${targetItem.id}`;
                                name.innerHTML = `${targetItem.name}`;
                                item.appendChild(name);
                                const help = document.createElement('img');
                                help.src = '../images/circle-question-regular.svg';
                                help.className = "panel-manager-list-item-help";
                                help.id = `panel-manager-list-item-help-${targetItem.id}`;
                                item.appendChild(help);
                                help.addEventListener('mouseover', () => {
                                    const message = document.createElement('h2');
                                    message.className = 'panel-manager-list-item-help-message';
                                    message.id = `panel-manager-list-item-help-message-${targetItem.id}`;
                                    message.innerHTML = `${targetItem.message}`;
                                    message.style.animation = 'appear .2s linear';
                                    item.appendChild(message);
                                });
                                help.addEventListener('mouseout', () => {
                                    const message = document.getElementById(`panel-manager-list-item-help-message-${targetItem.id}`);
                                    message.remove();
                                });
                                if (targetItem.inputType !== '') {
                                    if (targetItem.inputType === 'search') {
                                        const input = document.createElement('input');
                                        input.className = 'panel-manager-list-item-input';
                                        input.id = `panel-manager-list-item-input-${targetItem.id}`;
                                        input.type = `${targetItem.inputType}`;
                                        input.placeholder = `${targetItem.name}`;
                                        input.setAttribute('list', `datalist-${targetItem.id}`);
                                        item.appendChild(input);
                                        if (targetItem.id === 'ticketAdminRoles') {
                                            input.addEventListener('change', () => {
                                                if (input.value !== '') {
                                                    const targetRole = roles.find(r => r.name === input.value);
                                                    if (targetRole) {
                                                        activeRoles.push(targetRole);
                                                        input.value = "";
                                                        buildRolesList(activeRoles);
                                                    };
                                                };
                                            });
                                        };
                                    };
                                    if (targetItem.inputType === 'number') {
                                        const input = document.createElement('input');
                                        input.className = 'panel-manager-list-item-input';
                                        input.id = `panel-manager-list-item-input-${targetItem.id}`;
                                        input.type = `${targetItem.inputType}`;
                                        input.placeholder = `${targetItem.name}`;
                                        input.min = '1';
                                        item.appendChild(input);
                                    };
                                } else {
                                    const input = document.createElement('input');
                                    input.className = 'panel-manager-list-item-input';
                                    input.id = `panel-manager-list-item-input-${targetItem.id}`;
                                    input.placeholder = `${targetItem.name}`;
                                    item.appendChild(input);
                                };
                            });
                        };

                        function buildPanelSummary(channels) {
                            const ItemsArr = [
                                {
                                    name: 'Panel Name',
                                    id: 'panelName'
                                },
                                {
                                    name: 'Panel Channel',
                                    id: 'panelChannel'
                                },
                                {
                                    name: 'Panel Message',
                                    id: 'panelMessage'
                                },
                                {
                                    name: 'Open Category',
                                    id: 'openCategory'
                                },
                                {
                                    name: 'Close Category',
                                    id: 'closeCategory'
                                },
                                {
                                    name: 'Ticket Admin Roles',
                                    id: 'ticketAdminRoles'
                                },
                                {
                                    name: 'Ticket Message',
                                    id: 'ticketMessage'
                                },
                                {
                                    name: 'Ticket Limit',
                                    id: 'ticketLimit'
                                },
                                {
                                    name: 'Create',
                                    id: 'createButton'
                                }
                            ];
                            ItemsArr.forEach((targetItem) => {
                                const item = document.createElement('li');
                                item.className = 'panel-summary-list-item';
                                item.id = `panel-summary-list-item-${targetItem.id}`;
                                panelSummaryList.appendChild(item);
                                if (targetItem.id !== 'createButton') {
                                    const name = document.createElement('h1');
                                    name.className = 'panel-summary-list-item-name';
                                    name.id = `panel-summary-list-item-name-${targetItem.id}`;
                                    name.innerHTML = `${targetItem.name}`;
                                    item.appendChild(name);
                                    if (targetItem.id !== "ticketAdminRoles") {
                                        const details = document.createElement('p');
                                        details.className = 'panel-summary-list-item-details';
                                        details.id = `panel-summary-list-item-details-${targetItem.id}`;
                                        details.innerHTML = "None";
                                        item.appendChild(details);
                                        const input = document.getElementById(`panel-manager-list-item-input-${targetItem.id}`);
                                        input.addEventListener('change', () => {
                                            if (input.value !== "") {
                                                details.innerHTML = `${input.value}`;
                                            } else {
                                                details.innerHTML = "None";
                                            };
                                        });
                                    } else {
                                        const container = document.createElement('div');
                                        container.className = 'panel-summary-list-item-details-container';
                                        item.appendChild(container);
                                        const rolesList = document.createElement('ul');
                                        rolesList.className = 'panel-summary-list-item-details';
                                        rolesList.id = `panel-summary-list-item-details-${targetItem.id}`;
                                        container.appendChild(rolesList);
                                    };
                                } else {
                                    const button = document.createElement('button');
                                    button.className = 'panel-summary-list-item-button';
                                    button.id = `panel-summary-list-item-button-${targetItem.id}`;
                                    button.innerHTML = `${targetItem.name}`;
                                    item.appendChild(button);
                                    button.addEventListener('click', () => {
                                        const panelNameInput = document.getElementById(`panel-manager-list-item-input-panelName`);
                                        const panelChannelInput = document.getElementById(`panel-manager-list-item-input-panelChannel`);
                                        const panelMessageInput = document.getElementById(`panel-manager-list-item-input-panelMessage`);
                                        const openCategoryInput = document.getElementById(`panel-manager-list-item-input-openCategory`);
                                        const closeCategoryInput = document.getElementById(`panel-manager-list-item-input-closeCategory`);
                                        const ticketMessageInput = document.getElementById(`panel-manager-list-item-input-ticketMessage`);
                                        const ticketLimitInput = document.getElementById(`panel-manager-list-item-input-ticketLimit`);
                                        if (panelNameInput.value !== "" && panelChannelInput.value !== "" && panelMessageInput.value !== "" && openCategoryInput.value !== "" && closeCategoryInput.value !== "" && ticketMessageInput.value !== "" && ticketLimitInput.value !== "" && activeRoles.length > 0) {
                                            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/ticketPanel/create?' + new URLSearchParams({ guildId: targetGuildId, id: activePanel, panelName: panelNameInput.value, panelChannel: panelChannelInput.value, panelMessage: panelMessageInput.value, openCategory: openCategoryInput.value, closeCategory: closeCategoryInput.value, roles: activeRoles.map((v, i) => v.id).join("-"), ticketMessage: ticketMessageInput.value, ticketLimit: ticketLimitInput.value.toString() })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg === "Success") {
                                                    successPopup();
                                                    const targetButton = document.getElementById('panel-summary-list-item-button-createButton');
                                                    targetButton.innerHTML = 'Create';
                                                    setTimeout(() => {
                                                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/ticketPanels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                                            return result.json();
                                                        }).then(({ msg, panels }) => {
                                                            if (msg === "Success") {
                                                                buildPanels(panels);
                                                            };
                                                        });
                                                    }, 2500);
                                                };
                                            });
                                        }
                                    });
                                };
                            });
                        };

                        function buildPanels(buildPanels) {
                            panelList.innerHTML = "";
                            buildPanels.forEach((panel) => {
                                const opentickets = panel.tickets.filter((v, i) => v.open === true).length;
                                const closedTickets = panel.tickets.filter((v, i) => v.open === false).length;
                                const item = document.createElement('li');
                                item.className = 'panel-list-item';
                                item.id = `panel-list-item-${panel.id}`;
                                panelList.appendChild(item);
                                // const label = document.createElement('label');
                                // label.className = 'switch panel-list-item-switch';
                                // label.id = `panel-list-item-switch-${panel.id}`;
                                // item.appendChild(label);
                                // const input = document.createElement('input');
                                // input.type = 'checkbox';
                                // label.appendChild(input);
                                // if (panel.status === true) {
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
                                if (panel.status === true) {
                                    slider.style.left = '60%';
                                    slider.style.backgroundColor = 'var(--geGreen)';
                                    slider.className = 'slider-container-slider glowGreen';
                                } else {
                                    slider.style.left = '5%';
                                    slider.style.backgroundColor = 'red';
                                    slider.className = 'slider-container-slider glowRed';
                                };

                                const h1 = document.createElement('h1');
                                h1.className = 'panel-list-item-h1';
                                h1.id = `panel-list-item-h1-${panel.id}`;
                                h1.innerHTML = `${panel.panelName}<br>Open: ${opentickets} | Closed: ${closedTickets}`;
                                item.appendChild(h1);
                                const button = document.createElement('button');
                                button.className = 'panel-list-item-button';
                                button.id = `panel-list-item-button-${panel.id}`;
                                button.innerHTML = "Delete";
                                item.appendChild(button);
                                sliderContainer.addEventListener('click', () => {
                                    if (panel.status === true) {
                                        panel['status'] = false;
                                    } else {
                                        panel['status'] = true;
                                    };

                                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/ticketPanel/statusUpdate?' + new URLSearchParams({ guildId: targetGuildId, id: panel._id, status: panel.status.toString() })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            successPopup();
                                            if (panel.status === true) {
                                                slider.style.left = '60%';
                                                slider.style.backgroundColor = 'var(--geGreen)';
                                                slider.className = 'slider-container-slider glowGreen';
                                            } else {
                                                slider.style.left = '5%';
                                                slider.stylea.backgroundColor = 'red';
                                                slider.className = 'slider-container-slider glowRed';
                                            };
                                        };
                                    });
                                });
                                button.addEventListener('click', () => {
                                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/ticketPanel/delete?' + new URLSearchParams({ guildId: targetGuildId, id: panel._id })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            successPopup();
                                            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/ticketPanels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                                return result.json();
                                            }).then(({ msg, panels }) => {
                                                if (msg === "Success") {
                                                    buildPanels(panels);
                                                };
                                            });
                                        };
                                    });
                                });
                                item.addEventListener('mouseover', () => {
                                    button.style.opacity = '100%';
                                });
                                item.addEventListener('mouseout', () => {
                                    button.style.opacity = '0%';
                                });
                                item.addEventListener('click', () => {
                                    const targetButton = document.getElementById('panel-summary-list-item-button-createButton');
                                    targetButton.innerHTML = 'Save';
                                    const panelNameInput = document.getElementById(`panel-manager-list-item-input-panelName`);
                                    const panelChannelInput = document.getElementById(`panel-manager-list-item-input-panelChannel`);
                                    const panelMessageInput = document.getElementById(`panel-manager-list-item-input-panelMessage`);
                                    const openCategoryInput = document.getElementById(`panel-manager-list-item-input-openCategory`);
                                    const closeCategoryInput = document.getElementById(`panel-manager-list-item-input-closeCategory`);
                                    const ticketMessageInput = document.getElementById(`panel-manager-list-item-input-ticketMessage`);
                                    const ticketLimitInput = document.getElementById(`panel-manager-list-item-input-ticketLimit`);
                                    const panelNameDetail = document.getElementById(`panel-summary-list-item-details-panelName`);
                                    const panelChannelDetail = document.getElementById(`panel-summary-list-item-details-panelChannel`);
                                    const panelMessageDetail = document.getElementById(`panel-summary-list-item-details-panelMessage`);
                                    const openCategoryDetail = document.getElementById(`panel-summary-list-item-details-openCategory`);
                                    const closeCategoryDetail = document.getElementById(`panel-summary-list-item-details-closeCategory`);
                                    const ticketMessageDetail = document.getElementById(`panel-summary-list-item-details-ticketMessage`);
                                    const ticketLimitDetail = document.getElementById(`panel-summary-list-item-details-ticketLimit`);
                                    panelNameInput.value = `${panel.panelName}`;
                                    panelChannelInput.value = `${channels.find(c => c.id === panel.ticketChannel).name}`;
                                    panelMessageInput.value = `${panel.panelMessage}`;
                                    openCategoryInput.value = `${categories.find(c => c.id === panel.openCategory).name}`;
                                    closeCategoryInput.value = `${categories.find(c => c.id === panel.closedCategory).name}`;
                                    ticketMessageInput.value = `${panel.ticketMessage}`;
                                    ticketLimitInput.value = parseInt(panel.ticketLimit);
                                    panelNameDetail.innerHTML = `${panel.panelName}`;
                                    panelChannelDetail.innerHTML = `${channels.find(c => c.id === panel.ticketChannel).name}`;
                                    panelMessageDetail.innerHTML = `${panel.panelMessage}`;
                                    openCategoryDetail.innerHTML = `${categories.find(c => c.id === panel.openCategory).name}`;
                                    closeCategoryDetail.innerHTML = `${categories.find(c => c.id === panel.closedCategory).name}`;
                                    ticketMessageDetail.innerHTML = `${panel.ticketMessage}`;
                                    ticketLimitDetail.innerHTML = parseInt(panel.ticketLimit);
                                    activePanel = panel._id;
                                    const newList = new Array();
                                    panel.roles.forEach((role) => {
                                        if (roles.find(r => r.id === role)) {
                                            newList.push(roles.find(r => r.id === role));
                                        }
                                    });
                                    activeRoles = newList;
                                    buildRolesList(newList);
                                });
                            });
                        };

                        function buildRolesList(roleList) {
                            const rolesList = document.getElementById('panel-summary-list-item-details-ticketAdminRoles');
                            const roleDatalist = document.getElementById('datalist-ticketAdminRoles');
                            rolesList.innerHTML = "";
                            roleDatalist.innerHTML = "";
                            roles.forEach((role) => {
                                if (!activeRoles.find(r => r.id === role.id)) {
                                    const option = document.createElement('option');
                                    option.innerHTML = `${role.name}`;
                                    roleDatalist.appendChild(option);
                                }
                            });
                            if (activeRoles.length < 1) {
                                const item = document.createElement('li');
                                item.className = 'panel-summary-list-item-details-item';
                                item.id = `panel-summary-list-item-details-item-none`;
                                item.style.cursor = 'pointer';
                                rolesList.appendChild(item);
                                const text = document.createElement('h2');
                                text.className = 'panel-summary-list-item-details-item-text center-vert';
                                text.innerHTML = 'None';
                                item.appendChild(text);

                            } else {
                                roleList.forEach((role) => {
                                    const item = document.createElement('li');
                                    item.className = 'panel-summary-list-item-details-item';
                                    item.id = `panel-summary-list-item-details-item-${role.id}`;
                                    rolesList.appendChild(item);
                                    const text = document.createElement('h2');
                                    text.className = 'panel-summary-list-item-details-item-text center-vert';
                                    text.innerHTML = `${role.name}`;
                                    item.appendChild(text);
                                    item.style.cursor = 'pointer';
                                    item.addEventListener('click', () => {
                                        const newList = new Array();
                                        activeRoles.forEach((role2) => {
                                            if (role2.id !== role.id) {
                                                if (roles.find(r => r.id === role2.id)) {
                                                    newList.push(role2);
                                                };
                                            };
                                        })
                                        activeRoles = newList;
                                        buildRolesList(newList);
                                    });
                                });
                            };
                        };

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
                    });
                });
            });
            // End of page code
        });

    });
});

