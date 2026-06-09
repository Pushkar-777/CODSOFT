const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.querySelector(".welcome-screen");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");

const timerElement = document.getElementById("timer");
const progressElement = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;
let xp = 0;
let timer;
let timeLeft = 30;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);

function startQuiz() {
    welcomeScreen.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;
    xp = 0;

    showQuestion();
}

function showQuestion() {

    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    document.getElementById("question-count").innerText =
        `Question ${currentQuestionIndex + 1}/${questions.length}`;

    questionElement.innerText = currentQuestion.question;

    updateProgress();
    startTimer();

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {

    clearInterval(timer);

    nextBtn.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer() {

    clearInterval(timer);

    timeLeft = 30;

    timerElement.innerText = timeLeft + "s";

    timer = setInterval(() => {

        timeLeft--;

        timerElement.innerText = timeLeft + "s";

        if (timeLeft <= 0) {

            clearInterval(timer);

            Array.from(answerButtons.children).forEach(button => {
                button.disabled = true;

                if (button.dataset.correct === "true") {
                    button.style.backgroundColor = "#22c55e";
                    button.style.color = "white";
                }
            });

            nextBtn.style.display = "inline-block";
        }

    }, 1000);
}

function updateProgress() {

    const progress =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progressElement.style.width = progress + "%";
}

function selectAnswer(e) {

    clearInterval(timer);

    const selectedBtn = e.target;

    const correct =
        selectedBtn.dataset.correct === "true";

    if (correct) {

        score++;
        xp += 10;

        selectedBtn.style.backgroundColor = "#22c55e";
        selectedBtn.style.color = "white";

    } else {

        selectedBtn.style.backgroundColor = "#ef4444";
        selectedBtn.style.color = "white";
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {

            button.style.backgroundColor = "#22c55e";
            button.style.color = "white";
        }

        button.disabled = true;
    });

    nextBtn.style.display = "inline-block";
}

function nextQuestion() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
}

function showResult() {

    clearInterval(timer);

    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    let rank = "";

    if (percentage >= 90) {
        rank = "🏆 Quiz Master";
    }
    else if (percentage >= 70) {
        rank = "🚀 Advanced";
    }
    else if (percentage >= 50) {
        rank = "👍 Intermediate";
    }
    else {
        rank = "📚 Beginner";
    }

    scoreText.innerHTML = `
        <h2>🎉 Quiz Completed</h2>
        <br>
        <h3>Score: ${score}/${questions.length}</h3>
        <h3>Accuracy: ${percentage}%</h3>
        <h3>XP Earned: ${xp}</h3>
        <h3>${rank}</h3>
    `;
}