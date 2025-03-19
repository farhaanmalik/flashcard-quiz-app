const startQuiz = () => {
    const flashcards = storage.getFlashcards();
    if (flashcards.length === 0) return alert("No flashcards available!");

    let score = 0;
    flashcards.forEach((card) => {
        let userAnswer = prompt(`Q: ${card.question}\n(Need a hind? Type "hint")`);

        if (userAnswer === "hint") {
            userAnswer = prompt(`Hint: ${generateHint(card.answer)}`);
        }

        if (userAnswer && userAnswer.toLocaleLowerCase() === card.answer.toLocaleLowerCase()) {
            score++;
            alert("Correct!");
        } else {
            alert(`Wrong! The correct answer is: ${card.answer}`);
        }

    });

    alert(`Quiz Over! Your Score: ${score}/${flashcards.length}`);
}

document.getElementById("start-quiz-btn").addEventListener("click", startQuiz);

const generateHint = (answer) => {
    let words = answer.split(" ");
    return words.map((word, index) => (index === 0 ? word[0] + "_".repeat(word.length - 1) : "_".repeat(word.length - 1))).join(" ");
}