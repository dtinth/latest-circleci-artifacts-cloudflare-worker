addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Edit this list to allow access to more orgs.
const allowedList = new Set([
  'github/dtinth'
])

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  const [_, vcs, username, project, branch, ...path] = url.pathname.split('/')
  if (!allowedList.has(`${vcs}/${username}`)) {
    return new Response(`Allowed list of orgs: ${[...allowedList]}`, {status: 401})
  }
  const circleUrl = `https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/latest/artifacts?branch=${encodeURIComponent(branch)}`
  const artifacts = await (await fetch(circleUrl, { headers: {accept: 'application/json'} })).json()
  const expectedPath = path.join('/')
  const found = artifacts.find(a => a.path === expectedPath)
  if (!found) {
    return new Response(`Artifact not found!`, {status: 404})
  }
  const response = new Response(`${found.url}`, {status: 302})
  response.headers.set('location', found.url)
  return response
}
