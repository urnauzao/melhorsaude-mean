const express = require('express');
const app = express();
const medicos = require('./medicos');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

function requestListener(request, response){
    if(request.url === "/medicos"){
        response.writeHead(200, {"Content-Type" : "application/json"});
        response.write(JSON.stringify(medicos));
        response.end();
    }    
}

/** @method Post */
app.post('/medico', function(req,res){
    const data = req.body;
    if(!data){
        res.sendStatus(400);
    }

    medicos.create(data.clinica_id,data.nome,data.idade,data.especializacao,data.preco_consulta,data.telefone,data.email,data.whatsapp,data.foto);
    res.sendStatus(201);
})

/** @method GetAll */
app.get('/medicos', function(req,res){
    res.send(medicos.getAll());
});

/** @method GetOne */
app.get('/medico/:index', function(req,res){
    const indexData = req.params.index;
    res.send(medicos.getOne(indexData));
});

/** @method PUT */
app.put('/medico/:index', function(req,res){
    const data = req.body;
    const indexData = req.params.index;
    if(!data || !indexData){
        res.sendStatus(400);
    }

    medicos.update(data.clinica_id,data.nome,data.idade,data.especializacao,data.preco_consulta,data.telefone,data.email,data.whatsapp,data.foto, indexData);
    res.sendStatus(200);
});

/** @method Delete */
app.delete('/medico/:index', function (req, res){
    const indexData = req.params.index;
    if(!data || !indexData){
        res.sendStatus(400);
    }
    filmes.delete(indexData);
    res.sendStatus(200);
});

app.listen(8000, () => {
    console.log('Servidor rodando em http://127.0.0.1:8000/');
})