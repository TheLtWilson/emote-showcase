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