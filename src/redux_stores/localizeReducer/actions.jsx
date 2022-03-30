import { createAction } from '@reduxjs/toolkit';
import { INITIALIZE_LOCALIZE, SET_TRANSLATIONS_FOR_LANG } from './types';

export const initialize = createAction(INITIALIZE_LOCALIZE);
export const setTranslationsForLang = createAction(SET_TRANSLATIONS_FOR_LANG);
