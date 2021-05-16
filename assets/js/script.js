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
  updateAvailable(modal, gameName);
}

function updateTitle(modal, gameName) {
  modal.querySelector(".title").innerHTML = jsonData[gameName].name;
}

function updateVideo(modal, gameName) {
  modal.querySelector(".json-video").src = jsonData[gameName]["video-link"];
}

function updateAvailable(modal, gameName) {
  var selected = modal.querySelector(".json-available-web");
  if (jsonData[gameName]["available"].includes("web")) {
    selected.className += " fab fa-html5 fa-lg";
    selected.style.display = "unset";
  } else {
    selected.className = "json-available-web";
    selected.style.display = "none";
  }

  var selected = modal.querySelector(".json-available-windows");
  if (jsonData[gameName]["available"].includes("windows")) {
    selected.className += " fab fa-windows fa-lg";
    selected.style.display = "unset";
  } else {
    selected.className = "json-available-windows";
    selected.style.display = "none";
  }

  var selected = modal.querySelector(".json-available-linux");
  if (jsonData[gameName]["available"].includes("linux")) {
    selected.className += " fab fa-linux fa-lg";
    selected.style.display = "unset";
  } else {
    selected.className = "json-available-linux";
    selected.style.display = "none";
  }

  var selected = modal.querySelector(".json-available-android");
  if (jsonData[gameName]["available"].includes("android")) {
    selected.className += " fab fa-android fa-lg";
    selected.style.display = "unset";
  } else {
    selected.className = "json-available-android";
    selected.style.display = "none";
  }
}
