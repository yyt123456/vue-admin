<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="4" style="width: 120px" v-if="level.includes('province')">
        <el-select v-model="data.provinceValue" @change="handleProvince">
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
        <el-select v-model="data.cityValue" @change="handleCity">
          <el-option
            v-for="(item, i) in listData.cityList"
            :key="i"
            :value="item.CITY_CODE"
            :label="item.CITY_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" style="width: 120px" v-if="level.includes('area')">
        <el-select v-model="data.areaValue" @change="handleArea">
          <el-option
            v-for="(item, i) in listData.areaList"
            :key="i"
            :value="item.AREA_CODE"
            :label="item.AREA_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" style="width: 120px" v-if="level.includes('street')">
        <el-select v-model="data.streetValue">
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
    level: {
      type: Array,
      default: function() {
        return [];
      }
    },
    propsData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  setup(props, { root, emit }) {
    console.log(root);
    const { handleProvince, handleCity, handleArea, listData } = Selection();
    let data = reactive({
      provinceValue: "",
      cityValue: "",
      areaValue: "",
      streetValue: ""
    });
    data = props.propsData;
    const getCity = () => {
      let requestData = { type: "province" };
      GetCityPicker(requestData).then(res => {
        listData.provinceList = res.data.data.data;
      });
    };
    watch(
      () => data.provinceValue,
      () => {
        data.cityValue = "";
        emit("listDatas", data);
      }
    );
    watch(
      () => data.cityValue,
      () => {
        data.areaValue = "";
        emit("listDatas", data);
      }
    );
    watch(
      () => data.areaValue,
      () => {
        data.streetValue = "";
        emit("listDatas", data);
      }
    );
    watch(
      () => data.streetValue,
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
