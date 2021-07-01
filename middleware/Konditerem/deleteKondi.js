/**
 * Törli a foflalt időpontot.
 */
const requireOption = require('../requireOption');
module.exports = function (objectrepository) {

    const KonditeremModel = requireOption(objectrepository, 'KonditeremModel');
    const FoglalasModel = requireOption(objectrepository, 'FoglalasModel');

    return function (req, res, next) {

        if (typeof req.params.id === 'undefined') {
            return res.redirect('/orarendem');
        } else {
            KonditeremModel.findByIdAndRemove(req.params.id, (err, konditerem) => {
                if (err) {
                    console.log(err);
                    return res.redirect('/konditerem/Admin');
                } else {
                    if (konditerem !== null) {
                        FoglalasModel.find({_konditerem: konditerem._id}).remove().exec();
                        return res.redirect('/konditerem/Admin');
                    } else {
                        return res.redirect('/konditerem/Admin');
                    }
                }
            });
        }

    };

};