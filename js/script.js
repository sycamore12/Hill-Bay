$(document).ready(function(){
    $(".hamburger").click(function(){
        $(".top-menu").css("right", "0");
    });

    $(".close").click(function(){
        $(".top-menu").css("right", "-100vw");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let modalBox = document.getElementById("modal-box");

    function showModal() {
        modalBox.style.display = "flex";
    }

    function closeModal() {
        modalBox.style.display = "none";
    }

    document.querySelector(".user img").onclick = showModal;
    document.querySelector(".close-modal-btn").onclick = closeModal;
});

