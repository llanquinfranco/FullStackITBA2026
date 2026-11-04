const logger = (req, res, next) => {
    const fechaHora = new Date();
    console.log(`[${req.method}] ${req.originalUrl} - ${fechaHora}`);
    next();
};

module.exports = logger;