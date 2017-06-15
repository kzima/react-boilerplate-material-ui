import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Menu from "material-ui/Menu";
import RaisedButton from "material-ui/RaisedButton";
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import LogoIcon from "material-ui/svg-icons/image/blur-on";

import Popover from "material-ui/Popover";
import Dialog from "material-ui/Dialog";
import fetch from "isomorphic-fetch";

import "./main.css";

export default class MainLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			openContact: false,
			email: "",
			message: "",
			openDialog: false,
		};
	}

	handleToggle = () => this.setState({
		open: !this.state.open,
	});

	toggleDialog = () => this.setState({
		openDialog: !this.state.openDialog,
	});

	handleClose = () => this.setState({
		open: false,
	});

	handleCloseContact = () => this.setState({
		openContact: false,
	});

	simulateKeyPress() {
	// var e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Esc", char : "Esc", shiftKey : true});
	// document.querySelector('body').dispatchEvent(e);

	}
	handleSendMessage(e) {
	// const el = document.querySelector('body');
   // this.simulateKeyPress();
		if (this.state.email.length > 3 && this.state.message.length > 3) {
			return fetch("https://nearables.com.au/api/send?access_token=f285e0cd60c09e4c34f6c02bf1e91bcaa51fdb9d", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: {
						from: this.state.email,
						to: "kris@mosquito.ie",
						subject: "[NEARABLES] - contact form",
						message: this.state.message,
					},
				}),
			}).then(() => {
				this.toggleDialog();
				this.setState({
					email: "",
					message: "",
				});
			});
		}
	}

	handleTouchTap = (event) => {
	// This prevents ghost click.
		event.preventDefault();

		this.setState({
			openContact: !this.state.openContact,
			anchorEl: event.currentTarget,
		});
	};

	changeEmail = (event) => {
		this.setState({
			email: event.target.value,
		});
	}

	changeMessage = (event) => {
		this.setState({
			message: event.target.value,
		});
	}


	render() {
		return (
			<div>
				<Toolbar>
					<ToolbarGroup firstChild style={{ marginLeft: 0 }}>
						<FlatButton
							label="NEARABLES"
							className="logo"
							labelPosition="after"
							secondary
							icon={<LogoIcon />}
						/>
					</ToolbarGroup>
					<ToolbarGroup>
						<RaisedButton
							className="btn-contact"
							label="Contact Us"
							labelPosition="before"
							primary
							onTouchTap={this.handleTouchTap}
							icon={<NavigationExpandMoreIcon />}
						/>

						<Popover
							open={this.state.openContact}
							anchorEl={this.state.anchorEl}
							anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
							targetOrigin={{ horizontal: "left", vertical: "top" }}
							onRequestClose={this.handleCloseContact}
							style={{ zIndex: 900 }}
						>
							<Menu className="menu-contact">
								{/* <MenuItem><a href="tel:+61404690873">Call us: +61404690873</a></MenuItem>
			<Divider style={{backgroundColor: "#00d4aa"}}/>*/}
								<div className="form">
									<TextField
										floatingLabelText="Your Email"
										floatingLabelFixed
										hintText="joe@example.com"
										value={this.state.email}
										onChange={this.changeEmail}
									/><br />
									<TextField
										hintText="Type here..."
										floatingLabelText="Message"
										floatingLabelFixed
										multiLine
										value={this.state.message}
										onChange={this.changeMessage}
										rows={2}
									/>
									<div className="text-right"><FlatButton onClick={e => this.handleSendMessage(e)} label="Send Message" primary style={{ alignSelf: "right" }} /></div>
								</div>
							</Menu>
						</Popover>
					</ToolbarGroup>
				</Toolbar>
				{/* <Drawer  open={this.state.open }>
			<AppBar
				style={{height: 56}}
				showMenuIconButton={false}
				// title="Nearables"
				iconElementRight={<IconButton onTouchTap={this.handleClose}>
				<NavigationCloseIcon />
					</IconButton>} />
			<MenuItem onTouchTap={this.handleClose} onclick={() => this.handleRedirect()} >Menu Item</MenuItem>
			<MenuItem onTouchTap={this.handleClose} onclick={() => this.handleRedirect()} >Menu Item 23</MenuItem>
				</Drawer>*/}
				{this.props.children}
				<footer className="banner">
					Nearables, 155 Queen St, Brisbane City QLD 4000, Australia
				</footer>
				<Dialog
					title="Your messgae has been sent!"
					actions={<FlatButton label="Close" primary onClick={this.toggleDialog} />}
					modal={false}
					open={this.state.openDialog}
					onRequestClose={this.toggleDialog}
				>
					You will hear from us within 1 business day. Thank you.
				</Dialog>
			</div>
		);
	}
}
