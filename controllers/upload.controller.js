/* const {uploadToBucket} = require('../helpers/aws');

const upload = async (req,res) => {
    const bucket = req.body.bucket;
    const file = req.files.file;

    const result = await uploadToBucket(bucket,file);

    res.json(result);
};

module.exports = {
    upload
} */