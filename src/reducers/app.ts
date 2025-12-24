import { createSlice } from '@reduxjs/toolkit';
import { Dimensions } from 'react-native';
import _ from 'lodash';

import { get_device_info } from 'src/utils/device';

const { width, height } = Dimensions.get('window');

const initial_toast_details = {
	is_open: false,
	title: '',
	message: '',
	type: '',
	duration: 3000,
};

const initialState = {
	is_loading: false,
	redux_device_info: get_device_info({ width, height }),
	toast_details: _.cloneDeep(initial_toast_details),
};

const app = createSlice({
	name: 'app',
	initialState,
	reducers: {
		show_loader: (state) => {
			state.is_loading = true;
		},
		hide_loader: (state) => {
			state.is_loading = false;
		},
		update_device_info: (state, action) => {
			state.redux_device_info = get_device_info(action.payload);
		},
		show_toast: (state, action) => {
			state.toast_details = {
				..._.cloneDeep(initial_toast_details),
				..._.cloneDeep(action.payload),
				is_open: true,
			};
		},
		hide_toast: (state) => {
			state.toast_details = _.cloneDeep(initial_toast_details);
		},
	},
});

export const { show_loader, hide_loader, update_device_info, show_toast, hide_toast } = app.actions;
export default app.reducer;
