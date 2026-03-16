import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>

export default function ResultsScreen({ route, navigation }: Props) {
  const { diagnostic, attributes } = route.params

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Your Personality Diagnostic</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Facial Attributes</Text>
        {Object.entries(attributes)
          .filter(([, v]) => typeof v === 'string' || typeof v === 'number')
          .map(([k, v]) => (
            <Text key={k} style={styles.attribute}>
              <Text style={styles.attributeKey}>{k}: </Text>{String(v)}
            </Text>
          ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personality Report</Text>
        <Text style={styles.diagnostic}>{diagnostic}</Text>
      </View>

      <View style={styles.matchCta}>
        <Text style={styles.ctaTitle}>Find Your Face Matches</Text>
        <Text style={styles.ctaSubtitle}>Connect with people who share your facial traits</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Matching')}>
          <Text style={styles.buttonText}>View Matches</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 24, fontWeight: '700', color: '#f5f5f5', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#1e1e3f', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#374151' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#a78bfa', marginBottom: 12 },
  attribute: { color: '#e2e8f0', marginBottom: 4, fontSize: 14 },
  attributeKey: { fontWeight: '600' },
  diagnostic: { color: '#e2e8f0', lineHeight: 24, fontSize: 14 },
  matchCta: { backgroundColor: '#1e1e3f', borderRadius: 12, padding: 20, marginTop: 8, borderWidth: 2, borderColor: '#a78bfa', alignItems: 'center' },
  ctaTitle: { fontSize: 18, fontWeight: '700', color: '#f5f5f5', marginBottom: 8 },
  ctaSubtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 16, textAlign: 'center' },
  button: { backgroundColor: '#a78bfa', borderRadius: 10, paddingVertical: 14, paddingHorizontal: 40 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
})
