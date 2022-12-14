const { S3Client, PutObjectCommand, GetObjectAclCommand, GetObjectCommand } =require('@aws-sdk/client-s3')
const  fs  = require('fs')
const { config } = require('../config/config');


const region1 = config.awsRegion;
const accesKeyId1 = config.awsId;
const secretAccessKey1 = config.awsClave;
//const bucketName = "maxicusco.net"
const bucketName = config.awsName;

const clientS3 = new S3Client({
    region: region1,
    credentials:{
        accessKeyId: accesKeyId1,
        secretAccessKey: secretAccessKey1
    }
})

//subir archivo
async function uploadFile(file){
    console.log(file);
    const stream = fs.createReadStream(file.tempFilePath)
    console.log(stream);
    const uploadParams = {
        Bucket: bucketName,
        Key: `images/${file.name}`, 
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    const result = await clientS3.send(command)
    console.log(result);
}

//obtener un solo archivo
async function getFile(fileName){
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
    })
    return await clientS3.send(command)
    
}








const S3 = require('aws-sdk/clients/s3');




/* const storage = new S3({
    region1,
    accesKeyId1,
    secretAccessKey1
});

const getBuckets = () => {
    return storage.listBuckets().promise();
};

const uploadToBucket = (bucketName,file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket:bucketName,
        Key:file.name,
        Body:stream
    };
    return storage.upload(params).promise();
};
 */
module.exports = {
  //  getBuckets,
    //uploadToBucket,
    uploadFile,
    getFile
};

