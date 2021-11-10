// I'm not a professional, sh!t is probably incredibly inefficient.
// Please make my code better xqcL

var firstrun = true;
var authenticated = false;
var configLoaded = false;
var auth;

window.Twitch.ext.configuration.onChanged(() => {
    configLoaded = true;
    readyHandler();
});

window.Twitch.ext.onAuthorized(function (data) {
    authenticated = true;
    auth = data;
    readyHandler();
});

function readyHandler() {
    if (authenticated && configLoaded) {
        if (firstrun) {
            console.log(auth)

            let defaultConfig = window.Twitch.ext.configuration.global;
            let broadcasterConfig = window.Twitch.ext.configuration.broadcaster;
            if (broadcasterConfig) {
                console.log('broadcaster config found')
                let x = JSON.parse(broadcasterConfig.content);

                document.documentElement.style.setProperty("--accent-color", x.style.accentColor);
                document.documentElement.style.setProperty("--background-color", x.style.backgroundColor);
                document.documentElement.style.setProperty("--font-color", x.style.fontColor);
                document.documentElement.style.setProperty("--header-font-color", x.style.headerFontColor);

                getExtensionData(auth);

                if (x.settings.showTwitch) {
                    getChannelEmotes(auth);
                }
                if (x.settings.showBTTV) {
                    getBTTVEmotes(auth.channelId);
                }
                if (x.settings.showFFZ) {
                    getFFZEmotes(auth.channelId);
                }
                if (x.settings.showSevenTV) {
                    getSevenTVEmotes(auth.channelId);
                }

                firstrun = false;
            } else {
                console.log('using default config')
                let x = JSON.parse(defaultConfig.content);

                document.documentElement.style.setProperty("--accent-color", x.style.accentColor);
                document.documentElement.style.setProperty("--background-color", x.style.backgroundColor);
                document.documentElement.style.setProperty("--font-color", x.style.fontColor);
                document.documentElement.style.setProperty("--header-font-color", x.style.headerFontColor);

                getExtensionData(auth);

                if (x.settings.showTwitch) {
                    getChannelEmotes(auth);
                }
                if (x.settings.showBTTV) {
                    getBTTVEmotes(auth.channelId);
                }
                if (x.settings.showFFZ) {
                    getFFZEmotes(auth.channelId);
                }
                if (x.settings.showSevenTV) {
                    getSevenTVEmotes(auth.channelId);
                }

                firstrun = false;
            }
        };
    }
}

function getExtensionData(auth) {
    fetch(`https://api.twitch.tv/helix/users?id=${auth.channelId}`, {
            method: "GET",
            headers: {
                "client-id": auth.clientId,
                "Authorization": `Extension ${auth.helixToken}`
            }
        })
        .catch(err => {
            console.error(err);
        })
        .then(res => res.json())
        .then(body => {
            document.getElementById("channelPFP").src = body.data[0].profile_image_url;
        })
};

function getChannelEmotes(auth) {
    document.getElementById("twitchEmotes").classList.remove("hidden");
    fetch(`https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${auth.channelId}`, {
            method: "GET",
            headers: {
                "client-id": auth.clientId,
                "Authorization": `Extension ${auth.helixToken}`
            }
        })
        .catch(err => {
            console.error(err);
            let x = document.createTextNode("Something went wrong.");
            document.getElementById("twitchEmotes").appendChild(x);
        })
        .then(res => res.json())
        .then(body => {
            if (body.data.length === 0) {
                let x = document.createTextNode("No emotes found.");
                document.getElementById("twitchEmotes").appendChild(x);
            } else {
                try {
                    body.data = body.data.sort((a, b) => a.name.localeCompare(b.name));
                    body.data.forEach(emote => {
                        let x = document.createElement("img");
                        x.alt = emote.name;

                        if (emote.format.includes('animated')) {
                            x.src = `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/animated/dark/3.0`
                        } else {
                            x.src = emote.images.url_4x
                        }

                        document.getElementById("twitchEmotes").appendChild(x);

                        switch (emote.emote_type) {
                            case "follower":
                                tippy(x, {
                                    allowHTML: true,
                                    content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Follower Emote`,
                                    arrow: true
                                })
                                break;
                            case "subscriptions":
                                switch (emote.tier) {
                                    case "1000":
                                        tippy(x, {
                                            allowHTML: true,
                                            content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Tier 1 Sub Emote`,
                                            arrow: true
                                        })
                                        break;
                                    case "2000":
                                        tippy(x, {
                                            allowHTML: true,
                                            content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Tier 2 Sub Emote`,
                                            arrow: true
                                        })
                                        break;
                                    case "3000":
                                        tippy(x, {
                                            allowHTML: true,
                                            content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Tier 3 Sub Emote`,
                                            arrow: true
                                        })
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case "bitstier":
                                tippy(x, {
                                    allowHTML: true,
                                    content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Bits Reward Emote`,
                                    arrow: true
                                })
                            default:
                                break;
                        }
                    });
                } catch (err) {
                    let x = document.createTextNode("No emotes found.");
                    document.getElementById("twitchEmotes").appendChild(x);
                }
            }
        })
};

function getBTTVEmotes(id) {
    document.getElementById("bttvEmotes").classList.remove("hidden");
    fetch(`https://api.betterttv.net/3/cached/users/twitch/${id}`)
        .catch(err => {
            console.error(err);
            let x = document.createTextNode("Something went wrong.");
            document.getElementById("bttvEmotes").appendChild(x);
        })
        .then(res => res.json())
        .then(body => {
            if (!body.channelEmotes && !body.sharedEmotes) {
                let x = document.createTextNode("No emotes found.");
                document.getElementById("bttvEmotes").appendChild(x);
            } else {
                if (!body.channelEmotes) {
                    return;
                } else {
                    body.channelEmotes = body.channelEmotes.sort((a, b) => a.code.localeCompare(b.code));
                    body.channelEmotes.forEach(emote => {
                        let x = document.createElement("img");
                        x.alt = `${emote.code} `;
                        x.src = `https://cdn.betterttv.net/emote/${emote.id}/3x`;

                        document.getElementById("bttvEmotes").appendChild(x);
                        tippy(x, {
                            allowHTML: true,
                            content: `<img src=${x.src.toString()}><br><b>${emote.code.toString()}</b><br>Channel Emote`,
                            arrow: true
                        })
                    });
                };

                if (!body.sharedEmotes) {
                    return;
                } else {
                    body.sharedEmotes = body.sharedEmotes.sort((a, b) => a.code.localeCompare(b.code));
                    body.sharedEmotes.forEach(emote => {
                        let x = document.createElement("img");
                        x.alt = `${emote.code} `;
                        x.src = `https://cdn.betterttv.net/emote/${emote.id}/3x`;
                        document.getElementById("bttvEmotes").appendChild(x);
                        tippy(x, {
                            allowHTML: true,
                            content: `<img src=${x.src.toString()}><br><b>${emote.code.toString()}</b><br>Shared Emote<br>By: ${emote.user.displayName.toString()}`,
                            arrow: true
                        })
                    })
                }
            }
        })
};

function getFFZEmotes(id) {
    document.getElementById("ffzEmotes").classList.remove("hidden");
    fetch(`https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${id}`)
        .catch(err => {
            console.error(err);
            let x = document.createTextNode("Something went wrong.");
            document.getElementById("ffzEmotes").appendChild(x);
        })
        .then(res => res.json())
        .then(body => {
            if (body.length === 0) {
                let x = document.createTextNode("No emotes found.");
                document.getElementById("ffzEmotes").appendChild(x);
            } else {
                try {
                    body = body.sort((a, b) => a.code.localeCompare(b.code));
                    body.forEach(emote => {
                        let x = document.createElement("img");
                        x.alt = `${emote.code} `;

                        if (!emote.images["4x"]) {
                            if (!emote.images["2x"]) {
                                x.src = emote.images["1x"]
                            } else {
                                x.src = emote.images["2x"]
                            }
                        } else {
                            x.src = emote.images["4x"]
                        }

                        document.getElementById("ffzEmotes").appendChild(x)
                        tippy(x, {
                            allowHTML: true,
                            content: `<img src=${x.src.toString()}><br><b>${emote.code.toString()}</b><br>By: ${emote.user.displayName.toString()}`,
                            arrow: true
                        })
                    })
                } catch (err) {
                    let x = document.createTextNode("No emotes found.");
                    document.getElementById("ffzEmotes").appendChild(x);
                }
            }
        })
};

function getSevenTVEmotes(id) {
    document.getElementById("seventvEmotes").classList.remove("hidden");
    fetch(`https://api.7tv.app/v2/users/${id}/emotes`)
        .catch(err => {
            console.error(err);
            let x = document.createTextNode("Something went wrong.");
            document.getElementById("seventvEmotes").appendChild(x);
        })
        .then(res => res.json())
        .then(body => {
            try {
                body = body.sort((a, b) => a.name.localeCompare(b.name));
                body.forEach(emote => {
                    let x = document.createElement("img");
                    x.alt = `${emote.name} `;
                    x.src = emote.urls[3][1];

                    document.getElementById("seventvEmotes").appendChild(x)
                    tippy(x, {
                        allowHTML: true,
                        content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>By: ${emote.owner.display_name.toString()}`,
                        arrow: true
                    })
                })
            } catch (err) {
                let x = document.createTextNode("No emotes found.");
                document.getElementById("seventvEmotes").appendChild(x);
            }
        })
};