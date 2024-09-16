
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" >
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}


function LoginScreen({navigation}) {
    return(
        <ThemedView>
            <ThemedText>Login</ThemedText>
            <ThemedText type='link'  >
                <Link href="(tabs)" >
                Go to app
                </Link>
            </ThemedText>
        </ThemedView>
    )
}

function LandingScreen({navigation}) {
  return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <LinearGradient
            colors={['#000000', '#040c23', '#00234f']}
            style={styles.background}
            >
            <View style={styles.headerContainer}>
                <Image
                source={require('../assets/images/logo.png')} // Replace with your app's logo
                style={styles.logo}
                />
                {/* <Text style={styles.title}>ScanMeasure</Text> */}
            </View>

            <View style={styles.featureContainer}>
                <Ionicons name="scan-outline" size={80} color="#ffffff" />
                <ThemedText style={styles.featureText}>Instant Object Scanning</ThemedText>
            </View>

            <View style={styles.featureContainer}>
                <Ionicons name="analytics-outline" size={80} color="#fff" />
                <ThemedText style={styles.featureText}>Precise Measurement Analysis</ThemedText>
            </View>

            <View style={styles.featureContainer}>
                <Ionicons name="cube-outline" size={80} color="#fff" />
                <ThemedText style={styles.featureText}>3D Visualization</ThemedText>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <ThemedText style={styles.buttonText}>Get Started</ThemedText>
            </TouchableOpacity>
            <View style={styles.featureContainer}>

                <View style={styles.markerContainer}>
                    <Image
                    source={require('../assets/images/aruko1.png')}
                    style={[styles.marker, styles.markerLeft]}
                    />
                    <Image
                    source={require('../assets/images/aruko2.png')}
                    style={[styles.marker, styles.markerRight]}
                    />
                </View>
            </View>

            <ThemedText style={styles.footer}>With Aruko Marker</ThemedText>
            </LinearGradient>
        </ScrollView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 30,
  },
  scrollContent: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  featureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  featureText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#e94560',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
  },
  markerContainer: {
    top: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  marker: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  markerLeft: {
    transform: [{ rotate: '-15deg' }],
  },
  markerRight: {
    transform: [{ rotate: '15deg' }],
  },
});