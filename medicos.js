class Medico {
    constructor(
        clinica_id,
        nome,
        idade,
        especializacao,
        preco_consulta,
        telefone,
        email,
        whatsapp,
        foto
    ){
        this.clinica_id = clinica_id;
        this.nome = nome;
        this.idade = idade;
        this.especializacao = especializacao;
        this.preco_consulta = preco_consulta;
        this.telefone = telefone;
        this.email = email;
        this.whatsapp = whatsapp;
        this.foto = foto;
    }
}

const medicos = [
    new Medico(
        "1",
        "Zack Mounsey",
        "64",
        "Northstar RxLLC",
        "$105.56",
        "+353 (969) 563-5095",
        "zmounsey0@de.vu",
        "6069277643",
        "http://dummyimage.com/250x250.jpg/dddddd/000000"
    ), 
    new Medico(
        "2",
        "Lorain Robilart",
        "38",
        "IVAX Pharmaceuticals, Inc.",
        "$279.40",
        "+370 (623) 174-2258",
        "lrobilart1@yellowpages.com",
        "2269893208",
        "http://dummyimage.com/250x250.jpg/dddddd/000000"
    ), 
    new Medico(
        "3",
        "Wilhelmina Saur",
        "53",
        "Cadila Healthcare Limited",
        "$825.27",
        "+55 (267) 526-2638",
        "wsaur2@macromedia.com",
        "7967345731",
        "http://dummyimage.com/250x250.jpg/cc0000/ffffff"
    ), 
    new Medico(
        "4",
        "Shem Chomiszewski",
        "26",
        "Derma Sciences Canada, Inc.",
        "$208.88",
        "+62 (244) 232-8187",
        "schomiszewski3@twitpic.com",
        "6488840712",
        "http://dummyimage.com/250x250.jpg/dddddd/000000"
    )
];

function getAll(){
    return medicos;
}

function getOne(index){
    return medicos[index];
}

function create(clinica_id,nome,idade,especializacao,preco_consulta,telefone,email,whatsapp,foto){
    medicos.push(new Medico(clinica_id,nome,idade,especializacao,preco_consulta,telefone,email,whatsapp,foto))
}

function update(clinica_id,nome,idade,especializacao,preco_consulta,telefone,email,whatsapp,foto,indexUpdate){
    let medicoObject = new Medico(clinica_id,nome,idade,especializacao,preco_consulta,telefone,email,whatsapp,foto);

    medicos = medicos.map((medico,index) => {
        if(index === indexUpdate){
            return medicoObject;
        }
        return medico;
    });
}

function deleteMedico(indexDelete){
    medicos.splice(indexDelete, 1);
}

module.exports.medicos = medicos;
module.exports.getAll = getAll;
module.exports.getOne = getOne;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = deleteMedico;
