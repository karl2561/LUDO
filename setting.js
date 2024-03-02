class setting {
    constructor() {
        this._speedSettings = {
            'gameSpeed': 1000,
            'highlightFieldDuration': 2000
        },
        this.settings = document.getElementById('settings')
    }
    get speedSettings() {
        return this._speedSettings
    }
    toggleSettings() {
        if(!document.querySelector('.settings_menu')) {
            document.querySelector("body").
            appendChild(Object.assign(document.createElement('section'), { className: 'settings_menu' }));
            this.showSettings();
        } else {
            document.querySelector("body").removeChild(document.querySelector('.settings_menu'));
        }
    }
    showSettings() {
        const form = document.querySelector('.settings_menu').
        //appendChild(Object.assign(document.createElement('form'), {className: 'settings_form', method: 'POST'})).
        appendChild(Object.assign(document.createElement('table'), {className: 'settings_table'}));
        for(let key in this.speedSettings) {
        form.appendChild(Object.assign(document.createElement('tr'))).
        appendChild(Object.assign(document.createElement('td'))).
        appendChild(Object.assign(document.createElement('label'), {name: `${key}`, innerHTML: `Change ${key}`}));
        form.appendChild(Object.assign(document.createElement('tr'))).
        appendChild(Object.assign(document.createElement('td'))).
        appendChild(Object.assign(document.createElement('input'), {type: 'range', name: `${key}`, id: `${key}`, min: '50', max: '2000', step: '50', value: this.speedSettings[key]}));
        form.appendChild(Object.assign(document.createElement('tr'))).
        appendChild(Object.assign(document.createElement('td'))).
        appendChild(Object.assign(document.createElement('p'), {id: `pvalue${key}`, innerHTML: `Value: <output id="value${key}"></output>`}));
        const value = document.querySelector(`#value${key}`);
        const input = document.querySelector(`#${key}`);
        input.addEventListener("input", (event) => {
            value.textContent = event.target.value;
        });
        }
        form.appendChild(Object.assign(document.createElement('tr'))).
        appendChild(Object.assign(document.createElement('td'))).
        appendChild(Object.assign(document.createElement('input'), {type: 'button', value: 'Save', id: 'save'}));
        
    }     
}