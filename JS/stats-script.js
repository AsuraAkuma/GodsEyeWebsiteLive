// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const optionList = document.getElementById('stat-options-list');
const memberSwitch = document.getElementById('stat-options-option-section-member-status-switch-container');
const birthSwitch = document.getElementById('stat-options-option-section-birth-status-switch-container');
const ownerSwitch = document.getElementById('stat-options-option-section-owner-status-switch-container');
const regionSwitch = document.getElementById('stat-options-option-section-region-status-switch-container');
const boostsSwitch = document.getElementById('stat-options-option-section-boost-status-switch-container');
const boostTierSwitch = document.getElementById('stat-options-option-section-boostTier-status-switch-container');
const botsSwitch = document.getElementById('stat-options-option-section-bots-status-switch-container');
const memberSlider = document.getElementById('stat-options-option-section-member-status-switch-slider');
const birthSlider = document.getElementById('stat-options-option-section-birth-status-switch-slider');
const ownerSlider = document.getElementById('stat-options-option-section-owner-status-switch-slider');
const regionSlider = document.getElementById('stat-options-option-section-region-status-switch-slider');
const boostsSlider = document.getElementById('stat-options-option-section-boost-status-switch-slider');
const boostTierSlider = document.getElementById('stat-options-option-section-boostTier-status-switch-slider');
const botsSlider = document.getElementById('stat-options-option-section-bots-status-switch-slider');
const memberText = document.getElementById('stat-options-option-section-member-label-switch-slider-text');
const birthText = document.getElementById('stat-options-option-section-birth-label-switch-slider-text');
const ownerText = document.getElementById('stat-options-option-section-owner-label-switch-slider-text');
const regionText = document.getElementById('stat-options-option-section-region-label-switch-slider-text');
const boostsText = document.getElementById('stat-options-option-section-boost-label-switch-slider-text');
const boostTierText = document.getElementById('stat-options-option-section-boostTier-label-switch-slider-text');
const botsText = document.getElementById('stat-options-option-section-bots-label-switch-slider-text');


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
            fetch('https://api.godseyeofficial.xyz/api/guild/stats?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then((response) => {
                let status = [];
                const { msg, stats } = response;
                if (msg === "Success") {
                    // alert(msg);
                    // return;
                    if (stats) {
                        if (!stats.memberChannel || stats.memberChannel === undefined) {
                            status['member'] = false;
                            memberSwitch.style.justifyContent = 'left';
                        } else {
                            status['member'] = true;
                            memberSlider.style.left = '-2%';
                            memberSwitch.style.justifyContent = 'right';
                            memberSlider.style.backgroundColor = 'var(--geGreen)';
                            memberText.style.color = 'black';
                            memberText.innerHTML = 'Active';
                        };
                        if (!stats.birthChannel || stats.birthChannel === undefined) {
                            status['birth'] = false;
                            birthSwitch.style.justifyContent = 'left';
                        } else {
                            status['birth'] = true;
                            birthSlider.style.left = '-2%';
                            birthSwitch.style.justifyContent = 'right';
                            birthSlider.style.backgroundColor = 'var(--geGreen)';
                            birthText.style.color = 'black';
                            birthText.innerHTML = 'Active';
                        };
                        if (!stats.ownerChannel || stats.ownerChannel === undefined) {
                            status['owner'] = false;
                            ownerSwitch.style.justifyContent = 'left';
                        } else {
                            status['owner'] = true;
                            ownerSlider.style.left = '-2%';
                            ownerSwitch.style.justifyContent = 'right';
                            ownerSlider.style.backgroundColor = 'var(--geGreen)';
                            ownerText.style.color = 'black';
                            ownerText.innerHTML = 'Active';
                        };
                        if (!stats.regionChannel || stats.regionChannel === undefined) {
                            status['region'] = false;
                            regionSwitch.style.justifyContent = 'left';
                        } else {
                            status['region'] = true;
                            regionSlider.style.left = '-2%';
                            regionSwitch.style.justifyContent = 'right';
                            regionSlider.style.backgroundColor = 'var(--geGreen)';
                            regionText.style.color = 'black';
                            regionText.innerHTML = 'Active';
                        };
                        if (!stats.boostsChannel || stats.boostsChannel === undefined) {
                            status['boosts'] = false;
                            boostsSwitch.style.justifyContent = 'left';
                        } else {
                            status['boosts'] = true;
                            boostsSlider.style.left = '-2%';
                            boostsSwitch.style.justifyContent = 'right';
                            boostsSlider.style.backgroundColor = 'var(--geGreen)';
                            boostsText.style.color = 'black';
                            boostsText.innerHTML = 'Active';
                        };
                        if (!stats.boostTierChannel || stats.boostTierChannel === undefined) {
                            status['boostTier'] = false;
                            boostTierSwitch.style.justifyContent = 'left';
                        } else {
                            status['boostTier'] = true;
                            boostTierSlider.style.left = '-2%';
                            boostTierSwitch.style.justifyContent = 'right';
                            boostTierSlider.style.backgroundColor = 'var(--geGreen)';
                            boostTierText.style.color = 'black';
                            boostTierText.innerHTML = 'Active';
                        };
                        if (!stats.botsChannel || stats.botsChannel === undefined) {
                            status['bots'] = false;
                            botsSwitch.style.justifyContent = 'left';
                        } else {
                            status['bots'] = true;
                            botsSlider.style.left = '-2%';
                            botsSwitch.style.justifyContent = 'right';
                            botsSlider.style.backgroundColor = 'var(--geGreen)';
                            botsText.style.color = 'black';
                            botsText.innerHTML = 'Active';
                        };
                    };
                } else {
                    status['member'] = false;
                    status['birth'] = false;
                    status['owner'] = false;
                    status['region'] = false;
                    status['boosts'] = false;
                    status['boostTier'] = false;
                    status['bots'] = false;
                };
                memberSwitch.addEventListener('click', () => {
                    status['member'] = (status['member'] !== true);
                    fetch('https://api.godseyeofficial.xyz/api/guild/stats/update?' + new URLSearchParams({ guildId: targetGuildId, members: status['member'], birth: status['birth'], owner: status['owner'], region: status['region'], boosts: status['boosts'], boostTier: status['boostTier'], bots: status['bots'] })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg !== 'Success') {
                            alert(msg);
                            return;
                        } else {
                            window.location.reload();
                        };
                    });
                });
                birthSwitch.addEventListener('click', () => {
                    status['birth'] = (status['birth'] !== true);
                    fetch('https://api.godseyeofficial.xyz/api/guild/stats/update?' + new URLSearchParams({ guildId: targetGuildId, members: status['member'], birth: status['birth'], owner: status['owner'], region: status['region'], boosts: status['boosts'], boostTier: status['boostTier'], bots: status['bots'] })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg !== 'Success') {
                            alert(msg);
                            return;
                        } else {
                            window.location.reload();
                        };
                    });
                });
                ownerSwitch.addEventListener('click', () => {
                    status['owner'] = (status['owner'] !== true);
                    fetch('https://api.godseyeofficial.xyz/api/guild/stats/update?' + new URLSearchParams({ guildId: targetGuildId, members: status['member'], birth: status['birth'], owner: status['owner'], region: status['region'], boosts: status['boosts'], boostTier: status['boostTier'], bots: status['bots'] })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg !== 'Success') {
                            alert(msg);
                            return;
                        } else {
                            window.location.reload();
                        };
                    });
                });
                regionSwitch.addEventListener('click', () => {
                    status['region'] = (status['region'] !== true);
                    fetch('https://api.godseyeofficial.xyz/api/guild/stats/update?' + new URLSearchParams({ guildId: targetGuildId, members: status['member'], birth: status['birth'], owner: status['owner'], region: status['region'], boosts: status['boosts'], boostTier: status['boostTier'], bots: status['bots'] })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg !== 'Success') {
                            alert(msg);
                            return;
                        } else {
                            window.location.reload();
                        };
                    });
                });
                boostsSwitch.addEventListener('click', () => {
                    status['boosts'] = (status['boosts'] !== true);
                    fetch('https://api.godseyeofficial.xyz/api/guild/stats/update?' + new URLSearchParams({ guildId: targetGuildId, members: status['member'], birth: status['birth'], owner: status['owner'], region: status['region'], boosts: status['boosts'], boostTier: status['boostTier'], bots: status['bots'] })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg !== 'Success') {
                            alert(msg);
                            return;
                        } else {
                            window.location.reload();
                        };
                    });
                });
                boostTierSwitch.addEventListener('click', () => {
                    status['boostTier'] = (status['boostTier'] !== true);
                    fetch('https://api.godseyeofficial.xyz/api/guild/stats/update?' + new URLSearchParams({ guildId: targetGuildId, members: status['member'], birth: status['birth'], owner: status['owner'], region: status['region'], boosts: status['boosts'], boostTier: status['boostTier'], bots: status['bots'] })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg !== 'Success') {
                            alert(msg);
                            return;
                        } else {
                            window.location.reload();
                        };
                    });
                });
                botsSwitch.addEventListener('click', () => {
                    status['bots'] = (status['bots'] !== true);
                    fetch('https://api.godseyeofficial.xyz/api/guild/stats/update?' + new URLSearchParams({ guildId: targetGuildId, members: status['member'], birth: status['birth'], owner: status['owner'], region: status['region'], boosts: status['boosts'], boostTier: status['boostTier'], bots: status['bots'] })).then((result) => {
                        return result.json();
                    }).then(({ msg }) => {
                        if (msg !== 'Success') {
                            alert(msg);
                            return;
                        } else {
                            window.location.reload();
                        };
                    });
                });
            });
            // End of page code
        });
    });
});

