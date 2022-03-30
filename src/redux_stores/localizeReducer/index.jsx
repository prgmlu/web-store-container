import { createSlice } from '@reduxjs/toolkit';
import { flattie } from 'flattie';

const initialState = {
	enabled: false,
	initialized: false,
	translations: {},
};

const localizeSlice = createSlice({
	name: 'localize',
	initialState,
	reducers: {
		initialize(state, action) {
			return {
				...state,
				...action.payload,
				enabled: true,
				initialized: true,
			};
		},
		setActiveLocale(state, action) {
			state.activeLocale = action.payload;
		},
		setTranslationsForLang(state, action) {
			const { lang, translations } = action.payload;
			if (!(lang in state.translations)) {
				state.translations[lang] = {};
			}
			state.translations[lang] = {
				...state.translations[lang],
				...flattie(translations),
			};
		},
	},
});

export default localizeSlice.reducer;
