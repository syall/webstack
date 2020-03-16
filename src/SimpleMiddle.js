function bodyParser(req, _) {
    const data = [];
    req.on('data', chunk => data.push(chunk));
    req.on('end', () => req.body = data.length !== 0
        ? JSON.parse(data)
        : undefined);
}

module.exports = {
    bodyParser
};
