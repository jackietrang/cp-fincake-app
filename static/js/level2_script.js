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
        question: "In order to avoid a penalty tax, distributions from an IRA must begin for the year in which you attain age...",

        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fcc.jpeg?v=1635606902328",

        choiceA: "55",

        choiceB: "59 1/2",

        choiceC: "65",

        choiceD: "70 1/2",

        correct: "D"
    },
    {
        question: "An individual who is age 75 can still make a Roth IRA contribution if he or she has earnings from work and does not exceed the earnings limit.",

        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Floan.jpeg?v=1635606972700",

        choiceA: "True",

        choiceB: "False",

        choiceC: "Don't know",

        choiceD: "",

        correct: "A"
    },
    {
        question: "If a large public company sponsoring a 401(k) plan files for bankruptcy, employees are...",

        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Floan.jpeg?v=1635606972700",

        choiceA: "At risk of losing their 401(k) benefits because trust assets will pay creditors first",

        choiceB: "At no risk of losing their 401(k) benefits because the plan is outside the claims of creditors",

        choiceC: "Only at risk of losing their 401(k) benefits if the plan document says the creditors have the right to trust assets",

        choiceD: "Only at risk of losing their 401(k) benefits if a judge decides that the creditors should be paid first",

        correct: "B"
    },
    {
        question: "Most experts agree that the best way to protect against inflation is to have a...",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2FMy-Business-is-owed-a-Debt-What-Are-My-Rights-as-a-Creditor.jpeg?v=1635607049689",

        choiceA: "Diversified portfolio of stocks",
        choiceB: "Diversified portfolio of bonds",
        choiceC: "Diversified portfolio of CDs (certificates of deposit)",
        choiceD: "Don't know",

        correct: "A"
    },
    {
        question: "If you had a well diversified portfolio of 50% stocks and 50% bonds that was worth $100,000 at retirement, based on historical returns in the United States the most you can afford to withdraw is ____ plus inflation each year to have 95% chance that your assets will last for 30 years.",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Floc.jpeg?v=1635607105075",

        choiceA: "$2,000",
        choiceB: "$4,000",
        choiceC: "$6,000",
        choiceD: "$8,000",

        correct: "B"
    },
    {
        question: "Which one of the following statements concerning the federal income tax treatment of distributions to a 65-year-old retiree is true?",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fgrace.jpeg?v=1635607184925",

        choiceA: "Distributions from a traditional IRA are generally taxed as long-term capital gains",
        choiceB: "Distributions from a traditional IRA for the 65-year-old are generally subject to an additional 10% penalty tax",
        choiceC: "Distributions from a Roth IRA are generally tax-free",
        choiceD: "Don't know",

        correct: "C"
    },
    {
        question: "True or false: Buying a single company’s stock usually provides a safer return than a stock mutual fund.",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fapr.jpeg?v=1635607233715",

        choiceA: "True",
        choiceB: "False",
        choiceC: "Don't know",
        choiceD: "",

        correct: "B"
    },
    {
        question: "True or false: Exchange-traded funds generally have higher expenses than actively managed mutual funds.",
        imgSrc: "https://cdn.glitch.me/d28052bc-296a-4014-84f9-de6bfc690091%2Fprincipal.png?v=1635607277315",

        choiceA: "True",
        choiceB: "False",
        choiceC: "Don't know",
        choiceD: "",

        correct: "B"
    }
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

    // choose the image based on the scorePerCent
    let text =
        scorePerCent <= 80 ?
        "There is some room for improvement. You should read <a href = 'retirement_planning_flashcards'>Retirement Planning flashcards</a> to gain a stronger foundation" :
        "You did it! You're financially literate when it comes to retirement planning";
    scoreDiv.innerHTML += "<div class='level-rec'>" + text + "</div>";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";

    var server_data = [
        { "score": score },
        { "scorePercent": scorePerCent },
        { "questionNum": questions.length }
    ];

    $.ajax({
        type: "POST",
        url: "/process_score2",
        data: JSON.stringify(server_data),
        contentType: "application/json",
        dataType: 'json',
        success: function(result) {
            numRows.innerHTML = result.rows;
        }
    });
}