export const homeController = {

    // Méthode pour afficher le contenu de la view home.ejs
    displayHome (req, res) {

        res.render('pages/home', {title : "Accueil"})
    }
};