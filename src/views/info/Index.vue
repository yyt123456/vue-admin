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
              value-format="yyyy-MM-dd hh:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
        <el-button type="danger" @click="search">搜索</el-button>
        <el-button type="danger" @click="openDialog">新增</el-button>
      </el-col>
    </el-row>
    <br />
    <el-table
      :data="tableData.list"
      border
      @selection-change="handleSelectionChange"
    >
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
        :formatter="formatterCategory"
        width="200"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="createDate"
        label="日期"
        :formatter="formatterDate"
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
          <el-button type="text" size="small" v-btn-perm="'info:del'"
            >自定义测试</el-button
          >
          <el-button
            @click="deleteItem(scope.row)"
            type="text"
            size="small"
            v-if="$button('info:del')"
            >删除</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="openEditInfo(scope.row)"
            v-if="$button('info:edit')"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="goDetail(scope.row)"
            v-if="$button('info:detailed')"
            >编辑详情</el-button
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
          :current-page="tableData.pageNumber"
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
    <EditInfo ref="editInfo" :categoryList="options.category"></EditInfo>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
import { global } from "../../utils/global3.0";
import { GetList, DeleteInfo } from "../../api/news";
import DialogInfo from "./dialog/index";
import EditInfo from "./dialog/edit";
export default {
  components: {
    DialogInfo,
    EditInfo
  },
  setup(props, { root, refs }) {
    const { str, confirm } = global();
    console.log(str);
    const value1 = ref("");
    const value2 = ref("");
    const value3 = ref("");
    const value4 = ref("");
    const deleteId = ref("");
    const options = reactive({
      category: []
    });
    const options1 = reactive({
      list: [
        {
          value: "id",
          label: "ID"
        },
        {
          value: "title",
          label: "标题"
        }
      ]
    });
    const tableData = reactive({
      list: [],
      total: 0,
      pageSize: 5,
      pageNumber: 1
    });
    const search = () => {
      getList();
    };
    const formatterDate = row => {
      return root
        .$moment(new Date(row.createDate * 1000))
        .format("YYYY-MM-DD hh:mm:ss");
    };
    const formatterCategory = row => {
      if (options.category.find(item => item.id === row.categoryId)) {
        return options.category.find(item => item.id === row.categoryId)
          .category_name;
      } else {
        return "";
      }
    };
    const formData = () => {
      let data = {
        pageNumber: tableData.pageNumber,
        pageSize: tableData.pageSize
      };
      if (value1.value) {
        data.categoryId = value1.value;
      }
      if (value2.value) {
        data.startTiem = value2.value[0];
        data.endTime = value2.value[1];
      }
      if (value3.value) {
        data[value3.value] = value4.value;
      }
      return data;
    };
    const getList = () => {
      let data = formData();
      GetList(data).then(res => {
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
    const handleSelectionChange = val => {
      deleteId.value = val.map(item => item.id);
    };
    const deleteItem = row => {
      console.log(row);
      deleteId.value = [row.id];
      //vue2.0全局使用
      // root.confirm({
      //   content: "确认删除当前信息？",
      //   fn: confirmDelete
      // });

      //vue3.0全局使用
      confirm({
        content: "确认删除当前信息？",
        fn: confirmDelete
      });
    };
    const deleteAll = () => {
      //vue3.0全局使用
      if (!deleteId.value) {
        root.$message({
          type: "warning",
          message: "请选择删除项"
        });
        return;
      }
      confirm({
        content: "确认删除全部信息？",
        fn: confirmDelete
      });
    };
    const confirmDelete = () => {
      DeleteInfo({ id: deleteId.value }).then(() => {
        deleteId.value = "";
        getList();
      });
    };
    const openDialog = () => {
      refs["dialogInfo"].show();
    };
    const openEditInfo = data => {
      refs["editInfo"].show(data);
    };
    const getCategory = async () => {
      options.category = await root.$getCategoryAll();
    };
    const goDetail = data => {
      root.$ls.set("detail", data);
      root.$router.push("/infoDetail");
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
      getList,
      search,
      deleteItem,
      deleteAll,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      openDialog,
      openEditInfo,
      formatterDate,
      formatterCategory,
      goDetail
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
.hidden-button {
  display: none;
}
</style>
