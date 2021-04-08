const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios").default;

try {
  const siteUrl = core.getInput("site");
  const filledIn = false;

  axios
    .get(siteUrl)
    .then(function (response) {
      let matchTitle = response.data.match(/<title[^>]*>([^<]+)<\/title>/);
      let matchDescription = response.data.match(
        /<meta name="description" ([^<]+)>/
      );
      if (!matchTitle) {
        core.setFailed("No title on page");
      }

      if (!matchDescription) {
        core.setFailed("No description on page");
      }
      if (matchTitle && matchDescription) {
        console.log(matchDescription[1]);
        console.log(matchTitle[1]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  core.setOutput("filledIn", filledIn);
} catch (error) {
  core.setFailed(error.message);
}
