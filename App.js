import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, Alert, Dimensions, } from 'react-native';
import { createStackNavigator,} from 'react-navigation';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
const coordinatesHeight = [];
const coordinatesWidth = [];


class BallonRender extends React.Component {
    
    render() {
	var ballons = [];
	let randWidth = 0;
	let randHeight = 0;

	for (let i = 0; i <= 10; i++) { 
	    randHeight = Math.floor(Math.random() * Math.floor(deviceHeight))
	    randWidth = Math.floor(Math.random() * Math.floor(deviceWidth))
	    coordinatesHeight.push(randHeight);
	    coordinatesWidth.push(randWidth);
	    
	    if (randHeight % 2 == 0){
		ballons.push(
			<View key ={i} style ={{top: randHeight, left:randWidth, width: 50, height: 150, position: 'absolute'}}>
			<Image source ={require('./gulBallong.png')} style = {{flex:1 , width: undefined, height: undefined, resizeMode: 'center'}}></Image>

		    </View> ) }
	    else {
		ballons.push(
			<View key ={i} style ={{top: randHeight, left:randWidth, width: 50, height: 150, position: 'absolute'}}>
			<Image source ={require('./rodBallong.png')} style = {{flex:1 , width: undefined, height: undefined, resizeMode: 'center'}}></Image>

		    </View> )
	    }
	}

	return (
		<View>
		{ballons}
		<View style={styles.container}>
		<Text>{deviceWidth} 'DEVICE WIDTH'</Text>
		<Text>{deviceHeight} 'DEV HEIGHT'</Text>
		<Text>{randHeight} 'RAND HEIGHT'</Text>
		<Text>{randWidth} 'RAND WIDTH'</Text>
		<Text>{coordinatesWidth} 'COORD WIDTH'</Text>
		<Text>{coordinatesHeight} 'COORD HEIGHT'</Text>
		

	    </View>
		</View>
	);
    }
}



class HomeScreen extends React.Component {
    render() {
	return (
		<ImageBackground source={require('./vy2.png')} style={styles.backgroundImage}>
		<View style={styles.container}>	
		<View style={styles.buttonContainer}>
		<Button onPress={() => this.props.navigation.navigate('Game')} title="START GAME" color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		<View style={styles.divider}></View>
		<View style={styles.buttonContainer}>
		<Button onPress={() => this.props.navigation.navigate('Tutorial')} title="TUTORIAL" color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		</View>
		</ImageBackground>	    
	);
    }
}

class GameScreen extends React.Component {
    render() {


	return (
		<ImageBackground source={require('./vy2.png')} style={styles.backgroundImage}>
		<View style={styles.container}>
		<BallonRender/>
		</View>
		</ImageBackground>
	);
    }
} 

class TutorialScreen extends React.Component {
    render() {
	return (
		<ImageBackground source={require('./vy2.png')} style={styles.backgroundImage}>
		<View style={styles.container}>
		<Text>Tutorial Screen</Text>
		</View>
		</ImageBackground>
	);
    }
}

const RootStack = createStackNavigator(
    {
	Home: HomeScreen,
	Game: GameScreen,
	Tutorial: TutorialScreen,
    },
    {
	initialRouteName: 'Home',
    }
);

export default class App extends React.Component {
    render() {
	return <RootStack />;
    }
}




let styles = StyleSheet.create({
    container: {
	flex: 1,
	alignItems: 'center', 
	justifyContent: 'center',
    },
    backgroundImage: {
	flex: 1,
    },
    buttonContainer: {
	backgroundColor: 'rgba(52, 52, 52, 0.3)',
    	borderRadius: 10,
	padding: 10,
    	shadowColor: '#000000',
    	shadowOffset: {
      	    width: 0,
	    height: 3,
	},
	shadowRadius: 10,
	shadowOpacity: 0.25,
    },
    divider: {
	width:0,
	height:10,
    },

})


