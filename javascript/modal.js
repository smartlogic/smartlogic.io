// Landing page case study modals
const modals = {
  "wck-modal": document.getElementById("wck-modal"),
  "challenge-modal": document.getElementById("challenge-modal"),
  "bchd-modal": document.getElementById("bchd-modal")
};

const samples = document.querySelectorAll(".samples");

samples.forEach(sample => {
  sample.addEventListener("click", function() {
    const modalId = this.getAttribute("data-modal");
    const modal = modals[modalId];
    if (modal) {
      modal.style.display = "block";
    }
  });
});

document.querySelectorAll(".modal-close").forEach(closeButton => {
  closeButton.addEventListener("click", function() {
    this.closest(".case-study-modal").style.display = "none";
  });
});

window.onclick = function(event) {
  if (event.target.classList.contains("case-study-modal")) {
    event.target.style.display = "none";
  }
};
