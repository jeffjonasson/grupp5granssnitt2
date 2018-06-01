import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, Alert, Dimensions, Modal, TouchableHighlight, Animated, PanResponder, State, } from 'react-native';
import { createStackNavigator,} from 'react-navigation';
import { AppLoading, Asset, Font } from 'expo';
import i18n from 'ex-react-native-i18n';
import Style from "./Styles.js";
import * as Animatable from 'react-native-animatable';


//Define coordinates, sizes, etc for generating the balloons.
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
let newBallones = true;
let popBalloon = false;
const coordinatesHeight = [];
const coordinatesWidth = [];
const circleRadius = 30;


/*
  Function stolen from: https://www.jstips.co/en/javascript/shuffle-an-array/
  Shuffles answers in order to present math problem differently
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
   Generates random integers based on max and min input 
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

/* 
   Displays answer to math problem 
*/
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

/* 
   Handles everything regarding the mathproblem, generates it, displays it and verifies it.   
*/
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

    /*
      Compares the, by the user, chosen answer to the correct answer and notifies the user if it is correct or not
    */
    checkAnswer(randAnsw, corrAnsw) {
	if (randAnsw == corrAnsw) {
	    this.setState({
		textValue:  <Text>{i18n.t('correct_answer')}</Text>
	    })
	    this.setState({color:'green'})
	    popBalloon = true;
	    

	}

	else {
	    this.setState({
		textValue: <Text>{i18n.t('wrong_answer')}</Text>
	    })
	    this.setState({color:'red'})
	    console.log(this.state.textValue)
	}

    }

    /*
      Generates three different alternatives to the math problem, and shuffles them with help from the function shuffle(). At least one alternative will be the correct answer
    */
    newQuessh() {
	this.state.num1 = getRandomInt(0,51);
	this.state.num2 = getRandomInt(0,51);
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
	
	//returns the math question as well as three answers. When pressing a button the function checkAnswer checks if it is the right alternative
	return (
		<View>
		<View>
		<View>
		<ShowAnswResult text= {this.state.textValue} />
		</View>
		<Text style = {styles.question}>{i18n.t('what_is')}{this.state.num1} + {this.state.num2}?</Text>
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

/* 
   Generates 10 balloons with a random distribution of color and display them. Colors available is red and yellow. Also checks wheater this rendering should happen or not, if no new balloons is needed it displays "the old ones", also checks if one balloon should be removed due to a correct answered question. This class also handles the displaying of the modal.
*/
class BallonRender extends React.Component {
    constructor(props){
	super(props);
	this.state = {
	    modalVisible: false,
	    randWidth: 0,
	    randHeight: 0,
	    nbrBalloons: 9,
	};
    }

    setModalVisible(visible) {
	this.setState({modalVisible: visible});
    }

    createBallones(){
	this.state.ballons=[];
	for (let i = 0; i <= this.state.nbrBalloons; i++) { 
	    this.state.randHeight = getRandomInt((deviceHeight / 4) - deviceHeight,0);
	    this.state.randWidth= getRandomInt(0, (deviceWidth/2) - deviceWidth/8);
	    coordinatesHeight.push(this.state.randHeight);
	    coordinatesWidth.push(this.state.randWidth);
	    
	    if (this.state.randHeight % 2 == 0){
		this.state.ballons.push(
			<View key ={i} style ={{top: this.state.randHeight, left: this.state.randWidth, width: Style.BALLON_WIDTH, height: Style.BALLON_HEIGHT, position: 'absolute'}}>
			<Image source ={require('./gulBallong.png')} style = {{flex:1 , width: undefined, height: undefined, resizeMode: 'center'}}></Image>

		    </View> ) }
	    else {
		this.state.ballons.push(
			<View key ={i} style ={{top: this.state.randHeight, left: this.state.randWidth, width: Style.BALLON_WIDTH, height: Style.BALLON_HEIGHT, position: 'absolute'}}>
			<Image source ={require('./rodBallong.png')} style = {{flex:1 , width: undefined, height: undefined, resizeMode: 'center'}}></Image>

		    </View> )
	    }
	}
	newBallones = false;
    }
    
    render() {
	if(popBalloon){
	    this.state.ballons.pop();
	    popBalloon = false;
	}
	else if(newBallones){
	    this.createBallones();
	}

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
		<Button onPress={() => this.setModalVisible(!this.state.modalVisible)} title={i18n.t('quit')} color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		</Modal>
		
		<TouchableHighlight
	    style = {styles.showModal}
	    onPress={() => { this.setModalVisible(true); }}>
		<Text>{i18n.t('modal')}</Text>
		</TouchableHighlight>
		</View>
	);
    }
}
/* 
   Creates draggable circle, designed in order to "shoot" the balloons and activate the modal 
*/
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
		Animated.sequence([
		    Animated.decay(this.state.pan, {
			// coast to a stop
			velocity: {
			    x: gesture.vx,
			    y: gesture.vy,}, // velocity from gesture release
			deceleration: 0.99895,
		    }),
		    Animated.spring(this.state.pan, {
			toValue: {x: 0, y: 0},    // return to start
			friction: 5
		    }),
		]).start(); 
	    }
	});
    }
    
    render() {
	const panStyle = {
	    transform: this.state.pan.getTranslateTransform()
	}
	return (
		<Animated.View
	    {...this.panResponder.panHandlers}
	    style={[panStyle, styles.circleFig]}
		>
		<Image source={require('./spikeball.png')} />
		</Animated.View>
	);
    }
}

/*
  This class displays the first view the user will see when opening the application. The user can choose between playing the game, go through the tutorial or switch language.
*/
class HomeScreen extends React.Component {
    state = {
	isLoadingComplete: false,
    };
    //Async call to init the locale
    componentWillMount() {
	i18n.initAsync();
    }

    handleClick(){
	this.props.navigation.navigate('Tutorial');
	this._play();
    }
    _play = async () => {
    	try {
	    const { soundObject, status } = await Expo.Audio.Sound.create(
		require('./assets/sounds/airplane.mp3'),
		{ shouldPlay: true}
	    );
	    // Your sound is playing!
	} catch (error) {
	    // An error occurred!
	}}

    render() {
	if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
	    return (
		    <AppLoading
		startAsync={this._loadResourcesAsync}
		onError={this._handleLoadingError}
		onFinish={this._handleFinishLoading}/>
	    );
	} else {
	}
	newBallones = true;
	popBalloon = false;
	return (
		<ImageBackground source={require('./vy2.png')} style={styles.backgroundImage}>
		<View style={styles.container}>	
		<View style={styles.buttonContainer}>
		<Button onPress={() => this.props.navigation.navigate('Game')} title={i18n.t('start')} color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		<View style={styles.divider}></View>
		<View style={styles.buttonContainer}>
		<Button onPress={() => this.handleClick(this)} title={i18n.t('tutorial')} color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		<TouchableHighlight onPress={() => {i18n.locale = 'en', this.forceUpdate()}}>
    		<Image style={styles.imageStyle} source={require('./flag-en.png')} />
		</TouchableHighlight>
		<View style={styles.divider3}></View>
		<TouchableHighlight onPress={() => {i18n.locale = 'sv', this.forceUpdate()}}>
    		<Image style={styles.imageStyle} source={require('./flag-se.png')} />
		</TouchableHighlight>
		</View>
		</ImageBackground>	    
	);
    }
    //Load the screen when background pic has finished loading 
    _loadResourcesAsync = async () => {
	return Promise.all([
	    Asset.loadAsync([
		require('./vy2.png'),
		require('./blue.jpg'),
		require('./getStarted.png'),
		require('./flag-en.png'),
		require('./flag-se.png'),
		require('./bird.png'),
		require('./pratbubbla.png'),
	    ]),
	]);
    };
    _handleLoadingError = error => {
	// In this case, you might want to report the error
	
	console.warn(error);
    };
    _handleFinishLoading = () => {
	this.setState({ isLoadingComplete: true });
    };
}

/*
  Game screen, displays the game view by calling the respective functions in order to generate balloons and a draggable circle. Also handles the aniation of the cloud. 
*/ 
class GameScreen extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    animationType: 'slideInDown',

	};
    }
    render() {
	return (
		<ImageBackground source={require('./vy2.png')} style={styles.backgroundImage}>
		<View style={styles.container}>
		<Animatable.View animation={this.state.animationType} iterationCount={"infinite"} direction={"alternate"} easing={"ease-in-out-sine"}>
		<Image source={require('./moln.png')}></Image>
		</Animatable.View>
		</View>
		<View style={styles.container}>
		<BallonRender/>
		<DraggableCircle/>
		</View>
		</ImageBackground>
	);
    }
} 

/*
  Displays the first part of the tutorial, includes a "welcome message"
*/ 
class TutorialScreen extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    animationType: 'slideInDown',

	};
    }
    render() {
	return (
		<ImageBackground source={require('./blue.jpg')} style={styles.backgroundImage}>
		<View style={styles.container}>
		<Animatable.View animation={this.state.animationType} iterationCount={"infinite"} direction={"alternate"} easing={"ease-in-out-sine"}>
		<TouchableHighlight onPress={() => this.props.navigation.navigate('Tutorial1')}>
		<Image style={styles.planeStyle} source={require('./getStarted.png')} />
		</TouchableHighlight>
		</Animatable.View>
		<Text style={styles.textStyle}>{i18n.t('begin')}</Text>
		</View>
		</ImageBackground>
	);
    }
}

/*
  Displays instructions for how to shot the spikeball and hit the balloones.
*/
class TutorialScreen1 extends React.Component {
    render() {
	return (
		<ImageBackground source={require('./screen1.png')} style={styles.backgroundImage}>
		<View style={styles.container}>
		<Text style={styles.instructions}>{i18n.t('drag_ball')}</Text>
		<Text style={styles.instructions2}>{i18n.t('hit_balloon')}</Text>
		<Text style={styles.instructions3}>{i18n.t('continue')}</Text>
		<TouchableHighlight onPress={() => this.props.navigation.navigate('Tutorial2')}>
		<Image style={styles.speakStyle} source={require('./pratbubbla.png')} />
		</TouchableHighlight>
		</View>
		</ImageBackground>
	);
    }
}


/*
  Displays instructions for how to answer the math question.
*/
class TutorialScreen2 extends React.Component {
    render() {
	return (
		<ImageBackground source={require('./screen2.png')} style={styles.backgroundImage}>
		<View style={styles.container}>
		<Text style={styles.instructions}>{i18n.t('instructions')}</Text>
		<Text style={styles.instructions2}>{i18n.t('continue')}</Text>
		<TouchableHighlight onPress={() => this.props.navigation.navigate('Tutorial3')}>
		<Image style={styles.speakStyle} source={require('./pratbubbla.png')} />
		</TouchableHighlight>
		</View>
		</ImageBackground>
	);
    }
}


/*
  Displays a button were one can press to continue to play the game.
*/
class TutorialScreen3 extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    animationType: 'slideInUp',
	    
	};
    }
    render() {

	newBallones = true;
	return (
		<ImageBackground source={require('./blue.jpg')} style={styles.backgroundImage}>
		<View style={styles.container}>
		<Animatable.View animation={this.state.animationType} iterationCount={"infinite"} direction={"alternate"} easing={"ease-in-out-sine"}>
		<Image style={styles.hot_air_balloon} source={require('./hot_air_balloon.png')} />
		</Animatable.View>
		<View style={styles.startButton}>
		<Button onPress={() => this.props.navigation.navigate('Game')} title={i18n.t('start')} color="#FFFFFF" accessibilityLabel="Tap on Me"/>
		</View>
		</View>
		</ImageBackground>
	);
    }
}

//Navigation btw screens
const RootStack = createStackNavigator(
    {
	Home: HomeScreen,
	Game: GameScreen,
	Tutorial: TutorialScreen,
	Tutorial1: TutorialScreen1,
	Tutorial2: TutorialScreen2,
	Tutorial3: TutorialScreen3,
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


/* 
   Styles. Uses predefined sizes in template Styles.js
*/
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
    divider3: {
	width:0,
	height:Style.DIVIDER2,
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
	width: circleRadius * 2,
	height: circleRadius * 2,
	borderRadius: circleRadius,
	position: 'absolute',
	left: deviceWidth/6 - circleRadius * 2,
	bottom: deviceHeight/6 - circleRadius
    },
    imageStyle: {
	width: circleRadius * 1.5,
	height: circleRadius * 1.5,
	left: Style.FLAG_POS_WIDTH, 
	top: Style.FLAG_POS_HEIGHT,
    },
    textStyle: {
	textAlign: 'center',
	bottom: -Style.DIVIDER2, 
	fontSize: Style.FONT_SIZE * 1.5, 
	lineHeight: Style.FONT_SIZE * 3, 
	color: 'white',
    },
    planeStyle: {
	width: Style.PLANE_WIDTH, 
	height: Style.PLANE_HEIGHT,
    },
    speakStyle: {
	width: Style.SPEAK_WIDTH, 
	height: Style.SPEAK_WIDTH, 
	bottom: Style.SPEAK_POS_BOTTOM, 
	left: Style.SPEAK_POS_LEFT, 
    },
    instructions: { 
	bottom: Style.INSTRUCTIONS1_BOTTOM, 
	left: Style.SPEAK_POS_LEFT,
	zIndex: 2,
	color: 'blue',
	fontWeight: 'bold',
	
    },
    instructions2: { 
	bottom: Style.INSTRUCTIONS2_BOTTOM, 
	left: Style.SPEAK_POS_LEFT,
	zIndex: 2, 
	color: 'blue',
	fontWeight: 'bold',
    },
    instructions3: { 
	bottom: Style.INSTRUCTIONS3_BOTTOM, 
	left: Style.SPEAK_POS_LEFT,
	zIndex: 2, 
	color: 'blue',
	fontWeight: 'bold',
    },
    hot_air_balloon: { 
	width: Style.HOT_AIR_BALLOON, 
	height: Style.HOT_AIR_BALLOON,
	left: Style.HOT_AIR_BALLOON,
    },
    startButton: {
	backgroundColor: 'rgba(52, 52, 52, 0.3)',
	shadowColor: '#000000',
	borderRadius: 10,
	padding: Style.PADDING,
	position: 'absolute',  
    },
    showModal: {
	position: 'absolute',
	left: (deviceWidth + 40) / 2 - (deviceWidth),
	bottom: (deviceHeight) - (deviceHeight / 2),
    }
})


/* 
   Multilingual support, english and swedish 
   Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
*/
i18n.fallbacks = true
i18n.translations = {
    en: {
	start: 'START GAME', 
	tutorial: 'TUTORIAL', 
	quit: 'QUIT',
	what_is: 'What is ',
	correct_answer: 'CORRECT ANSWER! PRESS QUIT TO CONTINUE', 
	wrong_answer: 'SORRY YOUR ANSWER IS WRONG, TRY AGAIN!', 
	begin: 'Lets begin! To continue, tap on the plane.', 
	drag_ball: 'Flick the spike ball', 
	hit_balloon: 'to hit the balloons.', 
	instructions: 'Choose button with right answer', 
	continue: 'Click here to continue!',
	modal: 'Press for question!',
	
    },
    sv: {
	start: 'BÖRJA SPELA', 
	tutorial: 'HJÄLP',
	quit: 'STÄNG',
	what_is: 'Vad är ',
	correct_answer: 'RÄTT SVAR! STÄNG FÖR ATT FORTSÄTTA', 
	wrong_answer: 'TYVÄRR DITT SVAR ÄR FEL, TESTA IGEN!', 
	begin: 'Vi kör igång! Tryck på planet för att fortsätta.',
	drag_ball: 'Skjut iväg spikbollen och',
	hit_balloon: 'pricka ballongerna.', 
	instructions: 'Välj knappen med rätt svar', 
	continue: 'Klicka här för att forsätta!',
	modal: 'Tryck för en fråga!',
    }
}





