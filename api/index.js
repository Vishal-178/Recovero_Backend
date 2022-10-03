const axios = require("axios");
// blockRequest is keep track of every 20 requests per minute
var blockRequest = true;
// number of request send to the api
var noOfRequests = 1;
module.exports.fetchData = () => {
  // if blockRequest is true then it will send the request to the api
  if (blockRequest) {
    // if noOfRequests is greater then 20 it will block the request until the blockRequest is true
    if (noOfRequests <= 20) {
      noOfRequests++;
      // if noOfRequest is less then 20 then it will send the request to the api and return the response
      return getData();
    } else {
      blockRequest = false;
      noOfRequests = 0;
      // wait till the blockRequest is true so waitAllRequests run each second and check if the blockRequest is true
      return waitAllRequests();
    }
  } else {
    // waitAllRequests run each second and check if the blockRequest is true
    // if blockRequest is true then it will send the request to the api
    return waitAllRequests();
  }
};
// waitAllRequests run each second and check if the blockRequest is true
// if blockRequest is true then it will send the request to the api
function waitAllRequests() {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (blockRequest) {
        return resolve(getData());
      }
    }, 1000);
  });
}
// getData is the function that send the request to the api and return the response
function getData() {
  return new Promise((resolve, reject) => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// setInterval is use keep track each minute
setInterval(() => {
  blockRequest = true;
  noOfRequests = 0;
}, 60000);
