let fieldData;

let interval;
let startTime = NaN;
let speed = 3;
let currentDistance = 0.0;

const mainContainer = document.getElementById('main-container');
const distanceText = document.getElementById('distance');

const calculateCurrentDistance = () => {
  let currentTime = new Date();
  
  let elapsedTime = (currentTime - startTime) / 1000;
  let elapsedTimeHours = elapsedTime / (60*60);
  
  return (speed*(elapsedTimeHours)).toFixed(2);
};

const hide = () => mainContainer.className = 'main-container hidden';
const show = () => mainContainer.className = 'main-container';

const tick = () => {
  currentDistance = calculateCurrentDistance();
  distanceText.innerHTML = `Walk Distance: ${currentDistance} miles`;
  show();
};

const start = (inputSpeed) => {
  if(inputSpeed !== '') {
    speed = Number.parseInt(inputSpeed);
  }
  startTime = new Date(); // current time

  if(interval) {
    clearInterval(interval);
  }
  interval = setInterval(tick, 1000);
};

const end = () => {
  if(interval) {
    clearInterval(interval);
  }
};

const checkPrivileges = (data, privileges) => {
  const {tags, userId} = data;
  const {mod, subscriber, badges} = tags;
  const required = privileges || fieldData.privileges;
  const isMod = parseInt(mod);
  const isSub = parseInt(subscriber);
  const isVip = (badges.indexOf("vip") !== -1);
  const isBroadcaster = (userId === tags['room-id']);
  if (isBroadcaster) return true;
  if (required === "justSubs" && isSub) return true;
  if (required === "mods" && isMod) return true;
  if (required === "vips" && (isMod || isVip)) return true;
  if (required === "subs" && (isMod || isVip || isSub)) return true;
  return required === "everybody";
};

const handleMessage = (obj) => {
  const data = obj.detail.event.data;

  if (!checkPrivileges(data)) {
    return;
  }

  const { startCommand, endCommand, clearCommand } = fieldData;
  const {text} = data;
  const startsWithStart = text.toLowerCase().startsWith(startCommand.toLowerCase());
  const startsWithEnd = text.toLowerCase().startsWith(endCommand.toLowerCase());
  const startsWithRestart = text.toLowerCase().startsWith(clearCommand.toLowerCase());
  
  if(startsWithStart) {
    const inputSpeed = text.toLowerCase().replace(startCommand.toLowerCase(), '').trim();
    start(inputSpeed);
    return;
  }

  if(startsWithEnd) {
    end();
    return;
  }

  if(startsWithClear) {
      end();
    hide();
    return;
  }
};

window.addEventListener('onEventReceived', function (obj) {
  if (obj.detail.listener !== "message") {
    return;
  }
  handleMessage(obj);
});

window.addEventListener('onWidgetLoad', function (obj) {
  fieldData = obj.detail.fieldData;

  if(fieldData.preview) {
    show();
  }
});
