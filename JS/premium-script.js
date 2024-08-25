// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');

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
            fetch('https://api.godseyeofficial.xyz/api/client/freefeatures?').then((result) => {
                return result.json();
            }).then(({ msg, freeFeatures }) => {
                if (msg === 'Success') {
                    let activeOption;
                    const premiumOptionYearly = document.getElementById('module-premium-option-yearly');
                    const premiumOptionYearlyIndicator = document.getElementById('module-premium-option-header-indicator-yearly');
                    const premiumOptionMonthly = document.getElementById('module-premium-option-monthly');
                    const premiumOptionMonthlyIndicator = document.getElementById('module-premium-option-header-indicator-monthly');
                    const paymentButton = document.getElementById('payment-button');
                    let pbStatus = false;
                    premiumOptionYearly.addEventListener('click', () => {
                        activeOption = 'yearly';
                        premiumOptionYearly.style.borderColor = 'red';
                        premiumOptionYearlyIndicator.style.backgroundColor = 'red';
                        premiumOptionMonthly.style.borderColor = 'var(--geMidGrey)';
                        premiumOptionMonthlyIndicator.style.backgroundColor = '';
                        paymentButton.style.display = 'block';
                        paymentButton.className = 'payment-button-active';
                        pbStatus = true;
                    });
                    premiumOptionMonthly.addEventListener('click', () => {
                        activeOption = 'monthly';
                        premiumOptionYearly.style.borderColor = 'var(--geMidGrey)';
                        premiumOptionYearlyIndicator.style.backgroundColor = '';
                        premiumOptionMonthly.style.borderColor = '#red';
                        premiumOptionMonthlyIndicator.style.backgroundColor = 'red';
                        paymentButton.style.display = 'block';
                        paymentButton.className = 'payment-button-active';
                        pbStatus = true;
                    });
                    paymentButton.addEventListener('click', () => {
                        if (pbStatus === true) {
                            // Fill in payment step later
                            if (activeOption === 'yearly') {
                                window.location.href = `https://buy.stripe.com/00g9DP4Xn0wU9La7st?client_reference_id=${targetGuildId + '_' + id}`;
                            } else if (activeOption === 'monthly') {
                                window.location.href = `https://buy.stripe.com/7sI2bnexXbby5uU288?client_reference_id=${targetGuildId + '_' + id}`;
                            };
                        };
                    });
                    const list = document.getElementById('module-premium-option-list-free');
                    while (list.firstChild) {
                        list.removeChild(list.firstChild);
                    }
                    let totalAmount = 0;
                    freeFeatures.forEach((feature) => {
                        const item = document.createElement('li');
                        item.className = 'module-premium-option-list-item';
                        item.id = `module-premium-option-list-item-feature-${feature.module}`;
                        list.appendChild(item);
                        const h1 = document.createElement('h1');
                        h1.className = 'module-premium-option-list-item-h1';
                        h1.id = `module-premium-option-list-item-h1-${feature.module}`;
                        if (feature.premium.status === true) {
                            h1.innerHTML = `❌ ${feature.module}`;
                        } else {
                            h1.innerHTML = `✔️ ${feature.module}`;
                        };
                        item.appendChild(h1);
                        const item2 = document.createElement('li');
                        item2.className = 'module-premium-option-list-item';
                        item2.id = `module-premium-option-list-item-feature-${feature.module}-list`;
                        list.appendChild(item2);
                        const ul = document.createElement('ul');
                        ul.className = 'module-premium-option-list-item-list';
                        ul.id = `module-premium-option-list-item-list-${feature.module}`;
                        item2.appendChild(ul);
                        let amount = 0;
                        feature.premium.limitations.forEach((limitation) => {
                            if (limitation.value !== 'none') {
                                const li = document.createElement('li');
                                li.className = 'module-premium-option-list-item-list-item';
                                li.id = `module-premium-option-list-item-list-item-${limitation.name}`;
                                const h2 = document.createElement('h2');
                                h2.className = 'module-premium-option-list-item-list-item-h2';
                                h2.id = `module-premium-option-list-item-list-item-h2-${limitation.name}`;
                                h2.innerHTML = `- ${limitation.displayName}: ${limitation.value}`;
                                li.appendChild(h2);
                                ul.appendChild(li);
                                amount++;
                                totalAmount++;
                            }
                        });
                        if (ul.children.length === 0) {
                            item2.remove();
                        };
                        totalAmount++;
                    });
                    const modulePremiumContainer = document.getElementById('module-premium-container');
                    bodyContainer.style.height = `${(totalAmount * 3) + (totalAmount * 2)}vh`;
                    const list2 = document.getElementById('module-premium-option-list-premium');
                    while (list2.firstChild) {
                        list2.removeChild(list2.firstChild);
                    }
                    freeFeatures.forEach((feature) => {
                        const item = document.createElement('li');
                        item.className = 'module-premium-option-list-item';
                        item.id = `module-premium-option-list-item-feature-${feature.module}`;
                        list2.appendChild(item);
                        const h1 = document.createElement('h1');
                        h1.className = 'module-premium-option-list-item-h1';
                        h1.id = `module-premium-option-list-item-h1-${feature.module}`;
                        h1.innerHTML = `✔️ ${feature.module}`;
                        item.appendChild(h1);
                    });
                    fetch('https://api.godseyeofficial.xyz/api/user/premiumInfo?' + new URLSearchParams({ userId: id })).then((result) => {
                        return result.json();
                    }).then(({ msg, premiumInfo }) => {
                        if (msg === 'Success') {

                        };
                    });
                }
            });
            // End of page code
        });
    });
});

// Functions

