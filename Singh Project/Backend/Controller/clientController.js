const userModel = require('../DataBase/userModel')
const userInfoModel = require('../DataBase/userInfoModel')
const bcrypt = require('bcrypt')

module.exports.getClient = async function getClient(req, res) {
    try {
        let id = req.header('token'), success = false;
        let DB_user = await userInfoModel.findOne({ user_id: id })
        if (DB_user) {
            success = !success
            res.status(200).json({ success: success, user: DB_user })
        } else {
            res.status(404).json({ success: success, message: 'login or register first.' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.getClientDataUpdated = async function getClientDataUpdated(req, res) {
    try {
        let user = req.body, success = false, id = req.header('token');
        let DB_data = await userInfoModel.findOne({ user_id: id })
        if (DB_data) {
            for (const key in user) {
                if (user[key] === '') {
                    continue
                }
                DB_data[key] = user[key]
            }
            if (await userInfoModel.replaceOne({ user_id: id }, DB_data)) {
                let data = await userInfoModel.findOne({ user_id: id })
                success = !success
                res.status(200).json({ success: success, fullname: data.fullname, address: data.address1 })
            } else {
                res.status(400).json({ success: success, error: "something went wrong" })
            }
        }
        else {
            res.status(400).json({ success: success, error: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

module.exports.getClientRegister = async function getClientRegister(req, res) {
    try {
        let user = req.body, success = false;
        if (user) {
            const DB_user = await userModel.create(user);
            if (DB_user) {
                success = !success
                res.status(200).json({ success: success, message: "client has successfully registered" })
            }
        } else {
            res.status(400).json({ success: success, error: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

module.exports.getClientLogin = async function getClientLogin(req, res) {
    try {
        let user = req.body, success = false;
        if (user) {
            const DB_user = await userModel.findOne({ username: user.username })
            if (DB_user) {
                let if_matches = await bcrypt.compare(user.password, DB_user.password)
                if (if_matches) {
                    success = !success;
                    let userInfo = await userInfoModel.findOne({ user_id: DB_user._id })
                    if (userInfo) {
                        res.status(200).json({ success: success, message: "client has successfully registered.", token: DB_user._id, fullname: userInfo.fullname, address: userInfo.address1 })
                    } else {
                        res.status(200).json({ success: success, message: "client has successfully registered.", token: DB_user._id })
                    }
                } else {
                    res.status(200).json({ success: success, message: "wrong password." })
                }
            } else {
                res.status(404).json({ success: success, message: "register first." })
            }
        } else {
            res.status(400).json({ success: success, error: "wrong credentials." })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

module.exports.setClientInformation = async function setClientInformation(req, res) {
    try {
        let id = req.header('token');
        let user_info = req.body, success = false;
        if (user_info) {
            let user = { user_id: id };
            for (const key in user_info) {
                user[key] = user_info[key]
            }
            const DB_user = await userInfoModel.create(user)
            if (DB_user) {
                success = !success,
                    res.status(200).json({ success: success, user: { fullname: DB_user.fullname, address: DB_user.address1 } })
            } else {
                res.status(400).json({ success: success, error: "something went wrong." })
            }
        } else {
            res.status(400).json({ success: success, error: "something went wrong." })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}