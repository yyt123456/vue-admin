<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="4" style="width: 120px" v-if="level.includes('province')">
        <el-select v-model="data.value1" @change="handleProvince">
          <el-option
            v-for="(item, i) in listData.provinceList"
            :key="i"
            :value="item.PROVINCE_CODE"
            :label="item.PROVINCE_NAME"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" style="width: 120px" v-if="level.includes('city')">
        <el-select v-model="data.value2" @change="handleCity">
          <el-option
            v-for="(item, i) in listData.cityList"
            :key="i"
            :value="item.CITY_CODE"
            :label="item.CITY_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" style="width: 120px" v-if="level.includes('area')">
        <el-select v-model="data.value3" @change="handleArea">
          <el-option
            v-for="(item, i) in listData.areaList"
            :key="i"
            :value="item.AREA_CODE"
            :label="item.AREA_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" style="width: 120px" v-if="level.includes('street')">
        <el-select v-model="data.value4">
          <el-option
            v-for="(item, i) in listData.streetList"
            :key="i"
            :value="item.STREET_CODE"
            :label="item.STREET_NAME"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive, onMounted, watch } from "@vue/composition-api";
import { GetCityPicker } from "../../api/user";
import { Selection } from "./selection";

export default {
  props: {
    level: Array,
    default: function() {
      return [];
    }
  },
  setup(props, { root, emit }) {
    console.log(root);
    const { handleProvince, handleCity, handleArea, listData } = Selection();
    const data = reactive({
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    });
    const getCity = () => {
      let requestData = { type: "province" };
      GetCityPicker(requestData).then(res => {
        listData.provinceList = res.data.data.data;
      });
    };
    watch(
      () => data.value1,
      () => {
        data.value2 = "";
        emit("listDatas", data);
      }
    );
    watch(
      () => data.value2,
      () => {
        data.value3 = "";
        emit("listDatas", data);
      }
    );
    watch(
      () => data.value3,
      () => {
        data.value4 = "";
        emit("listDatas", data);
      }
    );
    watch(
      () => data.value4,
      () => {
        emit("listDatas", data);
      }
    );
    onMounted(() => {
      getCity();
    });
    return {
      data,
      listData,
      handleProvince,
      handleCity,
      handleArea
    };
  }
};
</script>
