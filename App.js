import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, Alert } from 'react-native';
import { createStackNavigator,} from 'react-navigation';


class HomeScreen extends React.Component {
    render() {
	return (
		<ImageBackground source={require('./vy2.png')} style={styles.backgroundImage}>
		
		<Button
	    onPress={() => this.props.navigation.navigate('Game')}
	    title="START GAME"
	    color="#00e6dc"
		/>

		<Button
	    onPress={() => this.props.navigation.navigate('Tutorial')}
	    title="TUTORIAL"
	    color="#00e6dc"
		/>
		
	    </ImageBackground>

	    
	);
    }
}

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

class TutorialScreen extends React.Component {
    render() {
	return (
	    	<ImageBackground source={require('./vy2.png')} style={styles.backgroundImage}>
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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

/* export default class App extends React.Component {
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
   } */

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


