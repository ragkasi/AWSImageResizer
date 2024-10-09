import AWS from '/var/task/node_modules/aws-sdk/lib/aws.js'
const S3 = new AWS.S3();
import Sharp from '/var/task/node_modules/sharp/lib/sharp.js';

exports.handler = async (event) => {
    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    const dstBucket = process.env.DST_BUCKET;
    const dstKey = `resized-${srcKey}`;
    
    try {
        const params = {
            Bucket: srcBucket,
            Key: srcKey,
        };
        const image = await S3.getObject(params).promise();

        const resizedImage = await Sharp(image.Body)
            .resize(800)
            .toBuffer();

        await S3.putObject({
            Bucket: dstBucket,
            Key: dstKey,
            Body: resizedImage,
            ContentType: 'image/jpeg'
        }).promise();
        
        console.log(`Successfully resized and uploaded: ${dstKey}`);
        return {
            statusCode: 200,
            body: JSON.stringify('Image resized successfully'),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error resizing image'),
        };
    }
};
