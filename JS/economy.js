// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const workDelayAmountInput = document.getElementById('delays-work-input');
const workDelayTypeInput = document.getElementById('delays-work-input-2');
const slutDelayAmountInput = document.getElementById('delays-slut-input');
const slutDelayTypeInput = document.getElementById('delays-slut-input-2');
const crimeDelayAmountInput = document.getElementById('delays-crime-input');
const crimeDelayTypeInput = document.getElementById('delays-crime-input-2');
const robDelayAmountInput = document.getElementById('delays-rob-input');
const robDelayTypeInput = document.getElementById('delays-rob-input-2');
const delaySaveButton = document.getElementById('delays-button-save');
const slutFineMinInput = document.getElementById('fines-slut-input-min');
const slutFineMaxInput = document.getElementById('fines-slut-input-max');
const slutFineTypeInput = document.getElementById('fines-slut-input-type');
const crimeFineMinInput = document.getElementById('fines-crime-input-min');
const crimeFineMaxInput = document.getElementById('fines-crime-input-max');
const crimeFineTypeInput = document.getElementById('fines-crime-input-type');
const robFineMinInput = document.getElementById('fines-rob-input-min');
const robFineMaxInput = document.getElementById('fines-rob-input-max');
const robFineTypeInput = document.getElementById('fines-rob-input-type');
const fineSaveButton = document.getElementById('fines-button-save');
const workPayoutsMin = document.getElementById('payouts-work-input-min');
const workPayoutsMax = document.getElementById('payouts-work-input-max');
const slutPayoutsMin = document.getElementById('payouts-slut-input-min');
const slutPayoutsMax = document.getElementById('payouts-slut-input-max');
const crimePayoutsMin = document.getElementById('payouts-crime-input-min');
const crimePayoutsMax = document.getElementById('payouts-crime-input-max');
const payoutsSaveButton = document.getElementById('payouts-button-save');
const replyCommandInput = document.getElementById('reply-editor-command');
const replyTypeInput = document.getElementById('reply-editor-type');
const replyMessageInput = document.getElementById('reply-editor-message');
const replyList = document.getElementById('section-container-list-reply');
const replySaveButton = document.getElementById('reply-button-create');
const shopItemNameInput = document.getElementById('shopitem-editor-name');
const shopItemDescriptionInput = document.getElementById('shopitem-editor-description');
const shopItemPriceInput = document.getElementById('shopitem-editor-price');
const shopItemMoneyRequiredInput = document.getElementById('shopitem-editor-moneyrequired');
const shopItemRoleRequiredInput = document.getElementById('shopitem-editor-rolerequired');
const shopItemStockInput = document.getElementById('shopitem-editor-stock');
const shopItemOverstockInput = document.getElementById('shopitem-editor-overstock');
const shopItemOverstockPriceMultInput = document.getElementById('shopitem-editor-overstockpricemult');
const shopItemsList = document.getElementById('section-container-list-shopitems');
const shopItemSaveButton = document.getElementById('shopitem-button-create');
const slutWinRate = document.getElementById('winrates-slut-input');
const crimeWinRate = document.getElementById('winrates-crime-input');
const robWinRate = document.getElementById('winrates-rob-input');
const winRatesSaveButton = document.getElementById('winrates-button-save');
const creditSwitchContainer = document.getElementById('slider-container-credit');
const creditSwitchSlider = document.getElementById('slider-container-slider-credit');
const robSwitchContainer = document.getElementById('slider-container-rob');
const robSwitchSlider = document.getElementById('slider-container-slider-rob');
const maxBalanceInput = document.getElementById('other-maxbalance-input');
const startingBalanceInput = document.getElementById('other-startingbalance-input');
const currencyInput = document.getElementById('other-currency-input');
const moneyAuditInput = document.getElementById('other-audit-input');
const otherSaveButton = document.getElementById('other-button-save');
const payoutRecurrencesAmount = document.getElementById('recurrences-payoutamount-input');
const payoutRecurrencesIntervalAmount = document.getElementById('recurrences-payoutintervalamount-input');
const payoutRecurrencesIntervalType = document.getElementById('recurrences-payoutintervaltype-input');
const taxRecurrencesAmount = document.getElementById('recurrences-taxamount-input');
const taxRecurrencesIntervalAmount = document.getElementById('recurrences-taxintervalamount-input');
const taxRecurrencesIntervalType = document.getElementById('recurrences-taxintervaltype-input');
const recurrencesSaveButton = document.getElementById('recurrences-button-save');
const shopCouponDiscountNameInput = document.getElementById('servercouponeditor-discountname-input');
const shopCouponDiscountTypeInput = document.getElementById('servercouponeditor-discounttype-input');
const shopCouponDiscountAmountInput = document.getElementById('servercouponeditor-discountamount-input');
const shopCouponExpirationInput = document.getElementById('servercouponeditor-expirationdate-input');
const shopCouponMaxItemsInput = document.getElementById('servercouponeditor-maxitems-input');
const shopCouponMaxUsesInput = document.getElementById('servercouponeditor-maxuses-input');
const shopCouponMaxUseTypeInput = document.getElementById('servercouponeditor-maxusestype-input');
const shopCouponRoleRequiredInput = document.getElementById('servercouponeditor-rolerequired-input');
const shopCouponDescriptionInput = document.getElementById('servercouponeditor-description-input');
const shopCouponAllowedItemsInput = document.getElementById('servercouponeditor-alloweditems-input');
const shopCouponRequiredCostInput = document.getElementById('servercouponeditor-requiredcost-input');
const shopCouponRequiredItemsInput = document.getElementById('servercouponeditor-requireditems-input');
const shopCouponTotalUsesInput = document.getElementById('servercouponeditor-totaluses-input');
const shopCouponList = document.getElementById('section-container-list-servercoupons');
const shopCouponSaveButton = document.getElementById('servercouponeditor-button-save');
const shopSaleDiscountNameInput = document.getElementById('serversaleeditor-discountname-input');
const shopSaleDiscountTypeInput = document.getElementById('serversaleeditor-discounttype-input');
const shopSaleDiscountAmountInput = document.getElementById('serversaleeditor-discountamount-input');
const shopSaleExpirationInput = document.getElementById('serversaleeditor-expirationdate-input');
const shopSaleMaxItemsInput = document.getElementById('serversaleeditor-maxitems-input');
const shopSaleMaxUseTypeInput = document.getElementById('serversaleeditor-maxusestype-input');
const shopSaleMaxUsesInput = document.getElementById('serversaleeditor-maxuses-input');
const shopSaleRoleRequiredInput = document.getElementById('serversaleeditor-rolerequired-input');
const shopSaleDescriptionInput = document.getElementById('serversaleeditor-description-input');
const shopSaleAllowedItemsInput = document.getElementById('serversaleeditor-alloweditems-input');
const shopSaleRequiredItemsInput = document.getElementById('serversaleeditor-requireditems-input');
const shopSaleRequiredCostInput = document.getElementById('serversaleeditor-requiredcost-input');
const shopSaleTotalUsesInput = document.getElementById('serversaleeditor-totaluses-input');
const shopSaleList = document.getElementById('section-container-list-serversales');
const shopSaleSaveButton = document.getElementById('serversaleeditor-button-save');
const memberShopList = document.getElementById('section-container-list-membershops');
const memberShopNameInsert = document.getElementById('membershopsinfo-shopname-input');
const memberShopOwnerInsert = document.getElementById('membershopsinfo-owner-input');
const memberShopItemsList = document.getElementById('section-container-list-membershopitems');
const memberShopItemInfoPanel = document.getElementById('section-container-container-membershopsiteminfo');
const memberShopItemInfoName = document.getElementById('membershopsiteminfo-shopname-input');
const memberShopItemInfoprice = document.getElementById('membershopsiteminfo-price-input');
const memberShopItemInfoRoleRequired = document.getElementById('membershopsiteminfo-rolerequired-input');
const memberShopItemInfoOverstock = document.getElementById('membershopsiteminfo-overstock-input');
const memberShopItemInfoDescription = document.getElementById('membershopsiteminfo-description-input');
const memberShopItemInfoMoneyRequired = document.getElementById('membershopsiteminfo-moneyrequired-input');
const memberShopItemInfoStock = document.getElementById('membershopsiteminfo-stock-input');
const memberShopItemInfoCloseButton = document.getElementById('iteminfo-button-close-membershops');
const memberCoupons = document.getElementById('section-container-list-membercoupons');
const memberSales = document.getElementById('section-container-list-membersales');
const moneyRoleRoleInput = document.getElementById('moneyroleeditor-role-input');
const moneyRolePeriodAmountInput = document.getElementById('moneyroleeditor-periodtime-input');
const moneyRolePeriodTypeInput = document.getElementById('moneyroleeditor-periodtype-input');
const moneyRoleAmountInput = document.getElementById('moneyroleeditor-amount-input');
const moneyRoleAccountInput = document.getElementById('moneyroleeditor-account-input');
const moneyRoleSaveButton = document.getElementById('moneyroleeditor-button-save');
const moneyRoleList = document.getElementById('section-container-list-moneyroles');
const loanList = document.getElementById('section-container-list-loans');
const roleDataList = document.getElementById('role-list');
const channelDataList = document.getElementById('channel-list');
const timeUnits = ['seconds', 'minutes', 'hours', 'days'];
const discountTypeList = ['percent', 'amount'];
const maxUseTypeList = ['percent', 'amount'];
const replyTypeList = ['win', 'lose'];
const replyCommands = ['work', 'slut', 'crime', 'rob'];
let targetReply;
let targetShopItem;
let targetSale = '';
let targetCoupon = '';
let targetMoneyRole = 'none';

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
            fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                return result.json();
            }).then(({ msg, settings }) => {
                const msg1 = msg;
                if (msg1 === 'Reload') {
                    window.location.reload();
                    return;
                };
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then(({ msg, channels }) => {
                    const msg2 = msg;
                    if (msg2 === 'Success') {
                        channels.forEach((channel) => {
                            const option = document.createElement('option');
                            option.innerHTML = channel.name;
                            channelDataList.appendChild(option);
                        });
                    };
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/roles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ msg, roles }) => {
                        const msg3 = msg;
                        if (msg3 === 'Success') {
                            roles.forEach((role) => {
                                const option = document.createElement('option');
                                option.innerHTML = role.name;
                                roleDataList.appendChild(option);
                            });
                        };
                        fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/members?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                            return result.json();
                        }).then(({ msg, members }) => {

                            if (msg1 === 'Success') {

                                // Delays

                                // Work
                                if (!(settings.delays.work.delay / 86400).toString().includes(".") && (settings.delays.work.delay / 1) > 0) {
                                    // Days
                                    workDelayTypeInput.value = 'Days';
                                    workDelayAmountInput.value = (settings.delays.work.delay / 86400)
                                } else if (!(settings.delays.work.delay / 3600).toString().includes(".") && (settings.delays.work.delay / 1) > 0) {
                                    // Hours
                                    workDelayTypeInput.value = 'Hours';
                                    workDelayAmountInput.value = (settings.delays.work.delay / 3600)
                                } else if (!(settings.delays.work.delay / 60).toString().includes(".") && (settings.delays.work.delay / 1) > 0) {
                                    // Minutes
                                    workDelayTypeInput.value = 'Minutes';
                                    workDelayAmountInput.value = (settings.delays.work.delay / 60)
                                } else if (!(settings.delays.work.delay / 1).toString().includes(".") && (settings.delays.work.delay / 1) > 0) {
                                    // Seconds
                                    workDelayTypeInput.value = 'Seconds';
                                    workDelayAmountInput.value = (settings.delays.work.delay / 1)
                                };
                                // Slut
                                if (!(settings.delays.slut.delay / 86400).toString().includes(".") && (settings.delays.slut.delay / 1) > 0) {
                                    // Days
                                    slutDelayTypeInput.value = 'Days';
                                    slutDelayAmountInput.value = (settings.delays.slut.delay / 86400)
                                } else if (!(settings.delays.slut.delay / 3600).toString().includes(".") && (settings.delays.slut.delay / 1) > 0) {
                                    // Hours
                                    slutDelayTypeInput.value = 'Hours';
                                    slutDelayAmountInput.value = (settings.delays.slut.delay / 3600)
                                } else if (!(settings.delays.slut.delay / 60).toString().includes(".") && (settings.delays.slut.delay / 1) > 0) {
                                    // Minutes
                                    slutDelayTypeInput.value = 'Minutes';
                                    slutDelayAmountInput.value = (settings.delays.slut.delay / 60)
                                } else if (!(settings.delays.slut.delay / 1).toString().includes(".") && (settings.delays.slut.delay / 1) > 0) {
                                    // Seconds
                                    slutDelayTypeInput.value = 'Seconds';
                                    slutDelayAmountInput.value = (settings.delays.slut.delay / 1)
                                };
                                // Crime
                                if (!(settings.delays.crime.delay / 86400).toString().includes(".") && (settings.delays.crime.delay / 1) > 0) {
                                    // Days
                                    crimeDelayTypeInput.value = 'Days';
                                    crimeDelayAmountInput.value = (settings.delays.crime.delay / 86400)
                                } else if (!(settings.delays.crime.delay / 3600).toString().includes(".") && (settings.delays.crime.delay / 1) > 0) {
                                    // Hours
                                    crimeDelayTypeInput.value = 'Hours';
                                    crimeDelayAmountInput.value = (settings.delays.crime.delay / 3600)
                                } else if (!(settings.delays.crime.delay / 60).toString().includes(".") && (settings.delays.crime.delay / 1) > 0) {
                                    // Minutes
                                    crimeDelayTypeInput.value = 'Minutes';
                                    crimeDelayAmountInput.value = (settings.delays.crime.delay / 60)
                                } else if (!(settings.delays.crime.delay / 1).toString().includes(".") && (settings.delays.crime.delay / 1) > 0) {
                                    // Seconds
                                    crimeDelayTypeInput.value = 'Seconds';
                                    crimeDelayAmountInput.value = (settings.delays.crime.delay / 1)
                                };
                                // Rob
                                if (!(settings.delays.rob.delay / 86400).toString().includes(".") && (settings.delays.rob.delay / 1) > 0) {
                                    // Days
                                    robDelayTypeInput.value = 'Days';
                                    robDelayAmountInput.value = (settings.delays.rob.delay / 86400)
                                } else if (!(settings.delays.rob.delay / 3600).toString().includes(".") && (settings.delays.rob.delay / 1) > 0) {
                                    // Hours
                                    robDelayTypeInput.value = 'Hours';
                                    robDelayAmountInput.value = (settings.delays.rob.delay / 3600)
                                } else if (!(settings.delays.rob.delay / 60).toString().includes(".") && (settings.delays.rob.delay / 1) > 0) {
                                    // Minutes
                                    robDelayTypeInput.value = 'Minutes';
                                    robDelayAmountInput.value = (settings.delays.rob.delay / 60)
                                } else if (!(settings.delays.rob.delay / 1).toString().includes(".") && (settings.delays.rob.delay / 1) > 0) {
                                    // Seconds
                                    robDelayTypeInput.value = 'Seconds';
                                    robDelayAmountInput.value = (settings.delays.rob.delay / 1)
                                };
                                delaySaveButton.addEventListener('click', () => {
                                    if (!timeUnits.includes(workDelayTypeInput.value.toLowerCase())) {
                                        alert('Make sure to input a proper unit of time for the work delay!');
                                        return;
                                    };
                                    if (workDelayTypeInput.value === '') {
                                        alert('Make sure to input a proper unit of time for the work delay!');
                                        return;
                                    };
                                    if (!timeUnits.includes(slutDelayTypeInput.value.toLowerCase())) {
                                        alert('Make sure to input a proper unit of time for the slut delay!');
                                        return;
                                    };
                                    if (slutDelayTypeInput.value === '') {
                                        alert('Make sure to input a proper unit of time for the slut delay!');
                                        return;
                                    };
                                    if (!timeUnits.includes(crimeDelayTypeInput.value.toLowerCase())) {
                                        alert('Make sure to input a proper unit of time for the crime delay!');
                                        return;
                                    };
                                    if (crimeDelayTypeInput.value === '') {
                                        alert('Make sure to input a proper unit of time for the crime delay!');
                                        return;
                                    };
                                    if (!timeUnits.includes(robDelayTypeInput.value.toLowerCase())) {
                                        alert('Make sure to input a proper unit of time for the rob delay!');
                                        return;
                                    };
                                    if (robDelayTypeInput.value === '') {
                                        alert('Make sure to input a proper unit of time for the rob delay!');
                                        return;
                                    };
                                    if (workDelayAmountInput.value === '') {
                                        alert('Make sure to input a delay amount for the work delay!');
                                        return;
                                    };
                                    if (slutDelayAmountInput.value === '') {
                                        alert('Make sure to input a delay amount for the slut delay!');
                                        return;
                                    };
                                    if (crimeDelayAmountInput.value === '') {
                                        alert('Make sure to input a delay amount for the crime delay!');
                                        return;
                                    };
                                    if (robDelayAmountInput.value === '') {
                                        alert('Make sure to input a delay amount for the rob delay!');
                                        return;
                                    };
                                    fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/delays/save?' + new URLSearchParams({ guildId: targetGuildId, workAmount: workDelayAmountInput.value, workAmountType: workDelayTypeInput.value.toLowerCase(), slutAmount: slutDelayAmountInput.value, slutAmountType: slutDelayTypeInput.value.toLowerCase(), crimeAmount: crimeDelayAmountInput.value, crimeAmountType: crimeDelayTypeInput.value.toLowerCase(), robAmount: robDelayAmountInput.value, robAmountType: robDelayTypeInput.value.toLowerCase() })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            successPopup();
                                        };
                                    });
                                });

                                // Fines
                                slutFineMinInput.value = settings.fines.slut.minFine;
                                slutFineMaxInput.value = settings.fines.slut.maxFine;
                                if (settings.fines.slut.type === 'amount') {
                                    slutFineTypeInput.value = 'Amount';
                                } else {
                                    slutFineTypeInput.value = 'Percent';
                                };
                                crimeFineMinInput.value = settings.fines.crime.minFine;
                                crimeFineMaxInput.value = settings.fines.crime.maxFine;
                                if (settings.fines.crime.type === 'amount') {
                                    crimeFineTypeInput.value = 'Amount';
                                } else {
                                    crimeFineTypeInput.value = 'Percent';
                                };
                                robFineMinInput.value = settings.fines.rob.minFine;
                                robFineMaxInput.value = settings.fines.rob.maxFine;
                                if (settings.fines.rob.type === 'amount') {
                                    robFineTypeInput.value = 'Amount';
                                } else {
                                    robFineTypeInput.value = 'Percent';
                                };
                                fineSaveButton.addEventListener('click', () => {
                                    if (slutFineMinInput.value === '') {
                                        alert('Make sure to input a fine min-amount for the slut fine!');
                                        return;
                                    };
                                    if (slutFineMaxInput.value === '') {
                                        alert('Make sure to input a fine max-amount for the slut fine!');
                                        return;
                                    };
                                    if (!discountTypeList.includes(slutFineTypeInput.value.toLowerCase())) {
                                        alert('Make sure to input a proper fine type for the slut fine!');
                                        return;
                                    };
                                    if (slutFineTypeInput.value === '') {
                                        alert('Make sure to input a proper fine type for the slut fine!');
                                        return;
                                    };
                                    if (crimeFineMinInput.value === '') {
                                        alert('Make sure to input a fine min-amount for the crime fine!');
                                        return;
                                    };
                                    if (crimeFineMaxInput.value === '') {
                                        alert('Make sure to input a fine max-amount for the crime fine!');
                                        return;
                                    };
                                    if (!discountTypeList.includes(crimeFineTypeInput.value.toLowerCase())) {
                                        alert('Make sure to input a proper fine type for the crime fine!');
                                        return;
                                    };
                                    if (crimeFineTypeInput.value === '') {
                                        alert('Make sure to input a proper fine type for the crime fine!');
                                        return;
                                    };
                                    if (robFineMinInput.value === '') {
                                        alert('Make sure to input a fine min-amount for the rob fine!');
                                        return;
                                    };
                                    if (robFineMaxInput.value === '') {
                                        alert('Make sure to input a fine max-amount for the rob fine!');
                                        return;
                                    };
                                    if (robFineTypeInput.value === '') {
                                        alert('Make sure to input a proper fine type for the rob fine!');
                                        return;
                                    };
                                    if (!discountTypeList.includes(robFineTypeInput.value.toLowerCase())) {
                                        alert('Make sure to input a proper fine type for the rob fine!');
                                        return;
                                    };
                                    fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/fines/save?' + new URLSearchParams({ guildId: targetGuildId, slutMin: slutFineMinInput.value, slutMax: slutFineMaxInput.value, slutType: slutFineTypeInput.value.toLowerCase(), crimeMin: crimeFineMinInput.value, crimeMax: crimeFineMaxInput.value, crimeType: crimeFineTypeInput.value.toLowerCase(), robMin: robFineMinInput.value, robMax: robFineMaxInput.value, robType: robFineTypeInput.value.toLowerCase() })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            successPopup();
                                        };
                                    });
                                });
                                // Payouts
                                workPayoutsMin.value = settings.payouts.work.minPayout;
                                workPayoutsMax.value = settings.payouts.work.maxPayout;
                                slutPayoutsMin.value = settings.payouts.slut.minPayout;
                                slutPayoutsMax.value = settings.payouts.slut.maxPayout;
                                crimePayoutsMin.value = settings.payouts.crime.minPayout;
                                crimePayoutsMax.value = settings.payouts.crime.maxPayout;
                                payoutsSaveButton.addEventListener('click', () => {
                                    if (workPayoutsMin.value === '') {
                                        alert('Make sure to input a minimum amount for the work payout!');
                                        return;
                                    };
                                    if (workPayoutsMax.value === '') {
                                        alert('Make sure to input a maximum amount for the work payout!');
                                        return;
                                    };
                                    if (slutPayoutsMin.value === '') {
                                        alert('Make sure to input a minimum amount for the slut payout!');
                                        return;
                                    };
                                    if (slutPayoutsMax.value === '') {
                                        alert('Make sure to input a maximum amount for the slut payout!');
                                        return;
                                    };
                                    if (crimePayoutsMin.value === '') {
                                        alert('Make sure to input a minimum amount for the crime payout!');
                                        return;
                                    };
                                    if (crimePayoutsMax.value === '') {
                                        alert('Make sure to input a maximum amount for the crime payout!');
                                        return;
                                    };
                                    fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/payouts/save?' + new URLSearchParams({ guildId: targetGuildId, workMin: workPayoutsMin.value, workMax: workPayoutsMax.value, slutMin: slutPayoutsMin.value, slutMax: slutPayoutsMax.value, crimeMin: crimePayoutsMin.value, crimeMax: crimePayoutsMax.value })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            successPopup();
                                        };
                                    });
                                });
                                // Reply
                                Object.keys(settings.replies).forEach((key) => {
                                    Object.keys(settings.replies[key]).forEach((key2) => {
                                        settings.replies[key][key2].forEach((reply) => {
                                            const item = document.createElement('li');
                                            item.className = 'section-container-list-item';
                                            replyList.appendChild(item);
                                            const topContainer = document.createElement('div');
                                            topContainer.className = 'section-container-list-item-topcontainer';
                                            item.appendChild(topContainer);
                                            const commandName = document.createElement('div');
                                            commandName.className = 'section-container-list-item-name';
                                            topContainer.appendChild(commandName);
                                            const commandNameText = document.createElement('h2');
                                            commandNameText.className = 'section-container-list-item-name-text';
                                            commandNameText.innerHTML = `Command: ${key}`;
                                            commandName.appendChild(commandNameText);
                                            const replyType = document.createElement('div');
                                            replyType.className = 'section-container-list-item-replytype';
                                            topContainer.appendChild(replyType);
                                            const replyTypeText = document.createElement('h2');
                                            replyTypeText.className = 'section-container-list-item-replytype-text';
                                            replyTypeText.innerHTML = `Type: ${key2}`;
                                            replyType.appendChild(replyTypeText);
                                            const optionButton = document.createElement('button');
                                            optionButton.className = 'section-container-list-item-option';
                                            optionButton.innerHTML = 'Options';
                                            topContainer.appendChild(optionButton);
                                            const bottomContainer = document.createElement('div');
                                            bottomContainer.className = 'section-container-list-item-bottomcontainer';
                                            item.appendChild(bottomContainer);
                                            const replyMessage = document.createElement('div');
                                            replyMessage.className = 'section-container-list-item-replymessage';
                                            bottomContainer.appendChild(replyMessage);
                                            const replyMessageText = document.createElement('p');
                                            replyMessageText.className = 'section-container-list-item-replymessage-text';
                                            replyMessageText.innerHTML = reply.split("<").join("﹤").split(">").join("﹥");
                                            replyMessage.appendChild(replyMessageText);
                                            const span = document.createElement('span');
                                            span.className = 'section-container-list-item-span';
                                            item.appendChild(span);
                                            const editButton = document.createElement('button');
                                            editButton.className = 'section-container-list-item-span-edit';
                                            editButton.innerHTML = 'Edit';
                                            span.appendChild(editButton);
                                            const deleteButton = document.createElement('button');
                                            deleteButton.className = 'section-container-list-item-span-delete';
                                            deleteButton.innerHTML = 'Delete';
                                            span.appendChild(deleteButton);
                                            optionButton.addEventListener('click', () => {
                                                span.style.display = 'flex';
                                                span.style.opacity = '100%';
                                            });
                                            span.addEventListener('mouseleave', () => {
                                                span.style.display = 'none';
                                                span.style.opacity = '0%';
                                            });
                                            editButton.addEventListener('click', () => {
                                                targetReply = reply;
                                                replyCommandInput.value = key;
                                                replyCommandInput.readOnly = true;
                                                replyTypeInput.value = key2;
                                                replyTypeInput.readOnly = true;
                                                replyMessageInput.value = reply;
                                                replySaveButton.innerHTML = 'Save';
                                            });
                                            deleteButton.addEventListener('click', () => {
                                                const confirmation = confirm('Are you sure you wish to delete this reply?');
                                                if (confirmation === true) {
                                                    fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/reply/delete?' + new URLSearchParams({ guildId: targetGuildId, command: key, type: key2, message: reply })).then((result) => {
                                                        return result.json();
                                                    }).then(({ msg }) => {
                                                        if (msg === 'Success') {
                                                            successPopup();
                                                            setTimeout(() => {
                                                                createReplies();
                                                            }, 2500);
                                                        };
                                                    });
                                                };
                                            });
                                        });
                                    });
                                });
                                replySaveButton.addEventListener('click', () => {
                                    if (replyCommandInput.value === '') {
                                        alert('Make sure to input a command for the reply editor!');
                                        return;
                                    };
                                    if (replyTypeInput.value === '') {
                                        alert('Make sure to input a type for the reply editor!');
                                        return;
                                    };
                                    if (replyMessageInput.value === '') {
                                        alert('Make sure to input a message for the reply editor!');
                                        return;
                                    };
                                    if (!replyCommands.includes(replyCommandInput.value.toLowerCase())) {
                                        alert('Make sure to input a proper command for the reply editor!');
                                        return;
                                    };
                                    if (!replyTypeList.includes(replyTypeInput.value.toLowerCase())) {
                                        alert('Make sure to input a proper type for the reply editor!');
                                        return;
                                    };
                                    if (replySaveButton.innerHTML == 'Create') {
                                        fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/reply/save?' + new URLSearchParams({ guildId: targetGuildId, command: replyCommandInput.value.toLowerCase(), type: replyTypeInput.value.toLowerCase(), message: replyMessageInput.value, previousMessage: 'none' })).then((result) => {
                                            return result.json();
                                        }).then(({ msg }) => {
                                            if (msg === 'Success') {
                                                successPopup();
                                                replyCommandInput.value = '';
                                                replyTypeInput.value = '';
                                                replyMessageInput.value = '';
                                                setTimeout(() => {
                                                    createReplies();
                                                }, 2500);
                                            };
                                        });
                                    } else {
                                        fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/reply/save?' + new URLSearchParams({ guildId: targetGuildId, command: replyCommandInput.value.toLowerCase(), type: replyTypeInput.value.toLowerCase(), message: replyMessageInput.value, previousMessage: targetReply })).then((result) => {
                                            return result.json();
                                        }).then(({ msg }) => {
                                            if (msg === 'Success') {
                                                successPopup();
                                                replyCommandInput.value = '';
                                                replyTypeInput.value = '';
                                                replyMessageInput.value = '';
                                                setTimeout(() => {
                                                    createReplies();
                                                }, 2500);
                                            };
                                        });
                                    };
                                });

                                // Server Shop Item
                                settings.shopItems.forEach((shopItem) => {
                                    const item = document.createElement('li');
                                    item.className = 'section-container-list-shopitems-item';
                                    shopItemsList.appendChild(item);
                                    const topContainer = document.createElement('div');
                                    topContainer.className = 'section-container-list-shopitems-item-topcontainer';
                                    item.appendChild(topContainer);
                                    const middleContainer = document.createElement('div');
                                    middleContainer.className = 'section-container-list-shopitems-item-middlecontainer';
                                    item.appendChild(middleContainer);
                                    const middleContainer2 = document.createElement('div');
                                    middleContainer2.className = 'section-container-list-shopitems-item-middlecontainer2';
                                    item.appendChild(middleContainer2);
                                    const bottomContainer = document.createElement('div');
                                    bottomContainer.className = 'section-container-list-shopitems-item-bottomcontainer';
                                    item.appendChild(bottomContainer);
                                    const nameContainer = document.createElement('div');
                                    nameContainer.className = 'section-container-list-shopitems-item-topcontainer-namecontainer';
                                    topContainer.appendChild(nameContainer);
                                    const center1 = document.createElement('div');
                                    center1.className = 'center-vert no-wrap';
                                    nameContainer.appendChild(center1);
                                    const nameText = document.createElement('h2');
                                    nameText.className = 'section-container-list-shopitems-item-topcontainer-namecontainer-text';
                                    nameText.innerHTML = `Name: ${shopItem.name}`;
                                    center1.appendChild(nameText);
                                    const priceContainer = document.createElement('div');
                                    priceContainer.className = 'section-container-list-shopitems-item-topcontainer-pricecontainer';
                                    topContainer.appendChild(priceContainer);
                                    const center2 = document.createElement('div');
                                    center2.className = 'center-vert no-wrap';
                                    priceContainer.appendChild(center2);
                                    const priceText = document.createElement('h2');
                                    priceText.className = 'section-container-list-shopitems-item-topcontainer-pricecontainer-text';
                                    priceText.innerHTML = `Price: ${parseInt(shopItem.price).toLocaleString()}`;
                                    center2.appendChild(priceText);
                                    const descriptionContainer = document.createElement('div');
                                    descriptionContainer.className = 'section-container-list-shopitems-item-middlecontainer-descriptioncontainer';
                                    middleContainer.appendChild(descriptionContainer);
                                    const descriptionText = document.createElement('p');
                                    descriptionText.className = 'section-container-list-shopitems-item-middlecontainer-descriptioncontainer-text';
                                    if (shopItem.description !== null) {
                                        descriptionText.innerHTML = `Desc: ${shopItem.description}`;
                                    } else {
                                        descriptionText.innerHTML = `Desc: None`;
                                    };
                                    descriptionContainer.appendChild(descriptionText);
                                    const requiredCostContainer = document.createElement('div');
                                    requiredCostContainer.className = 'section-container-list-shopitems-item-middlecontainer2-requiredcostcontainer';
                                    middleContainer2.appendChild(requiredCostContainer);
                                    const center = document.createElement('div');
                                    center.className = 'center-vert no-wrap';
                                    requiredCostContainer.appendChild(center);
                                    const requiredCostText = document.createElement('p');
                                    requiredCostText.className = 'section-container-list-shopitems-item-middlecontainer2-requiredcostcontainer-text';
                                    if (shopItem.moneyRequired !== null) {
                                        requiredCostText.innerHTML = `Req Cost: ${parseInt(shopItem.moneyRequired).toLocaleString()}`;
                                    } else {
                                        requiredCostText.innerHTML = `Req Cost: None`;
                                    };
                                    center.appendChild(requiredCostText);
                                    const requiredRoleContainer = document.createElement('div');
                                    requiredRoleContainer.className = 'section-container-list-shopitems-item-middlecontainer2-requiredrolecontainer';
                                    middleContainer2.appendChild(requiredRoleContainer);
                                    const center3 = document.createElement('div');
                                    center3.className = 'center-vert no-wrap';
                                    requiredRoleContainer.appendChild(center3);
                                    const requiredRoleText = document.createElement('p');
                                    requiredRoleText.className = 'section-container-list-shopitems-item-middlecontainer2-requiredrolecontainer-text';
                                    if (shopItem.roleRequired !== null) {
                                        const targetRole = roles.find(r => r.id === shopItem.roleRequired);
                                        if (targetRole) {
                                            requiredRoleText.innerHTML = `Role: ${targetRole.name}`;
                                        } else {
                                            requiredRoleText.innerHTML = 'Role: Deleted Role';
                                        };
                                    } else {
                                        requiredRoleText.innerHTML = 'Role: None';
                                    };
                                    center3.appendChild(requiredRoleText);
                                    const stockContainer = document.createElement('div');
                                    stockContainer.className = 'section-container-list-shopitems-item-bottomcontainer-stockcontainer';
                                    bottomContainer.appendChild(stockContainer);
                                    const center4 = document.createElement('div');
                                    center4.className = 'center-vert no-wrap';
                                    stockContainer.appendChild(center4);
                                    const stockText = document.createElement('h2');
                                    stockText.className = 'section-container-list-shopitems-item-bottomcontainer-stockcontainer-text';
                                    if (shopItem.stock !== null) {
                                        stockText.innerHTML = `Stock: ${shopItem.stock} units`;
                                    } else {
                                        stockText.innerHTML = `Stock: ∞ units`;
                                    };
                                    center4.appendChild(stockText);
                                    const overstockContainer = document.createElement('div');
                                    overstockContainer.className = 'section-container-list-shopitems-item-bottomcontainer-overstockcontainer';
                                    bottomContainer.appendChild(overstockContainer);
                                    const center5 = document.createElement('div');
                                    center5.className = 'center-vert no-wrap';
                                    overstockContainer.appendChild(center5);
                                    const overstockText = document.createElement('h2');
                                    overstockText.className = 'section-container-list-shopitems-item-bottomcontainer-overstockcontainer-text';
                                    if (shopItem.overStock !== null) {
                                        overstockText.innerHTML = `Overstock: ${parseInt(shopItem.overStock).toLocaleString()} units`;
                                    } else {
                                        overstockText.innerHTML = `Overstock: None`;
                                    };
                                    center5.appendChild(overstockText);
                                    const overstockMultContainer = document.createElement('div');
                                    overstockMultContainer.className = 'section-container-list-shopitems-item-bottomcontainer-overstockmultcontainer';
                                    bottomContainer.appendChild(overstockMultContainer);
                                    const center6 = document.createElement('div');
                                    center6.className = 'center-vert no-wrap';
                                    overstockMultContainer.appendChild(center6);
                                    const overstockMultText = document.createElement('h2');
                                    overstockMultText.className = 'section-container-list-shopitems-item-bottomcontainer-overstockmultcontainer-text';
                                    if (shopItem.overStockPriceMultiplier !== null) {
                                        overstockMultText.innerHTML = `Overstock Price: ${parseInt(shopItem.overStockPriceMultiplier).toLocaleString()}x`;
                                    } else {
                                        overstockMultText.innerHTML = `Overstock Price: None`;
                                    };
                                    center6.appendChild(overstockMultText);
                                    const buttonContainer = document.createElement('li');
                                    buttonContainer.className = 'section-container-list-shopitems-buttonContainer';
                                    shopItemsList.appendChild(buttonContainer);
                                    const editButton = document.createElement('button');
                                    editButton.className = 'section-container-list-shopitems-buttonContainer-button';
                                    editButton.innerHTML = 'Edit';
                                    buttonContainer.appendChild(editButton);
                                    const deleteButton = document.createElement('button');
                                    deleteButton.className = 'section-container-list-shopitems-buttonContainer-button';
                                    deleteButton.innerHTML = 'Delete';
                                    buttonContainer.appendChild(deleteButton);
                                    editButton.addEventListener('click', () => {
                                        targetShopItem = shopItem.name;
                                        shopItemSaveButton.innerHTML = 'Save';
                                        shopItemNameInput.value = shopItem.name;
                                        if (shopItem.description !== null) {
                                            shopItemDescriptionInput.value = shopItem.description;
                                        };
                                        shopItemPriceInput.value = shopItem.price;
                                        if (shopItem.moneyRequired !== null) {
                                            shopItemMoneyRequiredInput.value = shopItem.moneyRequired;
                                        };
                                        if (shopItem.roleRequired !== null) {
                                            const targetRole = roles.find(r => r.id === shopItem.roleRequired);
                                            if (targetRole) {
                                                shopItemRoleRequiredInput.value = targetRole.name;
                                            } else {
                                                shopItemRoleRequiredInput.value = '';
                                            };
                                        };
                                        if (shopItem.stock !== null) {
                                            shopItemStockInput.value = shopItem.stock;
                                        };
                                        if (shopItem.overStock !== null) {
                                            shopItemOverstockInput.value = shopItem.overStock;
                                        };
                                        if (shopItem.overStockPriceMultiplier !== null) {
                                            shopItemOverstockPriceMultInput.value = shopItem.overStockPriceMultiplier;
                                        };
                                    });
                                    deleteButton.addEventListener('click', () => {
                                        fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/shopitem/delete?' + new URLSearchParams({ guildId: targetGuildId, target: shopItem.name })).then((result) => {
                                            return result.json();
                                        }).then(({ msg }) => {
                                            if (msg === 'Success') {
                                                successPopup();
                                                item.remove();
                                                buttonContainer.remove();
                                            };
                                        });
                                    });
                                });
                                shopItemSaveButton.addEventListener('click', () => {
                                    let stock = 'None';
                                    let overStock = 'None';
                                    let overStockMult = 1;
                                    let price = 1;
                                    if (shopItemStockInput.value !== 0) {
                                        stock = shopItemStockInput.value;
                                    }
                                    if (shopItemOverstockInput.value !== 0) {
                                        overStock = shopItemOverstockInput.value;
                                    }
                                    if (shopItemOverstockPriceMultInput.value !== 0) {
                                        overStockMult = shopItemOverstockPriceMultInput.value;
                                    }
                                    if (shopItemPriceInput.value !== '') {
                                        price = shopItemPriceInput.value;
                                    }


                                    if (shopItemSaveButton.innerHTML === 'Create') {
                                        const targetItem3 = settings.shopItems.find(i => i.name.toLowerCase() === shopItemNameInput.value.toLowerCase());
                                        if (targetItem3) {
                                            alert('An item with this name already exists!');
                                            return;
                                        };
                                        let targetRole2 = '';
                                        if (shopItemRoleRequiredInput.value !== '') {
                                            const role = roles.find(r => r.name.toLowerCase() === shopItemRoleRequiredInput.value.toLowerCase());
                                            if (role) {
                                                targetRole2 = role.id;
                                            };
                                        };
                                        fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/shopitem/save?' + new URLSearchParams({ guildId: targetGuildId, name: shopItemNameInput.value, description: shopItemDescriptionInput.value, price: price, moneyRequired: shopItemMoneyRequiredInput.value, roleRequired: targetRole2, stock: stock, overstock: overStock, overstockPriceMult: overStockMult, targetItem: 'none' })).then((result) => {
                                            return result.json();
                                        }).then(({ msg }) => {
                                            if (msg === 'Success') {
                                                successPopup();
                                                shopItemNameInput.value = '';
                                                shopItemDescriptionInput.value = '';
                                                shopItemPriceInput.value = '';
                                                shopItemMoneyRequiredInput.value = '';
                                                shopItemRoleRequiredInput.value = '';
                                                targetRole2 = '';
                                                shopItemStockInput.value = '';
                                                shopItemOverstockInput.value = '';
                                                shopItemOverstockPriceMultInput.value = '';
                                                setTimeout(() => {
                                                    createServerShopItems();
                                                }, 2500);
                                            };
                                        });
                                    } else if (shopItemSaveButton.innerHTML === 'Save') {
                                        const targetItem3 = settings.shopItems.find(i => i.name.toLowerCase() === shopItemNameInput.value.toLowerCase());
                                        if (targetItem3 && targetShopItem !== targetItem3.name) {
                                            alert('An item with this name already exists!');
                                            return;
                                        };
                                        let targetRole2 = '';
                                        if (shopItemRoleRequiredInput.value !== '') {
                                            const role = roles.find(r => r.name.toLowerCase() === shopItemRoleRequiredInput.value.toLowerCase());
                                            if (role) {
                                                targetRole2 = role.id;
                                            };
                                        };
                                        fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/shopitem/save?' + new URLSearchParams({ guildId: targetGuildId, name: shopItemNameInput.value, description: shopItemDescriptionInput.value, price: price, moneyRequired: shopItemMoneyRequiredInput.value, roleRequired: targetRole2, stock: stock, overstock: overStock, overstockPriceMult: overStockMult, targetItem: targetShopItem })).then((result) => {
                                            return result.json();
                                        }).then(({ msg }) => {
                                            if (msg === 'Success') {
                                                successPopup();
                                                setTimeout(() => {
                                                    createServerShopItems();
                                                }, 2500);
                                            };
                                        });
                                    };
                                });
                            };
                            // Win Rates
                            slutWinRate.value = settings.winRates.slut.rate;
                            crimeWinRate.value = settings.winRates.crime.rate;
                            robWinRate.value = settings.winRates.rob.rate;
                            winRatesSaveButton.addEventListener('click', () => {
                                if (slutWinRate.value === '') {
                                    alert('Make sure to input a percentage for the slut win rate!');
                                    return;
                                };
                                if (crimeWinRate.value === '') {
                                    alert('Make sure to input a percentage for the crime win rate!');
                                    return;
                                };
                                if (robWinRate.value === '') {
                                    alert('Make sure to input a percentage for the rob win rate!');
                                    return;
                                };
                                fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/winrates/save?' + new URLSearchParams({ guildId: targetGuildId, slutRate: slutWinRate.value, crimeRate: crimeWinRate.value, robRate: robWinRate.value })).then((result) => {
                                    return result.json();
                                }).then(({ msg }) => {
                                    if (msg === 'Success') {
                                        successPopup();
                                    };
                                });
                            });
                            // Other
                            if (settings.creditStatus === 'enabled') {
                                creditSwitchSlider.style.left = '60%';
                                creditSwitchSlider.style.backgroundColor = 'var(--geGreen)';
                                creditSwitchSlider.className = 'slider-container-slider glowGreen';
                            } else {
                                creditSwitchSlider.style.left = '5%';
                                creditSwitchSlider.style.backgroundColor = 'red';
                                creditSwitchSlider.className = 'slider-container-slider glowRed';
                            };
                            if (settings.robStatus === 'enabled') {
                                robSwitchSlider.style.left = '60%';
                                robSwitchSlider.style.backgroundColor = 'var(--geGreen)';
                                robSwitchSlider.className = 'slider-container-slider glowGreen';
                            } else {
                                robSwitchSlider.style.left = '5%';
                                robSwitchSlider.style.backgroundColor = 'red';
                                robSwitchSlider.className = 'slider-container-slider glowRed';
                            };
                            maxBalanceInput.value = settings.maxBalance;
                            startingBalanceInput.value = settings.startingBalance;
                            currencyInput.value = settings.currency;
                            // const targetChannel = channels.find(c => c.id === settings.moneyAuditChannelId);
                            // if (targetChannel) {
                            //     moneyAuditInput.value = targetChannel.name;
                            // };
                            let enableCredit = settings.creditStatus;
                            let enableRob = settings.robStatus;
                            creditSwitchContainer.addEventListener('click', () => {
                                if (enableCredit === 'enabled') {
                                    enableCredit = 'disabled';
                                    creditSwitchSlider.style.left = '5%';
                                    creditSwitchSlider.style.backgroundColor = 'red';
                                    creditSwitchSlider.className = 'slider-container-slider glowRed';
                                } else {
                                    enableCredit = 'enabled';
                                    creditSwitchSlider.style.left = '60%';
                                    creditSwitchSlider.style.backgroundColor = 'var(--geGreen)';
                                    creditSwitchSlider.className = 'slider-container-slider glowGreen';
                                };
                            });
                            robSwitchContainer.addEventListener('click', () => {
                                if (enableRob === 'enabled') {
                                    enableRob = 'disabled';
                                    robSwitchSlider.style.left = '5%';
                                    robSwitchSlider.style.backgroundColor = 'red';
                                    robSwitchSlider.className = 'slider-container-slider glowRed';
                                } else {
                                    enableRob = 'enabled';
                                    robSwitchSlider.style.left = '60%';
                                    robSwitchSlider.style.backgroundColor = 'var(--geGreen)';
                                    robSwitchSlider.className = 'slider-container-slider glowGreen';
                                };
                            });
                            otherSaveButton.addEventListener('click', () => {
                                if (maxBalanceInput.value === '') {
                                    alert('Make sure to input an amount for the max balance!');
                                    return;
                                };
                                if (startingBalanceInput.value === '') {
                                    alert('Make sure to input an amount for the starting balance!');
                                    return;
                                };
                                if (currencyInput.value === '') {
                                    alert('Make sure to input an amount for the starting balance!');
                                    return;
                                };
                                const regExp = /[a-zA-Z]/g;
                                if (regExp.test(currencyInput.value)) {
                                    alert('Make sure to not include letters in the currency! Only emojis');
                                    return;
                                };
                                const hasNumber = /\d/;
                                if (hasNumber.test(currencyInput.value)) {
                                    alert('Make sure to not include numbers in the currency! Only emojis');
                                    return;
                                };
                                fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/other/save?' + new URLSearchParams({ guildId: targetGuildId, creditStatus: enableCredit, robStatus: enableRob, maxBalance: maxBalanceInput.value, startingBalance: startingBalanceInput.value, currency: currencyInput.value })).then((result) => {
                                    return result.json();
                                }).then(({ msg }) => {
                                    if (msg === 'Success') {
                                        successPopup();
                                    };
                                });
                            });
                            // Recurrences
                            if (settings.recurrences.payout.amount !== 0) {
                                payoutRecurrencesAmount.value = settings.recurrences.payout.amount;
                            };
                            if (settings.recurrences.tax.amount !== 0) {
                                taxRecurrencesAmount.value = settings.recurrences.tax.amount;
                            };
                            if (!(settings.recurrences.payout.interval / 86400).toString().includes(".") && (settings.recurrences.payout.interval / 1) > 0) {
                                // Days
                                payoutRecurrencesIntervalType.value = 'Days';
                                payoutRecurrencesIntervalAmount.value = (settings.recurrences.payout.interval / 86400)
                            } else if (!(settings.recurrences.payout.interval / 3600).toString().includes(".") && (settings.recurrences.payout.interval / 1) > 0) {
                                // Hours
                                payoutRecurrencesIntervalType.value = 'Hours';
                                payoutRecurrencesIntervalAmount.value = (settings.recurrences.payout.interval / 3600)
                            } else if (!(settings.recurrences.payout.interval / 60).toString().includes(".") && (settings.recurrences.payout.interval / 1) > 0) {
                                // Minutes
                                payoutRecurrencesIntervalType.value = 'Minutes';
                                payoutRecurrencesIntervalAmount.value = (settings.recurrences.payout.interval / 60)
                            } else if (!(settings.recurrences.payout.interval / 1).toString().includes(".") && (settings.recurrences.payout.interval / 1) > 0) {
                                // Seconds
                                payoutRecurrencesIntervalType.value = 'Seconds';
                                payoutRecurrencesIntervalAmount.value = (settings.recurrences.payout.interval / 1)
                            };
                            if (!(settings.recurrences.tax.interval / 86400).toString().includes(".") && (settings.recurrences.tax.interval / 1) > 0) {
                                // Days
                                taxRecurrencesIntervalType.value = 'Days';
                                taxRecurrencesIntervalAmount.value = (settings.recurrences.tax.interval / 86400)
                            } else if (!(settings.recurrences.tax.interval / 3600).toString().includes(".") && (settings.recurrences.tax.interval / 1) > 0) {
                                // Hours
                                taxRecurrencesIntervalType.value = 'Hours';
                                taxRecurrencesIntervalAmount.value = (settings.recurrences.tax.interval / 3600)
                            } else if (!(settings.recurrences.tax.interval / 60).toString().includes(".") && (settings.recurrences.tax.interval / 1) > 0) {
                                // Minutes
                                taxRecurrencesIntervalType.value = 'Minutes';
                                taxRecurrencesIntervalAmount.value = (settings.recurrences.tax.interval / 60)
                            } else if (!(settings.recurrences.tax.interval / 1).toString().includes(".") && (settings.recurrences.tax.interval / 1) > 0) {
                                // Seconds
                                taxRecurrencesIntervalType.value = 'Seconds';
                                taxRecurrencesIntervalAmount.value = (settings.recurrences.tax.interval / 1)
                            };
                            recurrencesSaveButton.addEventListener('click', () => {
                                if (payoutRecurrencesAmount.value !== '') {
                                    if (payoutRecurrencesIntervalAmount.value === '' || payoutRecurrencesIntervalType.value === '') {
                                        alert('Make sure to not fill all fields for the recurring payout!');
                                        return;
                                    };
                                };
                                if (payoutRecurrencesIntervalAmount.value !== '') {
                                    if (payoutRecurrencesAmount.value === '' || payoutRecurrencesIntervalType.value === '') {
                                        alert('Make sure to not fill all fields for the recurring payout!');
                                        return;
                                    };
                                };
                                if (payoutRecurrencesIntervalType.value !== '') {
                                    if (payoutRecurrencesIntervalAmount.value === '' || payoutRecurrencesAmount.value === '') {
                                        alert('Make sure to not fill all fields for the recurring payout!');
                                        return;
                                    };
                                };
                                if (taxRecurrencesAmount.value !== '') {
                                    if (taxRecurrencesIntervalAmount.value === '' || taxRecurrencesIntervalType.value === '') {
                                        alert('Make sure to not fill all fields for the recurring tax!');
                                        return;
                                    };
                                };
                                if (taxRecurrencesIntervalAmount.value !== '') {
                                    if (taxRecurrencesAmount.value === '' || taxRecurrencesIntervalType.value === '') {
                                        alert('Make sure to not fill all fields for the recurring tax!');
                                        return;
                                    };
                                };
                                if (taxRecurrencesIntervalType.value !== '') {
                                    if (taxRecurrencesIntervalAmount.value === '' || taxRecurrencesAmount.value === '') {
                                        alert('Make sure to not fill all fields for the recurring tax!');
                                        return;
                                    };
                                };
                                if (!timeUnits.includes(payoutRecurrencesIntervalType.value.toLowerCase()) && payoutRecurrencesIntervalType.value !== '') {
                                    alert('Make sure to input a proper interval for recurring payout!');
                                    return;
                                };
                                if (!timeUnits.includes(taxRecurrencesIntervalType.value.toLowerCase()) && taxRecurrencesIntervalType.value !== '') {
                                    alert('Make sure to input a proper interval for recurring tax!');
                                    return;
                                };
                                fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/recurrences/save?' + new URLSearchParams({ guildId: targetGuildId, payoutAmount: payoutRecurrencesAmount.value, payoutIntervalAmount: payoutRecurrencesIntervalAmount.value, payoutIntervalType: payoutRecurrencesIntervalType.value.toLowerCase(), taxAmount: taxRecurrencesAmount.value, taxIntervalAmount: taxRecurrencesIntervalAmount.value, taxIntervalType: taxRecurrencesIntervalType.value.toLowerCase() })).then((result) => {
                                    return result.json();
                                }).then(({ msg }) => {
                                    if (msg === 'Success') {
                                        successPopup();
                                        alert('Please allow for 1 minute to go by for the recurrences to take effect!');
                                    };
                                });
                            });
                            // Coupons
                            createCoupons();
                            // Sales
                            createSales();
                            // Membershops

                            fetch('https://api.godseyeofficial.xyz/api/guild/economy/membershops?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then(({ msg, membershops }) => {
                                if (msg === 'Success') {
                                    membershops.forEach((shop) => {
                                        const item = document.createElement('li');
                                        item.className = 'section-container-list-membershop-item';
                                        memberShopList.appendChild(item);
                                        const center1 = document.createElement('div');
                                        center1.className = 'section-container-list-membershop-item-name center-vert';
                                        item.appendChild(center1);
                                        const name = document.createElement('h2');
                                        name.className = 'section-container-list-membershop-item-name-text';
                                        name.innerHTML = `${shop.shopName}`;
                                        center1.appendChild(name);
                                        const buttonContainer = document.createElement('div');
                                        buttonContainer.className = 'section-container-list-membershop-item-buttoncontainer';
                                        item.appendChild(buttonContainer);
                                        const viewButton = document.createElement('button');
                                        viewButton.className = 'section-container-list-membershop-item-buttoncontainer-view';
                                        viewButton.innerHTML = 'View';
                                        buttonContainer.appendChild(viewButton);
                                        viewButton.addEventListener('click', () => {
                                            memberShopNameInsert.innerHTML = `${shop.shopName}`;
                                            const targetMember = members.find(m => m.id === shop.memberId);
                                            if (targetMember) {
                                                memberShopOwnerInsert.innerHTML = `${targetMember.name}`;
                                            } else {
                                                memberShopOwnerInsert.innerHTML = 'N/A'
                                            };
                                            if (shop.items) {
                                                memberShopItemsList.innerHTML = '';
                                                shop.items.forEach((shopItem) => {
                                                    const item = document.createElement('li');
                                                    item.className = 'section-container-list-membershop-item-shopitem';
                                                    memberShopItemsList.appendChild(item);
                                                    const center1 = document.createElement('div');
                                                    center1.className = 'section-container-list-membershop-item-shopitem-name center-vert';
                                                    item.appendChild(center1);
                                                    const name = document.createElement('h2');
                                                    name.className = 'section-container-list-membershop-item-shopitem-name-text';
                                                    name.innerHTML = `${shopItem.name}`;
                                                    center1.appendChild(name);
                                                    const buttonContainer = document.createElement('div');
                                                    buttonContainer.className = 'section-container-list-membershop-item-shopitem-buttoncontainer';
                                                    item.appendChild(buttonContainer);
                                                    const viewItemButton = document.createElement('button');
                                                    viewItemButton.className = 'section-container-list-membershop-item-shopitem-buttoncontainer-view';
                                                    viewItemButton.innerHTML = 'View';
                                                    buttonContainer.appendChild(viewItemButton);
                                                    viewItemButton.addEventListener('click', () => {
                                                        memberShopItemInfoPanel.style.display = 'block';
                                                        memberShopItemInfoName.innerHTML = shopItem.name;
                                                        memberShopItemInfoprice.innerHTML = shopItem.price;
                                                        memberShopItemInfoDescription.innerHTML = shopItem.description || 'None';
                                                        memberShopItemInfoMoneyRequired.innerHTML = shopItem.moneyRequired || 'None';
                                                        const targetRole = roles.find(r => r.id === shopItem.roleRequired);
                                                        if (targetRole) {
                                                            memberShopItemInfoRoleRequired.innerHTML = targetRole.name;
                                                        } else {
                                                            memberShopItemInfoRoleRequired.innerHTML = 'None';
                                                        }
                                                        memberShopItemInfoStock.innerHTML = shopItem.stock || 'None';
                                                        memberShopItemInfoOverstock.innerHTML = shopItem.overStock || 'None';
                                                    });
                                                });
                                            };
                                        });
                                    });
                                };
                            });
                            memberShopItemInfoCloseButton.addEventListener('click', () => {
                                memberShopItemInfoPanel.style.display = 'none';
                                memberShopItemInfoName.innerHTML = '';
                                memberShopItemInfoprice.innerHTML = '';
                                memberShopItemInfoDescription.innerHTML = '';
                                memberShopItemInfoMoneyRequired.innerHTML = '';
                                memberShopItemInfoRoleRequired.innerHTML = '';
                                memberShopItemInfoStock.innerHTML = '';
                                memberShopItemInfoOverstock.innerHTML = '';
                            });

                            // Membershop COupons
                            fetch('https://api.godseyeofficial.xyz/api/guild/economy/membershopcoupons?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then(({ msg, memberShopCoupons }) => {
                                if (msg === 'Success') {
                                    memberShopCoupons.forEach((coupon) => {
                                        const item = document.createElement('li');
                                        item.className = 'section-container-list-item-servercoupon';
                                        memberCoupons.appendChild(item);
                                        const nameContainer = document.createElement('div');
                                        nameContainer.className = 'section-container-list-item-container';
                                        const descContainer = document.createElement('div');
                                        descContainer.className = 'section-container-list-item-container';
                                        const allowContainer = document.createElement('div');
                                        allowContainer.className = 'section-container-list-item-container';
                                        const reqContainer = document.createElement('div');
                                        reqContainer.className = 'section-container-list-item-container';
                                        const maxContainer = document.createElement('div');
                                        maxContainer.className = 'section-container-list-item-container';
                                        item.appendChild(nameContainer);
                                        item.appendChild(descContainer);
                                        item.appendChild(allowContainer);
                                        item.appendChild(reqContainer);
                                        item.appendChild(maxContainer);
                                        // name container
                                        const center1 = document.createElement('div');
                                        center1.className = 'center-vert couponname-container';
                                        nameContainer.appendChild(center1);
                                        const name = document.createElement('li');
                                        name.className = 'section-container-list-item-name-2';
                                        name.innerHTML = `Name: ${coupon.discountName}`;
                                        center1.appendChild(name);
                                        const center2 = document.createElement('div');
                                        center2.className = 'center-vert coupontype-container';
                                        nameContainer.appendChild(center2);
                                        const type = document.createElement('li');
                                        type.className = 'section-container-list-item-type-2';
                                        type.innerHTML = `Type: ${coupon.discountType}`;
                                        center2.appendChild(type);
                                        const center3 = document.createElement('div');
                                        center3.className = 'center-vert couponamount-container';
                                        nameContainer.appendChild(center3);
                                        const amount = document.createElement('li');
                                        amount.className = 'section-container-list-item-amount-2';
                                        amount.innerHTML = `Amount: ${coupon.discountAmount}`;
                                        center3.appendChild(amount);
                                        const center6 = document.createElement('div');
                                        center6.className = 'center-vert coupondescription-container';
                                        descContainer.appendChild(center6);
                                        const description = document.createElement('li');
                                        description.className = 'section-container-list-item-description-2';
                                        if (coupon.description) {
                                            description.innerHTML = `Desc: ${coupon.description}`;
                                        } else {
                                            description.innerHTML = `Desc: None`;
                                        };
                                        center6.appendChild(description);
                                        const center7 = document.createElement('div');
                                        center7.className = 'center-vert couponalloweditems-container';
                                        allowContainer.appendChild(center7);
                                        const allowedItems = document.createElement('li');
                                        allowedItems.className = 'section-container-list-item-alloweditems-2';
                                        if (coupon.allowedItems) {
                                            allowedItems.innerHTML = `Allowed Items: ${coupon.allowedItems}`;
                                        } else {
                                            allowedItems.innerHTML = `Allowed Items: None`;
                                        };
                                        center7.appendChild(allowedItems);
                                        const center8 = document.createElement('div');
                                        center8.className = 'center-vert couponrequiredcost-container';
                                        reqContainer.appendChild(center8);
                                        const requiredCost = document.createElement('li');
                                        requiredCost.className = 'section-container-list-item-requiredcost-2';
                                        if (coupon.requiredCost) {
                                            requiredCost.innerHTML = `Req Cost: ${coupon.requiredCost}`;
                                        } else {
                                            requiredCost.innerHTML = `Req Cost: None`;
                                        };
                                        center8.appendChild(requiredCost);
                                        const center9 = document.createElement('div');
                                        center9.className = 'center-vert couponrequiredrole-container';
                                        reqContainer.appendChild(center9);
                                        const requiredRole = document.createElement('li');
                                        requiredRole.className = 'section-container-list-item-requiredrole-2';
                                        if (coupon.roleRequired) {
                                            requiredRole.innerHTML = `Req Role: ${coupon.roleRequired}`;
                                        } else {
                                            requiredRole.innerHTML = `Req Role: None`;
                                        };
                                        center9.appendChild(requiredRole);
                                        const center10 = document.createElement('div');
                                        center10.className = 'center-vert couponrequireditemquantity-container';
                                        reqContainer.appendChild(center10);
                                        const requiredItemQuantity = document.createElement('li');
                                        requiredItemQuantity.className = 'section-container-list-item-requireditemquantity-2';
                                        if (coupon.requiredItemQuantity) {
                                            requiredItemQuantity.innerHTML = `Req Item Qty: ${coupon.requiredItemQuantity}`;
                                        } else {
                                            requiredItemQuantity.innerHTML = `Req Item Qty: None`;
                                        };
                                        center10.appendChild(requiredItemQuantity);
                                        const center5 = document.createElement('div');
                                        center5.className = 'center-vert couponexpire-container';
                                        maxContainer.appendChild(center5);
                                        const expire = document.createElement('li');
                                        expire.className = 'section-container-list-item-expire-2';
                                        if (!coupon.expirationDate) {
                                            expire.innerHTML = `Expiration: None`;
                                        } else {
                                            const date = new Date(coupon.expirationDate);
                                            const expDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                                            expire.innerHTML = `Expiration: ${expDate}`;
                                        };
                                        center5.appendChild(expire);
                                        const center4 = document.createElement('div');
                                        center4.className = 'center-vert couponuses-container';
                                        maxContainer.appendChild(center4);
                                        const uses = document.createElement('li');
                                        uses.className = 'section-container-list-item-uses-2';
                                        uses.innerHTML = `Uses: ${coupon.totalUses}`;
                                        center4.appendChild(uses);
                                    });
                                };
                            });

                            fetch('https://api.godseyeofficial.xyz/api/guild/economy/membershopsales?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then(({ msg, memberShopSales }) => {
                                if (msg === 'Success') {
                                    memberShopSales.forEach((sale) => {
                                        const item = document.createElement('li');
                                        item.className = 'section-container-list-item-serversale';
                                        memberSales.appendChild(item);
                                        const nameContainer = document.createElement('div');
                                        nameContainer.className = 'section-container-list-item-container';
                                        const descContainer = document.createElement('div');
                                        descContainer.className = 'section-container-list-item-container';
                                        const allowContainer = document.createElement('div');
                                        allowContainer.className = 'section-container-list-item-container';
                                        const reqContainer = document.createElement('div');
                                        reqContainer.className = 'section-container-list-item-container';
                                        const maxContainer = document.createElement('div');
                                        maxContainer.className = 'section-container-list-item-container';
                                        item.appendChild(nameContainer);
                                        item.appendChild(descContainer);
                                        item.appendChild(allowContainer);
                                        item.appendChild(reqContainer);
                                        item.appendChild(maxContainer);
                                        // name container
                                        const center1 = document.createElement('div');
                                        center1.className = 'center-vert salename-container';
                                        nameContainer.appendChild(center1);
                                        const name = document.createElement('li');
                                        name.className = 'section-container-list-item-name-2';
                                        name.innerHTML = `Name: ${sale.discountName}`;
                                        center1.appendChild(name);
                                        const center2 = document.createElement('div');
                                        center2.className = 'center-vert saletype-container';
                                        nameContainer.appendChild(center2);
                                        const type = document.createElement('li');
                                        type.className = 'section-container-list-item-type-2';
                                        type.innerHTML = `Type: ${sale.discountType}`;
                                        center2.appendChild(type);
                                        const center3 = document.createElement('div');
                                        center3.className = 'center-vert saleamount-container';
                                        nameContainer.appendChild(center3);
                                        const amount = document.createElement('li');
                                        amount.className = 'section-container-list-item-amount-2';
                                        amount.innerHTML = `Amount: ${sale.discountAmount}`;
                                        center3.appendChild(amount);
                                        const center6 = document.createElement('div');
                                        center6.className = 'center-vert saledescription-container';
                                        descContainer.appendChild(center6);
                                        const description = document.createElement('li');
                                        description.className = 'section-container-list-item-description-2';
                                        if (sale.description) {
                                            description.innerHTML = `Desc: ${sale.description}`;
                                        } else {
                                            description.innerHTML = `Desc: None`;
                                        };
                                        center6.appendChild(description);
                                        const center7 = document.createElement('div');
                                        center7.className = 'center-vert couponalloweditems-container';
                                        allowContainer.appendChild(center7);
                                        const allowedItems = document.createElement('li');
                                        allowedItems.className = 'section-container-list-item-alloweditems-2';
                                        if (sale.allowedItems) {
                                            allowedItems.innerHTML = `Allowed Items: ${sale.allowedItems}`;
                                        } else {
                                            allowedItems.innerHTML = `Allowed Items: None`;
                                        };
                                        center7.appendChild(allowedItems);
                                        const center8 = document.createElement('div');
                                        center8.className = 'center-vert salerequiredcost-container';
                                        reqContainer.appendChild(center8);
                                        const requiredCost = document.createElement('li');
                                        requiredCost.className = 'section-container-list-item-requiredcost-2';
                                        if (sale.requiredCost) {
                                            requiredCost.innerHTML = `Req Cost: ${sale.requiredCost}`;
                                        } else {
                                            requiredCost.innerHTML = `Req Cost: None`;
                                        };
                                        center8.appendChild(requiredCost);
                                        const center9 = document.createElement('div');
                                        center9.className = 'center-vert salerequiredrole-container';
                                        reqContainer.appendChild(center9);
                                        const requiredRole = document.createElement('li');
                                        requiredRole.className = 'section-container-list-item-requiredrole-2';
                                        if (sale.roleRequired) {
                                            const role = roles.find((r) => r.id === sale.roleRequired);
                                            if (role) {
                                                requiredRole.innerHTML = `Req Role: ${role.name}`;
                                            };
                                        } else {
                                            requiredRole.innerHTML = `Req Role: None`;
                                        };
                                        center9.appendChild(requiredRole);
                                        const center10 = document.createElement('div');
                                        center10.className = 'center-vert salerequireditemquantity-container';
                                        reqContainer.appendChild(center10);
                                        const requiredItemQuantity = document.createElement('li');
                                        requiredItemQuantity.className = 'section-container-list-item-requireditemquantity-2';
                                        if (sale.requiredItemQuantity) {
                                            requiredItemQuantity.innerHTML = `Req Item Qty: ${sale.requiredItemQuantity}`;
                                        } else {
                                            requiredItemQuantity.innerHTML = `Req Item Qty: None`;
                                        };
                                        center10.appendChild(requiredItemQuantity);
                                        const center5 = document.createElement('div');
                                        center5.className = 'center-vert saleexpire-container';
                                        maxContainer.appendChild(center5);
                                        const expire = document.createElement('li');
                                        expire.className = 'section-container-list-item-expire-2';
                                        if (!sale.expirationDate) {
                                            expire.innerHTML = `Expiration: None`;
                                        } else {
                                            expire.innerHTML = `Expiration: ${sale.expirationDate}`;
                                        };
                                        center5.appendChild(expire);
                                        const center4 = document.createElement('div');
                                        center4.className = 'center-vert saleuses-container';
                                        maxContainer.appendChild(center4);
                                        const uses = document.createElement('li');
                                        uses.className = 'section-container-list-item-uses-2';
                                        uses.innerHTML = `Uses: ${sale.totalUses}`;
                                        center4.appendChild(uses);
                                    });
                                };
                            });
                            // Money Roles
                            createMoneyRoles();
                            moneyRoleSaveButton.addEventListener('click', (listener) => {
                                const targetRole = roles.find(r => r.name.toLowerCase() === moneyRoleRoleInput.value.toLowerCase());
                                const periodAmount = moneyRolePeriodAmountInput.value;
                                const periodType = moneyRolePeriodTypeInput.value;
                                const amount = moneyRoleAmountInput.value;
                                const account = moneyRoleAccountInput.value;
                                const periodList = ['seconds', 'minutes', 'hours', 'days'];
                                const accountTypeList = ['bank', 'inhand'];
                                if (!moneyRoleRoleInput.value === '') {
                                    alert('A role name must be entered!');
                                    return;
                                };
                                if (!targetRole) {
                                    alert('This role does not exist please check spelling!');
                                    return;
                                };
                                if (!periodAmount) {
                                    alert('A period amount must be entered!');
                                    return;
                                };
                                if (!periodType) {
                                    alert('A period type must be entered!');
                                    return;
                                };
                                if (!account) {
                                    alert('An account type must be entered!');
                                    return;
                                };
                                if (!periodList.includes(periodType.toLowerCase())) {
                                    alert('Please choose a correct period type!');
                                    return;
                                };
                                if (!accountTypeList.includes(account.toLowerCase())) {
                                    alert('Please choose a correct account type!');
                                    return;
                                };
                                if (moneyRoleSaveButton.innerHTML === 'Create') {
                                    fetch('https://api.godseyeofficial.xyz/api/guild/economy/moneyroles/save?' + new URLSearchParams({ guildId: targetGuildId, amount: amount, periodTime: periodAmount, periodType: periodType.toLowerCase(), roleId: targetRole.id, bankType: account.toLowerCase(), targetRole: targetMoneyRole })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            successPopup();
                                            moneyRoleRoleInput.value = '';
                                            moneyRolePeriodAmountInput.value = '';
                                            moneyRolePeriodTypeInput.value = '';
                                            moneyRoleAmountInput.value = '';
                                            moneyRoleAccountInput.value = '';
                                            targetMoneyRole = 'None';
                                            setTimeout(() => {
                                                moneyRoleSaveButton.removeEventListener('click', listener)
                                                createMoneyRoles();
                                            }, 2500);
                                        };
                                    });
                                } else {
                                    fetch('https://api.godseyeofficial.xyz/api/guild/economy/moneyroles/save?' + new URLSearchParams({ guildId: targetGuildId, amount: amount, periodTime: periodAmount, periodType: periodType.toLowerCase(), roleId: targetRole.id, bankType: account.toLowerCase(), targetRole: targetMoneyRole })).then((result) => {
                                        return result.json();
                                    }).then(({ msg }) => {
                                        if (msg === 'Success') {
                                            successPopup();
                                            setTimeout(() => {
                                                moneyRoleSaveButton.removeEventListener('click', listener)
                                                createMoneyRoles();
                                            }, 2500);
                                        };
                                    });
                                };
                            });
                            // Loans
                            fetch('https://api.godseyeofficial.xyz/api/guild/economy/loans?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                return result.json();
                            }).then(({ msg, loans }) => {
                                if (msg === 'Success') {
                                    loans.forEach((loan) => {
                                        const item = document.createElement('div');
                                        item.className = 'loancontainer';
                                        loanList.appendChild(item);
                                        const amountContainer = document.createElement('div');
                                        amountContainer.className = 'loancontainer-amountcontainer';
                                        item.appendChild(amountContainer);
                                        const amountText = document.createElement('h2');
                                        amountText.className = 'loancontainer-text';
                                        amountText.innerHTML = `Initial: ${loan.originalAmount} Paid: ${loan.amountPaid} Total: ${loan.amount}`;
                                        amountContainer.appendChild(amountText);
                                        const interestContainer = document.createElement('div');
                                        interestContainer.className = 'loancontainer-interestcontainer';
                                        item.appendChild(interestContainer);
                                        const interestText = document.createElement('h2');
                                        interestText.className = 'loancontainer-text';
                                        interestText.innerHTML = `Interest: ${loan.interestRate}%`;
                                        interestContainer.appendChild(interestText);
                                        const paymentsContainer = document.createElement('div');
                                        paymentsContainer.className = 'loancontainer-paymentscontainer';
                                        item.appendChild(paymentsContainer);
                                        const paymentsText = document.createElement('h2');
                                        paymentsText.className = 'loancontainer-text';
                                        paymentsText.innerHTML = `Payments: ${loan.paymentsNeeded}`;
                                        paymentsContainer.appendChild(paymentsText);
                                        const periodContainer = document.createElement('div');
                                        periodContainer.className = 'loancontainer-periodcontainer';
                                        item.appendChild(periodContainer);
                                        const periodText = document.createElement('h2');
                                        periodText.className = 'loancontainer-text';
                                        periodText.innerHTML = `Period: ${loan.periodTime} ${loan.periodType}`;
                                        periodContainer.appendChild(periodText);
                                        const buttonContainer = document.createElement('div');
                                        buttonContainer.className = 'loancontainer-buttonContainer';
                                        item.appendChild(buttonContainer);
                                        const forgiveButton = document.createElement('button');
                                        forgiveButton.className = 'loancontainer-buttonContainer-button';
                                        forgiveButton.innerHTML = 'Forgive';
                                        buttonContainer.appendChild(forgiveButton);
                                        forgiveButton.addEventListener('click', () => {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/economy/loans/forgive?' + new URLSearchParams({ guildId: targetGuildId, memberId: loan._id.split(",")[0] })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg === 'Success') {
                                                    successPopup();
                                                    item.remove();
                                                };
                                            });
                                        });
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

                            function createReplies() {
                                fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                    return result.json();
                                }).then(({ msg, settings }) => {
                                    const msg1 = msg;
                                    if (msg1 === 'Reload') {
                                        createReplies();
                                        return;
                                    };
                                    replyList.innerHTML = '';
                                    Object.keys(settings.replies).forEach((key) => {
                                        Object.keys(settings.replies[key]).forEach((key2) => {
                                            settings.replies[key][key2].forEach((reply) => {
                                                const item = document.createElement('li');
                                                item.className = 'section-container-list-item';
                                                replyList.appendChild(item);
                                                const topContainer = document.createElement('div');
                                                topContainer.className = 'section-container-list-item-topcontainer';
                                                item.appendChild(topContainer);
                                                const commandName = document.createElement('div');
                                                commandName.className = 'section-container-list-item-name';
                                                topContainer.appendChild(commandName);
                                                const commandNameText = document.createElement('h2');
                                                commandNameText.className = 'section-container-list-item-name-text';
                                                commandNameText.innerHTML = `Command: ${key}`;
                                                commandName.appendChild(commandNameText);
                                                const replyType = document.createElement('div');
                                                replyType.className = 'section-container-list-item-replytype';
                                                topContainer.appendChild(replyType);
                                                const replyTypeText = document.createElement('h2');
                                                replyTypeText.className = 'section-container-list-item-replytype-text';
                                                replyTypeText.innerHTML = `Type: ${key2}`;
                                                replyType.appendChild(replyTypeText);
                                                const optionButton = document.createElement('button');
                                                optionButton.className = 'section-container-list-item-option';
                                                optionButton.innerHTML = 'Options';
                                                topContainer.appendChild(optionButton);
                                                const bottomContainer = document.createElement('div');
                                                bottomContainer.className = 'section-container-list-item-bottomcontainer';
                                                item.appendChild(bottomContainer);
                                                const replyMessage = document.createElement('div');
                                                replyMessage.className = 'section-container-list-item-replymessage';
                                                bottomContainer.appendChild(replyMessage);
                                                const replyMessageText = document.createElement('p');
                                                replyMessageText.className = 'section-container-list-item-replymessage-text';
                                                replyMessageText.innerHTML = reply.split("<").join("﹤").split(">").join("﹥");
                                                replyMessage.appendChild(replyMessageText);
                                                const span = document.createElement('span');
                                                span.className = 'section-container-list-item-span';
                                                item.appendChild(span);
                                                const editButton = document.createElement('button');
                                                editButton.className = 'section-container-list-item-span-edit';
                                                editButton.innerHTML = 'Edit';
                                                span.appendChild(editButton);
                                                const deleteButton = document.createElement('button');
                                                deleteButton.className = 'section-container-list-item-span-delete';
                                                deleteButton.innerHTML = 'Delete';
                                                span.appendChild(deleteButton);
                                                optionButton.addEventListener('click', () => {
                                                    span.style.display = 'flex';
                                                    span.style.opacity = '100%';
                                                });
                                                span.addEventListener('mouseleave', () => {
                                                    span.style.display = 'none';
                                                    span.style.opacity = '0%';
                                                });
                                                editButton.addEventListener('click', () => {
                                                    targetReply = reply;
                                                    replyCommandInput.value = key;
                                                    replyCommandInput.readOnly = true;
                                                    replyTypeInput.value = key2;
                                                    replyTypeInput.readOnly = true;
                                                    replyMessageInput.value = reply;
                                                    replySaveButton.innerHTML = 'Save';
                                                });
                                                deleteButton.addEventListener('click', () => {
                                                    const confirmation = confirm('Are you sure you wish to delete this reply?');
                                                    if (confirmation === true) {
                                                        fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/reply/delete?' + new URLSearchParams({ guildId: targetGuildId, command: key, type: key2, message: reply })).then((result) => {
                                                            return result.json();
                                                        }).then(({ msg }) => {
                                                            if (msg === 'Success') {
                                                                window.location.reload();
                                                            };
                                                        });
                                                    };
                                                });
                                            });
                                        });
                                    });
                                });
                            }

                            function createServerShopItems() {
                                fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                    return result.json();
                                }).then(({ msg, settings }) => {
                                    const msg1 = msg;
                                    if (msg1 === 'Reload') {
                                        createReplies();
                                        return;
                                    };
                                    shopItemsList.innerHTML = '';
                                    settings.shopItems.forEach((shopItem) => {
                                        const item = document.createElement('li');
                                        item.className = 'section-container-list-shopitems-item';
                                        shopItemsList.appendChild(item);
                                        const topContainer = document.createElement('div');
                                        topContainer.className = 'section-container-list-shopitems-item-topcontainer';
                                        item.appendChild(topContainer);
                                        const middleContainer = document.createElement('div');
                                        middleContainer.className = 'section-container-list-shopitems-item-middlecontainer';
                                        item.appendChild(middleContainer);
                                        const middleContainer2 = document.createElement('div');
                                        middleContainer2.className = 'section-container-list-shopitems-item-middlecontainer2';
                                        item.appendChild(middleContainer2);
                                        const bottomContainer = document.createElement('div');
                                        bottomContainer.className = 'section-container-list-shopitems-item-bottomcontainer';
                                        item.appendChild(bottomContainer);
                                        const nameContainer = document.createElement('div');
                                        nameContainer.className = 'section-container-list-shopitems-item-topcontainer-namecontainer';
                                        topContainer.appendChild(nameContainer);
                                        const center1 = document.createElement('div');
                                        center1.className = 'center-vert no-wrap';
                                        nameContainer.appendChild(center1);
                                        const nameText = document.createElement('h2');
                                        nameText.className = 'section-container-list-shopitems-item-topcontainer-namecontainer-text';
                                        nameText.innerHTML = `Name: ${shopItem.name}`;
                                        center1.appendChild(nameText);
                                        const priceContainer = document.createElement('div');
                                        priceContainer.className = 'section-container-list-shopitems-item-topcontainer-pricecontainer';
                                        topContainer.appendChild(priceContainer);
                                        const center2 = document.createElement('div');
                                        center2.className = 'center-vert no-wrap';
                                        priceContainer.appendChild(center2);
                                        const priceText = document.createElement('h2');
                                        priceText.className = 'section-container-list-shopitems-item-topcontainer-pricecontainer-text';
                                        priceText.innerHTML = `Price: ${parseInt(shopItem.price).toLocaleString()}`;
                                        center2.appendChild(priceText);
                                        const descriptionContainer = document.createElement('div');
                                        descriptionContainer.className = 'section-container-list-shopitems-item-middlecontainer-descriptioncontainer';
                                        middleContainer.appendChild(descriptionContainer);
                                        const descriptionText = document.createElement('p');
                                        descriptionText.className = 'section-container-list-shopitems-item-middlecontainer-descriptioncontainer-text';
                                        if (shopItem.description !== null) {
                                            descriptionText.innerHTML = `Desc: ${shopItem.description}`;
                                        } else {
                                            descriptionText.innerHTML = `Desc: None`;
                                        };
                                        descriptionContainer.appendChild(descriptionText);
                                        const requiredCostContainer = document.createElement('div');
                                        requiredCostContainer.className = 'section-container-list-shopitems-item-middlecontainer2-requiredcostcontainer';
                                        middleContainer2.appendChild(requiredCostContainer);
                                        const center = document.createElement('div');
                                        center.className = 'center-vert no-wrap';
                                        requiredCostContainer.appendChild(center);
                                        const requiredCostText = document.createElement('p');
                                        requiredCostText.className = 'section-container-list-shopitems-item-middlecontainer2-requiredcostcontainer-text';
                                        if (shopItem.moneyRequired !== null) {
                                            requiredCostText.innerHTML = `Req Cost: ${parseInt(shopItem.moneyRequired).toLocaleString()}`;
                                        } else {
                                            requiredCostText.innerHTML = `Req Cost: None`;
                                        };
                                        center.appendChild(requiredCostText);
                                        const requiredRoleContainer = document.createElement('div');
                                        requiredRoleContainer.className = 'section-container-list-shopitems-item-middlecontainer2-requiredrolecontainer';
                                        middleContainer2.appendChild(requiredRoleContainer);
                                        const center3 = document.createElement('div');
                                        center3.className = 'center-vert no-wrap';
                                        requiredRoleContainer.appendChild(center3);
                                        const requiredRoleText = document.createElement('p');
                                        requiredRoleText.className = 'section-container-list-shopitems-item-middlecontainer2-requiredrolecontainer-text';
                                        if (shopItem.roleRequired !== null) {
                                            const targetRole = roles.find(r => r.id === shopItem.roleRequired);
                                            if (targetRole) {
                                                requiredRoleText.innerHTML = `Role: ${targetRole.name}`;
                                            } else {
                                                requiredRoleText.innerHTML = 'Role: Deleted Role';
                                            };
                                        } else {
                                            requiredRoleText.innerHTML = 'Role: None';
                                        };
                                        center3.appendChild(requiredRoleText);
                                        const stockContainer = document.createElement('div');
                                        stockContainer.className = 'section-container-list-shopitems-item-bottomcontainer-stockcontainer';
                                        bottomContainer.appendChild(stockContainer);
                                        const center4 = document.createElement('div');
                                        center4.className = 'center-vert no-wrap';
                                        stockContainer.appendChild(center4);
                                        const stockText = document.createElement('h2');
                                        stockText.className = 'section-container-list-shopitems-item-bottomcontainer-stockcontainer-text';
                                        if (shopItem.stock !== null) {
                                            stockText.innerHTML = `Stock: ${shopItem.stock} units`;
                                        } else {
                                            stockText.innerHTML = `Stock: ∞ units`;
                                        };
                                        center4.appendChild(stockText);
                                        const overstockContainer = document.createElement('div');
                                        overstockContainer.className = 'section-container-list-shopitems-item-bottomcontainer-overstockcontainer';
                                        bottomContainer.appendChild(overstockContainer);
                                        const center5 = document.createElement('div');
                                        center5.className = 'center-vert no-wrap';
                                        overstockContainer.appendChild(center5);
                                        const overstockText = document.createElement('h2');
                                        overstockText.className = 'section-container-list-shopitems-item-bottomcontainer-overstockcontainer-text';
                                        if (shopItem.overStock !== null) {
                                            overstockText.innerHTML = `Overstock: ${parseInt(shopItem.overStock).toLocaleString()} units`;
                                        } else {
                                            overstockText.innerHTML = `Overstock: None`;
                                        };
                                        center5.appendChild(overstockText);
                                        const overstockMultContainer = document.createElement('div');
                                        overstockMultContainer.className = 'section-container-list-shopitems-item-bottomcontainer-overstockmultcontainer';
                                        bottomContainer.appendChild(overstockMultContainer);
                                        const center6 = document.createElement('div');
                                        center6.className = 'center-vert no-wrap';
                                        overstockMultContainer.appendChild(center6);
                                        const overstockMultText = document.createElement('h2');
                                        overstockMultText.className = 'section-container-list-shopitems-item-bottomcontainer-overstockmultcontainer-text';
                                        if (shopItem.overStockPriceMultiplier !== null) {
                                            overstockMultText.innerHTML = `Overstock Price: ${parseInt(shopItem.overStockPriceMultiplier).toLocaleString()}x`;
                                        } else {
                                            overstockMultText.innerHTML = `Overstock Price: None`;
                                        };
                                        center6.appendChild(overstockMultText);
                                        const buttonContainer = document.createElement('li');
                                        buttonContainer.className = 'section-container-list-shopitems-buttonContainer';
                                        shopItemsList.appendChild(buttonContainer);
                                        const editButton = document.createElement('button');
                                        editButton.className = 'section-container-list-shopitems-buttonContainer-button';
                                        editButton.innerHTML = 'Edit';
                                        buttonContainer.appendChild(editButton);
                                        const deleteButton = document.createElement('button');
                                        deleteButton.className = 'section-container-list-shopitems-buttonContainer-button';
                                        deleteButton.innerHTML = 'Delete';
                                        buttonContainer.appendChild(deleteButton);
                                        editButton.addEventListener('click', () => {
                                            targetShopItem = shopItem.name;
                                            shopItemSaveButton.innerHTML = 'Save';
                                            shopItemNameInput.value = shopItem.name;
                                            if (shopItem.description !== null) {
                                                shopItemDescriptionInput.value = shopItem.description;
                                            };
                                            shopItemPriceInput.value = shopItem.price;
                                            if (shopItem.moneyRequired !== null) {
                                                shopItemMoneyRequiredInput.value = shopItem.moneyRequired;
                                            };
                                            if (shopItem.roleRequired !== null) {
                                                const targetRole = roles.find(r => r.id === shopItem.roleRequired);
                                                if (targetRole) {
                                                    shopItemRoleRequiredInput.value = targetRole.name;
                                                } else {
                                                    shopItemRoleRequiredInput.value = '';
                                                };
                                            };
                                            if (shopItem.stock !== null) {
                                                shopItemStockInput.value = shopItem.stock;
                                            };
                                            if (shopItem.overStock !== null) {
                                                shopItemOverstockInput.value = shopItem.overStock;
                                            };
                                            if (shopItem.overStockPriceMultiplier !== null) {
                                                shopItemOverstockPriceMultInput.value = shopItem.overStockPriceMultiplier;
                                            };
                                        });
                                        deleteButton.addEventListener('click', () => {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/shopitem/delete?' + new URLSearchParams({ guildId: targetGuildId, target: shopItem.name })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg === 'Success') {
                                                    successPopup()
                                                    item.remove();
                                                    buttonContainer.remove();
                                                };
                                            });
                                        });
                                    });
                                });
                            };

                            function createCoupons() {
                                fetch('https://api.godseyeofficial.xyz/api/guild/economy/coupons?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                    return result.json();
                                }).then(({ msg, coupons }) => {
                                    if (msg === 'Success') {
                                        shopCouponList.innerHTML = '';
                                        coupons.forEach((coupon) => {
                                            const item = document.createElement('li');
                                            item.className = 'section-container-list-item-servercoupon';
                                            shopCouponList.appendChild(item);
                                            const nameContainer = document.createElement('div');
                                            nameContainer.className = 'section-container-list-item-container';
                                            const descContainer = document.createElement('div');
                                            descContainer.className = 'section-container-list-item-container';
                                            const allowContainer = document.createElement('div');
                                            allowContainer.className = 'section-container-list-item-container';
                                            const reqContainer = document.createElement('div');
                                            reqContainer.className = 'section-container-list-item-container';
                                            const maxContainer = document.createElement('div');
                                            maxContainer.className = 'section-container-list-item-container';
                                            item.appendChild(nameContainer);
                                            item.appendChild(descContainer);
                                            item.appendChild(allowContainer);
                                            item.appendChild(reqContainer);
                                            item.appendChild(maxContainer);
                                            // name container
                                            const center1 = document.createElement('div');
                                            center1.className = 'center-vert couponname-container';
                                            nameContainer.appendChild(center1);
                                            const name = document.createElement('li');
                                            name.className = 'section-container-list-item-name';
                                            name.innerHTML = `Name: ${coupon.discountName}`;
                                            center1.appendChild(name);
                                            const center2 = document.createElement('div');
                                            center2.className = 'center-vert coupontype-container';
                                            nameContainer.appendChild(center2);
                                            const type = document.createElement('li');
                                            type.className = 'section-container-list-item-type';
                                            type.innerHTML = `Type: ${coupon.discountType}`;
                                            center2.appendChild(type);
                                            const center3 = document.createElement('div');
                                            center3.className = 'center-vert couponamount-container';
                                            nameContainer.appendChild(center3);
                                            const amount = document.createElement('li');
                                            amount.className = 'section-container-list-item-amount';
                                            amount.innerHTML = `Amount: ${coupon.discountAmount}`;
                                            center3.appendChild(amount);
                                            const center6 = document.createElement('div');
                                            center6.className = 'center-vert coupondescription-container';
                                            descContainer.appendChild(center6);
                                            const description = document.createElement('li');
                                            description.className = 'section-container-list-item-description';
                                            if (coupon.description) {
                                                description.innerHTML = `Desc: ${coupon.description}`;
                                            } else {
                                                description.innerHTML = `Desc: None`;
                                            };
                                            center6.appendChild(description);
                                            const center7 = document.createElement('div');
                                            center7.className = 'center-vert couponalloweditems-container';
                                            allowContainer.appendChild(center7);
                                            const allowedItems = document.createElement('li');
                                            allowedItems.className = 'section-container-list-item-alloweditems';
                                            if (coupon.allowedItems) {
                                                allowedItems.innerHTML = `Allowed Items: ${coupon.allowedItems}`;
                                            } else {
                                                allowedItems.innerHTML = `Allowed Items: None`;
                                            };
                                            center7.appendChild(allowedItems);
                                            const center8 = document.createElement('div');
                                            center8.className = 'center-vert couponrequiredcost-container';
                                            reqContainer.appendChild(center8);
                                            const requiredCost = document.createElement('li');
                                            requiredCost.className = 'section-container-list-item-requiredcost';
                                            if (coupon.requiredCost) {
                                                requiredCost.innerHTML = `Req Cost: ${coupon.requiredCost}`;
                                            } else {
                                                requiredCost.innerHTML = `Req Cost: None`;
                                            };
                                            center8.appendChild(requiredCost);
                                            const center9 = document.createElement('div');
                                            center9.className = 'center-vert couponrequiredrole-container';
                                            reqContainer.appendChild(center9);
                                            const requiredRole = document.createElement('li');
                                            requiredRole.className = 'section-container-list-item-requiredrole';
                                            if (coupon.roleRequired) {
                                                requiredRole.innerHTML = `Req Role: ${coupon.roleRequired}`;
                                            } else {
                                                requiredRole.innerHTML = `Req Role: None`;
                                            };
                                            center9.appendChild(requiredRole);
                                            const center10 = document.createElement('div');
                                            center10.className = 'center-vert couponrequireditemquantity-container';
                                            reqContainer.appendChild(center10);
                                            const requiredItemQuantity = document.createElement('li');
                                            requiredItemQuantity.className = 'section-container-list-item-requireditemquantity';
                                            if (coupon.requiredItemQuantity) {
                                                requiredItemQuantity.innerHTML = `Req Item Qty: ${coupon.requiredItemQuantity}`;
                                            } else {
                                                requiredItemQuantity.innerHTML = `Req Item Qty: None`;
                                            };
                                            center10.appendChild(requiredItemQuantity);
                                            const center5 = document.createElement('div');
                                            center5.className = 'center-vert couponexpire-container';
                                            maxContainer.appendChild(center5);
                                            const expire = document.createElement('li');
                                            expire.className = 'section-container-list-item-expire';
                                            if (!coupon.expirationDate) {
                                                expire.innerHTML = `Expiration: None`;
                                            } else {
                                                const date = new Date(coupon.expirationDate);
                                                const expDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                                                expire.innerHTML = `Expiration: ${expDate}`;
                                            };
                                            center5.appendChild(expire);
                                            const center4 = document.createElement('div');
                                            center4.className = 'center-vert couponuses-container';
                                            maxContainer.appendChild(center4);
                                            const uses = document.createElement('li');
                                            uses.className = 'section-container-list-item-uses';
                                            uses.innerHTML = `Uses: ${coupon.totalUses}`;
                                            center4.appendChild(uses);
                                            const buttonContainer = document.createElement('div');
                                            buttonContainer.className = 'section-container-list-item-buttoncontainer';
                                            item.appendChild(buttonContainer);
                                            const editButton = document.createElement('button');
                                            editButton.className = 'section-container-list-item-buttoncontainer-button';
                                            editButton.innerHTML = 'Edit';
                                            buttonContainer.appendChild(editButton);
                                            const deleteButton = document.createElement('button');
                                            deleteButton.className = 'section-container-list-item-buttoncontainer-button';
                                            deleteButton.innerHTML = 'Delete';
                                            buttonContainer.appendChild(deleteButton);
                                            editButton.addEventListener('click', () => {
                                                targetCoupon = coupon._id;
                                                shopCouponSaveButton.innerHTML = 'Save';
                                                shopCouponDiscountNameInput.value = coupon.discountName;
                                                shopCouponDiscountAmountInput.value = coupon.discountAmount;
                                                shopCouponDiscountTypeInput.value = coupon.discountType;
                                                if (coupon.requiredItemQuantity) {
                                                    shopCouponRequiredItemsInput.value = coupon.requiredItemQuantity;
                                                };
                                                if (coupon.expirationDate) {
                                                    shopCouponExpirationInput.value = coupon.expirationDate;
                                                };
                                                if (coupon.maxItemQuantity) {
                                                    shopCouponMaxItemsInput.value = coupon.maxItemQuantity;
                                                };
                                                if (coupon.maxUses) {
                                                    shopCouponMaxUsesInput.value = coupon.maxUses;
                                                    shopCouponMaxUseTypeInput.value = coupon.maxUseType;
                                                };
                                                if (coupon.roleRequired) {
                                                    const role = roles.find((r) => r.id === coupon.roleRequired);
                                                    if (role) {
                                                        shopCouponRoleRequiredInput.value = role.name;
                                                    };
                                                };
                                                if (coupon.description) {
                                                    shopCouponDescriptionInput.value = coupon.description;
                                                };
                                                if (coupon.allowedItems) {
                                                    shopCouponAllowedItemsInput.value = coupon.allowedItems;
                                                };
                                                if (coupon.requiredCost) {
                                                    shopCouponRequiredCostInput.value = coupon.requiredCost;
                                                };
                                                if (coupon.totalUses) {
                                                    shopCouponTotalUsesInput.value = coupon.totalUses;
                                                };
                                            });
                                            deleteButton.addEventListener('click', () => {
                                                fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/coupons/delete?' + new URLSearchParams({ target: coupon._id })).then((result) => {
                                                    return result.json();
                                                }).then(({ msg }) => {
                                                    if (msg === 'Success') {
                                                        successPopup();
                                                        item.remove();
                                                    };
                                                });
                                            });
                                        });
                                    };
                                    shopCouponSaveButton.addEventListener('click', () => {
                                        if (shopCouponDiscountNameInput.value === '') {
                                            alert('Make sure to input a coupon name!');
                                            return;
                                        };
                                        if (shopCouponDiscountTypeInput.value === '') {
                                            alert('Make sure to input a coupon type!');
                                            return;
                                        };
                                        if (shopCouponDiscountAmountInput.value === '') {
                                            alert('Make sure to input a coupon amount!');
                                            return;
                                        };
                                        if (shopCouponMaxUsesInput.value !== '' && shopCouponMaxUseTypeInput.value === '') {
                                            alert('Make sure to input a max use type!');
                                            return;
                                        };
                                        if (shopCouponMaxUsesInput.value === '' && shopCouponMaxUseTypeInput.value !== '') {
                                            alert('Make sure to input a max use amount!');
                                            return;
                                        };
                                        if (shopCouponRoleRequiredInput.value !== '') {
                                            const targetRole = roles.find(r => r.name.toLowerCase() === shopCouponRoleRequiredInput.value.toLowerCase());
                                            if (!targetRole) {
                                                alert('Make sure to input a proper role! Check your spelling.');
                                                return;
                                            };
                                        };
                                        if (shopCouponAllowedItemsInput.value !== '') {
                                            const itemsArr = shopCouponAllowedItemsInput.value.split(",");
                                            itemsArr.forEach((item) => {
                                                const targetItem = settings.shopItems.find(i => i.name == item);
                                                if (!targetItem) {
                                                    alert(`The item ${item} does not exist! Check your spelling.`);
                                                    return;
                                                };
                                            });
                                        };
                                        if (shopCouponSaveButton.innerHTML === 'Create') {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/coupon/save?' + new URLSearchParams({ guildId: targetGuildId, discountType: shopCouponDiscountTypeInput.value.toLowerCase(), discountAmount: shopCouponDiscountAmountInput.value, requiredItemQuantity: shopCouponRequiredItemsInput.value, expirationDate: shopCouponExpirationInput.value, maxItemQuantity: shopCouponMaxItemsInput.value, discountName: shopCouponDiscountNameInput.value, maxUses: shopCouponMaxUsesInput.value, maxUseType: shopCouponMaxUseTypeInput.value.toLowerCase(), roleRequired: shopCouponRoleRequiredInput.value, description: shopCouponDescriptionInput.value, allowedItems: shopCouponAllowedItemsInput.value, requiredCost: shopCouponRequiredCostInput.value, totalUses: shopCouponTotalUsesInput.value, targetCoupon: 'none' })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg === 'Success') {
                                                    successPopup();
                                                    shopCouponDiscountTypeInput.value = '';
                                                    shopCouponDiscountAmountInput.value = '';
                                                    shopCouponRequiredItemsInput.value = '';
                                                    shopCouponExpirationInput.value = '';
                                                    shopCouponMaxItemsInput.value = '';
                                                    shopCouponDiscountNameInput.value = '';
                                                    shopCouponMaxUsesInput.value = '';
                                                    shopCouponMaxUseTypeInput.value = '';
                                                    shopCouponRoleRequiredInput.value = '';
                                                    shopCouponDescriptionInput.value = '';
                                                    shopCouponDescriptionInput.value = '';
                                                    shopCouponAllowedItemsInput.value = '';
                                                    shopCouponRequiredCostInput.value = '';
                                                    shopCouponTotalUsesInput.value = '';
                                                    targetCoupon = '';
                                                    setTimeout(() => {
                                                        createCoupons();
                                                    }, 2500);
                                                };
                                            });
                                        } else {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/coupon/save?' + new URLSearchParams({ guildId: targetGuildId, discountType: shopCouponDiscountTypeInput.value.toLowerCase(), discountAmount: shopCouponDiscountAmountInput.value, requiredItemQuantity: shopCouponRequiredItemsInput.value, expirationDate: shopCouponExpirationInput.value, maxItemQuantity: shopCouponMaxItemsInput.value, discountName: shopCouponDiscountNameInput.value, maxUses: shopCouponMaxUsesInput.value, maxUseType: shopCouponMaxUseTypeInput.value.toLowerCase(), roleRequired: shopCouponRoleRequiredInput.value, description: shopCouponDescriptionInput.value, allowedItems: shopCouponAllowedItemsInput.value, requiredCost: shopCouponRequiredCostInput.value, totalUses: shopCouponTotalUsesInput.value, targetCoupon: targetCoupon })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg === 'Success') {
                                                    successPopup();
                                                    setTimeout(() => {
                                                        createCoupons();
                                                    }, 2500);
                                                };
                                            });
                                        };
                                    });
                                });
                            };

                            function createSales() {
                                fetch('https://api.godseyeofficial.xyz/api/guild/economy/sales?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                    return result.json();
                                }).then(({ msg, sales }) => {
                                    if (msg === 'Success') {
                                        shopSaleList.innerHTML = '';
                                        sales.forEach((sale) => {
                                            const item = document.createElement('li');
                                            item.className = 'section-container-list-item-serversale';
                                            shopSaleList.appendChild(item);
                                            const nameContainer = document.createElement('div');
                                            nameContainer.className = 'section-container-list-item-container';
                                            const descContainer = document.createElement('div');
                                            descContainer.className = 'section-container-list-item-container';
                                            const allowContainer = document.createElement('div');
                                            allowContainer.className = 'section-container-list-item-container';
                                            const reqContainer = document.createElement('div');
                                            reqContainer.className = 'section-container-list-item-container';
                                            const maxContainer = document.createElement('div');
                                            maxContainer.className = 'section-container-list-item-container';
                                            item.appendChild(nameContainer);
                                            item.appendChild(descContainer);
                                            item.appendChild(allowContainer);
                                            item.appendChild(reqContainer);
                                            item.appendChild(maxContainer);
                                            // name container
                                            const center1 = document.createElement('div');
                                            center1.className = 'center-vert salename-container';
                                            nameContainer.appendChild(center1);
                                            const name = document.createElement('li');
                                            name.className = 'section-container-list-item-name';
                                            name.innerHTML = `Name: ${sale.discountName}`;
                                            center1.appendChild(name);
                                            const center2 = document.createElement('div');
                                            center2.className = 'center-vert saletype-container';
                                            nameContainer.appendChild(center2);
                                            const type = document.createElement('li');
                                            type.className = 'section-container-list-item-type';
                                            type.innerHTML = `Type: ${sale.discountType}`;
                                            center2.appendChild(type);
                                            const center3 = document.createElement('div');
                                            center3.className = 'center-vert saleamount-container';
                                            nameContainer.appendChild(center3);
                                            const amount = document.createElement('li');
                                            amount.className = 'section-container-list-item-amount';
                                            amount.innerHTML = `Amount: ${sale.discountAmount}`;
                                            center3.appendChild(amount);
                                            const center6 = document.createElement('div');
                                            center6.className = 'center-vert saledescription-container';
                                            descContainer.appendChild(center6);
                                            const description = document.createElement('li');
                                            description.className = 'section-container-list-item-description';
                                            if (sale.description) {
                                                description.innerHTML = `Desc: ${sale.description}`;
                                            } else {
                                                description.innerHTML = `Desc: None`;
                                            };
                                            center6.appendChild(description);
                                            const center7 = document.createElement('div');
                                            center7.className = 'center-vert couponalloweditems-container';
                                            allowContainer.appendChild(center7);
                                            const allowedItems = document.createElement('li');
                                            allowedItems.className = 'section-container-list-item-alloweditems';
                                            if (sale.allowedItems) {
                                                allowedItems.innerHTML = `Allowed Items: ${sale.allowedItems}`;
                                            } else {
                                                allowedItems.innerHTML = `Allowed Items: None`;
                                            };
                                            center7.appendChild(allowedItems);
                                            const center8 = document.createElement('div');
                                            center8.className = 'center-vert salerequiredcost-container';
                                            reqContainer.appendChild(center8);
                                            const requiredCost = document.createElement('li');
                                            requiredCost.className = 'section-container-list-item-requiredcost';
                                            if (sale.requiredCost) {
                                                requiredCost.innerHTML = `Req Cost: ${sale.requiredCost}`;
                                            } else {
                                                requiredCost.innerHTML = `Req Cost: None`;
                                            };
                                            center8.appendChild(requiredCost);
                                            const center9 = document.createElement('div');
                                            center9.className = 'center-vert salerequiredrole-container';
                                            reqContainer.appendChild(center9);
                                            const requiredRole = document.createElement('li');
                                            requiredRole.className = 'section-container-list-item-requiredrole';
                                            if (sale.roleRequired) {
                                                const role = roles.find((r) => r.id === sale.roleRequired);
                                                if (role) {
                                                    requiredRole.innerHTML = `Req Role: ${role.name}`;
                                                };
                                            } else {
                                                requiredRole.innerHTML = `Req Role: None`;
                                            };
                                            center9.appendChild(requiredRole);
                                            const center10 = document.createElement('div');
                                            center10.className = 'center-vert salerequireditemquantity-container';
                                            reqContainer.appendChild(center10);
                                            const requiredItemQuantity = document.createElement('li');
                                            requiredItemQuantity.className = 'section-container-list-item-requireditemquantity';
                                            if (sale.requiredItemQuantity) {
                                                requiredItemQuantity.innerHTML = `Req Item Qty: ${sale.requiredItemQuantity}`;
                                            } else {
                                                requiredItemQuantity.innerHTML = `Req Item Qty: None`;
                                            };
                                            center10.appendChild(requiredItemQuantity);
                                            const center5 = document.createElement('div');
                                            center5.className = 'center-vert saleexpire-container';
                                            maxContainer.appendChild(center5);
                                            const expire = document.createElement('li');
                                            expire.className = 'section-container-list-item-expire';
                                            if (!sale.expirationDate) {
                                                expire.innerHTML = `Expiration: None`;
                                            } else {
                                                expire.innerHTML = `Expiration: ${sale.expirationDate}`;
                                            };
                                            center5.appendChild(expire);
                                            const center4 = document.createElement('div');
                                            center4.className = 'center-vert saleuses-container';
                                            maxContainer.appendChild(center4);
                                            const uses = document.createElement('li');
                                            uses.className = 'section-container-list-item-uses';
                                            uses.innerHTML = `Uses: ${sale.totalUses}`;
                                            center4.appendChild(uses);
                                            const buttonContainer = document.createElement('div');
                                            buttonContainer.className = 'section-container-list-item-buttoncontainer';
                                            item.appendChild(buttonContainer);
                                            const editButton = document.createElement('button');
                                            editButton.className = 'section-container-list-item-buttoncontainer-button';
                                            editButton.innerHTML = 'Edit';
                                            buttonContainer.appendChild(editButton);
                                            const deleteButton = document.createElement('button');
                                            deleteButton.className = 'section-container-list-item-buttoncontainer-button';
                                            deleteButton.innerHTML = 'Delete';
                                            buttonContainer.appendChild(deleteButton);
                                            editButton.addEventListener('click', () => {
                                                targetSale = sale._id;
                                                shopSaleSaveButton.innerHTML = 'Save';
                                                shopSaleDiscountNameInput.value = sale.discountName;
                                                shopSaleDiscountAmountInput.value = sale.discountAmount;
                                                shopSaleDiscountTypeInput.value = sale.discountType;
                                                if (sale.requiredItemQuantity) {
                                                    shopSaleRequiredItemsInput.value = sale.requiredItemQuantity;
                                                } else {
                                                    shopSaleRequiredItemsInput.value = 'None';
                                                };
                                                if (sale.expirationDate) {
                                                    shopSaleExpirationInput.value = sale.expirationDate;
                                                } else {
                                                    shopSaleExpirationInput.value = 'None';
                                                };
                                                if (sale.maxItemQuantity) {
                                                    shopSaleMaxItemsInput.value = sale.maxItemQuantity;
                                                } else {
                                                    shopSaleMaxItemsInput.value = 'None';
                                                };
                                                if (sale.maxUses) {
                                                    shopSaleMaxUsesInput.value = sale.maxUses;
                                                    shopSaleMaxUseTypeInput.value = sale.maxUseType;
                                                } else {
                                                    shopSaleMaxUsesInput.value = 'None';
                                                    shopSaleMaxUseTypeInput.value = 'None';
                                                };
                                                if (sale.roleRequired) {
                                                    const role = roles.find((r) => r.id === sale.roleRequired);
                                                    if (role) {
                                                        shopSaleRoleRequiredInput.value = role.name;
                                                    };
                                                } else {
                                                    shopSaleRoleRequiredInput.value = 'None';
                                                };
                                                if (sale.description) {
                                                    shopSaleDescriptionInput.value = sale.description;
                                                } else {
                                                    shopSaleDescriptionInput.value = 'None';
                                                };
                                                if (sale.allowedItems) {
                                                    shopSaleAllowedItemsInput.value = sale.allowedItems;
                                                } else {
                                                    shopSaleAllowedItemsInput.value = 'None';
                                                };
                                                if (sale.requiredCost) {
                                                    shopSaleRequiredCostInput.value = sale.requiredCost;
                                                } else {
                                                    shopSaleRequiredCostInput.value = 'None';
                                                };
                                                if (sale.totalUses) {
                                                    shopSaleTotalUsesInput.value = sale.totalUses;
                                                } else {
                                                    shshopSaleTotalUsesInputopSaleRequiredCostInput.value = 'None';
                                                };
                                            });
                                            deleteButton.addEventListener('click', () => {
                                                fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/sales/delete?' + new URLSearchParams({ target: sale._id })).then((result) => {
                                                    return result.json();
                                                }).then(({ msg }) => {
                                                    if (msg === 'Success') {
                                                        successPopup();
                                                        item.remove();
                                                    };
                                                });
                                            });
                                        });
                                    };
                                    shopSaleSaveButton.addEventListener('click', () => {
                                        let roleId;
                                        if (shopSaleDiscountNameInput.value === '') {
                                            alert('Make sure to input a sale name!');
                                            return;
                                        };
                                        if (shopSaleDiscountTypeInput.value === '') {
                                            alert('Make sure to input a sale type!');
                                            return;
                                        };
                                        if (shopSaleDiscountAmountInput.value === '') {
                                            alert('Make sure to input a sale amount!');
                                            return;
                                        };
                                        if (shopSaleMaxUsesInput.value !== '' && shopSaleMaxUseTypeInput.value === '') {
                                            alert('Make sure to input a max use type!');
                                            return;
                                        };
                                        if (shopSaleMaxUsesInput.value === '' && shopSaleMaxUseTypeInput.value !== '') {
                                            alert('Make sure to input a max use amount!');
                                            return;
                                        };
                                        if (shopSaleRoleRequiredInput.value !== '') {
                                            const targetRole = roles.find(r => r.name.toLowerCase() === shopSaleRoleRequiredInput.value.toLowerCase());
                                            if (!targetRole) {
                                                alert('Make sure to input a proper role! Check your spelling.');
                                                return;
                                            };
                                            roleId = targetRole.id;
                                        };
                                        if (shopSaleAllowedItemsInput.value !== '') {
                                            const itemsArr = shopSaleAllowedItemsInput.value.split(",");
                                            itemsArr.forEach((item) => {
                                                const targetItem = settings.shopItems.find(i => i.name == item);
                                                if (!targetItem) {
                                                    alert(`The item ${item} does not exist! Check your spelling.`);
                                                    return;
                                                };
                                            });
                                        };
                                        if (shopSaleSaveButton.innerHTML === 'Create') {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/sales/save?' + new URLSearchParams({ guildId: targetGuildId, discountType: shopSaleDiscountTypeInput.value.toLowerCase(), discountAmount: shopSaleDiscountAmountInput.value, requiredItemQuantity: shopSaleRequiredItemsInput.value, expirationDate: shopSaleExpirationInput.value, maxItemQuantity: shopSaleMaxItemsInput.value, discountName: shopSaleDiscountNameInput.value, maxUses: shopSaleMaxUsesInput.value, maxUseType: shopSaleMaxUseTypeInput.value.toLowerCase(), roleRequired: roleId, description: shopSaleDescriptionInput.value, allowedItems: shopSaleAllowedItemsInput.value, requiredCost: shopSaleRequiredCostInput.value, totalUses: shopSaleTotalUsesInput.value, targetSale: 'none' })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg === 'Success') {
                                                    successPopup();
                                                    setTimeout(() => {
                                                        createSales();
                                                    }, 2500);
                                                };
                                            });
                                        } else {
                                            fetch('https://api.godseyeofficial.xyz/api/guild/economy/settings/sales/save?' + new URLSearchParams({ guildId: targetGuildId, discountType: shopSaleDiscountTypeInput.value.toLowerCase(), discountAmount: shopSaleDiscountAmountInput.value, requiredItemQuantity: shopSaleRequiredItemsInput.value, expirationDate: shopSaleExpirationInput.value, maxItemQuantity: shopSaleMaxItemsInput.value, discountName: shopSaleDiscountNameInput.value, maxUses: shopSaleMaxUsesInput.value, maxUseType: shopSaleMaxUseTypeInput.value.toLowerCase(), roleRequired: roleId, description: shopSaleDescriptionInput.value, allowedItems: shopSaleAllowedItemsInput.value, requiredCost: shopSaleRequiredCostInput.value, totalUses: shopSaleTotalUsesInput.value, targetSale: targetSale })).then((result) => {
                                                return result.json();
                                            }).then(({ msg }) => {
                                                if (msg === 'Success') {
                                                    successPopup();
                                                    setTimeout(() => {
                                                        createSales();
                                                    }, 2500);
                                                };
                                            });
                                        };
                                    });
                                });

                            };

                            function createMoneyRoles() {
                                fetch('https://api.godseyeofficial.xyz/api/guild/economy/moneyroles?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                    return result.json();
                                }).then(({ msg, moneyRoles }) => {
                                    if (msg === 'Success') {
                                        moneyRoleList.innerHTML = '';
                                        moneyRoles.forEach((moneyRole) => {
                                            const targetRole = roles.find(r => r.id === moneyRole._id);
                                            if (targetRole) {
                                                const item = document.createElement('li');
                                                item.className = 'moneyrole-container';
                                                moneyRoleList.appendChild(item);
                                                const roleContainer = document.createElement('div');
                                                roleContainer.className = 'moneyrole-container-rolecontainer';
                                                item.appendChild(roleContainer);
                                                const periodContainer = document.createElement('div');
                                                periodContainer.className = 'moneyrole-container-periodcontainer';
                                                item.appendChild(periodContainer);
                                                const amountContainer = document.createElement('div');
                                                amountContainer.className = 'moneyrole-container-amountcontainer';
                                                item.appendChild(amountContainer);
                                                const accountContainer = document.createElement('div');
                                                accountContainer.className = 'moneyrole-container-accountcontainer';
                                                item.appendChild(accountContainer);
                                                const roleText = document.createElement('h2');
                                                roleText.className = 'moneyrole-text';
                                                roleText.innerHTML = `Role: ${targetRole.name}`;
                                                roleContainer.appendChild(roleText);
                                                const periodText = document.createElement('h2');
                                                periodText.className = 'moneyrole-text';
                                                periodText.innerHTML = `Period: ${moneyRole.periodTime} ${moneyRole.periodType}`;
                                                periodContainer.appendChild(periodText);
                                                const amountText = document.createElement('h2');
                                                amountText.className = 'moneyrole-text';
                                                amountText.innerHTML = `Amount: $${moneyRole.amount}`;
                                                amountContainer.appendChild(amountText);
                                                const accountText = document.createElement('h2');
                                                accountText.className = 'moneyrole-text';
                                                accountText.innerHTML = `Account: ${moneyRole.bankType}`;
                                                accountContainer.appendChild(accountText);
                                                const buttonContainer = document.createElement('div');
                                                buttonContainer.className = 'moneyrole-buttoncontainer';
                                                item.appendChild(buttonContainer);
                                                const editButton = document.createElement('button');
                                                editButton.className = 'moneyrole-buttoncontainer-button';
                                                editButton.innerHTML = 'Edit';
                                                buttonContainer.appendChild(editButton);
                                                const deleteButton = document.createElement('button');
                                                deleteButton.className = 'moneyrole-buttoncontainer-button';
                                                deleteButton.innerHTML = 'Delete';
                                                buttonContainer.appendChild(deleteButton);
                                                editButton.addEventListener('click', () => {
                                                    moneyRoleRoleInput.value = targetRole.name;
                                                    moneyRolePeriodAmountInput.value = moneyRole.periodTime;
                                                    moneyRolePeriodTypeInput.value = moneyRole.periodType;
                                                    moneyRoleAmountInput.value = moneyRole.amount;
                                                    moneyRoleAccountInput.value = moneyRole.bankType;
                                                    moneyRoleSaveButton.innerHTML = 'Save';
                                                    targetMoneyRole = targetRole.id;
                                                });
                                                deleteButton.addEventListener('click', () => {
                                                    fetch('https://api.godseyeofficial.xyz/api/guild/economy/moneyroles/delete?' + new URLSearchParams({ guildId: targetGuildId, targetRole: targetRole.id })).then((result) => {
                                                        return result.json();
                                                    }).then(({ msg }) => {
                                                        if (msg === 'Success') {
                                                            successPopup();
                                                            item.remove();
                                                        };
                                                    });
                                                });
                                            };
                                        });
                                    };
                                });
                            };
                            loaderContainer.style.display = 'none';
                        });
                    });
                });
            });
            // End of page code
        });
    });
});

// Functions