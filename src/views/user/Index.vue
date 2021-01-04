<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <Add ref="add" @refresh="onRefresh"></Add>
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
        <el-button type="danger" class="pull-right" @click="addUser"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <br />
    <Table
      :configTable="data.configTable"
      :tableRow.sync="data.tableRow"
      ref="TableList"
    >
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="2"
          inactive-value="1"
          @change="handleSwitch(slotData.data)"
        >
        </el-switch
      ></template>
      <template v-slot:operation="slotData">
        <el-button type="danger" @click="onDeleteOne(slotData.data)"
          >删除</el-button
        >
        <el-button type="success" @click="onEdit(slotData.data)"
          >编辑</el-button
        >
      </template>
      <template v-slot:tableFooterLeft>
        <el-button @click="onDelete">批量删除</el-button>
      </template>
    </Table>
  </div>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
import Table from "../../components/table";
import Add from "./dialog/add";
import { DeleteUser, UserActives } from "../../api/user";
import { global } from "../../utils/global3.0";
export default {
  components: {
    Table,
    Add
  },
  setup(props, { root, refs }) {
    console.log(root);
    const { confirm } = global();
    const data = reactive({
      value1: "name",
      value2: "",
      tableRow: {},
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
          { label: "邮箱/用户名", field: "username", width: "200" },
          { label: "姓名", field: "truename" },
          { label: "手机号", field: "phone" },
          { label: "地区", field: "region" },
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
    const addUser = () => {
      refs["add"].show();
    };
    const onDelete = () => {
      if (!data.tableRow.idItem || data.tableRow.idItem.length === 0) {
        root.$message({
          type: "warning",
          message: "请勾选选项"
        });
        return;
      }
      confirm({
        content: "确认删除当前信息？",
        fn: deleteUser
      });
    };
    const onDeleteOne = val => {
      confirm({
        content: "确认删除当前信息？",
        fn: function() {
          DeleteUser({ id: [val.id] }).then(() => {
            refs["TableList"].loadData();
          });
        }
      });
    };
    const deleteUser = () => {
      DeleteUser({ id: data.tableRow.idItem }).then(() => {
        refs["TableList"].loadData();
      });
    };
    const onEdit = data => {
      console.log(data);
    };
    const onRefresh = () => {
      refs["TableList"].loadData();
    };
    const handleSwitch = val => {
      UserActives({ id: val.id, status: val.status }).then(() => {
        // onRefresh()
      });
    };
    onMounted(() => {});
    return {
      data,
      onDelete,
      onDeleteOne,
      onEdit,
      onRefresh,
      addUser,
      handleSwitch
    };
  }
};
</script>
<style lang="scss" scoped>
.label-wrap {
  @include labelDom(left, 60, 40);
}
</style>
