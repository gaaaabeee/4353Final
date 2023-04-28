const fuelModel = require('../DataBase/fuelModel')
const userInfoModel = require('../DataBase/userInfoModel')


module.exports.fuelRateCalculator = async function fuelRateCalculator(req, res) {
    try {
        let fuelRate = 0, marginPrize = 0, currentPrize = 1.50, companyProfitFactor = 0.1, success = false;
        let data = req.body
        let id = req.header('token');
        if (data) {
            const DB_user = await userInfoModel.findOne({ user_id: id })
            if (DB_user) {
                if (DB_user.state === 'TX') {
                    marginPrize += 0.02;   //location factor
                } else {
                    marginPrize += 0.04;   //location factor
                }
                const previousRecord = await fuelModel.find({ user_id: DB_user.id })
                if (previousRecord) {
                    marginPrize -= 0.01    //history factor
                }
                let gallons = data.gallons;
                if (gallons >= 0) {
                    gallons *= 1;
                    if (gallons >= 1000) {   //gallons factor
                        marginPrize += 0.02;
                    } else {
                        marginPrize += 0.03
                    }
                    marginPrize += companyProfitFactor //profit factor
                    marginPrize *= currentPrize
                    fuelRate = marginPrize + currentPrize
                    
                    success = !success;
                    // fuelRate = Math.round(fuelRate * 100) / 100;
                    res.status(200).json({ success: success, fuel_rate: fuelRate, totalAmount: fuelRate * gallons })
                } else {
                    res.status(400).json({ error: "Invalid input: gallons must be greater than or equal to 0" })
                }
            } else {
                res.status(400).json({ success: success, error: "please register first" })
            }
        } else {
            res.status(400).json({ error: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports.viewPurchaseHistory = async function viewPurchaseHistory(req, res) {
    try {
        let id = req.header('token'), success = false;
        if (id) {
            let history = await fuelModel.find({ user_id: id })
            if (history.length) {
                success = !success
                res.status(200).json({ success: success, data: history })
            } else {
                res.status(404).json({ success: success, message: "you have'nt purchased any fuel so far." })
            }
        } else {
            res.status(404).json({ success: success, message: "please login/register first" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.placeOrder = async function placeOrder(req, res) {
    try {
        let order_info = req.body, id = req.header('token'), success = false;
        if (order_info) {
            let DB_info = await fuelModel.create({ gallons: order_info.gallons, date: order_info.date, user_id: id })
            if (DB_info) {
                success = !success
                res.status(200).json({ success: success, message: "your order have successfully placed." })
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}