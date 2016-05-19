import React from "react-native"

let { View, Text, Image, StyleSheet } = React;

var getImage = require('./getImage');

var API_KEY = "57612bfe4cd224da464728928311e13f";

var App = React.createClass({
	getInitialState: function(){
		return {
			summary: '',
			temp: '',
			humidity: '',
			wind: '',
			loading: true

		}
	},
	componentWillMount: function() {
		fetch('https://api.forecast.io/forecast/' + API_KEY + '/45.523220,-122.668752')
		.then(res => res.json())
		.then(data => {
			this.setState({
				summary: data.currently.summary,
				temp: data.currently.temperature,
				humidity: data.currently.windSpeed,
				wind: data.currently.windSpeed,
				icon: data.currently.icon,
				loading: false
			})
		})
	},
	render: function() {

		if (this.state.loading) {
			return (
				<View style={[styles.half, styles.vertical, styles.center]}>
					<Text style={styles.text}>Loading...</Text>
				</View>
				)
		}
		return(
			<View style={styles.container}>
				<View style={[styles.half, styles.center, styles.vertical]}>
					<Image source={getImage(this.state.icon)} style={{width: 200, height: 200}}/>
					<Text>{this.state.summary}</Text>
				</View>
				<View style={[styles.half, styles.center]}>
					<Text style={styles.text}>Temperature: {this.state.temp}</Text>
					<Text style={styles.text}>Humidity: {this.state.humidity}</Text>
					<Text style={styles.text}>Wind Speed: {this.state.wind}</Text>
				</View>
			</View>
		)
	}
})

let styles = StyleSheet.create({
	container: {
		backgroundColor: 'lightblue',
		flex: 1
	},
	half: {
		flex: 1
	},
	text: {
		fontSize: 22,
		fontWeight: '100',
		marginVertical: 10
	},
	center: {
		alignItems: 'center'
	},
	vertical: {
		justifyContent: 'center'
	}
})

export default App;