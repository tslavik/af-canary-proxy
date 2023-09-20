const http = require("http")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const url = new URL(url)
    const responseFromProxy = await fetch("https://purple-meadow-02b644503.3.azurestaticapps.net" + url.pathname)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body:  responseFromProxy.blob()
    };
}