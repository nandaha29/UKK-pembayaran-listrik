// inisiasi library
const express = require("express")
const app = express()

// cals models
const penggunaan = require("../models/index").penggunaan

// konsep middleware
app.use(express.urlencoded({extended:true}))

// endpoint akses data => GET
app.get("/", async(req,res) => {
        //ambil data
        penggunaan.findAll({
            include:["pelanggan"]
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
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }

    //eksekusi insert data
    penggunaan.create(data)
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
        id_pelanggan: req.body.id_pelanggan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        meter_awal: req.body.meter_awal,
        meter_akhir: req.body.meter_akhir
    }
    
    //key data yg diubah
    let parameter = {
        id_penggunaan: req.body.id_penggunaan
    }

    //eksekusi update data
    penggunaan.update(data, {where: parameter})
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
app.delete("/:id_penggunaan", async(req,res) => {
    //variabel
    let id_penggunaan = req.params.id_penggunaan

    //konsep object 
    let parameter = {
        id_penggunaan: id_penggunaan
    }

    //execute delete data
    penggunaan.destroy({where: parameter})
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
