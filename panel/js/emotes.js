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

                            console.log(FollowerEmotes, T1Emotes, T2Emotes, T3Emotes, BitsEmotes, AnimatedEmotes);

                            FollowerEmotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitchFollowerEmotes").classList.remove("hidden");
                                    target = "twitchFollowerEmotes";
                                };

                                let x = createEmote(emote.name, emote.images.url_4x, target, `<img src=${emote.images.url_4x}><br><b>${emote.name.toString()}</b><br>Follower Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Follow for Emote", null, true, `Follower emote for: ${displayname}`)
                                });
                            });

                            T1Emotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitchT1Emotes").classList.remove("hidden");
                                    target = "twitchT1Emotes";
                                };

                                let x = createEmote(emote.name, emote.images.url_4x, target, `<img src=${emote.images.url_4x}><br><b>${emote.name.toString()}</b><br>Tier 1 Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, false, `Tier 1 emote for: ${displayname}`)
                                });
                            });

                            T2Emotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitchT2Emotes").classList.remove("hidden");
                                    target = "twitchT2Emotes";
                                };

                                let x = createEmote(emote.name, emote.images.url_4x, target, `<img src=${emote.images.url_4x}><br><b>${emote.name.toString()}</b><br>Tier 2 Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, false, `Tier 2 emote for: ${displayname}`)
                                });
                            });

                            T3Emotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitchT3Emotes").classList.remove("hidden");
                                    target = "twitchT3Emotes";
                                };

                                let x = createEmote(emote.name, emote.images.url_4x, target, `<img src=${emote.images.url_4x}><br><b>${emote.name.toString()}</b><br>Tier 3 Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, false, `Tier 3 emote for: ${displayname}`)
                                });
                            });

                            BitsEmotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitchBitsEmotes").classList.remove("hidden");
                                    target = "twitchBitsEmotes";
                                };

                                let x = createEmote(emote.name, emote.images.url_4x, target, `<img src=${emote.images.url_4x}><br><b>${emote.name.toString()}</b><br>Bits Reward Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Use Bits for Emote", null, false, `Bits reward emote for: ${displayname}`)
                                })
                            });

                            AnimatedEmotes.forEach(emote => {
                                let target = "twitchEmotes";

                                if (configContent.settings.separateEmoteTypes) {
                                    document.getElementById("twitchAnimatedEmotes").classList.remove("hidden");
                                    target = "twitchAnimatedEmotes";
                                };

                                let x = createEmote(emote.name, `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/animated/dark/3.0`, target, `<img src="https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/animated/dark/3.0"><br><b>${emote.name.toString()}</b><br>Animated Emote`)

                                x.addEventListener("click", () => {
                                    showEmoteDetails(x.alt, x.src, "Subscribe for Emote", `https://subs.twitch.tv/${displayname}`, false, `Animated emote for: ${displayname}`)
                                });
                            });
                        }
                    });
                } catch (err) {
                    console.error(err);
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
                        let x = createEmote(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/3x`, `bttvEmotes`, `<img src="https://cdn.betterttv.net/emote/${emote.id}/3x"><br><b>${emote.code.toString()}</b><br>Channel Emote`)

                        x.addEventListener("click", () => {
                            showEmoteDetails(x.alt, x.src, "View on BTTV", `https://betterttv.com/emotes/${emote.id}`, false, `Created by: ${displayname}`)
                        })
                    });
                };

                if (!body.sharedEmotes) {
                    return;
                } else {
                    body.sharedEmotes = body.sharedEmotes.sort((a, b) => a.code.localeCompare(b.code));
                    body.sharedEmotes.forEach(emote => {
                        let x = createEmote(emote.code, `https://cdn.betterttv.net/emote/${emote.id}/3x`, `bttvEmotes`, `<img src="https://cdn.betterttv.net/emote/${emote.id}/3x"><br><b>${emote.code.toString()}</b><br>By: ${emote.user.displayName.toString()}`)

                        x.addEventListener("click", () => {
                            showEmoteDetails(x.alt, x.src, "View on BTTV", `https://betterttv.com/emotes/${emote.id}`, false, `Created by: ${emote.user.displayName.toString()}`)
                        })
                    })
                }
            }
        })
};

function getFFZEmotes(id) {
    // if this function is called, FFZ is enabled so it shouldn't be hidden
    document.getElementById("ffz").classList.remove("hidden");

    // fetch the channel's FFZ emoteset using the BTTV API (weird, I know)
    fetch(`https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${id}`)
        .catch(err => {
            // if something goes wrong, log it and display an error
            console.error(err);
            let x = document.createTextNode("Something went wrong.");
            document.getElementById("ffzEmotes").appendChild(x);
        })
        .then(res => res.json())
        .then(body => {
            // make sure it actually responded with emotes
            if (body.length === 0) {
                let x = document.createTextNode("No emotes found.");
                document.getElementById("ffzEmotes").appendChild(x);
            } else {
                try {
                    // if it did, sort them alphabetically
                    body = body.sort((a, b) => a.code.localeCompare(b.code));
                    body.forEach(emote => {
                        let src;

                        // not all FFZ emotes include the highest size, so we do this
                        if (!emote.images["4x"]) {
                            if (!emote.images["2x"]) {
                                src = emote.images["1x"]
                            } else {
                                src = emote.images["2x"]
                            }
                        } else {
                            src = emote.images["4x"]
                        }

                        // create the emote in the panel
                        let x = createEmote(emote.code, src, `ffzEmotes`, `<img src=${src.toString()}><br><b>${emote.code.toString()}</b><br>By: ${emote.user.displayName.toString()}`)

                        // when the emote is clicked, show it's details
                        x.addEventListener("click", () => {
                            showEmoteDetails(x.alt, x.src, "View on FFZ", `https://frankerfacez.com/emoticon/${emote.id}`, false, `Created by: ${emote.user.displayName.toString()}`)
                        })
                    })
                } catch (err) {
                    // if something goes wrong while rendering, not my problem
                    console.log(err)
                    let x = document.createTextNode("No emotes found.");
                    document.getElementById("ffzEmotes").appendChild(x);
                }
            }
        })
};

function getSevenTVEmotes(id) {
    // if this function is called, 7TV is enabled so it shouldn't be hidden
    document.getElementById("seventv").classList.remove("hidden");
    
    // fetch the current 7TV emoteset using the user ID 
    fetch(`https://api.7tv.app/v2/users/${id}/emotes`)
        .catch(err => {
            // if an error occurs, log it and display an error
            console.error(err);
            let x = document.createTextNode("Something went wrong.");
            document.getElementById("seventvEmotes").appendChild(x);
        })
        .then(res => res.json())
        .then(body => {
            try {
                // sort emotes alphabetically
                body = body.sort((a, b) => a.name.localeCompare(b.name));

                // for every emote in the list
                body.forEach(emote => {
                    // create the emote to be displayed in the panel
                    let x = createEmote(emote.name, emote.urls[3][1], `seventvEmotes`, `<img src="${emote.urls[3][1]}"><br><b>${emote.name.toString()}</b><br>By: ${emote.owner.display_name.toString()}`)

                    // when clicked, it will display the details of the emote
                    x.addEventListener("click", () => {
                        showEmoteDetails(x.alt, x.src, "View on 7TV", `https://7tv.app/emotes/${emote.id}`, false, `Created by: ${emote.owner.display_name.toString()}`)
                    })
                })
            } catch (err) {
                // if something goes wrong during rendering, just give up lmao
                console.log(err)
                let x = document.createTextNode("No emotes found.");
                document.getElementById("seventvEmotes").appendChild(x);
            }
        })
};