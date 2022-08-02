import React from 'react';

const EntranceVideo = ({ videoUrl, onVideoEnd, onClose }) => {
	return (
		<video
			className="h-100 w-100 entrance-video"
			controls={false}
			autoPlay
			muted
			playsInline
			style={{ objectFit: 'cover' }}
			onEnded={onVideoEnd}
			onClick={onClose}
			onTouchEnd={onClose}
		>
			<source src={videoUrl} />
		</video>
	);
};

export default EntranceVideo;
