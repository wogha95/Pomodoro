import { Pomodoro, DOM } from "./class.js";
import type { Chrome } from "../type/index.js";

declare const chrome: Chrome;

const $startSection = document.querySelector(".start") as HTMLElement;
const $stopSection = document.querySelector(".stop") as HTMLElement;
const $25minButton = $startSection.querySelector(
  "#min-25"
) as HTMLButtonElement;
const $50minButton = $startSection.querySelector(
  "#min-50"
) as HTMLButtonElement;
const $stopButton = $stopSection.querySelector("#stop") as HTMLButtonElement;

const pomodoro = Pomodoro.getInstance(new DOM($startSection, $stopSection));

$25minButton.addEventListener("click", () => pomodoro.start(25));
$50minButton.addEventListener("click", () => pomodoro.start(50));
$stopButton.addEventListener("click", () => pomodoro.stop());

chrome.alarms.onAlarm.addListener(({ name }) => pomodoro.handleAlarm(name));
