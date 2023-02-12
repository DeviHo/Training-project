require('dotenv').config();
const {User} = require("../models/models");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
 

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

function UserController() {
    this.login = async function (req, res, next) {
        const {sEmail, sPassword} = req.body;
        const oUser = User.findOne({where: {sEmail}});

        if (!oUser) {
            return next(ApiError.badRequest("User is not found"));
        }

        const bComparePasswords = bcrypt.compareSync(sPassword, oUser.password);

        if (!bComparePasswords) {
            return next(ApiError.internalError("Wrong password specified"));
        }

        const sJwt = generateJwt(oUser.id, oUser.email, oUser.role);

        return res.json({sJwt});
    }

    this.registration = async function(req, res, next) {
        const {sEmail, sPassword, sRole} = req.body;

        if (!sEmail || !sPassword) {
            return next(ApiError.badRequest("Incorrect email address or password"));
        }

        const oUserExist = User.findOne({where: {sEmail}});

        if (oUserExist) {
            return next(ApiError.badRequest("User already exists"));
        }

        const sHashPassword = await brypt.hash(sPassword, 5);
        const oUser = await User.create({email: sEmail, password: sHashPassword, role: sRole});
        const sJwt = generateJwt(oUser.id, oUser.email, oUser.role);

        return res.json({sJwt});
    }

    this.check = function(req, res, next) {
        const sJwt = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({sJwt});
    }
 }

 module.exports = new UserController();