<template>
    <h3> {{likes}}</h3>
    <p v-if="likes >0">
    Likes are increasing 💕  
    </p>
    <p v-else>
      This post ain't working ❌ 
    </p>
    <button v-on:click="likeAndSubscribe()">
      Hit it!!
    </button>
  </template>
  
  <script>
    export default {
        data(){
        return {
            likes:0,
        }    
    },

    methods: {
      likeAndSubscribe() {
        this.likes++;
      }
    },
    name: 'UsersHere',
    }
  </script>
  
  <style>
    h3 {
      margin-bottom: 5%;
    }
  </style>