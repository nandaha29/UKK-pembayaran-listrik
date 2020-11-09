// inisiasi library
const express = require("express")
const app = express()

// cals models
const tagihan = require("../models/index").tagihan
const penggunaan = require("../models/index").penggunaan

// konsep middleware
app.use(express.urlencoded({extended:true}))

// endpoint akses data => GET
app.get("/", async(req,res) => {
        //ambil data
        tagihan.findAll({
            include:["penggunaan"]
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

    let param = {id_penggunaan: req.body.id_penggunaan}

    // Penjumlahan jumlah_meter
    let dataPenggunaan = await penggunaan.findOne({ where: param})
    let jumlahMeter = dataPenggunaan.meter_akhir - dataPenggunaan.meter_awal
    
    //tampung data masuk
    let data = {
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumlah_meter: jumlahMeter,
        status: req.body.status
    }

    //eksekusi insert data
    tagihan.create(data)
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
        id_penggunaan: req.body.id_penggunaan,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        jumlah_meter: req.body.jumlah_meter,
        status: req.body.status
    }
    
    //key data yg diubah
    let parameter = {
        id_tagihan: req.body.id_tagihan
    }

    //eksekusi update data
    tagihan.update(data, {where: parameter})
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
app.delete("/:id_tagihan", async(req,res) => {
    //variabel
    let id_tagihan = req.params.id_tagihan

    //konsep object 
    let parameter = {
        id_tagihan: id_tagihan
    }

    //execute delete data
    tagihan.destroy({where: parameter})
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