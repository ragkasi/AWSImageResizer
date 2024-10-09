Building a serverless image resizer using AWS Lambda and S3 is a powerful way to dynamically resize images on demand without having to manage infrastructure. Here's a step-by-step guide on how to implement this:

Step 1: Setup Your S3 Buckets
You will need two S3 buckets:

Source Bucket: Where original images are uploaded.
Destination Bucket: Where resized images will be stored.
Create the S3 Buckets
Go to the S3 Console.
Create two buckets:
Source Bucket: For original images (e.g., source-images-bucket).
Destination Bucket: For resized images (e.g., resized-images-bucket).

Step 2: Create a Lambda Function
This function will trigger when a new image is uploaded to the source bucket and perform the image resizing.

Go to the Lambda Console.
Click on "Create function."
Choose "Author from scratch."
Give your function a name (e.g., imageResizerFunction).
For the Runtime, select Node.js (other runtimes like Python are also supported, but Node.js has a popular library for image manipulation).
Create a role with S3 read/write access.

Step 3: Add Permissions to Lambda
Ensure your Lambda function has permissions to read from the source S3 bucket and write to the destination S3 bucket.

In the Lambda console, navigate to the Permissions section.
Attach an IAM role that allows access to both the source and destination S3 buckets. You can use the following policy:
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::source-images-bucket/*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::resized-images-bucket/*"
    }
  ]
}
```
Step 4: Install Image Manipulation Library
For Node.js, you can use a library like sharp to perform image resizing.

In the Lambda console, open the function editor.
Install sharp via npm and zip the node_modules:
bash
Copy code
mkdir lambda-image-resizer
cd lambda-image-resizer
npm init -y
npm install sharp
zip -r lambda-image-resizer.zip .
Upload the lambda-image-resizer.zip file to your Lambda function.

Step 5: Write the Lambda Function Code

Step 6: Configure S3 Trigger
In the Lambda console, navigate to Triggers.
Add an S3 trigger.
Select the source bucket (source-images-bucket).
Set the event type to "PUT" (so that the Lambda function is triggered when a new image is uploaded).
Step 7: Test the Lambda Function
Upload an image to the source S3 bucket, and the Lambda function should automatically resize it and upload the resized version to the destination bucket.

Step 8: Monitor and Logs
Check the execution of your Lambda function via the CloudWatch Logs to debug or monitor the process.
