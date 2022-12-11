//importing bcryptjs
const productModel = require("../model/product");

//importing create function from include
const { sendResponse, create, getAll, getSingle, removeData, getOwnData } = require('../include/inc_func');

//create product function
function createProduct(req, res) {

    let productData = req.body;

    create(productModel, productData, res);

}

//fetch all products
function fetchAll(req, res) {

    getAll(productModel, res);
    
}

//fetch Owned products
function fetchOwned(req,res){
    let id = req.params.id
    getOwnData(productModel,res,id)
}

//fetch single product
function fetchSingle(req, res) {
    
    let id = req.params.id
    getSingle(productModel, id, res);
    
}

//  update data function
function update(req, res) {

    let id = req.params.id;
    let newData = req.body;
  
    productModel.findByIdAndUpdate(id, newData, (err, doc) => {
      if (!err) {
          sendResponse(200,"data updated",true,res)
      } else {
          sendResponse(400,"some error, please try again",true,res)
          console.log(err)
      }
    })
  
}

function trash(req,res){
    let id = req.params.id
    removeData(productModel, id, res)
}





//exporting custom functions
module.exports = { createProduct, fetchAll, fetchOwned, fetchSingle, update, trash };
