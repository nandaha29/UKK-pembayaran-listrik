// inisiasi library
const express = require("express")
const app = express()

// cals models
const admin = require("../models/index").admin

// konsep middleware
app.use(express.urlencoded({extended:true}))

// endpoint akses data => GET
app.get("/", async(req,res) => {
        //ambil data
        admin.findAll({
            include:["level"]
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
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level
    }

    //eksekusi insert data
    admin.create(data)
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
        nama_admin: req.body.nama_admin,
        id_level: req.body.id_level
    }
    
    //key data yg diubah
    let parameter = {
        id_admin: req.body.id_admin
    }

    //eksekusi update data
    admin.update(data, {where: parameter})
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
app.delete("/:id_admin", async(req,res) => {
    //variabel
    let id_admin = req.params.id_admin

    //konsep object 
    let parameter = {
        id_admin: id_admin
    }

    //execute delete data
    admin.destroy({where: parameter})
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

/* 
- FindAll() -> object promise
- fungsi create() -> menambahkan data
- .then() -> jika berhasil, .catch() -> jika gagal
-  fungsi update() -> mengubah data
-  'params' pd endpoint delete -> sudah pakem gabisa diganti
- fungsi destroy() -> menghancurkan / menghapus

- konsep object -> spy yg di destroy sudah dalam bentuk data object
*/