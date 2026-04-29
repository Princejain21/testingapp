import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const UploadScreen = () => {
  const [metadata, setMetadata] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleContinue = () => {
    if (imageUri) {
      navigation.navigate('Capture', { overlayImage: imageUri });
    } else {
      Alert.alert('Please upload an image first');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Upload Screen</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Metadata (e.g. Car Name)"
          placeholderTextColor="#666"
          value={metadata}
          onChangeText={setMetadata}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <Text style={styles.uploadButtonText}>Tap to Upload Image</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueButton, !imageUri && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!imageUri}
        >
          <Text style={styles.continueButtonText}>Continue to Capture</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  uploadButton: {
    width: '100%',
    height: 200,
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  uploadButtonText: {
    color: '#AAA',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  continueButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#4ADE80',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  disabledButton: {
    backgroundColor: '#444',
  },
  continueButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UploadScreen;
