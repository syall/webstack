function bodyParser(req, _) {
    const data = [];
    req.on('data', chunk => data.push(chunk));
    req.on('end', () => console.log(data));
}

module.exports = {
    bodyParser
};
