const Category = require("../model/category");
const _ = require("underscore");

let getAllCategory = (req, res) => {
  Category.find({})
    .sort('description')
    .populate('Usuario','nombre email')
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          error: err
        });
      }

      res.status(200).json({
        ok: true,
        myData : data
      });
    });
};

let getByIdCategory = (req, res) => {
  const { id } = req.params;

  Category.findById(id, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: err
      });
    } else {
      res.status(200).json({
        ok: true,
        data
      });
    }
  });
};

let createCategory = (req, res) => {
  const usuario = req.data._id;
  const { description } = req.body;

  const category = new Category({
    description,
    usuario
  });

  category.save((err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: err
      });
    }
    if (!data) {
      return res.status(400).json({
        ok: false,
        error: err
      });
    } else {
      res.status(200).json({
        ok: true,
        data
      });
    }
  });
};

let updateCategory = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const dataUpdate = {
    description: body.description
  };
  //console.log(dataUpdate);

  Category.findByIdAndUpdate(id, dataUpdate, { new: true }, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: err
      });
    }
    if (err) {
      return res.status(400).json({
        ok: false,
        error: err
      });
    } else {
      console.log(data);

      res.status(200).json({
        ok: true,
        data
      });
    }
  });
};

let deleteCategory = (req, res) => {
  const { id } = req.params;

  Category.findByIdAndDelete(id, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        error: err
      });
    } else {
      console.log(data);

      res.status(200).json({
        ok: true,
        data
      });
    }
  });
};

module.exports = {
  getAllCategory,
  getByIdCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
