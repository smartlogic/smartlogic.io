// // "Get Started" Landing page modal 
document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('modal');
  var btns = document.querySelectorAll('[id="openModal"]');
  var span = document.querySelector('.modal .close');

  btns.forEach(function(btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      modal.style.display = "block";
    }
  });

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});

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

// Landing page pillar cards
document.addEventListener('DOMContentLoaded', function () {
  const previousCard = document.getElementById("back-arrow");
  const nextCard = document.getElementById("next-arrow");

  nextCard.addEventListener("click", showNextCard);
  previousCard.addEventListener("click", showPreviousCard);

  function showNextCard() {
    const currentCardId = document.getElementsByClassName("current-card")[0].id;
    const currentCardNb = Number(currentCardId[currentCardId.length - 1]);

    const displayedCardId = `card-${currentCardNb}`;
    const displayedCard = document.getElementById(displayedCardId);

    let nextCardNb = currentCardNb + 1;
    if (nextCardNb === 5) nextCardNb = 1;

    const cardToBeDisplayedId = `card-${nextCardNb}`;
    const cardToBeDisplayed = document.getElementById(cardToBeDisplayedId);

    displayedCard.classList.remove("current-card");
    displayedCard.classList.add("hidden-card");
    cardToBeDisplayed.classList.remove("hidden-card");
    cardToBeDisplayed.classList.add("current-card");
  }

  function showPreviousCard() {
    const currentCardId = document.getElementsByClassName("current-card")[0].id;
    const currentCardNb = Number(currentCardId[currentCardId.length - 1]);

    const displayedCardId = `card-${currentCardNb}`;
    const displayedCard = document.getElementById(displayedCardId);

    let previousCardNb = currentCardNb - 1;
    if (previousCardNb === 0) previousCardNb = 4;

    const cardToBeDisplayedId = `card-${previousCardNb}`;
    const cardToBeDisplayed = document.getElementById(cardToBeDisplayedId);

    displayedCard.classList.remove("current-card");
    displayedCard.classList.add("hidden-card");
    cardToBeDisplayed.classList.remove("hidden-card");
    cardToBeDisplayed.classList.add("current-card");
  }
});
