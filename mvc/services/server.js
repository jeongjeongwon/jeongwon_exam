const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8000;
const path = require('path')
const multer = require('multer')

const con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'kdt305',
  database : 'project_c'
})
/**
 * * destination의 경우 저장된 file이 들어가는 폴더 지정
 * * filename의 경우 저장될 파일의 이름 지정
 */
const storage = multer.diskStorage({
  destination : function(req, res, callback){
    callback(null, './mvc/public')
  },
  filename : function (req, file, callback){
    const ex = path
    callback(null, file.originalname)
  }
})

const upload = multer({
  storage : storage
})

const boardRouter = require("../controllers/routes/board")
const abandonedRouter = require("../controllers/routes/abandonedBoard");
const searchRouter = require("../controllers/routes/search");

//? html에 css스타일 연결
app.use('/', express.static(__dirname + "../../views"))
app.use('/', express.static(__dirname + "../../public"))

//? 글쓰기 페이지
app.get('/createboard', (req, res) => {
  res.sendFile(path.join(__dirname + "../../views/createboard.html"))
})
//? 세부 내용
app.get('/detail', (req, res) => {
  res.sendFile(path.join(__dirname + "../../views/detail.html"))
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
//? DB에 데이터 저장
app.post('/', upload.single("image"), (req, res) => {
  const sql = "INSERT INTO missingboard VALUES (null,?,?,?,?,?,?,?,?)"
  let animal = req.body.animal;
  let kind = req.body.kind;
  let gender = req.body.gender;
  let age = req.body.age;
  let neutering = req.body.neutering;
  let location = req.body.location;
  let matters = req.body.matters;
  let image = req.file.filename;
  let param = [animal, kind, gender, age, neutering, location, matters, image]
  con.query(sql, param, (err, row) => {
    if(err) throw err;
    console.log(row)
    res.send("완료")
  })
})

app.use('/board', boardRouter);
app.use('/abendoned', abandonedRouter);
app.use('/search', searchRouter);

app.listen(port, () =>{
  console.log(`http://localhost:${port}/board`)
})