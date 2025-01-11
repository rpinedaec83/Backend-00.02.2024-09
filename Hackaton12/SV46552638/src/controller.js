const url = require("url");
const { bodyParser } = require("./midd/bodyParser.js");
const database = [
{
    "id": "1",
    "name": "item 1",
    "description": "itemd escription 1",
    "date": "2024-12-15",
    "isCompleted": true
},
{
    "id": "2",
    "name": "item 2",
    "description": "item description 2",
    "date": "2024-12-15",
    "isCompleted": false
},
{
    "id": "3",
    "name": "item 3",
    "description": "item description 3",
    "date": "2024-12-18",
    "isCompleted": true
},
{
    "id": "4",
    "name": "item 4",
    "description": "item description 5",
    "date": "2024-12-20",
    "isCompleted": false
},
{
    "id": "5",
    "name": "item 5",
    "description": "item description 5",
    "date": "2024-12-21",
    "isCompleted": true
}];

//  listar compras
exports.getBuys = function(req, res) {
    let response = [
        {
            "message": "All Buys"
        },
        database
    ]
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
}

// Crear compra
exports.createBuys = async function(req, res) {
    await bodyParser(req);
    database.push(req.body);
    let response = [
        {
            "message": "Created a Buys"
        },
        database,
    ];
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}

// Actualizar Compra
exports.updateBuys = async function(req, res) {
    const urlParse = url.parse(req.url, true);

    const idQuery = urlParse.path.split("?")[1];
    const key = idQuery.split("=")[0];
    const value = idQuery.split("=")[1];

    if (key === "id") {
        await bodyParser(req);
        database[value - 1] = req.body;
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({"message": "An buy has been updated"}));
    } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({"message": "Wrong request query"}));
    }

}

// eliminar Comprra 
exports.deleteBuys = async function(req, res) {
    const urlParse = url.parse(req.url, true);

    const idQuery = urlParse.path.split("?")[1];
    const key = idQuery.split("=")[0];
    const value = idQuery.split("=")[1];

    if (key === "id") {
        database.splice(value - 1, 1);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({"message": "An Buy has been deleted"}));
    } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({"message": "Wrong request query"}));
    }

}

//  Listar Completados 
exports.getBuysCompleted = function(req, res) {
    
    const completedBuys = database.filter(item => item.isCompleted === true);
    
    let response = [
        {
            "message": "All buys completed"
        },
        completedBuys
    ]
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
}


//  Listar faltantes
exports.getBuysUncompleted = function(req, res) {

    const completedBuys = database.filter(item => item.isCompleted === false);
    
    let response = [
        {
            "message": "All buys uncompleted"
        },
        completedBuys
    ]
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
}