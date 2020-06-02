const Subcategory = require("../models/subcategory");

exports.getSubcategoryById = (req, res, next, id) => {
  Subcategory.findById(id).exec((err, subc) => {
    if (err) {
      return res.status(400).json({
        error: "Sub category not found in DB"
      });
    }
    req.subcategory = subc;
    next();
  });
};

exports.createSubcategory = (req, res) => {
  const subcategory = new Subcategory(req.body);
  subcategory.save((err, subcategory) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save sub category in DB"
      });
    }
    res.json({ subcategory });
  });
};

exports.getSubcategory = (req, res) => {
  return res.json(req.subcategory);
};

exports.getAllSubCategory = (req, res) => {
  Subcategory.find().exec((err, subcategories) => {
    if (err) {
      return res.status(400).json({
        error: "NO sub categories found"
      });
    }
    res.json(subcategories);
  });
};

exports.updateSubCategory = (req, res) => {
  const subcategory = req.subcategory;
  subcategory.name = req.body.name;

  subcategory.save((err, updatedSubCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update sub category"
      });
    }
    res.json(updatedSubCategory);
  });
};

exports.removeSubCategory = (req, res) => {
  const subcategory = req.subcategory;

  subcategory.remove((err, subcategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });
};
