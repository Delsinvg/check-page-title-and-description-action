const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios").default;

try {
  const siteUrl = core.getInput("site");
  regexTitle = /<title[^>]*>([^<]+)<\/title>/
  regexDescription = /<meta ?([^<]+)? name="description" ?([^<]+)?>/g
  
  axios
    .get(siteUrl)
    .then(function (response) {
      let matchTitle = response.data.match(regexTitle);
      let matchDescription = response.data.match(
        regexDescription
      );
      if (!matchTitle) {
        core.setFailed("No title on page");
      }

      if (!matchDescription) {
        core.setFailed("No description on page");
      }
      if (matchTitle && matchDescription) {
        let description = getDescription(matchDescription[0])
        let title = matchTitle[0].trim()
        core.setOutput("title", title);
        core.setOutput("description", description);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
} catch (error) {
  core.setFailed(error.message);
}

function getDescription(description) {
  let start_pos = description.indexOf("\"") + 1;
  let end_pos = description.indexOf("\"", start_pos);
  return resultDescription = description.substring(start_pos, end_pos);
}
