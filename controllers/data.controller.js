const create = async (req, res, next, model) => {
    try {
        const exitingdata = await model.find({ email: req.body.email });
        console.log(exitingUser);
        if (exitingUser.length > 0)
            return res
                .status(401)
                .send({
                    message: "Data existed",
                    statuscode: 401,
                    data: null,
                    success: false,
                });
        const user = new User(req.body);
        const data = await user.save();
        res.status(200).send({
            success: true,
            statuscode: 200,
            message: "Created/Added sucessfully",
            data: data,
        });
    } catch (error) {
        console.log(error);
        res
            .status(501)
            .send({
                message: "Unable to create", statuscode: 500, success: false
            });
    }
}