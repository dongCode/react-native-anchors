import React, { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DynamicForm from './DynamicForm';

type ItemData = {
  id: string;
  title: string;
};

let uId = 1;

const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  index,
}: ItemProps) => (
  <View style={[styles.item, { backgroundColor }]}>
    <DynamicForm />
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

    {index % 3 === 0 ? (
      <>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>

        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
      </>
    ) : null}
  </View>
);

const App = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const [visibleIndex, setVisibleIndex] = useState(0);

  const handleScroll = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;

    const contentHeight = e.nativeEvent.contentSize.height;

    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;

    const currentPercentage = (offsetY + scrollViewHeight) / contentHeight;
    const index = Math.round(currentPercentage * DATA.length);

    setVisibleIndex(index);
  };
  const renderItem = ({ item, index }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        index={index}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  const ref = useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          ref.current.scrollToIndex({
            index: DATA.length - 2,
            animated: true,
          });
        }}
      >
        <Text>Scroll TO last</Text>
      </Pressable>
      <Text style={{ textAlign: 'center', padding: 20 }}>
        Currently visible item: {visibleIndex}
      </Text>
      <FlatList
        scrollEventThrottle={300}
        keyExtractor={() => `${uId++}`}
        onScroll={handleScroll}
        ref={ref}
        data={DATA}
        renderItem={renderItem}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
