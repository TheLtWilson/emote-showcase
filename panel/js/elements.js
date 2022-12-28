function createEmote(name, src, target, tooltip) {
    // creates an image element
    let mainElement = document.createElement('img');

    // set the properties of the element
    mainElement.alt = name;
    mainElement.src = src;
    mainElement.style = "cursor: pointer;";

    // append it to the target and create the hover tooltip
    document.getElementById(target).appendChild(mainElement);
    createTooltip(mainElement, tooltip);

    // return the element to allow creation of event listeners
    return mainElement;
}

function showEmoteDetails(name, src, buttonText, buttonLink, isFollow, creatorText) {
    // Set text for detailed emote popup.
    document.getElementById('detailsEmoteName').innerText = name;
    document.getElementById('detailsCreatorName').innerText = creatorText;
    document.getElementById('detailsButton').innerText = buttonText

    // Set the "src" tag for the 3 image sizes.
    document.getElementById('detailsEmote3').src = src;
    document.getElementById('detailsEmote2').src = src;
    document.getElementById('detailsEmote1').src = src;

    // If the emote is a follower emote
    if (isFollow) {
        // Remove any previous "href" tag and use Twitch's follow feature
        document.getElementById('detailsButton').removeAttribute('href');
        document.getElementById('detailsButton').addEventListener('click', () => {
            window.Twitch.ext.actions.followChannel(displayname)
        })
    // If the emote is not a follower emote
    } else {
        // Set the "href" tag to specified link if one exists.
        if (buttonLink) {
            document.getElementById('detailsButton').href = buttonLink;
        // If there is no specified link, remove the "href" tag.
        } else {
            try {
                document.getElementById('detailsbutton').removeAttribute('href');
            } catch (err) {
                console.error(err)
            }
        }
    }

    // Unhide the detailed emote popup.
    document.getElementById('emoteDetails').classList.remove('hidden')
}

function createTooltip(element, content) {
    // Create a tooltip at element, with content as the contents of the tooltip.
    tippy(element, {
        allowHTML: true,
        content: content,
        arrow: true
    })
}