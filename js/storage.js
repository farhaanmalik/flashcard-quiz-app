const storage = {
    saveFlashcards: (flashcards) => localStorage.setItem("flashcards", JSON.stringify(flashcards)),

    getFlashcards: () => JSON.parse(localStorage.getItem("flashcards")) || []
};