document.addEventListener('DOMContentLoaded', function () {
    // Get extension toggle and mode radio buttons
    const toggleExtension = document.getElementById('toggleExtension');
    const lightMode = document.getElementById('lightMode');
    const darkMode = document.getElementById('darkMode');

    // Load extension status and mode from storage
    chrome.storage.sync.get(['extensionEnabled', 'mode'], function (data) {
        if (data.extensionEnabled !== true && data.extensionEnabled !== false) {
            toggleExtension.checked = true;
            chrome.storage.sync.set({ extensionEnabled: true });
        } else {
            toggleExtension.checked = data.extensionEnabled;
        }
        if (data.mode === 'light') {
            lightMode.checked = true;
        } else {
            darkMode.checked = true; // Default to dark mode
            chrome.storage.sync.set({ mode: 'dark' });
        }
    });

    // Handle toggle extension switch
    toggleExtension.addEventListener('change', function () {
        const enabled = toggleExtension.checked;
        chrome.storage.sync.set({ extensionEnabled: enabled });
    });

    // Handle mode radio button changes
    lightMode.addEventListener('change', function () {
        chrome.storage.sync.set({ mode: 'light' });
    });

    darkMode.addEventListener('change', function () {
        chrome.storage.sync.set({ mode: 'dark' });
    });
});
