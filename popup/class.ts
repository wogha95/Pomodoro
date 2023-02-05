import type { Alarm, Chrome } from "../type/index";

declare const chrome: Chrome;

class Pomodoro<T extends InstanceType<typeof DOM>> {
  #icon = new Icon();
  #dom;

  constructor(dom: T) {
    this.#dom = dom;
    this.#initial();
  }

  async #initial() {
    const alarms = (await chrome.alarms.getAll()).filter(
      (alarm) => alarm.name !== "update"
    );

    if (alarms.length === 0) {
      this.#dom.toggleStartSection();
      return;
    }

    this.#icon.changeIcon(true);
    this.updateResultTime();
    this.#dom.toggleStopSection();
  }

  #toggle() {
    this.#icon.changeIcon();
    this.#dom.toggleAll();
  }

  start(time: number) {
    chrome.alarms.create(`${time}min`, { delayInMinutes: time });
    chrome.alarms.create(`update`, { periodInMinutes: 1 });
    chrome.action.setTitle({ title: `${time - 1}min left` });
    this.updateResultTime();
    this.#toggle();
  }

  stop() {
    chrome.alarms.clearAll();
    this.#toggle();
  }

  updateResultTime() {
    this.#dom.updateResultTime();
  }

  handleAlarm(name: Alarm["name"]) {
    if (name === "update") {
      this.updateResultTime();
      return;
    }

    this.stop();
  }

  static #instance: InstanceType<typeof Pomodoro>;

  static getInstance(dom: InstanceType<typeof DOM>) {
    if (Pomodoro.#instance) {
      return this.#instance;
    }

    this.#instance = new Pomodoro(dom);
    return this.#instance;
  }
}

class DOM<T extends HTMLElement> {
  #startSection;
  #stopSection;

  constructor(startSection: T, stopSection: T) {
    this.#startSection = startSection;
    this.#stopSection = stopSection;
  }

  async #calculateResultTime() {
    const alarms = (await chrome.alarms.getAll()).filter(
      (alarm) => alarm.name !== "update"
    );
    return Math.floor(
      (new Date(alarms[0].scheduledTime).getTime() - new Date().getTime()) /
        1000 /
        60
    );
  }

  toggleStartSection() {
    this.#startSection.classList.toggle("none");
  }

  toggleStopSection() {
    this.#stopSection.classList.toggle("none");
  }

  toggleAll() {
    this.toggleStartSection();
    this.toggleStopSection();
  }

  async updateResultTime() {
    this.#stopSection.querySelector(
      "span"
    )!.innerText = `${await this.#calculateResultTime()}min left`;
  }
}

class Icon {
  #state = false;

  get #iconName() {
    return this.#state ? "able" : "unable";
  }

  #setIcon() {
    chrome.action.setIcon({
      path: `../images/pomodoro_${this.#iconName}_128.png`,
    });
  }

  changeIcon(state = false) {
    this.#state = state ? state : !this.#state;
    this.#setIcon();
  }
}

export { Pomodoro, DOM };
