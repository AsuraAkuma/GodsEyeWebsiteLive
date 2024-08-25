// Variables
const loaderContainer = document.getElementById('loader-container');
const profileButton = document.getElementById('header-button-profile');
const bodyContainer = document.getElementById('body-container');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const dropdownMenuContainer = document.getElementById('header-profile-dropdown-menu');
const dropdownMenuCloseButton = document.getElementById('header-profile-dropdown-menu-button-close');
const backButton = document.getElementById('header-section-arrow-back');
const embedList = document.getElementById('embeds-list');
const authorImage = document.getElementById('embed-panel-author-image');
const authorImageUpload = document.getElementById('embed-panel-input-author-image');
const thumbnailImage = document.getElementById('embed-panel-thumbnail');
const thumbnailImageUpload = document.getElementById('embed-panel-input-thumbnail');
const authorText = document.getElementById('embed-panel-input-author-text');
const authorURL = document.getElementById('embed-panel-input-author-url');
const titleInput = document.getElementById('embed-panel-input-title');
const embedFieldsArr = new Array();
const embedFieldsElements = document.getElementById('embed-panel-fields');
const addFieldButton = document.getElementById('embed-panel-button-addField');
const embedImageInput = document.getElementById('embed-panel-input-image');
const embedImage = document.getElementById('embed-panel-image');
const embedFooterImageInput = document.getElementById('embed-panel-input-footer-image');
const embedFooterImage = document.getElementById('embed-panel-footer-image');
const embedFooterText = document.getElementById('embed-panel-input-footer-text');
const embedCharCount = document.getElementById('embed-charCount');
const channelList = document.getElementById('channel-list');
const channelInput = document.getElementById('embed-panel-input-channel');
const createButton = document.getElementById('embed-button-create');
const colorInput = document.getElementById('embed-panel-input-color');
const colorHexInput = document.getElementById('embed-panel-input-color-code');
const embedPanel = document.getElementById('embed-panel');
const authButton = document.getElementById('embed-panel-button-remove-author-image');
const thumbButton = document.getElementById('embed-panel-button-remove-thumbnail-image');
const embedButton = document.getElementById('embed-panel-button-remove-embed-image');
const footButton = document.getElementById('embed-panel-button-remove-footer-image');
let currentEmbed = "none";
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
            createEmbeds();
            colorHexInput.addEventListener('input', () => {
                colorInput.value = colorHexInput.value;
                embedPanel.style.borderColor = `${colorHexInput.value}`;
            });
            colorInput.addEventListener('input', () => {
                colorHexInput.value = colorInput.value;
                embedPanel.style.borderColor = `${colorInput.value}`;
            });
            addFieldButton.addEventListener('click', () => {
                const index = embedFieldsElements.children.length;
                const item = document.createElement('li');
                item.className = "embed-panel-fields-item";
                item.id = `embed-panel-fields-item-${index}`;
                embedFieldsElements.appendChild(item);
                const inputName = document.createElement('input');
                inputName.className = "embed-panel-fields-item-input-name";
                inputName.id = `embed-panel-fields-item-input-name-${index}`;
                inputName.placeholder = 'Field Name';
                inputName.maxLength = "256";
                item.appendChild(inputName);
                const inputValue = document.createElement('p');
                inputValue.className = "embed-panel-fields-item-input-value";
                inputValue.id = `embed-panel-fields-item-input-value-${index}`;
                inputValue.contentEditable = true
                item.appendChild(inputValue);
                const label = document.createElement('embed-panel-fields-item-label');
                label.className = "embed-panel-fields-item-label";
                label.id = `embed-panel-fields-item-label-${index}`;
                label.innerHTML = 'Inline:';
                label.setAttribute('for', `embed-panel-fields-item-input-${index}`);
                item.appendChild(label);
                const input2 = document.createElement('input');
                input2.className = "embed-panel-fields-item-input-inline";
                input2.id = `embed-panel-fields-item-input-inline-${index}`;
                input2.type = 'checkbox';
                label.appendChild(input2);
                const button = document.createElement('button');
                button.className = "embed-panel-fields-item-button";
                button.id = `embed-panel-fields-item-button-${index}`;
                button.innerHTML = "Delete";
                item.appendChild(button);
                button.addEventListener('click', () => {
                    item.remove();
                    getCharCount();
                });
                createFieldEvents();
            });
            let targetIndex = [];
            authorText.addEventListener('input', () => {
                getCharCount(authorText)
            });
            titleInput.addEventListener('input', () => {
                getCharCount(titleInput)
            });
            function createFieldEvents() {
                for (let i = 0; i < embedFieldsElements.children.length; i++) {
                    const targetItemName = document.getElementById(`embed-panel-fields-item-input-name-${i}`)
                    const targetItemValue = document.getElementById(`embed-panel-fields-item-input-value-${i}`)
                    targetItemName.addEventListener('input', () => {
                        getCharCount(targetItemName)
                    });
                    targetItemValue.addEventListener('input', () => {
                        if (targetItemValue.innerHTML.toString().split("&nbsp;").join("").length > 1024) {
                            targetItemValue.innerHTML = targetIndex[targetItemValue.id];
                            return
                        };
                        getCharCount(targetItemValue)
                    });
                    targetItemValue.addEventListener('keypress', ({ key }) => {
                        if (key === 'Enter') {
                            targetItemValue.value = targetItemValue.value.slice(0, targetItemValue.length - 1);
                        };
                    });
                };
            };
            createFieldEvents();
            embedFooterText.addEventListener('input', () => {
                if (embedFooterText.innerHTML.toString().split("&nbsp;").join("").length > 2048) {
                    embedFooterText.innerHTML = targetIndex[embedFooterText.id];
                    return
                };
                getCharCount(embedFooterText)
            });
            function getCharCount(target) {
                const authorCount = authorText.value.length;
                const titleCount = titleInput.value.length;
                const footerCount = embedFooterText.innerHTML.toString().split("&nbsp;").join("").length;
                let fieldsTotal = 0;
                for (let i = 0; i < embedFieldsElements.children.length; i++) {
                    const nameCount = document.getElementById(`embed-panel-fields-item-input-name-${i}`).value.length;
                    const valueCount = document.getElementById(`embed-panel-fields-item-input-value-${i}`).innerHTML.toString().split("&nbsp;").join("").length;
                    fieldsTotal = fieldsTotal + (nameCount + valueCount);
                };
                const total = authorCount + titleCount + footerCount + fieldsTotal;
                embedCharCount.innerHTML = `${total} / 6000`;
                if (target) {
                    if (total <= 6000) {
                        if (target.tagName === 'INPUT') {
                            targetIndex[target.id] = target.value;
                        } else if (target.tagName === 'P') {
                            targetIndex[target.id] = target.innerHTML.toString().split("&nbsp;").join("");
                        };
                    } else {
                        if (target.tagName === 'INPUT') {
                            target.value = targetIndex[target.id];
                        } else if (target.tagName === 'P') {
                            target.innerHTML = targetIndex[target.id];
                        };
                        getCharCount(target);
                        return
                    }
                };
                load(total / 6000);
            };
            function load(perc) {
                embedCharCount.style.borderColor = getGradient(perc);
            }

            function getGradient(ratio) {
                var color1 = 'FF0000'; // lightgreen
                var color2 = '00ff00'; // red
                var hex = function (x) {
                    x = x.toString(16);
                    return (x.length == 1) ? '0' + x : x;
                };

                var r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
                var g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
                var b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));
                return '#' + hex(r) + hex(g) + hex(b);
            }
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
            function createEmbeds() {
                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/settings?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                    return result.json();
                }).then((settings) => {
                    if (!settings.msg && settings.embeds.length > 0) {
                        embedList.innerHTML = "";
                        settings.embeds.forEach((embed) => {
                            const item = document.createElement('li');
                            item.className = "embeds-list-item";
                            item.id = `embeds-list-item-${embed.id}`;
                            embedList.appendChild(item);
                            const title = document.createElement('h1');
                            title.className = "embeds-list-item-title";
                            title.id = `embeds-list-item-title-${embed.id}`;
                            title.innerHTML = `${embed.title}`;
                            item.appendChild(title);
                            const buttonDelete = document.createElement('button');
                            buttonDelete.className = "embeds-list-item-button-delete";
                            buttonDelete.id = `embeds-list-item-button-delete-${embed.id}`;
                            buttonDelete.innerHTML = "Delete";
                            item.appendChild(buttonDelete);
                            const buttonEdit = document.createElement('button');
                            buttonEdit.className = "embeds-list-item-button-edit";
                            buttonEdit.id = `embeds-list-item-button-edit-${embed.id}`;
                            buttonEdit.innerHTML = "Edit";
                            item.appendChild(buttonEdit);
                            item.addEventListener('mouseover', () => {
                                buttonDelete.style.display = 'block';
                                buttonEdit.style.display = 'block';
                            });
                            item.addEventListener('mouseout', () => {
                                buttonDelete.style.display = 'none';
                                buttonEdit.style.display = 'none';
                            });
                            buttonDelete.addEventListener('click', () => {
                                buttonDelete.style.display = 'none';
                                buttonEdit.style.display = 'none';
                                fetch('https://api.godseyeofficial.xyz/api/guild/embeds/delete?' + new URLSearchParams({ guildId: targetGuildId, id: embed.id })).then((result) => {
                                    return result.json();
                                }).then(({ msg }) => {
                                    if (msg === "Success") {
                                        successPopup();
                                        setTimeout(() => {
                                            createEmbeds();
                                        }, 2500);
                                    };
                                });
                            });

                            buttonEdit.addEventListener('click', () => {
                                createButton.innerHTML = 'Save';
                                currentEmbed = embed.id;
                                buttonDelete.style.display = 'none';
                                buttonEdit.style.display = 'none';
                                if (embed.author !== undefined) {
                                    if (embed.author.iconURL !== undefined && embed.author.iconURL !== null) {
                                        authorImage.style.filter = "unset";
                                        authorImage.src = embed.author.iconURL;
                                    };
                                    if (embed.author.name !== undefined && embed.author.name !== null) {
                                        authorText.value = embed.author.name;
                                    };
                                    if (embed.author.url !== undefined && embed.author.url !== null) {
                                        authorURL.value = embed.author.url;
                                    };
                                };
                                titleInput.value = embed.title;
                                if (embed.thumbnail !== undefined && embed.thumbnail !== null) {
                                    thumbnailImage.style.filter = "unset";
                                    thumbnailImage.src = embed.thumbnail;
                                };
                                if (embed.fields !== undefined && embed.fields !== null) {
                                    if (embed.fields.length > 0) {
                                        embedFieldsElements.innerHTML = "";
                                        embed.fields.forEach((field) => {
                                            const index = embedFieldsElements.children.length;
                                            const item = document.createElement('li');
                                            item.className = "embed-panel-fields-item";
                                            item.id = `embed-panel-fields-item-${index}`;
                                            embedFieldsElements.appendChild(item);
                                            const inputName = document.createElement('input');
                                            inputName.className = "embed-panel-fields-item-input-name";
                                            inputName.id = `embed-panel-fields-item-input-name-${index}`;
                                            inputName.placeholder = 'Field Name';
                                            inputName.maxLength = "256";
                                            inputName.value = field.name;
                                            item.appendChild(inputName);
                                            const inputValue = document.createElement('p');
                                            inputValue.className = "embed-panel-fields-item-input-value";
                                            inputValue.id = `embed-panel-fields-item-input-value-${index}`;
                                            inputValue.contentEditable = true
                                            inputValue.innerHTML = `${field.value}`;
                                            item.appendChild(inputValue);
                                            const label = document.createElement('embed-panel-fields-item-label');
                                            label.className = "embed-panel-fields-item-label";
                                            label.id = `embed-panel-fields-item-label-${index}`;
                                            label.innerHTML = 'Inline:';
                                            label.setAttribute('for', `embed-panel-fields-item-input-${index}`);
                                            item.appendChild(label);
                                            const input2 = document.createElement('input');
                                            input2.className = "embed-panel-fields-item-input-inline";
                                            input2.id = `embed-panel-fields-item-input-inline-${index}`;
                                            input2.type = 'checkbox';
                                            input2.checked = field.inline;
                                            label.appendChild(input2);
                                            const button = document.createElement('button');
                                            button.className = "embed-panel-fields-item-button";
                                            button.id = `embed-panel-fields-item-button-${index}`;
                                            button.innerHTML = "Delete";
                                            item.appendChild(button);
                                            button.addEventListener('click', () => {
                                                item.remove();
                                                getCharCount();
                                            });
                                            createFieldEvents();
                                        });
                                    };
                                };
                                if (embed.image !== undefined && embed.image !== null) {
                                    embedImage.style.filter = "unset";
                                    embedImage.src = embed.image;
                                };
                                if (embed.footer !== undefined && embed.footer !== null) {
                                    if (embed.footer.text !== undefined && embed.footer.text !== null) {
                                        embedFooterText.innerHTML = `${embed.footer.text}`;
                                    };
                                    if (embed.footer.iconURL !== undefined && embed.footer.iconURL !== null) {
                                        embedFooterImage.style.filter = "unset";
                                        embedFooterImage.src = embed.footer.iconURL;
                                    };
                                };
                                fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                                    return result.json();
                                }).then(({ msg, channels }) => {
                                    if (msg === 'Success') {
                                        const targetChannel = channels.find(c => c.id === embed.channel);
                                        if (targetChannel) {
                                            channelInput.value = targetChannel.name;
                                        };
                                    };
                                });
                                if (embed.color !== undefined) {
                                    embedPanel.style.borderColor = embed.color;
                                    colorInput.value = embed.color;
                                    colorHexInput.value = embed.color;
                                };
                                getCharCount();
                            });
                        });
                    };
                    authorImage.addEventListener('click', () => {
                        authorImageUpload.click();
                    });
                    let file;
                    authorImageUpload.addEventListener('change', ({ target }) => {
                        file = target.files[0];
                        if (file.size > 8388608) {
                            alert('This image is too large, make sure your image in under 8 MB.');
                            return
                        };
                        const reader = new FileReader();
                        reader.readAsDataURL(target.files[0]);
                        reader.addEventListener('loadend', ({ target }) => {
                            authorImage.style.filter = "unset";
                            authorImage.src = `${target.result}`;
                        });
                    });
                    thumbnailImage.addEventListener('click', () => {
                        thumbnailImageUpload.click();
                    });
                    let file2;
                    thumbnailImageUpload.addEventListener('change', ({ target }) => {
                        file2 = target.files[0];
                        if (file2.size > 8388608) {
                            alert('This image is too large, make sure your image in under 8 MB.');
                            return
                        };
                        const reader = new FileReader();
                        reader.readAsDataURL(target.files[0]);
                        reader.addEventListener('loadend', ({ target }) => {
                            thumbnailImage.style.filter = "unset";
                            thumbnailImage.src = `${target.result}`;
                        });
                    });
                    embedImage.addEventListener('click', () => {
                        embedImageInput.click();
                    });
                    let file3;
                    embedImageInput.addEventListener('change', ({ target }) => {
                        file3 = target.files[0];
                        if (file3.size > 8388608) {
                            alert('This image is too large, make sure your image in under 8 MB.');
                            return
                        };
                        const reader = new FileReader();
                        reader.readAsDataURL(target.files[0]);
                        reader.addEventListener('loadend', ({ target }) => {
                            embedImage.style.filter = "unset";
                            embedImage.src = `${target.result}`;
                        });
                    });
                    embedFooterImage.addEventListener('click', () => {
                        embedFooterImageInput.click();
                    });
                    let file4;
                    embedFooterImageInput.addEventListener('change', ({ target }) => {
                        file4 = target.files[0];
                        if (file4.size > 8388608) {
                            alert('This image is too large, make sure your image in under 8 MB.');
                            return
                        };
                        const reader = new FileReader();
                        reader.readAsDataURL(target.files[0]);
                        reader.addEventListener('loadend', ({ target }) => {
                            embedFooterImage.style.filter = "unset";
                            embedFooterImage.src = `${target.result}`;
                        });
                    });
                    let imageFileName1;
                    let imageFileName2;
                    let imageFileName3;
                    let imageFileName4;
                    let deletedImages = new Array();
                    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/channels?' + new URLSearchParams({ guildId: targetGuildId })).then((result) => {
                        return result.json();
                    }).then(({ msg, channels }) => {
                        if (msg === 'Success') {
                            channels.forEach((channel) => {
                                const option = document.createElement('option');
                                option.innerHTML = `${channel.name}`;
                                channelList.appendChild(option);
                            });

                            createButton.addEventListener('click', () => {
                                if (titleInput.value === '') {
                                    alert("You must provide a title!");
                                    return;
                                };
                                const fields = new Array();
                                for (let i = 0; i < embedFieldsElements.children.length; i++) {
                                    const targetItemName = document.getElementById(`embed-panel-fields-item-input-name-${i}`);
                                    const targetItemValue = document.getElementById(`embed-panel-fields-item-input-value-${i}`);
                                    const targetItemInline = document.getElementById(`embed-panel-fields-item-input-inline-${i}`);
                                    const fieldObj = {
                                        name: targetItemName.value,
                                        value: targetItemValue.innerHTML.toString(),
                                        inline: targetItemInline.checked.toString()
                                    };
                                    fields.push(fieldObj);
                                };
                                const formData = new FormData();
                                let deletedImages2 = new Array();
                                if (file) {
                                    formData.append(file.name ?? 'none', file ?? 'none');
                                    imageFileName1 = file.name;
                                    deletedImages.forEach((image) => {
                                        if (image !== 'authorImage') {
                                            deletedImages2.push(image);
                                        };
                                    });
                                    deletedImages = deletedImages2;
                                    deletedImages2 = new Array();
                                } else {
                                    formData.append('none', 'none');
                                    imageFileName1 = "none";
                                };
                                if (file2) {
                                    formData.append(file2.name ?? 'none', file2 ?? 'none');
                                    imageFileName2 = file2.name;
                                    deletedImages.forEach((image) => {
                                        if (image !== 'thumbnailImage') {
                                            deletedImages2.push(image);
                                        };
                                    });
                                    deletedImages = deletedImages2;
                                    deletedImages2 = new Array();
                                } else {
                                    formData.append('none', 'none');
                                    imageFileName2 = "none";
                                };
                                if (file3) {
                                    formData.append(file3.name ?? 'none', file3 ?? 'none');
                                    imageFileName3 = file3.name;
                                    deletedImages.forEach((image) => {
                                        if (image !== 'embedImage') {
                                            deletedImages2.push(image);
                                        };
                                    });
                                    deletedImages = deletedImages2;
                                    deletedImages2 = new Array();
                                } else {
                                    formData.append('none', 'none');
                                    imageFileName3 = "none";
                                };
                                if (file4) {
                                    formData.append(file4.name ?? 'none', file4 ?? 'none');
                                    imageFileName4 = file4.name;
                                    deletedImages.forEach((image) => {
                                        if (image !== 'footerImage') {
                                            deletedImages2.push(image);
                                        };
                                    });
                                    deletedImages = deletedImages2;
                                    deletedImages2 = new Array();
                                } else {
                                    formData.append('none', 'none');
                                    imageFileName4 = "none";
                                };

                                const info = {
                                    channel: channels.find(c => c.name === channelInput.value).id,
                                    authorUrl: authorURL.value ?? 'none',
                                    author: authorText.value ?? 'none',
                                    title: titleInput.value ?? 'none',
                                    fields: fields.map((v, i) => `${v.name}<2058GENVB2058>${v.value}<2058GENVB2058>${v.inline}`).join("<2058GEFB2058>"),
                                    footerText: embedFooterText.innerHTML.toString(),
                                    color: colorHexInput.value
                                };
                                if (colorHexInput.value === '') {
                                    info['color'] = '#FF0000';
                                };
                                // if (createButton.innerHTML == 'Create') {
                                fetch('https://api.godseyeofficial.xyz/api/guild/embeds/create?' + new URLSearchParams({ guildId: targetGuildId, fields: info.fields, channel: info.channel, authorURL: info.authorUrl, author: info.author, title: info.title, imageFileName1: imageFileName1, imageFileName2: imageFileName2, imageFileName3: imageFileName3, imageFileName4: imageFileName4, footerText: info.footerText, color: info.color, id: currentEmbed, deletedImages: deletedImages.join("-") }), { method: 'POST', body: formData }).then((result) => {
                                    return result.json();
                                }).then(({ msg }) => {
                                    if (msg === 'Success') {
                                        successPopup();
                                        setTimeout(() => {
                                            createEmbeds();
                                        }, 2500);
                                    };
                                });
                                // } else {
                                //     fetch('https://api.godseyeofficial.xyz/api/guild/embeds/edit?' + new URLSearchParams({ guildId: targetGuildId, fields: info.fields, channel: info.channel, authorURL: info.authorUrl, author: info.author, title: info.title, imageFileName1: imageFileName1, imageFileName2: imageFileName2, imageFileName3: imageFileName3, imageFileName4: imageFileName4, footerText: info.footerText, color: info.color, id: currentEmbed, deletedImages: deletedImages.join("-") })).then((result) => {
                                //         return result.json();
                                //     }).then(({ msg }) => {
                                //         if (msg === 'Success') {
                                //             successPopup();
                                //             setTimeout(() => {
                                //                 createEmbeds();
                                //             }, 2500);
                                //         };
                                //     });
                                // };
                            });
                        };
                    });
                    authButton.addEventListener('click', () => {
                        file = undefined;
                        imageFileName1 = "none";
                        authorImage.src = "../images/add-image-1.png";
                        authorImage.style.filter = "invert(69%) sepia(8%) saturate(9%) hue-rotate(345deg) brightness(87%) contrast(89%)";
                        deletedImages.push('authorImage');
                    });
                    thumbButton.addEventListener('click', () => {
                        file2 = undefined;
                        imageFileName2 = "none";
                        thumbnailImage.src = "../images/add-image-1.png";
                        thumbnailImage.style.filter = "invert(69%) sepia(8%) saturate(9%) hue-rotate(345deg) brightness(87%) contrast(89%)";
                        deletedImages.push('thumbnailImage');
                    });
                    embedButton.addEventListener('click', () => {
                        file3 = undefined;
                        imageFileName3 = "none";
                        embedImage.src = "../images/add-image-1.png";
                        embedImage.style.filter = "invert(69%) sepia(8%) saturate(9%) hue-rotate(345deg) brightness(87%) contrast(89%)";
                        deletedImages.push('embedImage');
                    });
                    footButton.addEventListener('click', () => {
                        file4 = undefined;
                        imageFileName4 = "none";
                        embedFooterImage.src = "../images/add-image-1.png";
                        embedFooterImage.style.filter = "invert(69%) sepia(8%) saturate(9%) hue-rotate(345deg) brightness(87%) contrast(89%)";
                        deletedImages.push('footerImage');
                    });
                });
            };
            // End of page code
        });
    });
});

// Functions