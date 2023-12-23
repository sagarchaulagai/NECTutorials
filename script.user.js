// ==UserScript==
// @name         Netflix Auto Login
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  This script fetches and imports cookies for Netflix, Prime Video, and Udemy(new).
// @author       Sagar Chaulagain
// @match        https://www.netflix.com/*
// @match        https://www.primevideo.com/*
// @match        https://www.udemy.com/*
// @grant        GM_cookie
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-end
// @downloadURL  https://github.com/sagarchaulagai/NECTutorials/raw/main/script.user.js
// @updateURL    https://github.com/sagarchaulagai/NECTutorials/raw/main/script.user.js
// ==/UserScript==

(async function () {
    console.log('Userscript loaded');

    const statusElement = document.createElement('p');
    statusElement.innerHTML = 'Status Unknown';
    document.body.appendChild(statusElement);

    // Get the reload count for Netflix
    let reloadCountNetflix = GM_getValue('reloadCountNetflix', 0);

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
            GM_setValue('reloadCountNetflix', 0);
            await fetchAndImportCookies('https://raw.githubusercontent.com/sagarchaulagai/NECTutorials/main/Something.txt');
        } else if (window.location.href === 'https://www.netflix.com/browse') {
            GM_setValue('reloadCountNetflix', 0);
            statusElement.innerHTML = 'Already Logged In';
        } else if (window.location.href.startsWith('https://www.primevideo.com/offers/nonprimehomepage/')) {
            // Reset the reload count for Netflix when navigating to Prime Video
            GM_setValue('reloadCountNetflix', 0);
            await fetchAndImportCookies('https://raw.githubusercontent.com/sagarchaulagai/NECTutorials/main/prime.txt');
        } else if (window.location.href.startsWith('https://www.primevideo.com/region/na/')) {
            GM_setValue('reloadCountNetflix', 0);
            statusElement.innerHTML = 'Already Logged In Prime Video';
        } else if (window.location.href === 'https://www.udemy.com/') {
            // Reset the reload count for Netflix when navigating to Udemy
            GM_setValue('reloadCountNetflix', 0);
            await fetchAndImportCookies('https://raw.githubusercontent.com/sagarchaulagai/NECTutorials/main/udemy.txt');
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

        // Increment the reload count for Netflix
        reloadCountNetflix++;

        // Check if the reload count is less than or equal to 2
        if (reloadCountNetflix <= 2) {
            // Set the updated reload count for Netflix
            GM_setValue('reloadCountNetflix', reloadCountNetflix);

            // Reload the page after setting cookies
            window.location.reload();
        } else {
            // Reset the reload count for Netflix after reaching the limit
            GM_setValue('reloadCountNetflix', 0);
        }
    }

    main();
})();
