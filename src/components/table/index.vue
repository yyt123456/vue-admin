<template>
  <div>
    <el-table
      :data="data.tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="45"
        align="center"
        v-if="data.tableConfig.selection"
      ></el-table-column>
      <template v-for="item in data.tableConfig.tHead">
        <el-table-column
          v-if="item.columnType === 'slot'"
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.columnType === 'function'"
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          align="center"
        >
        </el-table-column>
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          align="center"
          v-else
        >
        </el-table-column>
      </template>
    </el-table>
    <br />
    <div class="footer">
      <div style="text-align: left">
        <slot name="tableFooterLeft"></slot>
      </div>
      <div style="text-align: right" v-if="data.tableConfig.pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageData.currentPage"
          :page-sizes="pageData.pageSizes"
          :page-size="pageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  reactive,
  onMounted,
  onBeforeMount,
  watch
} from "@vue/composition-api";
import { GetUserList } from "../../api/user";
import { paginationHook } from "./paginationHook";
export default {
  props: {
    configTable: {
      type: Object,
      default: () => {}
    },
    tableRow: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit }) {
    const {
      pageData,
      handleSizeChange,
      handleCurrentChange
    } = paginationHook();
    const data = reactive({
      tableConfig: {
        selection: false,
        checkBcx: false,
        pagination: false,
        tHead: []
      },
      tableData: []
    });
    watch(
      [() => pageData.currentPage, () => pageData.pageSize],
      ([currentPage, pageSize]) => {
        pageData.currentPage = currentPage;
        pageData.pageSize = pageSize;
        loadData();
      }
    );
    let loadData = () => {
      let requestData = {
        pageNumber: pageData.currentPage,
        pageSize: pageData.pageSize
      };
      GetUserList(requestData).then(res => {
        data.tableData = res.data.data.data;
        pageData.total = res.data.data.total || 10;
      });
    };
    const init = () => {
      let initData = props.configTable;
      const keys = Object.keys(data.tableConfig);
      for (let i in initData) {
        if (keys.includes(i)) {
          data.tableConfig[i] = initData[i];
        }
      }
    };
    const handleSelectionChange = val => {
      let rowData = {
        idItem: val.map(item => item.id)
      };
      emit("update:tableRow", rowData);
    };
    onBeforeMount(() => {
      init();
      loadData();
    });
    onMounted(() => {
      console.log(root);
    });
    return {
      data,
      pageData,
      handleSizeChange,
      handleCurrentChange,
      loadData,
      handleSelectionChange
    };
  }
};
</script>
<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
