const http = require('http');
const url = require('url');

function handler(req, res)
{
    const parsedUrl = url.parse(req.url, true);

    res.setHeader('x-server-date', new Date());

    if(parsedUrl.pathname === '/')
    {
        console.log(parsedUrl.pathname);

        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write('Hey, welcome from pure node!');
        res.end();
    } else if(parsedUrl.pathname === '/time') {
        console.log(parsedUrl.pathname);

        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write('Hey, welcome from time page.' + new Date().toString());
        res.end();
    } else if(parsedUrl.pathname == '/hello') {
        const name = parsedUrl.query.name;

        if (name)
        {
            console.log(parsedUrl.pathname);

            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(`Hey ${name} welcome from time page.`);
            res.end();
        } else {
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.end();
        }
    } else if(parsedUrl.pathname.startsWith('/user/')) {
        const regex = new RegExp('\/user\/(.+)');
        const matches = regex.exec(parsedUrl.pathname);

        if(!matches || !matches[1])
        {
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.end();
        } else {
            console.log(matches);

            res.writeHead(200, {'Content-type': 'text/plain'});
            res.write(`User profile: ${matches[1]}`);
            res.end();
        }
    } else {
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.end();
    }
}

const server = http.createServer(handler);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});