import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import ScanScreen from './src/screens/ScanScreen'
import ResultsScreen from './src/screens/ResultsScreen'
import MatchingScreen from './src/screens/MatchingScreen'

export type RootStackParamList = {
  Home: undefined
  Scan: undefined
  Results: { diagnostic: string; attributes: Record<string, unknown> }
  Matching: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerStyle: { backgroundColor: '#1a1a2e' }, headerTintColor: '#a78bfa', headerTitleStyle: { fontWeight: 'bold' } }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'FacePairing' }} />
        <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scan Your Face' }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Your Diagnostic' }} />
        <Stack.Screen name="Matching" component={MatchingScreen} options={{ title: 'Face Matches' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
