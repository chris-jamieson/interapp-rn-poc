import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [intentResult, setIntentResult] = useState(null);
  const [intentCancelled, setIntentCancelled] = useState(false);
  const [intentCompleted, setIntentCompleted] = useState(false);
  const [text, setText] = useState("");

  const PACKAGE_NAME = "com.example.firstparty";

  async function handleStart() {
    setIsStarted(true);

    // open via Intent
    const activityAction = ActivityAction.WIFI_SETTINGS; // ('Action.MAIN') - the value supplied here does not seem to matter
    const intentParams = {
      packageName: PACKAGE_NAME,
      className: `${PACKAGE_NAME}.MainActivity`,
      // flags: 536870912, // https://developer.android.com/reference/android/content/Intent#FLAG_ACTIVITY_SINGLE_TOP
      extra: {
        text: text,
        action: "GREET",
      },
    };

    try {
      const intentResult = await startActivityAsync(
        activityAction,
        intentParams
      );

      console.log("intent result: ", intentResult);

      setIntentResult(intentResult);
      if (intentResult.resultCode === 0) {
        setIntentCancelled(true);
      }
      if (intentResult.resultCode === -1) {
        setIntentCompleted(true);
      }
    } catch (error) {
      console.error("Intent error (message): ", error.message);
      console.error("Intent error (err): ", error);
    }
  }

  function handleReset() {
    setIsStarted(false);
    setIntentResult(null);
    setIntentCancelled(false);
    setIntentCompleted(false);
    setText("");
  }

  return (
    <View style={styles.container}>
      {!isStarted && (
        <>
          <Text>Enter text to be sent to other app:</Text>
          <TextInput style={styles.input} onChangeText={setText} value={text} />
          <Button
            onPress={handleStart}
            title="Open second app"
            color="red"
            disabled={text.length < 1}
          />
        </>
      )}

      {isStarted && (
        <>
          {intentCancelled && <Text>Action was CANCELLED</Text>}
          {intentCompleted && <Text>Action was COMPLETED</Text>}
          <Text>Intent result:</Text>
          {intentResult &&
            intentResult.extra &&
            intentResult.extra.response && (
              <Text>Response: {intentResult.extra.response}</Text>
            )}

          <Button onPress={handleReset} title="Reset" color="blue" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
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
