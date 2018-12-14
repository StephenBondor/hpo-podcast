import React, {Component} from 'react';
import styled from 'styled-components';

export const FullDiv = styled.div`
	position: absolute;
	top: 0%;
	bottom: 0%;
	left: 0%;
	right: 0%;
	width: 100%;
	height: 100vh;
`;

export const InfoPlate = styled.div`
	border: none;
	width: 40%;
	margin: 15px auto;
	min-width: 270px;
	padding: 15px;
	text-decoration: none;
	color: black;
	background: white;
	box-shadow: 0px 1px 2px 0px #ccc;
	position: relative;
	z-index: 20;
	top: 10%;
	* {
		a {
			color: black;
		}
	}
`;

export const Title = styled.h2`
	border-bottom: 1px solid lightgrey;
	padding-bottom: 5px;
	text-align: center;
`;

export const Text = styled.div`
	font-style: italic;
	font-size: 1.2rem;
	color: grey;
`;

const Section = styled.div``;

const Name = styled.h3`
	margin-top: 10px;
`;

class Contact extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<FullDiv
				onClick={ev => {
					this.props.toggleModel(ev, 'contactModal');
				}}>
				<InfoPlate
					onClick={ev => {
						this.props.toggleModel(ev, 'oops!!');
					}}>
					<Title>Contact</Title>
					<Section>
						<Name>Sponsors</Name>
						<a href='http://butcherbox.com/'>Butcherbox</a> Code:
						"HPO" <br />
						<a href='http://thrivemarket.com/hpo'>
							thrivemarket.com/hpo
						</a>
						<br />
						<a href='https://www.patreon.com/HPOpodcast'>
							Patreon: HPO Podcast
						</a>
						<br />
					</Section>
					<Section>
						<Name>Shawn Baker, MD</Name>
						Instagram:{' '}
						<a href='https://www.instagram.com/shawnbaker1967/'>
							@shawnbaker1967
						</a>{' '}
						<br />
						Twitter:{' '}
						<a href='https://twitter.com/SBakerMD'>
							@SBakerMD
						</a>{' '}
						<br />
						Websites:{' '}
						<a href='https://www.shawn-baker.com/'>
							shawn-baker.com
						</a>
						<br />
						<a href='https://www.meatheals.com'>meatheals.com</a>
						<br />
						Consults:{' '}
						<a href='https://carnivoretrainingsystem.mykajabi.com/p/cts-landing-page'>
							Carnivore Training Systems
						</a>
						<br />
					</Section>
					<Section>
						<Name>Zach Bitter</Name>
						Instagram:{' '}
						<a href='https://www.instagram.com/zachbitter/'>
							@zachbitter
						</a>
						<br />
						Twitter:{' '}
						<a href='https://twitter.com/zbitter'>@zbitter</a>
						<br />
						Facebook:{' '}
						<a href='https://www.facebook.com/zbitter'>
							@zach.bitter
						</a>
						<br />
						YouTube:{' '}
						<a href='https://www.youtube.com/channel/UCmTH6Cz_j8eYq8oiOHDoTXg/featured'> Zach Bitter</a>
						Website:{' '}
						<a href='http://zachbitter.com/'>zachbitter.com</a>
						<br />
						Consults:{' '}
						<a href='https://calendly.com/zbittercoaching'>
							calendly.com/zbittercoaching
						</a>
						<br />
					</Section>
					<Name>Email</Name>
					<Section>
						<a href='mailto:hpopodcast@gmail.com'>
							hpopodcast@gmail.com
						</a>
					</Section>
				</InfoPlate>
			</FullDiv>
		);
	}
}

export default Contact;
