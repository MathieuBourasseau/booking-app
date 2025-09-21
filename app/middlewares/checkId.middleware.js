export function checkId (req, res, next) {

    // Récupération de l'id via la requête 
    // Conversion de l'id en un nombre
    const id = parseInt(req.params.id,10);

    // vérification que l'id est conforme 
    if (isNaN(id) || id <=0){
        return res.render('pages/properties', {
            title: "Biens",
            error: "id is not valid. It must be an integer"
        });
    }

    req.params.id = id;
    next();
}