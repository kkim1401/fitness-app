const lookUp = Model => (req, res, next) => {
    Model.findById(req.params.id, (err, doc) => {
        if (err) {
            return next(err);
        }

        if (!doc) {
            return next(new Error("Query returned nothing"));
        }

        req.doc = doc;
        next();
    });
};

export default lookUp;