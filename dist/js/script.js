const sectionHome = document.getElementById("home");
const sectionRules = document.getElementById("rules");
const sectionPlay = document.getElementById("play");
const sectionResults = document.getElementById("results");

const goPlay = sectionRules.getElementsByTagName("a")[0];
const goReplay = sectionResults.getElementsByTagName("a")[0];

var sectionPlayTitle = sectionPlay.getElementsByTagName("h2")[0];
var sectionResultsText = document.getElementById("clickDelay");

let randomDelay;
let firstClick;
let secondClick;
let clickDelay;

function goToURL(sectionID) {
    window.location.href = window.location.origin + "/#" + sectionID.id;
}

function storeFirstClick() {
    firstClick = new Date().getTime();
};
function storeSecondClick() {
    secondClick = new Date().getTime();
    goToURL(sectionResults);
    clickDelay = ((secondClick - firstClick) - 1000 - randomDelay) / 1000;
    sectionResultsText.innerText = clickDelay + "s";
};

function play() {
    goToURL(sectionPlay);
    randomDelay = (Math.floor(Math.random() * (5 - 1 + 1)) + 1) * 1000;
    storeFirstClick();
    sectionPlayTitle.innerText = "T'es prêt ?";
    setTimeout(function() {
        sectionPlayTitle.innerText = "T'es sûr ?";
        setTimeout(function() {
            sectionPlayTitle.innerText = "*clic*";
            sectionPlay.addEventListener("click", function() {
                storeSecondClick();
            }, {once: true});
        }, randomDelay);
    }, 1000);
};

goPlay.addEventListener("click", play);
goReplay.addEventListener("click", play);