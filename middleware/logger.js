const RequestLogger =(req, res, next) => {
    timestamp = new Date().toISOString();
    console.log(`${timestamp} - {req.method} - ${req.url} from ${req.ip}`)
    next();
};

module.exports = RequestLogger;