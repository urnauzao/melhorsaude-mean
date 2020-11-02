const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/melhor_saude_mean', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch((err)  =>  console.error("Erro ao  conectar  com  o MongoDB "+err))

//Models
const Medico = require('./medicos');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// function requestListener(request, response){
//     if(request.url === "/medicos"){
//         response.writeHead(200, {"Content-Type" : "application/json"});
//         response.write(JSON.stringify(medicos));
//         response.end();
//     }    
// }

/** @method Post */
app.post('/medico', function(req,res){
    const data = req.body;
    if(!data){
        res.sendStatus(400);
    }

    // medicos.create(data.clinica_id,data.nome,data.idade,data.especializacao,data.preco_consulta,data.telefone,data.email,data.whatsapp,data.foto);
    // res.sendStatus(201);

    new Medico(data).save()
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(400))
})

/** @method GetAll */
app.get('/medicos', function(req,res){
    // res.send(medicos.getAll());
    Medico.find()
        .then((medicos) => res.send(medicos))
        .catch(() => res.sendStatus(400));
});

/** @method GetOne */
app.get('/medico/:index', function(req,res){
    const indexData = req.params.index;
    // res.send(medicos.getOne(indexData));
    Medico.findById(indexData)
        .then((medico) => res.send(medico))
        .catch(() => res.sendStatus(400));
});

/** @method PUT */
app.put('/medico/:index', function(req,res){
    const data = req.body;
    const indexData = req.params.index;
    if(!data || !indexData){
        res.sendStatus(400);
    }

    // medicos.update(data.clinica_id,data.nome,data.idade,data.especializacao,data.preco_consulta,data.telefone,data.email,data.whatsapp,data.foto, indexData);
    // res.sendStatus(200);
    Medico.findByIdAndUpdate(indexData, data)
        .then(( ) => res.sendStatus(200))
        .catch(() => res.sendStatus(400));
});

/** @method Delete */
app.delete('/medico/:index', function (req, res){
    const indexData = req.params.index;
    if(!data || !indexData){
        res.sendStatus(400);
    }
    // filmes.delete(indexData);
    // res.sendStatus(200);

    Medico.findByIdAndRemove(indexData)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400));
});

app.listen(8000, () => {
    console.log('Servidor rodando em http://127.0.0.1:8000/');
})