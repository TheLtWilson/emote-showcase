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

function getFromElements() {
    let checkForNerdsBypassingCharacterLimits = document.getElementById("customHeaderText").value.substring(0,20);

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
            showCustomHeaderText: document.getElementById("showCustomHeaderText").checked,
            showHeaderPFP: document.getElementById("showHeaderPFP").checked,
            customHeaderText: checkForNerdsBypassingCharacterLimits
        }
    }
}

function showAlert(type,text,time) {
    switch (type) {
        case "SUCCESS":
            document.getElementById("alertbox").className = "alert alert-success";
            document.getElementById("alertboxtext").innerText = text.toString();
            document.getElementById("alertbox").style.display = "block";
            if (time) {
                setTimeout(() => {
                    document.getElementById("alertbox").style.display = "none";
                }, time);
            }
            break;
        case "WARNING":
            document.getElementById("alertbox").className = "alert alert-warning";
            document.getElementById("alertboxtext").innerText = text.toString();
            document.getElementById("alertbox").style.display = "block";
            if (time) {
                setTimeout(() => {
                    document.getElementById("alertbox").style.display = "none";
                }, time);
            }
            break;
        case "DANGER":
            document.getElementById("alertbox").className = "alert alert-danger";
            document.getElementById("alertboxtext").innerText = text.toString();
            document.getElementById("alertbox").style.display = "block";
            if (time) {
                setTimeout(() => {
                    document.getElementById("alertbox").style.display = "none";
                }, time);
            }
            break; 
        default:
            break;
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

document.getElementById("saveButton").addEventListener("click", () => {
    let data = getFromElements();
    window.Twitch.ext.configuration.set("broadcaster", "2", JSON.stringify(data));
    showAlert('SUCCESS','Successfully saved changes.',2000);
});

document.getElementById("resetButton").addEventListener("click", () => {
    var global = window.Twitch.ext.configuration.global;
    showSettings(JSON.parse(global.content));
    showAlert('WARNING','All values have been reset to their defaults. Click "Save Changes" to save changes.',5000);
});