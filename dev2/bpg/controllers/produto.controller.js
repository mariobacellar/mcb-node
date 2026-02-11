const Product = require('../models/produto.model');


// Create and Save a new Note
exports.new = (req, res) => {
    console.log("exports.new ");
    res.render("produto-new");
};



// Create and Save a new Note
exports.create = (req, res) => {

    console.log("req.params.id=["+req.params.id+"]");
    console.log("req.body=["+JSON.stringify(req.body)+"]");

    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({ message: "Product content can not be empty" });
    // }

    // Create a Product
    let product = new Product({
        nome     : req.body.fieldNome      ,
        categoria: req.body.fieldCategoria ,
        pcusto   : req.body.fieldPcusto    ,
        pvenda   : req.body.fieldPvenda    ,
        qtd      : req.body.fieldQtd
    });

    // Save Product in the database
    product.save().then(data => {
        Product.find().then(data => {
            res.render("produto-list", {produtos:data});
        }).catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving product." });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while creating the Product." });
    });

};


// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
    console.log("Retrieve and return all products from the database.");
    Product.find().then(data => {
        res.render("produto-list", {produtos:data});
    }).catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving product." });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

    console.log("req.params.id=["+req.params.id+"]");

    Product.findById(req.params.id).then(data => {
        
        if(!data) {
            return res.status(404).send({ message: "Product not found with id " + req.params.id });            
        }

//      res.send(data);
        res.render("produtoForm", {produto:data} );

    }).catch(err => {
        
        if(err.kind === 'ObjectId') {

            return res.status(404).send({ message: "Product not found with id " + req.params.id });                
        
        };

        return res.status(500).send({ message: "Error retrieving product with id " + req.params.id });

    });
};


// Find a single note with a noteId
exports.edit = (req, res) => {

    Product.findById(req.params.id).then(data => {
        
        if(!data) {
            return res.status(404).send({ message: "Product not found with id " + req.params.id });            
        }

        res.render("produto-edit", {produto:data} );

    }).catch(err => {
        
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ message: "Product not found with id " + req.params.id });                
        };

        return res.status(500).send({ message: "Error retrieving product with id " + req.params.id });

    });
};



// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // // Validate Request
    // if(!req.body.content) {
    //     return res.status(400).send({ message: "Product content can not be empty" });
    // }

    // Create a Product
    let product = {
        _id      : req.params.id           ,
        nome     : req.body.fieldNome      ,
        categoria: req.body.fieldCategoria ,
        pcusto   : req.body.fieldPcusto    ,
        pvenda   : req.body.fieldPvenda    ,
        qtd      : req.body.fieldQtd
    };


    console.log("$$$-req.body=["+JSON.stringify(req.body)+"]");
    console.log("$$$-product("+req.params.id+")=[" +JSON.stringify(product)+"]");

    // Find note and update it with the request body
    // Product.findById(req.params.id)
    Product.findByIdAndUpdate(req.params.id, {$set:product}, {new: true}).then(data => {
        
        if(!data) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.noteId
            });
        }

        Product.find().then(data => {
            console.log("$$$$produto-list");
            res.render("produto-list", {produtos:data});
        }).catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving product." });
        });

    }).catch(err => {
        
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ message: "Product not found with id " + req.params.noteId });                
        }
        
        return res.status(500).send({ message: "Error updating note with id " + req.params.noteId });

    });
};



// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    console.log("$$$[delete] - req.params.id=["+req.params.id+"]");
    console.log("$$$[delete] - req.body=["+JSON.stringify(req.body)+"]");

    Product.findByIdAndRemove(req.params.id).then(data=> {

        if(!data) {
            return res.status(404).send({ message: "Product not found with id " + req.params.id });
        }

        //res.send({message: "Product deleted successfully!"});

        Product.find().then(data => {
            res.render("produto-list", {produtos:data});
        }).catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving product." });
        });


    }).catch(err => {

        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({ message: "Product not found with id " + req.params.noteId });                
        }

        return res.status(500).send({ message: "Could not delete note with id " + req.params.noteId });

    });
};



/*

exports.createProduct = function (req, res, next) {
	
    let product = new Product({
        nome     : req.body.fieldNome      ,
        categoria: req.body.fieldCategoria ,
        pcusto   : req.body.fieldPcusto    ,
        pvenda   : req.body.fieldPvenda    ,
        qtd      : req.body.fieldQtd
    });

    console.log("req.body - " + JSON.stringify(req.body) );
    console.log("product  - " + product );

	product.save(function (err) {
		if (err)return next(err);

        Product.find(function (err, produtos) {
            if (err) return next(err);
            res.render("produtoList", {produtos:produtos} );
        });
	});
};


exports.detailProduct = function (req, res, next) {
    Product.findById(req.params.id, function (err, produto) {
        if (err) return next(err);
        res.render("produtoForm", {produto:produto} );
    })
};

exports.listProduct = function (req, res, next) {
    Product.find(function (err, produtos) {
        if (err) return next(err);
        res.render("produtoList", {produtos:produtos} );
    })
};

exports.newProduct = function (req, res) {
    res.render("produtoForm", {produto:{}});
};


exports.updateProduct = function (req, res, next) {


    let product = new Product({
        nome     : req.body.fieldNome      ,
        categoria: req.body.fieldCategoria ,
        pcusto   : req.body.fieldPcusto    ,
        pvenda   : req.body.fieldPvenda    ,
        qtd      : req.body.fieldQtd
    });

    console.log("updateProduct - req.params.id = ["+req.params.id+"]");
    console.log("req.body      - " + JSON.stringify(req.body) );
    console.log("product  - " + product );

    Product.findByIdAndUpdate(req.params.id, {$set: product}, function (err, product) {
        if (err) return next(err);
        Product.find(function (err, produtos) {
            if (err) return next(err);
            res.render("produtoList", {produtos:produtos} );
        });
    });
};


exports.deleteProduct = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {

        if (err) return next(err);

        Product.find(function (err, produtos) {
            if (err) return next(err);
            res.render("produtoList", {produtos:produtos} );
        });
    });
};

*/