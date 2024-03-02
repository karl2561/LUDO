function waitForEvent() {
  return new Promise((resolve) => {
      const clickHandler = (event) => {
          const field = event.target.closest('.field');
          if (field) {
              field.style.backgroundColor = 'purple';
              setTimeout(function () {
                  field.style.backgroundColor = '';
              }, currentSettings.speedSettings['highlightFieldDuration']);
              resolve(field);
          }
      };
  document.getElementById('game-board').addEventListener('click', clickHandler);
  });
}

function convertSelection(selection) {
  if(selection.className.match('home')) {
      return -1;
  }
  if(selection.className.match('finish')) {
      console.log(40 + stringToNum(Array.from(selection.classList).slice(-1)[0]));
      return 40 + stringToNum(Array.from(selection.classList).slice(-1)[0]);
  }
  return gameField.findIndex(element => document.querySelector(`.${element}`) === selection);
}
