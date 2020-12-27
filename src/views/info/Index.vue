<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="type">类型:</label>
          <div class="wrap-content" id="type">
            <el-select v-model="value1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
                v-for="item in options1"
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
        <el-button type="danger">新增</el-button>
      </el-col>
    </el-row>
    <br />
    <el-table :data="tableData" border>
      <el-table-column
        type="selection"
        width="45"
        align="center"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="date"
        label="标题"
        width="350"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="date"
        label="类型"
        width="200"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="date"
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
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-row>
      <el-col :span="12">
        <el-button size="medium">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          layout="total,sizes,prev, pager, next,jumper"
          :total="50"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="20"
          class="pull-right"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
export default {
  setup(props, { root }) {
    const value1 = ref("");
    const value2 = ref("");
    const value3 = ref("");
    const value4 = ref("");
    const currentPage = ref(1);
    const options = reactive([
      {
        value: "选项1",
        label: "黄金糕"
      },
      {
        value: "选项2",
        label: "双皮奶"
      }
    ]);
    const options1 = reactive([
      {
        value: "选项1",
        label: "黄金糕"
      },
      {
        value: "选项2",
        label: "双皮奶"
      }
    ]);
    const tableData = reactive([{}]);
    const handleClick = row => {
      console.log(row);
    };
    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
    };
    onMounted(() => {
      console.log(root);
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
      handleClick,
      handleSizeChange,
      handleCurrentChange
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
