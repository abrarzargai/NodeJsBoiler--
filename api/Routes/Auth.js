const express = require('express');
const route = express.Router();
const axios = require('axios');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const Services = require('../../models/Services');
// const file = require('../../../../Book1.xlsx')

// route.post('/', async (req, res, next) => {
//     try {
//         console.log(req.body)
//         const lat = `${req.body.lat}` || "-33.8670522"
//         const lng = `${req.body.lng}` || "151.1957362"
//         const Record = await axios.get(
//             `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&keyword=cruise&key=AIzaSyA_FkaqpqSIEibYl-IqOfosLNYfSOeeo9I`
//         )

//         const data = Record.data.results
//         console.log("===>>>", data)
//         return res.status(201).json({ data })
//     } catch (e) {
//         console.log(e);
//         return next(e)
//     }

// });
route.get('/excel', async (req, res, next) => {
    try {
        console.log("HIT")

        const result = excelToJson({
            sourceFile: 'Book1.xlsx'
        });

        console.log("===>>>", result)
        return res.status(201).json({ success: true })
    } catch (e) {
        console.log(e);
        return next(e)
    }

});
route.post('/ref', async (req, res, next) => {
    try {
        console.log("HIT")
        const data = await Services.create({ ...req.body })
        console.log("===>>>", data)

        return res.status(201).json({ success: true, data })
    } catch (e) {
        console.log(e);
        return next(e)
    }

});

route.get('/get/ref', async (req, res, next) => {
    try {
        console.log("HIT")
        // const data = await Services.find().populate('person')
        const data = await Services.aggregate([
            {
                $lookup:
                {
                    from: 'customers',
                    localField:'person',
                    foreignField:'_id',
                    as:'Customers'
                 },
                
            }
        ])
        console.log("===>>>", data)

        return res.status(201).json({ success: true, data })
    } catch (e) {
        console.log(e);
        return next(e)
    }

});

route.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const lat = `${req.body.lat}` || "-33.8670522"
        const lng = `${req.body.lng}` || "151.1957362"
        const Record = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&keyword=cruise&key=AIzaSyA_FkaqpqSIEibYl-IqOfosLNYfSOeeo9I`
        )    
        const data = Record.data.results
        const PlaceIdArray =[]

       const finalwait = data.map(async(a)=>{
            const Responce = await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${a.place_id}&key=AIzaSyA_FkaqpqSIEibYl-IqOfosLNYfSOeeo9I`
        )
           PlaceIdArray.push(Responce.data.result)
        })
        
        await Promise.all(finalwait)

        return res.status(201).json(PlaceIdArray )
    } catch (e) {
        console.log(e);
        return next(e)
    }

});


module.exports = route;