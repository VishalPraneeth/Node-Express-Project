const {constants} = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode) {
        case constants.VALIDATION_ERROR: 
            res.json({title: "Validation Failed", mesage: err.message, stackTrace: err.stack});
            break;

        case constants.UNAUTHORIZED:  
            res.json({title: "Unauthorized", mesage: err.message, stackTrace: err.stack});
            break;

        case constants.FORBIDDEN: 
            res.json({title: "Forbidden", mesage: err.message, stackTrace: err.stack});
            break;

        case constants.NOT_FOUND:  
            res.json({title: "Resource not found", mesage: err.message, stackTrace: err.stack});
            break;

        case constants.SERVER_ERROR: 
            res.json({title: "Server Error", mesage: err.message, stackTrace: err.stack});
            break;

        default:
            console.log("No error message");
            break;
    }
    
    
};

module.exports = errorHandler;