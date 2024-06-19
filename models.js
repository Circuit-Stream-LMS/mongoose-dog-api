const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: String,
    colour: String,
    age: Number,
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false })


dogSchema.methods.speak = function speak() {
    return this.name ? `Woof woof! My name is ${this.name}` : `I don't have a name`
}

const Dog = mongoose.model('Dog', dogSchema)

module.exports = { Dog }