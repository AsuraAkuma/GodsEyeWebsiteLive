// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
let moduleStatus = [];
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
    // Side menu button
    const sideMenuButton = document.getElementById('side-menu-toggle');
    const sideMenuArrow = document.getElementById('side-menu-toggle-arrow')
    const sideMenu = document.getElementById('body-side-menu');
    let toggle = false;
    sideMenuButton.addEventListener('click', () => {
        toggle = (toggle !== true);
        if (toggle === true) {
            sideMenu.style.left = "0%";
            sideMenuButton.style.left = "75%";
            sideMenuArrow.style.transform = "rotate(90deg)";
        } else {
            sideMenu.style.left = "-75%";
            sideMenuButton.style.left = "0%";
            sideMenuArrow.style.transform = "rotate(-90deg)";
        };
    });
    window.addEventListener('resize', () => {
        if (bodyContainer.clientWidth > 700) {
            sideMenu.style.left = "0%";
            sideMenuButton.style.left = "0%";
            sideMenuArrow.style.transform = "rotate(-90deg)";
            toggle = false;
        } else {
            sideMenu.style.left = "-75%";
            sideMenuButton.style.left = "0%";
            sideMenuArrow.style.transform = "rotate(-90deg)";
            toggle = false;
        };
    });
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
            // construct server selection list
            const serverSelection = document.getElementById('body-side-menu-section-guild-selector');
            const downArrow = document.getElementById('body-side-menu-guild-selector-arrow-down');
            const serverArr = new Array();
            const serverArr2 = new Array();
            const listContainer = document.getElementById('body-side-menu-guild-selector-guilds');
            if (guilds) {
                guilds.forEach((guild) => {
                    serverArr2.push(guild.id);
                });
            } else {
                window.location.reload();
            };
            // fetch user guild data
            fetch('https://api.godseyeofficial.xyz/api/guild/icons?' + new URLSearchParams({ guildIds: serverArr2.join("-") })).then((result) => {
                return result.json();
            }).then((iconList) => {
                fetch('https://api.godseyeofficial.xyz/api/client/guilds?' + new URLSearchParams({ userId: id, tokenType: tokenType, accessToken: accessToken })).then((result) => {
                    return result.json();
                }).then((clientGuilds) => {
                    if (clientGuilds) {
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                            return result.json();
                        }).then((guildResponse) => {
                            fetch('https://api.godseyeofficial.xyz/api/guild/icon?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then((response) => {
                                const serverSelectionIcon = document.getElementById('body-side-menu-guild-selector-icon');
                                if (response.icon === null) {
                                    serverSelectionIcon.src = `../images/discord logo.png`;
                                } else {
                                    serverSelectionIcon.src = response.icon;
                                };
                            });
                            document.getElementById('body-side-menu-guild-selector-guild-name').innerHTML = `${guildResponse.guild.name}`;
                            document.title = `${guildResponse.guild.name}: Dashboard`

                            serverSelection.addEventListener('click', () => {
                                const rotation = downArrow.style.transform
                                const section = document.getElementById('body-side-menu-section-module-selection');
                                const guildListDiv = document.getElementById('body-side-menu-guild-selector-guilds');
                                if (rotation === '' || rotation === 'rotate(45deg)') {
                                    listContainer.style.animation = 'guildSelectorAppear .2s linear';
                                    setTimeout(() => {
                                        listContainer.style.display = 'block';
                                    }, 200);
                                    downArrow.style.transform = 'rotate(-135deg)';
                                    const list = document.getElementById('body-side-menu-guild-selector-guilds-list');
                                    function createServerList(servers) {
                                        if (serverArr.length > 0) {
                                            list.innerHTML = ''
                                            serverArr.splice(0);
                                        };
                                        servers.forEach((server) => {
                                            const targetServer = clientGuilds.find(s => s.id === server.id);
                                            console.log(targetServer)
                                            if (targetServer.bot === true) {
                                                const res = iconList.icons.find(i => i.guildId === targetServer.id);
                                                serverArr.push(server.id);
                                                const newItem = document.createElement('li');
                                                newItem.className = 'body-side-menu-guild-selector-guilds-list-item';
                                                newItem.id = `body-side-menu-guild-selector-guilds-list-item-${server.id}`;
                                                list.insertBefore(newItem, list.firstChild);
                                                const newImg = document.createElement('img');
                                                newImg.className = 'body-side-menu-guild-selector-guilds-list-item-icon';
                                                newImg.id = `body-side-menu-guild-selector-guilds-list-item-icon-${server.id}`;
                                                if (server.icon === null) {
                                                    newImg.src = `../images/discord logo.png`;
                                                } else {
                                                    if (server.icon.startsWith("a_")) {
                                                        newImg.src = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.gif`;
                                                    } else {
                                                        newImg.src = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}`;
                                                    };
                                                };
                                                newItem.appendChild(newImg);
                                                const center1 = document.createElement('div');
                                                center1.className = 'center-vert body-side-menu-guild-selector-guilds-list-item-guild-name-center';
                                                newItem.appendChild(center1);
                                                const newH1 = document.createElement('h1');
                                                newH1.className = 'body-side-menu-guild-selector-guilds-list-item-guild-name';
                                                newH1.id = `body-side-menu-guild-selector-guilds-list-item-guild-name-${server.id}`;
                                                newH1.innerHTML = `${server.name}`;
                                                center1.appendChild(newH1);
                                                newItem.addEventListener('click', () => {
                                                    const serverSelectionH1 = document.getElementById('body-side-menu-guild-selector-guild-name');
                                                    serverSelectionH1.innerHTML = `${server.name}`;
                                                    const serverSelectionIcon = document.getElementById('body-side-menu-guild-selector-icon');
                                                    if (res) {
                                                        if (res.url === null) {
                                                            serverSelectionIcon.src = `../images/discord logo.png`;
                                                        } else {
                                                            serverSelectionIcon.src = res.url;
                                                        };
                                                    };
                                                    if (window.location.origin.includes("http://127.0.0.1:3000")) {
                                                        window.location.href = `${window.location.origin}/guild/dashboard.html#token_type=${tokenType}&access_token=${accessToken}&geid=${server.id}`;
                                                    } else {
                                                        window.location.href = `${window.location.origin}/guild/dashboard#token_type=${tokenType}&access_token=${accessToken}&geid=${server.id}`;
                                                    };
                                                    location.reload();
                                                });
                                            }
                                        });
                                    };
                                    createServerList(clientGuilds);
                                } else {
                                    // section.style.top = ``;
                                    listContainer.style.animation = 'guildSelectorDisappear .2s linear';
                                    setTimeout(() => {
                                        listContainer.style.display = 'none';
                                    }, 200);
                                    downArrow.style.transform = 'rotate(45deg)';
                                    const list = document.getElementById('body-side-menu-guild-selector-guilds-list');
                                    if (serverArr.length > 0) {
                                        serverArr.forEach(() => {
                                            list.firstChild.remove();
                                        });
                                        serverArr.splice(0);
                                    };
                                };
                            });
                        });
                        // Side menu category click event handling
                        const serverManagementCategory = document.getElementById('body-side-menu-section-module-selection-secondary-list-item-server-management');
                        // const monetizationCategory = document.getElementById('body-side-menu-section-module-selection-secondary-list-item-monetization');
                        const utilitiesCategory = document.getElementById('body-side-menu-section-module-selection-secondary-list-item-utilities');
                        // const connectionsCategory = document.getElementById('body-side-menu-section-module-selection-secondary-list-item-connections');
                        const engagementCategory = document.getElementById('body-side-menu-section-module-selection-secondary-list-item-engagement');
                        const categories = new Array();
                        categories.push(serverManagementCategory, utilitiesCategory, engagementCategory);
                        // console.log(serverManagementCategory.id.split("-").slice(9).join("-"))
                        // return
                        categories.forEach((category) => {
                            category.addEventListener('click', () => {
                                const item = document.getElementById(`${category.id}-inner`);
                                const list = document.getElementById(`body-side-menu-section-module-selection-secondary-list-item-list-${category.id.split("-").slice(9).join("-")}`)
                                const searchWords = category.id.split("-").slice(9);
                                const searchTerm = new Array();
                                searchWords.forEach((word) => {
                                    const firstLetter = word.split("")[0].toUpperCase();
                                    const latterLetters = word.split("").slice(1);
                                    searchTerm.push(`${firstLetter}${latterLetters.join("")}`);
                                });
                                const finalTerm = searchTerm.join("");
                                if (item.style.display === '' || item.style.display === 'none') {
                                    item.style.animation = `sideMenu${finalTerm}Open .2s linear`;
                                    list.style.animation = `sideMenu${finalTerm}Open .2s linear`;
                                    setTimeout(() => {
                                        item.style.display = 'block';
                                    }, 200);
                                } else {
                                    item.style.animation = `sideMenu${finalTerm}Close .2s linear`;
                                    list.style.animation = `sideMenu${finalTerm}Close .2s linear`;
                                    setTimeout(() => {
                                        item.style.display = 'none';
                                    }, 200);
                                };
                            });
                        });
                        // Side menu page click event handling
                        const mainPages = ['dashboard', 'rankboard', 'premium'];
                        // const secondaryPages = ['welcome', 'custom-commands', 'button-roles', 'moderation', 'invite-tracker', 'gateway', 'ticket-system', 'vip-tiers', 'embeds', 'timers', 'stats', 'temp-channels', 'lfg', 'polls', 'suggestions', 'twitch', 'youtube', 'twitter', 'instagram', 'reddit', 'ranks', 'birthdays', 'economy', 'giveaways', 'misc'];
                        const secondaryPages = ['welcome', 'custom-commands', 'button-roles', 'moderation', 'invite-tracker', 'gateway', 'ticket-system', 'embeds', 'timers', 'stats', 'temp-channels', 'lfg', 'polls', 'suggestions', 'ranks', 'birthdays', 'economy', 'giveaways'];

                        mainPages.forEach((pageName) => {
                            const item = document.getElementById(`body-side-menu-section-module-selection-main-list-item-${pageName}`);
                            item.addEventListener('click', () => {
                                if (window.location.origin.includes("http://127.0.0.1:3000")) {
                                    window.location.pathname = `guild/${pageName}.html`;
                                } else {
                                    window.location.pathname = `guild/${pageName}`;
                                };
                            });
                        });
                        secondaryPages.forEach((pageName) => {
                            const item = document.getElementById(`body-side-menu-section-module-selection-secondary-list-item-list-item-${pageName}`);
                            item.addEventListener('click', () => {
                                if (window.location.origin.includes("http://127.0.0.1:3000")) {
                                    window.location.pathname = `guild/${pageName}.html`;
                                } else {
                                    window.location.pathname = `guild/${pageName}`;
                                };
                            });
                        });
                        // Section creation
                        // const monetizationSection = {
                        //     feName: 'Monetization',
                        //     beName: 'monetization',
                        //     children: [
                        //         {
                        //             feName: "Vip Tiers",
                        //             beName: "vipTiers",
                        //             description: 'Awesome paid tiers you can offer to your members.',
                        //             image: 'vip tiers.svg'
                        //         }
                        //     ]
                        // }
                        const serverManagementSection = {
                            feName: 'Server Management',
                            beName: 'serverManagement',
                            children: [
                                {
                                    feName: "Welcome",
                                    beName: "welcome",
                                    description: 'Give a warm welcome to new members joining your server.',
                                    image: 'welcome icon.svg'
                                },
                                {
                                    feName: "Custom Commands",
                                    beName: "customCommands",
                                    description: 'Setup commands tailored by you for you and your members.',
                                    image: 'custom commands icon.svg'
                                },
                                {
                                    feName: "Button Roles",
                                    beName: "buttonRoles",
                                    description: 'Allow your members to pick their own path with roles.',
                                    image: 'button role icon.svg'
                                },
                                {
                                    feName: "Moderation",
                                    beName: "moderation",
                                    description: 'Harness your administrative power and restore order.',
                                    image: 'moderation icon.svg'
                                },
                                {
                                    feName: "Invite Tracker",
                                    beName: "inviteTracker",
                                    description: 'Track who your memers invite and reward them it.',
                                    image: 'invites icon.svg'
                                },
                                {
                                    feName: "Gateway",
                                    beName: "gateway",
                                    description: 'Require new members to verify to gain access to your server.',
                                    image: 'gateway icon.svg'
                                },
                                {
                                    feName: "Ticket System",
                                    beName: "ticketSystem",
                                    description: 'Got problems with members that need solving have them make a ticket.',
                                    image: 'ticket icon.svg'
                                }
                            ]
                        }
                        const utilitiesSection = {
                            feName: 'Utilities',
                            beName: 'utilities',
                            children: [
                                {
                                    feName: "Embeds",
                                    beName: "embeds",
                                    description: 'Post cool looking embedded messages.',
                                    image: 'embeds icon.svg'
                                },
                                {
                                    feName: "Timers",
                                    beName: "timers",
                                    description: 'Get the messsage out with messages on repeat.',
                                    image: 'timer icon.svg'
                                },
                                {
                                    feName: "Stats",
                                    beName: "stats",
                                    description: 'See an overview of what your members are doing.',
                                    image: 'stats icon.svg'
                                },
                                {
                                    feName: "Temp Channels",
                                    beName: "tempChannels",
                                    description: 'Give your members the power to have their own private VC.',
                                    image: 'temp channel icon.svg'
                                },
                                {
                                    feName: "Looking For Group",
                                    beName: "lookingForGroup",
                                    description: 'Allow your members to find others to have fun with.',
                                    image: 'lfg icon.svg'
                                },
                                {
                                    feName: "Polls",
                                    beName: "polls",
                                    description: 'Let your members vote on it.',
                                    image: 'polls icon.svg'
                                },
                                {
                                    feName: "Suggestions",
                                    beName: "suggestions",
                                    description: 'Get an idea of what your members want.',
                                    image: 'suggestions icon.svg'
                                }
                            ]
                        }
                        const connectionsSection = {
                            feName: 'Connections',
                            beName: 'connections',
                            children: [
                                {
                                    feName: "Twitch",
                                    beName: "twitch",
                                    description: 'Get notifications when your favorite streamers go live.',
                                    image: 'twitch.svg'
                                },
                                {
                                    feName: "Youtube",
                                    beName: "youtube",
                                    description: 'Get notifications when your favorite youtubers go live or post videos.',
                                    image: 'youtube.svg'
                                },
                                {
                                    feName: "Twitter",
                                    beName: "twitter",
                                    description: 'Get notifications when your favorite influencer tweets.',
                                    image: 'twitter.svg'
                                },
                                {
                                    feName: "Instagram",
                                    beName: "instagram",
                                    description: 'Get notifications when your favorite influencer posts.',
                                    image: 'instagram.svg'
                                },
                                {
                                    feName: "Reddit",
                                    beName: "tempChannels",
                                    description: 'Get notifications when your favorite thread receives a post.',
                                    image: 'reddit-alien.svg'
                                }
                            ]
                        }
                        const engagementSection = {
                            feName: 'Engagement',
                            beName: 'engagement',
                            children: [
                                {
                                    feName: "Ranks",
                                    beName: "ranks",
                                    description: 'Let your members show their status on your server.',
                                    image: 'ranks icon.svg'
                                },
                                {
                                    feName: "Birthdays",
                                    beName: "birthdays",
                                    description: 'Let your members know that you are happy they were born.',
                                    image: 'birthday icon.svg'
                                },
                                {
                                    feName: "Economy",
                                    beName: "economy",
                                    description: 'This is your domain might as well control your economy too.',
                                    image: 'economy icon.svg'
                                },
                                {
                                    feName: "Giveaways",
                                    beName: "giveaways",
                                    description: 'Give your members a chance to win prizes.',
                                    image: 'giveaway icon.svg'
                                },
                                {
                                    feName: "Miscellaneous",
                                    beName: "miscellaneous",
                                    description: 'Allow your members to have something extra to mess around with.',
                                    image: 'misc icon.svg'
                                }
                            ]
                        }
                        // const sectionList = [monetizationSection, serverManagementSection, utilitiesSection, engagementSection];
                        const sectionList = [serverManagementSection, utilitiesSection, engagementSection];
                        let openSections = [];
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                            return result.json();
                        }).then((guildResponse) => {
                            fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then((settings) => {
                                let activeModules = [];
                                let activeCommands = [];
                                activeModules[guildResponse.guild.id] = settings.activeModules;
                                activeCommands[guildResponse.guild.id] = settings.activeCommands;
                                if (settings.activeModules.length === 0) {
                                    fetch('https://api.godseyeofficial.xyz/api/guild/activeModules/reset?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                        return result.json();
                                    }).then((response) => {
                                        if (response.msg === 'Success') {
                                            window.location.reload();
                                        };
                                    });
                                }
                                if (settings.activeCommands.length === 0) {
                                    fetch('https://api.godseyeofficial.xyz/api/guild/activeCommands/reset?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                        return result.json();
                                    }).then((response) => {
                                        if (response.msg === 'Success') {
                                            window.location.reload();
                                        };
                                    });
                                }
                                function createSections(sections) {
                                    const list = document.getElementById('body-modules-activity-list');
                                    sections.forEach((section) => {
                                        const listItem = document.createElement('li');
                                        listItem.className = 'body-modules-activity-list-item';
                                        listItem.id = `body-modules-activity-list-item-${section.beName}`;
                                        list.appendChild(listItem);
                                        const headerContainer = document.createElement('div');
                                        headerContainer.className = 'body-modules-activity-list-item-headerContainer';
                                        listItem.appendChild(headerContainer);
                                        const h1 = document.createElement('h1');
                                        h1.className = 'body-modules-activity-list-item-h1';
                                        h1.id = `body-modules-activity-list-item-h1-${section.beName}`;
                                        h1.innerHTML = `${section.feName}`;
                                        headerContainer.appendChild(h1);
                                        const arrow = document.createElement('img');
                                        arrow.className = 'body-modules-activity-list-item-img';
                                        arrow.id = `body-modules-activity-list-item-img-${section.beName}-arrow`;
                                        arrow.src = '../images/arrow icon.svg'
                                        headerContainer.appendChild(arrow);
                                        const moduleList = document.createElement('ul');
                                        moduleList.className = 'body-section-list';
                                        moduleList.id = `body-section-list-${section.beName}`;
                                        moduleList.style.display = 'none'
                                        listItem.appendChild(moduleList);
                                        const div = document.createElement('div');
                                        div.className = 'body-modules-activity-list-item-div';
                                        div.id = `body-modules-activity-list-item-div-${section.beName}`;
                                        listItem.appendChild(div);
                                        openSections[section.beName] = false;
                                        div.addEventListener('mouseover', () => {
                                            listItem.style.border = '2px solid red';
                                            listItem.style.boxShadow = '0px 0px 10px 0px red';
                                        });
                                        div.addEventListener('mouseout', () => {
                                            listItem.style.border = 'none';
                                            listItem.style.boxShadow = 'none';
                                        });

                                        div.addEventListener('click', () => {
                                            if (openSections[section.beName] === false) {
                                                openSections[section.beName] = true;
                                                section.children.forEach((child) => {
                                                    const listItem2 = document.createElement('li');
                                                    listItem2.className = 'body-section-list-item';
                                                    listItem2.id = `body-section-list-item-${child.beName}`;
                                                    moduleList.appendChild(listItem2);
                                                    const img = document.createElement('img');
                                                    img.src = `../images/${child.image}`;
                                                    img.className = 'body-section-list-item-img';
                                                    img.id = `body-section-list-item-img-${child.beName}`;
                                                    listItem2.appendChild(img);
                                                    const h1_2 = document.createElement('h1');
                                                    h1_2.className = 'body-section-list-item-h1';
                                                    h1_2.id = `body-section-list-item-h1-${child.beName}`;
                                                    h1_2.innerHTML = `${child.feName}`;
                                                    listItem2.appendChild(h1_2);
                                                    const p = document.createElement('p');
                                                    p.className = 'body-section-list-item-p';
                                                    p.id = `body-section-list-item-p-${child.beName}`;
                                                    p.innerHTML = `${child.description}`;
                                                    listItem2.appendChild(p);
                                                    const sliderContainer = document.createElement('div');
                                                    sliderContainer.className = 'slider-container';
                                                    sliderContainer.id = `slider-container-${child.beName}`;
                                                    listItem2.appendChild(sliderContainer);
                                                    const sliderRail = document.createElement('div');
                                                    sliderRail.className = 'center-vert center-slider-rail';
                                                    sliderContainer.appendChild(sliderRail);
                                                    const rail = document.createElement('span');
                                                    rail.className = 'slider-container-rail';
                                                    rail.id = `slider-container-rail-${child.beName}`;
                                                    sliderRail.appendChild(rail);
                                                    const slider = document.createElement('span');
                                                    slider.className = 'slider-container-slider glowRed';
                                                    slider.id = `slider-container-slider-${child.beName}`;
                                                    sliderRail.appendChild(slider);
                                                    const modObj = activeModules[guildResponse.guild.id].find(m => m.module === `${child.feName}`);
                                                    if (modObj.status === true) {
                                                        moduleStatus[child.beName] = true;
                                                        slider.style.left = '60%';
                                                        slider.style.backgroundColor = 'var(--geGreen)';
                                                        slider.className = 'slider-container-slider glowGreen';
                                                        img.style.filter = 'invert(66%) sepia(88%) saturate(727%) hue-rotate(2deg) brightness(108%) contrast(104%)';
                                                    } else {
                                                        moduleStatus[child.beName] = false;
                                                        slider.style.left = '5%';
                                                        slider.style.backgroundColor = 'red';
                                                        slider.className = 'slider-container-slider glowRed';
                                                        img.style.filter = "invert(69%) sepia(8%) saturate(9%) hue-rotate(345deg) brightness(87%) contrast(89%)";
                                                    };
                                                    sliderContainer.addEventListener('click', () => {
                                                        fetch('https://api.godseyeofficial.xyz/api/guild/activeModules/update?' + new URLSearchParams({ guildId: targetGuildId, child: child.feName })).then((result) => {
                                                            return result.json();
                                                        }).then((response) => {
                                                            if (response.msg === 'Success') {
                                                                activeModules[guildResponse.guild.id] = response.modules;
                                                                const modObj = activeModules[guildResponse.guild.id].find(m => m.module === `${child.feName}`);
                                                                if (modObj.status === true) {
                                                                    moduleStatus[child.beName] = true;
                                                                    slider.style.left = '60%';
                                                                    slider.style.backgroundColor = 'var(--geGreen)';
                                                                    slider.className = 'slider-container-slider glowGreen';
                                                                    img.style.filter = 'invert(66%) sepia(88%) saturate(727%) hue-rotate(2deg) brightness(108%) contrast(104%)';
                                                                } else {
                                                                    moduleStatus[child.beName] = false;
                                                                    slider.style.left = '5%';
                                                                    slider.style.backgroundColor = 'red';
                                                                    slider.className = 'slider-container-slider glowRed';
                                                                    img.style.filter = "invert(69%) sepia(8%) saturate(9%) hue-rotate(345deg) brightness(87%) contrast(89%)";
                                                                };
                                                            } else {
                                                                const modObj = activeModules[guildResponse.guild.id].find(m => m.module === `${child.feName}`);
                                                                moduleStatus[child.beName] = false;
                                                                img.style.filter = "invert(69%) sepia(8%) saturate(9%) hue-rotate(345deg) brightness(87%) contrast(89%)";
                                                            }
                                                        });
                                                    });
                                                })
                                                moduleList.style.display = '';
                                                listItem.style.height = `${moduleList.clientHeight + (bodyContainer.clientHeight * 0.2)}px`
                                            } else {
                                                if (bodyContainer.clientWidth < 700) {
                                                    moduleList.style.animation = 'generalDissapear 0.2s linear';
                                                    listItem.style.animation = 'generalShrink2 0.2s linear';
                                                    moduleList.style.display = 'none';
                                                    listItem.style.height = '10%';
                                                } else {
                                                    moduleList.style.animation = 'generalDissapear 0.2s linear';
                                                    listItem.style.animation = 'generalShrink 0.2s linear';
                                                    moduleList.style.display = 'none';
                                                    listItem.style.height = '10%';
                                                };
                                                openSections[section.beName] = false;
                                                section.children.forEach(() => {
                                                    moduleList.firstChild.remove();
                                                });
                                            };
                                        });
                                    });
                                };
                                createSections(sectionList);
                                loaderContainer.style.display = 'none';
                            });
                        });
                    };
                });
            });
        });
    });
});

// Functions