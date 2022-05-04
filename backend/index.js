
const express = require('express')
const cors = require('cors')
const userModule = require('./query-req')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 8000
app.get('/contact', async (req,res) =>{
    await userModule.getUserInfo().then((response) => res.status(200).send(response))
        .catch((e) => res.status(500).send(e))
})

app.put('/contact/:id',async (req,res,next) => {
    const {uid,name,age,phone} = req.body.data
    await userModule.updateUserInfo(uid,name,phone,age).then(response => res.status(200).send(response))
        .catch(e=>next(e))

})

app.post('/contact/createContact',async (req,res,next) =>{
    const {name,phone,age} = req.body.data
    await userModule.createNewUser(name,phone,age).then((response) => {
        res.send(response)
    }).catch(e => next(e))
})

app.delete('/contact/deleteContact', async(req,res,next) => {
    const uid = req.body.uid
    await userModule.deleteUser(uid).then((response) => res.send(response))
        .catch(e=> {
            next(e)
        })
})

app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}/contact`)
})