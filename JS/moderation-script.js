// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const commandsList = document.getElementById("body-main-list");
const commandDataList = document.getElementById('commands-list');
const searchButton = document.getElementById('body-command-button-search');
const searchInput = document.getElementById('body-command-input-search');
const auditLogInput = document.getElementById('body-auditLog-input');
const auditLogButton = document.getElementById('body-auditLog-button');
const auditLogDataList = document.getElementById('channel-list');
const roleList = document.getElementById('role-list');
const autoRoleList = document.getElementById('body-autorole-list');
let autoRolesArr = [];
const autoRoleButton = document.getElementById('body-autorole-button');
const autoRoleInput = document.getElementById('body-autorole-input');

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
            fetch('https://api.godseyeofficial.xyz/api/client/commands?').then((result) => {
                return result.json();
            }).then(({ msg, commands }) => {
                if (msg === 'Success') {
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then((settings) => {
                        // console.log(commands);
                        const types = ['Sub Command', 'Sub Command Group', 'Text', 'Integer', 'True or False', 'User', 'Channel', 'Role', 'User or Role', 'Number', 'Attachment'];
                        const engagementCommands = ['balance', 'buy', 'coupons', 'crime', 'deposit', 'inventory', 'loan', 'pay', 'rob', 'sales', 'shop', 'slut', 'withdraw', 'work', 'botinfo', 'roleinfo', 'serverinfo', 'whois', 'rank', 'rankboard'];
                        const connectionsCommands = [];
                        const serverManagementCommands = ['inviteboard', 'invites', 'syncinvites', 'announce', 'ban', 'blacklist', 'deafen', 'kick', 'mute', 'nuke', 'purge', 'slowmode', 'unban', 'unmute', 'warn', 'warns', 'vticket'];
                        const monetizationCommands = [];
                        const utilitiesCommands = ['lfg', 'suggest', 'tp'];
                        commands.forEach((command) => {
                            const firstLetter = command.name.split("")[0].toUpperCase();
                            const ladderLetters = command.name.split("").slice(1).join("");
                            const editedCommandName = `${firstLetter}${ladderLetters}`;
                            const opt = document.createElement('option');
                            opt.innerHTML = `${editedCommandName}`;
                            commandDataList.appendChild(opt);
                            const item = document.createElement('li');
                            item.className = 'commands-list-item';
                            item.id = `commands-list-item-${command.name}`;
                            commandsList.appendChild(item)
                            const commandName = document.createElement('h1');
                            commandName.className = 'commands-list-item-commandName';
                            commandName.id = `commands-list-item-commandName-${command.name}`;
                            commandName.innerHTML = `${editedCommandName}`;
                            item.appendChild(commandName);
                            const description = document.createElement('p');
                            description.className = 'commands-list-item-description';
                            description.id = `commands-list-item-description-${command.name}`;
                            description.innerHTML = `${command.description}`;
                            item.appendChild(description);
                            const button = document.createElement('button');
                            button.className = 'commands-list-item-button';
                            button.id = `commands-list-item-button-${command.name}`;
                            const commandStatus = settings.activeCommands.find(c => c.name === command.name);
                            if (commandStatus) {
                                if (commandStatus.status === true) {
                                    button.innerHTML = 'Enabled';
                                } else {
                                    button.innerHTML = 'Disabled';
                                };
                            }
                            item.appendChild(button);
                            button.addEventListener('click', () => {
                                if (button.innerHTML === "Enabled") {
                                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings/commands/update?' + new URLSearchParams({ guildId: targetGuildId, name: command.name, value: "false" })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === "Success") {
                                            successPopup();
                                            button.innerHTML = 'Disabled';
                                        }
                                    });
                                } else {
                                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings/commands/update?' + new URLSearchParams({ guildId: targetGuildId, name: command.name, value: "true" })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === "Success") {
                                            successPopup();
                                            button.innerHTML = 'Enabled';
                                        }
                                    });
                                };
                            });
                            const optionList = document.createElement('ul');
                            optionList.className = 'commands-list-item-optionList';
                            optionList.id = `commands-list-item-optionList-${command.name}`;
                            item.appendChild(optionList);
                            command.options.forEach((option) => {
                                const firstLetter = option.name.split("")[0].toUpperCase();
                                const ladderLetters = option.name.split("").slice(1).join("");
                                const editedOptionName = `${firstLetter}${ladderLetters}`;
                                if (option.options) {
                                    const subCommand = option;
                                    const item = document.createElement('li');
                                    item.className = 'commands-list-item-optionList-option';
                                    item.id = `commands-list-item-optionList-option-${subCommand.name}`;
                                    optionList.appendChild(item);
                                    const commandName = document.createElement('h1');
                                    commandName.className = 'commands-list-item-optionList-option-name';
                                    commandName.id = `commands-list-item-optionList-option-name-${subCommand.name}`;
                                    commandName.innerHTML = `Subcommand: ${editedOptionName}`;
                                    item.appendChild(commandName);
                                    const description = document.createElement('p');
                                    description.className = 'commands-list-item-optionList-option-description';
                                    description.id = `commands-list-item-optionList-option-description-${subCommand.name}`;
                                    description.innerHTML = `${subCommand.description}`;
                                    item.appendChild(description);
                                    const subOptionList = document.createElement('ul');
                                    subOptionList.className = 'commands-list-item-optionList-option-optionList';
                                    subOptionList.id = `commands-list-item-optionList-option-optionList-${subCommand.name}`;
                                    item.appendChild(subOptionList);
                                    subCommand.options.forEach((subOption) => {
                                        const firstLetter = subOption.name.split("")[0].toUpperCase();
                                        const ladderLetters = subOption.name.split("").slice(1).join("");
                                        const editedOptionName = `${firstLetter}${ladderLetters}`;
                                        const optionItem = document.createElement('li');
                                        optionItem.className = 'commands-list-item-optionList-option-optionList-option';
                                        optionItem.id = `commands-list-item-optionList-option-optionList-option-${subCommand.name}-${subOption.name}`;
                                        subOptionList.appendChild(optionItem);
                                        const optionName = document.createElement('h1');
                                        optionName.className = 'commands-list-item-optionList-option-name';
                                        optionName.id = `commands-list-item-optionList-option-name-${subCommand.name}-${subOption.name}`;
                                        optionName.innerHTML = `Option: ${editedOptionName}`;
                                        optionItem.appendChild(optionName);
                                        const optionDescription = document.createElement('p');
                                        optionDescription.className = 'commands-list-item-optionList-option-description';
                                        optionDescription.id = `commands-list-item-optionList-option-description-${subCommand.name}-${subOption.name}`;
                                        if (subOption.choices) {
                                            optionDescription.innerHTML = `${subOption.description}<br>Input Type: ${types[subOption.type - 1]}<br>Required: ${subOption.required}<br>Choices: ${subOption.choices.map((v, i) => `${v.name}: ${v.value}`)}`;
                                        } else {
                                            optionDescription.innerHTML = `${subOption.description}<br>Input Type: ${types[subOption.type - 1]}<br>Required: ${subOption.required}`;
                                        };
                                        optionItem.appendChild(optionDescription);
                                    });
                                } else {
                                    const optionItem = document.createElement('li');
                                    optionItem.className = 'commands-list-item-optionList-option';
                                    optionItem.id = `commands-list-item-optionList-option-${command.name}-${option.name}`;
                                    optionList.appendChild(optionItem);
                                    const optionName = document.createElement('h1');
                                    optionName.className = 'commands-list-item-optionList-option-name';
                                    optionName.id = `commands-list-item-optionList-option-name-${command.name}-${option.name}`;
                                    optionName.innerHTML = `Option: ${editedOptionName}`;
                                    optionItem.appendChild(optionName);
                                    const optionDescription = document.createElement('p');
                                    optionDescription.className = 'commands-list-item-optionList-option-description';
                                    optionDescription.id = `commands-list-item-optionList-option-description-${command.name}-${option.name}`;
                                    if (option.choices) {
                                        optionDescription.innerHTML = `${option.description}<br>Input Type: ${types[option.type - 1]}<br>Required: ${option.required}<br>Choices: ${option.choices.map((v, i) => `${v.name}: ${v.value}`).join(" | ")}`;
                                    } else {
                                        optionDescription.innerHTML = `${option.description}<br>Input Type: ${types[option.type - 1]}<br>Required: ${option.required}`;
                                    };
                                    optionItem.appendChild(optionDescription);
                                };
                            });
                        });
                        searchButton.addEventListener('click', () => {
                            const target = document.getElementById(`commands-list-item-${searchInput.value.toLowerCase()}`);
                            if (target) {
                                commandsList.scrollTop = target.offsetTop;
                            };
                        });
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                            return result.json();
                        }).then(({ msg, channels }) => {
                            if (!response.msg) {
                                channels.forEach((channel) => {
                                    const option = document.createElement('option');
                                    option.innerHTML = `${channel.name}`;
                                    auditLogDataList.appendChild(option);
                                });
                                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/auditlog?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                    return result.json();
                                }).then((response) => {
                                    if (response.msg === 'Success') {
                                        auditLogInput.value = `${response.channel}`;
                                    };
                                });
                            };
                        });
                        auditLogButton.addEventListener('click', () => {
                            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/auditlog/update?' + new URLSearchParams({ guildId: targetGuildId, channel: auditLogInput.value })).then((result) => {
                                return result.json();
                            }).then((response) => {
                                if (response.msg === 'Success') {
                                    successPopup();
                                };
                            });
                        });
                    });
                };
            });
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/roles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ msg, roles }) => {
                if (msg === 'Success') {
                    roles.forEach((role) => {
                        const option = document.createElement('option');
                        option.innerHTML = role.name;
                        roleList.appendChild(option);
                    });
                };
                fetch('https://api.godseyeofficial.xyz/api/guild/autoroles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then(({ msg, autoRoles }) => {
                    if (msg === 'Success') {
                        autoRoles.roleId.forEach((autoRole) => {
                            const targetRole = roles.find(r => r.id === autoRole);
                            if (targetRole) {
                                const item = document.createElement('li');
                                item.className = 'body-autorole-list-item';
                                autoRoleList.appendChild(item);
                                const center1 = document.createElement('div');
                                center1.className = "center-vert body-autorole-list-item-center1";
                                item.appendChild(center1);
                                const name = document.createElement('h2');
                                name.className = "body-autorole-list-item-name";
                                name.innerHTML = targetRole.name;
                                center1.appendChild(name);
                                autoRolesArr.push(autoRole);
                                item.addEventListener('click', () => {
                                    item.remove();
                                    autoRolesArr.filter(r => r !== autoRole);
                                });
                            } else {
                                alert('This role could not be found try refreshing the page!');
                                return;
                            }
                        });
                    };
                    autoRoleInput.addEventListener('keypress', ({ key }) => {
                        if (key === "Enter") {
                            const targetRole = roles.find(r => r.name.toLowerCase() === autoRoleInput.value.toLowerCase());
                            if (targetRole) {
                                const item = document.createElement('li');
                                item.className = 'body-autorole-list-item';
                                autoRoleList.appendChild(item);
                                const center1 = document.createElement('div');
                                center1.className = "center-vert body-autorole-list-item-center1";
                                item.appendChild(center1);
                                const name = document.createElement('h2');
                                name.className = "body-autorole-list-item-name";
                                name.innerHTML = targetRole.name;
                                center1.appendChild(name);
                                autoRolesArr.push(targetRole.id);
                                item.addEventListener('click', () => {
                                    item.remove();
                                    autoRolesArr.filter(r => r !== targetRole.id);
                                });
                                autoRoleInput.value = "";
                            };
                        };
                    });
                    autoRoleButton.addEventListener('click', () => {
                        if (autoRolesArr.length < 1) {
                            alert('At least 1 role is required to save!');
                            return;
                        };
                        fetch('https://api.godseyeofficial.xyz/api/guild/autoroles/save?' + new URLSearchParams({ guildId: targetGuildId, roles: autoRolesArr.join("-") })).then((result) => {
                            return result.json();
                        }).then(({ msg }) => {
                            if (msg === 'Success') {
                                successPopup();
                            };
                        });
                    });
                });
                loaderContainer.style.display = 'none';
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
