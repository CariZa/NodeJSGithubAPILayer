### NodeJS solution for github user api data

The goal of this repo is to be a middle layer between github and logstash/beats and then ultimately into elastic search

Bigger picture steps invisioned:

    [GITHUB] -> **This repository in a containerised format** -> [LOGSTASH/BEATS] -> [ELASTICSEARCH] -> [KIBANA]

## To Run This NodeJS script:

    GITHUB_API_TOKEN="xxxxxxxxxxx" GITHUB_ORGANISATION="xxxxxxxxxxxx" npm start

Or if you want to change the default port (3000):

    GITHUB_API_TOKEN="xxxxxxxxxxx" GITHUB_ORGANISATION="xxxxxxxxxxxx" PORT=3000 npm start

## Endpoints

    http://localhost:3000/members
    http://localhost:3000/repos

## Notes

Making this public, as all these api endpoints are already publicly available, just pass in the token and organisation as environment variables:

Required environment variables:

- GITHUB_API_TOKEN
- GITHUB_ORGANISATION

Optional environment variables:

- PORT

So far the API requests are:

- "https://api.github.com/orgs/"+process.env.GITHUB_ORGANISATION+"/members?per_page=1000"
- "https://api.github.com/orgs/"+process.env.GITHUB_ORGANISATION+"/repos?per_page=1000"

The GITHUB_ORGANISATION value you provide will affect the data fetched.

In the headers of the request the GITHUB_API_TOKEN is passed to make sure you have a proper authenticated request.


### Build docker image

Build image locally:

    docker build -t nodejsgithubapi .

Run the image locally to test

    docker run --rm -e GITHUB_API_TOKEN="xxxxxxxx" -e GITHUB_ORGANISATION="xxxxxxxx" -p 3000:3000 nodejsgithubapi

Expose the internal port with **-p 3000:3000**

Add the required environment vairables with -e, eg **-e GITHUB_API_TOKEN=xxxxxxxx -e GITHUB_ORGANISATION=xxxxxxxx**

Run the image you just built by ending the command with the value you passed to -t. eg "NodeJsAPI"


