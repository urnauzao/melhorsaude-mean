const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

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
const Servico = require('./servicos');
const Clinica = require('./clinicas');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

/** @method Post */
app.post('/medico', function(req,res){
    const data = req.body;
    if(!data){
        res.sendStatus(400);
    }
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


/** @param Servicos */
/** @method GetAll */
app.get('/servicos', function(req,res){
    Servico.find()
        .then((servicos) => res.send(servicos))
        .catch(() => res.sendStatus(400));
});
/** @method GetOne */
app.get('/servicos/:index', function(req,res){
    const indexData = req.params.index;
    Servico.findById(indexData)
        .then((servico) => res.send(servico))
        .catch(() => res.sendStatus(400));
});
/** @method Post */
app.post('/servico', function(req,res){
    const data = req.body;
    if(!data){
        res.sendStatus(400);
    }
    new Servico(data).save()
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(400))
});


/** @param Clinicas */
/** @method GetAll */
app.get('/clinicas', function(req,res){
    Clinica.find()
        .then((clinicas) => res.send(clinicas))
        .catch(() => res.sendStatus(400));
});
/** @method GetOne */
app.get('/clinicas/:index', function(req,res){
    const indexData = req.params.index;
    Clinica.findById(indexData)
        .then((clinica) => res.send(clinica))
        .catch(() => res.sendStatus(400));
});
/** @method Post
 * @description "Para anexar uma clinica a um servico"
*/
app.post('/clinica/:index', function(req,res){
    const data = req.body;
    const _id = req.params.index;
    if(!data){
        res.sendStatus(400);
    }
    new Clinica(data).save()
        .then((clinica) => {
            Servico.findById(_id, function(err, servico) {
                if (err) {
                    Clinica.findByIdAndRemove(clinica._id)
                        .then(() => res.sendStatus(404))
                        .catch(() => res.sendStatus(400));
                } else {
                    // res.send({"servico": servico});
                    if( Object.keys(servico).length === 0 && servico.constructor === Object){
                        res.sendStatus(404)
                    }
                    for(const clinicas_id of servico.clinicas_id){
                        if(clinicas_id == clinica._id ){
                            // res.sendStatus(201);
                            res.send({"chegou": "Achou uma clinica igual ao id"})
                        }
                    }
                    servico.clinicas_id.push(clinica._id);
                    Servico.findByIdAndUpdate(_id, { $push: { "clinicas_id": [clinica._id] } });
                        
                    res.send({"servico": servico});
                }
            });




            // Servico.findById(servicoId)
            // .then((servico) => {
            //     res.send({"servico": servico});
            //     if( Object.keys(servico).length === 0 && servico.constructor === Object){
            //         res.sendStatus(404)
            //     }
            //     else{
            //         for(const clinicas_id of servico.clinicas_id){
            //             if(clinicas_id == clinica.id ){
            //                 // res.sendStatus(201);
            //                 res.send({"chegou": "Achou uma clinica igual ao id"})
            //             }
            //         }
            //         servico.clinicas_id.push(clinica.id);
            //         Servico.findByIdAndUpdate(servicoId, servico);
            //         res.send({"servico": servico});
            //     }
            // })
            // .catch(() => res.sendStatus(400));
            // res.send({"resultado": "so criou"});
            // // res.sendStatus(201);
        })
        .catch(() => res.sendStatus(400));
})












app.listen(8080, () => {
    console.log('Servidor rodando em http://127.0.0.1:8080/');
})