var express = require('express')
var handlebars = require('express-handlebars').create({defaultLayout: 'main'})
var bodyParser = require('body-parser');

var app = express()

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    tableBody = [];
    for (var key in req.query) {
        tableBody.push({
            'key': key,
            'value': req.query[key]
        })
    }
    res.render('get', {tableBody : tableBody})
})

app.post('/', function(req, res) {
    queryTable = [];
    for (var key in req.query) {
        queryTable.push({
            'key': key,
            'value': req.query[key]
        })
    }

    bodyTable = [];
    for (var key in req.body) {
        bodyTable.push({
            'key': key,
            'value': req.body[key]
        })
    }
    res.render('post', {queryTable : queryTable, bodyTable : bodyTable})
})

app.use(function(req, res) {
    res.status(404);
    res.render('404');
})

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500);
    res.render('500');
})

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});