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
        let description = getDescription(matchDescription[1])
        console.log(description);
        console.log(matchTitle[1].trim());
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  core.setOutput("filledIn", filledIn);
} catch (error) {
  core.setFailed(error.message);
}

function getDescription(description) {
  let start_pos = description.indexOf("\"") + 1;
  let end_pos = description.indexOf("\"", start_pos);
  return resultDescription = description.substring(start_pos, end_pos);
}
