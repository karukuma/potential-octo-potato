Vue.use(VueTables.ClientTable);

new Vue({
  el: '#app',
  data() {
    return {
      loading: true,
      errored: false,
      columns: [
        '参考音源',
        '曲名',

      ],
      data: [],
      options: {
        sortable: [
          'name'
        ],
        texts: {
          filterPlaceholder: 'search'
        },
        perPage: 25
      }
    }
  },
  filters: {
    currencydecimal(value) {
      return value.toFixed(2)
    }
  },
  mounted() {
    // axiousを用いてスプレットシート（APIサーバ化）から値を取得
    axios
      .get('https://script.google.com/macros/s/AKfycbwcBCJv2M9vNrIbTxa53JYE7P65B4Z7akfG-tC9N2e3DSO4ON4/exec')
      .then(response => {
        this.data = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
})