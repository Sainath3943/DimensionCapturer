import React, { useState, useEffect } from 'react';
import {Pressable, Button, Image, View, Platform, Alert, StyleSheet, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaLibraryStatus.status !== 'granted') {
          Alert.alert('Sorry, we need media library permissions to make this work!');
        }
        setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');

        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
      }
    })();
  }, []);

  const pickImage = async () => {
    if (!hasMediaLibraryPermission) {
      Alert.alert('Media library permissions are not granted');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    if (!hasCameraPermission) {
      Alert.alert('Camera permissions are not granted');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
        <Pressable style={styles.button} onPress={openCamera}>
            <Text>Capture Image from Camera</Text>
        </Pressable>
        <Text style={styles.text}>OR</Text>
        <Pressable style={styles.button} onPress={pickImage}>
            <Text>Pick Image from Gallery</Text>
        </Pressable>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 5,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,

  },
});

export default App;
