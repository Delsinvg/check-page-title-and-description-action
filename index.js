const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios").default;

try {
  const siteUrl = core.getInput("site");
  let filledIn = false;

  axios
    .get(siteUrl)
    .then(function (response) {
      let match = response.data.match(/<title[^>]*>([^<]+)<\/title>/)[1];
      if (!match) {
          core.setFailed('No title on page')
      }
      console.log(match);
      filledIn = true;
    })
    .catch(function (error) {
      console.log(error);
    });

  core.setOutput("Title is filled in:" + filledIn);
} catch (error) {
  core.setFailed(error.message);
}
