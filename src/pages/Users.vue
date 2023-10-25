<template>
  <div class="users">
    <div 
      v-for="user in users" 
      :key="user.id"
      class="users__item"
    >
      <p>{{ user.name }}</p>
      <button 
        class="users__item__btn"
        @click="showPosts(user.id)"
      >
      Посмотреть посты пользователя</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default{
  name: 'UsersPage',
  computed: {
    ...mapGetters(["users"]),
  },
  methods:{
    ...mapActions(["sortedByUser", "setMenu"]),
    showPosts(userId){
      console.log('userId', userId)
      this.sortedByUser(userId)
      this.setMenu('posts')
    }
  }
}
</script>

<style lang="scss" scoped>
  .users{
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;

    &__item{
      padding: 20px;
      border: 1px solid;
      border-radius: 8px;

      &__btn{
        border: none;
        background: rgb(209, 247, 247);
        border-radius: 10px;
        padding: 10px;
        transition: all .3;

        &:hover{
          cursor: pointer;
          opacity: .7;
        }
      }
    }
  }
</style>