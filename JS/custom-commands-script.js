// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const deleteButton = document.getElementById('body-custom-commands-editor-button-delete');
const createButton = document.getElementById('body-custom-commands-editor-button-create');
const cancelButton = document.getElementById('body-custom-commands-editor-button-cancel');
const nameInput = document.getElementById('body-custom-commands-editor-input-name');
const typeInput = document.getElementById('body-custom-commands-editor-input-type');
const statusInput = document.getElementById('body-custom-commands-editor-input-deletestatus');
const responseInput = document.getElementById('body-custom-commands-editor-input-response');

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
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then((response) => {
                const commandList = new Array();
                const list = document.getElementById('body-custom-commands-list');
                for (let i = 0; i < list.children.length; i++) {
                    list.children.item(0).remove();
                };
                let targetCommand;
                if (response.customCommands.length > 0) {
                    const message = document.getElementById('body-custom-commands-list-message');
                    message.style.display = 'none';
                };
                response.customCommands.forEach((command) => {
                    const item = document.createElement('li');
                    item.className = 'body-custom-commands-list-item';
                    item.id = `body-custom-commands-list-item-${command._id}`;
                    list.appendChild(item);
                    const name = document.createElement('h1');
                    name.className = 'body-custom-commands-list-item-name';
                    name.id = `body-custom-commands-list-item-name-${command._id}`;
                    name.innerHTML = `${command.name}`;
                    item.appendChild(name);
                    const container = document.createElement('div');
                    container.className = "body-custom-commands-list-item-container";
                    item.appendChild(container);
                    const type = document.createElement('h1');
                    type.className = 'body-custom-commands-list-item-type';
                    type.id = `body-custom-commands-list-item-type-${command._id}`;
                    type.innerHTML = `Type: ${command.type} |`;
                    container.appendChild(type);
                    const deleteStatus = document.createElement('h1');
                    deleteStatus.className = 'body-custom-commands-list-item-deleteStatus';
                    deleteStatus.id = `body-custom-commands-list-item-deleteStatus-${command._id}`;
                    if (command.delete === true) {
                        deleteStatus.innerHTML = `Delete Message: Yes`;
                    } else {
                        deleteStatus.innerHTML = `Delete Message: No`;
                    };
                    container.appendChild(deleteStatus);
                    commandList.push(command);
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

                    // const button = document.createElement('button');
                    // button.id = `body-custom-commands-list-item-button-${command._id}`;
                    // item.appendChild(button);
                    if (command.status === true) {
                        slider.style.left = '60%';
                        slider.style.backgroundColor = 'var(--geGreen)';
                        slider.className = 'slider-container-slider glowGreen';
                    } else {
                        slider.style.left = '5%';
                        slider.style.backgroundColor = 'red';
                        slider.className = 'slider-container-slider glowRed';
                    };
                    sliderContainer.addEventListener('click', () => {
                        if (command.status === true) {
                            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings/customcommands/status/update?' + new URLSearchParams({ guildId: targetGuildId, targetCommand: command.name, value: 'false' })).then((result) => {
                                return result.json();
                            }).then((response) => {
                                if (response.msg === 'Success') {
                                    successPopup()
                                    slider.style.left = '5%';
                                    slider.style.backgroundColor = 'red';
                                    slider.className = 'slider-container-slider glowRed';
                                    command['status'] = false;
                                } else {
                                    const errorContainer = document.getElementById('error-container');
                                    const errorMessage = document.getElementById('error-message');
                                    errorMessage.innerHTML = `Error: ${response.msg}`;
                                    errorContainer.style.display = 'block';
                                    setTimeout(() => {
                                        errorMessage.innerHTML = `Error`;
                                        errorContainer.style.display = 'none';
                                    }, 5000);
                                };
                            });
                        } else {
                            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings/customcommands/status/update?' + new URLSearchParams({ guildId: targetGuildId, targetCommand: command.name, value: 'true' })).then((result) => {
                                return result.json();
                            }).then((response) => {
                                if (response.msg === 'Success') {
                                    successPopup()
                                    slider.style.left = '60%';
                                    slider.style.backgroundColor = 'var(--geGreen)';
                                    slider.className = 'slider-container-slider glowGreen';
                                    command['status'] = true;
                                } else {
                                    const errorContainer = document.getElementById('error-container');
                                    const errorMessage = document.getElementById('error-message');
                                    errorMessage.innerHTML = `Error: ${response.msg}`;
                                    errorContainer.style.display = 'block';
                                    setTimeout(() => {
                                        errorMessage.innerHTML = `Error`;
                                        errorContainer.style.display = 'none';
                                    }, 5000);
                                };
                            });
                        };
                    });
                    item.addEventListener('click', () => {
                        nameInput.value = `${command.name}`;
                        typeInput.value = `${command.type}`;
                        if (command.delete === true) {
                            statusInput.value = 'Yes';
                        } else {
                            statusInput.value = 'No';
                        };
                        const responseInput = document.getElementById('body-custom-commands-editor-input-response');
                        responseInput.innerHTML = `${command.message}`;
                        createButton.innerHTML = 'Save';
                        targetCommand = command;
                        deleteButton.style.display = 'block';
                        createButton.style.display = 'block';
                        cancelButton.style.display = 'block';
                    });
                });
                createButton.addEventListener('click', () => {
                    if (typeInput.value.toLowerCase() !== "send" && typeInput.value.toLowerCase() !== "reply") {
                        alert("You must use either send or reply for the command type!");
                        return;
                    };
                    if (statusInput.value.toLowerCase() !== "yes" && typeInput.value.toLowerCase() !== "no") {
                        alert("You must use either yes or no for the delete status!");
                        return;
                    };
                    if (createButton.innerHTML === 'Save') {
                        let status;
                        if (statusInput.value === 'Yes') {
                            status = true;
                        } else {
                            status = false;
                        };
                        const commandObj = {
                            name: nameInput.value,
                            type: typeInput.value,
                            delete: status,
                            message: responseInput.innerHTML,
                            status: targetCommand.status
                        };
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings/customcommands/update?' + new URLSearchParams({ guildId: targetGuildId, targetCommand: targetCommand.id, name: commandObj.name, type: commandObj.type, deleteStatus: commandObj.delete.toString(), message: commandObj.message, status: commandObj.status.toString() })).then((result) => {
                            return result.json();
                        }).then((response) => {
                            if (response.msg === 'Success') {
                                successPopup()
                            } else {
                                const errorContainer = document.getElementById('error-container');
                                const errorMessage = document.getElementById('error-message');
                                errorMessage.innerHTML = `Error: ${response.msg}`;
                                errorContainer.style.display = 'block';
                                setTimeout(() => {
                                    errorMessage.innerHTML = `Error`;
                                    errorContainer.style.display = 'none';
                                }, 5000);
                            };
                        });
                    } else {
                        let status;
                        if (statusInput.value === 'Yes') {
                            status = true;
                        } else {
                            status = false;
                        };
                        const commandObj = {
                            name: nameInput.value,
                            type: typeInput.value,
                            delete: status,
                            message: responseInput.innerHTML,
                            status: true
                        };
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings/customcommands/create?' + new URLSearchParams({ guildId: targetGuildId, name: commandObj.name, type: commandObj.type, deleteStatus: commandObj.delete.toString(), message: commandObj.message, status: commandObj.status.toString() })).then((result) => {
                            return result.json();
                        }).then((response) => {
                            if (response.msg === 'Success') {
                                successPopup()
                            } else {
                                const errorContainer = document.getElementById('error-container');
                                const errorMessage = document.getElementById('error-message');
                                errorMessage.innerHTML = `Error: ${response.msg}`;
                                errorContainer.style.display = 'block';
                                setTimeout(() => {
                                    errorMessage.innerHTML = `Error`;
                                    errorContainer.style.display = 'none';
                                }, 5000);
                            };
                        });
                    };
                });
                deleteButton.addEventListener('click', () => {
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings/customcommands/delete?' + new URLSearchParams({ guildId: targetGuildId, commandId: nameInput.value })).then((result) => {
                        return result.json();
                    }).then((response) => {
                        if (response.msg === 'Success') {
                            successPopup()
                        };
                    });
                });
                cancelButton.addEventListener('click', () => {
                    nameInput.value = ``;
                    typeInput.value = ``;
                    statusInput.value = '';
                    responseInput.innerHTML = ``;
                    deleteButton.style.display = 'none';
                    createButton.style.display = 'none';
                    cancelButton.style.display = 'none';
                    targetCommand = '';
                    createButton.innerHTML = 'Create';
                });
                nameInput.addEventListener('input', () => {
                    if (nameInput.value.length > 0) {
                        if (typeInput.value.length > 0) {
                            if (statusInput.value.length > 0) {
                                if (responseInput.innerHTML.length > 0) {
                                    createButton.style.display = 'block';
                                    cancelButton.style.display = 'block';
                                };
                            }
                        }
                    };
                    if (nameInput.value.length === 0 && typeInput.value.length === 0 && statusInput.value.length === 0 && responseInput.innerHTML.length === 0) {
                        createButton.style.display = 'none';
                        cancelButton.style.display = 'none';
                    };
                });
                typeInput.addEventListener('input', () => {
                    if (nameInput.value.length > 0) {
                        if (typeInput.value.length > 0) {
                            if (statusInput.value.length > 0) {
                                if (responseInput.innerHTML.length > 0) {
                                    createButton.style.display = 'block';
                                    cancelButton.style.display = 'block';
                                };
                            }
                        }
                    };
                    if (nameInput.value.length === 0 && typeInput.value.length === 0 && statusInput.value.length === 0 && responseInput.innerHTML.length === 0) {
                        createButton.style.display = 'none';
                        cancelButton.style.display = 'none';
                    };
                });
                statusInput.addEventListener('input', () => {
                    if (nameInput.value.length > 0) {
                        if (typeInput.value.length > 0) {
                            if (statusInput.value.length > 0) {
                                if (responseInput.innerHTML.length > 0) {
                                    createButton.style.display = 'block';
                                    cancelButton.style.display = 'block';
                                };
                            }
                        }
                    };
                    if (nameInput.value.length === 0 && typeInput.value.length === 0 && statusInput.value.length === 0 && responseInput.innerHTML.length === 0) {
                        createButton.style.display = 'none';
                        cancelButton.style.display = 'none';
                    };
                });
                responseInput.addEventListener('input', () => {
                    if (nameInput.value.length > 0) {
                        if (typeInput.value.length > 0) {
                            if (statusInput.value.length > 0) {
                                if (responseInput.innerHTML.length > 0) {
                                    createButton.style.display = 'block';
                                    cancelButton.style.display = 'block';
                                };
                            }
                        }
                    };
                    if (nameInput.value.length === 0 && typeInput.value.length === 0 && statusInput.value.length === 0 && responseInput.innerHTML.length === 0) {
                        createButton.style.display = 'none';
                        cancelButton.style.display = 'none';
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
