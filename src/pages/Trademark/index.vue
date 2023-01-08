<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button icon="el-icon-plus" type="primary">添加</el-button>
    </div>
    <el-table   border style="width: 100%">
      <el-table-column align="center" prop="date" label="序号" width="180"> </el-table-column>
      <el-table-column prop="name" label="品牌名称"> </el-table-column>
      <el-table-column prop="address" label="品牌LOGO"> </el-table-column>
      <el-table-column prop="address" label="操作"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "Trademark",
  data(){
    return {
      page:1,
       limit:3
    }
  },
  mounted(){
  this.getDeleteTm()
  },
  methods:{
    getDeleteTm(page, limit){
    
      
      this.$store.dispatch('getDeleteTm',{page:this.page,limit:this.limit})
    }
  }
};
</script>

<style scoped>
</style>
