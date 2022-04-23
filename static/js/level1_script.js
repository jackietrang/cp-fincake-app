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
        question: "The following describes what? 'Personal debt taken on to purchase goods and services.'",

        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fcc.jpeg?v=1635606902328",

        choiceA: "Consumer credit",

        choiceB: "Consumer debt",

        choiceC: "Consumer lending",

        choiceD: "Debit card",

        correct: "A"
    },
    {
        question: "________allows you to purchase something right now that you are unable to pay for upfront. You have to borrow money from a lender and pay it back",

        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Floan.jpeg?v=1635606972700",

        choiceA: "Credit",

        choiceB: "Interest",

        choiceC: "Principal",

        choiceD: "Capital",

        correct: "A"
    },
    {
        question: "What is non-install credit?",

        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Floan.jpeg?v=1635606972700",

        choiceA: "Short-term credit that you pay back through multiple installments.",

        choiceB: "Credit offered for short-term use that you pay back all at once.",

        choiceC: "Long-term credit that you pay back through multiple installments.",

        // choiceD: "Katherine Johnson",

        correct: "B"
    },
    {
        question: "What is a creditor",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2FMy-Business-is-owed-a-Debt-What-Are-My-Rights-as-a-Creditor.jpeg?v=1635607049689",

        choiceA: "An entity to which money is owned",
        choiceB: "A person who owe money",
        choiceC: "An entity that borrows money for people",
        choiceD: "A person who decides who are eligible for credit cards",

        correct: "A"
    },
    {
        question: "What is a line of credit?",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Floc.jpeg?v=1635607105075",

        choiceA: "Different brands of credit cards",
        choiceB: "the maximum amount of money that the creditor makes available",
        choiceC: "Different types of consumer loans",
        choiceD: "the maximum amount of money you can withdraw at a time from a debit card",

        correct: "B"
    },
    {
        question: "What is a grace period?",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fgrace.jpeg?v=1635607184925",

        choiceA: "A period of paying minimum payment",
        choiceB: "The time a person has to wait before applying for a new credit card",
        choiceC: "A time period during which no finance charges will be added to your account",
        choiceD: "This is not a financial term",

        correct: "C"
    },
    {
        question: "What is APR?",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fapr.jpeg?v=1635607233715",

        choiceA: "Annual report of how much credit you have used ",
        choiceB: "Annual percentage of refinancing on loans or credit card",
        choiceC: "How much cash back you get from each credit card purchase",
        choiceD: "It shows how much credit costs you on a yearly basis, expressed as a percentage",

        correct: "D"
    },
    {
        question: "Which statement is false about credit card principal?",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fprincipal.png?v=1635607277315",

        choiceA: "Principle is the person who is in charge of approving/disapproving credit card issues.",
        choiceB: "Principal is the portion of your credit card balance that comes from making regular purchases",
        choiceC: "Principal is different from interest",
        choiceD: "An interest rate is the percentage of principal charged by the lender for the use of its money.",

        correct: "A"
    },
    {
        question: "What is a credit rating?",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2F%20s.jpeg?v=1635606972735",

        choiceA: "A person's likeliness to have more than 1 credit cards",
        choiceB: "A rating of how much benefit a credit cards has compared to its counterparts from different companies",
        choiceC: "A rating of how much benefit a credit cards has compared to its counterparts from the same company",
        choiceD: "A person's ability to make credit payments on time",

        correct: "D"
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
    console.log("Start quiz")
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

    // choose the image based on the scorePerCent
    let text =
        scorePerCent <= 80 ?
        "There is some room for improvement. You should read <a href = 'consumer_credit_flashcards'>Consumer Credit flashcards</a> to gain a stronger foundation" :
        "You did it! Feel free to go to Credit Factors quiz";
    scoreDiv.innerHTML += "<div class='level-rec'>" + text + "</div>";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";

    var server_data = [
        { "score": score },
        { "scorePercent": scorePerCent },
        { "questionNum": questions.length }
    ];

    $.ajax({
        type: "POST",
        url: "/process_score1",
        data: JSON.stringify(server_data),
        contentType: "application/json",
        dataType: 'json',
        success: function(result) {
            numRows.innerHTML = result.rows;
        }
    });
}