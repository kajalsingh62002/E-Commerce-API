const Product = require('../models/product');

// function to show all the products
module.exports.products = async function (req, res) {
  try {
    const foundProducts = await Product.find({});
    res.send(foundProducts);
  } catch (err) {
    res.send(err);
  }
};

// function to create a new product
module.exports.create = async function (req, res) {
  const newProduct = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
  });

  try {
    await newProduct.save();
    res.send('New product added successfully.');
  } catch (err) {
    res.send(err);
  }
};

// function to delete a product using its ID
module.exports.delete = async function (req, res) {
  try {
    await Product.deleteOne({ _id: req.params.productID });
    res.send({ message: 'Product deleted' });
  } catch (err) {
    res.send(err);
  }
};

// function to update a product's quantity
module.exports.updateQuantity = async function (req, res) {
  const ID = req.params.productID;

  try {
    const found = await Product.findById(ID);
    const newQty = parseInt(found.quantity) + parseInt(req.query.number);

    const updatedProduct = await Product.findByIdAndUpdate(ID, {
      quantity: newQty,
    });

    updatedProduct.quantity = newQty;
    res.send({
      product: updatedProduct,
      message: 'Updated successfully',
    });
  } catch (err) {
    res.send(err);
  }
};
