var express = require('express')
var router = express.Router()
var connection = require('../config/db')

router.use('/:confirmeKey', function(req, res) {
    if (req.params.confirmeKey) {
        connection.query('UPDATE users SET confirme = 1', (err) => {
            if (err) {
                req.session.error = "Erreur."
                res.redirect('/login')
            } else {
                req.session.success = "Votre compte a bien été valider. Vous pouvez maintenant vous connecter."
                res.redirect('/login')
            }
        })
    } else {
        res.redirect('/login')
    }
})

module.exports = router
