const sectionHome = document.getElementById("home");
const sectionRules = document.getElementById("rules");
const sectionPlay = document.getElementById("play");
const sectionResults = document.getElementById("results");

const goRules = sectionHome.getElementsByTagName("a")[0];
const goPlay = sectionRules.getElementsByTagName("a")[0];
const goReplay = sectionResults.getElementsByTagName("a")[0];

const cowboySVG = document.getElementById("cowboySVG");
const cowboySVGbody = cowboySVG.getElementsByClassName("body")[0];
const cowboySVGarms = cowboySVG.getElementsByClassName("arms")[0];
const cowboyTooltip = sectionHome.getElementsByClassName("tooltip")[0];

var tooltipText = sectionHome.getElementsByClassName("tooltip")[0];
var sectionPlayTitle = sectionPlay.getElementsByTagName("h2")[0];
var sectionResultsTitle = sectionResults.getElementsByTagName("h2")[0];
var sectionResultsText = document.getElementById("clickDelay");

let randomDelay;
let firstClick;
let secondClick;
let clickDelay;

let punchLinesTooltip = {
    1: "T'es pas cap.",
    2: "Vas-y, clique !",
    3: "Ose pour voir ?",
    4: "T'es pas prêt.",
    5: "Petit joueur...",
};

let punchLinesGood = { // clickDelay < 0.5
    1: "T'es pas mauvais.",
    2: "C'est pas mal.",
    3: "C'est ok.",
    4: "La chance du débutant !",
};
let punchLinesAverage = { // 0.5 < clickDelay && clickDelay < 1
    1: "Tu peux mieux faire.",
    1: "Tu t'es pas foulé...",
    1: "Pense à cliquer la prochaine fois !",
    2: "La chance du débutant !",
    4: "Cowboy en carton !",
};
let punchLinesBad = { // 1 < clickDelay
    1: "T'es trop nul.",
    2: "T'es trop lent !",
    3: "Vraiment, c'est si compliqué ?",
    4: "T'as pas fait d'effort ?",
    5: "Une mamie ferait mieux que toi !",
    6: "Si t'y mets pas du tiens...",
    7: "Arrête là, tu me fais de la peine...",
    8: "Oui, c'est sûrement ta souris qui bug...",
    9: "Ouvre tes yeux, tu verras mieux.",
    10: "Heureusement, personne n'a rien vu...",
    11: "Cowboy en carton !",
    12: "T'étais à ton max ?",
    13: "T'as compris le but du jeu ?",
    13: "Ça va, t'as pris ton temps ?",
};

goRules.addEventListener("mouseover", function() {
    cowboySVGarms.classList.add("arms-ready");
    cowboyTooltip.classList.add("tooltip--visible");
    let i = Math.floor(Math.random() * (Object.keys(punchLinesTooltip).length - 1 + 1)) + 1;
    tooltipText.innerText = punchLinesTooltip[i];
});
goRules.addEventListener("mouseout", function() {
    cowboySVGarms.classList.remove("arms-ready");
    cowboyTooltip.classList.remove("tooltip--visible");
});

function goToURL(sectionID) {
    window.location.href = window.location.origin + "/#" + sectionID.id;
};

function punchLinesGen(punchLinesArray) {
    let min = 1;
    let max = Object.keys(punchLinesArray).length;
    let i = Math.floor(Math.random() * (max - min + 1)) + min;
    sectionResultsTitle.innerText = punchLinesArray[i];
};

function storeFirstClick() {
    firstClick = new Date().getTime();
};
function storeSecondClick() {
    secondClick = new Date().getTime();
    goToURL(sectionResults);
    clickDelay = ((secondClick - firstClick) - 1000 - randomDelay) / 1000;
    sectionResultsText.innerText = clickDelay + "s";
    if (clickDelay < 0.5) {
        punchLinesGen(punchLinesGood);
        return;
    };
    if (0.5 < clickDelay && clickDelay < 1) {
        punchLinesGen(punchLinesAverage);
        return;
    };
    if (1 < clickDelay) {
        punchLinesGen(punchLinesBad);
        return;
    };
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