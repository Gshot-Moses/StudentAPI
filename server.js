const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Student = require('./model/student')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://moussamohaman:656994491@cluster0.lrkr0tx.mongodb.net/Students?retryWrites=true&w=majority")
    .then(() => {
        app.listen(4000, () => {
            console.log("Server up and running on port 4000")
        })
    })
    .catch((error) => {
        console.log(error)
    })

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find({})
        res.status(200).json({status: "success", students: students})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/student', async (req, res) => {
    try {
        console.log("Creating new student")
        const student = await Student.create(req.body)
        res.status(201).json({status: "success", user: student})
    } catch(error) {
        res.status(500).json({status: "Failed", message: error.message})
    }
})

app.put('/student/:id', async (req, res) => {
    try {
        const {id} = req.params
        const student = await Student.findByIdAndUpdate(id, req.body)
        if (!student) {
            res.status(401).json({status: "Failed", message: "Student not found"})
            return
        }
        res.status(200).json({status: "success", student: student})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/student/:id', async (req, res) => {
    try {
        console.log("Making request to delete")
        const {id} = req.params
        const student = await Student.findByIdAndDelete(id, req.body)
        if (!student) {
            res.status(404).json({status: "Failed", message: "Student not found"})
            return
        }
        res.status(200).json({status: "success", student: student})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/search', async (req, res) => {
    try {
        const {name} = req.body
        const students = await Student.find({name: { $regex: new RegExp(name, 'i')}})
        res.status(200).json({status: "success", "students": students})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Failed", message: error.message})
    }
})

app.post('/student/toggle', async (req, res) => {
    try {
        console.log("Requesting student status change")
        const id = req.body['id']
        const status = req.body['status']
        const result = await Student.findByIdAndUpdate(
            id,
            { $set: { status: status } },
            { new: true }
        )
        if (!result) {
            res.status(404).json({status: "Failed", "message": "No user found with provided _id"})
            return
        }
        res.status(200).json({status: "success", student: result})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Failed", message: error.message})
    }
})

app.post('/signin', async (req, res) => {
    try {
        const number = req.body["phoneNumber"]
        const password = req.body["password"]

        const user = await Student.findOne(
            {"phoneNumber": number, "password": password}
        )
        if (!user) {
            res.status(404).json({status: "Failed", "message": "No user found with provided credentials"})
            return
        }
        res.status(200).json({status: "success", "user": user})
    } catch(error) {
        res.status(500).json({status: "Failed", message: error.message})
    }
})