import contactData from './contactData.json' assert {type: "json"}
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 8000
app.get('/contact', (req,res) =>{
    res.send(contactData)
})

app.put('/contact/:id',(req,res) => {
    const id = req.params.id
    const {name,age,phone} = req.body
    const result = contactData.contact.filter(val => val.id === id).map(data => {return{...data,name,age,phone}})
    res.send(result)
})
app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}/contact`)
})