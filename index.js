
const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./user')

const app = express()
const port = 3000

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(db => console.log('DB is Connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  UserModel.find()
  .then(users => res.json(users))
  .catch(err => res.json(err))
});

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.post('/create', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.listen(port, () => {
  console.log('Example app listening on port ${port}')
});