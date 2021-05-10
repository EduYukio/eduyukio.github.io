const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal, button);
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
})

var $html = $('html'),
    scrollTop;

function openModal(modal, article) {
    if (modal == null) return;
    getData(modal, article);
    modal.classList.add('active');
    overlay.classList.add('active');

    scrollTop = $(window).scrollTop();
    $html.addClass('scrollDisabled').css({ top: -1 * scrollTop });
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');

    $html.removeClass('scrollDisabled');
    $(window).scrollTop(scrollTop);
}





openModalButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        var image = button.querySelector("img");
        var gifName = button.querySelector(".animated");
        if (gifName == null) return;
        image.src = gifName.innerHTML;
    })
})

openModalButtons.forEach(button => {
    button.addEventListener('mouseleave', () => {
        var image = button.querySelector("img");
        var staticName = button.querySelector(".static");
        if (staticName == null) return;
        image.src = staticName.innerHTML;
    })
})




function getData(modal, article) {
    var gameName = article.id;
    $.getJSON('data.json', function (data) {
        modal.querySelector(".title").innerHTML = data[gameName].name;
    });
}