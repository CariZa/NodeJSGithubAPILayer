
// Just a useful check if the right environment variables are set,
// if not, tell the user

let requiredEnvironmentVariables = [
  'GITHUB_API_TOKEN',
  'GITHUB_ORGANISATION'
];

function requiredFieldsAreValid() {
  let count = requiredEnvironmentVariables.length;
  // let valid = true;
  for (let i = 0; i < count; i++) {
    if (!process.env[requiredEnvironmentVariables[i]]) {
      // TODO: Just check this is a valid JS way to exit a loop, might cause other issues if not correct
      console.log(requiredEnvironmentVariables[i]);
      return false;
    }
  }
  return true;
}

if (!requiredFieldsAreValid()) {
  console.log("ERROR: MISSING ENVIRONMENT VARIABLE!");
  console.log("Make sure you have set these environment variables:");
  let display = requiredEnvironmentVariables.reduce((strList, value) => {
    return strList += value + '=xxxxxxxx ';
  }, "");
  console.log(display);
}



var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const request = require('request');
var rp = require('request-promise');

app.listen(port, () => {
  console.log('RESTful API server started on: ' + port);
});

app.get('/members', (req, res) => {
    let url = "https://api.github.com/orgs/"+process.env.GITHUB_ORGANISATION+"/members?per_page=1000";
    fetchGithubAPIData(url).then((data) => {
      res.send(data);
    }, (err) => {
      console.log("error 1");
      res.send(err);
    }).catch((err) => {
      console.log("error 2");
      res.send(err);
    });
});

app.get('/repos', (req, res) => {
  let url = "https://api.github.com/orgs/"+process.env.GITHUB_ORGANISATION+"/repos?per_page=1000";
  fetchGithubAPIData(url).then((data) => {
    res.send(data);
  }, (err) => {
    console.log("error 3");
    res.send(err);
  }).catch((err) => {
    console.log("error 4");
    res.send(err);
  });
});

function fetchGithubAPIData(url) {
  let headers = {
    'User-Agent': 'request',
    'Authorization' : 'token  '+process.env.GITHUB_API_TOKEN
  };
  let options = {url, headers};
  return rp(options).then((body) => {
    return body;
  }, (err) => {
    return err;
  });
}
