chrome.alarms.onAlarm.addListener(({ name }) => {
  if (name === "update") {
    return;
  }

  const breakTime = name === "25min" ? "5min" : "10min";

  chrome.notifications.create({
    type: "basic",
    title: `${name} is finished!`,
    message: `Take a ${breakTime} break. And do again.`,
    iconUrl: "../images/pomodoro_able_128.png",
  });

  chrome.action.setIcon({
    path: `../images/pomodoro_unable_128.png`,
  });
});
