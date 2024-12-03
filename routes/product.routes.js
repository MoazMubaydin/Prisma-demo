const express = require("express");
const router = express.Router();

const prisma = require("../db/index");

router.post("/products", async (req, res, next) => {
  const { name, description, price, quantity, category, imageUrl, sellerId } =
    req.body;

  const newProduct = {
    name,
    description,
    price,
    quantity,
    category,
    imageUrl,
    sellerId,
  };
  try {
    const product = await prisma.product.create({ data: newProduct });
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in POST // api/products", error);
    res.status(500).json({ message: "Error creating new product" });
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { user: true },
    });
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in GET // api/products", error);
    res.status(500).json({ message: "Error getting products from DB" });
  }
});

router.get("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { user: true },
    });
    res.status(200).json(product);
  } catch (error) {
    console.log("Error in GET // api/products/productID", error);
    res.status(500).json({ message: "Error getting product from DB" });
  }
});

router.patch("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;

  const { name, description, price, quantity, category, imageUrl, sellerId } =
    req.body;

  const updatedProduct = {
    name,
    description,
    price,
    quantity,
    category,
    imageUrl,
    sellerId,
  };
  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: updatedProduct,
    });

    res.status(200).json(product);
  } catch (error) {
    console.log("Error in PATCH // api/products/productId", error);
    res.status(500).json({ message: "Error updating product" });
  }
});

router.delete("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = prisma.product.delete({ where: { id: productId } });
    res.status(200).json({
      message: `${product.name} with id of ${productId} has been deleted successfully`,
    });
  } catch (error) {
    console.log("Error in DELETE // api/products/productId", error);
    res.status(500).json({ message: "Error deleting product from DB" });
  }
});

module.exports = router;
