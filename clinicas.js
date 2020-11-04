
const mongoose = require('mongoose');
const ClinicaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    url_imagem: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    whatsapp: {
        type: Number,
    },
    descricao: {
        type: String
    },
    local_resumido: {
        type: String
    },
    logradouro: {
        type: String
    },
    num_endereco: {
        type: String
    },
    complemento: {
        type: String
    },
    cep: {
        type: String
    },
    cidade: {
        type: String
    },
    bairro: {
        type: String
    },
    estado: {
        type: String
    },
    pais: {
        type: String
    },
    medicos: {
        type: Array
    }
});
mongoose.model('clinicas', ClinicaSchema);
module.exports = mongoose.model('clinicas');

