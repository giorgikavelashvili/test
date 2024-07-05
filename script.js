const questions = [
    {
        question: "Who is the author of 'Leadership: Theory and Practice'?",
        options: ["a) Peter G. Northouse", "b) John Maxwell", "c) Stephen Covey", "d) Ken Blanchard"],
        answer: "a"
    },
    {
        question: "What is Transformational Leadership Theory?",
        options: [
            "a) A leadership style focused on supervision and organizational goals",
            "b) A style that changes and transforms followers",
            "c) A transactional process",
            "d) A focus on intrinsic motivation and follower development"
        ],
        answer: "b"
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let correct = 0;
let incorrect = 0;
let unmarked = 0;
let timer;
const timePerQuestion = 30; // seconds

const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');

function showQuestion(questionIndex) {
    const questionData = questions[questionIndex];
    questionContainer.innerHTML = `<h2>${questionData.question}</h2>`;
    optionsContainer.innerHTML = '';
    questionData.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option-button');
        optionButton.onclick = () => selectAnswer(option[0]);
        optionsContainer.appendChild(optionButton);
    });

    startTimer();
}

function selectAnswer(selectedOption) {
    clearTimeout(timer);
    const questionData = questions[currentQuestionIndex];
    if (selectedOption === questionData.answer) {
        correct++;
    } else if (['a', 'b', 'c', 'd'].includes(selectedOption)) {
        incorrect++;
    } else {
        unmarked++;
    }
    nextQuestion();
}

function startTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        unmarked++;
        nextQuestion();
    }, timePerQuestion * 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('exam-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    document.getElementById('correct-answers').textContent = `Correct answers: ${correct}`;
    document.getElementById('incorrect-answers').textContent = `Incorrect answers: ${incorrect}`;
    document.getElementById('unmarked-questions').textContent = `Unmarked questions: ${unmarked}`;
}

// Start the exam
showQuestion(currentQuestionIndex);