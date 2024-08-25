if (window.location.origin.includes("http://127.0.0.1:3000")) {
    window.location.pathname = 'home.html';
} else {
    window.location.pathname = 'home';

};
