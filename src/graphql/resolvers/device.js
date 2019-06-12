const User = require("../../models/user");
const Device = require("../../models/device");
const { transfromDevice, transformData } = require("./merge");

module.exports = {
  devices: async (args, req) => {
    try {
      const devices = await Device.find({ owner: "5ce6bde30bd14f5210d4197c" });
      return devices.map(device => {
        for (let i = 0; i < device.history.length; i++) {
          device.history[i] = transformData(device.history[i]);
        }
        return transfromDevice(device);
      });
    } catch (err) {
      throw err;
    }
  },

  registerDevice: async (args, req) => {
    // if (!req.isAuth) {
    // 	throw new Error('Unauthenciated');
    // }

    const existDevice = await Device.findOne({
      secretKey: args.deviceInput.secretKey
    });
    if (existDevice) {
      throw new Error("Device have already been registered.");
    }
    const device = new Device({
      installationDate: new Date(),
      interval: 1,
      secretKey: args.deviceInput.secretKey,
      name: args.deviceInput.name,
      owner: "5ce6bde30bd14f5210d4197c" // remember to replace with req.userId
    });
    let createdDevice;
    try {
      const result = await device.save();
      createdDevice = transfromDevice(result);
      const user = await User.findById("5ce6bde30bd14f5210d4197c"); // remember to replace with req.userId
      if (!user) {
        throw new Error("User not found.");
      }
      user.ownedDevices.push(device);
      await user.save();
      return createdDevice;
    } catch (err) {
      throw err;
    }
  },

  updateSensor: async (args, req) => {
    // if (!req.isAuth) {
    // 	throw new Error('Unauthenciated');
    // }

    const data = {
      temperature: args.sensorInput.temperature,
      pH: args.sensorInput.pH,
      nutrient: args.sensorInput.nutrient,
      time: new Date()
    };

    try {
      const device = await Device.findOne({
        secretKey: args.sensorInput.secretKey
      });
      if (!device) {
        throw new Error("Sensor have not been registerd yet");
      }
      device.history.push(data);
      const result = await device.save();
      const lastestData = result._doc.history.slice(-1)[0];
      let updatedData = transformData(lastestData);
      updatedData.interval = device.interval;
      return updatedData;
    } catch (err) {
      throw err;
    }
  },

  removeDevice: async (args, req) => {
    // if (!req.isAuth) {
    // 	throw new Error('Unauthenciated');
    // }
    try {
      const device = await Device.findByIdAndDelete(args.deviceId).populate(
        "owner"
      );

      await device.owner.ownedDevices.remove(args.deviceId);

      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
