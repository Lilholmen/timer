const startContainer = document.querySelector('.start');
const timerContainer = document.querySelector('.timer');

const startButton = document.querySelector('.start__button');
const countdown = document.querySelector('.timer__countdown');

const settingsLabels = document.querySelectorAll('.settings__Label');
const timerSettings = document.querySelectorAll('.settings__input');

const unitLabels = ['M', 'W', 'D', 'h', 'm', 's'];

startButton.addEventListener('click', () => {
  switchScreen(startContainer, timerContainer);

  startCountdown();
});

document
  .querySelector('.timer__title')
  .addEventListener('click', () =>
    switchScreen(timerContainer, startContainer)
  );

addUnits(countdown, 'Days', 'H', 'M', 'S');

function startCountdown() {
  const timerInitialValue = {};

  timerSettings.forEach((unit) => {
    timerInitialValue[unit.id] = unit.value;
  });

  console.log(timerInitialValue);

  addUnits(countdown, timerInitialValue);
}

function switchScreen(active, hidden) {
  active.classList.add(`${active.classList[0]}--hidden`);

  hidden.classList.remove(`${hidden.classList[0]}--hidden`);
}

function createCountdown(unit) {
  const countdownContainer = document.createElement('div');
  const countdownUnit = document.createElement('span');
  const countdownValue = document.createElement('span');

  countdownContainer.classList.add('countdown__container');
  countdownUnit.classList.add('countdown__unit');
  countdownValue.classList.add('countdown__value');

  countdownUnit.innerText = unit;
  countdownValue.innerText = 15;

  countdownContainer.append(countdownUnit, countdownValue);

  return countdownContainer;
}

function createSeparator() {
  const separator = document.createElement('span');

  separator.classList.add('countdown__separator');
  separator.innerText = ':';

  return separator;
}

function addUnits(parentElement, ...countdownUnits) {
  const lastUnit = countdownUnits[countdownUnits.length - 1];
  const unitsElements = [];

  if (parentElement.hasChildNodes()) {
    unitsElements.push(createSeparator());
  }

  for (const unit of countdownUnits) {
    unitsElements.push(createCountdown(unit));

    if (unit !== lastUnit) {
      unitsElements.push(createSeparator());
    }
  }

  parentElement.append(...unitsElements);
}
