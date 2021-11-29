// I'm not a professional, sh!t is probably incredibly inefficient.
// Please make my code better xqcL

let savedSettings = [];

window.Twitch.ext.configuration.onChanged(() => {
    var global = window.Twitch.ext.configuration.global;
    var broadcaster = window.Twitch.ext.configuration.broadcaster;
    if (!broadcaster) {
        showSettings(JSON.parse(global.content));
    } else {
        showSettings(JSON.parse(broadcaster.content));
    }
})

function showSettings(data) {
    for (const property in data.settings) {
        savedSettings.push({setting:property,value:data.settings[property].toString(),type:"setting"});

        if (typeof data.settings[property] === "boolean") {
            document.getElementById(property.toString()).checked = data.settings[property].toString()
        } else {
            document.getElementById(property.toString()).value = data.settings[property].toString()
        }
    }
    for (const property in data.style) {
        savedSettings.push({setting:property,value:data.style[property].toString(),type:"style"});

        document.getElementById(property.toString()).value = data.style[property].toString()
    }
}

document.getElementById("saveButton").addEventListener("click", () => {
    let data = {
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
            showSevenTV: document.getElementById("showSevenTV").checked
        }
    };
    window.Twitch.ext.configuration.set("broadcaster", "1", JSON.stringify(data));
    document.getElementById("alertboxtext").innerText = "Successfully saved changes.";
    document.getElementById("alertbox").style.display = "block";
    setTimeout(() => {
        document.getElementById("alertbox").style.display = "none";
    }, 2000)
})