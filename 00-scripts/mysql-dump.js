const mysqldump = require('mysqldump');
const dayjs = require('dayjs');
const path = require('path');
const cp = require('child_process');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const mysqlDir = path.resolve(__dirname, './mysql');

const {
  IP, USER, PASSWORD, DATABASE,
} = process.env;

cp.execSync(`rm -rf ${mysqlDir}/*`);

mysqldump({
  connection: {
    host: IP,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  },
  dumpToFile: path.resolve(mysqlDir, `dump_${dayjs().format('YYYY_MM_DD')}.sql`),
})
  .then(() => {
    console.log('备份完成');
  })
  .catch((e) => {
    console.error('备份错误', e);
  });
