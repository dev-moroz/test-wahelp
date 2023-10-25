<template>
  <div ref="posts">
    <div 
      v-if="sortedByUser.length"
      class="filter"
    >
      <p>Посты пользователя {{ selectedUser }}</p>
      <button @click="cleanFilter">X</button>
    </div>
    <PostComponent 
      v-for="post in localPosts" 
      :key="post.id" 
      :post="post"
    />
    <p v-if="isLoadData"></p>
  </div>
</template>


<script>
import PostComponent from '../components/Post'
import { mapActions, mapGetters } from "vuex"

export default{
  name: 'PostsPage',
  data(){
    return{
      showedPosts: [],
      slice: 20,
      isLoadData: false,
    }
  },
  components: {
    PostComponent
  },
  watch: {
    isLoadData: {
      handler(value){
        if(value) setTimeout(() => this.setPartData(), 200)
      }
    },
  },
  methods: {
    ...mapActions(["loadData", "cleanFilter"]),
    setPartData(){
      this.showedPosts = this.posts.slice(0, this.slice)
      this.isLoadData = false
      this.slice += 20
    },

    addPosts(){        
      const scrolled = window.scrollY
      const height = document.body.offsetHeight
      const screenHeight = window.innerHeight
      const partOfHeight = (height - screenHeight) - 50

      if(scrolled > partOfHeight) this.isLoadData = true
    },
  },
  computed: {
    ...mapGetters(["posts", "sortedByUser", "selectedUser"]),
    localPosts(){
      return this.sortedByUser.length ? this.sortedByUser : this.showedPosts
    },
  },
  async created(){
    await this.loadData()
    if(this.posts.length) this.setPartData()

    window.addEventListener('scroll', () => this.addPosts())
  }
}
</script>

<style lang="scss" scoped>
.filter{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-left: 10px;

  button{
    border: none;
    background: none;
    cursor: pointer;
  }
}
</style>