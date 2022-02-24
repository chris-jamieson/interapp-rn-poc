import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";

const { ActivityCompletion } = NativeModules;

async function handleFinish(response) {
  console.log("handleFinish was called");
  const result = { response };
  ActivityCompletion.finish(ActivityCompletion.OK, "com.example.DONE", result);
}

async function handleCancel() {
  console.log("handleCancel was called");
  ActivityCompletion.finish(
    ActivityCompletion.CANCELED,
    "com.example.DONE",
    {}
  );
}

export default function App(props) {
  console.log("props: ", props);

  const [intentText, setIntentText] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (props.text) {
      setIntentText(props.text);
    }
  }, [props]);

  return (
    <View style={styles.container}>
      {intentText && intentText.length > 0 ? (
        <Text>Text from other app: {intentText}</Text>
      ) : (
        <Text>No text from other app</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={setResponse}
        value={response}
      />

      <Button
        onPress={() => handleFinish(response)}
        title="Finish activity"
        color="green"
        disabled={response.length < 1}
      />
      <Button onPress={() => handleCancel()} title="Cancel" color="yellow" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    width: 200,
    borderWidth: 1,
    padding: 10,
  },
});
