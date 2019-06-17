const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    secretKey: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    tdsWanted: {
      type: Number,
      required: true
    },
    phWanted: {
      type: Number,
      required: true
    },
    floodInterval: {
      type: Number,
      required: true
    },
    floodDuration: {
      type: Number,
      required: true
    },
    startFloodTime: {
      type: String,
      required: true
    },
    endFloodTime: {
      type: String,
      required: true
    },
    startLedTime: {
      type: String,
      required: true
    },
    endLedTime: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
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
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
