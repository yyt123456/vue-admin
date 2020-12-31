<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <el-row :gutter="16">
      <el-col :span="20">
        <div class="label-wrap">
          <label>关键字：</label>
          <div class="wrap-content">
            <el-row :gutter="16">
              <el-col :span="3">
                <el-select v-model="data.value1" placeholder="请选择">
                  <el-option
                    v-for="(item, i) in data.options"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4"
                ><el-input v-model="data.value2" placeholder="请输入"></el-input
              ></el-col>
              <el-col :span="10"
                ><el-button type="danger">搜索</el-button></el-col
              >
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
    <br />
    <Table :configTable="data.configTable">
      <template v-slot:status="slotData">
        <!--<div>{{slotData}}</div>-->
        <el-switch
          v-model="slotData.data.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch
      ></template>
      <template v-slot:operation="slotData">
        <el-button type="danger" @click="onDelete(slotData.data)"
          >删除</el-button
        >
        <el-button type="success" @click="onEdit(slotData.data)"
          >编辑</el-button
        >
      </template>
    </Table>
  </div>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
import Table from "../../components/table";
export default {
  components: {
    Table
  },
  setup(props, { root }) {
    console.log(root);
    const data = reactive({
      value1: "name",
      value2: "",
      options: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" }
      ],
      configTable: {
        selection: true,
        checkBcx: true,
        pagination: true,
        tHead: [
          { label: "邮箱/用户名", field: "email", width: "200" },
          { label: "姓名", field: "name" },
          { label: "手机号", field: "phone" },
          { label: "地址", field: "address" },
          { label: "角色", field: "role" },
          {
            label: "禁用状态",
            field: "status",
            columnType: "slot",
            slotName: "status"
          },
          { label: "操作", columnType: "slot", slotName: "operation" }
        ]
      }
    });
    const onDelete = data => {
      console.log(data);
    };
    const onEdit = data => {
      console.log(data);
    };
    onMounted(() => {});
    return {
      data,
      onDelete,
      onEdit
    };
  }
};
</script>
<style lang="scss" scoped>
.label-wrap {
  @include labelDom(left, 60, 40);
}
</style>
