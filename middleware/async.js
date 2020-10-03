//Use this function if express-async-error module does not work
//To use this function call it inside the route handler (Note: Code will look slightly more messier if its used that way)
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex);
        }
    };
};