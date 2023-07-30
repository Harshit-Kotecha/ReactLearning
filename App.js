import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";

const DATA = [
  {
    key: 0,
    task: "task 1",
  },
  {
    key: 1,
    task: "task 2",
  },
  {
    key: 2,
    task: "task 3",
  },
];

const ListItem = ({ item }) => {
  const [isChecked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!isChecked);
    print(`new val ${isChecked}`);
  };

  return (
    <View>
      <CheckBox onPress={handleClick}></CheckBox>
      <Text onPress={handleClick}>{item.task}</Text>
    </View>
  );
};

export default App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TODO List</Text>
      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "black",
    textAlign: "center",
    padding: 15,
  },
  list: {
    padding: 20,
    fontWeight: "500",
  },
});
