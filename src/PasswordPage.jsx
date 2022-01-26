import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import './App.scss';

const prompt = 'SGVsbG9Xb3JsZCE=';
const cookies = new Cookies();

const PasswordPage = () => {
	const [password, setPassword] = useState('');

	const onFormSubmit = () => {
		if (window.btoa(password) === prompt) {
			cookies.set('obsess-dev-cookie', true, { maxAge: 3600000 });
			setTimeout(() => {
				window.location.reload(true);
			}, 10);
		} else {
			alert('Incorrect Password');
		}
	};

	return (
		<Container className="passwordContainer">
			<Card className="passwordCard">
				<Form onSubmit={onFormSubmit}>
					<Form.Group controlId="formBasicPassword">
						<Form.Label className="passTitle">
							Enter Password
						</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							onChange={(event) =>
								setPassword(event.nativeEvent.srcElement.value)
							}
						/>
					</Form.Group>
					<Button
						type="submit"
						variant="primary"
						className="submitButton"
					>
						Submit
					</Button>
				</Form>
			</Card>
		</Container>
	);
};

export default PasswordPage;
