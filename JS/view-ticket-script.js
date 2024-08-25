// Variables
const loaderContainer = document.getElementById('loader-container');
const bodyContainer = document.getElementById('body-container');
const messageList = document.getElementById('message-list');
// Page load event listener
window.addEventListener('load', () => {
    // Code to execute once page is loaded
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    let targetGuildId;
    let ticket;
    if (fragment.toString() !== '') {
        document.cookie = `geid=${fragment.get('geid')}`;
        document.cookie = `ticket=${fragment.get('ticket')}`;
        window.location.href = `${window.location.origin}${window.location.pathname}`;
    } else {
        document.cookie.split(";").forEach((cookie) => {
            const name = cookie.split(" ").join("").split("=")[0];
            const value = cookie.split(" ").join("").split("=")[1];
            if (name === 'geid') {
                targetGuildId = value;
            };
            if (name === 'ticket') {
                ticket = value;
            };
        })
    }
    // fetch account avatar
    // fetch account guilds
    loaderContainer.style.display = 'none';
    // Start of page code
    fetch('https://api.godseyeofficial.xyz/api/user/guilds/guild/ticket?' + new URLSearchParams({ guildId: targetGuildId, ticket: ticket })).then((result) => {
        return result.json();
    }).then(({ msg, ticket }) => {
        ticket.messages.forEach((data) => {
            const created = new Date(data.createdTimestamp);
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let hours;
            let dayTime;
            if (created.getHours() > 12) {
                hours = created.getHours() - 12;
                dayTime = 'pm';
            } else if (created.getHours() === 0) {
                hours = 12;
                dayTime = 'am';
            } else {
                hours = created.getHours();
                dayTime = 'am';
            }
            const createdString = `${months[created.getMonth()]} ${created.getDate()}, ${created.getFullYear()} ${hours}:${created.getMinutes().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })} ${dayTime}`
            const message = document.createElement('li');
            message.className = 'message-list-message';
            message.id = `message-list-message-${data.id}`;
            messageList.appendChild(message);
            const sender = document.createElement('div');
            sender.className = 'message-list-message-sender';
            sender.id = `message-list-message-sender-${data.id}`;
            message.appendChild(sender);
            const senderAvatar = document.createElement('img');
            senderAvatar.className = 'message-list-message-sender-avatar';
            senderAvatar.id = `message-list-message-sender-avatar-${data.id}`;
            senderAvatar.src = `${data.author.avatar}`;
            sender.appendChild(senderAvatar);
            const senderName = document.createElement('h1');
            senderName.className = 'message-list-message-sender-name';
            senderName.id = `message-list-message-sender-name-${data.id}`;
            senderName.innerHTML = `${data.author.username}#${data.author.discriminator}`;
            sender.appendChild(senderName);
            const timestamp = document.createElement('h1');
            timestamp.className = 'message-list-message-timestamp';
            timestamp.id = `message-list-message-timestamp-${data.id}`;
            timestamp.innerHTML = createdString;
            sender.appendChild(timestamp);
            if (data.embeds.length > 0) {
                data.embeds.forEach((embed) => {
                    const embedContainer = document.createElement('div');
                    embedContainer.className = 'message-list-message-embed';
                    embedContainer.id = `message-list-message-embed-${embed.index}`;
                    message.appendChild(embedContainer);
                    if (embed.title !== null && embed.title !== undefined && embed.title !== "") {
                        const titleSplit = embed.title.split(" ");
                        const titleArr = new Array();
                        titleSplit.forEach((word) => {
                            let edit;
                            if (word.startsWith("**") && word.endsWith("**")) {
                                edit = word.replace("**", "<span class=\"bold\">");
                                edit = edit.replace("**", "</span>");
                                titleArr.push(edit);
                            } else if (word.startsWith("**")) {
                                edit = word.replace("**", "<span class=\"bold\">");
                                titleArr.push(edit);
                            } else if (word.endsWith("**")) {
                                edit = word.replace("**", "</span>");
                                titleArr.push(edit);
                            } else if (word.startsWith("__") && word.endsWith("__")) {
                                edit = word.replace("**", "<span class=\"underline\">");
                                edit = edit.replace("**", "</span>");
                                titleArr.push(edit);
                            } else if (word.startsWith("__")) {
                                edit = word.replace("__", "<span class=\"underline\">");
                                titleArr.push(edit);
                            } else if (word.endsWith("__")) {
                                edit = word.replace("__", "</span>");
                                titleArr.push(edit);
                            } else if (word.startsWith("__**") && word.endsWith("**__")) {
                                edit = word.replace("__**", "<span class=\"underline bold\">");
                                edit = edit.replace("**__", "</span>");
                                titleArr.push(edit);
                            } else if (word.startsWith("__**")) {
                                edit = word.replace("__**", "<span class=\"underline\">");
                                titleArr.push(edit);
                            } else if (word.endsWith("**__")) {
                                edit = word.replace("**__", "</span>");
                                titleArr.push(edit);
                            } else {
                                titleArr.push(word);
                            };
                        });
                        const title = document.createElement('h1');
                        title.className = 'message-list-message-embed-title';
                        title.id = `message-list-message-embed-title-${embed.index}`;
                        title.innerHTML = `${titleArr.join(" ")}`;
                        embedContainer.appendChild(title);
                    };
                    if (embed.author !== "") {
                        const author = document.createElement('div');
                        author.className = 'message-list-message-embed-author';
                        author.id = `message-list-message-embed-author-${embed.index}`;
                        embedContainer.appendChild(author);
                        const icon = document.createElement('img');
                        icon.className = 'message-list-message-embed-author-icon';
                        icon.id = `message-list-message-embed-author-icon-${embed.index}`;
                        icon.src = `${embed.author.iconURL}`;
                        author.appendChild(icon);
                        if (embed.author.url) {
                            const link = document.createElement('a');
                            link.href = `${embed.author.url}`;
                            author.appendChild(link);
                            const name = document.createElement('h1');
                            name.className = 'message-list-message-embed-author-name';
                            name.id = `message-list-message-embed-author-name-${embed.index}`;
                            name.innerHTML = `${embed.author.name}`;
                            link.appendChild(name);
                        } else {
                            const name = document.createElement('h1');
                            name.className = 'message-list-message-embed-author-name';
                            name.id = `message-list-message-embed-author-name-${embed.index}`;
                            name.innerHTML = `${embed.author.name}`;
                            author.appendChild(name);
                        };
                    };
                    if (embed.description !== undefined && embed.description !== null) {
                        const split = embed.description.split(" ");
                        const textArr = new Array();
                        split.forEach((word) => {
                            let edit;
                            if (word.startsWith("**") && word.endsWith("**")) {
                                edit = word.replace("**", "<span class=\"bold\">");
                                edit = edit.replace("**", "</span>");
                                textArr.push(edit);
                            } else if (word.startsWith("**")) {
                                edit = word.replace("**", "<span class=\"bold\">");
                                textArr.push(edit);
                            } else if (word.endsWith("**")) {
                                edit = word.replace("**", "</span>");
                                textArr.push(edit);
                            } else if (word.startsWith("__") && word.endsWith("__")) {
                                edit = word.replace("**", "<span class=\"underline\">");
                                edit = edit.replace("**", "</span>");
                                textArr.push(edit);
                            } else if (word.startsWith("__")) {
                                edit = word.replace("__", "<span class=\"underline\">");
                                textArr.push(edit);
                            } else if (word.endsWith("__")) {
                                edit = word.replace("__", "</span>");
                                textArr.push(edit);
                            } else if (word.startsWith("__**") && word.endsWith("**__")) {
                                edit = word.replace("__**", "<span class=\"underline bold\">");
                                edit = edit.replace("**__", "</span>");
                                textArr.push(edit);
                            } else if (word.startsWith("__**")) {
                                edit = word.replace("__**", "<span class=\"underline\">");
                                textArr.push(edit);
                            } else if (word.endsWith("**__")) {
                                edit = word.replace("**__", "</span>");
                                textArr.push(edit);
                            } else {
                                textArr.push(word);
                            };
                        });
                        const description = document.createElement('p');
                        description.className = 'message-list-message-embed-description';
                        description.id = `message-list-message-embed-description-${embed.index}`;
                        description.innerHTML = `${textArr.join(" ")}`;
                        embedContainer.appendChild(description);
                    };
                    if (embed.fields.length > 0) {
                        let index = 0;
                        embed.fields.forEach((field) => {
                            const valueSplit = field.value.split(" ");
                            const valueArr = new Array();
                            valueSplit.forEach((word) => {
                                let edit;
                                if (word.startsWith("**") && word.endsWith("**")) {
                                    edit = word.replace("**", "<span class=\"bold\">");
                                    edit = edit.replace("**", "</span>");
                                    valueArr.push(edit);
                                } else if (word.startsWith("**")) {
                                    edit = word.replace("**", "<span class=\"bold\">");
                                    valueArr.push(edit);
                                } else if (word.endsWith("**")) {
                                    edit = word.replace("**", "</span>");
                                    valueArr.push(edit);
                                } else if (word.startsWith("__") && word.endsWith("__")) {
                                    edit = word.replace("**", "<span class=\"underline\">");
                                    edit = edit.replace("**", "</span>");
                                    valueArr.push(edit);
                                } else if (word.startsWith("__")) {
                                    edit = word.replace("__", "<span class=\"underline\">");
                                    valueArr.push(edit);
                                } else if (word.endsWith("__")) {
                                    edit = word.replace("__", "</span>");
                                    valueArr.push(edit);
                                } else if (word.startsWith("__**") && word.endsWith("**__")) {
                                    edit = word.replace("__**", "<span class=\"underline bold\">");
                                    edit = edit.replace("**__", "</span>");
                                    valueArr.push(edit);
                                } else if (word.startsWith("__**")) {
                                    edit = word.replace("__**", "<span class=\"underline\">");
                                    valueArr.push(edit);
                                } else if (word.endsWith("**__")) {
                                    edit = word.replace("**__", "</span>");
                                    valueArr.push(edit);
                                } else {
                                    valueArr.push(word);
                                };
                            });
                            const nameSplit = field.name.split(" ");
                            const nameArr = new Array();
                            nameSplit.forEach((word) => {
                                let edit;
                                if (word.startsWith("**") && word.endsWith("**")) {
                                    edit = word.replace("**", "<span class=\"bold\">");
                                    edit = edit.replace("**", "</span>");
                                    nameArr.push(edit);
                                } else if (word.startsWith("**")) {
                                    edit = word.replace("**", "<span class=\"bold\">");
                                    nameArr.push(edit);
                                } else if (word.endsWith("**")) {
                                    edit = word.replace("**", "</span>");
                                    nameArr.push(edit);
                                } else if (word.startsWith("__") && word.endsWith("__")) {
                                    edit = word.replace("**", "<span class=\"underline\">");
                                    edit = edit.replace("**", "</span>");
                                    nameArr.push(edit);
                                } else if (word.startsWith("__")) {
                                    edit = word.replace("__", "<span class=\"underline\">");
                                    nameArr.push(edit);
                                } else if (word.endsWith("__")) {
                                    edit = word.replace("__", "</span>");
                                    nameArr.push(edit);
                                } else if (word.startsWith("__**") && word.endsWith("**__")) {
                                    edit = word.replace("__**", "<span class=\"underline bold\">");
                                    edit = edit.replace("**__", "</span>");
                                    nameArr.push(edit);
                                } else if (word.startsWith("__**")) {
                                    edit = word.replace("__**", "<span class=\"underline\">");
                                    nameArr.push(edit);
                                } else if (word.endsWith("**__")) {
                                    edit = word.replace("**__", "</span>");
                                    nameArr.push(edit);
                                } else {
                                    nameArr.push(word);
                                };
                            });
                            const fieldContainer = document.createElement('div');
                            fieldContainer.className = 'message-list-message-embed-field';
                            fieldContainer.id = `message-list-message-embed-field-${embed.index}-${index}`;
                            embedContainer.appendChild(fieldContainer);
                            const name = document.createElement('h1');
                            name.className = 'message-list-message-embed-field-name';
                            name.id = `message-list-message-embed-field-name-${embed.index}-${index}`;
                            name.innerHTML = `${nameArr.join(" ")}`;
                            fieldContainer.appendChild(name);
                            const value = document.createElement('p');
                            value.className = 'message-list-message-embed-field-value';
                            value.id = `message-list-message-embed-field-value-${embed.index}-${index}`;
                            value.innerHTML = `${valueArr.join(" ")}`;
                            fieldContainer.appendChild(value);
                            index++;
                        });
                    };
                    if (embed.thumbnail) {
                        const thumbnail = document.createElement('img');
                        thumbnail.className = 'message-list-message-embed-thumbnail';
                        thumbnail.id = `message-list-message-embed-thumbnail-${embed.index}`;
                        thumbnail.src = `${embed.thumbnail.url}`;
                        embedContainer.appendChild(thumbnail);
                    };
                    if (embed.attachments) {
                        if (embed.attachments.length > 0) {
                            let index = 0;
                            embed.attachments.forEach((attachmentData) => {
                                const attachment = document.createElement('img');
                                attachment.className = 'message-list-message-embed-attachment';
                                attachment.id = `message-list-message-embed-attachment-${embed.index}-${index}`;
                                attachment.src = `${attachmentData.url}`;
                                embedContainer.appendChild(attachment);
                            });
                        };
                    };
                    if (embed.footer) {
                        const footer = document.createElement('div');
                        footer.className = 'message-list-message-embed-footer';
                        footer.id = `message-list-message-embed-footer-${embed.index}`;
                        embedContainer.appendChild(footer);
                        const icon = document.createElement('img');
                        icon.className = 'message-list-message-embed-footer-icon';
                        icon.id = `message-list-message-embed-footer-icon-${embed.index}`;
                        icon.src = `${embed.footer.iconURL}`;
                        footer.appendChild(icon);
                        const text = document.createElement('h1');
                        text.className = 'message-list-message-embed-footer-text';
                        text.id = `message-list-message-embed-footer-text-${embed.index}`;
                        text.innerHTML = `${embed.footer.text}`;
                        footer.appendChild(text);
                    };
                });
            };
            if (data.content !== "") {
                const text = document.createElement('p');
                text.className = 'message-list-message-content';
                text.id = `message-list-message-content-${data.id}`;
                text.innerHTML = `${data.content}`;
                message.appendChild(text);
            };
            if (data.attachments.length > 0) {
                const attachmentsList = document.createElement('ul');
                attachmentsList.className = "message-list-message-attachments";
                attachmentsList.id = `message-list-message-attachments-${data.id}`;
                message.appendChild(attachmentsList);
                let index = 0;
                data.attachments.forEach((attachmentData) => {
                    const item = document.createElement('li');
                    item.className = "message-list-message-attachments-attachment";
                    item.id = `message-list-message-attachments-attachment-${data.id}-${index}`;
                    attachmentsList.appendChild(item);
                    const image = document.createElement('img');
                    image.className = "message-list-message-attachments-attachment-image";
                    image.id = `message-list-message-attachments-attachment-image-${data.id}-${index}`;
                    image.src = `${attachmentData}`;
                    item.appendChild(image);
                    index++
                });
            };
            if (data.hasThread === true) {
                const threadContainer = document.createElement('div');
                threadContainer.className = "message-list-message-thread";
                threadContainer.id = `message-list-message-thread-${data.id}`;
                threadContainer.style.display = "none";
                bodyContainer.appendChild(threadContainer);
                const channelName = document.createElement('h1');
                channelName.className = "message-list-message-thread-name";
                channelName.id = `message-list-message-thread-name-${data.id}`;
                channelName.innerHTML = `${data.thread.name}`;
                threadContainer.appendChild(channelName);
                const messageList = document.createElement('ul');
                messageList.className = "message-list-message-thread-messages";
                messageList.id = `message-list-message-thread-messages-${data.id}`;
                threadContainer.appendChild(messageList);
                const closeButton = document.createElement('button');
                closeButton.className = "message-list-message-thread-closeButton";
                closeButton.id = `message-list-message-thread-closeButton-${data.id}`;
                closeButton.innerHTML = 'Close';
                threadContainer.appendChild(closeButton);
                closeButton.addEventListener('click', () => {
                    threadContainer.style.display = 'none';
                });
                data.thread.messages.forEach((threadMessage) => {
                    const created2 = new Date(threadMessage.createdTimestamp);
                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    let hours;
                    let dayTime;
                    if (created.getHours() > 12) {
                        hours = created.getHours() - 12;
                        dayTime = 'pm';
                    } else if (created.getHours() === 0) {
                        hours = 12;
                        dayTime = 'am';
                    } else {
                        hours = created.getHours();
                        dayTime = 'am';
                    }
                    const createdString2 = `${months[created2.getMonth()]} ${created2.getDate()}, ${created2.getFullYear()} ${hours}:${created2.getMinutes().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })} ${dayTime}`
                    const message = document.createElement('li');
                    message.className = 'message-list-message-thread-messages-message';
                    message.id = `message-list-message-thread-messages-message-${threadMessage.id}`;
                    messageList.appendChild(message);
                    const sender = document.createElement('div');
                    sender.className = 'message-list-message-thread-messages-sender';
                    sender.id = `message-list-message-thread-messages-sender-${threadMessage.id}`;
                    message.appendChild(sender);
                    const senderAvatar = document.createElement('img');
                    senderAvatar.className = 'message-list-message-thread-messages-sender-avatar';
                    senderAvatar.id = `message-list-message-thread-messages-sender-avatar-${threadMessage.id}`;
                    senderAvatar.src = `${threadMessage.author.avatar}`;
                    sender.appendChild(senderAvatar);
                    const senderName = document.createElement('h1');
                    senderName.className = 'message-list-message-thread-messages-sender-name';
                    senderName.id = `message-list-message-thread-messages-sender-name-${threadMessage.id}`;
                    senderName.innerHTML = `${threadMessage.author.username}#${threadMessage.author.discriminator}`;
                    sender.appendChild(senderName);
                    const timestamp = document.createElement('h1');
                    timestamp.className = 'message-list-message-thread-messages-timestamp';
                    timestamp.id = `message-list-message-thread-messages-timestamp-${threadMessage.id}`;
                    timestamp.innerHTML = createdString2;
                    sender.appendChild(timestamp);
                    if (threadMessage.embeds.length > 0) {
                        threadMessage.embeds.forEach((embed) => {
                            const embedContainer = document.createElement('div');
                            embedContainer.className = 'message-list-message-thread-messages-embed';
                            embedContainer.id = `message-list-message-thread-messages-embed-${embed.index}`;
                            message.appendChild(embedContainer);
                            if (embed.title !== null && embed.title !== undefined && embed.title !== "") {
                                const titleSplit = embed.title.split(" ");
                                const titleArr = new Array();
                                titleSplit.forEach((word) => {
                                    let edit;
                                    if (word.startsWith("**") && word.endsWith("**")) {
                                        edit = word.replace("**", "<span class=\"bold\">");
                                        edit = edit.replace("**", "</span>");
                                        titleArr.push(edit);
                                    } else if (word.startsWith("**")) {
                                        edit = word.replace("**", "<span class=\"bold\">");
                                        titleArr.push(edit);
                                    } else if (word.endsWith("**")) {
                                        edit = word.replace("**", "</span>");
                                        titleArr.push(edit);
                                    } else if (word.startsWith("__") && word.endsWith("__")) {
                                        edit = word.replace("**", "<span class=\"underline\">");
                                        edit = edit.replace("**", "</span>");
                                        titleArr.push(edit);
                                    } else if (word.startsWith("__")) {
                                        edit = word.replace("__", "<span class=\"underline\">");
                                        titleArr.push(edit);
                                    } else if (word.endsWith("__")) {
                                        edit = word.replace("__", "</span>");
                                        titleArr.push(edit);
                                    } else if (word.startsWith("__**") && word.endsWith("**__")) {
                                        edit = word.replace("__**", "<span class=\"underline bold\">");
                                        edit = edit.replace("**__", "</span>");
                                        titleArr.push(edit);
                                    } else if (word.startsWith("__**")) {
                                        edit = word.replace("__**", "<span class=\"underline\">");
                                        titleArr.push(edit);
                                    } else if (word.endsWith("**__")) {
                                        edit = word.replace("**__", "</span>");
                                        titleArr.push(edit);
                                    } else {
                                        titleArr.push(word);
                                    };
                                });
                                const title = document.createElement('h1');
                                title.className = 'message-list-message-thread-messages-embed-title';
                                title.id = `message-list-message-thread-messages-embed-title-${embed.index}`;
                                title.innerHTML = `${titleArr.join(" ")}`;
                                embedContainer.appendChild(title);
                            };
                            if (embed.author !== "") {
                                const author = document.createElement('div');
                                author.className = 'message-list-message-thread-messages-embed-author';
                                author.id = `message-list-message-thread-messages-embed-author-${embed.index}`;
                                embedContainer.appendChild(author);
                                const icon = document.createElement('img');
                                icon.className = 'message-list-message-thread-messages-embed-author-icon';
                                icon.id = `message-list-message-thread-messages-embed-author-icon-${embed.index}`;
                                icon.src = `${embed.author.iconURL}`;
                                author.appendChild(icon);
                                if (embed.author.url) {
                                    const link = document.createElement('a');
                                    link.href = `${embed.author.url}`;
                                    author.appendChild(link);
                                    const name = document.createElement('h1');
                                    name.className = 'message-list-message-thread-messages-embed-author-name';
                                    name.id = `message-list-message-thread-messages-embed-author-name-${embed.index}`;
                                    name.innerHTML = `${embed.author.name}`;
                                    link.appendChild(name);
                                } else {
                                    const name = document.createElement('h1');
                                    name.className = 'message-list-message-thread-messages-embed-author-name';
                                    name.id = `message-list-message-thread-messages-embed-author-name-${embed.index}`;
                                    name.innerHTML = `${embed.author.name}`;
                                    author.appendChild(name);
                                };
                            };
                            if (embed.description !== undefined && embed.description !== null) {
                                const split = embed.description.split(" ");
                                const textArr = new Array();
                                split.forEach((word) => {
                                    let edit;
                                    if (word.startsWith("**") && word.endsWith("**")) {
                                        edit = word.replace("**", "<span class=\"bold\">");
                                        edit = edit.replace("**", "</span>");
                                        textArr.push(edit);
                                    } else if (word.startsWith("**")) {
                                        edit = word.replace("**", "<span class=\"bold\">");
                                        textArr.push(edit);
                                    } else if (word.endsWith("**")) {
                                        edit = word.replace("**", "</span>");
                                        textArr.push(edit);
                                    } else if (word.startsWith("__") && word.endsWith("__")) {
                                        edit = word.replace("**", "<span class=\"underline\">");
                                        edit = edit.replace("**", "</span>");
                                        textArr.push(edit);
                                    } else if (word.startsWith("__")) {
                                        edit = word.replace("__", "<span class=\"underline\">");
                                        textArr.push(edit);
                                    } else if (word.endsWith("__")) {
                                        edit = word.replace("__", "</span>");
                                        textArr.push(edit);
                                    } else if (word.startsWith("__**") && word.endsWith("**__")) {
                                        edit = word.replace("__**", "<span class=\"underline bold\">");
                                        edit = edit.replace("**__", "</span>");
                                        textArr.push(edit);
                                    } else if (word.startsWith("__**")) {
                                        edit = word.replace("__**", "<span class=\"underline\">");
                                        textArr.push(edit);
                                    } else if (word.endsWith("**__")) {
                                        edit = word.replace("**__", "</span>");
                                        textArr.push(edit);
                                    } else {
                                        textArr.push(word);
                                    };
                                });
                                const description = document.createElement('p');
                                description.className = 'message-list-message-thread-messages-embed-description';
                                description.id = `message-list-message-thread-messages-embed-description-${embed.index}`;
                                description.innerHTML = `${textArr.join(" ")}`;
                                embedContainer.appendChild(description);
                            };
                            if (embed.fields.length > 0) {
                                let index = 0;
                                embed.fields.forEach((field) => {
                                    const valueSplit = field.value.split(" ");
                                    const valueArr = new Array();
                                    valueSplit.forEach((word) => {
                                        let edit;
                                        if (word.startsWith("**") && word.endsWith("**")) {
                                            edit = word.replace("**", "<span class=\"bold\">");
                                            edit = edit.replace("**", "</span>");
                                            valueArr.push(edit);
                                        } else if (word.startsWith("**")) {
                                            edit = word.replace("**", "<span class=\"bold\">");
                                            valueArr.push(edit);
                                        } else if (word.endsWith("**")) {
                                            edit = word.replace("**", "</span>");
                                            valueArr.push(edit);
                                        } else if (word.startsWith("__") && word.endsWith("__")) {
                                            edit = word.replace("**", "<span class=\"underline\">");
                                            edit = edit.replace("**", "</span>");
                                            valueArr.push(edit);
                                        } else if (word.startsWith("__")) {
                                            edit = word.replace("__", "<span class=\"underline\">");
                                            valueArr.push(edit);
                                        } else if (word.endsWith("__")) {
                                            edit = word.replace("__", "</span>");
                                            valueArr.push(edit);
                                        } else if (word.startsWith("__**") && word.endsWith("**__")) {
                                            edit = word.replace("__**", "<span class=\"underline bold\">");
                                            edit = edit.replace("**__", "</span>");
                                            valueArr.push(edit);
                                        } else if (word.startsWith("__**")) {
                                            edit = word.replace("__**", "<span class=\"underline\">");
                                            valueArr.push(edit);
                                        } else if (word.endsWith("**__")) {
                                            edit = word.replace("**__", "</span>");
                                            valueArr.push(edit);
                                        } else {
                                            valueArr.push(word);
                                        };
                                    });
                                    const nameSplit = field.name.split(" ");
                                    const nameArr = new Array();
                                    nameSplit.forEach((word) => {
                                        let edit;
                                        if (word.startsWith("**") && word.endsWith("**")) {
                                            edit = word.replace("**", "<span class=\"bold\">");
                                            edit = edit.replace("**", "</span>");
                                            nameArr.push(edit);
                                        } else if (word.startsWith("**")) {
                                            edit = word.replace("**", "<span class=\"bold\">");
                                            nameArr.push(edit);
                                        } else if (word.endsWith("**")) {
                                            edit = word.replace("**", "</span>");
                                            nameArr.push(edit);
                                        } else if (word.startsWith("__") && word.endsWith("__")) {
                                            edit = word.replace("**", "<span class=\"underline\">");
                                            edit = edit.replace("**", "</span>");
                                            nameArr.push(edit);
                                        } else if (word.startsWith("__")) {
                                            edit = word.replace("__", "<span class=\"underline\">");
                                            nameArr.push(edit);
                                        } else if (word.endsWith("__")) {
                                            edit = word.replace("__", "</span>");
                                            nameArr.push(edit);
                                        } else if (word.startsWith("__**") && word.endsWith("**__")) {
                                            edit = word.replace("__**", "<span class=\"underline bold\">");
                                            edit = edit.replace("**__", "</span>");
                                            nameArr.push(edit);
                                        } else if (word.startsWith("__**")) {
                                            edit = word.replace("__**", "<span class=\"underline\">");
                                            nameArr.push(edit);
                                        } else if (word.endsWith("**__")) {
                                            edit = word.replace("**__", "</span>");
                                            nameArr.push(edit);
                                        } else {
                                            nameArr.push(word);
                                        };
                                    });
                                    const fieldContainer = document.createElement('div');
                                    fieldContainer.className = 'message-list-message-thread-messages-embed-field';
                                    fieldContainer.id = `message-list-message-thread-messages-embed-field-${embed.index}-${index}`;
                                    embedContainer.appendChild(fieldContainer);
                                    const name = document.createElement('h1');
                                    name.className = 'message-list-message-thread-messages-embed-field-name';
                                    name.id = `message-list-message-thread-messages-embed-field-name-${embed.index}-${index}`;
                                    name.innerHTML = `${nameArr.join(" ")}`;
                                    fieldContainer.appendChild(name);
                                    const value = document.createElement('p');
                                    value.className = 'message-list-message-thread-messages-embed-field-value';
                                    value.id = `message-list-message-thread-messages-embed-field-value-${embed.index}-${index}`;
                                    value.innerHTML = `${valueArr.join(" ")}`;
                                    fieldContainer.appendChild(value);
                                    index++;
                                });
                            };
                            if (embed.thumbnail) {
                                const thumbnail = document.createElement('img');
                                thumbnail.className = 'message-list-message-thread-messages-embed-thumbnail';
                                thumbnail.id = `message-list-message-thread-messages-embed-thumbnail-${embed.index}`;
                                thumbnail.src = `${embed.thumbnail.url}`;
                                embedContainer.appendChild(thumbnail);
                            };
                            if (embed.attachments) {
                                if (embed.attachments.length > 0) {
                                    let index = 0;
                                    embed.attachments.forEach((attachmentData) => {
                                        const attachment = document.createElement('img');
                                        attachment.className = 'message-list-message-thread-messages-embed-attachment';
                                        attachment.id = `message-list-message-thread-messages-embed-attachment-${embed.index}-${index}`;
                                        attachment.src = `${attachmentData.url}`;
                                        embedContainer.appendChild(attachment);
                                    });
                                };
                            };
                            if (embed.footer) {
                                const footer = document.createElement('div');
                                footer.className = 'message-list-message-thread-messages-embed-footer';
                                footer.id = `message-list-message-thread-messages-embed-footer-${embed.index}`;
                                embedContainer.appendChild(footer);
                                const icon = document.createElement('img');
                                icon.className = 'message-list-message-thread-messages-embed-footer-icon';
                                icon.id = `message-list-message-thread-messages-embed-footer-icon-${embed.index}`;
                                icon.src = `${embed.footer.iconURL}`;
                                footer.appendChild(icon);
                                const text = document.createElement('h1');
                                text.className = 'message-list-message-thread-messages-embed-footer-text';
                                text.id = `message-list-message-thread-messages-embed-footer-text-${embed.index}`;
                                text.innerHTML = `${embed.footer.text}`;
                                footer.appendChild(text);
                            };
                            if (embed.stickers) {
                                if (embed.stickers.length > 0) {
                                    let index = 0;
                                    embed.stickers.forEach((sticker) => {
                                        const item = document.createElement('li');
                                        item.className = "message-list-message-thread-messages-embed-stickers-sticker";
                                        item.id = `message-list-message-thread-messages-embed-stickers-sticker-${embed.index}-${index}`;
                                        attachmentsList.appendChild(item);
                                        const image = document.createElement('img');
                                        image.className = "message-list-message-thread-messages-embed-stickers-sticker-image";
                                        image.id = `message-list-message-thread-messages-embed-stickers-sticker-image-${embed.index}-${index}`;
                                        image.src = `${sticker.url}`;
                                        item.appendChild(image);
                                        index++
                                    });
                                };
                            };
                        });
                    };
                    if (threadMessage.content !== "") {
                        if (threadMessage.content.startsWith("https")) {
                            const image = document.createElement('video');
                            image.className = "message-list-message-thread-messages-attachments-attachment-image";
                            image.id = `message-list-message-thread-messages-attachments-attachment-image-${threadMessage.id}`;
                            image.src = `${threadMessage.embeds[0].video.url}`;
                            threadContainer.addEventListener('mouseover', () => {
                                image.play();
                                image.loop = true;
                            });
                            message.appendChild(image);
                        };
                        const text = document.createElement('p');
                        text.className = 'message-list-message-thread-messages-content';
                        text.id = `message-list-message-thread-messages-content-${threadMessage.id}`;
                        text.innerHTML = `${threadMessage.content}`;
                        message.appendChild(text);
                    };
                    if (threadMessage.attachments.length > 0) {
                        const attachmentsList = document.createElement('ul');
                        attachmentsList.className = "message-list-message-thread-messages-attachments";
                        attachmentsList.id = `message-list-message-thread-messages-attachments-${threadMessage.id}`;
                        message.appendChild(attachmentsList);
                        let index = 0;
                        threadMessage.attachments.forEach((attachmentData) => {
                            const item = document.createElement('li');
                            item.className = "message-list-message-thread-messages-attachments-attachment";
                            item.id = `message-list-message-thread-messages-attachments-attachment-${threadMessage.id}-${index}`;
                            attachmentsList.appendChild(item);
                            const image = document.createElement('img');
                            image.className = "message-list-message-thread-messages-attachments-attachment-image";
                            image.id = `message-list-message-thread-messages-attachments-attachment-image-${threadMessage.id}-${index}`;
                            image.src = `${attachmentData}`;
                            item.appendChild(image);
                            index++
                        });
                    };
                    if (threadMessage.sticker) {
                        if (threadMessage.sticker.length > 0) {
                            const stickerList = document.createElement('ul');
                            stickerList.className = "message-list-message-thread-messages-stickers";
                            stickerList.id = `message-list-message-thread-messages-stickers-${threadMessage.id}`;
                            message.appendChild(stickerList);
                            let index = 0;
                            threadMessage.sticker.forEach((sticker) => {
                                if (!sticker.url.endsWith(".json")) {
                                    const item = document.createElement('li');
                                    item.className = "message-list-message-thread-messages-stickers-sticker";
                                    item.id = `message-list-message-thread-messages-stickers-sticker-${threadMessage.id}-${index}`;
                                    stickerList.appendChild(item);
                                    const image = document.createElement('img');
                                    image.className = "message-list-message-thread-messages-stickers-sticker-image";
                                    image.id = `message-list-message-thread-messages-stickers-sticker-image-${threadMessage.id}-${index}`;
                                    image.src = `${sticker.url}`;
                                    item.appendChild(image);
                                    index++
                                } else {
                                    const text = document.createElement('p');
                                    text.className = 'message-list-message-thread-messages-content';
                                    text.id = `message-list-message-thread-messages-content-${threadMessage.id}`;
                                    text.innerHTML = `Can not load sticker from discord servers <br> Sticker Name: ${sticker.name} <br> Sticker URL: ${sticker.url} <br> Sticker Id: ${sticker.id}`;
                                    message.appendChild(text);
                                }
                            });
                        };
                    };
                });
                const threadButton = document.createElement('button');
                threadButton.className = "message-list-message-thread-button";
                threadButton.id = `message-list-message-thread-button-${data.id}`;
                threadButton.innerHTML = `Open Thread`;
                message.appendChild(threadButton);
                threadButton.addEventListener('click', () => {
                    threadContainer.style.display = "flex";
                });
            };
        });
    });
    // End of page code
});