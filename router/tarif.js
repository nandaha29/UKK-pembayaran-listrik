// inisiasi library
const express = require("express")
const app = express()

// cals models
const tarif = require("../models/index").tarif

// konsep middleware
app.use(express.urlencoded({extended:true}))

// endpoint akses data => GET
app.get("/", async(req,res) => {
        //ambil data
        tarif.findAll()
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

// endpoint simpan data => POST
app.post("/", async(req,res) => {
    //tampung data masuk
    let data = {
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }

    //eksekusi insert data
    tarif.create(data)
    .then(result => {
        res.json({
            message: "Data has been inserted",
            data: result            
        })
    })
    .catch(error => {
        res.json({
            message: error.message            
        })
    })
})

// end-point update data => PUT
app.put("/", async(req,res) => {
    //tampung data 
    let data = {
        daya: req.body.daya,
        tarifperkwh: req.body.tarifperkwh
    }
    
    //key data yg diubah
    let parameter = {
        id_tarif: req.body.id_tarif
    }

    //eksekusi update data
    tarif.update(data, {where: parameter})
    .then(result => {
        res.json({
            message: "Data has been updated",
            data: result            
        })
    })
    .catch(error => {
        res.json({
            message: error.message            
        })
    })
})

// end-point hapus data => DELETE
app.delete("/:id_tarif", async(req,res) => {
    //variabel
    let id_tarif = req.params.id_tarif

    //konsep object 
    let parameter = {
        id_tarif: id_tarif
    }

    //execute delete data
    tarif.destroy({where: parameter})
    .then(result => {
        res.json({
            message: "Data has been destroyed",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app