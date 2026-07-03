// Search Jobs

const searchInput = document.getElementById("searchJob");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let filter = searchInput.value.toLowerCase();

        let cards = document.querySelectorAll(".card");

        cards.forEach(function (card) {

            let text = card.innerText.toLowerCase();

            if (text.includes(filter)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}


// Apply Button Alert

const applyButtons = document.querySelectorAll(".card .btn");

applyButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        localStorage.setItem("selectedJob", this.parentElement.parentElement.querySelector("h3").innerText);

    });

});