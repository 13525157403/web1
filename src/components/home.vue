<template>
  <div>
    <el-button type="infor" @click="fnse">退出</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    fnse() {
      console.log(123)
      window.sessionStorage.clear('token')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
