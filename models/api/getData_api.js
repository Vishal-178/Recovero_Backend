const get_DataApi = require("../../api");
module.exports.getData = async (req, res) => {
  try {
    // data is the response from the api
    const data = await get_DataApi.fetchData();
    // sending the response to the client
    res.status(200).json(data.data);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};
