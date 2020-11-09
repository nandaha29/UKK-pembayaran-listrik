// inisiasi library
const express = require("express")
const app = express()

// cals models
const level = require("../models/index").level

// konsep middleware
app.use(express.urlencoded({extended:true}))

// endpoint akses data => GET
app.get("/", async(req,res) => {
        //ambil data
        level.findAll()
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
        nama_level: req.body.nama_level
    }

    //eksekusi insert data
    level.create(data)
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
        nama_level: req.body.nama_level
    }
    
    //key data yg diubah
    let parameter = {
        id_level: req.body.id_level
    }

    //eksekusi update data
    level.update(data, {where: parameter})
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
app.delete("/:id_level", async(req,res) => {
    //variabel
    let id_level = req.params.id_level

    //konsep object 
    let parameter = {
        id_level: id_level
    }

    //execute delete data
    level.destroy({where: parameter})
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