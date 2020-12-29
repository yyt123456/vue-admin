<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="type">分类:</label>
          <div class="wrap-content" id="type">
            <el-select v-model="value1" placeholder="请选择">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="label-wrap category">
          <label for="date">日期:</label>
          <div class="wrap-content" id="date">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap keywords">
          <label for="keywords">关键字:</label>
          <div class="wrap-content" id="keywords">
            <el-select v-model="value3" placeholder="请选择">
              <el-option
                v-for="item in options1.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="value4"
          placeholder="请输入"
          style="width: 100%"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="danger">搜索</el-button>
        <el-button type="danger" @click="openDialog">新增</el-button>
      </el-col>
    </el-row>
    <br />
    <el-table :data="tableData.list" border>
      <el-table-column
        type="selection"
        width="45"
        align="center"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="标题"
        width="350"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="categoryId"
        label="类型"
        width="200"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="createDate"
        label="日期"
        width="200"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="date"
        label="管理员"
        width="200"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteItem(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="openDialog"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50, 100]"
          layout="total,sizes,prev, pager, next,jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="tableData.pageSize"
          class="pull-right"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <DialogInfo ref="dialogInfo" :categoryList="options.category"></DialogInfo>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
import { global } from "../../utils/global3.0";
import { GetList } from "../../api/news";
import DialogInfo from "./dialog/index";
export default {
  components: {
    DialogInfo
  },
  setup(props, { root, refs }) {
    const { str, confirm } = global();
    console.log(str);
    const value1 = ref("");
    const value2 = ref("");
    const value3 = ref("");
    const value4 = ref("");
    const currentPage = ref(1);
    const options = reactive({
      category: []
    });
    const options1 = reactive({
      list: []
    });
    const tableData = reactive({
      list: [],
      total: 0,
      pageSize: 5,
      pageNumber: 1
    });
    const getList = () => {
      let data = {
        categoryId: "",
        startTiem: "",
        endTime: "",
        title: "",
        id: "",
        pageNumber: tableData.pageNumber,
        pageSize: tableData.pageSize
      };
      GetList(data).then(res => {
        console.log(res.data.data.total);
        tableData.list = res.data.data.data;
        tableData.total = res.data.data.total;
      });
    };
    const handleSizeChange = val => {
      tableData.pageSize = val;
      getList();
    };
    const handleCurrentChange = val => {
      tableData.pageNumber = val;
      getList();
    };
    const deleteItem = row => {
      console.log(row);
      //vue2.0全局使用
      // root.confirm({
      //   content: "确认删除当前信息？",
      //   fn: confirmDelete,
      //   id: "123"
      // });

      //vue3.0全局使用
      confirm({
        content: "确认删除当前信息？",
        fn: confirmDelete,
        id: "123"
      });
    };
    const deleteAll = () => {
      //vue3.0全局使用
      confirm({
        content: "确认删除全部信息？",
        fn: confirmDelete
      });
    };
    const confirmDelete = id => {
      console.log(id);
    };
    const openDialog = () => {
      refs["dialogInfo"].show();
    };
    const getCategory = async () => {
      options.category = await root.$getCategory();
    };
    onMounted(() => {
      getList();
      getCategory();
    });
    return {
      options,
      options1,
      tableData,
      value1,
      value2,
      value3,
      value4,
      currentPage,
      getList,
      deleteItem,
      deleteAll,
      handleSizeChange,
      handleCurrentChange,
      openDialog
    };
  }
};
</script>
<style lang="scss" scoped>
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(left, 93, 40);
  }
  &.keywords {
    @include labelDom(left, 60, 40);
  }
}
</style>
