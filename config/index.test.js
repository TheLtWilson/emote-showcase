// I'm not a professional, sh!t is probably incredibly inefficient.
// Please make my code better xqcL

window.Twitch.ext.configuration.onChanged(() => {
    var global = window.Twitch.ext.configuration.global;
    var broadcaster = window.Twitch.ext.configuration.broadcaster;

    showSettings(JSON.parse(global.content));

    if (broadcaster) {
        showSettings(JSON.parse(broadcaster.content));
    }
})

function getElements() {
    let headerCharLimitText = document.getElementById("customHeaderText").value.substring(0,20);

    return {
        style: {
            accentColor: document.getElementById("accentColor").value,
            backgroundColor: document.getElementById("backgroundColor").value,
            headerFontColor: document.getElementById("headerFontColor").value,
            fontColor: document.getElementById("fontColor").value
        },
        settings: {
            showTwitch: document.getElementById("showTwitch").checked,
            showBTTV: document.getElementById("showBTTV").checked,
            showFFZ: document.getElementById("showFFZ").checked,
            showSevenTV: document.getElementById("showSevenTV").checked,
            hideHeader: document.getElementById("hideHeader").checked,
            hideServiceIcons: document.getElementById("hideServiceIcons").checked,
            showCustomHeaderText: document.getElementById("showCustomHeaderText").checked,
            showHeaderPFP: document.getElementById("showHeaderPFP").checked,
            seperateChannelEmoteTypes: document.getElementById("seperateChannelEmoteTypes").checked,
            customHeaderText: headerCharLimitText
        }
    }
}

function showSettings(data) {
    for (const property in data.settings) {
        if (typeof data.settings[property] === "boolean") {
            if (document.getElementById(property.toString()) != null) {
                document.getElementById(property.toString()).checked = data.settings[property]
            }
        } else {
            if (document.getElementById(property.toString()) != null) {
                document.getElementById(property.toString()).value = data.settings[property].toString()
            }
        }
    }

    for (const property in data.style) {
        if (document.getElementById(property.toString()) != null) {
            document.getElementById(property.toString()).value = data.style[property].toString()
        }
    }
};