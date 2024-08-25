// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const timerList = document.getElementById('body-section-timerList-list');
const createButton = document.getElementById('body-section-timerPanel-section-button-create');
const nameInput = document.getElementById('body-section-timerPanel-section-input-name');
const channelInput = document.getElementById('body-section-timerPanel-section-input-channel');
const durationTypeInput = document.getElementById('body-section-timerPanel-section-input-durationType');
const durationAmountInput = document.getElementById('body-section-timerPanel-section-input-durationAmount');
const messageInput = document.getElementById('body-section-timerPanel-section-input-message');
const channelList = document.getElementById('channel-list');
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
            let targetPanel = "";
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ channels }) => {
                channels.forEach((channel) => {
                    const option = document.createElement('option');
                    option.innerHTML = `${channel.name}`;
                    channelList.appendChild(option);
                });
                createTimers();
                createButton.addEventListener('click', () => {
                    if (!nameInput.value) {
                        alert('Provide a name!');
                        return;
                    };
                    if (!channelInput.value) {
                        alert('Provide a channel!');
                        return;
                    };
                    const targetChannel = channels.find(c => c.name === channelInput.value);
                    if (!targetChannel) {
                        alert('No channel found!');
                        return;
                    };
                    if (!durationTypeInput.value) {
                        alert('Provide a duration type!');
                        return;
                    };
                    if (!durationAmountInput.value) {
                        alert('Provide a duration amount!');
                        return;
                    };
                    if (messageInput.innerHTML === '') {
                        alert('Provide a message!');
                        return;
                    };
                    if (messageInput.innerHTML.split("").length > 5000) {
                        alert(`Your message is too large! Shorten it from ${messageInput.innerHTML.split("").length} characters to 5000 characters.`);
                        return;
                    };
                    fetch('https://api.godseyeofficial.xyz/api/guild/timers/create?' + new URLSearchParams({ guildId: targetGuildId, durationType: durationTypeInput.value, durationAmount: durationAmountInput.value.toString(), message: messageInput.innerHTML, channelId: targetChannel.id, name: nameInput.value, target: targetPanel })).then((result) => {
                        return result.json();
                    }).then((response) => {
                        const { msg } = response;
                        if (msg !== "Success") {
                            alert(msg);
                            return;
                        };
                        successPopup();
                        setTimeout(() => {
                            createTimers();
                        }, 2500);
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

                function createTimers() {
                    timerList.innerHTML = '';
                    fetch('https://api.godseyeofficial.xyz/api/guild/timers?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then((response) => {
                        if (!response.msg) {
                            const { timers } = response;
                            // const timerObj = {
                            //     _id: guildId + timerNumb,
                            //     durationType: "minute",
                            //     durationAmount: 30,
                            //     message: "test",
                            //     channelId: "023094817209384987",
                            //     guildId: "76987698768908796",
                            //     lastRun: timestamp,
                            //     nextRun: timestamp,
                            //     name: "test",
                            //     paused: false
                            // };            
                            timers.forEach((timer) => {
                                const now = new Date();
                                let int;
                                if (timer.durationType.toLowerCase() === 'minute') {
                                    int = timer.durationAmount * (1000 * 60);
                                };
                                if (timer.durationType.toLowerCase() === 'hour') {
                                    int = timer.durationAmount * (1000 * 60 * 60);
                                };
                                if (timer.durationType.toLowerCase() === 'day') {
                                    int = timer.durationAmount * (1000 * 60 * 60 * 24);
                                };
                                let nextRun = new Date(timer.nextRun);
                                const item = document.createElement('li');
                                item.className = "body-section-timerList-list-item";
                                item.id = `body-section-timerList-list-item-${timer._id}`;
                                timerList.appendChild(item);
                                const name = document.createElement('h1');
                                name.className = "body-section-timerList-list-item-name";
                                name.id = `body-section-timerList-list-item-name-${timer._id}`;
                                name.innerHTML = `${timer.name}`;
                                item.appendChild(name);
                                const container = document.createElement('div');
                                container.className = "body-section-timerList-list-item-container";
                                container.id = `body-section-timerList-list-item-container-${timer._id}`;
                                item.appendChild(container);
                                const topContainer = document.createElement('div');
                                topContainer.className = "body-section-timerList-list-item-topContainer";
                                topContainer.id = `body-section-timerList-list-item-topContainer-${timer._id}`;
                                container.appendChild(topContainer);
                                const bottomContainer = document.createElement('div');
                                bottomContainer.className = "body-section-timerList-list-item-bottomContainer";
                                bottomContainer.id = `body-section-timerList-list-item-bottomContainer-${timer._id}`;
                                container.appendChild(bottomContainer);
                                const interval = document.createElement('h1');
                                interval.className = "body-section-timerList-list-item-interval";
                                interval.id = `body-section-timerList-list-item-interval-${timer._id}`;
                                interval.innerHTML = `Interval: ${timer.durationAmount} ${timer.durationType}(s)`;
                                topContainer.appendChild(interval);
                                const countdown = document.createElement('h1');
                                const distance = nextRun.valueOf() - now.valueOf();
                                countdown.className = "body-section-timerList-list-item-countdown";
                                countdown.id = `body-section-timerList-list-item-countdown-${timer._id}`;
                                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                                if (timer.paused) {
                                    countdown.innerHTML = `Paused`;
                                } else {
                                    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                                };
                                bottomContainer.appendChild(countdown);
                                setInterval(() => {
                                    const current = new Date();
                                    if (current.valueOf() > nextRun.valueOf()) {
                                        nextRun = new Date(current.valueOf() + int);
                                    };
                                    const distance2 = nextRun.valueOf() - current.valueOf();
                                    const days = Math.floor(distance2 / (1000 * 60 * 60 * 24));
                                    const hours = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                    const minutes = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
                                    const seconds = Math.floor((distance2 % (1000 * 60)) / 1000);
                                    if (timer.paused) {
                                        countdown.innerHTML = `Paused`;
                                    } else {
                                        countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                                    };
                                }, 1000);
                                const buttonContainer = document.createElement('div');
                                buttonContainer.className = "body-section-timerList-list-item-buttonContainer";
                                buttonContainer.id = `body-section-timerList-list-item-buttonContainer-${timer._id}`;
                                item.appendChild(buttonContainer);
                                const editButton = document.createElement('button');
                                editButton.className = "body-section-timerList-list-item-button";
                                editButton.id = `body-section-timerList-list-item-button-edit`;
                                editButton.innerHTML = "Edit";
                                buttonContainer.appendChild(editButton);
                                const pauseButton = document.createElement('button');
                                pauseButton.className = "body-section-timerList-list-item-button";
                                pauseButton.id = `body-section-timerList-list-item-button-pause`;
                                if (timer.paused) {
                                    pauseButton.innerHTML = "Unpause";
                                } else {
                                    pauseButton.innerHTML = "Pause";
                                };
                                buttonContainer.appendChild(pauseButton);
                                const deleteButton = document.createElement('button');
                                deleteButton.className = "body-section-timerList-list-item-button";
                                deleteButton.id = `body-section-timerList-list-item-button-delete`;
                                deleteButton.innerHTML = "Delete";
                                buttonContainer.appendChild(deleteButton);
                                editButton.addEventListener('click', () => {
                                    targetPanel = timer._id;
                                    const targetChannel = channels.find(c => c.id === timer.channelId);
                                    nameInput.value = `${timer.name}`;
                                    if (targetChannel) {
                                        channelInput.value = `${targetChannel.name}`;
                                    };
                                    durationTypeInput.value = `${timer.durationType}`;
                                    durationAmountInput.value = timer.durationAmount;
                                    messageInput.innerHTML = `${timer.message}`;
                                });
                                pauseButton.addEventListener('click', () => {
                                    if (pauseButton.innerHTML === 'Pause') {
                                        fetch('https://api.godseyeofficial.xyz/api/guild/timers/pause?' + new URLSearchParams({ guildId: targetGuildId, target: timer._id })).then((result) => {
                                            return result.json();
                                        }).then((response) => {
                                            const { msg } = response;
                                            if (msg !== "Success") {
                                                alert(msg);
                                                return;
                                            };
                                            successPopup();
                                            setTimeout(() => {
                                                createTimers();
                                            }, 2500);
                                        });
                                    } else {
                                        fetch('https://api.godseyeofficial.xyz/api/guild/timers/unpause?' + new URLSearchParams({ guildId: targetGuildId, target: timer._id })).then((result) => {
                                            return result.json();
                                        }).then((response) => {
                                            const { msg } = response;
                                            if (msg !== "Success") {
                                                alert(msg);
                                                return;
                                            };
                                            successPopup();
                                            setTimeout(() => {
                                                createTimers();
                                            }, 2500);
                                        });
                                    };
                                });
                                deleteButton.addEventListener('click', () => {
                                    fetch('https://api.godseyeofficial.xyz/api/guild/timers/delete?' + new URLSearchParams({ guildId: targetGuildId, target: timer._id })).then((result) => {
                                        return result.json();
                                    }).then((response) => {
                                        const { msg } = response;
                                        if (msg !== "Success") {
                                            alert(msg);
                                            return;
                                        };
                                        successPopup();
                                        setTimeout(() => {
                                            createTimers();
                                        }, 2500);
                                    });
                                });
                            });
                        };
                    });
                };
            });
            loaderContainer.style.display = 'none';
            // End of page code
        });
    });
});

