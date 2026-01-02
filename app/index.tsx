import { Redirect } from "expo-router";
import { View } from "react-native";
const mainApp = () => {
  return(
    <View style={{marginTop:50}}>
         <Redirect href="/login" />
    </View>
  );
}

export default mainApp;