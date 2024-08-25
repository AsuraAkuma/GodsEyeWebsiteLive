// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const channelList = document.getElementById('channel-list');
const channelInput = document.getElementById('filter-container-input-channel');
const saveButton = document.getElementById('birthday-channel-container-button-save');
const birthdayList = document.getElementById('birthday-container-list');
const memberSearchInput = document.getElementById('filter-container-input-memberSearch');
const dateSearchInput = document.getElementById('filter-container-input-dateSearch');
const monthSearchInput = document.getElementById('filter-container-input-monthSearch');
const memberList = document.getElementById('member-list');

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
            }).then(({ msg, channels }) => {
                channels.forEach((channel) => {
                    const option = document.createElement('option');
                    option.innerHTML = channel.name;
                    channelList.appendChild(option);
                });
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/members?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then(({ msg, members }) => {
                    members.forEach((member) => {
                        const option = document.createElement('option');
                        option.innerHTML = member.name;
                        memberList.appendChild(option);
                    });
                    fetch('https://api.godseyeofficial.xyz/api/guild/birthdays?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ msg, birthdays }) => {
                        if (msg === "Success") {
                            const bdayArr = birthdays.sort((a, b) => a.info.date.timestamp - b.info.date.timestamp);
                            createBirthdays(bdayArr);
                        };
                        memberSearchInput.addEventListener('change', () => {
                            if (memberSearchInput.value) {
                                return;
                            };
                            const bdayArr = birthdays.sort((a, b) => a.info.date.timestamp - b.info.date.timestamp);
                            createBirthdays(bdayArr);
                        });
                        memberSearchInput.addEventListener('keypress', ({ key }) => {
                            if (key !== "Enter") {
                                return;
                            };
                            if (!memberSearchInput.value) {
                                return;
                            };
                            const targetMember = members.find(m => m.name.toLowerCase() === memberSearchInput.value.toLowerCase());
                            if (!targetMember) {
                                return;
                            };
                            const bdayArr2 = birthdays.filter(a => a.info.memberId === targetMember.id);
                            createBirthdays(bdayArr2);
                        });
                        dateSearchInput.addEventListener('change', () => {
                            if (dateSearchInput.value) {
                                return;
                            };
                            const bdayArr = birthdays.sort((a, b) => a.info.date.timestamp - b.info.date.timestamp);
                            createBirthdays(bdayArr);
                        });
                        dateSearchInput.addEventListener('keypress', ({ key }) => {
                            if (key !== "Enter") {
                                return;
                            };
                            if (!dateSearchInput.value) {
                                return;
                            };
                            const split = dateSearchInput.value.split("-");
                            const day = parseInt(split[2]);
                            const month = parseInt(split[1]);
                            const year = parseInt(split[0]);

                            const bdayArr2 = birthdays.filter(a => a.info.date.string === `${day}/${month}/${year}`);
                            createBirthdays(bdayArr2);
                        });
                        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
                        monthSearchInput.addEventListener('change', () => {
                            if (monthSearchInput.value) {
                                return;
                            };
                            const bdayArr = birthdays.sort((a, b) => a.info.date.timestamp - b.info.date.timestamp);
                            createBirthdays(bdayArr);
                        });
                        monthSearchInput.addEventListener('keypress', ({ key }) => {
                            if (key !== "Enter") {
                                return;
                            };
                            if (!monthSearchInput.value) {
                                return;
                            };
                            const bdayArr2 = birthdays.filter(a => a.info.date.month === (months.indexOf(monthSearchInput.value.toLowerCase()) + 1));
                            createBirthdays(bdayArr2);
                        });
                    });
                    setChannel();
                    saveButton.addEventListener('click', () => {
                        if (!channelInput.value) {
                            alert('You must provide a channel!');
                            return;
                        };
                        if (!channels.find(c => c.name.toLowerCase() === channelInput.value.toLowerCase())) {
                            alert('This channel was not found, please check your spelling!');
                            return;
                        };
                        const targetChannel = channels.find(c => c.name.toLowerCase() === channelInput.value.toLowerCase());
                        fetch('https://api.godseyeofficial.xyz/api/guild/birthdays/channel/save?' + new URLSearchParams({ guildId: targetGuildId, channelId: targetChannel.id })).then((result) => {
                            return result.json();
                        }).then(({ msg }) => {
                            if (msg === 'Success') {
                                successPopup();
                                setTimeout(() => {
                                    setChannel();
                                }, 2500);
                            };
                        });

                    });
                    function createBirthdays(birthdayInfo) {
                        birthdayList.innerHTML = "";
                        birthdayInfo.forEach((birthday) => {
                            const targetMember = members.find(m => m.id === birthday.info.memberId);
                            const item = document.createElement('li');
                            item.className = "birthday-container-list-item";
                            birthdayList.appendChild(item);
                            const center1 = document.createElement('div');
                            center1.className = "center-vert birthday-container-list-item-center1";
                            item.appendChild(center1);
                            const date = document.createElement('h2');
                            date.className = "birthday-container-list-item-date";
                            date.innerHTML = birthday.info.date.string;
                            center1.appendChild(date);
                            const center2 = document.createElement('div');
                            center2.className = "center-vert birthday-container-list-item-center2";
                            item.appendChild(center2);
                            const name = document.createElement('h2');
                            name.className = "birthday-container-list-item-name";
                            if (targetMember) {
                                name.innerHTML = targetMember.name;
                            } else {
                                name.innerHTML = 'Unknown Member';
                            };
                            center2.appendChild(name);
                            const center3 = document.createElement('div');
                            center3.className = "center-vert birthday-container-list-item-center3";
                            item.appendChild(center3);
                            const announce = document.createElement('h2');
                            announce.className = "birthday-container-list-item-announce";
                            announce.innerHTML = `Announce: ${birthday.info.announced.allowed}`;
                            center3.appendChild(announce);
                            const center4 = document.createElement('div');
                            center4.className = "center-vert birthday-container-list-item-center4";
                            item.appendChild(center4);
                            const sayAge = document.createElement('h2');
                            sayAge.className = "birthday-container-list-item-sayAge";
                            sayAge.innerHTML = `Say Age: ${birthday.info.announced.options.sayAge}`;
                            center4.appendChild(sayAge);
                            const center5 = document.createElement('div');
                            center5.className = "center-vert birthday-container-list-item-center5";
                            item.appendChild(center5);
                            const gift = document.createElement('h2');
                            gift.className = "birthday-container-list-item-gift";
                            gift.innerHTML = `Gifting: ${birthday.info.gift.allowed}`;
                            center5.appendChild(gift);
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

                function setChannel() {
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then((settings) => {
                        if (settings) {
                            if (settings.birthdayChannel) {
                                const targetChannel = channels.find(c => c.id === settings.birthdayChannel);
                                channelInput.value = targetChannel.name;
                            };
                        };
                    });
                }
            });
            loaderContainer.style.display = 'none';
            // End of page code
        });
    });
});

