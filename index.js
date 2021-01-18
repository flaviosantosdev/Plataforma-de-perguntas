const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

connection
        .authenticate()
        .then(()=>{
            console.log("Conexão Ok")
        })
        .catch((msgErro)=>{
            console.log(msgErro)
        })

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/", function(req, res){
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{
            perguntas:perguntas
        })
    })
    
})

app.get("/perguntar", function(req, res){
    res.render("perguntar")
})

app.post("/salvarpergunta", function(req, res){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/")
    })
})



app.get("/pergunta/:id",(req, res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where:{perguntaId: pergunta.id},
                order:[ 
                    ['id','DESC'] 
                ]
            
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas:respostas
                })
            })

            
        }else{
            res.redirect("/")
        }
    })
    
})

app.post("/responder",(req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId)
    })
})




//Ligando o servidor
app.listen(3000, function(err){
    
    if(err){
        console.log(err)
    }else{
        console.log('server is On')
    }
})