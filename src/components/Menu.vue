<template>
  <div class="menu">
    <div class="menu__tabs">
      <button 
        class="menu__tabs__item" 
        :class="{active: isPostsSelected}" 
        @click="setMenu('posts')"
      >
        Posts
      </button>
      <button 
        class="menu__tabs__item" 
        :class="{active: !isPostsSelected}" 
        @click="setMenu('users')"
      >
        Users
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default{
  name: 'MenuComponent',
  props: {
    modelValue: {
      type: String
    }
  },
  computed: {
    ...mapGetters(["menu"]),
    isPostsSelected(){
      return this.menu === 'posts'
    }
  },
  methods: {
    ...mapActions(["setMenu"]),
  }
}

</script>

<style lang="scss" scoped>
  .menu{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    position: fixed;
    background: #ffffff;
    top: 0;
    left: 0;

    &__tabs{
      display: flex;
      height: 100%;

      &__item{
        padding: 10px 40px;
        border: none;
        background: none;
        transition: background-color 0.5s ease;
        

        &:hover{
          cursor: pointer;
          background-color: rgb(222, 222, 222);
        }
      }
    }
  }
  .active{
    background-color: rgb(202, 202, 202);
    &:hover{
      background-color: rgb(202, 202, 202);
    }
  }
</style>