import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPodcasts} from '../actions';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import About from './About';
import Contact from './Contact';

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	background: white;
	position: fixed;
	top: 0%;
	left: 0%;
	right: 0%;
	text-align: center;
	border-bottom: none;
	z-index: 10;
	box-shadow: 0px 0px 3px 0px #ccc;
`;

const Title = styled.h1`
	color: #000033;
	font-size: 5rem;
	margin: 25px;
	margin-bottom: 5px;
	text-decoration: none;
	max-width: 400px;
	line-height: 50px;
	:hover {
		color: #777;
	}
`;

const Nav = styled.nav`
	margin-top: 0;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	margin-bottom: 10px;
`;

const NavItem = styled.a`
	margin: 10px;
	color: black;
	text-decoration: underline;
	:hover {
		color: #777;
		cursor: pointer;
	}
`;

class Header extends Component {
	constructor() {
		super();
		this.state = {
			contactModal: false,
			aboutModal: false,
			anyModal: false
		};
	}

	toggleModal = (ev, toggle) => {
		ev.preventDefault();
		ev.stopPropagation();
		if (!this.state.anyModal) {
			this.setState({
				[toggle]: !this.state[toggle],
				anyModal: !this.state.anyModal
			});
		} else {
			if (
				(toggle === 'contactModal' && this.state.contactModal) ||
				(toggle === 'aboutModal' && this.state.aboutModal)
			)
				this.setState({
					aboutModal: false,
					contactModal: false,
					anyModal: false
				});
		}
	};

	render() {

		return (
			<HeaderWrapper>
				<Title as={Link} to='/'>
					{this.props.jsonState.channel.title}
				</Title>
				<Nav>
					<NavItem
						as={Link}
						to='/'
						// onClick={() => this.props.getPodcasts()}
						>
						Episodes
					</NavItem>
					<NavItem href='http://humanperformanceoutliers.libsyn.com/rss'>
						Subscribe to RSS
					</NavItem>
					<NavItem href='https://itunes.apple.com/us/podcast/human-performance-outliers-podcast/id1363389413?mt=2'>
						On itunes
					</NavItem>
					<NavItem onClick={ev => this.toggleModal(ev, 'aboutModal')}>
						About
					</NavItem>
					<NavItem
						onClick={ev => this.toggleModal(ev, 'contactModal')}>
						Contact
					</NavItem>
				</Nav>
				{this.state.contactModal ? (
					<Contact toggleModel={this.toggleModal} jsonState={this.props.jsonState}/>
				) : (
					<></>
				)}
				{this.state.aboutModal ? (
					<About toggleModel={this.toggleModal} jsonState={this.props.jsonState}/>
				) : (
					<></>
				)}
			</HeaderWrapper>
		);
	}
}

export default connect(
	({jsonState}) => ({jsonState}),
	{getPodcasts}
)(Header);
