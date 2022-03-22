const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const {
  p,
} = argv;

const filePath = p;

if (!filePath) {
  console.log('请输入文件路径: node main.js -p path_to_file');
  process.exit(1);
}

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

// 小文件上传
// cos.putObject(
//   {
//     Bucket,
//     Region,
//     Key: fileKey,
//     Body: fs.createReadStream(filePath),
//   },
//   (err, data) => {
//     if (err) {
//       return console.error(err);
//     }
//     console.log(data);

//     console.log(`${CName}/${fileKey}`);
//   },
// );

// 大文件分片上传
cos.sliceUploadFile({
  Bucket, /* 填入您自己的存储桶，必须字段 */
  Region, /* 存储桶所在地域，例如ap-beijing，必须字段 */
  Key: fileKey, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
  FilePath: filePath, /* 必须 */
  SliceSize: 1024 * 1024 * 10, // 大于10M分片上传
  AsyncLimit: 100,
  onTaskReady(taskId) { /* 非必须 */
    console.log(taskId);
  },
  onHashProgress(progressData) { /* 非必须 */
    console.log(JSON.stringify(progressData));
  },
  onProgress(progressData) { /* 非必须 */
    console.log(JSON.stringify(progressData));
  },
}, (err, data) => {
  console.log(err || data);
});
