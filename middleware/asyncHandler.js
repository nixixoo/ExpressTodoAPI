// Wrapper que elimina la necesidad de try/catch en cada controlador
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;