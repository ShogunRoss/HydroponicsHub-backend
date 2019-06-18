const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Device {
    _id: ID!
    secretKey: String!
    name: String!
    location: String!
    tdsWanted: Float!
    phWanted: Float!
    floodInterval: Float!
    floodDuration: Float!
    startFloodTime: String!
    endFloodTime: String!
    startLedTime: String!
    endLedTime: String!
    owner: User!
    createdAt: String!
    updatedAt: String!
    history: [Sensor]
  }

  type User {
    _id: ID!
    email: String!
    password: String
    phone: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    updatedAt: String!
    ownedDevices: [Device!]
  }

  type Sensor {
    _id: ID!
    temperature: Float!
    pH: Float!
    nutrient: Float!
    time: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input DeviceInput {
    secretKey: String!
    name: String!
    location: String!
    tdsWanted: Float!
    phWanted: Float!
    floodInterval: Float!
    floodDuration: Float!
    startFloodTime: String!
    endFloodTime: String!
    startLedTime: String!
    endLedTime: String!
  }

  input UserInput {
		email: String!
		phone: String!
    password: String!
    firstName: String!
    lastName: String!
	}
	
	input SensorInput {
		secretKey: String!
		temperature: Float!
    pH: Float!
    nutrient: Float!
	}

  type RootQuery {
    devices: [Device!]!
    login(email: String!, password: String!): AuthData!
    getConfig(secretKey: String!): Device!
  }

  type RootMutation {
    registerDevice(deviceInput: DeviceInput): Device
    editDevice(deviceInput: DeviceInput): Device
		createUser(userInput: UserInput): AuthData!
		updateSensor(sensorInput: SensorInput): Sensor
		removeDevice(secretKey: String!): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
