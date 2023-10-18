const http = require("http")

module.exports = async function (context, req, route) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var restOfPath = context.bindingData.restOfPath ? context.bindingData.restOfPath : '';
    // const url = new URL(req.url)
    // const parts = url.pathname.split('/')
    // const firstPart = parts.length > 1 ? parts[1] : ''
    // const restOfPath = parts.slice(2).join('/')
    
    // context.log('First part:', firstPart);
    // context.log('Rest of path:', restOfPath);

    context.log(restOfPath);
    const responseFromProxy = await fetch("https://purple-meadow-02b644503.3.azurestaticapps.net/" + restOfPath, {headers: {'Cookie': 'StaticWebAppsTrafficSplittingCookie=2'}})
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