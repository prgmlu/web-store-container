// eslint-disable-next-line import/prefer-default-export
export const getSceneType = (sceneData) => {
	// not all scenes have scene_type prop as it was only recently added
	let sceneType = sceneData?.scene_type;
	if (!sceneType && (sceneData?.flat_scene_url || sceneData?.image))
		sceneType = 'flat_scene';
	else if (!sceneType && sceneData?.cube_map_dir) sceneType = 'cubemap_scene';
	return sceneType;
};
