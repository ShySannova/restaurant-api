function checkNull(ele){
    return (ele!==null && ele!==undefined && ele!=='') ? true : false ;
}

// delete data
function removeData(model, id,res){
   
    model.findByIdAndDelete(id)
    .then((data)=>{
        res.send({statusCode:200,message:`Delete sucessfully on this _id ${id} `,status:true});
    })
    .catch((err)=>{
        res.send({statusCode:404,message:"user not found",status:false,err});

    })

}

// Create Data

function create(model,data,res){
    console.log(model);
    model.create(data)
    .then((doc)=>{
        console.log(doc);
        res.send({statusCode:200,message:`Data Created Successfully `,status:true});
    })
    .catch((err)=>{
        res.send({statusCode:400,message:"Data already exists",status:false,err});

    })

}

// Read all Data
function getAll(model,res){
    model.find()
    .then((data)=>{
      res.status(200).send({success:true, data})
    })
    .catch((error)=>{
      res.status(404).send({success:false, message:"data not found"})
    })
}

//Read Own Data
function getOwnData(model,res,id){
    model.find({restaurant:id})
    .then((data)=>{
      res.status(200).send({success:true, data})
    })
    .catch((error)=>{
      res.status(404).send({success:false, message:"data not found"})
    })
}


// Read single Data
function getSingle(model,id,res){

     model.findById(id)
    .then((data)=>{
        res.status(200).send({success:true, data})
    })
    .catch((error)=>{
        res.status(404).send({success:false, message:"data not found"}) 
    })
}

// Sam response

/**
 * 
 * @param {Number} statusCode  send your status code
 * @param {String} message send your response message
 * @param {Boolean} success send your status as true or fasle
 * @param {*} res send the res param
 */
 function sendResponse(statusCode,message,success,res){
    res.send({statusCode:statusCode,message:message,success:success});
} 



module.exports = { removeData, create, getAll, getSingle, getOwnData, sendResponse};