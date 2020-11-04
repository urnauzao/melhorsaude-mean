
const mongoose = require('mongoose');
const ServicoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: false
    },
    descricao: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    clinicas: {
        type: Array,
    }
});
mongoose.model('servicos', ServicoSchema);
module.exports = mongoose.model('servicos');

