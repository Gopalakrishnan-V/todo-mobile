import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
import { Textarea, Icon } from "native-base";
import { Toast } from "native-base";
import axios from "axios";
import { addTask, updateTask } from "../services/ApiServices";

export default class TaskScreen extends Component {
  constructor(props) {
    super(props);
    const task = this.props.navigation.state.params.task;
    this.state = { task };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const { task, onAddTask, onUpdateTask } = params;

    return {
      title: "Edit Task",
      headerRight: (
        <TouchableOpacity
          style={{
            marginEnd: 10
          }}
          onPress={async () => {
            const text = task.text;

            if (!task.id) {
              // ADD NEW TASK
              const responseTask = await addTask(task);
              if (responseTask) {
                onAddTask(responseTask);
                Toast.show({ text: "Task added successfully" });
                navigation.pop();
              }
            } else {
              //UPDATE EXISTING TASK
              const responseTask = await updateTask(task);
              if (responseTask) {
                onUpdateTask(responseTask);
                Toast.show({ text: "Task updated successfully" });
                navigation.pop();
              }
            }
          }}
        >
          <Icon
            ios="ios-cloud-done"
            android="md-cloud-done"
            style={{
              color: "white"
            }}
          />
        </TouchableOpacity>
      )
    };
  };

  render() {
    const { task } = this.state;

    return (
      <View style={styles.container}>
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Task here"
          style={{
            alignSelf: "stretch",
            flex: 1,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: -1
          }}
          value={task.text}
          onChangeText={value => {
            this.setState({ task: { ...task, text: value } }, () => {
              this.props.navigation.setParams({
                task: { ...task, text: value }
              });
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
