import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const LocationPicker = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // 省份选择逻辑
  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setSelectedCity('');
    setSelectedDistrict('');
  };

  // 城市选择逻辑
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedDistrict('');
  };

  // 区县选择逻辑
  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  // 渲染省份列表
  const renderProvinceList = () => {
    return provinces.map((province) => (
      <TouchableOpacity
        key={province}
        onPress={() => handleProvinceSelect(province)}
        style={selectedProvince === province ? styles.selectedItem : styles.item}
      >
        <Text>{province}</Text>
      </TouchableOpacity>
    ));
  };

  // 渲染城市列表
  const renderCityList = () => {
    if (!selectedProvince) {
      return null;
    }

    const cities = provinceData[selectedProvince];

    return cities.map((city) => (
      <TouchableOpacity
        key={city}
        onPress={() => handleCitySelect(city)}
        style={selectedCity === city ? styles.selectedItem : styles.item}
      >
        <Text>{city}</Text>
      </TouchableOpacity>
    ));
  };

  // 渲染区县列表
  const renderDistrictList = () => {
    if (!selectedCity) {
      return null;
    }

    const districts = cityData[selectedProvince][selectedCity];

    return districts.map((district) => (
      <TouchableOpacity
        key={district}
        onPress={() => handleDistrictSelect(district)}
        style={selectedDistrict === district ? styles.selectedItem : styles.item}
      >
        <Text>{district}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.title}>省份</Text>
        {renderProvinceList()}
      </View>
      <View style={styles.column}>
        <Text style={styles.title}>城市</Text>
        {renderCityList()}
      </View>
      <View style={styles.column}>
        <Text style={styles.title}>区县</Text>
        {renderDistrictList()}
      </View>
    </View>
  );
};

// 示例数据
const provinces = ['北京', '上海', '广东'];
const provinceData = {
  北京: ['北京市'],
  上海: ['上海市'],
  广东: ['广州市', '深圳市', '珠海市'],
};
const cityData = {
  北京: {
    北京市: ['东城区', '西城区', '朝阳区'],
  },
  上海: {
    上海市: ['黄浦区', '徐汇区', '静安区'],
  },
  广东: {
    广州市: ['越秀区', '天河区', '海珠区'],
    深圳市: ['福田区', '南山区', '罗湖区'],
    珠海市: ['香洲区', '斗门区', '金湾区'],
  },
};

// 样式
const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    paddingVertical: 5,
  },
  selectedItem: {
    paddingVertical: 5,
    backgroundColor: 'lightblue',
  },
};

export default LocationPicker;


