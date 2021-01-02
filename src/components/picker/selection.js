import { reactive } from "@vue/composition-api";
import { GetCityPicker } from "../../api/user";
export function Selection() {
  const listData = reactive({
    provinceList: [],
    cityList: [],
    areaList: [],
    streetList: []
  });
  const handleProvince = val => {
    getCity(val, "city");
  };
  const handleCity = val => {
    getCity(val, "area");
  };
  const handleArea = val => {
    getCity(val, "street");
  };
  const getCity = (val, type) => {
    let requestData;
    if (type === "city") {
      requestData = { type: type, province_code: val };
    } else if (type === "area") {
      requestData = { type: type, city_code: val };
    } else if (type === "street") {
      requestData = { type: type, area_code: val };
    }

    GetCityPicker(requestData).then(res => {
      if (type === "city") {
        listData.cityList = res.data.data.data;
      } else if (type === "area") {
        listData.areaList = res.data.data.data;
      } else if (type === "street") {
        listData.streetList = res.data.data.data;
      }
    });
  };
  return {
    listData,
    handleProvince,
    handleCity,
    handleArea
  };
}
