<template>
  <div>
    <el-button type="danger" style="font-size: 14px" @click="addFirst"
      >添加一级分类</el-button
    >
    <div
      style="width: 100%;height: 1px;background-color: #ccc;margin: 20px 0"
    ></div>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div
              class="category"
              v-for="category in categoryList.item"
              :key="category.id"
            >
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                <span>{{ category.category_name }}</span>
                <div class="button-group">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="editCategory(category)"
                    >编辑</el-button
                  >
                  <el-button type="success" size="mini">添加子集</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="deleteCategory(category)"
                    >删除</el-button
                  >
                </div>
              </h4>
              <ul v-if="category.children">
                <li v-for="item in category.children" :key="item.id">
                  {{ item.category_name }}
                  <div class="button-group">
                    <el-button type="danger" size="mini">编辑</el-button>
                    <el-button type="primary" size="mini">删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <br />
          <el-form
            label-width="142px"
            :model="form"
            style="width: 410px"
            ref="category"
          >
            <el-form-item label="一级分类名称" v-model="first_input">
              <el-input
                v-model="form.categoryName"
                :disabled="status.first"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" v-if="second_input">
              <el-input
                v-model="form.secCategoryName"
                :disabled="status.second"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :loading="loading"
                :disabled="status.submit"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
import {
  AddFirstategory,
  GetCategory,
  DeleteCategory,
  EditCategory
} from "../../api/news";
import { global } from "../../utils/global3.0";
export default {
  setup(props, { root }) {
    const { confirm } = global();
    const first_input = ref(true);
    const second_input = ref(true);
    const loading = ref(false);
    const submitType = ref("");
    const currentData = reactive({
      categoryName: "",
      id: ""
    });
    const status = reactive({
      first: true,
      second: true,
      submit: true
    });
    const categoryId = ref("");
    const form = reactive({
      categoryName: "",
      secCategoryName: ""
    });
    const categoryList = reactive({
      item: []
    });
    const getCategory = () => {
      GetCategory().then(res => {
        const { data } = res.data.data;
        categoryList.item = data;
        loading.value = false;
        form.categoryName = "";
        form.secCategoryName = "";
      });
    };
    const submit = () => {
      if (!form.categoryName) {
        root.$message.warning("分类名不能为空");
        return;
      }
      let data;
      loading.value = true;
      if (submitType.value === "add") {
        data = {
          categoryName: form.categoryName
        };
        AddFirstategory(data)
          .then(res => {
            root.$message({
              type: "success",
              message: res.data.message
            });
            getCategory();
          })
          .catch(err => {
            console.log(err);
            loading.value = false;
            form.categoryName = "";
            form.secCategoryName = "";
          });
      } else if (submitType.value === "edit") {
        data = {
          id: currentData.id,
          categoryName: form.categoryName
        };
        EditCategory(data)
          .then(res => {
            root.$message({
              type: "success",
              message: res.data.message
            });
            getCategory();
          })
          .catch(err => {
            console.log(err);
            loading.value = false;
          });
      }
    };

    const addFirst = () => {
      first_input.value = true;
      second_input.value = false;
      status.first = false;
      status.submit = false;
      form.categoryName = "";
      submitType.value = "add";
    };
    const editCategory = category => {
      first_input.value = true;
      second_input.value = false;
      status.first = false;
      status.submit = false;
      form.categoryName = category.category_name;
      currentData.id = category.id;
      submitType.value = "edit";
    };
    const deleteCategory = category => {
      categoryId.value = category.id;
      confirm({
        content: "确认删除当前信息？",
        fn: deleteItem,
        catchFn: () => {
          categoryId.value = "";
        }
      });
    };
    const deleteItem = () => {
      DeleteCategory({ categoryId: categoryId.value }).then(() => {
        getCategory();
      });
    };
    onMounted(() => {
      getCategory();
    });
    return {
      loading,
      first_input,
      second_input,
      form,
      categoryList,
      status,
      categoryId,
      addFirst,
      editCategory,
      submit,
      deleteCategory
    };
  }
};
</script>
<style lang="scss" scoped>
.menu-title {
  line-height: 44px;
  background-color: #f3f3f3;
  padding-left: 22px;
}
li,
h4 {
  &:hover {
    @include webkit(transtion, all 0.3s ease 0);
    background-color: #f3f3f3;
    .button-group {
      display: block;
    }
  }
}
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    width: 32px;
    border-left: 1px dashed #000;
    left: 22px;
    top: 0;
    bottom: 0;
  }
  svg {
    position: absolute;
    font-size: 14px;
    top: 15px;
    left: 0;
  }
  h4 {
    padding-left: 40px;
  }
  li {
    padding-left: 36px;
    margin-left: 24px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: 32px;
      border-bottom: 1px dashed #000;
      left: 0;
      top: 22px;
    }
  }
  .button-group {
    position: absolute;
    z-index: 2;
    right: 11px;
    top: 0;
    display: none;
    button {
      font-size: 12px;
    }
  }
}
</style>
