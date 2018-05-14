import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, Alert } from 'react-native';
import { StackNavigator,} from 'react-navigation';

class GameScreen extends React.Component {
    render() {
	return (
	    	<ImageBackground source={require('./vy2.png')} style={styles.backgroundImage}>
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>Game Screen</Text>
		</View>
		</ImageBackground>
	);
    }
}
