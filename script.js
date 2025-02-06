document.addEventListener('DOMContentLoaded', () => {
    const ajouterPieceBtn = document.getElementById('ajouterPieceBtn');
    const formulairePiece = document.getElementById('formulairePiece');
    const pieceForm = document.getElementById('pieceForm');
    const annulerBtn = document.getElementById('annulerBtn');
    const repertoireCategoriesDiv = document.getElementById('repertoire-categories');

    let repertoire = chargerRepertoire();
    afficherRepertoire();

    ajouterPieceBtn.addEventListener('click', () => {
        formulairePiece.classList.add('show'); // Ajout de la classe 'show' pour l'animation
        ajouterPieceBtn.style.display = 'none';
    });

    annulerBtn.addEventListener('click', () => {
        formulairePiece.classList.remove('show'); // Retrait de la classe 'show' pour cacher
        ajouterPieceBtn.style.display = 'block';
        pieceForm.reset();
    });


    pieceForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const compositeur = document.getElementById('compositeur').value;
        const titre = document.getElementById('titre').value;
        const categorie = document.getElementById('categorie').value;
        const notePersonnelle = document.getElementById('notePersonnelle').value;

        const nouvellePiece = {
            id: Date.now(),
            compositeur: compositeur,
            titre: titre,
            categorie: categorie,
            notePersonnelle: notePersonnelle
        };

        repertoire.push(nouvellePiece);
        sauvegarderRepertoire();
        afficherRepertoire();

        formulairePiece.classList.remove('show'); // Cacher le formulaire après soumission
        ajouterPieceBtn.style.display = 'block';
        pieceForm.reset();
    });

    function sauvegarderRepertoire() {
        localStorage.setItem('repertoireMusical', JSON.stringify(repertoire));
    }

    function chargerRepertoire() {
        const repertoireStocke = localStorage.getItem('repertoireMusical');
        return repertoireStocke ? JSON.parse(repertoireStocke) : [];
    }

    function afficherRepertoire() {
        repertoireCategoriesDiv.innerHTML = '';
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
                    pieceDiv.dataset.pieceId = piece.id;

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
                    modifierNoteBtn.classList.add('rounded-button', 'secondary-button', 'animated-button');
                    modifierNoteBtn.addEventListener('click', () => afficherFormulaireNote(piece.id));
                    pieceActionsDiv.appendChild(modifierNoteBtn);

                    const supprimerNoteBtn = document.createElement('button');
                    supprimerNoteBtn.textContent = 'Supprimer Note';
                    supprimerNoteBtn.classList.add('rounded-button', 'secondary-button', 'animated-button');
                    supprimerNoteBtn.addEventListener('click', () => supprimerNote(piece.id));
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
        let noteActuelle = notePersoElt ? notePersoElt.textContent.substring(6) : "";

        const formulaireNoteHTML = `
            <div id="formulaireNoteOverlay" class="form-overlay">
                <div class="form-container">
                    <h3>Modifier la note personnelle</h3>
                    <textarea id="notePersoModif">${noteActuelle}</textarea>
                    <div class="form-actions">
                        <button id="sauvegarderNoteBtn" class="rounded-button primary-button animated-button">Sauvegarder</button>
                        <button id="annulerNoteBtn" class="rounded-button secondary-button animated-button">Annuler</button>
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
            formulaireNoteOverlay.remove();
        });

        sauvegarderNoteBtn.addEventListener('click', () => {
            const nouvelleNote = notePersoModifTextarea.value;
            modifierNotePerso(pieceId, nouvelleNote);
            formulaireNoteOverlay.remove();
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
            afficherRepertoire();
        }
    }

    function supprimerNote(pieceId) {
        modifierNotePerso(pieceId, "");
    }


});
