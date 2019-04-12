import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
import { List, ListItem, Icon } from "native-base";
import axios from "axios";
import { StackActions } from "react-navigation";
import { connect } from "react-redux";
import {
  handleFetchTasks,
  handleDeleteTask,
  handleAddTask,
  handleUpdateTask
} from "../actions/HomeActions";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const { onAddTask, onUpdateTask } = params;

    return {
      title: "Todo",
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              marginEnd: 10
            }}
            onPress={async () => {
              try {
                await AsyncStorage.clear();
                navigation.dispatch(StackActions.popToTop);
                navigation.replace("WelcomeScreen");
              } catch (error) {
                console.log("error", error);
              }
            }}
          >
            <Icon
              ios="ios-log-out"
              android="md-log-out"
              style={{
                color: "white"
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginStart: 20,
              marginEnd: 10
            }}
            onPress={() => {
              navigation.navigate("TaskScreen", {
                task: { id: null, text: "" },
                onAddTask,
                onUpdateTask
              });
            }}
          >
            <Icon
              ios="ios-add"
              android="md-add"
              style={{
                color: "white"
              }}
            />
          </TouchableOpacity>
        </View>
      )
    };
  };

  componentDidMount = async () => {
    this.props.navigation.setParams({
      onUpdateTask: this.props.onUpdateTask,
      onAddTask: this.props.onAddTask
    });
    this.props.onFetchTasks();
  };

  render() {
    const { tasks } = this.props;
    return (
      <View style={styles.container}>
        <List style={{ alignSelf: "stretch" }}>
          {tasks.map((task, taskIndex) => {
            return (
              <ListItem
                style={styles.listItem}
                key={taskIndex}
                onPress={() => {
                  this.props.navigation.navigate("TaskScreen", {
                    task,
                    onAddTask: this.props.onAddTask,
                    onUpdateTask: this.props.onUpdateTask
                  });
                }}
                onLongPress={() => {
                  Alert.alert(
                    "Delete",
                    "Are you sure you want to delete this task?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed")
                      },
                      {
                        text: "Yes",
                        onPress: () => this.props.onDeleteTask(task.id)
                      }
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Text>{task.text}</Text>
              </ListItem>
            );
          })}
        </List>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.home.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchTasks: () => {
      dispatch(handleFetchTasks());
    },
    onDeleteTask: id => {
      dispatch(handleDeleteTask(id));
    },
    onAddTask: task => {
      dispatch(handleAddTask(task));
    },
    onUpdateTask: task => {
      dispatch(handleUpdateTask(task));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  listItem: {
    marginLeft: 0,
    marginRight: 0,
    padding: 10
  }
});
