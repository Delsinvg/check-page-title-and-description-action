const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios").default;

try {
  const siteUrl = core.getInput("site");
  let filledIn = false;

  axios
    .get(siteUrl)
    .then(function (response) {
      let matches = response.data.match(/<title>(.*?)<\/title>/);
      if (matches[0].length > 0) {
        filledIn = true;
        console.log(matches[0]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  core.setOutput("Title is filled in:", filledIn);
} catch (error) {
  core.setFailed(error.message);
}
