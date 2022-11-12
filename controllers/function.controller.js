const fetchOrdersByUser = async (req, res, next, model, attr) => {
    try {
        var data = await model.find({ user: req.params.userid }).populate(attr.path).exec();
        if (!data) {
            res.status(404).send({ message: 'Data Not Found', responseStatus: 0 });
        } else {
            res.status(200).send({ data: data, responseStatus: 1, message: "Here are uours order" });
        }
    } catch (error) {
        res.status(500).send({ message: error, responseStatus: 0 });
    }

}

module.exports = {
    fetchOrdersByUser,
}