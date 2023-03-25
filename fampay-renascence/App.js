import React, { useState } from 'react';
import { View, Text, Image, StyleSheet , TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      
      <Image source={require('./assets/homescreen.png')} style={styles.image} />
    </View>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = async () => {
    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with fingerprint',
      fallbackLabel: 'Use your device password to sign in',
    });

    if (success) {
      setIsAuthenticated(true);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            options={{ title: 'Fingerprint Authentication' }}
          >
            {(props) => (
              <View style={styles.container}>
                <Text>Scan your fingerprint to login</Text>
                <Image source={require('./logo.png')} style={styles.logo} />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAuthentication}
                >
                  <Text style={styles.buttonText}>Scan Fingerprint</Text>
                </TouchableOpacity>
              </View>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,

  },
  button: {
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
