// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const postList = document.getElementById('section-container-posts-section-setup-list-posts');
const gamesList = document.getElementById('section-container-games-section-list');
const tagsList = document.getElementById('section-container-tags-section-list');
const channelsList = document.getElementById('channel-list');
const rolesList = document.getElementById('role-list');
const gameAddButton = document.getElementById('section-container-games-section-setup-button-game');
const tagAddButton = document.getElementById('section-container-tags-section-setup-button-tag');
const gameInput = document.getElementById('section-container-games-section-setup-input-game');
const channelInput = document.getElementById('section-container-games-section-setup-input-channel');
const tagInput = document.getElementById('section-container-tags-section-setup-input-tag');
const roleInput = document.getElementById('section-container-tags-section-setup-input-role');
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
            fetch('https://api.godseyeofficial.xyz/api/guild/lfg/posts?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ posts }) => {
                fetch('https://api.godseyeofficial.xyz/api/guild/avatars?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then(({ avatars }) => {
                    posts.forEach((post) => {
                        const item = document.createElement('li');
                        item.className = "section-container-section-list-item";
                        item.id = `section-container-section-list-item-${post._id}`;
                        postList.appendChild(item);
                        const game = document.createElement('h1');
                        game.className = 'section-container-section-list-item-game';
                        game.id = `section-container-section-list-item-game-${post._id}`;
                        game.innerHTML = `Game: ${post.game.name} Host: ${post.hostName}`;
                        item.appendChild(game);
                        const avatarSection = document.createElement('div');
                        avatarSection.className = 'section-container-section-list-item-section-avatar';
                        avatarSection.id = `section-container-section-list-item-section-avatar-${post._id}`;
                        item.appendChild(avatarSection);
                        const avatar = document.createElement('img');
                        avatar.className = 'section-container-section-list-item-section-avatar-img';
                        avatar.id = `section-container-section-list-item-section-avatar-img-${post._id}`;
                        avatar.src = avatars.find(a => a.id === post.memberId).url;
                        avatarSection.appendChild(avatar);
                        const descriptionTagSection = document.createElement('div');
                        descriptionTagSection.className = "section-container-section-list-item-section-descriptionTag";
                        descriptionTagSection.id = `section-container-section-list-item-section-descriptionTag-${post._id}`;
                        item.appendChild(descriptionTagSection);
                        const description = document.createElement('h1');
                        description.className = 'section-container-section-list-item-section-descriptionTag-description';
                        description.id = `section-container-section-list-item-section-descriptionTag-description-${post._id}`;
                        description.innerHTML = `${post.description}`;
                        descriptionTagSection.appendChild(description);
                        const tagList = document.createElement('ul');
                        tagList.className = 'section-container-section-list-item-section-descriptionTag-tagList';
                        tagList.id = `section-container-section-list-item-section-descriptionTag-tagList-${post._id}`;
                        descriptionTagSection.appendChild(tagList);
                        post.tags.forEach((data) => {
                            const tag = document.createElement('li');
                            tag.className = 'section-container-section-list-item-section-descriptionTag-tagList-item';
                            tag.id = `section-container-section-list-item-section-descriptionTag-tagList-item-${post._id}-${data}`;
                            tag.innerHTML = `${data}`;
                            tagList.appendChild(tag);
                        });
                        const playersSection = document.createElement('div');
                        playersSection.className = 'section-container-section-list-item-section-players';
                        playersSection.id = `section-container-section-list-item-section-players-${post._id}`;
                        item.appendChild(playersSection);
                        const needLabel = document.createElement('h2');
                        needLabel.className = 'section-container-section-list-item-section-players-need-label';
                        needLabel.id = `section-container-section-list-item-section-players-need-label-${post._id}`;
                        needLabel.innerHTML = "Need";
                        playersSection.appendChild(needLabel);
                        const needNumber = document.createElement('h2');
                        needNumber.className = 'section-container-section-list-item-section-players-need-number';
                        needNumber.id = `section-container-section-list-item-section-players-need-number-${post._id}`;
                        needNumber.innerHTML = `${post.need}`;
                        playersSection.appendChild(needNumber);
                        const haveLabel = document.createElement('h2');
                        haveLabel.className = 'section-container-section-list-item-section-players-have-label';
                        haveLabel.id = `section-container-section-list-item-section-players-have-label-${post._id}`;
                        haveLabel.innerHTML = "Have";
                        playersSection.appendChild(haveLabel);
                        const haveNumber = document.createElement('h2');
                        haveNumber.className = 'section-container-section-list-item-section-players-have-number';
                        haveNumber.id = `section-container-section-list-item-section-players-have-number-${post._id}`;
                        haveNumber.innerHTML = `${post.have}`;
                        playersSection.appendChild(haveNumber);
                        const deleteButton = document.createElement('button');
                        deleteButton.className = 'section-container-section-list-item-button-delete';
                        deleteButton.id = `section-container-section-list-item-button-delete-${post._id}`;
                        deleteButton.innerHTML = 'Delete';
                        item.appendChild(deleteButton);
                        deleteButton.addEventListener('click', () => {
                            fetch('https://api.godseyeofficial.xyz/api/guild/lfg/posts/delete?' + new URLSearchParams({ guildId: targetGuildId, postId: post._id })).then((result) => {
                                return result.json();
                            }).then(({ msg }) => {
                                if (msg !== 'Success') {
                                    alert(msg);
                                    return;
                                };
                                window.location.reload();
                            });
                        });
                    });
                });
            });
            fetch('https://api.godseyeofficial.xyz/api/guild/lfg/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ msg, settings }) => {
                if (msg === "Success") {
                    if (settings.games.length > 0) {
                        settings.games.forEach((game) => {
                            const item = document.createElement('li');
                            item.className = 'section-container-section-games-list-item';
                            item.id = `section-container-section-games-list-item-${game.name}`;
                            gamesList.appendChild(item);
                            const name = document.createElement('h2');
                            name.className = 'section-container-section-games-list-item-name';
                            name.id = `section-container-section-games-list-item-name-${game.name}`;
                            name.innerHTML = `${game.name}`;
                            item.appendChild(name);
                            const span = document.createElement('span');
                            span.className = 'section-container-section-games-list-item-span';
                            span.id = `section-container-section-games-list-item-span-${game.name}`;
                            item.appendChild(span);
                            const button = document.createElement('button');
                            button.className = 'section-container-section-games-list-item-span-button';
                            button.id = `section-container-section-games-list-item-span-button-${game.name}`;
                            button.innerHTML = "Delete";
                            span.appendChild(button);
                            button.addEventListener('click', () => {
                                const comfirmation = confirm(`Are you sure you want to delete "${game.name}" from the supported games list?`);
                                if (comfirmation === true) {
                                    fetch('https://api.godseyeofficial.xyz/api/guild/lfg/settings/games/delete?' + new URLSearchParams({ guildId: targetGuildId, game: game.name })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            window.location.reload();
                                        };
                                    });
                                };
                            });
                        });
                    };
                    if (settings.tags.length > 0) {
                        settings.tags.forEach((tag) => {
                            const item = document.createElement('li');
                            item.className = 'section-container-section-tags-list-item';
                            item.id = `section-container-section-tags-list-item-${tag.name}`;
                            tagsList.appendChild(item);
                            const name = document.createElement('h2');
                            name.className = 'section-container-section-tags-list-item-name';
                            name.id = `section-container-section-tags-list-item-name-${tag.name}`;
                            name.innerHTML = `${tag.name}`;
                            item.appendChild(name);
                            const span = document.createElement('span');
                            span.className = 'section-container-section-tags-list-item-span';
                            span.id = `section-container-section-tags-list-item-span-${tag.name}`;
                            item.appendChild(span);
                            const button = document.createElement('button');
                            button.className = 'section-container-section-tags-list-item-span-button';
                            button.id = `section-container-section-tags-list-item-span-button-${tag.name}`;
                            button.innerHTML = "Delete";
                            span.appendChild(button);
                            button.addEventListener('click', () => {
                                const comfirmation = confirm(`Are you sure you want to delete "${tag.name}" from the post tags list?`);
                                if (comfirmation === true) {
                                    fetch('https://api.godseyeofficial.xyz/api/guild/lfg/settings/tags/delete?' + new URLSearchParams({ guildId: targetGuildId, tag: tag.name })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            window.location.reload();
                                        };
                                    });
                                };
                            });
                        });
                    };
                };
            });
            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ msg, channels }) => {
                if (msg === 'Success') {
                    channels.forEach((channel) => {
                        const option = document.createElement('option');
                        option.innerHTML = `${channel.name}`;
                        channelsList.appendChild(option);
                    });
                };
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/roles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then(({ msg, roles }) => {
                    if (msg === 'Success') {
                        roles.forEach((role) => {
                            const option = document.createElement('option');
                            option.innerHTML = `${role.name}`;
                            rolesList.appendChild(option);
                        });
                    };

                    gameAddButton.addEventListener('click', () => {
                        if (gameInput.value.length < 1) {
                            alert('You must provide a game!');
                            return;
                        };
                        if (channelInput.value.length < 1) {
                            alert('You must provide a channel!');
                            return;
                        };
                        const targetChannel = channels.find(c => c.name.toLowerCase() == channelInput.value.toLowerCase());
                        if (!targetChannel) {
                            alert('That channel could not be found!');
                            return;
                        };
                        fetch('https://api.godseyeofficial.xyz/api/guild/lfg/settings/games/add?' + new URLSearchParams({ guildId: targetGuildId, game: gameInput.value, channelId: targetChannel.id })).then((result) => {
                            return result.json();
                        }).then(({ msg }) => {
                            if (msg !== 'Success') {
                                alert(msg);
                                return;
                            };
                            window.location.reload();
                        });
                    });
                    tagAddButton.addEventListener('click', () => {
                        if (tagInput.value.length < 1) {
                            alert('You must provide a tag!');
                            return;
                        };
                        if (roleInput.value.length > 0) {
                            const targetRole = roles.find(c => c.name.toLowerCase() == roleInput.value.toLowerCase());
                            if (!targetRole) {
                                alert('That role could not be found!');
                                return;
                            };
                            fetch('https://api.godseyeofficial.xyz/api/guild/lfg/settings/tags/add?' + new URLSearchParams({ guildId: targetGuildId, tag: tagInput.value, roleId: targetRole.id })).then((result) => {
                                return result.json();
                            }).then(({ msg }) => {
                                if (msg !== 'Success') {
                                    alert(msg);
                                    return;
                                };
                                window.location.reload();
                            });
                        } else {
                            fetch('https://api.godseyeofficial.xyz/api/guild/lfg/settings/tags/add?' + new URLSearchParams({ guildId: targetGuildId, tag: tagInput.value, roleId: 'none' })).then((result) => {
                                return result.json();
                            }).then(({ msg }) => {
                                if (msg !== 'Success') {
                                    alert(msg);
                                    return;
                                };
                                window.location.reload();
                            });
                        };
                    });
                });
            });
            loaderContainer.style.display = 'none';
            // End of page code
        });
    });
});

// Functions