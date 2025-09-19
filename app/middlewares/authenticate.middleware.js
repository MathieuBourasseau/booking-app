// On créé deux middlewares : 
// Un qui va gérer les routes disponibles pour l'utilisateur s'il est connecté
// Un qui va gérer les routes si l'utilisateur n'est pas connecté

export function onlyGuest (req, res, next) {

    //En cas de session active 
    // on empêche l'utilisateur de se connecter aux viex qui lui permette de se logger. 
    if(req.session.user) {
        return res.redirect('/')
    }
    
    next(); // on passe au middleware suivant
}

export function onlyAuthenticated (req, res, next) {

    // Si l'utilisateur n'est pas connecté
    // on l'empêche d'accéder au dashboard
    if(!req.session.user) {
        return res.redirect('/')
    }

    next(); // on passe au middleware suivant
}