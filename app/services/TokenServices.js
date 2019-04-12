import { AsyncStorage } from "react-native";

export const getToken = async () => {
  let token = null;
  try {
    token = await AsyncStorage.getItem("token");
  } catch (error) {}

  return token;
};
