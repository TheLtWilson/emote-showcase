var configLoaded = false;
var authenticated = false;
var firstrun = true;
var auth;

window.Twitch.ext.configuration.onChanged(() => {
    configLoaded = true;
    readyHandler();
});

window.Twitch.ext.onAuthorized((data) => {
    authenticated = true;
    auth = data;
    readyHandler();
});

function readyHandler() {
    if (configLoaded && authenticated) {
        if (firstrun) {
            let defaultConfig = window.Twitch.ext.configuration.global;
            let broadcasterConfig = window.Twitch.ext.configuration.broadcaster;

            if (broadcasterConfig) {
                let x = JSON.parse(broadcasterConfig.content);
                stylePanel(x);
                firstrun = false;
            } else {
                let x = JSON.parse(defaultConfig.content);
                stylePanel(x);
                firstrun = false;
            }
        }

        document.getElementById("details").innerText = `Activated on channel ID: ${auth.channelId}`
    }
}

function stylePanel(data) {
    document.documentElement.style.setProperty("--accent-color", data.style.accentColor);
    document.documentElement.style.setProperty("--background-color", data.style.backgroundColor);
    document.documentElement.style.setProperty("--font-color", data.style.fontColor);
    document.documentElement.style.setProperty("--header-font-color", data.style.headerFontColor);
};