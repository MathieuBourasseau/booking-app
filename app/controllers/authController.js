export const authController = {

    // Méthode pour afficher le form

    showForm (req, res) {
        res.render('pages/register', { title : "Inscription"});
    },

    // Méthode pour créer un compte
    register (req, res) {
        
        res.render('pages/register', {title : "Inscription"});
    },

    // Méthode pour se connecter 
    login (req,res) {
        res.render('pages/login', { title: "Connexion"});
    }
}