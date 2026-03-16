import { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

interface Match { user_id: number; full_name: string; similarity_score: number }

export default function MatchingScreen() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = '' // TODO: get from auth storage
    axios.get(`${API_URL}/matching/find`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setMatches(data.matches))
      .catch((e) => {
        if (e?.response?.status === 403) setError('Premium subscription required to view matches.')
        else setError('Failed to load matches. Please sign in and scan your face first.')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleConnect = (match: Match) => {
    Alert.alert('Connect', `Send a connection request to ${match.full_name || 'this user'}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Connect', onPress: () => Alert.alert('Sent!', 'Your connection request has been sent.') },
    ])
  }

  if (loading) return <View style={styles.center}><Text style={styles.loadingText}>Loading matches...</Text></View>
  if (error) return <View style={styles.center}><Text style={styles.errorText}>{error}</Text></View>

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item) => String(item.user_id)}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No matches found. Scan your face first!</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{(item.full_name || 'U')[0].toUpperCase()}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.full_name || `User #${item.user_id}`}</Text>
              <Text style={styles.score}>{Math.round(item.similarity_score * 100)}% facial similarity</Text>
            </View>
            <TouchableOpacity style={styles.connectBtn} onPress={() => handleConnect(item)}>
              <Text style={styles.connectText}>Connect</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  loadingText: { color: '#a78bfa', fontSize: 16 },
  errorText: { color: '#f87171', fontSize: 15, textAlign: 'center' },
  emptyText: { color: '#94a3b8', textAlign: 'center', marginTop: 40 },
  card: { backgroundColor: '#1e1e3f', borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#374151' },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#a78bfa', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  info: { flex: 1 },
  name: { color: '#f5f5f5', fontWeight: '600', fontSize: 15 },
  score: { color: '#a78bfa', fontSize: 13, marginTop: 2 },
  connectBtn: { backgroundColor: '#a78bfa', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 14 },
  connectText: { color: '#fff', fontWeight: '600', fontSize: 13 },
})
