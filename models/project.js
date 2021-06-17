'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,
    description: String,
    linkGit: String,
    linkDeploy: String,
    lenguajes: [String],
    year: Number,
    image: Object
});

module.exports = mongoose.model('Project', ProjectSchema);
// projects --> guarda los documentos en la coleccion