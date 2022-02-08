import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import VeridaLogo from '../assets/images/verida_logo.svg';
import VeridaClient from '../api/veridaClient';
import '../assets/css/header.css';
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
	const [profile, setProfile] = useState({});
	const [copy, setCopy] = useState(true);
	const [isOpened, setIsOpened] = useState(false);

	const navigate = useNavigate();

	const truncateDID = (did) => {
		return did && did.slice(0, 13);
	};

	const toggleDropdown = () => {
		setIsOpened(!isOpened);
	};

	const logout = async () => {
		await VeridaClient.logout();
		navigate('/connect');
	};

	useEffect(() => {
		//init profile
		setProfile(VeridaClient.profile);

		// Listen for profile change
		VeridaClient.on('profileChanged', (data) => {
			setProfile(data);
		});
	}, []);

	return (
		<header className='user-menu'>
			<img
				className='user-meu-logo'
				height={'30'}
				src={VeridaLogo}
				alt={'verida-logo'}
			/>
			<div className='user-menu-widget'>
				<div className='m-dropdown'>
					<span>{profile.name}</span>
					<div
						onClick={toggleDropdown}
						className={isOpened ? 'm-dropdown-top-active' : 'm-dropdown-top'}
					>
						<img
							height='40'
							src={
								profile.avatar ||
								'https://s3.us-west-2.amazonaws.com/assets.verida.io/avatar.svg'
							}
							alt='user-avatar'
						/>
					</div>
					{isOpened && (
						<div className='m-dropdown-logout'>
							<div>
								<span>
									<a
										href={`http://accounts.verida.io/${profile.did}`}
										target='_blank'
										rel='noopener noreferrer'
									>
										{truncateDID(profile.did)}...
									</a>
								</span>
								<CopyToClipboard
									text={profile.did}
									onCopy={() => setCopy({ copied: true })}
								>
									<img
										height='20'
										src='https://s3.us-west-2.amazonaws.com/assets.verida.io/copy.png'
										alt='icon'
										title='Copy to clipboard'
									/>
								</CopyToClipboard>
							</div>
							<div onClick={logout}>
								<span> Log out </span>
								<img
									height='20'
									src='https://s3.us-west-2.amazonaws.com/assets.verida.io/logout.svg'
									alt='icon'
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
