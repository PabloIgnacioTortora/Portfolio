"use strict";
var Project = require("../models/project");
var fs = require("fs");
var path = require('path');

var controller = {
  home: function (req, res) {
    return res.status(200).send({
    });
  },
  test: function (req, res) {
    return res.status(200).send({
      message: "Test del controador de projects",
    });
  },

  // Guarda un proyecto
  saveProject: function (req, res) {
    var project = new Project();

    var params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.linkGit = params.linkGit;
    project.linkDeploy = params.linkDeploy;
    project.year = params.year;
    project.lenguajes = params.lenguajes;
    project.image = params.image;

    project.save((err, projectStored) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al guardar el documento" });
      if (!projectStored)
        return res
          .status(404)
          .send({ message: "No se ah podido guardar el proyecto" });
      return res.status(200).send({ project: projectStored });
    });
  },

  //Mostrar un documento segun su Id
  getProject: function (req, res) {
    var projectId = req.params.id;
    if (projectId == null)
      return res.status(404).send({ message: "El proyecto no existe" });
    Project.findById(projectId, (err, project) => {
      if (err)
        return res.status(500).send({ message: "Error al devolver los datos" });
      if (!project)
        return res.status(404).send({ message: "El proyecto no existe" });
      return res.status(200).send({
        project,
      });
    });
  },

  // Listar los documentos en la base de datos
  getProjects: function (req, res) {
    Project.find({}).exec((err, projects) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al devolver los datos." });
      if (!projects)
        return res
          .status(404)
          .send({ message: "No hay proyectos para mostrar." });
      return res.status(200).send({ projects });
    });
  },

  // Actulizar un documento en la base de datos
  updateProject: function (req, res) {
    var projectId = req.params.id;
    var update = req.body;

    Project.findByIdAndUpdate(
      projectId,
      update,
      { new: true },
      (err, projectUpdated) => {
        if (err)
          return res.status(500).send({ message: "Error al actualizar" });

        if (!projectUpdated)
          return res.status(404).send({ message: "No existe el proyecto." });
        return res.status(200).send({ project: projectUpdated });
      }
    );
  },

  deleteProject: function (req, res) {
    var projectId = req.params.id;
    Project.findByIdAndDelete(projectId, (err, projectRemoved) => {
      if (err)
        return res
          .status(500)
          .send({ message: "No se a podido eliminar el proyecto" });
      if (!projectRemoved)
        return res
          .status(404)
          .send({ message: "No se puede eliminar el proyecto" });
      return res.status(200).send({
        project: projectRemoved,
      });
    });
  },

  // Subir imagenes al documento
  uploadImage: function (req, res) {
    var projectId = req.params.id;

    if (req.files) {
      var filePath = req.files.image.path;
      var fileSplit = filePath.split("\\");
      var fileName = fileSplit[1];
      var extSplit = fileName.split("\.");
      var fileExt = extSplit[1];
      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        Project.findByIdAndUpdate(
          projectId,
          { image: fileName },
          { new: true },
          (err, projectUpdated) => {
            if (err)
              return res
                .status(200)
                .send({ message: "La imagen no se ha subido" });
            if (!projectUpdated)
              return res.status(404).send({
                message: "El projecto no exite y no se ha asignado la imagen",
              });
            return res.status(200).send({
              project: projectUpdated,
            });
          }
        );
      } else {
          fs.unlink(filePath, (err) => {
              return res.status(200).send({ message: 'La extencion no es valida' });
          }); 
      }
    } else {
      return res.status(200).send({
        message: res.file,
      });
    }
  },

  getImageFile: function (req, res) {
    var file = req.params.image;
    var path_file = './upload/' + file;
    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(200).send({
          message: "No exixte la imagen"
        });

      }
    });
  }
};

module.exports = controller;
