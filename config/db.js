var mysql = require('mysql')
var faker = require('faker')

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'user',
  password : 'pass',
})

connection.query("CREATE DATABASE IF NOT EXISTS matcha", function(err, res) {
  if (err) throw err;
  console.log('Created !');
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "pass",
  database: "matcha",
  port: 3306
});

connection.connect(function(err) {
  if (err) return console.error('error: ' + err.message);
});

connection.query('USE matcha')
connection.query('CREATE TABLE IF NOT EXISTS users (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, firstname VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, inscription_date DATE, reset VARCHAR(255) DEFAULT \'NULL\', sexe VARCHAR(25), orientation VARCHAR(25) DEFAULT \'Bisexuelle\', bio VARCHAR(10000), interests VARCHAR(255), age INT, pic0 VARCHAR(255), pic1 VARCHAR(255), pic2 VARCHAR(255), pic3 VARCHAR(255), pic4 VARCHAR(255), city VARCHAR(255), lat FLOAT, lon FLOAT, visit DATE, online BOOLEAN DEFAULT FALSE, confirme BOOLEAN DEFAULT FALSE, confirmeKey VARCHAR(255) DEFAULT \'NULL\')')
connection.query('CREATE TABLE IF NOT EXISTS likes (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(100) NOT NULL, liked VARCHAR(100) NOT NULL)')
connection.query('CREATE TABLE IF NOT EXISTS visits (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(100) NOT NULL, visited VARCHAR(100) NOT NULL)')
connection.query('CREATE TABLE IF NOT EXISTS block (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(100) NOT NULL, blocked VARCHAR(100) NOT NULL)')
connection.query('CREATE TABLE IF NOT EXISTS notif (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(100) NOT NULL, sender VARCHAR(100) NOT NULL, notification VARCHAR(255) NOT NULL, readed BOOLEAN DEFAULT FALSE, date DATE NOT NULL)')
connection.query('CREATE TABLE IF NOT EXISTS messages (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(100) NOT NULL, sender VARCHAR(100) NOT NULL, message VARCHAR(10000))')
connection.query('CREATE TABLE IF NOT EXISTS tag (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(100) NOT NULL, tag VARCHAR(100))')
/*
for (var i = 0; i < 500; i++) {
  let genders = ['Femme', 'Homme'];
  let gender = faker.random.arrayElement(genders);
  let orientations = ['Bisexuelle', 'Hétérosexuelle', 'Homosexuelle'];
  let orienta = faker.random.arrayElement(orientations);
  connection.query(
    "INSERT INTO users SET username = ?, lastname = ?, firstname = ?, email = ?, sexe = ?, orientation = ?, bio = ?, age = ?, password = ?, confirme = 1, online = 1, pic0 = ?, city = 'Lyon', lat = 45.739240, lon = 4.817450, inscription_date = ?",
    [
      faker.random.alphaNumeric(12),
      faker.name.lastName(gender),
      faker.name.firstName(gender),
      faker.internet.email(),
      gender,
      orienta,
      'test test',
      faker.random.number({min:18, max:50}),
      faker.random.alphaNumeric(12),
      faker.image.avatar(),
      faker.date.past(2019)
    ],
    err => {
      if (err) {
        console.log(err);
      } else {
        console.log('okokokokok');
      }
    }
  );
}*/


module.exports = connection
