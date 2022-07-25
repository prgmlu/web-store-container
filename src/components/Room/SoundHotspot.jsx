import React, { useEffect, useRef } from 'react';
import { pushToMediaStack } from '../../redux_stores/mediaControllerReducer/actions';
import { useDispatch } from 'react-redux';

const SoundHotspot = ({ audioFile, handleSoundStop }) => {
	const audioRef = useRef();
	const dispatch = useDispatch();

	const handleOnPlay = () => {
		dispatch(pushToMediaStack(audioRef));
	};

	useEffect(() => {
		audioRef.current.addEventListener('ended', handleSoundStop);
		audioRef.current.addEventListener('canplay', handleOnPlay);
	}, []);

	return <audio ref={audioRef} src={audioFile} />;
};

export default SoundHotspot;
