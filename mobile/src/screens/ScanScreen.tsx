import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>

export default function ScanScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false)

  const pickAndScan = async (useCamera: boolean) => {
    let result
    if (useCamera) {
      const perm = await ImagePicker.requestCameraPermissionsAsync()
      if (!perm.granted) { Alert.alert('Permission required', 'Camera access is needed.'); return }
      result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 })
    } else {
      result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 })
    }

    if (result.canceled || !result.assets[0]) return

    const image = result.assets[0]
    setLoading(true)

    try {
      const token = '' // TODO: get from auth storage
      const form = new FormData()
      form.append('file', { uri: image.uri, name: 'face.jpg', type: 'image/jpeg' } as unknown as Blob)

      const { data } = await axios.post(`${API_URL}/face/scan`, form, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      })

      navigation.navigate('Results', { diagnostic: data.diagnostic, attributes: data.attributes })
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      Alert.alert('Scan Failed', msg || 'Could not analyze face. Please try a clearer photo.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#a78bfa" />
        <Text style={styles.loadingText}>Analyzing your face...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Face Scan</Text>
      <Text style={styles.subtitle}>Take a photo or choose from your gallery</Text>
      <TouchableOpacity style={styles.button} onPress={() => pickAndScan(true)}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => pickAndScan(false)}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Choose from Gallery</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', color: '#f5f5f5', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#94a3b8', marginBottom: 40, textAlign: 'center' },
  loadingText: { color: '#a78bfa', marginTop: 16, fontSize: 16 },
  button: { backgroundColor: '#a78bfa', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 48, marginBottom: 16, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  secondaryButton: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#a78bfa' },
  secondaryButtonText: { color: '#a78bfa' },
})
