chrome.alarms.onAlarm.addListener(({ name }) => {
  if (name === "update") {
    (async () => {
      const alarms = (await chrome.alarms.getAll()).filter(
        (alarm) => alarm.name !== "update"
      );

      if (alarms.length === 0) {
        return;
      }
      const resultTime = Math.floor(
        (new Date(alarms[0].scheduledTime).getTime() - new Date().getTime()) /
          1000 /
          60
      );
      chrome.action.setTitle({ title: `${resultTime}min left` });
    })();
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

  chrome.action.setTitle({ title: "Let's Pomodoro!" });

  chrome.alarms.clearAll();
});
