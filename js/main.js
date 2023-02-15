var jeu = document.querySelector(".jeu");
let joueur = false;
let nbrCaseRemplie = 0;

function newGame(){
    let circlesTable = [0,0,0,0,0,0,0,0,0];
    let crossesTable = [0,0,0,0,0,0,0,0,0];
    let cases = document.querySelectorAll(".case"); // Au reset : on prend toutes les cases et on les supprime
    cases.forEach((e) => {
        e.remove();
    })
    for (i=1; i<10; i++){                   // création des 9 cases
        let caseRemplie = false;            // la case n'est pas remplie de base
        let addCase = document.createElement("div");
        let position = i-1;                 // position dans les tableaux des cercles/croix
        addCase.className = "case c"+{i};   // classes c1, c2 etc pour grid area
        addCase.onclick = (e) => {
            if (caseRemplie == false){      // si la case n'est pas remplie, on créé un signe :
                let addSign = document.createElement("span");
                if (joueur == true){        // Si c'est joueur 1
                    addSign.className = "sign circle";  // on crée un cercle
                    circlesTable[position] = 1;         // on le place dans le tableau des cercles
                }else{                      // Sinon, c'est joueur 2
                    addSign.innerHTML = `&#9587`;
                    addSign.className = "sign cross";   // on crée une croix
                    crossesTable[position] = 1;         // on la place dans le tableau des cercles
                }
                addSign.style = "cursor:auto";  // on enlève le pointer
                caseRemplie = true;             // la case passe en remplie, on ne pourra rien ajouter
                addCase.appendChild(addSign);   // On ajoute le signe à la case
                joueur = !joueur;               // On change de joueur après chaque signe placé
                nbrCaseRemplie++;               // On compte le nombre de cases remplies pour arrêter le jeu (à faire)
                checkWin();
            }
            console.table(circlesTable);
            console.table(crossesTable);
        }
    jeu.appendChild(addCase);               // On ajoute la case au jeu
    }
}

function checkWin(){
    
}

newGame();