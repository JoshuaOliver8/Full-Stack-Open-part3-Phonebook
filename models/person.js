const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
	// eslint-disable-next-line no-unused-vars
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: (number => {
				if (/^\d{2,3}-\d{1,}$/.test(number)){
					return true
				} else {
					return false
				}
			}),
			message: 'phone number must consist of two parts separated by -, be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers'
		},
		required: true
	},
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)