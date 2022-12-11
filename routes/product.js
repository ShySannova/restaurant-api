//importing express
const express = require("express");

//setting router
const router = express.Router();

// Controller Imports
const { createProduct, fetchAll, fetchSingle, update, trash, fetchOwned } = require("../controller/product");

// endpoint path with controller function
router.post("/add",createProduct);
router.get("/all",fetchAll);
router.get("/own/:id",fetchOwned)
router.get("/:id",fetchSingle);
router.patch("/:id",update)
router.delete("/:id", trash)



//exporting router
module.exports =router;