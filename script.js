let currentQuestion = 0;
let answer_button = true;
let rightQuestions = 0;
let audio = new Audio('audio/lord-of-the-rings.mp3');
audio.autoplay = true;
audio.loop = true;

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    audio.play();
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) { // Endscreen
        document.getElementById('endScreen').style = '';
        document.getElementById('questionBody').style = 'display: none';
        document.getElementById('amount-of-questions').innerHTML = questions.length;
        document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
        document.getElementById('quiz-image').src = 'img/win.png';
    } else { // Show Question
        let question = questions[currentQuestion];
        
        let percent = (currentQuestion + 1) / questions.length;
        percent = percent * 100;
        document.getElementById('progress_bar').innerHTML = `${percent}%`;
        document.getElementById('progress_bar').style = `width: ${percent}%`;

        document.getElementById('quiz-image').src = question['image'];
        document.getElementById('questiontext').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
        document.getElementById('question-number').innerHTML = currentQuestion + 1;
    }
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (answer_button == true) {
        if (selectedQuestionNumber == question['right_answer']) {
            document.getElementById(selection).parentNode.classList.add('bg-success');
            rightQuestions++;
            answer_button = false;

        } else {
            document.getElementById(selection).parentNode.classList.add('bg-danger');
            document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
            answer_button = false;
        }
    }
    document.getElementById('next-question').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-question').disabled = true;
    answer_button = true;
    resetAnswerButton();
    showQuestion();
}

function resetAnswerButton() {
    for (let i = 1; i <= 4; i++) {
        const answerButton = document.getElementById(`answer_${i}`);
        answerButton.parentNode.classList.remove('bg-danger');
        answerButton.parentNode.classList.remove('bg-success');
    }
}

function restartGame() {
    document.getElementById('quiz-image').src = 'img/J.R.R. Tolkien.png';
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}