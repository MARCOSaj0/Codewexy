const Coin = require('../models/Coin');

const addCoin = async (req, res) => {
    try {
        const { name, price } = req.body;
        const d_s = new Date(new Date().getTime() + (330 * 60 * 1000)).toISOString();
        const d_a = d_s.split('T');
        const d_1 = d_a[0];
        const d_2 = d_a[1].split('.')[0];
        const date = `${d_1} ${d_2}`;
        const count_arr = await Coin.aggregate([
            {
                $match: {
                    date: {
                        $regex: d_1
                    }
                }
            },
            {
                $count: 'total'
            }
        ]);
        const count = count_arr[0]?.total || 0;
        if (count < 50) {
            const coin = new Coin({ name, price: parseInt(price), date });
            await coin.save();
            res.json("Coin added");
        }
        else {
            res.json("Today's limit of adding 50 coins has been exhausted");
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, data: null, message: "Coin adding failed" });
    }
};

const getList = async (req, res) => {
    try {
        const data = await Coin.aggregate([
            {
                "$project": {
                    _id: 0,
                    name: 1,
                    price: 1,
                    date: 1
                }
            }
        ]);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.json({ success: false, data: null, message: "Error in Getting coin list" });
    }
};

module.exports = { addCoin, getList };