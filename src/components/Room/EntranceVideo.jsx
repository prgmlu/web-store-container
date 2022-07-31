import React from 'react';

const EntranceVideo = ({ videoUrl, onVideoEnd }) => {
	return (
		<video
			className="h-100 w-100 entrance-video"
			controls={false}
			autoPlay
			muted
			playsInline
			style={{ objectFit: 'cover' }}
			onEnded={onVideoEnd}
		>
			<source src={videoUrl} />
		</video>
	);
};

export default EntranceVideo;
