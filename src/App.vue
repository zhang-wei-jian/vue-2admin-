<template>
  <div>
    <!-- <He></He> -->
    <router-view></router-view>
  </div>
</template>

<script>
import He from "@/components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    He,
  },
};
</script>

<style scoped>
</style>
