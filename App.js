import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, Alert, Dimensions, Modal, TouchableHighlight, Animated, PanResponder, State, } from 'react-native';
import { createStackNavigator,} from 'react-navigation';
import { AppLoading, Asset, Font } from 'expo';

// Import Stylesheet
import Style from "./Styles.js";

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
const coordinatesHeight = [];
const coordinatesWidth = [];
const circleRadius = 30;


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


class ShowAnswResult extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    isShowingText: true
		     };


        setInterval(() => {
	    this.setState(previousState => {
		return { isShowingText: previousState.isShowingText };
	    });
	}, 1000);
    }

    render() {
	let display = this.state.isShowingText ? this.props.text : '';
	
	return (
		<Text style = {styles.question}>{display}</Text>
	);
    }
}

class MathRender extends React.Component {
  constructor(props){
    super(props);
    this.state = {
	textValue: <Text></Text>,
	quesshDone: false,
	num1:0,
	num2:0,
	sum:0,
	shuffledAlt:[],
	color:'lightblue'
    }
    this.checkAnswer = this.checkAnswer.bind(this);
  }

    //TODO: Only the pressed button should change color, so different states? Something with states needs to be fixed.
    //TODO: If correct, the hited balloon needs to be removed.
    //TODO: Disabled the quit function until answered correctely? Or just not remove the hited balloon if closed before correct answer is given?
    checkAnswer(randAnsw, corrAnsw) {
	if (randAnsw == corrAnsw) {
	    this.setState({
		textValue:  <Text>'CORRECT ANSWER, PRESS QUIT TO CONTINUE'</Text>
	    })
	    this.setState({color:'green'})
	    console.log(this.state.textValue)

	}

	else {
		this.setState({
		textValue: <Text>'SORRY YOUR ANSWER IS WRONG, TRY AGAIN'</Text>
		})
	    	    this.setState({color:'red'})
		console.log(this.state.textValue)
	}

    }

    newQuessh() {
	this.state.num1 = getRandomInt(0,11);
	this.state.num2 = getRandomInt(0,11);
	this.state.sum = (this.state.num1 + this.state.num2).toString();
	let randAnsw1 = getRandomInt(0,this.state.num1+this.state.num2+10).toString();
	let randAnsw2 = getRandomInt(0,this.state.num1+this.state.num2+10).toString();
	let answAlternatives = [];
	answAlternatives.push(this.state.sum);
	answAlternatives.push(randAnsw1);
	answAlternatives.push(randAnsw2);
	this.state.shuffledAlt = shuffle(answAlternatives);
    }

    
    render() {
	if(!this.state.quesshDone){
	    this.newQuessh()
	    this.state.quesshDone = true
	}
	
	return (
		<View>
		<View>
		<View>
		<ShowAnswResult text= {this.state.textValue} />
		</View>
		<Text style = {styles.question}>What is {this.state.num1} + {this.state.num2}?</Text>
		<View style = {styles.row}>
		<View style = {[styles.modalButton,{backgroundColor: this.state.color}]}>
		<Button onPress={() =>  this.checkAnswer(this.state.shuffledAlt[0], this.state.sum)} title={this.state.shuffledAlt[0]} color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		<View style={styles.divider2}></View>
		<View style = {[styles.modalButton,{backgroundColor: this.state.color}]}>
		<Button onPress={() =>  this.checkAnswer(this.state.shuffledAlt[1], this.state.sum)} title={this.state.shuffledAlt[1]} color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		
	    </View>
		<View style={styles.divider2}></View>
		<View style ={[styles.modalButton,{backgroundColor: this.state.color}]}>
		<Button onPress={() =>  this.checkAnswer(this.state.shuffledAlt[2], this.state.sum)} title={this.state.shuffledAlt[2]} color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		</View>
		</View>
		</View>
	);
    }
}


class BallonRender extends React.Component {
      constructor(props){
    super(props);
   this.state = {
       modalVisible: false,
       ballons: [],
   };
      }

    setModalVisible(visible) {
	this.setState({modalVisible: visible});
    }

    createBallones(){
	let randWidth = 0;
	let randHeight = 0;

	for (let i = 0; i <= 9; i++) { 
	    randHeight = getRandomInt(0,deviceHeight-150);
	    randWidth= getRandomInt(deviceWidth/2, deviceWidth-50);
	    coordinatesHeight.push(randHeight);
	    coordinatesWidth.push(randWidth);
	    
	    if (randHeight % 2 == 0){
		this.state.ballons.push(
			<View key ={i} style ={{top: randHeight, left:randWidth, width: Style.BALLON_WIDTH, height: Style.BALLON_HEIGHT, position: 'absolute'}}>
			<Image source ={require('./gulBallong.png')} style = {{flex:1 , width: undefined, height: undefined, resizeMode: 'center'}}></Image>

		    </View> ) }
	    else {
		this.state.ballons.push(
			<View key ={i} style ={{top: randHeight, left:randWidth, width: Style.BALLON_WIDTH, height: Style.BALLON_HEIGHT, position: 'absolute'}}>
			<Image source ={require('./rodBallong.png')} style = {{flex:1 , width: undefined, height: undefined, resizeMode: 'center'}}></Image>

		    </View> )
	    }
	}
    }
    
    render() {
	this.createBallones();


	/*
Add the following lines under this.state.ballons to view thw coordinates, declaration of variables needs to be changed if it should work (i.e this.state.rand...)
	    	<View style={styles.container}>
		<Text>{deviceWidth} 'DEVICE WIDTH'</Text>
		<Text>{deviceHeight} 'DEV HEIGHT'</Text>
		<Text>{randHeight} 'RAND HEIGHT'</Text>
		<Text>{randWidth} 'RAND WIDTH'</Text>
		<Text>{coordinatesWidth} 'COORD WIDTH'</Text>
		<Text>{coordinatesHeight} 'COORD HEIGHT'</Text>	
		</View>
*/
	return (
		<View>
		{this.state.ballons}

	    
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

class DraggableCircle extends React.Component {
	constructor() {
		super();
	  	this.state = {
			pan: new Animated.ValueXY()
	  	};
	}

	componentWillMount() {
	  	// Add a listener for the delta value change
	  	this._val = { x: 0 , y: 0 }
	  	this.state.pan.addListener((value) => this._val = value);
	  	// Initialize PanResponder with move handling
	  	this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (e, gesture) => true,
			onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),
			// this.state.pan.setValue({ x:0, y:0})
			onPanResponderRelease: (e, gesture) => {
				/* Animated.spring(this.state.pan, {
				  	toValue: { x: 0, y: 0 },
				 	friction: 5
				}).start(); */
				Animated.sequence([
					Animated.decay(this.state.pan, {
						// coast to a stop
						velocity: {x: 0.8, y: -0.2}, // velocity from gesture release
						deceleration: 0.99895,
					}),
					Animated.spring(this.state.pan, {
						toValue: {x: 0, y: 0},    // return to start
						friction: 5
					}),
				]).start(); 
			}
		});
		console.log(this._val.x + " " + this._val.y)
	}
  
	render() {
		const panStyle = {
			transform: this.state.pan.getTranslateTransform()
		}
		return (
			<Animated.View
				{...this.panResponder.panHandlers}
				style={[panStyle, styles.circleFig]}
			/>
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
		<DraggableCircle/>
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
    circleFig: {
		backgroundColor: "grey",
		width: circleRadius * 2,
		height: circleRadius * 2,
		borderRadius: circleRadius,
		position: 'absolute',
		left: 100,
		bottom: 50
	  }
})





