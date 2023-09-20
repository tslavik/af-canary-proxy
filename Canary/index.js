const http = require("http")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const url = new URL(req.url)
    context.log(url.pathname);
    const responseFromProxy = await fetch("https://purple-meadow-02b644503.3.azurestaticapps.net" + url.pathname, {headers: {'Cookie': 'StaticWebAppsTrafficSplittingCookie=2'}})
    const responseBody = await responseFromProxy.blob()
    const body = await responseBody.text();
    context.log(responseFromProxy.headers.get("Set-Cookie"));
    context.res = {
        // status: 200, /* Defaults to 200 */
        body:  body,
        headers: {
            'Content-Type': 'text/html',
            'Set-Cookie': 'StaticWebAppsTrafficSplittingCookie=2'
        }
    };
}