const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
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

function openModal(modal) {
    if (modal == null) return;
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
        var gifName = button.querySelector(".animated").innerHTML;
        image.src = gifName;
    })
})

openModalButtons.forEach(button => {
    button.addEventListener('mouseleave', () => {
        var image = button.querySelector("img");
        var staticName = button.querySelector(".static").innerHTML;
        image.src = staticName;
    })
})

