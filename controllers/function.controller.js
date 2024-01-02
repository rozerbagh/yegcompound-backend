var axios = require("axios");
const fetchOrdersByUser = async (req, res, next, model, attr) => {
  try {
    var data = await model
      .find({ user: req.params.userid })
      .populate(attr.path)
      .exec();
    if (!data) {
      res.status(404).send({ message: "Data Not Found", responseStatus: 0 });
    } else {
      res.status(200).send({
        data: data,
        responseStatus: 1,
        message: "Here are uours order",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error, responseStatus: 0 });
  }
};
const fetchSettingByUser = async (req, res, next, model, attr) => {
  try {
    const userid = req.query.admin ? req.params.userid : req.payload._id;
    var data = await model.find({ user: userid }).populate(attr.path).exec();

    if (!data) {
      data = await model.find({ user: null }).populate(attr.path).exec();
    }
    if (!data) {
      res.status(404).send({ message: "Data Not Found", responseStatus: 0 });
    } else {
      res.status(200).send({
        data: data,
        responseStatus: 1,
        message: "Here are the setting",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error, responseStatus: 0 });
  }
};
const zipCodeBase_Apikey = "1c013a40-a539-11ee-ab49-1369769a1cfd";
const zipCodeBase_baseurl = "https://app.zipcodebase.com";
const fetchAddressAsPerPincode = async (req, res, next) => {
  try {
    const { zipcode } = req.params;
    var options = {
      url: `${zipCodeBase_baseurl}/api/v1/search?apikey=${zipCodeBase_Apikey}&codes=${zipcode}`,
    };

    const { data } = await axios.get(options.url);
    console.log(data);
    if (!data) {
      res.status(500).send({ message: "error", responseStatus: 0 });
      return;
    }
    if (data.results[zipcode]) {
      res.status(200).send({
        data: data.results[zipcode],
        responseStatus: 1,
        message: "The addresses",
      });
    } else {
      res.status(200).send({
        data: null,
        responseStatus: 0,
        message: "The entered pincode is not found",
      });
    }
  } catch (error) {}
};
module.exports = {
  fetchOrdersByUser,
  fetchAddressAsPerPincode,
  fetchSettingByUser,
};
