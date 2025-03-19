document.addEventListener("DOMContentLoaded", () => {
    const flashcardContainer = document.getElementById("flashcard-container");
    const addCardBtn = document.getElementById("add-card-btn");
    const modal = document.getElementById("add-flashcard-modal");
    const saveFlashcardBtn = document.getElementById("save-flashcard");

    function renderFlashcards() {
        flashcardContainer.innerHTML = "";
        const flashcards = storage.getFlashcards();
        flashcards.forEach((card, index) => {
            const div = document.createElement("div");
            div.classList.add("flashcard");
            div.innerHTML = `
            <strong>${card.question}</strong>
            <button class="delete-btn" data-index="${index}">❌</button>
            `;
            div.addEventListener("click", (event) => {
                if (!event.target.classList.contains("delete-btn")) {
                    alert(`Answer: ${card.answer}`)
                }
            });

            flashcardContainer.appendChild(div);
        });

        // Attach event listeners to all delete buttons
        document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", deleteFlashcard);
        })
    }

    const deleteFlashcard = (event) => {
        event.stopPropagation();

        const index = event.target.dataset.index;
        let flashcards = storage.getFlashcards();
        flashcards.splice(index, 1);
        storage.saveFlashcards(flashcards)

        renderFlashcards();
    }

    addCardBtn.addEventListener("click", () => modal.style.display = "block");

    saveFlashcardBtn.addEventListener("click", () => {
        const question = document.getElementById("question-input").value;
        const answer = document.getElementById("answer-input").value;

        if (question && answer) {
            const flashcards = storage.getFlashcards();
            flashcards.push({ question, answer });
            storage.saveFlashcards(flashcards);

            modal.style.display = "none";
            renderFlashcards();
        }
    });

    renderFlashcards();
});