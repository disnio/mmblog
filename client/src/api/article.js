import Axios from 'axios'
// 为了让服务端渲染正确请求数据
// if(typeof window == "undefined") {
//   Axios.defaults.baseURL = 'http://127.0.0.1:8889';
// }
export default {
  createArticle (title, content, publish, tags) {
    return Axios.post('/api/articles', {title, content, publish, tags})
  },
  getAllArticles (tag = '', page = 1, limit = 0) {
    return Axios.get(`/api/articles?tag=${tag}&page=${page}&limit=${limit}`)
  },
  getAllPublishArticles (tag = '', page = 1, limit = 0) {
    return Axios.get(`/api/articles?tag=${tag}&page=${page}&limit=${limit}&publish=1`)
  },
  saveArticle (id, article) {
    return Axios.patch('/api/articles/' + id, article)
  },
  publishArticle (id) {
    return Axios.patch('/api/articles/' + id, {'publish': 1})
  },
  notPublishArticle (id) {
    return Axios.patch('/api/articles/' + id, {'publish': 0})
  },
  deleteArticle (id) {
    return Axios.delete('/api/articles/' + id)
  },
  getArticle (id) {
    return Axios.get('/api/articles/' + id)
  }
}
