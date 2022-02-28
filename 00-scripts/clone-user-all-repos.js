/**
 * 运行方式：node ./get_user_repos github_username
 */

const axios = require('axios');
const cp = require('child_process');
const process = require('process');
const path = require('path');
const fs = require('fs');

(async function () {
  const cloneUrlList = [];
  const perPage = 100;
  let page = 1;
  const user = process.argv[2];
  const dir = path.resolve(__dirname, user);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (!user) {
    console.error('请提供 user');
  }

  async function getReposCloneList() {
    let isEnd = false;
    const res = await axios.get(
      `https://api.github.com/users/lukeed/repos?per_page=${perPage}&page=${page}`,
    );
    if (res.length < perPage) {
      isEnd = true;
    }
    for (let i = 0; i < res.data.length; i++) {
      const repo = res.data[i];
      if (!repo.fork) {
        cloneUrlList.push(repo.clone_url);
      }
    }

    if (!isEnd) {
      page += 1;
      getReposCloneList();
    }
  }

  await getReposCloneList();

  for (let i = 0; i < cloneUrlList.length; i++) {
    cp.execSync(`cd ${dir} && git clone ${cloneUrlList[i]}`, (err, stdout, stderr) => {});
  }
}());
