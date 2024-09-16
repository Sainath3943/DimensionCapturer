import React, { useState, useEffect } from 'react';
import { Image, View, Platform, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';


const LOCAL_IP = '192.168.0.114';  // Example IP, use your actual local IP
const SERVER_URL = `http://${LOCAL_IP}:8000`;

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      await processImage(result.assets[0].uri);
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
      await processImage(result.assets[0].uri);
    }
  };
  const processImage = async (uri: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      } as any);
      console.log('Sending image to server:', uri);
      console.log('Sending image to server:', formData);
    
      const response = await fetch(`${SERVER_URL}/process-image/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      if (response.ok) {
        const blob = await response.blob();
        const processedImageUri = URL.createObjectURL(blob);
        setProcessedImage(processedImageUri);
        
        // Get the processing message from the header
        const processMessage = response.headers.get('X-Process-Message');
        if (processMessage) {
          Alert.alert('Processing Result', processMessage);
        }
      } else {
        console.error('Error processing image:', response.statusText);
        Alert.alert('Error', 'Failed to process the image');
      }
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'An error occurred while processing the image');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedButton title="Capture Image from Camera" onPress={openCamera} />
      <ThemedText>OR</ThemedText>
      <ThemedButton title="Pick Image from Gallery" onPress={pickImage} />
      {image && (
        <View style={styles.imageContainer}>
          <ThemedText>Original Image:</ThemedText>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      {processedImage && (
        <View style={styles.imageContainer}>
          <ThemedText>Processed Image:</ThemedText>
          <Image source={{ uri: processedImage }} style={styles.image} />
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default App;