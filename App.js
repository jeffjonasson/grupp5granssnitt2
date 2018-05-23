import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, Alert, Dimensions, Modal, TouchableHighlight,} from 'react-native';
import { createStackNavigator,} from 'react-navigation';
import { AppLoading, Asset, Font } from 'expo';

// Import Stylesheet
import Style from "./Styles.js";

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
const coordinatesHeight = [];
const coordinatesWidth = [];


/*
Function stolen from: https://www.jstips.co/en/javascript/shuffle-an-array/
*/

function shuffle(arr) {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;    
};


/* 
   Function stolen from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//TODO: What happens when one presses a answer button?
function checkAnswer(randAnsw, corrAnsw) {
    if (randAnsw = corrAnsw) {
return <Text>'CORRECT ANSWER' </Text>
    }

    else {}
	}


class MathRender extends React.Component {

    render() {
	var math = 0;
	var num1 = 0;
	var num2 = 0;
	var sum = 0;
	const answAlternatives = [];
	num1 =  getRandomInt(0,11);
	num2 = getRandomInt(0,11);
	sum = (num1 + num2).toString();
	randAnsw1 = getRandomInt(0,num1+num2+10).toString();
	randAnsw2 = getRandomInt(0,num1+num2+10).toString();
	answAlternatives.push(sum);
	answAlternatives.push(randAnsw1);
	answAlternatives.push(randAnsw2);
	var shuffledAlt = shuffle(answAlternatives);
	
	return (
		<View>
		<View>
			<Text style = {styles.question}>What is {num1} + {num2}?</Text>
		<View style = {styles.row}>
		<View style = {styles.modalButton}>
			<Button onPress={() =>  checkAnswer(shuffledAlt[0], sum)} title={shuffledAlt[0]} color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		<View style={styles.divider2}></View>
		<View style = {styles.modalButton}>
			<Button onPress={() =>  checkAnswer(shuffledAlt[1], sum)} title={shuffledAlt[1]} color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		<View style={styles.divider2}></View>
		<View style = {styles.modalButton}>
			<Button onPress={() =>  checkAnswer(shuffledAlt[2], sum)} title={shuffledAlt[2]} color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		</View>
		</View>
		</View>
	);
    }
}


class BallonRender extends React.Component {
    state = {
	modalVisible: false,
    };

    setModalVisible(visible) {
	this.setState({modalVisible: visible});
    }
    
    render() {
	var ballons = [];
	let randWidth = 0;
	let randHeight = 0;

	for (let i = 0; i <= 9; i++) { 
	    randHeight = getRandomInt(0,deviceHeight-150);
	    randWidth= getRandomInt(deviceWidth/2, deviceWidth-50);
	    coordinatesHeight.push(randHeight);
	    coordinatesWidth.push(randWidth);
	    
	    if (randHeight % 2 == 0){
		ballons.push(
			<View key ={i} style ={{top: randHeight, left:randWidth, width: Style.BALLON_WIDTH, height: Style.BALLON_HEIGHT, position: 'absolute'}}>
			<Image source ={require('./gulBallong.png')} style = {{flex:1 , width: undefined, height: undefined, resizeMode: 'center'}}></Image>

		    </View> ) }
	    else {
		ballons.push(
			<View key ={i} style ={{top: randHeight, left:randWidth, width: Style.BALLON_WIDTH, height: Style.BALLON_HEIGHT, position: 'absolute'}}>
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

	    
		<Modal
        	animationType="slide"
	    	supportedOrientations={['landscape']}
        	transparent={true}
        	visible={this.state.modalVisible}
        	onRequestClose={() => { alert('Modal has been closed.');}}>
		<View style={{backgroundColor: 'rgba(52, 52, 52, 0.75)', padding: Style.PADDING_MODAL, justifyContent: 'center', alignItems: 'center',}}>
		<View>
		<MathRender/>
		</View>
		</View>
		<View style = {styles.exitButton}>
			<Button onPress={() => this.setModalVisible(!this.state.modalVisible)} title='QUIT' color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>

		</Modal>
		
		<TouchableHighlight
            onPress={() => { this.setModalVisible(true); }}>
			<Text>Show Modal</Text>
		</TouchableHighlight>
		
	    </View>
	);
    }
}



class HomeScreen extends React.Component {
	state = {
		isLoadingComplete: false,
	  };

	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
			  <AppLoading
				startAsync={this._loadResourcesAsync}
				onError={this._handleLoadingError}
				onFinish={this._handleFinishLoading}
			  />
			);
		  } else {
		}

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
		_loadResourcesAsync = async () => {
			return Promise.all([
			  Asset.loadAsync([
				require('./vy2.png'),
			  ]),
			]);
		  };
		
		  _handleLoadingError = error => {
			// In this case, you might want to report the error to your error
			// reporting service, for example Sentry
			console.warn(error);
		  };
		
		  _handleFinishLoading = () => {
			this.setState({ isLoadingComplete: true });
		  };
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
	text: {
		fontSize: Style.FONT_SIZE,
		lineHeight: Style.FONT_SIZE * 1.5,
	},
    backgroundImage: {
		flex: 1,
    },
    buttonContainer: {
		backgroundColor: 'rgba(52, 52, 52, 0.3)',
		shadowColor: '#000000',
    	borderRadius: 10,
		padding: Style.PADDING,
    },
    divider: {
		width:0,
		height:Style.DIVIDER,
	},
	modalButton: {
		backgroundColor: 'lightblue',
		shadowColor: '#000000',
		borderRadius: 10,
		padding: Style.PADDING,
	},
	row: {
		flexDirection: 'row',
		padding: Style.ROW,
		alignItems: 'center',
		justifyContent: 'center',
	},
	divider2: {
		width:Style.WIDTH,
		height:0,
	},
	question: {
		color: 'white',
		fontSize: Style.FONT_SIZE_BIG,
		fontWeight: 'bold',
		textAlign: 'center',
		top: Style.MARGIN_TOP_QUESTION, 
	},
	exitButton: {
		backgroundColor: 'transparent',
		padding: Style.PADDING,
		alignSelf: 'flex-end',
		marginTop: Style.MARGIN_TOP_EXIT,
		marginLeft: Style.MARGIN_TOP_QUESTION,
		position: 'absolute',
	},
		
	})
	
	
	


