/////////////////////////////////////////////////////////////////////////////
// Uncomment to create and fill with data ./contacts.json file
// let Contacts = require('./models/initContacts.js');
// Contacts.initContacts(); 
//////////////////////////////////////////////////////////////////////////////

const fs = require('fs');
const path = require('path');

function requestedStaticRessource(url) {
    let wwwroot = 'client';
    let defaultRessource = 'index.html';
    let ressourceName = url === '/' ? defaultRessource : defaultRessource;
    return path.join(__dirname, wwwroot, ressourceName);
}
function sendRequestedFile(filePath, res) {
    fs.readFile(filePath,
        (err, content) => {
            if (err) {
                console.log(err);
                res.end();
            
        } else {
        //success
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
    });
}

function ShowRequestInfo(req) {
    // const URL = require('url').URL;
    // let url = new URL(req.url);
    // console.log(`User agent:${req.headers["user-agent"]}`);

    console.log(`Method:${req.method}`);
    console.log(`Path:${req.url}`);

    console.log(`Content-type:${req.headers["content-type"]}`);
}
function AccessControlConfig(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credential', false);
    res.setHeader('Access-Control-Allow-Max-Age', '86400'); // 24 hours
}
function Prefligth(req, res) {
    if (req.method === 'OPTIONS') {
        console.log('preflight CORS verifications');
        res.end();
        // request handled
        return true;
    }
    // request not handled
    return false;
}
function notFound(res) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end();
}
function API_Endpoint(req, res) {
    return require('./router').dispatch_API_EndPoint(req, res);
}
const PORT = process.env.PORT || 5000;
require('http').createServer((req, res) => {
    // Middlewares pipeline
    ///////////////////////////////////////////////////
    //console.log(req.method);
    AccessControlConfig(res);

    let file = requestedStaticRessource(req.url);
    sendRequestedFile(file, res);
    ShowRequestInfo(req);
    
    //if (!Prefligth(req, res)) {
    //    console.log('yikes');
    //    let router = require('./router');
    //    if (!router.dispatch_API_EndPoint(req, res)) {
    //        // do something else with request
    //        notFound(res);
    //    }
    //}

}).listen(PORT, () => console.log(`HTTP Server running on port ${PORT}...`));