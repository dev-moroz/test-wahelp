<template>
  <MenuComponent v-model="menu"/>
  <div class="pages">
    <PostsPage :class="{hideMenu: !isPostsSelected}" />
    <UsersPage :class="{hideMenu: isPostsSelected}" />  
  </div>
</template>

<script>
import MenuComponent from './components/Menu.vue'
import PostsPage from './pages/Posts.vue'
import UsersPage from './pages/Users.vue'
import { mapGetters } from "vuex"

export default {
  name: 'App',
  components: {
    MenuComponent,
    PostsPage,
    UsersPage
  },
  data(){
    return{
      // menu: 'users'
    }
  },
  computed: {
    ...mapGetters(["menu"]),
    isPostsSelected(){
      return this.menu === 'posts'
    }
  }
}
</script>

<style lang="scss">
body{
  margin: 0 auto;
  max-width: 90%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
}
.hideMenu{
  display: none !important;
}
.pages{
  margin-top: 80px;
}
</style>
