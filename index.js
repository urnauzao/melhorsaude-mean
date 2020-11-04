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



/** @param MEDICO */
/** @method Post */
app.post('/medico', function(req,res){
    const data = req.body;
    if(!data){
        res.sendStatus(400);
    }
    new Medico(data).save()
        .then((medico) => res.send(medico))
        .catch(() => res.sendStatus(400))
});

/** @method PostWithClinica
 * @description "Para anexar uma clinica a um servico"
*/
app.post('/medico/clinica/:index', function(req,res){
    const data = req.body;
    const _id = req.params.index;
    if(!data){
        res.sendStatus(400);
    }
    new Medico(data).save()
        .then((medico) => {
            Clinica.findById(_id, function(err, clinica) {
                if (err) {
                    Medico.findByIdAndRemove(medico._id)
                        .then(() => res.sendStatus(404))
                        .catch(() => res.sendStatus(400));
                } else {
                    if( Object.keys(clinica).length === 0 && clinica.constructor === Object){
                        res.sendStatus(404)
                    }
                    for(const medicos of clinica.medicos){
                        if(medicos._id == medico._id ){
                            res.send({"Erro": "Médico já esta cadastrado nesta clinica"})
                        }
                    }
                    Clinica.findByIdAndUpdate(_id, { "$push": { "medicos" : medico } })
                        .then(() => res.sendStatus(201))
                        .catch((err) => res.sendStatus(err));
                }
            });
        })
        .catch(() => res.sendStatus(400));
});


/** @method GetAll */
app.get('/medicos', function(req,res){
    Medico.find()
        .then((medicos) => res.send(medicos))
        .catch(() => res.sendStatus(400));
});

/** @method GetOne */
app.get('/medico/:index', function(req,res){
    const _id = req.params.index;
    Medico.findById(_id)
        .then((medico) => res.send(medico))
        .catch(() => res.sendStatus(400));
});

/** @method PUT */
app.put('/medico/:index', function(req,res){
    const data = req.body;
    const _id = req.params.index;
    if(!data || !_id){
        res.sendStatus(400);
    }
    Medico.findByIdAndUpdate(_id, data)
        .then(( ) => res.sendStatus(200))
        .catch(() => res.sendStatus(400));
});

/** @method Delete */
app.delete('/medico/:index', function (req, res){
    const _id = req.params.index;
    if(!_id){
        res.sendStatus(400);
    }

    Medico.findByIdAndRemove(_id)
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
app.get('/clinica/:index', function(req,res){
    const _id = req.params.index;
    Clinica.findById(_id)
        .then((clinica) => res.send(clinica))
        .catch(() => res.sendStatus(400));
});
/** @method Post */
app.post('/clinica', function(req,res){
    const data = req.body;
    if(!data){
        res.sendStatus(400);
    }
    new Clinica(data).save()
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(400));
});
/** @method PostWithServico
 * @description "Para anexar uma clinica a um servico"
 */
app.post('/clinica/servico/:index', function(req,res){
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
                    if( Object.keys(servico).length === 0 && servico.constructor === Object){
                        res.sendStatus(404)
                    }
                    for(const clinicas of servico.clinicas){
                        if(clinicas._id == clinica._id ){
                            res.send({"Erro": "Clinica Já estava cadastrada neste servico"})
                        }
                    }
                    Servico.findByIdAndUpdate(_id, { "$push": { "clinicas" : clinica } })
                        .then(() => res.sendStatus(201))
                        .catch((err) => res.sendStatus(err));
                }
            });
        })
        .catch(() => res.sendStatus(400));
});

app.listen(8000, () => {
    console.log('Servidor rodando em http://127.0.0.1:8000/');
})