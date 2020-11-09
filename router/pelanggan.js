// inisiasi library
const express = require("express")
const app = express()

// cals models
const pelanggan = require("../models/index").pelanggan

// konsep middleware
app.use(express.urlencoded({extended:true}))

// endpoint akses data => GET
app.get("/", async(req,res) => {
        //ambil data
        pelanggan.findAll({
            include:["tarif"]
        })
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
        username: req.body.username,
        password: req.body.password,
        nomor_kwh: req.body.nomor_kwh,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat,
        id_tarif: req.body.id_tarif
    }

    //eksekusi insert data
    pelanggan.create(data)
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
        username: req.body.username,
        password: req.body.password,
        nomor_kwh: req.body.nomor_kwh,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat,
        id_tarif: req.body.id_tarif
    }
    
    //key data yg diubah
    let parameter = {
        id_pelanggan: req.body.id_pelanggan
    }

    //eksekusi update data
    pelanggan.update(data, {where: parameter})
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
app.delete("/:id_pelanggan", async(req,res) => {
    //variabel
    let id_pelanggan = req.params.id_pelanggan

    //konsep object 
    let parameter = {
        id_pelanggan: id_pelanggan
    }

    //execute delete data
    pelanggan.destroy({where: parameter})
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