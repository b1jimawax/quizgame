const questions = [
    { question: "Quel est le synonyme de 'chat' ?", options: ["Chien", "Félin", "Lion", "Souris"], answer: "Félin" },
    { question: "Quel est l'antonyme de 'sourire' ?", options: ["Pleurer", "Rire", "Crier", "Bouder"], answer: "Pleurer" },
    { question: "Que signifie 'réticent' ?", options: ["Timide", "Déterminé", "Bavard", "Silencieux"], answer: "Silencieux" },
    { question: "Quel est le synonyme de 'étrange' ?", options: ["Normal", "Inhabituel", "Mystérieux", "Étranger"], answer: "Inhabituel" },
    { question: "Que signifie 'benevolent' en français ?", options: ["Généreux", "Agressif", "Égoïste", "Indifférent"], answer: "Généreux" },
    { question: "Quel est l'antonyme de 'vieux' ?", options: ["Jeune", "Nouveau", "Ancien", "Âgé"], answer: "Jeune" },
    { question: "Que signifie 'ubiquité' ?", options: ["Omniprésence", "Unicité", "Unilatéralité", "Opacité"], answer: "Omniprésence" },
    { question: "Quel est le synonyme de 'joyeux' ?", options: ["Heureux", "Triste", "Énervé", "Fâché"], answer: "Heureux" },
    { question: "Que signifie 'efficace' ?", options: ["Qui produit les effets attendus", "Qui ne produit aucun effet", "Qui produit des effets négatifs", "Qui produit des effets imprévus"], answer: "Qui produit les effets attendus" },
    { question: "Quel est l'antonyme de 'modeste' ?", options: ["Orgueilleux", "Simple", "Humble", "Arrogant"], answer: "Arrogant" },
];

let currentQuestionIndex = 0;
let score = 1;

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
