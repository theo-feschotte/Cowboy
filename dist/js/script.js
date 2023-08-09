const sectionHome = document.getElementById("home");
const goToRules = sectionHome.getElementsByTagName("a")[0];

const sectionRules = document.getElementById("rules");
const goToPlay = sectionRules.getElementsByTagName("a")[0];

const sectionPlay = document.getElementById("play");
var sectionPlayTitle = sectionPlay.getElementsByTagName("h2")[0];

const sectionResults = document.getElementById("results");
const goToReplay = sectionResults.getElementsByTagName("a")[0];
var sectionResultsText = document.getElementById("clickDelay");

let randomDelay;
let firstClick;
let secondClick;
let clickDelay;


function storeScore() {
    sectionResultsText.innerText = clickDelay + "s";
};
function storeFirstClick() {
    firstClick = new Date().getTime();
};
function storeSecondClick() {
    secondClick = new Date().getTime();
    clickDelay = ((secondClick - firstClick) - 1000 - randomDelay) / 1000;
    console.log(clickDelay + "s");
    sectionPlay.style.display = "none";
    sectionResults.style.display = "flex";
    storeScore();
};

function play() {
    sectionResults.style.display = "none";
    sectionPlay.style.display = "flex";

    storeFirstClick();
    randomDelay = (Math.floor(Math.random() * (5 - 1 + 1)) + 1) * 1000;

    setTimeout(function() {
        sectionPlayTitle.innerText = "T'es prêt ?";
        setTimeout(function() {
            sectionPlayTitle.innerText = "T'es sûr ?";
        }, 1000);
        setTimeout(function() {
            sectionPlayTitle.innerText = "*clic*";
            sectionPlay.addEventListener("click", function() {
                storeSecondClick();
            }, {once: true});
        }, randomDelay);
    }, 1000);
};

goToPlay.addEventListener("click", play);
goToReplay.addEventListener("click", play);