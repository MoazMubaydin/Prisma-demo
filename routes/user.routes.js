const express = require("express");
const router = express.Router();

const prisma = require("../db/index");

router.post("/users", async (req, res, next) => {
  const { name, email, phone, imageUrl } = req.body;

  const newUser = {
    name,
    email,
    phone,
    imageUrl,
  };
  try {
    const user = await prisma.user.create({ data: newUser });
    res.status(201).json(user);
  } catch (error) {
    console.log("Error in POST // api/users", error);
    res.status(500).json({ message: "Error creating new user" });
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const user = await prisma.user.findMany();
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in GET // api/users", error);
    res.status(500).json({ message: "Error getting users from DB" });
  }
});

router.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in GET // api/users/userId", error);
    res.status(500).json({ message: "Error getting user from DB" });
  }
});

router.patch("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;

  const { name, email, phone, imageUrl } = req.body;

  const updatedUser = {
    name,
    email,
    phone,
    imageUrl,
  };
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updatedUser,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in PATCH // api/users/userId", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

router.delete("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = prisma.user.delete({ where: { id: userId } });
    res.status(200).json({
      message: `${user.name} with id of ${userId} has been deleted successfully`,
    });
  } catch (error) {
    console.log("Error in DELETE // api/users/userId", error);
    res.status(500).json({ message: "Error deleting user from DB" });
  }
});

module.exports = router;
