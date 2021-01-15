const express = require("express");
const app = express()
const bodyParser = require("body-parser")

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/", function(req, res){
    res.render("index")
})

app.get("/perguntar", function(req, res){
    res.render("perguntar")
})

app.post("/salvarpergunta", function(req, res){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao
    res.send("Recebido")
})






//Ligando o servidor
app.listen(3000, function(err){
    
    if(err){
        console.log(err)
    }else{
        console.log('server is On')
    }
})