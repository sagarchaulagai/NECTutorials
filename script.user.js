// ==UserScript==
// @name         Netflix Auto Login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  This script fetches and imports cookies for Netflix and Prime Video.
// @author       Sagar Chaulagain
// @match        https://www.netflix.com/*
// @match        https://www.primevideo.com/*
// @grant        GM_cookie
// @run-at       document-end
// @downloadURL  https://github.com/sagarchaulagai/NECTutorials/raw/main/script.user.js
// @updateURL    https://github.com/sagarchaulagai/NECTutorials/raw/main/script.user.js
// ==/UserScript==

(async function () {
    console.log('Userscript loaded');

    const statusElement = document.createElement('p');
    statusElement.innerHTML = 'Status Unknown';
    document.body.appendChild(statusElement);

    async function fetchAndImportCookies(cookieUrl, successMessage) {
        statusElement.innerHTML = 'Fetching Cookies';

        try {
            const response = await fetch(cookieUrl);
            const data = await response.json();

            statusElement.innerHTML = 'Cookies Fetched';
            console.log(data);
            importCookies(data);
        } catch (error) {
            console.error('Error fetching cookies:', error);
            statusElement.innerHTML = 'Error Fetching Cookies';
        }
    }

    async function main() {
        if (window.location.href === 'https://www.netflix.com/np/') {
            await fetchAndImportCookies('https://raw.githubusercontent.com/sagarchaulagai/NECTutorials/main/Something.txt');
        } else if (window.location.href === 'https://www.netflix.com/browse') {
            statusElement.innerHTML = 'Already Logged In';
        } else if (window.location.href.startsWith('https://www.primevideo.com/offers/nonprimehomepage/')) {
            await fetchAndImportCookies('https://raw.githubusercontent.com/sagarchaulagai/NECTutorials/main/prime.txt');
        } else if (window.location.href.startsWith('https://www.primevideo.com/region/na/')) {
            statusElement.innerHTML = 'Already Logged In Prime Video';
        } else {
            statusElement.innerHTML = 'Only Works in Netflix Nepal & Prime Video';
        }
    }

    async function importCookies(cookieData) {
        statusElement.innerHTML = 'Cookies Imported';

        for (const cookie of cookieData) {
            const { name, value, domain, path, secure, httpOnly, sameSite, expirationDate } = cookie;

            const cookieDetails = {
                url: window.location.href,
                name,
                value,
                domain,
                path: path || '/',
                secure: secure || false,
                httpOnly: httpOnly || false,
                sameSite: sameSite || 'no_restriction',
                expirationDate: expirationDate || Math.floor((Date.now() + 365 * 24 * 60 * 60 * 1000) / 1000),
            };

            statusElement.innerHTML = 'Cookies Imported';

            try {
                await new Promise(resolve =>
                    GM_cookie.set(cookieDetails, resolve)
                );
                console.log('Cookie set:', cookie);
            } catch (error) {
                console.error('Error setting cookie:', error);
            }
        }

        // Reload the page after setting cookies
        window.location.reload();
    }

    main();
})();

