const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios").default;

try {
  const siteUrl = core.getInput("site");

  axios
    .get(siteUrl)
    .then(function (response) {
      let filledIn = false;
      let match = response.data.match(/<title[^>]*>([^<]+)<\/title>/)[1];
      if (!match) {
        core.setFailed("No title on page");
      }
      filledIn = true;
      console.log(match);
    })
    .catch(function (error) {
      console.log(error);
    });

  core.setOutput("filledIn", filledIn);
} catch (error) {
  core.setFailed(error.message);
}
