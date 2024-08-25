// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const channelList = document.getElementById('channel-list');
const saveButton = document.getElementById('body-section-row-button-save');
const channelInput = document.getElementById('body-section-row-input-channel');
const suggestionList = document.getElementById('body-section-list-suggestions');
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
                if (msg === 'Success') {
                    channels.forEach((channel) => {
                        const option = document.createElement('option');
                        option.innerHTML = `${channel.name}`;
                        channelList.appendChild(option);
                    });
                };
                createSuggestions();
                saveButton.addEventListener('click', () => {
                    if (!channelInput.value) {
                        alert('Provide a Channel.');
                        return
                    };
                    const targetChannel = channels.find(c => c.name.toLowerCase() === channelInput.value.toLowerCase());
                    if (!targetChannel) {
                        alert('The channel provided does not exist, please check spelling.');
                        return
                    };
                    fetch('https://api.godseyeofficial.xyz/api/guild/suggestions/channel/save?' + new URLSearchParams({ guildId: targetGuildId, channelId: targetChannel.id })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg === 'Success') {
                            successPopup();
                        };
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

                function createSuggestions() {
                    fetch('https://api.godseyeofficial.xyz/api/guild/suggestions?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ msg, suggestions, channelId }) => {
                        if (msg === 'Success') {
                            const targetChannel = channels.find(c => c.id === channelId);
                            if (targetChannel) {
                                channelInput.value = targetChannel.name;
                            };
                            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/members?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then(({ msg, members }) => {
                                if (msg === 'Success') {
                                    suggestionList.innerHTML = '';
                                    suggestions.forEach((suggestion) => {
                                        const targetMember = members.find(m => m.id === suggestion.authorId);
                                        const item = document.createElement('li');
                                        item.className = 'body-section-list-item';
                                        suggestionList.appendChild(item);
                                        const nameRow = document.createElement('div');
                                        nameRow.className = 'body-section-list-item-nameRow';
                                        item.appendChild(nameRow);
                                        const nameRowText = document.createElement('h1');
                                        nameRowText.className = 'body-section-list-item-nameRow-text';
                                        if (targetMember) {
                                            nameRowText.innerHTML = `Member: ${targetMember.name}`;
                                        } else {
                                            nameRowText.innerHTML = `Member: ${suggestion.authorId}`;
                                        };
                                        nameRow.appendChild(nameRowText);
                                        const descriptRow = document.createElement('div');
                                        descriptRow.className = 'body-section-list-item-descriptRow';
                                        item.appendChild(descriptRow);
                                        const descriptRowText = document.createElement('p');
                                        descriptRowText.className = 'body-section-list-item-descriptRow-text';
                                        descriptRowText.innerHTML = `Suggestion: ${suggestion.suggestion}`;
                                        descriptRow.appendChild(descriptRowText);
                                        const votesColumn = document.createElement('div');
                                        votesColumn.className = 'body-section-list-item-votesColumn';
                                        item.appendChild(votesColumn);
                                        const upvotesLabel = document.createElement('h1');
                                        upvotesLabel.className = 'body-section-list-item-votesColumn-upvotesLabel';
                                        upvotesLabel.innerHTML = 'Yes';
                                        votesColumn.appendChild(upvotesLabel);
                                        const upvotesNum = document.createElement('h1');
                                        upvotesNum.className = 'body-section-list-item-votesColumn-upvotesNum';
                                        upvotesNum.innerHTML = `${suggestion.upVote.length.toLocaleString()}`;
                                        votesColumn.appendChild(upvotesNum);
                                        const downvotesLabel = document.createElement('h1');
                                        downvotesLabel.className = 'body-section-list-item-votesColumn-downvotesLabel';
                                        downvotesLabel.innerHTML = 'No';
                                        votesColumn.appendChild(downvotesLabel);
                                        const downvotesNum = document.createElement('h1');
                                        downvotesNum.className = 'body-section-list-item-votesColumn-downvotesNum';
                                        downvotesNum.innerHTML = `${suggestion.downVote.length.toLocaleString()}`;
                                        votesColumn.appendChild(downvotesNum);
                                        const actionRow = document.createElement('div');
                                        actionRow.className = 'body-section-list-item-actionRow';
                                        item.appendChild(actionRow);
                                        const statusLabelContainer = document.createElement('div');
                                        statusLabelContainer.className = 'body-section-list-item-actionRow-statusLabelContainer';
                                        actionRow.appendChild(statusLabelContainer);
                                        const statusLabel = document.createElement('h1');
                                        statusLabel.className = 'body-section-list-item-actionRow-statusLabelContainer-statusLabel';
                                        statusLabel.innerHTML = 'Status: ';
                                        statusLabelContainer.appendChild(statusLabel);
                                        const statusContainer = document.createElement('div');
                                        statusContainer.className = 'body-section-list-item-actionRow-statusContainer';
                                        actionRow.appendChild(statusContainer);
                                        const slider = document.createElement('span');
                                        slider.className = 'body-section-list-item-actionRow-statusContainer-slider';
                                        statusContainer.appendChild(slider);
                                        const sliderText = document.createElement('h2');
                                        sliderText.className = `body-section-list-item-actionRow-statusContainer-slider-text`;
                                        slider.appendChild(sliderText);
                                        if (suggestion.status === false) {
                                            slider.style.justifyContent = 'left';
                                            sliderText.innerHTML = 'Inactive';
                                        } else {
                                            slider.style.left = '-2%';
                                            statusContainer.style.justifyContent = 'right';
                                            slider.style.backgroundColor = 'var(--geGreen)';
                                            sliderText.style.color = 'black';
                                            sliderText.innerHTML = 'Active';
                                        };
                                        slider.style.justifyContent = 'center';
                                        const approveButton = document.createElement('button');
                                        approveButton.className = 'body-section-list-item-actionRow-approveButton';
                                        approveButton.innerHTML = 'Approve';
                                        actionRow.appendChild(approveButton);
                                        const rejectButton = document.createElement('button');
                                        rejectButton.className = 'body-section-list-item-actionRow-rejectButton';
                                        rejectButton.innerHTML = 'Reject';
                                        actionRow.appendChild(rejectButton);
                                        const closeButton = document.createElement('button');
                                        closeButton.className = 'body-section-list-item-actionRow-closeButton';
                                        closeButton.innerHTML = 'Close';
                                        actionRow.appendChild(closeButton);
                                        statusContainer.addEventListener('click', () => {
                                            let status;
                                            if (suggestion.status === true) {
                                                status = 'false';
                                            } else {
                                                status = 'true';
                                            };
                                            fetch('https://api.godseyeofficial.xyz/api/guild/suggestions/status/update?' + new URLSearchParams({ guildId: targetGuildId, messageId: suggestion.messageId, status: status })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg !== 'Success') {
                                                    alert('The channel was not found and since this suggestion cannot be found it will be deleted on our end. Please refresh to see current suggestions.');
                                                    return;
                                                };
                                                successPopup();
                                                setTimeout(() => {
                                                    createSuggestions();
                                                }, 2500);
                                                if (status === false) {
                                                    slider.style.justifyContent = 'left';
                                                    sliderText.innerHTML = 'Inactive';
                                                } else {
                                                    slider.style.left = '-2%';
                                                    statusContainer.style.justifyContent = 'right';
                                                    slider.style.backgroundColor = 'var(--geGreen)';
                                                    sliderText.style.color = 'black';
                                                    sliderText.innerHTML = 'Active';
                                                };
                                            });
                                        });
                                        approveButton.addEventListener('click', () => {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/suggestions/approve?' + new URLSearchParams({ guildId: targetGuildId, messageId: suggestion.messageId, admin: id })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg !== 'Success') {
                                                    alert('The channel was not found and since this suggestion cannot be found it will be deleted on our end. Please refresh to see current suggestions.');
                                                    return;
                                                };
                                                successPopup();
                                                setTimeout(() => {
                                                    createSuggestions();
                                                }, 2500);
                                            });
                                        })
                                        rejectButton.addEventListener('click', () => {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/suggestions/reject?' + new URLSearchParams({ guildId: targetGuildId, messageId: suggestion.messageId, admin: id })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg !== 'Success') {
                                                    alert('The channel was not found and since this suggestion cannot be found it will be deleted on our end. Please refresh to see current suggestions.');
                                                    return;
                                                };
                                                successPopup();
                                                setTimeout(() => {
                                                    createSuggestions();
                                                }, 2500);
                                            });
                                        });
                                        closeButton.addEventListener('click', () => {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/suggestions/close?' + new URLSearchParams({ guildId: targetGuildId, messageId: suggestion.messageId, admin: id })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg !== 'Success') {
                                                    alert('The channel was not found and since this suggestion cannot be found it will be deleted on our end.');
                                                    return;
                                                };
                                                successPopup();
                                                setTimeout(() => {
                                                    createSuggestions();
                                                }, 2500);
                                            });
                                        });
                                    });
                                }
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

