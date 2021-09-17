const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let DB = {
    games:[
       
    ]
}

//End Points

app.get('/games', (req, res)=>{
    res.statusCode = 200 
    res.json(DB.games);
})

app.get('/game/:id', (req, res)=>{
    let id = Number(req.params.id) 
    if(isNaN(id)){ // se o id não for numero    
        res.sendStatus(400)
    }else{

        let game = DB.games.find(game => game.id == id);
        if(game != undefined){
            res.statusCode = 200
            res.json(game)
        }else{
            res.sendStatus(404)
        }        
    }   
})

app.post('/game', (req, res) =>{
    let {titulo, ano, preco} = req.body;
    let id = DB.games.length + 1

    DB.games.push({
        id: id,
        titulo,
        ano,
        preco, 

    });

    res.sendStatus(200)
})

app.delete('/game/:id',(req, res)=>{
    let id = Number(req.params.id)
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        let index = DB.games.findIndex(game => game.id == id);
        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200)

        }
    }
})

app.put('/game/:id', (req, res)=>{
    let id = Number(req.params.id) 
    if(isNaN(id)){ // se o id não for numero    
        res.sendStatus(400)
    }else{

        let game = DB.games.find(game => game.id == id);
        if(game != undefined){
            let {titulo, ano, preco} = req.body;
            if(titulo != undefined){
                game.titulo = titulo
            }
            if(ano != undefined){
                game.ano = ano
            } 
            if(preco != undefined){
                game.preco = preco
            }
            res.sendStatus(200)         

        }else{
            res.sendStatus(404)
        }        
    }   
})






app.listen(8081, ()=>{
    console.log("Servidor rodando na porta 8081")
})