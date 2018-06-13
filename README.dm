### NodeJS solution for github user api data

The goal of this repo is to be a middle layer between github and logstash/beats and then ultimately into elastic search

Bigger picture steps invisioned:

    [GITHUB] -> **This repository in a containerised format** -> [LOGSTASH/BEATS] -> [ELASTICSEARCH] -> [KIBANA]

## To Run This NodeJS script:

    GITHUB_API_TOKEN="xxxxxxxxxxx" GITHUB_ORGANISATION="xxxxxxxxxxxx" npm start


Making this public, as all these api endpoints are already publicly available, just pass in the token and organisation as environment variables:

Environment variables:

- GITHUB_API_TOKEN
- GITHUB_ORGANISATION

So far the API requests are:

- "https://api.github.com/orgs/"+process.env.GITHUB_ORGANISATION+"/members?per_page=1000"
- "https://api.github.com/orgs/"+process.env.GITHUB_ORGANISATION+"/repos?per_page=1000"

The GITHUB_ORGANISATION value you provide will affect the data fetched.

In the headers of the request the GITHUB_API_TOKEN is passed to make sure you have a proper authenticated request.

