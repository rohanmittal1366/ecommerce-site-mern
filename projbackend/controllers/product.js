const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //destructure the fields
    const { name, discription, price, category, stock } = fields;

    if (!name || !discription || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save photo in db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving tshirt is DB failed",
        });
      }
      product.createdAt = undefined;
      product.updatedAt = undefined;
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  product.createdAt = undefined;
  product.updatedAt = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // updation code for product
    let product = req.product;
    product = _.extend(product, fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save photo in db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of  product in DB failed",
        });
      }
      product.createdAt = undefined;
      product.updatedAt = undefined;
      res.json(product);
    });
  });
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedproduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete product",
      });
    }
    res.json({
      message: "product is deleted sucessfully",
    });
  });
};

// product listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "acs"]])
    .limit(limit)
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      product.createdAt = undefined;
      product.updatedAt = undefined;
      res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
