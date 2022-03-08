// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require('tencentcloud-sdk-nodejs');
const path = require('path');
require('dotenv')
  .config({ path: path.resolve('.', '.env') });

const {
  SecretId, SecretKey,
} = process.env;

const TmtClient = tencentcloud.tmt.v20180321.Client;

const clientConfig = {
  credential: {
    secretId: SecretId,
    secretKey: SecretKey,
  },
  region: 'ap-guangzhou',
  profile: {
    httpProfile: {
      endpoint: 'tmt.tencentcloudapi.com',
    },
  },
};

const client = new TmtClient(clientConfig);
const params = {
  SourceText: '中文翻译测试',
  Source: 'zh',
  Target: 'en',
  ProjectId: 0,
};
client.TextTranslate(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error('error', err);
  },
);
