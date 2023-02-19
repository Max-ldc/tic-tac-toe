var jeu = document.querySelector(".jeu");
let circlesTable = [];
let crossesTable = [];
var modal = document.querySelector(".modal");

function newGameMulti(){
    let joueur = false;
    majPlayer(joueur);
    modal.style = "display : none"; // on enlève la modal en début de partie
    let nbrCaseRemplie = 0;         // on passe le compteur de cases remplies à 0
    circlesTable = [0,0,0,0,0,0,0,0,0]; // aucun cercle donc toutes les pos à 0
    crossesTable = [0,0,0,0,0,0,0,0,0]; // pareil pour les croix
    
    let cases = document.querySelectorAll(".case"); // Au reset : on prend toutes les cases et on les supprime
    cases.forEach((e) => {
        e.remove();
    })
    
    for (i=0; i<9; i++){               // création des 9 cases
        let caseRemplie = false;            // la case n'est pas remplie de base
        let addCase = document.createElement("div");
        let position = i;                 // position dans les tableaux des cercles/croix
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
                majPlayer(joueur);
                nbrCaseRemplie++;               // On compte le nombre de cases remplies pour arrêter le jeu (à faire)
                if (nbrCaseRemplie < 9){    // Doit-on continuer le jeu en cas de non-victoire ?
                    checkWin(true);             // si moins de 9 cases remplies, oui
                }else{
                    checkWin(false);            // Si 9 cases remplies, non
                }
            }
        }
    jeu.appendChild(addCase);               // On ajoute la case au jeu
    }
}

function checkWin(x){           // Test de toutes les combinaisons de win possibles ou si les 9 cases sont remplies.
    for (i=0;i<7;i=i+3){            // On test les lignes : 0/1/2 | 3/4/5 | 6/7/8
        // test pour les ronds
        if( circlesTable[i] && circlesTable[i+1] && circlesTable[i+2] ){
            colorThreeCases(i,i+1,i+2);
            changeModal("circle");
            x = true;
            // test pour les croix
        }else if( crossesTable[i] && crossesTable[i+1] && crossesTable[i+2] ){
            colorThreeCases(i,i+1,i+2);
            changeModal("cross");
            x = true;
        }
    }
    for (i=0;i<4;i++){              // on test les colonnes 1/4/7 | 2/5/8 | 3/6/9
        // test pour les ronds
        if ( circlesTable[i] && circlesTable[i+3] && circlesTable[i+6] ){
            colorThreeCases(i,i+3,i+6);
            changeModal("circle");
            x = true;
            // test pour les croix
        }else if ( crossesTable[i] && crossesTable[i+3] && crossesTable[i+6] ){
            colorThreeCases(i,i+3,i+6);
            changeModal("cross");
            x = true;
        }
    }
    // test conditons diagonales pour les cercles
    if( circlesTable[0] && circlesTable[4] && circlesTable[8] ){
        colorThreeCases(0,4,8);
        changeModal("circle");
        x = true;
        // 2e diago pour les cercles
    }else if( circlesTable[2] && circlesTable[4] && circlesTable[6] ){
        colorThreeCases(2,4,6);
        changeModal("circle");
        x = true;
        // test conditions diagonales pour les croix
    }else if( crossesTable[0] && crossesTable[4] && crossesTable[8] ){
        colorThreeCases(0,4,8);
        changeModal("cross");
        x = true;
        // 2e diago pour les croix
    }else if( crossesTable[2] && crossesTable[4] && crossesTable[6] ){
        colorThreeCases(2,4,6);
        changeModal("cross");
        x = true;
    }
    if (!x){    // x est resté à false tout le long = on doit stopper le jeu car toutes les cases sont remplies + il n'y a eu aucune victoire
        changeModal("tie");
    }
}

function colorThreeCases(a,b,c){        // Colore les 3 cases gagnantes
    let cases = document.querySelectorAll(".case")
        let t = [a,b,c];    // on récupère les 3 indices de cases en question
        t.forEach((e) => {      // pour les 3 cases de win, on les colore en lightgreen
            cases[e].style = "background-color : lightgreen";
        })
}

function majPlayer(x){                  // Mise à jour du joueur qui doit jouer
    let infoJoueur = document.querySelector(".infoPlayer");
    if (x == "end"){                // si c'est un maj de fin
        infoJoueur.innerHTML = `Appuyez en bas pour rejouer`
    }else if (x){                   // si c'est aux ronds de jouer
        infoJoueur.innerHTML = `Au tour de J2 (ronds)`;
    }else if (!x){                  // si c'est aux croix de jouer
        infoJoueur.innerHTML = `Au tour de J1 (croix)`;
    }
}

function changeModal(c){
    if (c == "circle"){
        modal.style = "display : flex";
        modal.innerHTML = `Bravo, les ronds gagnent !`
        majPlayer("end");
    }else if (c == "cross"){
        modal.style = "display : flex";
        modal.innerHTML = `Bravo, les croix gagnent !`
        majPlayer("end");
    }else if (c == "tie"){
        let cases = document.querySelectorAll(".case");
        cases.forEach((e) => {          // On colore chaque case en darkred
        e.style = "background-color : darkred";
        });
        modal.style = "display : flex";
        modal.innerHTML = `C'est une égalité !`;
        majPlayer("end");
    }
}

newGameMulti();

// WIN CONDITIONS =
// Ligne 1 : 0,1,2 : [1,1,1,x,x,x,x,x,x]
// Ligne 2 : 3,4,5 : [x,x,x,1,1,1,x,x,x]
// Ligne 3 : 6,7,8 : [x,x,x,x,x,x,1,1,1]
// Colonne 1 : 0,3,6 : [1,x,x,1,x,x,1,x,x]
// Colonne 2 : 1,4,7 : [x,1,x,x,1,x,x,1,x]
// Colonne 3 : 2,5,8 : [x,x,1,x,x,1,x,x,1]
// Diagonale 1 : 0,4,8 : [1,x,x,x,1,x,x,x,1]
// Diagonale 2 : 2,4,6 : [x,x,1,x,1,x,1,x,x]

// WITH
// [0 , 1 , 2]
// [3 , 4 , 5]
// [6 , 7 , 8]