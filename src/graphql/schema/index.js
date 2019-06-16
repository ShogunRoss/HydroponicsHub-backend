const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Device {
    _id: ID!
    secretKey: String!
    name: String!
    installationDate: String!
    location: String!
    tdsWanted: Float!
    phWanted: Float!
    sensorInterval: Float!
    floodInterval: Float!
    ledInterval: Float!
    floodDuration: Float!
    ledDuration: Float!
    owner: User!
    history: [Sensor]
  }

  type User {
    _id: ID!
    email: String!
    password: String
    phone: String!
    firstName: String!
    lastName: String!
    ownedDevices: [Device!]
  }

  type Sensor {
    _id: ID!
    temperature: Float!
    pH: Float!
    nutrient: Float!
    time: String!
    tdsWanted: Float!
    phWanted: Float!
    sensorInterval: Float!
    floodInterval: Float!
    ledInterval: Float!
    floodDuration: Float!
    ledDuration: Float!
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
    sensorInterval: Float!
    floodInterval: Float!
    ledInterval: Float!
    floodDuration: Float!
    ledDuration: Float!
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
`);
