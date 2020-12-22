//LET THE MUSIC PLAY
let warioLogo = document.querySelector(".wariologo");
let welcomeSong = new Audio("songs/welcome.mp3");
let bgSong = new Audio("songs/warioware.mp3");
let clickCounter = 0;


warioLogo.addEventListener("click", () => {
    clickCounter++;
    if (clickCounter % 2 == 0){
      setTimeout(() => {
        welcomeSong.pause();
        bgSong.pause();
      }, 100);
    } else {
        welcomeSong.play();
        bgSong.play();
    }
})

//PRECO MODAL
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let letsGoButton = document.querySelector(".modal-button");

let panierCompteur = 0;

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//GET PRECO INPUTS

let nameList = [];
let ageList = [];
let mailList = [];

function getInputValue(){

  let inputName = document.getElementById("myName").value;
  let inputAge = document.getElementById("myAge").value;
  let inputMail = document.getElementById("myMail").value;
  let inputs = document.querySelectorAll("input");
  let compteur = document.querySelector(".compteur");
  let submitOk = true;

  function validateEmail(elementValue){      
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  } 

  if (isNaN(inputName.length) || inputName.length < 1 || inputName.length >= 20) {
    submitOk = false;
    alert("The name may have no more than 20 characters");

  } else if (isNaN(inputAge) || inputAge < 1 || inputAge > 100) {
    submitOk = false;
    alert("The age must be a number between 1 and 100");

  } else if (validateEmail(inputMail) == false) {
    submitOk = false;
    alert("Not a valid e-mail!");

  } else if (submitOk) {

    modal.style.display = "none";

    panierCompteur++;
    compteur.innerHTML = " " + panierCompteur;

    nameList.push(inputName);
    ageList.push(inputAge);
    mailList.push(inputMail);

    inputs.forEach(input => input.value = '');
   
    addElement();

  }

}

//PANIER MODAL
let panierBtn = document.querySelector(".panier");
var panierModal = document.getElementById("myPanierModal");
var panierSpan = document.getElementsByClassName("panier-close")[0];
let panierModalBody = document.querySelector('.panier-modal-body');

panierBtn.onclick = function() {
  panierModal.style.display = "block";
}

panierSpan.onclick = function() {
  panierModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == panierModal) {
    panierModal.style.display = "none";
  }
}


function addElement () {
  let newDiv = document.createElement("div");
  newDiv.className = 'preco-user';
  newDiv.setAttribute("onclick","removeDiv()");
  let newContent = document.createTextNode(nameList[panierCompteur - 1] +
     ", " + ageList[panierCompteur - 1] + ", " +
      mailList[panierCompteur - 1]);
  newDiv.appendChild(newContent);
  panierModalBody.appendChild(newDiv);
}

// let precoUser = document.querySelector('.preco-user');
// function removeDiv() {
//   panierModal.nextElementSibling.style.visibility = 'hidden';
// }
