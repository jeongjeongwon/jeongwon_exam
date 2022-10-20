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
app.use('/board', boardHtml)

router.get('/', (req, res) => {
  const sql = "select * from missingboard ORDER BY _id DESC"
  con.query(sql, req.body, (err, row) => {
    if(err) throw err;
    let a = row.map((element) => {
      return `<div id=list>
      <a href="http://localhost:8000/detail">
      <img src="${element.image}" style="width:250px; height:350px;position:relative;">
      </a>
      <div id=text>[${element.location}] ${element.kind} ${element.gender}</div>
      </div>`
    }).join("")
    res.send(boardHtml(a))
  })
})

//function filer(){
//  var value, name, item, i;
//  value = document.getElementById("value").value.toUpperCase();
//  item = document.getElementsById("item");
//
//  for(i = 0; i < item.length; i++){
//    name = item[i].getElementsById("text");
//    if(name[0].innerHTML.toUpperCase().indexOf(value) > -1){
//      
//    }
//  }
//}

//const searchPost = (obj) => {
//  searchTag = searchInput.value;
//  return obj.indexOf(searchTag) !== -1;
//}

module.exports = router;

//<div id=text>[${element.location}] ${element.kind} ${element.gender}</div>
//<img src="${element.image}" style="width:250px; height:350px"></img>