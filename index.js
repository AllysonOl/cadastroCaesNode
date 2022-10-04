import express from "express";
import {engine} from "express-handlebars"
import mysql from "mysql"

//CONFIGURAÇÕES INICIAIS
const app = express()

app.use(
  express.urlencoded({
    extended:true,
  })
)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

//CRIANDO ROTAS 
app.get('/',(req, res) => {
  res.render('home')
})

app.post('/caes', (req,res) => {


  const cor = req.body.cor
  const porte = req.body.porte
  const municipio = req.body.municipio
  const bairro = req.body.bairro
  const regiao = req.body.regiao

  const sql = `INSERT INTO caracteristicas (cor, porte, municipio, bairro, região) VALUES 
                ('${cor}', '${porte}', '${municipio}', '${bairro}', '${regiao}')`

  conn.query(sql, function(err) {
    if(err) {
      console.log(err)
      return
    }
    res.redirect('/caes')
  })
})

app.get('/caes', (req,res) => {

  const sql = 'SELECT * FROM caracteristicas'

  conn.query(sql, function(err,data) {
    if(err) {
      console.log(err)
      return
    }
    const caes = data
    console.log(caes)
    res.render('caes', {caes})
  })
})

app.get('/caes/:id', (req,res) => {

  const id = req.params.id

  const sql = `SELECT * FROM caracteristicas WHERE id = ${id}`

  conn.query(sql, function(err, data) {
    if(err) {
      console.log(err)
      return
    }

    const cao = data[0]


    res.render('cao', {cao})
  })

  app.get('/caes/edit/:id', (req, res) => {

    const id = req.params.id

    const sql = `SELECT * FROM caracteristicas WHERE id = ${id}`

    conn.query(sql, function(err,data) {
      if(err) {
        console.log(err)
        return
      }

      const cao = data[0]

      res.render('editcao', {cao})
    })

  })
})



app.post('/caes/updatecao', (req,res) => {
  
  const id = req.body.id
  const cor = req.body.cor
  const porte = req.body.porte
  const municipio = req.body.municipio
  const bairro = req.body.bairro
  const regiao = req.body.regiao
  
const sql = `UPDATE caracteristicas SET cor = '${cor}', porte = '${porte}', 
            municipio = '${municipio}', bairro = '${bairro}', região = '${regiao}' 
            WHERE id = ${id}`

conn.query(sql, function(err) {
  if(err) {
    console.log(err)
    return
  }

  res.redirect('/caes')
})
})

app.post('/caes/remove/:id', (req, res) => {

  const id = req.params.id

  const sql = `DELETE FROM caracteristicas WHERE id = ${id}`

  conn.query(sql, function(err)  {
    if(err) {
      console.log(err)
    }
    res.redirect('/caes')
  })
})


//CRIANDO CONEXAO COM MYSQL
const conn = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '',
  database: 'cadastraCaes'
})

conn.connect(function(err) {
  if(err) {
    console.log('Aqui deu erro:', err)
  }
    console.log('Você está conectado ao Banco de dados!')

    app.listen(3000)
})



