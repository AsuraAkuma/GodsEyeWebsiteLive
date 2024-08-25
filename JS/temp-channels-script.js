// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const categoryList = document.getElementById('category-list');
const hubList = document.getElementById('section-list-hubs');
const nameInput = document.getElementById('section-container-panel-section-name-input');
const catInput = document.getElementById('section-container-panel-section-category-input');
const userLimitInput = document.getElementById('section-container-panel-section-userLimit-input');
const saveButton = document.getElementById('section-container-button-save');
const hublist2 = document.getElementById('section-container-panel-section-hublist-list');
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
            let currentHub = "";
            const catList = new Array();
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/categories?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ categories }) => {
                categories.forEach((category) => {
                    const option = document.createElement('option');
                    option.innerHTML = category.name;
                    categoryList.appendChild(option);
                    catList.push(category);
                });
                // Functions
                createTempchannels();
                function createTempchannels() {
                    fetch('https://api.godseyeofficial.xyz/api/guild/tempchannels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ msg, tempChannels }) => {
                        if (msg === 'Success') {
                            hubList.innerHTML = '';
                            tempChannels.forEach(tempChannel => {
                                const item = document.createElement('li');
                                item.className = 'section-list-item';
                                item.id = `section-list-item-${tempChannel.channelId}`;
                                hubList.appendChild(item);
                                const name = document.createElement('h1');
                                name.className = 'section-list-item-name';
                                name.id = `section-list-item-name-${tempChannel.channelId}`;
                                name.innerHTML = `${tempChannel.pretext}`;
                                item.appendChild(name);
                                const container = document.createElement('div');
                                container.className = 'section-list-item-container';
                                container.id = `section-list-item-container-${tempChannel.channelId}`;
                                item.appendChild(container);
                                const category = document.createElement('h1');
                                category.className = 'section-list-item-container-category';
                                category.id = `section-list-item-container-category-${tempChannel.channelId}`;
                                const targetCategory = categories.find(c => c.id === tempChannel.categoryId);
                                if (targetCategory) {
                                    category.innerHTML = `Category: ${targetCategory.name}`;
                                } else {
                                    category.innerHTML = `Category: None`;
                                }
                                container.appendChild(category);
                                const userLimit = document.createElement('h1');
                                userLimit.className = 'section-list-item-container-userLimit';
                                userLimit.id = `section-list-item-container-userLimit-${tempChannel.channelId}`;
                                userLimit.innerHTML = `User Limit: ${tempChannel.userLimit}`;
                                container.appendChild(userLimit);
                                const span = document.createElement('span');
                                span.className = 'section-list-item-span';
                                span.id = `section-list-item-span-${tempChannel.channelId}`;
                                item.appendChild(span);
                                const editButton = document.createElement('button');
                                editButton.className = 'section-list-item-span-button';
                                editButton.id = `section-list-item-span-button-edit`;
                                editButton.innerHTML = 'Edit';
                                span.appendChild(editButton);
                                const deleteButton = document.createElement('button');
                                deleteButton.className = 'section-list-item-span-button';
                                deleteButton.id = `section-list-item-span-button-delete`;
                                deleteButton.innerHTML = 'Delete';
                                span.appendChild(deleteButton);
                                editButton.addEventListener('click', () => {
                                    currentHub = tempChannel._id;
                                    nameInput.value = `${tempChannel.pretext}`;
                                    if (targetCategory) {
                                        catInput.value = `${targetCategory.name}`;
                                    };
                                    userLimitInput.value = tempChannel.userLimit;
                                });
                                deleteButton.addEventListener('click', () => {
                                    const confirmation = confirm(`Confirm the deletion of the "${tempChannel.pretext}" hub by pressing okay to confirm or cancel to deny.`);
                                    if (confirmation === true) {
                                        fetch('https://api.godseyeofficial.xyz/api/guild/tempchannels/delete?' + new URLSearchParams({ guildId: targetGuildId, target: tempChannel._id })).then((result) => {
                                            return result.json();
                                        }).then(({ msg }) => {
                                            if (msg !== "Success") {
                                                alert(msg);
                                                return;
                                            };
                                            successPopup();
                                            item.remove();
                                        });
                                    };
                                });
                            });
                        };
                    });
                };
                saveButton.addEventListener('click', () => {
                    if (currentHub === "") {
                        if (!nameInput.value) {
                            alert('Please provide a hub name.');
                            return;
                        };
                        if (!catInput.value) {
                            alert('Please provide a category name.');
                            return;
                        };
                        const targetCategory = catList.find(c => c.name === catInput.value);
                        fetch('https://api.godseyeofficial.xyz/api/guild/tempchannels/create?' + new URLSearchParams({ guildId: targetGuildId, pretext: nameInput.value, categoryId: targetCategory.id, userLimit: userLimitInput.value ?? 'none' })).then((result) => {
                            return result.json();
                        }).then(({ msg }) => {
                            if (msg !== "Success") {
                                alert(msg);
                                return;
                            };
                            successPopup();
                            nameInput.value = '';
                            catInput.value = '';
                            userLimitInput.value = '';
                            setTimeout(() => {
                                createTempchannels();
                            }, 2500);
                        });
                    } else {
                        if (!nameInput.value) {
                            alert('Please provide a hub name.');
                            return;
                        };
                        if (!catInput.value) {
                            alert('Please provide a category name.');
                            return;
                        };
                        const targetCategory = catList.find(c => c.name === catInput.value);
                        fetch('https://api.godseyeofficial.xyz/api/guild/tempchannels/save?' + new URLSearchParams({ guildId: targetGuildId, pretext: nameInput.value, categoryId: targetCategory.id, userLimit: userLimitInput.value ?? 'none', target: currentHub })).then((result) => {
                            return result.json();
                        }).then(({ msg }) => {
                            if (msg !== "Success") {
                                alert(msg);
                                return;
                            };
                            successPopup();
                            setTimeout(() => {
                                createTempchannels();
                            }, 2500);
                        });
                    };
                });
            });
            loaderContainer.style.display = 'none';
            // End of page code
        });
    });
});

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
