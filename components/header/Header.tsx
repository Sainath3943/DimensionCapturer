import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { Link } from 'expo-router';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ThemedView style={styles.header}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      {true ? (
        <ThemedView>
          <TouchableOpacity onPress={toggleMenu} style={styles.pfpContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.profilePic}
            />
          </TouchableOpacity>
          {isMenuOpen && (
            <ThemedView style={styles.menu}>
              <TouchableOpacity>
                <Link href="../" >
                    <ThemedText style={styles.menuItem}>
                        Logout
                    </ThemedText>
                </Link>
              </TouchableOpacity>
              <TouchableOpacity >
                <ThemedText style={styles.menuItem}>Help</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
        </ThemedView>
      ) : (
        <TouchableOpacity  style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
    pfpContainer: {
        backgroundColor: 'black',
    },
  header: {
    zIndex: 1000,
    top: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    backgroundColor: 'black',
  },
  menu: {
    position: 'absolute',
    width: 150,
    top: 50,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    color: '#000',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default Header;