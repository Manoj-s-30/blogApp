import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    let token = req.headers.authorization;
    try {
        jwt.verify(token, process.env.JWTTOKEN)
        next();
    }
    catch (err) {
        res.json({
            success: false,
            message: "Invalid Token"

        })
    }

}

export default auth