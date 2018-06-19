
// Just a useful check if the right environment variables are set,
// if not, tell the user

let requiredEnvironmentVariables = [
  'GITHUB_API_TOKEN',
  'GITHUB_ORGANISATION',
];

function requiredFieldsAreValid() {
  let count = requiredEnvironmentVariables.length;
  // let valid = true;
  for (let i = 0; i < count; i++) {
    if (!process.env[requiredEnvironmentVariables[i]]) {
      // TODO: Just check this is a valid JS way to exit a loop, might cause other issues if not correct
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


// let repos_urls = repos.map(repo =>"https://api.github.com/repos/greenbank60days/"+repo+"/commits?since="+SINCE_DATE);


var express = require('express'),
  app = express(),
  logstash_name = process.env.LOGSTASH_NAME || "logstash";
  port = process.env.PORT || 3000;

const request = require('request');
var rp = require('request-promise');

app.listen(port, () => {
  console.log('Environment variable PORT is: ' + port);
  console.log('Environment variables LOGSTASH_NAME is: ' + logstash_name);
});

app.get('/members', (req, res) => {
    let url = "https://api.github.com/orgs/"+process.env.GITHUB_ORGANISATION+"/members?per_page=1000";
    fetchGithubAPIData(url)
    .then((data) => {
      return sendGithubDataToLogstash(data, "http://"+logstash_name+":8061")
    })
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log("error:", err);
      res.send(err);
    }).catch((err) => {
      console.log("error:", err);
      res.send(err);
    });
});

app.get('/repos', (req, res) => {
  let url = "https://api.github.com/orgs/"+process.env.GITHUB_ORGANISATION+"/repos?per_page=1000";
  fetchGithubAPIData(url)
  .then((data) => {
    return sendGithubDataToLogstash(data, "http://"+logstash_name+":8062");
  })
  .then((data) => {
    res.send(data);
  }, (err) => {
    console.log("error:", err);
    res.send(err);
  }).catch((err) => {
    console.log("error:", err);
    res.send(err);
  });
});

app.get('/commits', (req, res) => {


  // STEP 1 - get list of repos
  // STEP 2 - generate list of commits per repo
  // STEP 3 - send the data for the repos to logstash
  
  let url = "https://api.github.com/repos/greenbank60days/"+repo+"/commits?since="+SINCE_DATE;

  // let url = "https://api.github.com/orgs/"+process.env.GITHUB_ORGANISATION+"/repos?per_page=1000";
  // fetchGithubAPIData(url)
  // .then((data) => {
  //   console.log("the data",data);
  //   return sendGithubDataToLogstash(data, "http://localhost:8060")
  // })
  // .then((data) => {
  //   console.log("data33333", data);
  //   res.send(data);
  // }, (err) => {
  //   console.log("error 3", err);
  //   res.send(err);
  // }).catch((err) => {
  //   console.log("error 4", err);
  //   res.send(err);
  // });
});



// let repos_urls = repos.map(repo =>"https://api.github.com/repos/greenbank60days/"+repo+"/commits?since="+SINCE_DATE);

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


function sendGithubDataToLogstash(data, url) {
  // let url = "http://localhost:8070";
  let headers = {
    "Content-Type": "application/json"
  };
  let options = {
    method: "POST",
    body: JSON.parse(data),
    url, 
    headers,
    json: true
  };
  return rp(options).then((body) => {
    return body;
  }, (err) => {
    console.log("ERRRRR",err);
    return err;
  });
}
