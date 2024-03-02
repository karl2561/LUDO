function clickSettings(divId) {
    return new Promise(resolve => {
        const divElement = document.getElementById(divId);
        function clickHandler(event) {
            if (event.target === divElement) {
                divElement.removeEventListener('click', clickHandler);
                resolve(event);
            }
        }
        divElement.addEventListener('click', clickHandler);
    });
}


async function changeSettings() {
    try {
        await clickSettings('settings');
        currentSettings.toggleSettings();
        await clickSettings('save');
        currentSettings.speedSettings['gameSpeed'] = document.querySelector('#valuegameSpeed').innerHTML;
        currentSettings.speedSettings['highlightFieldDuration'] = document.querySelector('#valuehighlightFieldDuration').innerHTML;
        currentSettings.toggleSettings();
    } catch (error) {
        console.error('Error:', error);
    }
}
