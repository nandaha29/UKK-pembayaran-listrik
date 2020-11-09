// inisiasi library
const express = require("express")
const app = express()

// tools auth
const md5 = require("md5")

// tools upload foto
const multer = require("multer") 
const path = require("path")
const fs = require("fs")

// isi tanggal secara otomatis
let tanggal = new Date()

// cals models
const pembayaran = require("../models/index").pembayaran
const tagihan = require('../models/index').tagihan
const tarif = require('../models/index').tarif
const pelanggan = require("../models/index").pelanggan
const penggunaan = require("../models/index").penggunaan

// konsep middleware
app.use(express.urlencoded({extended:true}))

// pengaturan File simpan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image/bukti")
    },
    filename: (req, file, cb) => {
        cb(null, "bukti-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

// authentication
const verifyToken = require("./verifyToken")
app.use(verifyToken)

// endpoint akses data => GET
app.get("/", async(req,res) => {
        //ambil data
        pembayaran.findAll({
            include: [{ all:true, nested: true}]
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
app.post("/", upload.single("bukti"), async(req,res) => {

    let param = {id_tagihan: req.body.id_tagihan}

    // Penjumlahan total_bayar
    let dataTagihan = await tagihan.findOne({ where: param}) 
    param = {id_penggunaan: dataTagihan.id_penggunaan}
    let dataPengguna = await penggunaan.findOne({ where: param})  
    param = {id_pelanggan: dataPengguna.id_pelanggan}
    let dataPelanggan = await pelanggan.findOne({ where: param})
    param = {id_tarif: dataPelanggan.id_tarif}
    let dataTarif = await tarif.findOne({ where: param})

    let totalBayar = Number(dataTarif.tarifperkwh) * Number(dataTagihan.jumlah_meter) + Number(req.body.biaya_admin)

    //tampung data masuk
    let data = {
        id_tagihan: req.body.id_tagihan,
        tanggal_pembayaran: tanggal, 
        bulan_bayar: req.body.bulan_bayar,
        biaya_admin: req.body.biaya_admin, 
        total_bayar: totalBayar,
        status: req.body.status,
        bukti: req.file.filename,
        id_admin: req.body.id_admin,
    }

    //proses perubahan status tagihan
    let idTagihan = { id_tagihan: data.id_tagihan}
    let status = { status: 1}
    tagihan.update(status, { where: idTagihan })

    //eksekusi insert data
    pembayaran.create(data)
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
app.put("/", upload.single("bukti"), async(req,res) => {
    //tampung data 
    let data = {
        id_tagihan : req.body.id_tagihan,
        tanggal_pembayaran : tanggal,
        bulan_bayar : req.body.bulan_bayar,
        biaya_admin : req.body.biaya_admin,
        total_bayar : req.body.total_bayar,
        status : req.body.status,
        bukti : req.file.filename,
        id_admin : req.body.id_admin
    }
    
    //key data yg diubah
    let parameter = {
        id_pembayaran: req.body.id_pembayaran
    }

    //proses update foto bukti
    if(req.file){
        let oldPembayaran = await pembayaran.findOne({ where: parameter })
        let oldBukti = oldPembayaran.bukti

        // delete oldBukti
        let pathFile = path.join(__dirname, "../image/bukti", oldBukti)
        fs.unlink(pathFile, error => console.log(error))

        data.bukti = req.file.filename // masukin data baru
    }

    //eksekusi update data
    pembayaran.update(data, {where: parameter})
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
app.delete("/:id_pembayaran", async(req,res) => {
    //variabel
    let id_pembayaran = req.params.id_pembayaran

    //konsep object 
    let parameter = {
        id_pembayaran: id_pembayaran
    }

    //proses delete foto bukti
    let oldPembayaran = await pembayaran.findOne({ where: parameter })
    let oldBukti = oldPembayaran.bukti

    //delete oldCover
    let pathFile = path.join(__dirname, "./image/bukti", oldBukti)
    fs.unlink(pathFile, error => console.log(error))

    //execute delete data
    pembayaran.destroy({where: parameter})
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