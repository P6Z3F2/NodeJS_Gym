/**
 * Törli a foflalt időpontot.
 */
const requireOption = require('../requireOption');
module.exports = function (objectrepository) {

    const FoglalasModel = requireOption(objectrepository, 'FoglalasModel');

    return function (req, res, next) {

        if (typeof req.params.foglalas === 'undefined' || typeof req.params.id === 'undefined') {
            return res.redirect('/orarendem');
        } else {
            FoglalasModel.findById(req.params.foglalas, (err, foglalas) => {
                if (err) {
                    console.log(err);
                } else {
                    if (foglalas !== null) {
                        foglalas.letszam--;
                        foglalas._felhasznalo.pull({ _id: req.params.id });
                        foglalas.save((err)=>{
                            if(err){
                                console.log(err);
                            }else{
                                return res.redirect('/orarendem');
                            }
                        });
                    } else {
                        return res.redirect('/orarendem');
                    }
                }
            });
        }

    };

};