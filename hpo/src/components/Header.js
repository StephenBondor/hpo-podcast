import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPodcasts} from '../actions';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
    align-items: center;
    background: darkred;
    position: fixed;
    top: 0%;
    left: 0%;
    right: 0%;
    text-align: center;
`;

const Title = styled.h1`
    color: gold;
    font-size: 5rem;
    margin: 25px;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-around;
`;

const NavItem = styled(Link)`
    margin: 10px;
    color: white;
`;

class Header extends Component {
	constructor() {
		super();
	}

	render() {
		const title = this.props.jsonState.channel.title;
		return (
			<HeaderWrapper>
				<Title>{title}</Title>
				<h3>
					This is a volunteer student redesign of{' '}
					<a href={this.props.jsonState.channel.link}>
						{title}'s&nbsp;libsyn website
					</a>
				</h3>
				<Nav>
					<NavItem to='/'>Email</NavItem>
					<NavItem to='/'>Subscribe to RSS</NavItem>
                    <NavItem to='/'>Find Us on itunes</NavItem>
					<NavItem to='/'>About</NavItem>
					<NavItem to='/'>Update the feed</NavItem>
                    
				</Nav>
			</HeaderWrapper>
		);
	}
}

export default connect(
	({jsonState}) => ({jsonState}),
	{getPodcasts}
)(Header);
