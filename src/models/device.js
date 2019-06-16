const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
	secretKey: {
		type: String,
		required: true
	},
	installationDate: {
		type: Date,
		required: true
	},
	sensorInterval: {
		type: Number,
		required: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	history: [
		{
			temperature: {
				type: Number,
				isRequired: true
			},
			pH: {
				type: Number,
				isRequired: true
			},
			nutrient: {
				type: Number,
				isRequired: true
			},
			time: {
				type: Date,
				default: new Date()
			},
		}
	]
})

module.exports = mongoose.model('Device', deviceSchema)