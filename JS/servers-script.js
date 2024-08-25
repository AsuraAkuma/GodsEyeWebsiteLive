// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const serverContainer = document.getElementById('body-server-list');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');

// Page load event listener
window.addEventListener('load', () => {
    // Code to execute once page is loaded
    // Dropdown menu events
    loaderContainer.style.display = 'none';
    profileButton.addEventListener('click', () => {
        dropdownMenuCover.style.display = 'block';
        dropdownMenuCover.style.animation = 'headerDropdownCoverAppear .2s linear';
        serverContainer.style.animation = 'headerDropdownMenuBodyBlurOn .2s linear';
        dropdownMenuContainer.style.animation = 'headerDropdownMenuContainerAppear .2s linear';
        setTimeout(() => {
            dropdownMenuCover.style.display = 'block';
            serverContainer.style.filter = 'blur(5px)';
            dropdownMenuContainer.style.display = 'flex';
        }, 200);
    });
    dropdownMenuCloseButton.addEventListener('click', () => {
        dropdownMenuCover.style.animation = 'headerDropdownCoverDisappear .2s linear';
        serverContainer.style.animation = 'headerDropdownMenuBodyBlurOff .2s linear';
        dropdownMenuContainer.style.animation = 'headerDropdownMenuContainerDisappear .2s linear';
        setTimeout(() => {
            dropdownMenuCover.style.display = 'none';
            serverContainer.style.filter = '';
            dropdownMenuContainer.style.display = 'none';
        }, 200);
    });
    // Server card creation
    // Get fragment for access token and token type
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
            }
        })
    }

    // fetch user data from discord api using accessToken and tokenType
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    }).then((result) => {
        return result.json()
    }).then((response) => {
        // user data variables
        const { id, username, discriminator, avatar, email, banner_color, mfa_enabled, verified, locale } = response;
        fetch('https://api.godseyeofficial.xyz/api/user/create?' + new URLSearchParams({ id: id, username: username, discriminator: discriminator, avatar: avatar, email: email, bannerColor: banner_color, mfaEnabled: mfa_enabled, verified: verified, locale: locale })).then((result) => {
            return result.json();
        })
        // get avatar data from gods eye api
        fetch('https://api.godseyeofficial.xyz/api/user/avatar?' + new URLSearchParams({ userId: id })).then((result) => {
            return result.json();
        }).then((response) => {
            if (response.msg === 'Success') {
                // set header profile image as the user's avatar
                const img = document.getElementById('header-profile-icon');
                img.src = response.avatar;
                // img.style.height = '80%';
            }
            // get user server data via discord api
            fetch('https://discord.com/api/users/@me/guilds', {
                headers: {
                    authorization: `${tokenType} ${accessToken}`
                }
            }).then((result) => {
                return result.json();
            }).then((memberGuilds) => {
                fetch('https://api.godseyeofficial.xyz/api/client/guilds?' + new URLSearchParams({ userId: id, tokenType: tokenType, accessToken: accessToken })).then((result) => {
                    return result.json();
                }).then((clientGuilds) => {
                    clientGuilds.forEach((guild) => {
                        createGuild(guild);
                    });
                    function createGuild(targetGuild) {
                        //build list item element for guild-card-list-item
                        const guildCardList = document.getElementById('body-server-list');
                        const newElement1 = document.createElement('li');
                        newElement1.className = 'body-server-list-item';
                        newElement1.id = `guild-${targetGuild.id}`;
                        guildCardList.appendChild(newElement1);
                        // build img element for background
                        const newElement7 = document.createElement('img');
                        newElement7.className = 'guild-card-background';
                        newElement7.id = `guild-card-background-${targetGuild.id}`;
                        newElement1.appendChild(newElement7);
                        // build div element for background gradient
                        const newElement8 = document.createElement('div');
                        newElement8.className = 'guild-card-background-gradient';
                        newElement8.id = `guild-card-background-gradient-${targetGuild.id}`;
                        newElement1.appendChild(newElement8);
                        //build div element for guild-card
                        const newElement2 = document.createElement('div');
                        newElement2.className = 'guild-card';
                        newElement2.id = `guild-card-${targetGuild.id}`;
                        newElement1.appendChild(newElement2);
                        //build h1 element for guild-card-h1
                        const newElement3 = document.createElement('h1');
                        newElement3.className = 'guild-card-h1';
                        newElement3.id = `guild-card-h1-${targetGuild.id}`;
                        newElement3.innerHTML = `${targetGuild.name}`
                        newElement2.appendChild(newElement3);
                        //build img element for guild-card-avatar
                        const newElement4 = document.createElement('img');
                        newElement4.className = 'guild-card-avatar';
                        newElement4.id = `guild-card-avatar-${targetGuild.id}`;
                        if (targetGuild.icon === null) {
                            newElement4.src = `../images/discord logo.png`;
                        } else {
                            if (targetGuild.icon.startsWith("a_")) {
                                newElement7.src = `https://cdn.discordapp.com/icons/${targetGuild.id}/${targetGuild.icon}.gif`
                                newElement4.src = `https://cdn.discordapp.com/icons/${targetGuild.id}/${targetGuild.icon}.gif`
                            } else {
                                newElement7.src = `https://cdn.discordapp.com/icons/${targetGuild.id}/${targetGuild.icon}`
                                newElement4.src = `https://cdn.discordapp.com/icons/${targetGuild.id}/${targetGuild.icon}`
                            };
                        };
                        newElement2.appendChild(newElement4);
                        //build h2 element for guild-card-owner
                        const newElement5 = document.createElement('h2');
                        newElement5.className = 'guild-card-owner';
                        newElement5.id = `guild-card-owner-${targetGuild.id}`;
                        if (targetGuild.owner === true) {
                            newElement5.innerHTML = `Owner: ✔`;
                            newElement5.style.color = '#00ff00';
                        } else {
                            newElement5.innerHTML = `Owner: ❌`;
                            newElement5.style.color = 'red';
                        };
                        newElement2.appendChild(newElement5);
                        //build button element for guild-card-button
                        const newElement6 = document.createElement('button');
                        newElement6.className = 'guild-card-button';
                        newElement6.id = `guild-card-button-${targetGuild.id}`;
                        if (targetGuild.bot === true) {
                            newElement6.innerHTML = 'Manage';
                            newElement6.addEventListener('click', () => {
                                if (window.location.origin.includes("http://127.0.0.1:3000")) {
                                    window.location.href = `${window.location.origin}/guild/dashboard.html#token_type=${tokenType}&access_token=${accessToken}&geid=${targetGuild.id}`;
                                } else {
                                    window.location.href = `${window.location.origin}/guild/dashboard#token_type=${tokenType}&access_token=${accessToken}&geid=${targetGuild.id}`;
                                };
                            });
                        } else {
                            newElement6.innerHTML = 'Invite Me';
                            newElement6.addEventListener('click', () => {
                                window.location.href = `https://discord.com/api/oauth2/authorize?client_id=1059540116021981224&permissions=8&scope=bot%20applications.commands`;
                            })
                        }
                        newElement2.appendChild(newElement6);
                    }
                });
            })
        });
    });
});

// Functions