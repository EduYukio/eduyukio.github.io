const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

var gamesData;
var otherData;

fetch("./gamesData.json")
  .then((response) => response.json())
  .then((data) => (gamesData = data));

fetch("./otherData.json")
  .then((response) => response.json())
  .then((data) => (otherData = data));

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
    var gifName = gamesData[button.id]["gif-name"];
    if (gifName == null) return;
    image.src = "images/" + gifName;
  });
});

openModalButtons.forEach((button) => {
  button.addEventListener("mouseleave", () => {
    var image = button.querySelector("img");
    var staticName = gamesData[button.id]["static-name"];
    if (staticName == null) return;
    image.src = "images/" + staticName;
  });
});

function updateModalInfo(modal, gameName) {
  updateTitle(modal, gameName);
  updateVideo(modal, gameName);
  updatePlayButton(modal, gameName);
  updateCodeButton(modal, gameName);
  updateYearText(modal, gameName);
  updateAvailables(modal, gameName);
  updateRoles(modal, gameName);
  updateTools(modal, gameName);
}

function updateTitle(modal, gameName) {
  modal.querySelector(".title").innerHTML = gamesData[gameName].name;
}

function updateVideo(modal, gameName) {
  modal.querySelector(".json-video").src = gamesData[gameName]["video-link"];
}

function updatePlayButton(modal, gameName) {
  modal.querySelector("#play-button").href = gamesData[gameName]["play-link"];
}

function updateCodeButton(modal, gameName) {
  modal.querySelector("#source-button").href =
    gamesData[gameName]["source-link"];
}

function updateYearText(modal, gameName) {
  modal.querySelector(".modal-year-text").innerHTML =
    gamesData[gameName]["year"] + " - " + gamesData[gameName]["team"];
}

function updateAvailables(modal, gameName) {
  otherData["availables"].forEach((platform) => {
    var selected = modal.querySelector(".json-available-" + platform);
    if (gamesData[gameName]["available"].includes(platform)) {
      selected.className += " fab fa-lg fa-" + platform;
      selected.style.display = "unset";
    } else {
      selected.className = "json-available-" + platform;
      selected.style.display = "none";
    }
  });
}

function updateRoles(modal, gameName) {
  otherData["roles"].forEach((role) => {
    var selected = modal.querySelector("#role-" + role);
    if (gamesData[gameName]["roles"].includes(role)) {
      selected.style.opacity = "100%";
    } else {
      selected.style.opacity = "30%";
    }
  });
}

function updateTools(modal, gameName) {
  otherData["tools"].forEach((tool) => {
    var selected = modal.querySelector("#tool-" + tool);
    if (gamesData[gameName]["tools"].includes(tool)) {
      selected.style.display = "unset";
    } else {
      selected.style.display = "none";
    }
  });
}
