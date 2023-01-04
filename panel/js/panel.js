var configLoaded = false;

// when the config is loaded, set configLoaded to true,
// and call the readyHandler
window.Twitch.ext.configuration.onChanged(() => {
    configLoaded = true;
    readyHandler();
});

// when the extension is authenticated, set authenticated to true,
// set auth to the auth data, and call the readyHandler
window.Twitch.ext.onAuthorized((data) => {
    authenticated = true;
    auth = data;
    readyHandler();
});

function stylePanel(data) {
    // attempts to set custom settings
    try {
        if (!data.settings.showHeaderPFP) {
            document.getElementById("channelHeaderPFP").style.display = 'none';
            document.getElementById("channelInfo").style.justifyContent = 'center';
            document.getElementById("channelInfo").style.textAlign = 'center';
        }
        if (data.settings.hideHeader) {
            document.getElementById("channelInfo").style.display = 'none';
            document.getElementById("emoteList").style['margin-top'] = '0px'
        }
        if (data.settings.showCustomHeaderText) {
            if (data.settings.customHeaderText != "") {
                document.getElementById("channelHeaderText").innerText = data.settings.customHeaderText.toString()
            }
        }
        if (data.settings.hideServiceIcons) {
            let elements = document.getElementsByClassName("sub_badge");

            Array.prototype.forEach.call(elements, (element) => {
                element.style.display = 'none';
            });

            document.getElementById('bttv-icon').style.display = 'none';
            document.getElementById('ffz-icon').style.display = 'none';
            document.getElementById('seventv-icon').style.display = 'none';
        }
        if (data.settings.separateEmoteTypes) {
            document.getElementById('twitch').style.display = 'none';
        }
    // style the panel, will use default config if user config is not present
    } finally {
        document.documentElement.style.setProperty("--accent-color", data.style.accentColor);
        document.documentElement.style.setProperty("--background-color", data.style.backgroundColor);
        document.documentElement.style.setProperty("--font-color", data.style.fontColor);
    };
}