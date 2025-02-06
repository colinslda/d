document.addEventListener('DOMContentLoaded', () => {
    const ajouterPieceBtn = document.getElementById('ajouterPieceBtn');
    const formulairePiece = document.getElementById('formulairePiece');
    const pieceForm = document.getElementById('pieceForm');
    const annulerBtn = document.getElementById('annulerBtn');
    const repertoireCategoriesDiv = document.getElementById('repertoire-categories');

    let repertoire = chargerRepertoire();
    afficherRepertoire();

    ajouterPieceBtn.addEventListener('click', () => {
        formulairePiece.style.display = 'block';
        ajouterPieceBtn.style.display = 'none'; // Cacher le bouton "Ajouter une pièce"
    });

    annulerBtn.addEventListener('click', () => {
        formulairePiece.style.display = 'none';
        ajouterPieceBtn.style.display = 'block'; // Réafficher le bouton "Ajouter une pièce"
        pieceForm.reset(); // Réinitialiser le formulaire
    });


    pieceForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const compositeur = document.getElementById('compositeur').value;
        const titre = document.getElementById('titre').value;
        const categorie = document.getElementById('categorie').value;
        const notePersonnelle = document.getElementById('notePersonnelle').value;

        const nouvellePiece = {
            id: Date.now(), // ID unique basé sur le timestamp
            compositeur: compositeur,
            titre: titre,
            categorie: categorie,
            notePersonnelle: notePersonnelle
        };

        repertoire.push(nouvellePiece);
        sauvegarderRepertoire();
        afficherRepertoire();

        formulairePiece.style.display = 'none';
        ajouterPieceBtn.style.display = 'block'; // Réafficher le bouton "Ajouter une pièce"
        pieceForm.reset(); // Réinitialiser le formulaire
    });

    function sauvegarderRepertoire() {
        localStorage.setItem('repertoireMusical', JSON.stringify(repertoire));
    }

    function chargerRepertoire() {
        const repertoireStocke = localStorage.getItem('repertoireMusical');
        return repertoireStocke ? JSON.parse(repertoireStocke) : [];
    }

    function afficherRepertoire() {
        repertoireCategoriesDiv.innerHTML = ''; // Vider l'affichage précédent
        const categories = ["Concerto", "Sonate", "Pièce solo", "Caprices/Etudes", "Technique"];

        categories.forEach(categorieNom => {
            const piecesCategorie = repertoire.filter(piece => piece.categorie === categorieNom);
            if (piecesCategorie.length > 0) {
                const categorieSection = document.createElement('div');
                categorieSection.classList.add('categorie-section');

                const categorieTitre = document.createElement('h3');
                categorieTitre.textContent = categorieNom;
                categorieSection.appendChild(categorieTitre);

                piecesCategorie.forEach(piece => {
                    const pieceDiv = document.createElement('div');
                    pieceDiv.classList.add('piece-item');
                    pieceDiv.dataset.pieceId = piece.id; // Stocker l'ID de la pièce

                    const pieceInfoDiv = document.createElement('div');
                    pieceInfoDiv.classList.add('piece-info');
                    pieceInfoDiv.innerHTML = `
                        <p><strong>${piece.titre}</strong></p>
                        <p>Compositeur: ${piece.compositeur}</p>
                        ${piece.notePersonnelle ? `<p class="note">Note: ${piece.notePersonnelle}</p>` : ''}
                    `;
                    pieceDiv.appendChild(pieceInfoDiv);

                    const pieceActionsDiv = document.createElement('div');
                    pieceActionsDiv.classList.add('piece-actions');

                    const modifierNoteBtn = document.createElement('button');
                    modifierNoteBtn.textContent = 'Modifier Note';
                    modifierNoteBtn.classList.add('rounded-button', 'secondary');
                    modifierNoteBtn.addEventListener('click', () => afficherFormulaireNote(piece.id)); // Passer l'ID
                    pieceActionsDiv.appendChild(modifierNoteBtn);

                    const supprimerNoteBtn = document.createElement('button');
                    supprimerNoteBtn.textContent = 'Supprimer Note';
                    supprimerNoteBtn.classList.add('rounded-button', 'secondary');
                    supprimerNoteBtn.addEventListener('click', () => supprimerNote(piece.id)); // Passer l'ID
                    pieceActionsDiv.appendChild(supprimerNoteBtn);


                    pieceDiv.appendChild(pieceActionsDiv);
                    categorieSection.appendChild(pieceDiv);
                });
                repertoireCategoriesDiv.appendChild(categorieSection);
            }
        });
    }

    function afficherFormulaireNote(pieceId) {
        const pieceDiv = document.querySelector(`.piece-item[data-piece-id="${pieceId}"]`);
        let notePersoElt = pieceDiv.querySelector('.note');
        let noteActuelle = notePersoElt ? notePersoElt.textContent.substring(6) : ""; //récupérer la note sans "Note : "

        const formulaireNoteHTML = `
            <div id="formulaireNoteOverlay" class="form-overlay">
                <div class="form-container">
                    <h3>Modifier la note personnelle</h3>
                    <textarea id="notePersoModif">${noteActuelle}</textarea>
                    <div class="form-actions">
                        <button id="sauvegarderNoteBtn" class="rounded-button primary">Sauvegarder</button>
                        <button id="annulerNoteBtn" class="rounded-button secondary">Annuler</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', formulaireNoteHTML);

        const formulaireNoteOverlay = document.getElementById('formulaireNoteOverlay');
        const sauvegarderNoteBtn = document.getElementById('sauvegarderNoteBtn');
        const annulerNoteBtn = document.getElementById('annulerNoteBtn');
        const notePersoModifTextarea = document.getElementById('notePersoModif');


        annulerNoteBtn.addEventListener('click', () => {
            formulaireNoteOverlay.remove(); // Supprimer l'overlay
        });

        sauvegarderNoteBtn.addEventListener('click', () => {
            const nouvelleNote = notePersoModifTextarea.value;
            modifierNotePerso(pieceId, nouvelleNote);
            formulaireNoteOverlay.remove(); // Supprimer l'overlay
        });

         // Gestion de la fermeture du formulaire overlay en cliquant en dehors
         formulaireNoteOverlay.addEventListener('click', function(event) {
            if (event.target === formulaireNoteOverlay) {
                formulaireNoteOverlay.remove();
            }
        });
    }


    function modifierNotePerso(pieceId, nouvelleNote) {
        const pieceIndex = repertoire.findIndex(piece => piece.id === pieceId);
        if (pieceIndex !== -1) {
            repertoire[pieceIndex].notePersonnelle = nouvelleNote;
            sauvegarderRepertoire();
            afficherRepertoire(); // Re-afficher le répertoire pour mettre à jour l'affichage
        }
    }

    function supprimerNote(pieceId) {
        modifierNotePerso(pieceId, ""); // Modifier la note personnelle pour la supprimer (mettre vide)
    }


});
