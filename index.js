const mongoose = require('mongoose');
const express = require('express')

const { Dog } = require('./models')

const app = express()
app.use(express.json())

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');

    app.listen(3000, () => {
        console.log('Dog API listening on port 3000')
    })
}

app.get('/dogs', async (req, res) => {
    const dogs = await Dog.find()

    if (!dogs.length) {
        return res.status(404).json({ message: 'No dogs found' })
    }

    return res.status(200).json(dogs)
})

app.delete('/dogs/:id', async (req, res) => {
    const id = req.params.id

    const result = await Dog.findByIdAndDelete(id)

    if (result) {
        return res.status(204).send()
    } else {
        return res.status(404).json({ message: `Could not find ${id}` })
    }
})

app.put('/dogs', async (req, res) => {

    const { name, colour, age } = req.body

    const dogExists = await Dog.exists({ name })

    if (dogExists) {
        return res.status(400).json({ message: `${name} already exists!` })
    }

    const dog = new Dog({
        name,
        colour,
        age
    })

    await dog.save()

    const greeting = dog.speak()

    return res.status(201).json({
        greeting,
        dog
    })
})