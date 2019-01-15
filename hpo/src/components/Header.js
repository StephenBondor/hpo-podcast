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
	background: rgba(fff, fff, fff, 0.5);
	top: 0%;
	left: 0%;
	right: 0%;
	text-align: center;
	border-bottom: none;
	z-index: 10;
`;

const Title = styled.h1`
	color: #000033;
	font-size: 4rem;
	margin: 20px;
	margin-bottom: 5px;
	text-decoration: none;
	line-height: 50px;

	:hover {
		color: #777;
	}

	@media (max-width: 639px) {
		margin: 15px;
		margin-bottom: 0px;
	}
	@media (max-width: 445px) {
		font-size: 3rem;
		margin: 5px;
		margin-bottom: 0px;
		line-height: 35px;
	}
`;

const Nav = styled.nav`
	margin-top: 0;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	margin-bottom: 5px;
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
					<NavItem as={Link} to='/'>
						Episodes
					</NavItem>
					<NavItem
						href='http://humanperformanceoutliers.libsyn.com/rss'
						target='_blank'
						rel='noopener noreferrer'>
						RSS
					</NavItem>
					<NavItem
						href='https://itunes.apple.com/us/podcast/human-performance-outliers-podcast/id1363389413?mt=2'
						target='_blank'
						rel='noopener noreferrer'>
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
					<Contact
						toggleModel={this.toggleModal}
						jsonState={this.props.jsonState}
					/>
				) : (
					<></>
				)}
				{this.state.aboutModal ? (
					<About
						toggleModel={this.toggleModal}
						jsonState={this.props.jsonState}
					/>
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
