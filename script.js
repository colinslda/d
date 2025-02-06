document.addEventListener('DOMContentLoaded', () => {
    const ajouterPieceBtn = document.getElementById('ajouterPieceBtn');
    const formulairePiece = document.getElementById('formulairePiece');
    const pieceForm = document.getElementById('pieceForm');
    const annulerAjoutBtn = document.getElementById('annulerAjout');
    const categoriesRepertoire = document.getElementById('categoriesRepertoire');

    // Autocomplete pour le compositeur (inchangé)
    const compositeurInput = document.getElementById('compositeur');
    const suggestionsCompositeurList = document.getElementById('suggestionsCompositeur');
    let suggestionsActivesIndex = -1;

    const compositeurSuggestions = [ // ... liste de compositeurs inchangée ... ];
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


    function afficherSuggestions(suggestions) { // ... fonction afficherSuggestions inchangée ... }
    function cacherSuggestions() { // ... fonction cacherSuggestions inchangée ... }
    compositeurInput.addEventListener('input', function() { // ... event listener input compositeur inchangé ... });
    compositeurInput.addEventListener('keydown', function(e) { // ... event listener keydown compositeur inchangé ... });
    document.addEventListener('click', function(e) { // ... event listener click document inchangé ... });


    // Fonction pour afficher le formulaire d'ajout de pièce
    ajouterPieceBtn.addEventListener('click', () => {
        formulairePiece.style.display = 'flex'; // Utilisation de flex pour l'overlay
        setTimeout(() => { formulairePiece.classList.add('active'); }, 50); // Animation d'apparition
    });

    // Fonction pour annuler l'ajout de pièce et cacher le formulaire
    annulerAjoutBtn.addEventListener('click', () => {
        formulairePiece.classList.remove('active'); // Animation de disparition
        setTimeout(() => { formulairePiece.style.display = 'none'; }, 300); // Cacher après l'animation
    });

    // Gestion de la soumission du formulaire d'ajout
    pieceForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const compositeur = document.getElementById('compositeur').value;
        const titre = document.getElementById('titre').value;
        const categorie = document.getElementById('categorie').value;
        const notePersonnelle = document.getElementById('notePersonnelle').value;

        const piece = {
            id: Date.now(),
            compositeur: compositeur,
            titre: titre,
            categorie: categorie,
            notePersonnelle: notePersonnelle
        };

        enregistrerPiece(piece);
        afficherRepertoire();
        pieceForm.reset();
        formulairePiece.classList.remove('active'); // Animation disparition
        setTimeout(() => { formulairePiece.style.display = 'none'; }, 300); // Cacher après animation
        ajouterPieceBtn.style.display = 'flex';
    });

    // Fonction pour enregistrer une pièce dans le stockage local (inchangée)
    function enregistrerPiece(piece) { // ... fonction enregistrerPiece inchangée ... }
    // Fonction pour supprimer une pièce du stockage local (inchangée)
    function supprimerPiece(categorie, pieceId) { // ... fonction supprimerPiece inchangée ... }
    // Fonction pour mettre à jour une pièce dans le stockage local (inchangée)
    function mettreAJourPiece(pieceModifiee) { // ... fonction mettreAJourPiece inchangée ... }


    // Fonction pour afficher le répertoire avec options d'édition/suppression (MODIFIÉE classes CSS)
    function afficherRepertoire() {
        categoriesRepertoire.innerHTML = '';
        const repertoire = JSON.parse(localStorage.getItem('repertoire')) || {};
        const categoriesOrder = ["Concerto", "Sonate", "Pièce solo", "Caprices/Etudes", "Technique"];

        categoriesOrder.forEach(categorieNom => {
            if (repertoire[categorieNom] && repertoire[categorieNom].length > 0) {
                const categorieSection = document.createElement('div');
                categorieSection.classList.add('categorie-section');

                const categorieTitre = document.createElement('h3');
                categorieTitre.classList.add('categorie-section-title'); // CLASSE CSS MODIFIÉE
                categorieTitre.textContent = categorieNom;
                categorieSection.appendChild(categorieTitre);

                repertoire[categorieNom].forEach(piece => {
                    const pieceItem = document.createElement('div');
                    pieceItem.classList.add('piece-item');
                    pieceItem.dataset.pieceId = piece.id;
                    pieceItem.dataset.pieceCategorie = categorieNom;

                    const pieceDetailsView = document.createElement('div');
                    pieceDetailsView.classList.add('piece-details-view');

                    const pieceCompositeur = document.createElement('h4');
                    pieceCompositeur.classList.add('piece-composer'); // CLASSE CSS MODIFIÉE
                    pieceCompositeur.textContent = piece.compositeur;
                    pieceDetailsView.appendChild(pieceCompositeur);

                    const pieceTitre = document.createElement('div');
                    pieceTitre.classList.add('piece-title'); // CLASSE CSS MODIFIÉE
                    pieceTitre.innerHTML = `Titre: ${piece.titre}`;
                    pieceDetailsView.appendChild(pieceTitre);

                    if (piece.notePersonnelle) {
                        const pieceNote = document.createElement('p');
                        pieceNote.classList.add('piece-note'); // CLASSE CSS MODIFIÉE
                        pieceNote.textContent = piece.notePersonnelle;
                        pieceDetailsView.appendChild(pieceNote);
                    }
                    pieceItem.appendChild(pieceDetailsView);


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
                            <div class="input-group textarea-group">
                                <label for="edit-notePersonnelle-${piece.id}">Note personnelle (optionnelle)</label>
                                <textarea id="edit-notePersonnelle-${piece.id}" name="notePersonnelle" rows="3">${piece.notePersonnelle ? piece.notePersonnelle : ''}</textarea>
                            </div>
                            <div class="edit-form-actions">
                                <button type="submit" class="action-button save-button animated-button"><svg><use xlink:href="#icon-save"></use></svg> Sauvegarder</button>
                                <button type="button" class="action-button cancel-edit-button animated-button"><svg><use xlink:href="#icon-cancel"></use></svg> Annuler</button>
                            </div>
                        </form>
                    `;
                    pieceItem.appendChild(editFormContainer);

                    const pieceActions = document.createElement('div');
                    pieceActions.classList.add('piece-actions');
                    pieceActions.innerHTML = `
                        <button class="action-button edit-button animated-button" data-piece-id="${piece.id}" data-piece-categorie="${categorieNom}"><svg><use xlink:href="#icon-edit"></use></svg> Modifier</button>
                        <button class="action-button delete-button animated-button" data-piece-id="${piece.id}" data-piece-categorie="${categorieNom}"><svg><use xlink:href="#icon-trash"></use></svg> Supprimer</button>
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

        categoriesRepertoire.addEventListener('click', function(event) { // ... gestion événements inchangée ... });
            const target = event.target;
            if (target.classList.contains('delete-button')) { // ... }
            if (target.classList.contains('edit-button')) { // ... }
            if (target.classList.contains('cancel-edit-button')) { // ... }
            if (target.classList.contains('save-button')) { // ... }
        });
    }


    afficherRepertoire(); // ... afficherRepertoire() call inchangé ...
});
