new Vue({
  el: '#app',
  data: {
    inputContent: '',
    contentList: [],
    currContentIndex: 0,
    view: 'content', // content | list
  },
  methods: {
    async updateList() {
      const list = await axios.get('/get');
      this.contentList = list.data;
      this.updateIndex();
    },
    updateIndex() {
      this.currContentIndex = Math.floor(Math.random() * this.contentList.length);
    },
    async addContent() {
      if (!this.inputContent) {
        return alert('输入内容');
      }
      await axios.post('/add', {
        content: this.inputContent,
      });
      this.inputContent = '';
      this.updateList();
    },
    async delContent(id) {
      await axios.post('/del', {
        id,
      });
      this.updateList();
    },
    toggleView() {
      if (this.view === 'content') {
        this.view = 'list';
      } else {
        this.view = 'content';
      }
    },
  },
  mounted() {
    this.updateList();
  },
});
