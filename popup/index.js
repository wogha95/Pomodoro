import { Pomodoro, DOM } from "./class.js";

const $startSection = document.querySelector(".start");
const $stopSection = document.querySelector(".stop");
const $25minButton = $startSection.querySelector("#min-25");
const $50minButton = $startSection.querySelector("#min-50");
const $stopButton = $stopSection.querySelector("#stop");

const pomodoro = new Pomodoro(new DOM($startSection, $stopSection));

$25minButton.addEventListener("click", () => pomodoro.start(25));
$50minButton.addEventListener("click", () => pomodoro.start(50));
$stopButton.addEventListener("click", () => pomodoro.stop());

chrome.alarms.onAlarm.addListener(({ name }) => pomodoro.handleAlarm(name));
