const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Device {
		_id: ID!
		secretKey: String!
    installationDate: String!
    interval: Int!
    history: [Sensor]
    owner: User!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    phone: String!
    ownedDevices: [Device!]
  }

  type Sensor {
    _id: ID!
    temperature: Float!
    pH: Float!
    nutrient: Float!
    time: String!
    interval: Int!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input DeviceInput {
		secretKey: String!
  }

  input UserInput {
		email: String!
		phone: String!
    password: String!
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
  }

  type RootMutation {
    registerDevice(deviceInput: DeviceInput): Device
		createUser(userInput: UserInput): User
		updateSensor(sensorInput: SensorInput): Sensor
		removeDevice(deviceId: ID!): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)