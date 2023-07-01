// Twitch Channel Emotes
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
            extensionLog("error", "emotes", err)
            let x = document.createTextNode("Something went wrong.");
            document.getElementById("twitchEmotes").appendChild(x);
        })
        .then(res => res.json())
        .then(body => {
            extensionLog("log", "emotes", "Channel Emotes:", body)

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
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitch-follower").classList.remove("hidden");
                                    target = "twitchFollowerEmotes";
                                };

                                let x = createEmote(emote.name, emote.images.url_4x, target, `<img src=${emote.images.url_4x}><br><b>${emote.name.toString()}</b><br>Follower Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Follow for Emote", null, `Follower emote for: ${displayname}`, true, false)
                                });
                            });

                            T1Emotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitch-tier-1").classList.remove("hidden");
                                    target = "twitchT1Emotes";
                                };

                                let x = createEmote(emote.name, emote.images.url_4x, target, `<img src=${emote.images.url_4x}><br><b>${emote.name.toString()}</b><br>Tier 1 Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, `Tier 1 emote for: ${displayname}`, false, false)
                                });
                            });

                            T2Emotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitch-tier-2").classList.remove("hidden");
                                    target = "twitchT2Emotes";
                                };

                                let x = createEmote(emote.name, emote.images.url_4x, target, `<img src=${emote.images.url_4x}><br><b>${emote.name.toString()}</b><br>Tier 2 Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, `Tier 2 emote for: ${displayname}`, false, false)
                                });
                            });

                            T3Emotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitch-tier-3").classList.remove("hidden");
                                    target = "twitchT3Emotes";
                                };

                                let x = createEmote(emote.name, emote.images.url_4x, target, `<img src=${emote.images.url_4x}><br><b>${emote.name.toString()}</b><br>Tier 3 Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, `Tier 3 emote for: ${displayname}`, false, false)
                                });
                            });

                            BitsEmotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitch-bits").classList.remove("hidden");
                                    target = "twitchBitsEmotes";
                                };

                                let x = createEmote(emote.name, emote.images.url_4x, target, `<img src=${emote.images.url_4x}><br><b>${emote.name.toString()}</b><br>Bits Reward Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Use Bits for Emote", undefined, `Bits reward emote for: ${displayname}`, false, true)
                                })
                            });

                            AnimatedEmotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitch-animated").classList.remove("hidden");
                                    target = "twitchAnimatedEmotes";
                                };

                                let x = createEmote(emote.name, `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/animated/dark/3.0`, target, `<img src="https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/animated/dark/3.0"><br><b>${emote.name.toString()}</b><br>Animated Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, `Animated emote for: ${displayname}`, false, false)
                                });
                            });
                        }
                    });
                } catch (err) {
                    extensionLog("error", "emotes", err)
                    let x = document.createTextNode("No emotes found.");
                    document.getElementById("twitchEmotes").appendChild(x);
                }
            }
        })
};

// BTTV Emotes
function getBTTVEmotes(id) {
    document.getElementById("bttv").classList.remove("hidden");
    fetch(`https://api.betterttv.net/3/cached/users/twitch/${id}`)
        .catch(err => {
            extensionLog("error", "emotes", err)
            let x = document.createTextNode("Something went wrong.");
            document.getElementById("bttvEmotes").appendChild(x);
        })
        .then(res => res.json())
        .then(body => {
            // log the channel BTTV emotes
            extensionLog("log", "emotes", "Channel BTTV Emotes:", body);

            // if neither channel or shared emotes exist
            if ((!body.channelEmotes && !body.sharedEmotes) || (body.channelEmotes.length === 0 && body.sharedEmotes.length === 0)) {
                let x = document.createTextNode("No emotes found.");
                document.getElementById("bttvEmotes").appendChild(x);
            // if one of them exist
            } else {
                // if channel emotes exist, render them
                if (!body.channelEmotes) {
                    return;
                } else {
                    body.channelEmotes = body.channelEmotes.sort((a, b) => a.code.localeCompare(b.code));
                    body.channelEmotes.forEach(emote => {
                        let x = createEmote(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/3x`, `bttvEmotes`, `<img src="https://cdn.betterttv.net/emote/${emote.id}/3x"><br><b>${emote.code.toString()}</b><br>Channel Emote`)

                        x.addEventListener("click", () => {
                            showEmoteDetails(x.alt, x.src, "View on BTTV", `https://betterttv.com/emotes/${emote.id}`, `Created by: ${displayname}`, false, false)
                        })
                    });
                };

                // if shared emotes exist, render them as well
                if (!body.sharedEmotes) {
                    return;
                } else {
                    body.sharedEmotes = body.sharedEmotes.sort((a, b) => a.code.localeCompare(b.code));
                    body.sharedEmotes.forEach(emote => {
                        let x = createEmote(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/3x`, `bttvEmotes`, `<img src="https://cdn.betterttv.net/emote/${emote.id}/3x"><br><b>${emote.code.toString()}</b><br>By: ${emote.user.displayName.toString()}`)

                        x.addEventListener("click", () => {
                            showEmoteDetails(x.alt, x.src, "View on BTTV", `https://betterttv.com/emotes/${emote.id}`, `Created by: ${emote.user.displayName.toString()}`, false, false)
                        })
                    })
                }
            }
        })
};

// FFZ Emotes
function getFFZEmotes(id) {
    // if this function is called, FFZ is enabled so it shouldn't be hidden
    document.getElementById("ffz").classList.remove("hidden");

    // fetch the channel's FFZ emoteset using their API endpoint
    fetch(`https://api.frankerfacez.com/v1/room/id/${id}`)
        .catch(err => {
            // if something goes wrong, log it and display an error
            extensionLog("error", "emotes", err)
            let x = document.createTextNode("Something went wrong.");
            document.getElementById("ffzEmotes").appendChild(x);
        })
        .then(res => res.json())
        .then(body => {
            // log the channel FFZ emotes
            extensionLog("log", "emotes", "Channel FFZ Data:", body)
            
            // make sure it actually responded with emotes
            let emoteSetId = body.room.set;
            let emoteList = body.sets[emoteSetId].emoticons;

            if (emoteList.length === 0) {
                let x = document.createTextNode("No emotes found.");
                document.getElementById("ffzEmotes").appendChild(x);
            } else {
                try {
                    // if it did, sort them alphabetically
                    emoteList = emoteList.sort((a, b) => a.name.localeCompare(b.name));
                    emoteList.forEach(emote => {
                        let src;

                        // check if the emote is animated
                        if (emote.animated) {
                            // not all FFZ emotes include the highest size, so we do this
                            if (!emote.animated[4]) {
                                if (!emote.animated[2]) {
                                    src = emote.animated[1]
                                } else {
                                    src = emote.animated[2]
                                }
                            } else {
                                src = emote.animated[4]
                            } 
                        // if the image is not animated
                        } else {
                            // not all FFZ emotes include the highest size, so we do this
                            if (!emote.urls[4]) {
                                if (!emote.urls[2]) {
                                    src = emote.urls[1]
                                } else {
                                    src = emote.urls[2]
                                }
                            } else {
                                src = emote.urls[4]
                            }
                        }

                        // create the emote in the panel
                        let x = createEmote(emote.name, src, `ffzEmotes`, `<img src=${src.toString()}><br><b>${emote.name.toString()}</b><br>By: ${emote.owner.display_name.toString()}`)

                        // when the emote is clicked, show it's details
                        x.addEventListener("click", () => {
                            showEmoteDetails(x.alt, x.src, "View on FFZ", `https://frankerfacez.com/emoticon/${emote.id}`, `Created by: ${emote.owner.display_name.toString()}`, false, false)
                        })
                    })
                } catch (err) {
                    // if something goes wrong while rendering, not my problem
                    extensionLog("error", "emotes", err)
                    let x = document.createTextNode("Something went wrong.");
                    document.getElementById("ffzEmotes").appendChild(x);
                }
            }
        })
};

// 7TV Emotes
function getSevenTVEmotes(id) {
    // if this function is called, 7TV is enabled so it shouldn't be hidden
    document.getElementById("seventv").classList.remove("hidden");
    
    // fetch the current 7TV emoteset using the user ID 
    fetch(`https://7tv.io/v3/users/twitch/${id}`)
        .catch(err => {
            // if an error occurs, log it and display an error
            extensionLog("error", "emotes", err)
            let x = document.createTextNode("Something went wrong.");
            document.getElementById("seventvEmotes").appendChild(x);
        })
        .then(res => res.json())
        .then(body => {
            // log the channel 7TV emotes
            extensionLog("log", "emotes", "Channel 7TV Emotes:", body)

            try {
                // sort emotes alphabetically
                emotes = body.emote_set.emotes.sort((a, b) => a.name.localeCompare(b.name));

                // for every emote in the list
                emotes.forEach(emote => {
                    // create the emote to be displayed in the panel
                    let cdnURL = emote.data.host.url + "/" + emote.data.host.files[7].name;
                    let x = createEmote(emote.name, cdnURL, `seventvEmotes`, `<img src="${cdnURL}"><br><b>${emote.name.toString()}</b><br>By: ${emote.data.owner.display_name.toString()}`)

                    // when clicked, it will display the details of the emote
                    x.addEventListener("click", () => {
                        showEmoteDetails(x.alt, x.src, "View on 7TV", `https://7tv.app/emotes/${emote.id}`,  `Created by: ${emote.data.owner.display_name.toString()}`, false, false)
                    })
                })
            } catch (err) {
                // if something goes wrong during rendering, just give up lmao
                extensionLog("error", "emotes", err)
                let x = document.createTextNode("Something went wrong.");
                document.getElementById("seventvEmotes").appendChild(x);
            }
        })
};