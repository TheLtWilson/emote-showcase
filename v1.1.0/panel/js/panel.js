// I'm not a professional, sh!t is probably incredibly inefficient.
// Please make my code better xqcL

var firstrun = true;
var authenticated = false;
var configLoaded = false;
var auth;
var displayname;

window.Twitch.ext.configuration.onChanged(() => {
    configLoaded = true;
    readyHandler();
});

window.Twitch.ext.onAuthorized(function (data) {
    authenticated = true;
    auth = data;
    readyHandler();
});

function showEmoteDetails(emoteName, src, buttonName, buttonLink, isFollow, creatorText) {
    // Set the emote name
    document.getElementById("detailsEmoteName").innerText = emoteName;

    // Set the creator text
    document.getElementById("detailsCreatorName").innerText = creatorText;

    // Set the 112, 56, and 28 pixel images.
    document.getElementById("detailsEmote3").src = src;
    document.getElementById("detailsEmote2").src = src;
    document.getElementById("detailsEmote1").src = src;

    // Set the button name and link.
    document.getElementById("detailsButton").innerText = buttonName;
    if (isFollow) {
        document.getElementById("detailsButton").removeAttribute("href");
        document.getElementById("detailsButton").addEventListener("click", () => {
            window.Twitch.ext.actions.followChannel(displayname);
        })
    } else {
        if (buttonLink) {
            document.getElementById("detailsButton").href = buttonLink;
        } else {
            document.getElementById("detailsButton").removeAttribute("href");
        }
    }

    // Show the popup.
    document.getElementById("emoteDetails").classList.remove("hidden");
}

document.getElementById("emoteDetails").addEventListener("click", () => {
    if (!document.getElementById("detailsButton").matches(':hover')) {
        x = document.getElementById("detailsButton");
        y = x.cloneNode();
        x.remove();
        document.getElementById("emoteDetails").appendChild(y);
        document.getElementById("emoteDetails").classList.add("hidden");
    }
})

function readyHandler() {
    if (authenticated && configLoaded) {
        if (firstrun) {
            let defaultConfig = window.Twitch.ext.configuration.global;
            let broadcasterConfig = window.Twitch.ext.configuration.broadcaster;
            if (broadcasterConfig) {
                let x = JSON.parse(broadcasterConfig.content);

                stylePanel(x);
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
                let x = JSON.parse(defaultConfig.content);

                stylePanel(x);
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

function stylePanel(data) {
    try {
        if (!data.settings.showHeaderPFP) {
            document.getElementById("channelHeaderPFP").style.display = 'none';
            document.getElementById("channelInfo").style.justifyContent = 'center';
            document.getElementById("channelInfo").style.textAlign = 'center';
        }
        if (data.settings.showCustomHeaderText) {
            if (data.settings.customHeaderText != "") {
                document.getElementById("channelHeaderText").innerText = data.settings.customHeaderText.toString()
            }
        }
    } finally {
        document.documentElement.style.setProperty("--accent-color", data.style.accentColor);
        document.documentElement.style.setProperty("--background-color", data.style.backgroundColor);
        document.documentElement.style.setProperty("--font-color", data.style.fontColor);
        document.documentElement.style.setProperty("--header-font-color", data.style.headerFontColor);
    };
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
            displayname = body.data[0].display_name;
            document.getElementById("channelHeaderPFP").src = body.data[0].profile_image_url;
            document.getElementById("channelPFP").src = body.data[0].profile_image_url;
        })
};

function getChannelEmotes(auth) {
    document.getElementById("twitch").classList.remove("hidden");
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
                    let countedEmotes = 0;

                    let FollowerEmotes = [];
                    let T1Emotes = [];
                    let T2Emotes = [];
                    let T3Emotes = [];
                    let BitsEmotes = [];
                    let AnimatedEmotes = [];

                    body.data = body.data.sort((a, b) => a.name.localeCompare(b.name));
                    body.data.forEach((emote, index, array) => {
                        if (emote.format.includes('animated')) {
                            AnimatedEmotes.push(emote);
                            countedEmotes++;
                        } else {
                            switch(emote.emote_type) {
                                case "follower":
                                    FollowerEmotes.push(emote);
                                    countedEmotes++;
                                    break;
                                case "bitstier":
                                    BitsEmotes.push(emote);
                                    countedEmotes++;
                                    break;
                                case "subscriptions":
                                    if (emote.tier === "1000") {
                                        T1Emotes.push(emote)
                                        countedEmotes++;
                                    } else if (emote.tier === "2000") {
                                        T2Emotes.push(emote)
                                        countedEmotes++;
                                    } else if (emote.tier === "3000") {
                                        T3Emotes.push(emote)
                                        countedEmotes++;
                                    }
                                    break;
                            }
                        }

                        if (countedEmotes === array.length) {
                            FollowerEmotes = FollowerEmotes.sort((a, b) => a.name.localeCompare(b.name));
                            T1Emotes = T1Emotes.sort((a, b) => a.name.localeCompare(b.name));
                            T2Emotes = T2Emotes.sort((a, b) => a.name.localeCompare(b.name));
                            T3Emotes = T3Emotes.sort((a, b) => a.name.localeCompare(b.name));
                            BitsEmotes = BitsEmotes.sort((a, b) => a.name.localeCompare(b.name));
                            AnimatedEmotes = AnimatedEmotes.sort((a, b) => a.name.localeCompare(b.name));

                            FollowerEmotes.forEach(emote => {
                                let x = document.createElement('img');
                                x.alt = emote.name;
                                x.src = emote.images.url_4x;
                                x.style="cursor: pointer;";

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Follow for Emote", null, true, `Follower emote for: ${displayname}`)
                                });

                                document.getElementById("twitchEmotes").appendChild(x);

                                tippy(x, {
                                    allowHTML: true,
                                    content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Click for details.`,
                                    arrow: true
                                });
                            });

                            T1Emotes.forEach(emote => {
                                let x = document.createElement('img');
                                x.alt = emote.name;
                                x.src = emote.images.url_4x;
                                x.style="cursor: pointer;";

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, false, `Tier 1 emote for: ${displayname}`)
                                });

                                document.getElementById("twitchEmotes").appendChild(x);

                                tippy(x, {
                                    allowHTML: true,
                                    content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Click for details.`,
                                    arrow: true
                                });
                            });

                            T2Emotes.forEach(emote => {
                                let x = document.createElement('img');
                                x.alt = emote.name;
                                x.src = emote.images.url_4x;
                                x.style="cursor: pointer;";

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, false, `Tier 2 emote for: ${displayname}`)
                                });

                                document.getElementById("twitchEmotes").appendChild(x);

                                tippy(x, {
                                    allowHTML: true,
                                    content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Click for details.`,
                                    arrow: true
                                });
                            });

                            T3Emotes.forEach(emote => {
                                let x = document.createElement('img');
                                x.alt = emote.name;
                                x.src = emote.images.url_4x;
                                x.style="cursor: pointer;";

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, false, `Tier 3 emote for: ${displayname}`)
                                });

                                document.getElementById("twitchEmotes").appendChild(x);

                                tippy(x, {
                                    allowHTML: true,
                                    content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Click for details.`,
                                    arrow: true
                                });
                            });

                            BitsEmotes.forEach(emote => {
                                let x = document.createElement('img');
                                x.alt = emote.name;
                                x.src = emote.images.url_4x;
                                x.style = "cursor: pointer;"

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Use Bits for Emote", null, false, `Bits reward emote for: ${displayname}`)
                                })
                                document.getElementById("twitchEmotes").appendChild(x);

                                tippy(x, {
                                    allowHTML: true,
                                    content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Click for details.`,
                                    arrow: true
                                });
                            });

                            AnimatedEmotes.forEach(emote => {
                                let x = document.createElement('img');
                                x.alt = emote.name;
                                x.src = `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/animated/dark/3.0`;
                                x.style="cursor: pointer;";

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, false, `Animated emote for: ${displayname}`)
                                });

                                document.getElementById("twitchEmotes").appendChild(x);

                                tippy(x, {
                                    allowHTML: true,
                                    content: `<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Click for details.`,
                                    arrow: true
                                });
                            });
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
    document.getElementById("bttv").classList.remove("hidden");
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
                        x.alt = emote.code
                        x.src = `https://cdn.betterttv.net/emote/${emote.id}/3x`;
                        x.style = "cursor: pointer";

                        x.addEventListener("click", () => {
                            showEmoteDetails(x.alt, x.src, "View on BTTV", `https://betterttv.com/emotes/${emote.id}`, false, `Created by: ${displayname}`)
                        })

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
                        x.alt = emote.code;
                        x.src = `https://cdn.betterttv.net/emote/${emote.id}/3x`;
                        x.style = "cursor: pointer;"

                        x.addEventListener("click", () => {
                            showEmoteDetails(x.alt, x.src, "View on BTTV", `https://betterttv.com/emotes/${emote.id}`, false, `Created by: ${emote.user.displayName.toString()}`)
                        })

                        document.getElementById("bttvEmotes").appendChild(x);
                        tippy(x, {
                            allowHTML: true,
                            content: `<img src=${x.src.toString()}><br><b>${emote.code.toString()}</b><br>By: ${emote.user.displayName.toString()}`,
                            arrow: true
                        })
                    })
                }
            }
        })
};

function getFFZEmotes(id) {
    document.getElementById("ffz").classList.remove("hidden");
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
                        x.alt = emote.code;
                        x.style = "cursor: pointer;"

                        if (!emote.images["4x"]) {
                            if (!emote.images["2x"]) {
                                x.src = emote.images["1x"]
                            } else {
                                x.src = emote.images["2x"]
                            }
                        } else {
                            x.src = emote.images["4x"]
                        }

                        x.addEventListener("click", () => {
                            showEmoteDetails(x.alt, x.src, "View on FFZ", `https://frankerfacez.com/emoticon/${emote.id}`, false, `Created by: ${emote.user.displayName.toString()}`)
                        })

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
    document.getElementById("seventv").classList.remove("hidden");
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
                    x.alt = emote.name;
                    x.src = emote.urls[3][1];
                    x.style = "cursor: pointer;"

                    x.addEventListener("click", () => {
                        showEmoteDetails(x.alt, x.src, "View on 7TV", `https://7tv.app/emotes/${emote.id}`, false, `Created by: ${emote.owner.display_name.toString()}`)
                    })

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

document.getElementById("twitch-bar").addEventListener("click", () => {
    if (document.getElementById("twitchEmotes").classList.contains("hidden")) {
        document.getElementById("twitchEmotes").classList.remove("hidden")
        document.getElementById("twitch-collapse").className = "collapse"
    } else {
        document.getElementById("twitchEmotes").classList.add("hidden")
        document.getElementById("twitch-collapse").className = "expand"
    }
})

document.getElementById("bttv-bar").addEventListener("click", () => {
    if (document.getElementById("bttvEmotes").classList.contains("hidden")) {
        document.getElementById("bttvEmotes").classList.remove("hidden")
        document.getElementById("bttv-collapse").className = "collapse"
    } else {
        document.getElementById("bttvEmotes").classList.add("hidden")
        document.getElementById("bttv-collapse").className = "expand"
    }
})

document.getElementById("ffz-bar").addEventListener("click", () => {
    if (document.getElementById("ffzEmotes").classList.contains("hidden")) {
        document.getElementById("ffzEmotes").classList.remove("hidden")
        document.getElementById("ffz-collapse").className = "collapse"
    } else {
        document.getElementById("ffzEmotes").classList.add("hidden")
        document.getElementById("ffz-collapse").className = "expand"
    }
})

document.getElementById("seventv-bar").addEventListener("click", () => {
    if (document.getElementById("seventvEmotes").classList.contains("hidden")) {
        document.getElementById("seventvEmotes").classList.remove("hidden")
        document.getElementById("seventv-collapse").className = "collapse"
    } else {
        document.getElementById("seventvEmotes").classList.add("hidden")
        document.getElementById("seventv-collapse").className = "expand"
    }
})