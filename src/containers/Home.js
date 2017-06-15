import React, { Component } from "react";
import { connect } from "react-redux";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import classNames from "classnames";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";

import coupon from "../assets/coupon.svg";
import coffeCup from "../assets/coffee-cup.svg";
import playButton from "../assets/play-button.svg";
import baconSingle from "../assets/beacon-single.svg";
import designExperience from "../assets/design-experience.svg";
import freeApp from "../assets/free-app.svg";
import monitorContent from "../assets/monitor-content.svg";
import phone from "../assets/iphone.png";
import estimote from "../assets/estimote-beacons-preview.png";


import "./home.css";

const contents = ["one", "two", "three"];
let carouselInterval = null;

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			signupOpen: false,
			betaEmail: "",
			openDialog: false,
		};
	}

	handleClick = (index) => {
		console.log(index);
		this.setState({
			count: index,
		});
	}
	toggleSignup = () => {
		this.setState({
			signupOpen: !this.state.signupOpen,
		});
	}

	toggleDialog = () => this.setState({
		openDialog: !this.state.openDialog,
	});

	handleMouseOver = (index) => {
		clearInterval(carouselInterval);
	}

	handleMouseOut = (index) => {
		carouselInterval = this.setInterval();
	}

	handleSend = () => {
		if (this.state.betaEmail.length) {
			return fetch("https://nearables.com.au/api/send?access_token=f285e0cd60c09e4c34f6c02bf1e91bcaa51fdb9d", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: {
						from: this.state.betaEmail,
						to: "kris@mosquito.ie",
						subject: "[NEARABLES] - Beta form",
						message: this.state.message,
					},
				}),
			}).then(() => {
				this.toggleSignup();
				this.setState({
					betaEmail: "",
				});
				setTimeout(() => {
					this.toggleDialog();
				}, 500);
			});
		}
	}

	handleBetaEmailChange = (e) => {
		this.setState({
			betaEmail: e.target.value,
		});
	}

	setInterval = () => setInterval(() => {
		if (this.state.count === 2) {
			this.setState({ count: 0 });
		} else {
			this.setState({ count: (this.state.count + 1) });
		}
	}, 5000)

	componentDidMount() {
		carouselInterval = this.setInterval();
	}

	render() {
		const { dispatch, todos } = this.props;
		const { count } = this.state;

		const actions = [
			<FlatButton
				label="Close"
				primary={false}
				onTouchTap={this.toggleSignup}
			/>,
			<FlatButton
				label="Get notified"
				primary
				onTouchTap={this.handleSend}
			/>,
		];

		const RenderPhoneContent = () => {
			if (count === 0) {
				return <img className="coupon" src={coupon} alt="coupon" style={{ width: "60%", margin: "auto" }} />;
			}
			if (count === 1) {
				return <img className="coffee" src={coffeCup} alt="coffe" style={{ width: "60%", margin: "auto" }} />;
			}
			if (count === 2) {
				return <img className="playButton" src={playButton} alt="playButton" style={{ width: "60%", margin: "auto" }} />;
			}
			return "";
		};

		const Brand = props => <span style={{ color: "#00d4aa" }}>{props.children}</span>;

		return (
			<div className="home">
				<section className="banner">
					<h1>nearPlatform delivers content to nearby smartphones</h1>
					<h2>Engage your customers with instant vouchers, royality stamps, audio guides, and many more...</h2>
				</section>
				<div className="banner flex banner-demo">
					<div className="phone">
						<img src={phone} alt="phone" />
						<div
							className={
								classNames(
									"content",
									"flex",
									{
										one: count === 0,
										two: count === 1,
										three: count === 2,
									},
								)
							}
						>
							{<RenderPhoneContent />}
						</div>
					</div>
					<div className="beacons">
						<div className="touch">
							<button
								className={count === 0 && "active" || ""}
								onClick={this.handleClick.bind(null, 0)}
								onMouseOver={this.handleMouseOver}
								onMouseOut={this.handleMouseOut}
							>
								<span className="pulse" />
							</button>
							<button
								className={count === 1 && "active" || ""}
								onClick={this.handleClick.bind(null, 1)}
								onMouseOver={this.handleMouseOver}
								onMouseOut={this.handleMouseOut}
							>
								<span className="pulse" />
							</button>
							<button
								className={count === 2 && "active" || ""}
								onClick={this.handleClick.bind(null, 2)}
								onMouseOver={this.handleMouseOver}
								onMouseOut={this.handleMouseOut}
							>
								<span className="pulse" />
							</button>
						</div>
						<img src={estimote} alt="beacons content swtich" />
					</div>
				</div>
				<div className="banner white summary flex">
					<h3>It's Easy to get started</h3>
					<div className="features">
						<Paper>
							<h2>Buy or register own proximity devices</h2>
							<img src={baconSingle} alt="beacon" />
							{/* <FlatButton secondary={true} label="Learn more" /> */}
						</Paper>
						<Paper>
							<h2>Design your users experience</h2>
							<img src={designExperience} alt="beacon" />
							{/* <FlatButton secondary={true} label="Learn more" /> */}
						</Paper>
						<Paper>
							<h2>Offer free app to your users</h2>
							<img src={freeApp} alt="beacon" />
							{/* <FlatButton secondary={true} label="Learn more" /> */}
						</Paper>
						<Paper>
							<h2>Manage your content and analytics</h2>
							<img src={monitorContent} alt="beacon" />
							{/* <FlatButton secondary={true} label="Learn more" /> */}
						</Paper>
					</div>
					<RaisedButton primary label="Try our BETA platform for free" onClick={() => this.toggleSignup()} />
				</div>
				{/* <div className="Why Proximity Content?">
		add to your customer's experience
		increase user retention
		get insights into your customers behaviour
		</div>
		<div className="Why to choose us?">
		simple pricing from just $1 per beacon per month
		our platform is flexible and easy to use
		with us you can customise your customer experience to fit your business model
		we offer a complete solution, from content creation to hosting and sales of proximity devices
		</div>*/}

				<Dialog
					title="Stay tuned, we are lunching very soon..."
					actions={actions}
					modal
					open={this.state.signupOpen}
				>
					<p>Our <Brand>nearPlatform</Brand> is going to revolutionize the way peaople interact with the content on their smartphones.
							us your email below, and we will notify you the minute we open the doors.</p>
					<TextField
						value={this.state.betaEmail}
						onChange={this.handleBetaEmailChange}
						hintText="Enter your email here..."
					/>
				</Dialog>
				<Dialog
					title="Registration succesful!"
					actions={<FlatButton label="Close" primary onClick={this.toggleDialog} />}
					modal={false}
					open={this.state.openDialog}
					onRequestClose={this.toggleDialog}
				>
					You will hear from us as soon as our Beta version is ready. Thank you.
				</Dialog>
			</div>

		);
	}
}

export default connect((state) => {
	const { todos } = state;
	return { todos };
})(Home);
