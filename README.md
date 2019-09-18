# latest-circleci-artifacts-cloudflare-worker
A simple CloudFlare worker that redirects to a latest artifact in a public CircleCI build.

I want to create a URL that will represent a CircleCI artifact in the latest project build, so that I can link to it from README files. Unfortunately [CircleCI does not have a URL that links to latest artifact of a project](https://discuss.circleci.com/t/referencing-latest-build-artifacts/931) however it does have [an API to list the artifacts of the latest build in a given branch](https://circleci.com/docs/api/#artifacts-of-the-latest-build).

So what I needed to do is to create some endpoint that would take the project name and artifact’s path, and redirect to that artifact’s URL.

This is now very easy, now that we have [CloudFlare workers](https://workers.cloudflare.com/)! See [worker.js](worker.js) for source code.
