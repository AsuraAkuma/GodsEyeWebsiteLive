// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const pollsList = document.getElementById('section-container-polls-list');
const channelsList = document.getElementById('channel-list');
const titleInput = document.getElementById('section-container-subsection-titleInput');
const channelInput = document.getElementById('section-container-subsection-channelInput');
const descriptionInput = document.getElementById('section-container-subsection-descriptionInput');
const optionsInput = document.getElementById('section-container-subsection-optionsInput');
const optionsList = document.getElementById('section-container-subsection-optionsList');
const addButton = document.getElementById('section-container-subsection-addButton');
let options = new Array();
const createButton = document.getElementById('section-container-buttonContainer-button-create');
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
            let targetPoll = 'none';
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ channels }) => {
                createPolls();
                channels.forEach((channel) => {
                    const option = document.createElement('option');
                    option.innerHTML = `${channel.name}`;
                    channelsList.appendChild(option);
                });
                createButton.addEventListener('click', () => {
                    if (!titleInput.value) {
                        alert('Please provide a title!');
                        return;
                    };
                    if (!channelInput.value) {
                        alert('Please provide a channel!');
                        return;
                    };
                    if (!descriptionInput.value) {
                        alert('Please provide a description!');
                        return;
                    };
                    if (options.length <= 1) {
                        alert('Please provide at least 2 options!');
                        return;
                    };
                    const channelId = channels.find(c => c.name.toLowerCase() === channelInput.value).id;
                    if (targetPoll !== 'none') {
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/polls/update?' + new URLSearchParams({ guildId: targetGuildId, title: titleInput.value, description: descriptionInput.value, channel: channelId, options: options.join("<ge2058>"), messageId: targetPoll })).then((result) => {
                            return result.json();
                        }).then(({ msg }) => {
                            if (msg === 'Success') {
                                successPopup();
                                setTimeout(() => {
                                    createPolls();
                                }, 2500);
                            };
                        });
                    } else {
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/polls/create?' + new URLSearchParams({ guildId: targetGuildId, title: titleInput.value, description: descriptionInput.value, channel: channelId, options: options.join("<ge2058>") })).then((result) => {
                            return result.json();
                        }).then(({ msg }) => {
                            if (msg === 'Success') {
                                successPopup();
                                setTimeout(() => {
                                    createPolls();
                                }, 2500);
                            };
                        });
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

                function createPolls() {
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/polls?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ polls }) => {
                        let status = [];
                        pollsList.innerHTML = '';
                        polls.forEach((poll) => {
                            const topOption = poll.options.sort((a, b) => b.voteCount - a.voteCount)[0];
                            status[poll.messageId] = poll.status;
                            const item = document.createElement('li');
                            item.className = 'section-container-list-item';
                            item.id = `section-container-list-item-${poll.messageId}`;
                            pollsList.appendChild(item);
                            const titleContainer = document.createElement('div');
                            titleContainer.className = 'section-container-list-item-titleContainer';
                            item.appendChild(titleContainer);
                            const title = document.createElement('h1');
                            title.className = 'section-container-list-item-title';
                            title.id = `section-container-list-item-title-${poll.messageId}`;
                            title.innerHTML = `${poll.title}`;
                            titleContainer.appendChild(title);
                            const container = document.createElement('div');
                            container.className = 'section-container-list-item-container';
                            container.id = `section-container-list-item-container-${poll.messageId}`;
                            item.appendChild(container);
                            const participantsContainer = document.createElement('div');
                            participantsContainer.className = 'section-container-list-item-container-participantsContainer';
                            participantsContainer.id = `section-container-list-item-container-participantsContainer-${poll.messageId}`;
                            container.appendChild(participantsContainer);
                            const participants = document.createElement('h1');
                            participants.className = 'section-container-list-item-container-participantsContainer-participants';
                            participants.id = `section-container-list-item-container-participantsContainer-participants-${poll.messageId}`;
                            participants.innerHTML = `Participants: ${poll.participants}`;
                            participantsContainer.appendChild(participants);
                            const winnerContainer = document.createElement('div');
                            winnerContainer.className = 'section-container-list-item-container-winnerContainer';
                            winnerContainer.id = `section-container-list-item-container-winnerContainer-${poll.messageId}`;
                            container.appendChild(winnerContainer);
                            const winner = document.createElement('h1');
                            winner.className = 'section-container-list-item-container-winnerContainer-winner';
                            winner.id = `section-container-list-item-container-winnerContainer-winner-${poll.messageId}`;
                            winner.innerHTML = `Winner: ${topOption.name} Votes: ${topOption.voteCount}`;
                            winnerContainer.appendChild(winner);
                            const buttonContainer = document.createElement('span');
                            buttonContainer.className = 'section-container-list-item-buttonContainer';
                            buttonContainer.id = `section-container-list-item-buttonContainer-${poll.messageId}`;
                            item.appendChild(buttonContainer);
                            const sliderContainer = document.createElement('span');
                            sliderContainer.className = 'section-container-list-item-buttonContainer-sliderContainer';
                            sliderContainer.id = `section-container-list-item-buttonContainer-sliderContainer-${poll.messageId}`;
                            buttonContainer.appendChild(sliderContainer);
                            const sliderRail = document.createElement('span');
                            sliderRail.className = 'section-container-list-item-buttonContainer-sliderContainer-sliderRail';
                            sliderContainer.appendChild(sliderRail);
                            const slider = document.createElement('span');
                            slider.id = `section-container-list-item-buttonContainer-sliderContainer-slider-${poll.messageId}`;
                            if (poll.status === true) {
                                slider.className = 'section-container-list-item-buttonContainer-sliderContainer-slider glowGreen';
                                slider.style.backgroundColor = 'var(--geGreen)';
                                slider.style.left = '-2.5%';
                                sliderContainer.style.justifyContent = 'right';
                            } else {
                                slider.className = 'section-container-list-item-buttonContainer-sliderContainer-slider glowRed';
                                slider.style.backgroundColor = 'red';
                                slider.style.left = '2.5%';
                                sliderContainer.style.justifyContent = 'left';
                            };
                            sliderContainer.appendChild(slider);
                            const editButton = document.createElement('button');
                            editButton.className = 'section-container-list-item-buttonContainer-button';
                            editButton.id = `section-container-list-item-buttonContainer-button-edit-${poll.messageId}`;
                            editButton.innerHTML = 'Edit';
                            buttonContainer.appendChild(editButton);
                            const deleteButton = document.createElement('button');
                            deleteButton.className = 'section-container-list-item-buttonContainer-button';
                            deleteButton.id = `section-container-list-item-buttonContainer-button-delete-${poll.messageId}`;
                            deleteButton.innerHTML = 'Delete';
                            buttonContainer.appendChild(deleteButton);
                            sliderContainer.addEventListener('click', () => {
                                if (status[poll.messageId] === true) {
                                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/polls/status/update?' + new URLSearchParams({ guildId: targetGuildId, messageId: poll.messageId, status: 'false' })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            slider.className = 'section-container-list-item-buttonContainer-sliderContainer-slider glowRed';
                                            slider.style.backgroundColor = 'red';
                                            slider.style.left = '2.5%';
                                            sliderContainer.style.justifyContent = 'left';
                                            status[poll.messageId] = false;
                                            successPopup();
                                        };
                                    });
                                } else {
                                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/polls/status/update?' + new URLSearchParams({ guildId: targetGuildId, messageId: poll.messageId, status: 'true' })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            slider.className = 'section-container-list-item-buttonContainer-sliderContainer-slider glowGreen';
                                            slider.style.backgroundColor = 'var(--geGreen)';
                                            slider.style.left = '-2.5%';
                                            sliderContainer.style.justifyContent = 'right';
                                            status[poll.messageId] = true;
                                            successPopup();
                                        };
                                    });
                                };
                            });
                            editButton.addEventListener('click', () => {
                                targetPoll = poll.messageId;
                                createButton.innerHTML = 'Save';
                                titleInput.value = poll.title;
                                const targetChannel = channels.find(c => c.id === poll.channelId);
                                channelInput.value = targetChannel.name;
                                descriptionInput.value = poll.description;
                                optionsList.innerHTML = "";
                                poll.options.forEach((option) => {
                                    const item = document.createElement('li');
                                    item.className = 'section-container-subsection-ul-li';
                                    item.id = `section-container-subsection-optionsList-item-${option.name}`;
                                    optionsList.appendChild(item);
                                    const text = document.createElement('h1');
                                    text.className = 'section-container-subsection-ul-li-h1';
                                    text.id = `section-container-subsection-optionsList-item-h1-${option.name}`;
                                    text.innerHTML = `${option.name}`;
                                    item.appendChild(text);
                                    options.push(option.name);
                                    item.addEventListener('click', () => {
                                        item.remove();
                                        options = options.filter(o => o !== item.id.split("-").slice(5).join());
                                    });
                                });
                            });
                            deleteButton.addEventListener('click', () => {
                                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/polls/delete?' + new URLSearchParams({ guildId: targetGuildId, messageId: poll.messageId })).then((result) => {
                                    return result.json();
                                }).then(({ msg }) => {
                                    if (msg === 'Success') {
                                        successPopup();
                                        item.remove();
                                    };
                                });
                            });
                        });
                    });
                };
            });
            optionsInput.addEventListener('keypress', ({ key }) => {
                if (key !== "Enter") {
                    return;
                };
                if (key === "Enter") {
                    if (!optionsInput.value) {
                        return;
                    };
                    if (options.length === 25) {
                        alert('You have reached the max amount of options for this poll!');
                        return;
                    };
                    if (options.includes(optionsInput.value)) {
                        alert('This option already exists!');
                        return;
                    };
                    const item = document.createElement('li');
                    item.className = 'section-container-subsection-ul-li';
                    item.id = `section-container-subsection-optionsList-item-${optionsInput.value}`;
                    optionsList.appendChild(item);
                    const text = document.createElement('h1');
                    text.className = 'section-container-subsection-ul-li-h1';
                    text.id = `section-container-subsection-optionsList-item-h1-${optionsInput.value}`;
                    text.innerHTML = `${optionsInput.value}`;
                    item.appendChild(text);
                    options.push(optionsInput.value);
                    optionsInput.value = "";
                    item.addEventListener('click', () => {
                        item.remove();
                        options = options.filter(o => o !== item.id.split("-").slice(5).join());
                    });
                };
            });
            addButton.addEventListener('click', () => {
                if (!optionsInput.value) {
                    return;
                };
                if (options.length === 25) {
                    alert('You have reached the max amount of options for this poll!');
                    return;
                };
                if (options.includes(optionsInput.value)) {
                    alert('This option already exists!');
                    return;
                };
                const item = document.createElement('li');
                item.className = 'section-container-subsection-ul-li';
                item.id = `section-container-subsection-optionsList-item-${optionsInput.value}`;
                optionsList.appendChild(item);
                const text = document.createElement('h1');
                text.className = 'section-container-subsection-ul-li-h1';
                text.id = `section-container-subsection-optionsList-item-h1-${optionsInput.value}`;
                text.innerHTML = `${optionsInput.value}`;
                item.appendChild(text);
                options.push(optionsInput.value);
                optionsInput.value = "";
                item.addEventListener('click', () => {
                    item.remove();
                    options = options.filter(o => o !== item.id.split("-").slice(5).join());
                });
            });
            loaderContainer.style.display = 'none';
            // End of page code
        });
    });
});

