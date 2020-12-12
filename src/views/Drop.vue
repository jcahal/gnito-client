<template>
  <Card class="drop">
    <h1>{{ drop.title }}</h1>
    <p>{{ drop.message }}</p>
  </Card>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'Drop',
  components: {
    Card,
  },
  computed: mapState({
    drop: state => state.drop
  }),
  mounted() {
    this.$store.dispatch('retrieveDrop')
  }
}
</script>

<style>
  .drop {
    font-size: 3em;
  }

</style>
