const questions = [
    { question: "Que signifie Idylle ?", options: ["conflit", "romance", "désastre", "aventure"], answer: "romance" },
    { question: "Comment appelle-t-on la femme du singe ?", options: ["la singère", "la guenon", "la singette", "la guenoise"], answer: "la guenon" },
    { question: "Si vous êtes agoraphobe vous avez peur de :", options: ["la foule", "des araignées", "les lieux publics", "du tonnerre"], answer: "les lieux publics" },
    { question: "Comment appelle-t-on les habitants de Mouila ?", options: ["les Molvillois", "les Moulois", "les Molois", "les mouilvillois"], answer: "les Molvillois" },
    { question: "Il a donné une explication alambiquée. Que signifie alambiquée ?", options: ["simple", "claire", "compliquée", "brève"], answer: "compliquée" },
    { question: "Que signifie Ephémère ?", options: ["Léger", "Eternel", "Rapide", "Temporaire"], answer: "Temporaire" },
    { question: "Que signifie omniprésent ?", options: ["Aimable", "Invincible", "Omniscient", "Tout-puissant"], answer: "Tout-puissant" },
    { question: "Que signifie pragmatique ?", options: ["Idéaliste", "Réaliste", "Théorique", "Spéculatif"], answer: "Réaliste" },
    { question: "Que signifie Taciturne ?", options: ["Bavard", "Joyeux", "Silencieux", "Coloré"], answer: "Silencieux" },
    { question: "Comment appelle-t-on les élèves de l'ENS ?", options: ["les Normaliens", "les Nomades", "les Nomains", "les Normane"], answer: "les Normaliens" },
];

let currentQuestionIndex = 0;
let score = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = "";
    shuffleArray(currentQuestion.options).forEach((option, index) => {
        const optionElement = document.createElement("input");
        optionElement.type = "radio";
        optionElement.name = "option";
        optionElement.id = "option" + index;
        optionElement.value = option;

        const labelElement = document.createElement("label");
        labelElement.textContent = option;
        labelElement.htmlFor = "option" + index;

        optionsElement.appendChild(optionElement);
        optionsElement.appendChild(labelElement);
        optionsElement.appendChild(document.createElement("br"));
    });
}

// Vérifie la réponse
function checkAnswer() {
    const selectedOption = document.querySelector("input[name='option']:checked");
    if (!selectedOption) return;

    const answer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].answer;

    const container = document.querySelector('.container'); // Sélectionnez le conteneur

    if (answer === correctAnswer) {
        score++;
        container.style.backgroundColor = '#5cb85c'; // Vert pour la bonne réponse
    } else {
        container.style.backgroundColor = '#d9534f'; // Rouge pour la mauvaise réponse
    }

    // Réinitialise la couleur du conteneur à la couleur de fond par défaut (blanc)
    setTimeout(() => {
        container.style.backgroundColor = '#fff';
    }, 1000); // 1000 ms = 1 seconde

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endGame();
    }
}

// Fonction de fin de jeu
function endGame() {
    const container = document.querySelector('.container'); // Sélectionnez le conteneur

    if (score >= 5) {
        container.style.backgroundColor = '#5cb85c'; // Vert si le score est de 5 ou plus
        container.innerHTML = "<h2> &#x1F44F; Félicitation ! Vous avez trouvé : " + score + "/10 bonnes réponses!</h2> ";
    } else {
        container.style.backgroundColor = '#d9534f'; // Rouge si le score est inférieur à 5
        container.innerHTML = "<h2> &#x1F630; Dommage ! Vous avez trouvé que : " + score + "/10 bonnes réponses!</h2>";
    }

    // Afficher le message de fin du jeu avec le score
}

// Démarrez le jeu
displayQuestion();
