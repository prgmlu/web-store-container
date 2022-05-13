import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { validatePassword } from './utils/apiUtils';
import './App.scss';

const cookies = new Cookies();

const PasswordPage = ({
	setPasswordEnabled,
	passwordButtonCopy,
	passwordPageBackground,
}) => {
	const [password, setPassword] = useState('');

	const onFormSubmit = async (e) => {
		e.preventDefault();
		const valid = await validatePassword(password);
		if (!valid) {
			alert('Incorrect Password');
			return;
		}
		cookies.set('obsess-dev-cookie', true, { maxAge: 3600000 });
		setPasswordEnabled(false);
	};

	return (
		<div
			className="password-container vh-100 vw-100 d-flex justify-content-center align-items-center"
			style={{
				background: passwordPageBackground
					? `url(${passwordPageBackground})`
					: 'black',
			}}
		>
			<Card className="password-card d-flex p-4">
				<Form onSubmit={onFormSubmit}>
					<Form.Group className="mb-1" controlId="formBasicPassword">
						<Form.Label className="pb-2">Enter Password</Form.Label>
						<Form.Control
							className="password-input border-dark pt-2 pb-2"
							type="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button
						type="submit"
						variant="primary"
						className="password-button btn-dark mt-3 p-2 w-100 fw-light"
					>
						{passwordButtonCopy || 'Submit'}
					</Button>
				</Form>
			</Card>
		</div>
	);
};

export default PasswordPage;
