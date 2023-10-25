<template>
  <div class="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <p class="post__user">{{ post.user }}</p>
    <div class="post__comments">
      <div v-for="(comment, i) in post.comments" :key="i">
        <p>{{i + 1}}) {{ comment }}</p>
      </div>
      <div class="post__comments__new" v-if="isShowNewComment">
        <span>new comment: </span>
        <form @submit.prevent="sendComment">
          <input type="text" v-model="newComment" class="post__comments__folder">
          <input type="submit" value="send" class="post__comments__send" />
          <button class="post__comments__close" @click="showComment">x</button>
        </form>
      </div>
      <button v-if="!isShowNewComment" class="post__comments__add" @click="showComment">new comment +</button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex"
  export default {
    name: 'PostComponent',
    data(){
      return{
        isShowNewComment: false,
        newComment: ''
      }
    },
    props: {
      post: {
        type: Object,
        require: true
      }
    },
    methods: {
      ...mapActions(["addNewComment"]),
      showComment(){
        this.isShowNewComment = !this.isShowNewComment 
        this.newComment = ''
      },
      sendComment(){
        this.addNewComment({id:this.post.id, comment: this.newComment})
        this.showComment()
      }
    }
  }
</script>

<style lang="scss" scoped>
.post{
  border-radius: 8px;
  padding: 10px;
  border: 1px solid;
  margin: 10px;

  &__user{
    text-align: right;
    color: rgb(141, 141, 141);
    font-size: 14px;
  }

  &__comments{
    padding: 10px;
    border-radius: 8px;
    background: rgb(240, 240, 240);

    &__add{
      border: none;
      border-bottom: 1px solid;
      transition: all .3s;
      padding: 5px;

      &:hover{
        background-color: aliceblue;
        border-radius: 8px;
      }
    }


    &__send{
      width: 200px;
      text-align: center;

      &:hover{
        cursor: pointer;
      }
    }

    &__close{
      width: 40px;
      text-align: center;

      &:hover{
        cursor: pointer;
      }
    }

    &__folder{
      width: 100%;
      text-align: center;
    }

    &__new{

      label{
        margin-bottom: 10px;
      }
      form{
        display: flex;
        gap: 10px;
        width: 99%;
      }

      input, button{
        border-radius: 8px;
        border: none;
        height: 30px;
        background-color: #ffffff;
      }
    }
  }
}
</style>