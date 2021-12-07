import React, { useEffect, useState } from 'react';
import './layout.scss';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
	useEffect(() => {
		// initialize materialize
	});

	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			{children}
			<div className='topUILayer'>
				{/* <TopNavBar/> */}
				<Button onClick={() => setModalOpen(!modalOpen)}>Press</Button>

				<Modal show={modalOpen} backdrop='static'>
					<Modal.Header closeButton>
						<Modal.Title>Modal title</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Modal body text goes here.</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant='secondary'>Close</Button>
						<Button variant='primary'>Save changes</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.any.isRequired,
};
export default Layout;
