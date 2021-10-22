const express = require('express');
const route = express.Router();
const Customer = require('../../models/CustomerModel');

route.post('/add', async (req, res, next) => {
    try {
        const data = await Customer.create({...req.body})
        console.log("===>>>", data)
        return res.status(201).json({ data })
    } catch (e) {
        console.log(e);
        return next(e)
    }

});
route.get('/getall', async (req, res, next) => {
    try {
        const data = await Customer.find()
        console.log("===>>>", data)
        return res.status(201).json({ data })
    } catch (e) {
        console.log(e);
        return next(e)
    }

});

//$Match: it will giv us the data that condition matches
//$project − Used to select some specific fields from a collection.
//$group − grouped the documents
//$sort − Sorts the documents.
//$skip - This operation skips the first mentioned documents passed to it by the pipeline
//limit  - This operation show the first mentioned documents passed to it by the pipeline
route.get('/match', async (req, res, next) => {
    try {
        const data = await Customer.aggregate([
             { $match: { city: "islamabad" } },
            //  { $group: { _id: '$city', totaldocs: { $sum: 1 } } },
           //  { $match: { age: { $lt:30,$gte:10} } },
           //  { $project: { _id: 0, age: 1, city: 1, name: 1 } },
           // { $skip: 1 }
            //  { $limit : 2 }
        ])
        console.log("===>>>", data)
        return res.status(201).json({ data })
    } catch (e) {
        console.log(e);
        return next(e)
    }

});

module.exports = route;