<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button icon="el-icon-plus" type="primary" @click="showDialog"
        >添加</el-button
      >
      <el-button icon="el-icon-plus" type="primary" @click="getYiYan"
        >一键添加</el-button
      >
    </div>

    <el-table :data="tmList" border style="width: 100%; margin-bottom: 20px">
      <!-- type=index是展示序号的 -->
      <el-table-column align="center" label="序号" type="index" width="180">
      </el-table-column>
      <!-- 这里可以用prop来让列展示数据 -->
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column label="品牌LOGO">
        <!-- 如果每一列在是单纯展示数据，而是结构需要使用作用域插槽 row是当前列数据, $index-->
        <template slot-scope="{ row }">
          <el-image :src="row.logoUrl" style="width: 100px; height: 60px">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="editTm(row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete"
          @click="DeleteTm(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[3, 5, 7, 9]"
      :page-size="limit"
      layout="  prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>

    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          只能上传jpg/png文件，且不超过2MB，这是取决于我自己判断的，服务器也要判断
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEdit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { reqYiYan } from '@/api';
import { mapState } from "vuex";
export default {
  name: "Trademark",
  data() {
    return {
      page: 1,
      limit: 3,
      dialogFormVisible: false,
      tmForm: {
        tmName: "",
        logoUrl: "",
        // logoUrl: "http://47.93.148.192:8080/group1/M00/08/D4/rBHu8mO8KP2AJa7JAAbc-T-Nt24468.jpg",
      },
    };
  },
  computed: {
    ...mapState({
      tmList: (state) => state.trademark.tmList,
      total: (state) => state.trademark.total,
    }),
  },
  mounted() {
    this.getTmList();
  },
  methods: {
    //获取列表
    async getTmList(page, limit) {
      try {
        await this.$store.dispatch("trademark/getTmList", {
          page: this.page,
          limit: this.limit,
        });
        this.$message.success("品牌列表数据请求成功");
      } catch (error) {
        this.$message.error("错了哦，你数据请求错误");
      }
    },
    //图片上传之前   "image/jpeg"
    beforeAvatarUpload(file) {
      const typeArr = ["image/jpeg", "image/jpg", "image/png"];
      const typeOk = typeArr.indexOf(file.type) !== -1; //图片格式没问题
      const sizeOk = !(file.size / 1000 / 1000 > 2); //图片不大于2m
      console.log(typeArr.indexOf(file.type));
      // console.log(file);
      if (!typeOk) {
        this.$message.error("图片格式错误只能是" + "image/jpg", "image/png");
      } else if (!sizeOk) {
        this.$message.error("图片过大只能2m以内");
      }

      console.log(sizeOk && typeOk);

      return sizeOk && typeOk;
    },
    //图片上传成功  参数返回给我发请求返回的res
    handleAvatarSuccess(res) {
      this.$message.success("图片上传ing");
      console.log(res.data);
      console.log(this.tmForm.logoUrl);
      this.tmForm.logoUrl = res.data;
    },
    handleSizeChange(size) {
      //修改每页请求多少内容
      this.limit = size;
      this.getTmList();
    },
    handleCurrentChange(current) {
      this.page = current;
      this.getTmList();
    },
    //添加按钮 并且清空表单
    showDialog(res) {
      this.tmForm = {
        logoUrl: "",
        tmName: "",
      };
      this.dialogFormVisible = true;
    },
    //编辑按钮 回显当前列数据
    editTm(res) {
      this.dialogFormVisible = true;
      // console.log(res);
      this.tmForm = { ...res };
      // this.addOrEdit()
    },
    //删除按钮
    async DeleteTm(row){
      let res
     try {
      
      res= await this.$store.dispatch('trademark/getDeleteTm',row.id)
     } catch (error) {
      this.$message.error("删除失败");
     }
      this.$message.warning("删除成功"+res);
      this.getTmList()
    },
    //获取一言
   async getYiYan(){
      const res  = await reqYiYan()
      console.log(res);
      if(res.status===200){

       this.tmForm.tmName =  res.data.hitokoto +'数据来源:'+ res.data.from
       this.tmForm.logoUrl = 'https://img14.360buyimg.com/imgzone/jfs/t1/192652/19/14856/63499/60fd4dc5E9291a436/9128ae617a10ebb7.jpg'
      
      this.addOrEdit()
      this.$message.success('数据添加成功来源：'+  res.data.from)
      }
      
    },
    //确定按钮   用表单收集添加数据
   async  addOrEdit() {
     try {
      await  this.$store.dispatch("trademark/getAddOrEdit", this.tmForm);
     } catch (error) {
      this.$message.success("数据请求修改或删除失败");
     }
      // this.$store.dispatch("trademark/getAddOrEdit", {
      //   ...this.tmForm,
      // });
      this.dialogFormVisible = false;
      this.$message.success("成功老哥√");
      this.getTmList();
    },
  },
};
</script>

<style scoped>
/*如果要去更改elementui内部用到的样式，需要开启深度选择器*/
::v-deep.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
