const OPTIONS = ['笔记', '面试'];

new Vue({
  el: '#app',
  data: {
    type: OPTIONS[0],
    question: '',
    answer: '',
    newType: '',
    newQuestion: '',
    newAnswer: '',
    filterType: OPTIONS[0],
    contentList: [],
    currContentIndex: 0,
    view: 'content', // content | list
    options: OPTIONS,
    isShowAnswer: false,
    indexPool: [],
  },
  methods: {
    async updateList() {
      const list = await axios.post('/get', {
        type: this.filterType,
      });
      this.contentList = list.data;
      this.indexPool = [];
      this.updateIndex();
    },
    updateIndex() {
      const index = this.getNoRepeatIndex();
      this.setIndex(index);
    },
    setIndex(index) {
      this.currContentIndex = index;
      this.updateCurrContent(this.currContentIndex);
    },
    onListItemClick(index) {
      this.setIndex(index);
      this.toggleView();
    },
    getNoRepeatIndex() {
      if (this.indexPool.length === this.contentList.length) {
        return 0;
      }
      let index = Math.floor(Math.random() * this.contentList.length);
      while (this.indexPool.includes(index)) {
        index = Math.floor(Math.random() * this.contentList.length);
      }
      this.indexPool.push(index);
      return index;
    },
    async addContent() {
      if (!this.question) {
        return alert('输入内容');
      }
      await axios.post('/add', {
        question: this.question,
        answer: this.answer,
        type: this.type,
      });
      this.question = '';
      this.answer = '';
      this.updateList();
    },
    async delContent(id) {
      await axios.post('/del', {
        id,
      });
      this.contentList = this.contentList.filter((item) => item.id !== id);
      this.indexPool.pop();
      this.updateIndex();
    },
    async setContent(id) {
      await axios.post('/set', {
        id,
        question: this.newQuestion,
        answer: this.newAnswer,
        type: this.newType,
      });
    },
    toggleView() {
      if (this.view === 'content') {
        this.view = 'list';
      } else {
        this.view = 'content';
      }
    },
    updateCurrContent(index) {
      this.newQuestion = this.contentList[index].question;
      this.newAnswer = this.contentList[index].answer;
      this.newType = this.contentList[index].type;
    },
    setCache() {
      localStorage.setItem('type', this.type);
      localStorage.setItem('filterType', this.filterType);
    },
    restoreCache() {
      if (localStorage.getItem('type')) {
        this.type = localStorage.getItem('type');
      }
      if (localStorage.getItem('filterType')) {
        this.filterType = localStorage.getItem('filterType');
      }
    },
  },
  watch: {
    currContentIndex(val) {
      if (this.contentList.length === 0) {
        this.newQuestion = '';
        this.newAnswer = '';
        this.newType = '';
        return;
      }
      this.updateCurrContent(val);
    },
    type() {
      this.setCache();
    },
    filterType() {
      this.setCache();
      this.updateList();
    },
  },
  mounted() {
    this.restoreCache();
    this.updateList();
  },
});
