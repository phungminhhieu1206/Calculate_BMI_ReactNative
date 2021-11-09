import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  Alert,
  Image
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export default function App() {

  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [BMI, setBMI] = useState(0);

  const clearField = () => {
    setSubmitted(() => {
      return false;
    });
    setAge(() => {
      return 0;
    });
    setHeight(() => {
      return 0;
    });
    setWeight(() => {
      return 0;
    });

  }

  const calculateBMI = () => {
    if (age == 0 || height == 0 || weight == 0) {
      Alert.alert(
        'Warning',
        'Age, Height, Weight are not null !', [
        {
          text: 'OK',
        },
      ])
    } else {
      setBMI(() => {
        let w = parseFloat(weight);
        let h = parseFloat(height);
        let bmi = (w * 10000) / (h * h);
        return bmi;
      })

      setSubmitted(() => {
        return true;
      })
    }

  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Image
          style={{ marginBottom: 40 }}
          source={require('./assets/logo.png')}
        />

        {/* AGE */}
        <View style={styles.field_container}>
          <MaterialCommunityIcons name="account" size={24} color="grey" style={{ marginRight: 15 }} />
          <View style={styles.field_right}>
            <Text>Age</Text>
            <TextInput
              value={age}
              onChangeText={(newAge) => setAge(newAge)}
              keyboardType="numeric"
            />
          </View>
        </View>


        {/* HEIGHT */}
        <View style={styles.field_container}>
          <MaterialCommunityIcons name="human-male-height-variant" size={24} color="grey" style={{ marginRight: 15 }} />
          <View style={styles.field_right}>
            <Text>Height (cm)</Text>
            <TextInput
              keyboardType="numeric"
              value={height}
              onChangeText={(newHeight) => setHeight(newHeight)}
            />
          </View>
        </View>


        {/* WEIGHT */}
        <View style={styles.field_container}>
          <MaterialCommunityIcons name="format-line-weight" size={24} color="grey" style={{ marginRight: 15 }} />
          <View style={styles.field_right}>
            <Text>Weight (kg)</Text>
            <TextInput
              keyboardType="numeric"
              value={weight}
              onChangeText={(newWeight) => setWeight(newWeight)}
            />
          </View>
        </View>

        {/* BUTTON */}
        <View style={styles.button_container}>
          <TouchableOpacity
            onPress={calculateBMI}
            style={{
              backgroundColor: 'red',
              marginRight: 20
            }}
          >
            <Text style={styles.button_text}>Calculate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={clearField}
            style={{
              backgroundColor: 'red'
            }}
          >
            <Text style={styles.button_text}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* SHOW BMI */}
        {submitted ?
          <Text
            numberOfLines={2}
            style={styles.text}
          >
            Your BMI: {BMI}
          </Text>
          :
          null
        }
      </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    color: 'white',
    paddingHorizontal: 25,
    paddingVertical: 7,
    textAlign: 'center',
    fontSize: 18
  },
  field_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  field_right: {
    flex: 1,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  button_container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: 'black',
    fontSize: 20,
    margin: 20,
  }
});
