const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ","");
    // console.log(token);

    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Attach decoded user to request (contains `id`)
        if(req.user.role!=="admin"){
            return res.status(403).json({ msg: "Access denied. Admins only" });
        }
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid Token" });
    }
};
