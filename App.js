import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import styles from "./styles.js";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const getFonts = () =>
  Font.loadAsync({
    "borel-regular": "./assets/fonts/Borel-Regular.ttf",
  });

export default App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading startAsync={getFonts} onFinish={() => setFontLoaded(true)} />
  //   );
  // }
  if (!fontLoaded) {
    console.log("false");
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.log("error")}
      />
    );
  }
  const [showInput, setShowInput] = useState(false);
  const [addTask, setAddTask] = useState("");
  const [tasks, setTasks] = useState([
    {
      key: 0,
      task: "Eat",
    },
    {
      key: 1,
      task: "Code",
    },
    {
      key: 2,
      task: "Repeat",
    },
  ]);

  const showTextInput = () => {
    // console.log("show input");
    setShowInput(!showInput);
  };

  const updateTasks = () => {
    if (addTask.length == 0) return;

    tasks.push({ key: tasks.length, task: addTask });
    setTasks(tasks);
    setAddTask("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TODO List</Text>
      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={({ item }) => <ListItem item={item} setTasks={setTasks} />}
      />
      <View style={styles.container}>
        {showInput && (
          <TextInput
            value={addTask}
            onChangeText={setAddTask}
            style={styles.inputStyle}
            placeholder="Enter your task!"
            onSubmitEditing={updateTasks}
          ></TextInput>
        )}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            updateTasks();
            showTextInput();
          }}
        >
          <Icon name="add" color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const ListItem = ({ item, setTasks }) => {
  const [isChecked, setChecked] = useState(false);

  // ! why it is called when handleclick is called
  // console.log(`is checked = ${isChecked}`);

  const handleClick = () => {
    // console.log(`clicked on ${item.task}`);
    setChecked(!isChecked);
    // console.log(`new val ${isChecked}`);
  };
  // console.log(`------------- ${setTasks}`);
  const deleteItem = (id) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.key != id));
  };

  return (
    <View style={styles.row}>
      <View style={styles.row}>
        <CheckBox checked={isChecked} onPress={handleClick}></CheckBox>
        <Pressable onPress={handleClick}>
          <Text>{item.task}</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => deleteItem(item.key)}>
        <Icon name="delete" color="grey" />
      </Pressable>
    </View>
  );
};
