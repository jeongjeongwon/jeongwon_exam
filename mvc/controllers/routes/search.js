const express = require('express')
const app = express('express')
const router = express.Router()
const mysql = require('mysql');

const con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'kdt305',
  database : 'project_c'
})

const boardHtml = require("./boardHtml")
app.use('/search', boardHtml)

router.get('/', (req, res) => {
  let a = req.body
  console.log(req.query.result)
  const sql = `SELECT location, kind, gender, image FROM missingboard WHERE location LIKE "${req.query.result}" or kind LIKE "${req.query.result}" or gender LIKE "${req.query.result}";`
  con.query(sql, (err, row) => {
    if(err) throw err;
    let a = row.map((element) => {
      return `<div id=list>
      <a href="/detail">
      <img src="${element.image}" style="width:250px; height:350px;position:relative;">
      </a>
      <div id=text>[${element.location}] ${element.kind} ${element.gender}</div>
      </div>`
    }).join("")
    res.send(boardHtml(a))
  })
})
module.exports = router;