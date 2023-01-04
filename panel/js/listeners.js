document.getElementById("emoteDetails").addEventListener("click", () => {
    // when the emote details popup is clicked, check to make sure the button isn't being hovered
    if (!document.getElementById("detailsButton").matches(':hover')) {
        // if it isn't, it'll hide the emote details popup.
        x = document.getElementById("detailsButton");
        y = x.cloneNode();
        x.remove();
        document.getElementById("emoteDetails").appendChild(y);
        document.getElementById("emoteDetails").classList.add("hidden");
    }
})

document.getElementById("twitch-bar").addEventListener("click", () => {
    // expand and collapse channel emotes on click
    if (document.getElementById("twitchEmotes").classList.contains("hidden")) {
        document.getElementById("twitchEmotes").classList.remove("hidden")
        document.getElementById("twitch-collapse").className = "collapse"
    } else {
        document.getElementById("twitchEmotes").classList.add("hidden")
        document.getElementById("twitch-collapse").className = "expand"
    }
})

document.getElementById("twitch-follower-bar").addEventListener("click", () => {
    // expand and collapse channel emotes on click
    if (document.getElementById("twitchFollowerEmotes").classList.contains("hidden")) {
        document.getElementById("twitchFollowerEmotes").classList.remove("hidden")
        document.getElementById("twitch-follower-collapse").className = "collapse"
    } else {
        document.getElementById("twitchFollowerEmotes").classList.add("hidden")
        document.getElementById("twitch-follower-collapse").className = "expand"
    }
})

document.getElementById("twitch-tier-1-bar").addEventListener("click", () => {
    // expand and collapse channel emotes on click
    if (document.getElementById("twitchT1Emotes").classList.contains("hidden")) {
        document.getElementById("twitchT1Emotes").classList.remove("hidden")
        document.getElementById("twitch-tier-1-collapse").className = "collapse"
    } else {
        document.getElementById("twitchT1Emotes").classList.add("hidden")
        document.getElementById("twitch-tier-1-collapse").className = "expand"
    }
})

document.getElementById("twitch-tier-2-bar").addEventListener("click", () => {
    // expand and collapse channel emotes on click
    if (document.getElementById("twitchT2Emotes").classList.contains("hidden")) {
        document.getElementById("twitchT2Emotes").classList.remove("hidden")
        document.getElementById("twitch-tier-2-collapse").className = "collapse"
    } else {
        document.getElementById("twitchT2Emotes").classList.add("hidden")
        document.getElementById("twitch-tier-2-collapse").className = "expand"
    }
})

document.getElementById("twitch-tier-3-bar").addEventListener("click", () => {
    // expand and collapse channel emotes on click
    if (document.getElementById("twitchT3Emotes").classList.contains("hidden")) {
        document.getElementById("twitchT3Emotes").classList.remove("hidden")
        document.getElementById("twitch-tier-3-collapse").className = "collapse"
    } else {
        document.getElementById("twitchT3Emotes").classList.add("hidden")
        document.getElementById("twitch-tier-3-collapse").className = "expand"
    }
})

document.getElementById("twitch-bits-bar").addEventListener("click", () => {
    // expand and collapse channel emotes on click
    if (document.getElementById("twitchBitsEmotes").classList.contains("hidden")) {
        document.getElementById("twitchBitsEmotes").classList.remove("hidden")
        document.getElementById("twitch-bits-collapse").className = "collapse"
    } else {
        document.getElementById("twitchBitsEmotes").classList.add("hidden")
        document.getElementById("twitch-bits-collapse").className = "expand"
    }
})

document.getElementById("twitch-animated-bar").addEventListener("click", () => {
    // expand and collapse channel emotes on click
    if (document.getElementById("twitchAnimatedEmotes").classList.contains("hidden")) {
        document.getElementById("twitchAnimatedEmotes").classList.remove("hidden")
        document.getElementById("twitch-animated-collapse").className = "collapse"
    } else {
        document.getElementById("twitchAnimatedEmotes").classList.add("hidden")
        document.getElementById("twitch-animated-collapse").className = "expand"
    }
})

document.getElementById("bttv-bar").addEventListener("click", () => {
    // expand and collapse bttv emotes on click
    if (document.getElementById("bttvEmotes").classList.contains("hidden")) {
        document.getElementById("bttvEmotes").classList.remove("hidden")
        document.getElementById("bttv-collapse").className = "collapse"
    } else {
        document.getElementById("bttvEmotes").classList.add("hidden")
        document.getElementById("bttv-collapse").className = "expand"
    }
})

document.getElementById("ffz-bar").addEventListener("click", () => {
    // expand and collapse ffz emotes on click
    if (document.getElementById("ffzEmotes").classList.contains("hidden")) {
        document.getElementById("ffzEmotes").classList.remove("hidden")
        document.getElementById("ffz-collapse").className = "collapse"
    } else {
        document.getElementById("ffzEmotes").classList.add("hidden")
        document.getElementById("ffz-collapse").className = "expand"
    }
})

document.getElementById("seventv-bar").addEventListener("click", () => {
    // expand and collapse 7tv emotes on click
    if (document.getElementById("seventvEmotes").classList.contains("hidden")) {
        document.getElementById("seventvEmotes").classList.remove("hidden")
        document.getElementById("seventv-collapse").className = "collapse"
    } else {
        document.getElementById("seventvEmotes").classList.add("hidden")
        document.getElementById("seventv-collapse").className = "expand"
    }
})