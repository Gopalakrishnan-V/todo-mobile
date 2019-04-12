import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, Alert } from "react-native";
import { Button, Label, Input, Item, Form } from "native-base";
import axios from "axios";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMode: true,
      loginForm: {
        userId: "",
        password: ""
      },
      registerForm: {
        name: "",
        userId: "",
        password: ""
      }
    };
  }

  static navigationOptions = {
    header: null
  };

  componentWillMount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        this.props.navigation.replace("HomeScreen");
      }
    } catch (error) {
      return;
    }
  };

  componentDidMount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        this.props.navigation.replace("HomeScreen");
      }
    } catch (error) {
      return;
    }
  };

  render() {
    const { loginMode, loginForm, registerForm } = this.state;

    return (
      <View style={styles.screenContainer}>
        {loginMode ? (
          <View style={styles.loginContainer}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              Welcome back!
            </Text>

            <Form style={{ alignSelf: "stretch", marginTop: 40 }}>
              <Item floatingLabel last>
                <Label style={{ color: "gray" }}>User ID</Label>
                <Input
                  value={loginForm.userId}
                  onChangeText={value => {
                    this.setState({
                      loginForm: { ...loginForm, userId: value }
                    });
                  }}
                  getRef={input => {
                    this.userIdRef = input;
                  }}
                  onSubmitEditing={() => {
                    this.passwordRef._root.focus();
                  }}
                  autoCapitalize="none"
                  returnKeyType={"next"}
                />
              </Item>

              <Item floatingLabel last>
                <Label style={{ color: "gray" }}>Password</Label>
                <Input
                  value={loginForm.password}
                  onChangeText={value => {
                    this.setState({
                      loginForm: { ...loginForm, password: value }
                    });
                  }}
                  getRef={input => {
                    this.passwordRef = input;
                  }}
                  secureTextEntry
                />
              </Item>

              <Button
                onPress={async () => {
                  const url = "http://192.168.29.141:6000/api/v1/auth/";
                  const requestPayload = {
                    id: loginForm.userId,
                    password: loginForm.password
                  };
                  try {
                    const response = await axios({
                      method: "post",
                      url,
                      data: requestPayload
                    });
                    const data = response.data.data;
                    const { token } = data;
                    try {
                      await AsyncStorage.setItem("token", token);
                      this.props.navigation.replace("HomeScreen");
                    } catch (error) {}
                  } catch (error) {
                    const errorResponse = error.response.data;
                    Alert.alert(errorResponse.error.message);
                  }
                }}
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  marginTop: 30,
                  backgroundColor: "#007aff"
                }}
              >
                <Text style={{ color: "white" }}>Login</Text>
              </Button>
            </Form>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Text>Don't have an account?</Text>
              <Text
                onPress={() => {
                  this.setState({ loginMode: false });
                }}
                style={{ marginStart: 10, color: "#007aff" }}
              >
                Sign up
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.registerContainer}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              Welcome to Todo App
            </Text>

            <Form style={{ alignSelf: "stretch", marginTop: 40 }}>
              <Item floatingLabel last>
                <Label style={{ color: "gray" }}>Name</Label>
                <Input
                  value={registerForm.name}
                  onChangeText={value => {
                    this.setState({
                      registerForm: { ...registerForm, name: value }
                    });
                  }}
                  getRef={input => {
                    this.nameRef = input;
                  }}
                  onSubmitEditing={() => {
                    this.userIdRef._root.focus();
                  }}
                  returnKeyType={"next"}
                />
              </Item>

              <Item floatingLabel last>
                <Label style={{ color: "gray" }}>User ID</Label>
                <Input
                  value={registerForm.userId}
                  onChangeText={value => {
                    this.setState({
                      registerForm: { ...registerForm, userId: value }
                    });
                  }}
                  getRef={input => {
                    this.userIdRef = input;
                  }}
                  onSubmitEditing={() => {
                    this.passwordRef._root.focus();
                  }}
                  autoCapitalize="none"
                  returnKeyType={"next"}
                  secureTextEntry={false}
                />
              </Item>

              <Item floatingLabel last>
                <Label style={{ color: "gray" }}>Password</Label>
                <Input
                  value={registerForm.password}
                  onChangeText={value => {
                    this.setState({
                      registerForm: { ...registerForm, password: value }
                    });
                  }}
                  getRef={input => {
                    this.passwordRef = input;
                  }}
                  secureTextEntry
                />
              </Item>

              <Button
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  marginTop: 30,
                  backgroundColor: "#007aff"
                }}
                onPress={async () => {
                  const url = "http://192.168.29.141:6000/api/v1/users/";
                  const requestPayload = {
                    name: registerForm.name,
                    id: registerForm.userId,
                    password: loginForm.password
                  };
                  try {
                    const response = await axios({
                      method: "post",
                      url,
                      data: requestPayload
                    });
                    const data = response.data.data;
                    const { token } = data;
                    try {
                      await AsyncStorage.setItem("token", token);
                      this.props.navigation.replace("HomeScreen");
                    } catch (error) {}
                  } catch (error) {
                    const errorResponse = error.response.data;
                    Alert.alert(errorResponse.error.message);
                  }
                }}
              >
                <Text style={{ color: "white" }}>Create an Account</Text>
              </Button>
            </Form>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Text>Already registered?</Text>
              <Text
                onPress={() => {
                  this.setState({ loginMode: true });
                }}
                style={{ marginStart: 10, color: "#007aff" }}
              >
                Log in
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginStart: 30,
    marginEnd: 30
  },
  registerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginStart: 30,
    marginEnd: 30
  }
});
