var authenticated = false;
var auth;
var displayname;
var firstrun = true;
var config;
var configContent;

function readyHandler() {
    // Only run handler when authenticated and a configuration is loaded.
    if (authenticated && configLoaded) {
        // Twitch may update something, so we need to make sure it's the first run.
        if (firstrun) {

            console.log('Running in channel with ID:', auth.channelId);

            // Get product SKUs for Twitch bit integrations
            window.Twitch.ext.bits.getProducts()
                .then((products) => {
                    console.log(products)
                });

            // Set the default config and broadcaster config.
            let defaultConfig = window.Twitch.ext.configuration.global;
            let broadcasterConfig = window.Twitch.ext.configuration.broadcaster;

            // If the broadcaster has a config, use it, otherwise use the default one.
            if (broadcasterConfig) {
                config = broadcasterConfig;
            } else {
                config = defaultConfig;
            };

            configContent = JSON.parse(config.content);

            // Style the panel using the broadcaster config.
            stylePanel(configContent);
            getExtensionData(auth);

            // If the broadcaster wants to show Twitch Channel emotes, fetch them.
            if (configContent.settings.showTwitch) {
                getChannelEmotes(auth);
            }

            // If the broadcaster wants to show BTTV emotes, fetch them.
            if (configContent.settings.showBTTV) {
                getBTTVEmotes(auth.channelId);
            }

            // If the broadcaster wants to show FFZ emotes, fetch them.
            if (configContent.settings.showFFZ) {
                getFFZEmotes(auth.channelId);
            }

                // If the broadcaster wants to show 7TV emotes, fetch them.
            if (configContent.settings.showSevenTV) {
                getSevenTVEmotes(auth.channelId);
            }

            // It is no longer the first run, thus the handler will not run again.
            firstrun = false;
        }
    }
};

function getExtensionData(auth) {
    // GET the Twitch API for the details of the broadcaster channel
    fetch(`https://api.twitch.tv/helix/users?id=${auth.channelId}`, {
            method: "GET",
            headers: {
                "client-id": auth.clientId,
                "Authorization": `Extension ${auth.helixToken}`
            }
        })
        // if an error occurs, log it
        .catch(err => {
            console.error(err);
        })
        // convert to readable json object
        .then(res => res.json())
        .then(body => {
            // set the name and profile picture of broadcaster
            displayname = body.data[0].display_name;
            document.getElementById("channelHeaderPFP").src = body.data[0].profile_image_url;
        }
    );

    fetch(`https://api.twitch.tv/helix/chat/badges?broadcaster_id=${auth.channelId}`, {
        method: "GET",
        headers: {
            "client-id": auth.clientId,
            "Authorization": `Extension ${auth.helixToken}`
        }
    })
    // if an error occurs, log it
    .catch(err => {
        console.error(err)
    })
    // convert to readable json object
    .then(res => res.json())
    .then(body => {
        console.log("Subscriber Badges", body)

        let elements = document.getElementsByClassName("sub_badge");

        Array.prototype.forEach.call(elements, (element) => {
            element.src = body.data[0].versions[0].image_url_4x
        })
    })
};