var jeu = document.querySelector(".jeu");
let joueur = false;

function newGame(){
    let cases = document.querySelectorAll(".case");
    cases.forEach((e) => {
        e.remove();
    })
    for (i=1; i<10; i++){       // création des 9 cases
    let caseRemplie = false;
        let addCase = document.createElement("div");
        addCase.className = "case c"+{i};
        addCase.onclick = (e) => {
            if (caseRemplie == false){
                let addSign = document.createElement("span");
                if (joueur == true){
                    addSign.className = "circle";
                }else{
                    addSign.innerHTML = `&#9587`;
                    addSign.className = "cross";
                }
                addSign.style = "cursor:auto";
                caseRemplie = true;
                addCase.appendChild(addSign);
                joueur = !joueur;
            }
        }
        jeu.appendChild(addCase);
    }
}

newGame();