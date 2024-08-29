// Get the modal
const modal = document.getElementsByClassName("case-study-modal")[0];

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("modal-close")[0];

// When the user clicks on <span> (x), close the modal
span.addEventListener("click",  function() {
    modal.style.display = "none";
})
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}