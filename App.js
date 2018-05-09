import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, Alert } from 'react-native';

export default class App extends React.Component {
    render() {
	return (
		<ImageBackground source={require('./vy2.png')} style={styles.backgroundImage}>
		
		<Button
	    onPress={() => {Alert.alert('Pressed!');
			   }}
	    title="START GAME"
	    color="#00e6dc"
		/>

		<Button
	    onPress={() => {Alert.alert('Pressed!');
			   }}
	    title="TUTORIAL"
	    color="#00e6dc"
		/>
		
	    </ImageBackground>

	    
	);
    }
}

// 

let styles = StyleSheet.create({
    backgroundImage: {
	flex: 1,
	//  resizeMode: 'stretch', //'cover', // or 'stretch'
	width: '100%',
	height: '100%'
    },
    /*  button: {
	flex: 3,
	backgroundColor: '#e535a8',
	alignItems: 'stretch',
	justifyContent: 'center',
	fontSize: 30,
	}, */
});


