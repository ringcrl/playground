const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const {
  p,
} = argv;

const filePath = p;

require('dotenv')
  .config({ path: path.resolve('.', '.env') });

const {
  SecretId, SecretKey, Bucket, Region, Key, CName,
} = process.env;

const cos = new COS({
  SecretId,
  SecretKey,
});

const postfix = filePath.split('.').pop();
const fileName = `${uuid()}.${postfix}`;
const fileKey = `${Key}/${fileName}`;
cos.putObject(
  {
    Bucket,
    Region,
    Key: fileKey,
    Body: fs.createReadStream(filePath),
  },
  (err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log(data);

    console.log(`${CName}/${fileKey}`);
  },
);
