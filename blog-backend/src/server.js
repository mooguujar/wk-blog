var express = require('express');
var app = express();
var mysql = require('mysql');
var util = require('./util')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'wkblog'
})

connection.connect()

//解决跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

var server = app.listen(81, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http:localhost//%s:%s", host, port)
})

app.get('/categories', function (req, res) {
  var sql = 'SELECT * FROM categories'
  
  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }

    res.send(result)
  });

})

app.get('/categoriesBlog/:category', function (req, res) {
  const category = req.params.category
  const searchSql = 'SELECT * FROM articles WHERE categories = ' + '\'' + category + '\''
  connection.query(searchSql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }
    const list = util.handleArticleList(result)
    res.send(list)
  })
})

app.get('/articles', function(req, res) {
  var sql = 'SELECT * FROM articles ORDER BY date DESC'
  
  connection.query(sql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }
    
    const list = util.handleArticleList(result)
    res.send(list)
  })
})

app.get('/blog/:id', function(req, res) {
  const id = req.params.id
  const searchSql = 'SELECT * FROM articles WHERE id = ' + id
  
  connection.query(searchSql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }
    res.send(result)
  })
})

app.get('/friend/:title', function(req, res) {
  const title = req.params.title
  const searchSql = 'SELECT * FROM articles WHERE title = ' + '\'' + title + '\''
  connection.query(searchSql, function (err, result) {
    if(err) {
      console.log('[SELECT ERROR] - ',err.message)
      return
    }
    res.send(result)
  })
})