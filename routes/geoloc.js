var express = require('express')
var router = express.Router()
var connection = require('../config/db')
var iplocation = require('iplocation').default;
var getCoords = require('city-to-coords')



router.get('/', function(req, res) {

    externalip(function (err, ip) {
        if (req.session && req.session.user && ip) {
            console.log(ip)
            iplocation(ip).then((res) => {
                if (err) console.log(err)
                if (!res || !res['city']){
                    connection.query('UPDATE users SET city = "Lyon", lat = 45.739240, lon = 4.817450 WHERE username = ?', [req.session.user], (err) => {
                        if (err) console.log(err)
                    })
                }
                else
                    connection.query('UPDATE users SET city = ?, lat = ?, lon = ? WHERE username = ?', [res['city'], res['latitude'], res['longitude'], req.session.user], (err) => {
                        if (err) console.log(err)
                    })
            }).catch(err => {})
            req.session.success = "Vous avez correctement été géolocaliser."
            res.redirect('/')
        } else {
            req.session.error = "Vous devez être connecté pour accéder a cette page."
            res.redirect('/login')
        }
    });
})

router.post('/', function(req, res) {
    if (req.session && req.session.user && req.body && req.body.city) {
        res.redirect('/')
        getCoords(req.body.city).then((coords) => {
            connection.query('UPDATE users SET city = ?, lat = ?, lon = ? WHERE username = ?', [req.body.city, coords.lat, coords.lng, req.session.user], (err) => {
                if (err) console.log(err)
                else
                    req.session.success = "Votre position a été mis a jour."
            })
        });
    } else if (req.session && req.session.user) {
        req.session.error = "Vous devez renseigner une ville."
        res.redirect('/profil')
    } else {
        req.session.error = "Vous devez être connecté pour accéder a cette page."
        res.redirect('/login')
    }
})

module.exports = router
