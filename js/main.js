var jeu = document.querySelector(".jeu");
let joueur = false;
let circlesTable = [0,0,0,0,0,0,0,0,0];
let crossesTable = [0,0,0,0,0,0,0,0,0];

function newGame(){
    let nbrCaseRemplie = 0;
    circlesTable = [0,0,0,0,0,0,0,0,0];
    crossesTable = [0,0,0,0,0,0,0,0,0];
    let cases = document.querySelectorAll(".case"); // Au reset : on prend toutes les cases et on les supprime
    cases.forEach((e) => {
        e.remove();
    })
    for (i=1; i<10; i++){                   // création des 9 cases
        let caseRemplie = false;            // la case n'est pas remplie de base
        let addCase = document.createElement("div");
        let position = i-1;                 // position dans les tableaux des cercles/croix
        addCase.className = "case";   // classes c1, c2 etc pour grid area
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
                checkWin(nbrCaseRemplie);       // On regarde si le jeu est fini (win ou plus de case)
            }
            console.log(nbrCaseRemplie);
            // console.table(circlesTable);
            // console.table(crossesTable);
        }
    jeu.appendChild(addCase);               // On ajoute la case au jeu
    }
}

function checkWin(x){
    if (x == 9){                    // si les 9 cases ont été remplies (il faudra inverser en cas de win au 9ème coup)
        let cases = document.querySelectorAll(".case");
        cases.forEach((e) => {          // On colore chaque case en darkred
            e.style = "background-color : darkred"
        });
    }else{
        for (i=0;i<7;i=i+3){            // On test les lignes : 0/1/2 | 3/4/5 | 6/7/8
            // test pour les ronds
            if( circlesTable[i] && circlesTable[i+1] && circlesTable[i+2] ){
                let cases = document.querySelectorAll(".case")
                let t = [i,i+1,i+2];    // on récupère les 3 indices de cases en question
                t.forEach((e) => {      // pour les 3 cases de win, on les colore en darkred
                    cases[e].style = "background-color : darkred";
                })
                console.log("Les ronds win !")
            // test pour les croix
            }else if( crossesTable[i] && crossesTable[i+1] && crossesTable[i+2] ){
                let cases = document.querySelectorAll(".case")
                let t = [i,i+1,i+2];    // on récupère les 3 indices de cases en question
                t.forEach((e) => {      // pour les 3 cases de win, on les colore en darkred
                    cases[e].style = "background-color : darkred";
                })
                console.log("Les croix win !");
            }
        }
    }
}

newGame();