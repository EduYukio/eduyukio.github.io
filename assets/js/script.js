const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

var jsonData;

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => (jsonData = data));

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal, button);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

var $html = $("html"),
  scrollTop;

function openModal(modal, article) {
  if (modal == null) return;
  updateModalInfo(modal, article.id);
  modal.classList.add("active");
  overlay.classList.add("active");

  scrollTop = $(window).scrollTop();
  $html.addClass("scrollDisabled").css({ top: -1 * scrollTop });
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");

  $html.removeClass("scrollDisabled");
  $(window).scrollTop(scrollTop);
}

openModalButtons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    var image = button.querySelector("img");
    var gifName = jsonData[button.id]["gif-name"];
    if (gifName == null) return;
    image.src = "images/" + gifName;
  });
});

openModalButtons.forEach((button) => {
  button.addEventListener("mouseleave", () => {
    var image = button.querySelector("img");
    var staticName = jsonData[button.id]["static-name"];
    if (staticName == null) return;
    image.src = "images/" + staticName;
  });
});

function updateModalInfo(modal, gameName) {
  updateTitle(modal, gameName);
  updateVideo(modal, gameName);
  updateAllAvailables(modal, gameName);
  updatePlayButton(modal, gameName);
  updateCodeButton(modal, gameName);
  updateYearText(modal, gameName);
}

function updateTitle(modal, gameName) {
  modal.querySelector(".title").innerHTML = jsonData[gameName].name;
}

function updateVideo(modal, gameName) {
  modal.querySelector(".json-video").src = jsonData[gameName]["video-link"];
}

function updateAllAvailables(modal, gameName) {
  updateAvailable(modal, gameName, "web");
  updateAvailable(modal, gameName, "windows");
  updateAvailable(modal, gameName, "linux");
  updateAvailable(modal, gameName, "android");
}

function updateAvailable(modal, gameName, platform) {
  var selected = modal.querySelector(".json-available-" + platform);
  if (jsonData[gameName]["available"].includes(platform)) {
    selected.className += " fab fa-lg fa-" + platform;
    selected.style.display = "unset";
  } else {
    selected.className = "json-available-" + platform;
    selected.style.display = "none";
  }
}

function updatePlayButton(modal, gameName) {
  modal.querySelector("#play-button").href = jsonData[gameName]["play-link"];
}

function updateCodeButton(modal, gameName) {
  modal.querySelector("#source-button").href =
    jsonData[gameName]["source-link"];
}

function updateYearText(modal, gameName) {
  modal.querySelector(".modal-year-text").innerHTML =
    jsonData[gameName]["year"] + " - " + jsonData[gameName]["team"];
}
