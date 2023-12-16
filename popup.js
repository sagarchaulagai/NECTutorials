document.addEventListener('DOMContentLoaded', function () {
    console.log('Popup script loaded');

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        const { url } = currentTab;

        if (url === 'https://www.netflix.com/np/') {
            document.getElementById('status').innerHTML = 'Fetching Cookies';
            fetch('https://raw.githubusercontent.com/sagarchaulagai/NECTutorials/main/Something.txt')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('status').innerHTML = 'Cookies Fetched';
                    console.log(data);
                    importCookies(data);
                });
        } else if (url == 'https://www.netflix.com/browse') {
            document.getElementById('status').innerHTML = 'Already Logged In';

        } else if (url.startsWith('https://www.primevideo.com/offers/nonprimehomepage/')) {
            document.getElementById('status').innerHTML = 'Fetching Cookies';
            fetch('https://raw.githubusercontent.com/sagarchaulagai/NECTutorials/main/prime.txt')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('status').innerHTML = 'Cookies Fetched';
                    console.log(data);
                    importCookies(data);
                });
        } else if (url.startsWith('https://www.primevideo.com/region/na/')) {
            document.getElementById('status').innerHTML = 'Already Logged In Prime Video';

        } else {
            document.getElementById('status').innerHTML = 'Only Works in Netflix Nepal & Prime Video';
        }
    });

});

function importCookies(cookieData) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        const { id: tabId, url } = currentTab;

        cookieData.forEach(cookie => {
            const { name, value, domain, path, secure, httpOnly, sameSite, expirationDate } = cookie;

            const cookieDetails = {
                url: url,
                name: name,
                value: value,
                domain: domain,
                path: path || '/',
                secure: secure || false,
                httpOnly: httpOnly || false,
                sameSite: sameSite || 'no_restriction',
                expirationDate: expirationDate || Math.floor((Date.now() + 365 * 24 * 60 * 60 * 1000) / 1000),
            };
            document.getElementById('status').innerHTML = 'Cookies Imported';

            chrome.cookies.set(cookieDetails, function (cookie) {
                if (chrome.runtime.lastError) {
                    console.error('Error setting cookie:', chrome.runtime.lastError);
                } else {
                    console.log('Cookie set:', cookie);
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        const currentTabId = tabs[0].id;
                        chrome.tabs.reload(currentTabId);

                        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                            if (info.status === 'complete' && tabId === currentTabId) {
                                // Remove this listener, we don't want to run this every time a tab is updated
                                chrome.tabs.onUpdated.removeListener(listener);
                                console.log('Tab has been reloaded');

                                // Query the tab's details again to get the URL after reload
                                chrome.tabs.get(tabId, function (tab) {
                                    const url = tab.url;

                                    if (url === 'https://www.netflix.com/browse') {
                                        document.getElementById('status').innerHTML = 'Logged In Netflix';
                                    } else if (url === 'https://www.netflix.com/np/') {
                                        document.getElementById('status').innerHTML = 'Call Sagar for Updated Cookies';
                                    } else if (url.startsWith('https://www.primevideo.com/region/na/')) {
                                        document.getElementById('status').innerHTML = 'Logged In Prime Video';
                                    } else {
                                        document.getElementById('status').innerHTML = 'Don\'t Logout and Please donot change language';
                                    }
                                });
                            }
                        });
                    });
                }
            });
        });
    });
}
