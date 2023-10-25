import { createStore } from "vuex"

export default createStore({
  state: {
    posts: [],
    users: [],
    comments: [],
    sortedByUser: [],
    selectedUser: '',
    menu: 'users',
  },

  getters: {
    posts: state => state.posts,
    users: state => state.users,
    comments: state => state.comments,
    sortedByUser: state => state.sortedByUser,
    selectedUser: state => state.selectedUser,
    menu: state => state.menu,
  },

  mutations: {
    getData(state, {path, data}){
      state[path] = data
    },

    loadData(state){
      state.posts = state.posts.map(post => {
        const user = state.users
            .find(user => user.id === post.userId)

        const comments = state.comments
            .filter(comment => comment.postId === post.id)
            .map(comment => comment.body)

        post.user = user.name
        post.comments = comments

        return post
      })
    },

    sortedByUser(state, userId){
      if(!userId) return state.sortedByUser = []
      state.sortedByUser = state.posts.filter(post => post.userId === userId)
    },

    selectedUser(state, userId){
      if(!userId) return state.selectedUser = ''
      state.selectedUser = state.users.find(user => user.id === userId).name
    },

    setMenu(state, menu){
      state.menu = menu
    },

    addNewComment(state, comment){
      state.posts[comment.id - 1].comments.push(comment.comment)
    },
  },

  actions: {
    async getData({commit}, path){
      try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/${path}`)
        const data = await response.json()
        
        commit('getData', {path, data})
        return true
      }catch(e){
        console.error('error', e)
      }
    },

    async loadData({commit, dispatch}){
      await dispatch('getData', 'posts')
      await dispatch('getData', 'comments')
      await dispatch('getData', 'users')

      commit('loadData')
    },

    sortedByUser({commit}, userId){
      commit('sortedByUser', userId)
      commit('selectedUser', userId)
    },

    cleanFilter({commit}){
      commit('sortedByUser')
      commit('selectedUser')
    },

    setMenu({commit}, menu){
      commit('setMenu', menu)
    },

    addNewComment({commit}, comment){
      commit('addNewComment', comment)
    },
  },
})
