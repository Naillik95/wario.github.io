/*var img = document.createElement("img");


img.src = "image/profiltesst.png";

var block = document.getElementById("x");
console.log("block", block)
block.appendChild(img);

var img = document.createElement("img");


img.src = "image/profiltesst.png";

var block = document.getElementById("x");
console.log("block", block)
block.appendChild(img);

var img = document.createElement("img");


img.src = "image/profiltesst.png";

var block = document.getElementById("x");
console.log("block", block)
block.appendChild(img);

var img = document.createElement("img");


img.src = "image/profiltesst.png";

var block = document.getElementById("x");
console.log("block", block)
block.appendChild(img);*/

let warioLogo = document.querySelector(".wariologo");
let welcomeSong = new Audio("songs/welcome.mp3");
let bgSong = new Audio("songs/warioware.mp3");
let clickCounter = 0;

warioLogo.addEventListener("click", () => {
    clickCounter++;
    if (clickCounter % 2 == 0) {
        setTimeout(() => {
            welcomeSong.pause();
            bgSong.pause();
        }, 100);
    } else {
        welcomeSong.play();
        bgSong.play();
    }
})



function Aleatoire(document) {

    textes = [
        "Je suis content",
        "Je suis intelligent",
        "Je suis maléfique",
        "Je suis interréssant",
        "Je suis ponctuel",
        "Je suis assidue",
        "Je suis curieux",
        "Je suis moi",
        "Je suis en retard",
        "Je suis satisfait",
        "Je suis térifiant",
        "Je suis fort",
        "Je suis nul",
        "Je suis le meilleur"
    ];

    // nombre total de citations
    let nombre_textes = textes.length;

    // on demande un nombre aleatoire a l'ordinateur

    let aleatoire = textes[Math.floor(Math.random() * nombre_textes)];


    return document.innerHTML = aleatoire;

}

/*let Alea1 = document.getElementById("Alea1");
let Alea2 = document.getElementById("Alea2");
let Alea3 = document.getElementById("Alea3");
let Alea4 = document.getElementById("Alea4");

let BlocAlea1 = document.getElementById("BlocAlea1");
let BlocAlea2 = document.getElementById("BlocAlea2");
let BlocAlea3 = document.getElementById("BlocAlea3");
let BlocAlea4 = document.getElementById("BlocAlea4");

Aleatoire(Alea1);
Aleatoire(Alea2);
Aleatoire(Alea3);
Aleatoire(Alea4);

BlocAlea1.addEventListener("click", function() {
    Aleatoire(Alea1);
});
BlocAlea2.addEventListener("click", function() {
    Aleatoire(Alea2);
});
BlocAlea3.addEventListener("click", function() {
    Aleatoire(Alea3);
});
BlocAlea4.addEventListener("click", function() {
    Aleatoire(Alea4);
});*/

for (i = 1; i < 5; i++) {
    let alea = document.getElementById("Alea" + i);
    Aleatoire(alea);
    alea.addEventListener("click", () => {
        Aleatoire(alea);
    })
}