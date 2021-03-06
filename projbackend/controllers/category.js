const Category = require("../models/category");

exports.getCategorybyId = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Not able to save category in DB",
      });
    }
    category.createdAt = undefined;
    category.updatedAt = undefined;
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found in database",
      });
    }

    res.json(category);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  // console.log(req);
  category.save((err, updatedCategory) => {
    if (err) {
      // console.log(err);
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    category.createdAt = undefined;
    category.updatedAt = undefined;
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete category",
      });
    }
    res.json({
      message: "Category is deleted successfully",
    });
  });
};
