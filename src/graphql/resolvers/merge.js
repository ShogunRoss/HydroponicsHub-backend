const Device = require("../../models/device");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      ownedDevices: devices.bind(this, user._doc.ownedDevices)
    };
  } catch (err) {
    throw err;
  }
};

const devices = async deviceIds => {
  try {
    const devices = await Device.find({ _id: { $in: deviceIds } })
    return devices.map(device => {          // return at this stage will return the transformed devices as defined in this file, not in the schema.
      return transfromDevice(device);
    });
  }
  catch (err) {
    throw err;
  }
}

// const singleDevice = async deviceId => {
//   try {
//     const device = await Device.findById(deviceId);
//     return transfromEvent(device);
//   } catch (err) {
//     throw err;
//   }
// }

const transfromDevice = device => {
  return {
    ...device._doc,
    _id: device.id,
    installationDate: dateToString(device._doc.installationDate),
    owner: user.bind(this, device.owner),
  };
};

const transformData = sensor => {
	return {
		...sensor._doc,
		_id: sensor.id,
    time: dateToString(sensor._doc.time),
    // device: devices.bind(this, sensor.device)
	}
}

module.exports = { transfromDevice, transformData }

