function errorHandler(err, req, res, next){
    let msg = "Internal server error"
    let code = 500;

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            msg = err.errors[0].message;
            code = 400;
            break;
        case "invalid_email/username/password":
            msg = "Error login user not found atau password not matched";
            code = 401;
            break;
        case "JsonWebTokenError":
        case "unauthenticated":
            msg = "Error authentication";
            code = 401;
            break;
        case "unauthorized":
            msg = "Forbidden error di authorization";
            code = 403;
            break;
        case "not found":
            msg = "Data not found";
            code = 404;
            break;
    }

    res.status(code).json({ msg })
}

module.exports = errorHandler;