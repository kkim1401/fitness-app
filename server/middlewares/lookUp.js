const lookUp = Model => (req, res, next) => {
    Model.findById(req.params.id, (err, doc) => {
        if (err) {
            err.status = 404;
            return next(err);
        }
        req.doc = doc;
        next();
    });
};

export default lookUp;