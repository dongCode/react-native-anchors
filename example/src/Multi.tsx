import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const LocationPicker = () => {
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  // 省份选择逻辑
  const handleProvinceSelect = (province) => {
    const isSelected = selectedProvinces.includes(province);
    if (isSelected) {
      setSelectedProvinces(selectedProvinces.filter((p) => p !== province));
      setSelectedCities([]);
      setSelectedDistricts([]);
    } else {
      setSelectedProvinces([...selectedProvinces, province]);
    }
  };

  // 城市选择逻辑
  const handleCitySelect = (city) => {
    const isSelected = selectedCities.includes(city);
    if (isSelected) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
      setSelectedDistricts([]);
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  // 区县选择逻辑
  const handleDistrictSelect = (district) => {
    const isSelected = selectedDistricts.includes(district);
    if (isSelected) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  // 全选省份
  const selectAllProvinces = () => {
    setSelectedProvinces(provinces);
    setSelectedCities([]);
    setSelectedDistricts([]);
  };

  // 全选城市
  const selectAllCities = () => {
    const cities = [];
    provinces.forEach((province) => {
      cities.push(...provinceData[province]);
    });
    setSelectedCities(cities);
    setSelectedDistricts([]);
  };

  // 全选区县
  const selectAllDistricts = () => {
    const districts = [];
    const cities = [];
    selectedProvinces.forEach((province) => {
      cities.push(...provinceData[province]);
    });
    cities.forEach((city) => {
      districts.push(...cityData[city]);
    });
    setSelectedDistricts(districts);
  };

  // 渲染省份列表
  const renderProvinceList = () => {
    return (
      <>
        <TouchableOpacity
          onPress={selectAllProvinces}
          style={[
            styles.item,
            selectedProvinces.length === provinces.length && styles.selectedItem,
          ]}
        >
          <Text>全选</Text>
        </TouchableOpacity>
        {provinces.map((province) => (
          <TouchableOpacity
            key={province}
            onPress={() => handleProvinceSelect(province)}
            style={[
              styles.item,
              selectedProvinces.includes(province) && styles.selectedItem,
            ]}
          >
            <Text>{province}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  // 渲染城市列表
  const renderCityList = () => {
    if (selectedProvinces.length === 0) {
      return null;
    }

    let cities = [];
    selectedProvinces.forEach((province) => {
      cities = cities.concat(provinceData[province]);
    });

    return (
      <>
        <TouchableOpacity
          onPress={selectAllCities}
          style={[
            styles.item,
            selectedCities.length === cities.length && styles.selectedItem,
          ]}
        >
          <Text>全选</Text>
        </TouchableOpacity>
        {cities.map((city) => (
          <TouchableOpacity
            key={city}
            onPress={() => handleCitySelect(city)}
            style={[
              styles.item,
              selectedCities.includes(city) && styles.selectedItem,
            ]}
          >
            <Text>{city}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  // 渲染区县列表
  const renderDistrictList = () => {
    if (selectedCities.length === 0) {
      return null;
    }

    let districts = [];
    selectedCities.forEach((city) => {
      districts = districts.concat(cityData[city]);
    });

    return (
      <>
        <TouchableOpacity
          onPress={selectAllDistricts}
          style={[
            styles.item,
            selectedDistricts.length === districts.length && styles.selectedItem,
          ]}
        >
          <Text>全选</Text>
        </TouchableOpacity>
        {districts.map((district) => (
          <TouchableOpacity
            key={district}
            onPress={() => handleDistrictSelect(district)}
            style={[
              styles.item,
              selectedDistricts.includes(district) && styles.selectedItem,
            ]}
          >
            <Text>{district}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
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
  北京市: ['东城区', '西城区', '朝阳区'],
  上海市: ['黄浦区', '徐汇区', '静安区'],
  广州市: ['越秀区', '天河区', '海珠区'],
  深圳市: ['福田区', '南山区', '罗湖区'],
  珠海市: ['香洲区', '斗门区', '金湾区'],
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
