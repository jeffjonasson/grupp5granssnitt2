import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, Alert } from 'react-native';
import { createStackNavigator,} from 'react-navigation';


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
	}		
})


