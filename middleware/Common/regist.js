/**
 * Regisztálja a megadott adatok alapján a felhasználót.
 */
 const requireOption = require('../requireOption');
 module.exports = function (objectrepository){

    const FelhasznaloModel = requireOption(objectrepository, 'FelhasznaloModel');

    return function (req, res, next){
        
        if(typeof req.body.regEmail === 'undifend'){
            console.log('Ez nem egy regisztráció');
        }
        if(req.body.password1!==req.body.password2){
            res.locals.errorR = 'Nem ugyanaz a jelszó haver :3'; 
            return next();
        }
        console.log(req.body.regEmail);
        console.log(req.body.password1);
        console.log(req.body.password2);

        res.locals.felhasznalo = new FelhasznaloModel();
        res.locals.felhasznalo.email=req.body.regEmail;
        res.locals.felhasznalo.jelszo=req.body.password1;
        res.locals.felhasznalo.szerep="halando";
        res.locals.felhasznalo.save((err)=>{
            if(err){
                console.log(err);
            }
            console.log('minden fasza');
            return res.redirect('/');
        });

    };

};