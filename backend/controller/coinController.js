const Coin = require('../models/Coin');
const Count = require('../models/Count');

const addCoin = async (req, res) => {
    try {
        const { name, price } = req.body;
        const d_s = new Date(new Date().getTime() + (330 * 60 * 1000)).toISOString();
        const d_a = d_s.split('T');
        const d_1 = d_a[0];
        const d_2 = d_a[1].split('.')[0];
        const date = `${d_1} ${d_2}`;
        const coin = new Coin({name, price, date});
        await coin.save();
        const set_count = await Count.aggregate([
            {
                $match: {
                    date: d_1
                },
                
            }
        ])
        res.json("Coin added");
    } catch (err) {
        console.log(err);
        res.json({ success: false, data: null, message: "Coin adding failed" });
    }
};

const getList = async (req, res) => {
    try {
        const details = await Coin.aggregate([
            {
                "$project": {
                    _id: 0,
                    name: 1,
                    price: 1,
                    date: 1
                }
            }
        ]);
        res.json({ details });
    } catch (err) {
        console.log(err);
        res.json({ success: false, data: null, message: "Error in Getting coin list" });
    }
};

module.exports = { addCoin, getList };