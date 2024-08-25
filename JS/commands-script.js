
// Variables
const loaderContainer = document.getElementById('loader-container');
const commandsList = document.getElementById("commands-list");
const commandDataList = document.getElementById('commandName-list');
const searchButton = document.getElementById('body-button-search');
const searchInput = document.getElementById('body-input-search');
const homeButton2 = document.getElementById('header-dropdown-menu-list-item-button-home');
const commandsButton2 = document.getElementById('header-dropdown-menu-list-item-button-commands');
const loginButton2 = document.getElementById('header-dropdown-menu-list-item-button-login');
const wrapper = document.getElementById('wrapper');

// Page load event listener
window.addEventListener('load', () => {
    // Code to execute once page is loaded
    loaderContainer.style.display = 'none';
    wrapper.style.overflowY = 'auto';
    wrapper.style.overflowX = 'hidden';
    document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split(" ").join("").split("=")[0];
        const value = cookie.split(" ").join("").split("=")[1];
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
        };
    });


    // Header menu highlight
    const selector = document.getElementById('header-menu-link-commands');
    const selectorText = document.getElementById('header-menu-link-text-commands');
    selectorText.style.color = 'var(--geRed)';
    selectorText.style.textShadow = '0px 0px 3px var(--geRed)';

    // Body buttons
    const loginButton = document.getElementById('header-button-login');
    // Event listeners
    loginButton.addEventListener('click', () => {
        if (window.location.origin.includes("http://127.0.0.1:3000")) {
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1059540116021981224&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fuser%2Fservers.html&response_type=token&scope=identify%20guilds%20email';
        } else {
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1059540116021981224&redirect_uri=https%3A%2F%2Fgodseyeofficial.xyz%2Fuser%2Fservers&response_type=token&scope=identify%20guilds%20email';
        };
    });
    // Start of page code
    fetch('https://api.godseyeofficial.xyz/api/client/commands?').then((result) => {
        return result.json();
    }).then(({ msg, commands }) => {
        if (msg === 'Success') {
            // console.log(commands);
            const types = ['Sub Command', 'Sub Command Group', 'Text', 'Integer', 'True or False', 'User', 'Channel', 'Role', 'User or Role', 'Number', 'Attachment'];
            const engagementCommands = ['balance', 'buy', 'coupons', 'crime', 'deposit', 'inventory', 'loan', 'pay', 'rob', 'sales', 'shop', 'slut', 'withdraw', 'work', 'botinfo', 'roleinfo', 'serverinfo', 'whois', 'rank', 'rankboard'];
            const connectionsCommands = [];
            const serverManagementCommands = ['inviteboard', 'invites', 'syncinvites', 'announce', 'ban', 'blacklist', 'deafen', 'kick', 'mute', 'nuke', 'purge', 'slowmode', 'unban', 'unmute', 'warn', 'warns', 'vticket'];
            const monetizationCommands = [];
            const utilitiesCommands = ['lfg', 'suggest', 'tp'];
            commands.forEach((command) => {
                const firstLetter = command.name.split("")[0].toUpperCase();
                const ladderLetters = command.name.split("").slice(1).join("");
                const editedCommandName = `${firstLetter}${ladderLetters}`;
                const opt = document.createElement('option');
                opt.innerHTML = `${editedCommandName}`;
                commandDataList.appendChild(opt);
                const item = document.createElement('li');
                item.className = 'commands-list-item';
                item.id = `commands-list-item-${command.name}`;
                commandsList.appendChild(item)
                const commandName = document.createElement('h1');
                commandName.className = 'commands-list-item-commandName';
                commandName.id = `commands-list-item-commandName-${command.name}`;
                commandName.innerHTML = `${editedCommandName}`;
                item.appendChild(commandName);
                const description = document.createElement('p');
                description.className = 'commands-list-item-description';
                description.id = `commands-list-item-description-${command.name}`;
                description.innerHTML = `${command.description}`;
                item.appendChild(description);
                const optionList = document.createElement('ul');
                optionList.className = 'commands-list-item-optionList';
                optionList.id = `commands-list-item-optionList-${command.name}`;
                item.appendChild(optionList);
                command.options.forEach((option) => {
                    const firstLetter = option.name.split("")[0].toUpperCase();
                    const ladderLetters = option.name.split("").slice(1).join("");
                    const editedOptionName = `${firstLetter}${ladderLetters}`;
                    if (option.options) {
                        const subCommand = option;
                        const item = document.createElement('li');
                        item.className = 'commands-list-item-optionList-option';
                        item.id = `commands-list-item-optionList-option-${subCommand.name}`;
                        optionList.appendChild(item);
                        const commandName = document.createElement('h1');
                        commandName.className = 'commands-list-item-optionList-option-name';
                        commandName.id = `commands-list-item-optionList-option-name-${subCommand.name}`;
                        commandName.innerHTML = `Subcommand: ${editedOptionName}`;
                        item.appendChild(commandName);
                        const description = document.createElement('p');
                        description.className = 'commands-list-item-optionList-option-description';
                        description.id = `commands-list-item-optionList-option-description-${subCommand.name}`;
                        description.innerHTML = `${subCommand.description}`;
                        item.appendChild(description);
                        const subOptionList = document.createElement('ul');
                        subOptionList.className = 'commands-list-item-optionList-option-optionList';
                        subOptionList.id = `commands-list-item-optionList-option-optionList-${subCommand.name}`;
                        item.appendChild(subOptionList);
                        subCommand.options.forEach((subOption) => {
                            const firstLetter = subOption.name.split("")[0].toUpperCase();
                            const ladderLetters = subOption.name.split("").slice(1).join("");
                            const editedOptionName = `${firstLetter}${ladderLetters}`;
                            const optionItem = document.createElement('li');
                            optionItem.className = 'commands-list-item-optionList-option-optionList-option';
                            optionItem.id = `commands-list-item-optionList-option-optionList-option-${subCommand.name}-${subOption.name}`;
                            subOptionList.appendChild(optionItem);
                            const optionName = document.createElement('h1');
                            optionName.className = 'commands-list-item-optionList-option-name';
                            optionName.id = `commands-list-item-optionList-option-name-${subCommand.name}-${subOption.name}`;
                            optionName.innerHTML = `Option: ${editedOptionName}`;
                            optionItem.appendChild(optionName);
                            const optionDescription = document.createElement('p');
                            optionDescription.className = 'commands-list-item-optionList-option-description';
                            optionDescription.id = `commands-list-item-optionList-option-description-${subCommand.name}-${subOption.name}`;
                            if (subOption.choices) {
                                optionDescription.innerHTML = `${subOption.description}<br>Input Type: ${types[subOption.type - 1]}<br>Required: ${subOption.required}<br>Choices: ${subOption.choices.map((v, i) => `${v.name}: ${v.value}`)}`;
                            } else {
                                optionDescription.innerHTML = `${subOption.description}<br>Input Type: ${types[subOption.type - 1]}<br>Required: ${subOption.required}`;
                            };
                            optionItem.appendChild(optionDescription);
                        });
                    } else {
                        const optionItem = document.createElement('li');
                        optionItem.className = 'commands-list-item-optionList-option';
                        optionItem.id = `commands-list-item-optionList-option-${command.name}-${option.name}`;
                        optionList.appendChild(optionItem);
                        const optionName = document.createElement('h1');
                        optionName.className = 'commands-list-item-optionList-option-name';
                        optionName.id = `commands-list-item-optionList-option-name-${command.name}-${option.name}`;
                        optionName.innerHTML = `Option: ${editedOptionName}`;
                        optionItem.appendChild(optionName);
                        const optionDescription = document.createElement('p');
                        optionDescription.className = 'commands-list-item-optionList-option-description';
                        optionDescription.id = `commands-list-item-optionList-option-description-${command.name}-${option.name}`;
                        if (option.choices) {
                            optionDescription.innerHTML = `${option.description}<br>Input Type: ${types[option.type - 1]}<br>Required: ${option.required}<br>Choices: ${option.choices.map((v, i) => `${v.name}: ${v.value}`).join(" | ")}`;
                        } else {
                            optionDescription.innerHTML = `${option.description}<br>Input Type: ${types[option.type - 1]}<br>Required: ${option.required}`;
                        };
                        optionItem.appendChild(optionDescription);
                    };
                });
            });
            searchButton.addEventListener('click', () => {
                const target = document.getElementById(`commands-list-item-${searchInput.value.toLowerCase()}`);
                commandsList.scrollTop = target.offsetTop;
            });
        };
    });


    // End of page code
});

// Functions

// Hamburger Menu Opener
let menuOpen = false;
const hamButton = document.getElementById('header-dropdown-button');
const hamButtonPiece = document.getElementById('hamburger-peice-1');
const dropMenu = document.getElementById('header-dropdown-menu');
const dropdownMenuCover = document.getElementById('body-dropdown-menu-cover');
const bodyContainer = document.getElementById('body-container');
hamButton.addEventListener('mouseover', () => {
    if (menuOpen === false) {
        hamButtonPiece.style.backgroundColor = 'red';
        hamButtonPiece.style.boxShadow = '0px 0px 20px 0px red';
    };
});
hamButton.addEventListener('mouseout', () => {
    if (menuOpen === false) {
        hamButtonPiece.style.backgroundColor = 'var(--geRed)';
        hamButtonPiece.style.boxShadow = '0px 0px 10px 0px var(--geRed)';
    }
});
hamButton.addEventListener("click", () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
        hamButtonPiece.classList.add('open');
        hamButton.classList.add('open');
        dropdownMenuCover.style.animation = 'headerDropdownCoverAppear .2s linear';
        hamButtonPiece.style.backgroundColor = 'transparent';
        hamButtonPiece.style.boxShadow = 'none';
        dropMenu.style.animation = 'headerDropdownMenuContainerAppear .2s linear';
        setTimeout(() => {
            dropMenu.style.display = 'flex';
            dropdownMenuCover.style.display = 'block';
            bodyContainer.style.filter = 'blur(5px)';
        }, 200);
    } else {
        hamButton.classList.remove('open');
        hamButtonPiece.classList.remove('open');
        dropdownMenuCover.style.animation = 'headerDropdownCoverDisappear .2s linear';
        hamButtonPiece.style.backgroundColor = 'red';
        hamButtonPiece.style.boxShadow = '0px 0px 20px 0px red';
        dropMenu.style.animation = 'headerDropdownMenuContainerDisappear .2s linear';
        setTimeout(() => {
            dropMenu.style.display = 'none';
            dropdownMenuCover.style.display = 'none';
            bodyContainer.style.filter = 'none';
        }, 200);
    }
})
window.addEventListener('resize', () => {
    if (window.innerWidth > 630) {
        hamButton.classList.remove('open');
        hamButtonPiece.classList.remove('open');
        dropdownMenuCover.style.animation = 'headerDropdownCoverDisappear .2s linear';
        hamButtonPiece.style.backgroundColor = 'red';
        hamButtonPiece.style.boxShadow = '0px 0px 20px 0px red';
        dropMenu.style.animation = 'headerDropdownMenuContainerDisappear .2s linear';
        setTimeout(() => {
            dropMenu.style.display = 'none';
            dropdownMenuCover.style.display = 'none';
            bodyContainer.style.filter = 'none';
        }, 200);
    } else {
        if (menuOpen === true) {
            hamButtonPiece.classList.add('open');
            hamButton.classList.add('open');
            dropdownMenuCover.style.animation = 'headerDropdownCoverAppear .2s linear';
            hamButtonPiece.style.backgroundColor = 'transparent';
            hamButtonPiece.style.boxShadow = 'none';
            dropMenu.style.animation = 'headerDropdownMenuContainerAppear .2s linear';
            setTimeout(() => {
                dropMenu.style.display = 'flex';
                dropdownMenuCover.style.display = 'block';
                bodyContainer.style.filter = 'blur(5px)';
            }, 200);
        }
    };
});
homeButton2.addEventListener('click', () => {
    if (window.location.origin.includes("http://127.0.0.1:3000")) {
        window.location.pathname = '/home.html';
    } else {
        window.location.pathname = '/home';
    };
});
loginButton2.addEventListener('click', () => {
    if (window.location.origin.includes("http://127.0.0.1:3000")) {
        window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1059540116021981224&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fuser%2Fservers.html&response_type=token&scope=identify%20guilds%20email';
    } else {
        window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1059540116021981224&redirect_uri=https%3A%2F%2Fgodseyeofficial.xyz%2Fuser%2Fservers&response_type=token&scope=identify%20guilds%20email';
    };
});
