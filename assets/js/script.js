var gamesData;
var otherData;

fetch("./data/gamesData.json")
  .then((response) => response.json())
  .then((data) => (gamesData = data));

fetch("./data/otherData.json")
  .then((response) => response.json())
  .then((data) => (otherData = data));

updateCurrentWorkDuration();

var $html = $("html"),
  scrollTop;

function cleanList(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

function calculateDuration(startDate) {
  const currentDate = new Date();
  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  let result = [];
  if (years > 0) result.push(`${years}y`);
  if (months > 0 || years === 0) result.push(`${months}mo`);

  return result.join(" ");
}

function updateCurrentWorkDuration() {
  const startDate = new Date(2025, 8);
  const durationText = calculateDuration(startDate);

  document.getElementById(
    "arvore-duration"
  ).textContent = `Game Programmer (${durationText}) [Ongoing]`;
}
