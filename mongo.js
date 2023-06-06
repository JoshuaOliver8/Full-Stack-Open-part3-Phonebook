const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('must include password')
    process.exit(1)
} else if (process.argv.length > 3 && process.argv.length < 5) {
    console.log('must include name and phone number')
    process.exit(1)
} else if (process.argv.length > 5) {
    console.log('must put name with spaces (multiple words) in quotes')
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://joshuaoliver:${password}@fso-part3.nxgtfca.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}