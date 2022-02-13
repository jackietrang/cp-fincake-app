const start = document.getElementById("start");

const quiz = document.getElementById("quiz");

const question = document.getElementById("question");

const qImg = document.getElementById("qImg");

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

const choiceD = document.getElementById("D");

const counter = document.getElementById("counter");

const timeGauge = document.getElementById("timeGauge");

const progress = document.getElementById("progress");

const scoreDiv = document.getElementById("scoreContainer");

var answer = document.getElementById("...")

var questions = [{
        question: "A profit is a positive return or money made on an investment or venture",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fprofit-20171124013205135.jpeg?v=1635606670505",
        choiceA: "True",
        choiceB: "False",
        choiceC: "Don't know",
        choiceD: "Prefer not to say",
        correct: "A"
    },
    {
        question: "Suppose you had $100 in a savings account and the interest rate was 2% per year. After 5 years, how much do you think you would have in the account if you left the money to grow?",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2FInvestment-policy_800x450_0.jpeg?v=1638925399070",
        choiceA: "More than $102",
        choiceB: "Exactly $102;",
        choiceC: "Less than $102",
        choiceD: "Do not know",
        correct: "A"
    },
    {
        question: "Imagine that the interest rate on your savings account was 1% per year and inflation was 2% per year. After 1 year, with the money in this account, would you be able to buy...",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fistockphoto-1270426994-612x612.jpeg?v=1638925472455",
        choiceA: "More than today",
        choiceB: "Exactly the same as today",
        choiceC: "Less than today",
        choiceD: "Do not know",
        correct: "C"
    },
    {
        question: "If interest rates rise, what will typically happen to bond prices?",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fraiseinterest-800x600px.jpeg?v=1638925517111",
        choiceA: "Rise",
        choiceB: "Fall",
        choiceC: "No relationship",
        choiceD: "Do not know",
        correct: "C"
    },
    {
        question: "A broker advises you to invest in ABC Corp, which they own. Are they acting as your fiduciary?",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2FBroker.jpeg?v=1635606221441",
        choiceA: "They may not because they personally benefit from you investing in that company",
        choiceB: "They are because they are a broker",
        choiceC: "They are because you investing in a company does not impact their interest",
        choiceD: "Do not know",
        correct: "C"
    },
    {
        question: "Which of the following is an example of an equity calculation?",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fequity.jpeg?v=1635606799552",
        choiceA: "$200,000 main residence + $100,000 main residence loan",
        choiceB: "$200,000 main residence - $100,000 saving",
        choiceC: "$200,000 main residence - $100,000 main residence loan",
        choiceC: "$200,000 main residence",
        correct: "C"
    },
    {
        question: "A 15-year mortgage typically requires higher monthly payments than a 30-year mortgage, but the total interest paid over the life of the loan will be less.",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Funderstand-interest-rate.jpeg?v=1638925583843",
        choiceA: "True",
        choiceB: "False",
        choiceC: "Don't know",
        choiceD: "Prefer not to say",
        correct: "A"
    },
    {
        question: "Buying a single company’s stock usually provides a safer return than a stock mutual fund.",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2FStock-vs-mutual-fund.jpeg?v=1638925628869",
        choiceA: "True",
        choiceB: "False",
        choiceC: "Don't know",
        choiceD: "Prefer not to say",
        correct: "B"
    },

];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
const questionTime = 20; // 30s
let count = questionTime;
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";

    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;

}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    var test
    test++
    console.log(test)
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    //   renderCounter();
    //   TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}


// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        //     html HYPERLINK href="index1.html"
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    // count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round((100 * score) / questions.length);

    // choose level based on price person
    let text =
        scorePerCent <= 60 ?
        "There is some room for improvement. You should start from <a href = 'consumer_credit_flashcards'>Consumer Credit Flashcards</a> to gain a stronger foundation" :
        "You seem to have a good financial literacy foundation! You can start the <a href = 'consumer_credit_quiz') }}'> Consumer Credit Quiz</a>.";
    scoreDiv.innerHTML += "<div class='level-rec'>" + text + "</div>";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>;"
}