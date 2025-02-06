document.addEventListener('DOMContentLoaded', () => {
    const ajouterPieceBtn = document.getElementById('ajouterPieceBtn');
    const formulairePiece = document.getElementById('formulairePiece');
    const pieceForm = document.getElementById('pieceForm');
    const annulerAjoutBtn = document.getElementById('annulerAjout');
    const categoriesRepertoire = document.getElementById('categoriesRepertoire');

    // Autocomplete pour le compositeur
    const compositeurInput = document.getElementById('compositeur');
    const suggestionsCompositeurList = document.getElementById('suggestionsCompositeur');
    let suggestionsActivesIndex = -1; // Index de la suggestion active dans la liste

    // Liste de compositeurs (beaucoup plus fournie)
    const compositeurSuggestions = [
        "J.S. Bach", "W.A. Mozart", "L. van Beethoven", "F. Chopin", "J. Brahms", "C. Debussy", "M. Ravel", "R. Schumann", "F. Schubert", "P.I. Tchaikovsky",
        "G.F. Handel", "A. Vivaldi", "J. Haydn", "F. Liszt", "C. Saint-Saëns", "S. Rachmaninoff", "C. Schumann", "B. Bartók", "I. Stravinsky",
        "C. Monteverdi", "H. Purcell", "D. Scarlatti", "G.P. Telemann", "C.P.E. Bach", "C.W. Gluck", "L. Boccherini", "M. Clementi", "J.N. Hummel",
        "C.M. von Weber", "F. Mendelssohn", "H. Berlioz", "G. Verdi", "R. Wagner", "A. Bruckner", "J. Offenbach", "J. Strauss II", "J. Bizet",
        "C. Franck", "E. Grieg", "G. Mahler", "C. Nielsen", "J. Sibelius", "G. Fauré", "P. Dukas", "E. Satie", "S. Joplin", "G. Gershwin",
        "A. Berg", "A. Webern", "P. Boulez", "K. Stockhausen", "L. Berio", "G. Ligeti", "S. Reich", "P. Glass", "J. Adams", "K. Saariaho",
        "G. Rossini", "G. Donizetti", "V. Bellini", "G. Puccini", "R. Leoncavallo", "P. Mascagni", "U. Giordano", "E. Wolf-Ferrari", "A. Catalani",
        "G. Bizet", "L. Delibes", "C. Gounod", "J. Massenet", "A. Thomas", "E. Chabrier", "E. Chausson", "V. d'Indy", "G. Charpentier", "R. Hahn",
        "E. Granados", "I. Albéniz", "M. de Falla", "J. Turina", "F. Tárrega", "A. Barrios", "H. Villa-Lobos", "L. Brouwer", "A. Piazzolla", "C. Guastavino",
        "H. Dutilleux", "O. Messiaen", "L. Nono", "I. Xenakis", "G. Grisey", "T. Murail", "P. Manoury", "K. Penderecki", "H.M. Górecki", "W. Lutosławski",
        "S. Prokofiev", "D. Shostakovich", "I. Stravinsky", "B. Britten", "M. Tippett", "R. Vaughan Williams", "G. Holst", "W. Walton", "E. Elgar",
        "G. Crumb", "L. Harrison", "J. Cage", "M. Feldman", "M. Babbitt", "S. Barber", "A. Copland", "L. Bernstein", "C. Ives", "H. Cowell",
        "S. Gubaidulina", "A. Schnittke", "E. Denisov", "V. Silvestrov", "G. Ustvolskaya", "P. Vasks", "R. Clarke", "F. Bridge", "G. Butterworth",
        "E. Rautavaara", "K. Aho", "M. Lindberg", "K. Lang", "A. Pärt", "P. Glass", "J. Adams", "S. Reich", "T. Riley", "L. Andriessen", "S. Martland"
    ];


    // Fonction pour afficher les suggestions de compositeur
    function afficherSuggestions(suggestions) {
        suggestionsCompositeurList.innerHTML = ''; // Nettoyer la liste précédente
        if (suggestions.length > 0) {
            suggestionsCompositeurList.style.display = 'block';
            suggestions.forEach((suggestion, index) => {
                let suggestionItem = document.createElement('li');
                suggestionItem.textContent = suggestion;
                suggestionItem.addEventListener('click', () => {
                    compositeurInput.value = suggestion;
                    cacherSuggestions();
                });
                suggestionsCompositeurList.appendChild(suggestionItem);
            });
        } else {
            cacherSuggestions(); // Cacher si pas de suggestions
        }
    }

    // Fonction pour cacher les suggestions
    function cacherSuggestions() {
        suggestionsCompositeurList.style.display = 'none';
        suggestionsActivesIndex = -1; // Réinitialiser l'index actif
    }


    // Écouteur d'événement sur l'input compositeur pour l'autocomplete
    compositeurInput.addEventListener('input', function() {
        const valeurInput = this.value.toLowerCase();
        let suggestionsFiltrées = [];

        if (valeurInput) {
            suggestionsFiltrées = compositeurSuggestions.filter(suggestion =>
                suggestion.toLowerCase().startsWith(valeurInput)
            );
        }
        afficherSuggestions(suggestionsFiltrées);
    });


    // Gestion de la navigation dans les suggestions au clavier
    compositeurInput.addEventListener('keydown', function(e) {
        let listeSuggestionsItems = suggestionsCompositeurList.querySelectorAll('li');
        if (e.keyCode === 40) { // Flèche bas
            suggestionsActivesIndex++;
            if (suggestionsActivesIndex >= listeSuggestionsItems.length) suggestionsActivesIndex = 0;
            if (suggestionsActivesIndex >= 0) {
                listeSuggestionsItems.forEach(item => item.classList.remove('autocomplete-active'));
                listeSuggestionsItems[suggestionsActivesIndex].classList.add('autocomplete-active');
            }
        } else if (e.keyCode === 38) { // Flèche haut
            suggestionsActivesIndex--;
            if (suggestionsActivesIndex < 0) suggestionsActivesIndex = listeSuggestionsItems.length - 1;
            if (suggestionsActivesIndex >= 0) {
                listeSuggestionsItems.forEach(item => item.classList.remove('autocomplete-active'));
                listeSuggestionsItems[suggestionsActivesIndex].classList.add('autocomplete-active');
            }
        } else if (e.keyCode === 13) { // Entrée
            e.preventDefault(); // Empêcher la soumission du formulaire par défaut
            if (suggestionsActivesIndex > -1 && listeSuggestionsItems.length > 0) {
                compositeurInput.value = listeSuggestionsItems[suggestionsActivesIndex].textContent;
                cacherSuggestions();
            }
        } else if (e.keyCode === 27) { // Échap
            cacherSuggestions();
        }
    });

    // Cacher les suggestions si on clique en dehors de l'input et de la liste
    document.addEventListener('click', function(e) {
        if (!formulairePiece.contains(e.target)) {
            cacherSuggestions();
        }
    });


    // Fonction pour afficher le formulaire d'ajout de pièce
    ajouterPieceBtn.addEventListener('click', () => {
        formulairePiece.style.display = 'block';
        ajouterPieceBtn.style.display = 'none';
    });

    // Fonction pour annuler l'ajout de pièce et cacher le formulaire
    annulerAjoutBtn.addEventListener('click', () => {
        formulairePiece.style.display = 'none';
        ajouterPieceBtn.style.display = 'block';
    });

    // Gestion de la soumission du formulaire d'ajout
    pieceForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const compositeur = document.getElementById('compositeur').value;
        const titre = document.getElementById('titre').value;
        const categorie = document.getElementById('categorie').value;
        const notePersonnelle = document.getElementById('notePersonnelle').value;

        const piece = {
            id: Date.now(), // ID unique pour chaque pièce
            compositeur: compositeur,
            titre: titre,
            categorie: categorie,
            notePersonnelle: notePersonnelle
        };

        enregistrerPiece(piece);
        afficherRepertoire();
        pieceForm.reset();
        formulairePiece.style.display = 'none';
        ajouterPieceBtn.style.display = 'block';
    });

    // Fonction pour enregistrer une pièce dans le stockage local
    function enregistrerPiece(piece) {
        let repertoire = JSON.parse(localStorage.getItem('repertoire')) || {};
        if (!repertoire[piece.categorie]) {
            repertoire[piece.categorie] = [];
        }
        repertoire[piece.categorie].push(piece);
        localStorage.setItem('repertoire', JSON.stringify(repertoire));
    }

    // Fonction pour supprimer une pièce du stockage local
    function supprimerPiece(categorie, pieceId) {
        let repertoire = JSON.parse(localStorage.getItem('repertoire')) || {};
        if (repertoire[categorie]) {
            repertoire[categorie] = repertoire[categorie].filter(piece => piece.id !== pieceId);
            if (repertoire[categorie].length === 0) {
                delete repertoire[categorie]; // Supprimer la catégorie si elle est vide
            }
            localStorage.setItem('repertoire', JSON.stringify(repertoire));
        }
    }

    // Fonction pour mettre à jour une pièce dans le stockage local
    function mettreAJourPiece(pieceModifiee) {
        let repertoire = JSON.parse(localStorage.getItem('repertoire')) || {};
        if (repertoire[pieceModifiee.categorie]) {
            repertoire[pieceModifiee.categorie] = repertoire[pieceModifiee.categorie].map(piece => {
                if (piece.id === pieceModifiee.id) {
                    return pieceModifiee;
                }
                return piece;
            });
            localStorage.setItem('repertoire', JSON.stringify(repertoire));
        }
    }


    // Fonction pour afficher le répertoire avec options d'édition/suppression
    function afficherRepertoire() {
        categoriesRepertoire.innerHTML = '';
        const repertoire = JSON.parse(localStorage.getItem('repertoire')) || {};
        const categoriesOrder = ["Concerto", "Sonate", "Pièce solo", "Caprices/Etudes", "Technique"];

        categoriesOrder.forEach(categorieNom => {
            if (repertoire[categorieNom] && repertoire[categorieNom].length > 0) {
                const categorieSection = document.createElement('div');
                categorieSection.classList.add('categorie-section');

                const categorieTitre = document.createElement('h3');
                categorieTitre.textContent = categorieNom;
                categorieSection.appendChild(categorieTitre);

                repertoire[categorieNom].forEach(piece => {
                    const pieceItem = document.createElement('div');
                    pieceItem.classList.add('piece-item');
                    pieceItem.dataset.pieceId = piece.id;
                    pieceItem.dataset.pieceCategorie = categorieNom;

                    // Vue des détails de la pièce (affichée par défaut)
                    const pieceDetailsView = document.createElement('div');
                    pieceDetailsView.classList.add('piece-details-view');

                    const pieceCompositeur = document.createElement('h4'); // Compositeur en titre
                    pieceCompositeur.textContent = piece.compositeur;
                    pieceDetailsView.appendChild(pieceCompositeur);

                    const pieceDetails = document.createElement('div');
                    pieceDetails.classList.add('piece-details');
                    pieceDetails.innerHTML = `<strong>Titre:</strong> ${piece.titre}`; // Titre en détails
                    pieceDetailsView.appendChild(pieceDetails);

                    if (piece.notePersonnelle) {
                        const pieceNote = document.createElement('p');
                        pieceNote.classList.add('piece-note');
                        pieceNote.textContent = piece.notePersonnelle;
                        pieceDetailsView.appendChild(pieceNote);
                    }
                    pieceItem.appendChild(pieceDetailsView);


                    // Formulaire d'édition (caché par défaut)
                    const editFormContainer = document.createElement('div');
                    editFormContainer.classList.add('edit-form-container');
                    editFormContainer.innerHTML = `
                        <form class="editForm">
                            <div class="input-group">
                                <label for="edit-compositeur-${piece.id}">Compositeur</label>
                                <input type="text" id="edit-compositeur-${piece.id}" name="compositeur" value="${piece.compositeur}" required>
                            </div>
                            <div class="input-group">
                                <label for="edit-titre-${piece.id}">Titre de la pièce</label>
                                <input type="text" id="edit-titre-${piece.id}" name="titre" value="${piece.titre}" required>
                            </div>
                            <div class="input-group">
                                <label for="edit-categorie-${piece.id}">Catégorie</label>
                                <select id="edit-categorie-${piece.id}" name="categorie" required>
                                    <option value="Concerto" ${piece.categorie === 'Concerto' ? 'selected' : ''}>Concerto</option>
                                    <option value="Sonate" ${piece.categorie === 'Sonate' ? 'selected' : ''}>Sonate</option>
                                    <option value="Pièce solo" ${piece.categorie === 'Pièce solo' ? 'selected' : ''}>Pièce solo</option>
                                    <option value="Caprices/Etudes" ${piece.categorie === 'Caprices/Etudes' ? 'selected' : ''}>Caprices/Études</option>
                                    <option value="Technique" ${piece.categorie === 'Technique' ? 'selected' : ''}>Technique</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <label for="edit-notePersonnelle-${piece.id}">Note personnelle (optionnelle)</label>
                                <textarea id="edit-notePersonnelle-${piece.id}" name="notePersonnelle" rows="3">${piece.notePersonnelle ? piece.notePersonnelle : ''}</textarea>
                            </div>
                            <div class="edit-form-actions">
                                <button type="submit" class="rounded-button save-button animated-button"><svg><use xlink:href="#icon-save"></use></svg> Sauvegarder</button>
                                <button type="button" class="rounded-button cancel-edit-button animated-button"><svg><use xlink:href="#icon-cancel"></use></svg> Annuler</button>
                            </div>
                        </form>
                    `;
                    pieceItem.appendChild(editFormContainer);


                    // Actions (Modifier/Supprimer)
                    const pieceActions = document.createElement('div');
                    pieceActions.classList.add('piece-actions');
                    pieceActions.innerHTML = `
                        <button class="rounded-button edit-button animated-button" data-piece-id="${piece.id}" data-piece-categorie="${categorieNom}"><svg><use xlink:href="#icon-edit"></use></svg> Modifier</button>
                        <button class="rounded-button delete-button animated-button" data-piece-id="${piece.id}" data-piece-categorie="${categorieNom}"><svg><use xlink:href="#icon-trash"></use></svg> Supprimer</button>
                    `;
                    pieceItem.appendChild(pieceActions);


                    categorieSection.appendChild(pieceItem);
                });
                categoriesRepertoire.appendChild(categorieSection);
            }
        });

        if (categoriesRepertoire.innerHTML === '') {
            categoriesRepertoire.innerHTML = '<p>Votre répertoire est vide. Ajoutez des pièces !</p>';
        }

        // Gestion des événements après l'affichage (délégation d'événements)
        categoriesRepertoire.addEventListener('click', function(event) {
            const target = event.target;

            // Suppression de pièce
            if (target.classList.contains('delete-button')) {
                const pieceId = parseInt(target.dataset.pieceId);
                const categorie = target.dataset.pieceCategorie;
                if (confirm("Êtes-vous sûr de vouloir supprimer cette pièce de votre répertoire ?")) {
                    supprimerPiece(categorie, pieceId);
                    afficherRepertoire(); // Re-afficher le répertoire après suppression
                }
            }

            // Édition de pièce - Afficher le formulaire
            if (target.classList.contains('edit-button')) {
                const pieceItem = target.closest('.piece-item');
                pieceItem.classList.add('editing'); // Ajouter la classe 'editing' pour afficher le formulaire et cacher la vue
            }

            // Édition de pièce - Annuler l'édition
            if (target.classList.contains('cancel-edit-button')) {
                const pieceItem = target.closest('.piece-item');
                pieceItem.classList.remove('editing'); // Retirer la classe 'editing' pour cacher le formulaire et afficher la vue
            }

            // Édition de pièce - Sauvegarder les modifications
            if (target.classList.contains('save-button')) {
                event.preventDefault(); // Empêcher la soumission standard du formulaire

                const pieceItem = target.closest('.piece-item');
                const pieceId = parseInt(pieceItem.dataset.pieceId);
                const categorie = pieceItem.dataset.pieceCategorie;
                const form = target.closest('.edit-form-container').querySelector('.editForm');

                const pieceModifiee = {
                    id: pieceId,
                    categorie: categorie,
                    compositeur: form.querySelector(`#edit-compositeur-${pieceId}`).value,
                    titre: form.querySelector(`#edit-titre-${pieceId}`).value,
                    categorie: form.querySelector(`#edit-categorie-${pieceId}`).value,
                    notePersonnelle: form.querySelector(`#edit-notePersonnelle-${pieceId}`).value
                };

                mettreAJourPiece(pieceModifiee);
                afficherRepertoire(); // Re-afficher le répertoire après modification
            }
        });
    }


    // Afficher le répertoire au chargement de la page
    afficherRepertoire();
});
