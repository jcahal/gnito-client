<template>
  <Card id="create-form">
    <input id="create-form-id" type="text" placeholder="Title" v-model="title" />
    <textarea id="create-form-message" placeholder="Message" v-model="message"></textarea>
    <input id="create-form-password" type="password" placeholder="Password" v-model="password" />
    <input id="create-form-button" type="button" value="Create" @click="create" />
  </Card>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

export default {
  name: 'Create',
  components: {
    Card,
  },
  data() {
    return {
      title: '',
      message: '',
      password: ''
    }
  },
  methods: {
    create: function() {

      //TODO: Clear fields after create

      const drop = {
        title: this.title,
        message: this.message,
        password: this.password
      }

      let url = "https://gnito-api.herokuapp.com/api/"
      this.$http.post(url, drop).then( res => {


        this.$store.dispatch('setFlash', { 
          message:
          `
          <h2>Success!</h2>
          <a href="${url + res.data._id}?pwd=${res.data.password}">${url + res.data._id}?pwd=${res.data.password}</a>
          `,
          context: 'success'
        })
      })
    }
  }
}
</script>

<style>

  
</style>
