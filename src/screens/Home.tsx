import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { shallowEqual } from 'react-redux';

import Text from 'src/common/@the-source/atoms/Text';
import theme from 'src/utils/theme';
import Button from 'src/common/@the-source/atoms/Button';
import BottomSheet from 'src/common/@the-source/molecules/BottomSheet';
import Modal from 'src/common/@the-source/atoms/Modal';
import Toggle from 'src/common/@the-source/atoms/Toggle';
import Label from 'src/common/@the-source/atoms/Label';
import Menu from 'src/common/@the-source/atoms/Menu';
import CheckboxWithoutController from 'src/common/@the-source/atoms/CheckboxWithoutController';
import { show_generic_modal, show_toast, show_loader, hide_loader } from 'src/reducers/app';
import { useAppDispatch, useAppSelector } from 'src/store';
import utils from 'src/utils/utils';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
		rowGap: 30,
		paddingVertical: 30,
	},
	label_container: {
		flexDirection: 'row',
		gap: 10,
		flexWrap: 'wrap',
	},
});

const Home = () => {
	const { redux_device_info } = useAppSelector(
		(state) => ({
			redux_device_info: state.app.redux_device_info,
		}),
		shallowEqual,
	);

	const [is_bottom_sheet_open, set_is_bottom_sheet_open] = useState<boolean>(false);
	const [is_modal_open, set_is_modal_open] = useState<boolean>(false);
	const [is_toggle_checked, set_is_toggle_checked] = useState<boolean>(false);
	const [checkbox_status, set_checkbox_status] = useState<'unchecked' | 'checked' | 'indeterminate'>('unchecked');

	const dispatch = useAppDispatch();

	const handle_open_bottom_sheet = () => {
		set_is_bottom_sheet_open(true);
	};

	const handle_close_bottom_sheet = () => {
		set_is_bottom_sheet_open(false);
	};

	const handle_open_generic_modal = () => {
		dispatch(
			show_generic_modal({
				header_text: 'Generic Modal',
				body_text: 'This is a generic modal',
				on_confirm: () => {},
				on_secondary: () => {},
				primary_btn_text: 'Confirm',
				secondary_btn_text: 'Cancel',
				primary_btn_styles: {},
				secondary_btn_styles: {},
			}),
		);
	};

	const handle_open_toast = () => {
		dispatch(
			show_toast({
				title: 'Toast',
				message: 'This is a toast',
			}),
		);
	};

	const handle_show_loader = () => {
		dispatch(show_loader());
		setTimeout(() => {
			dispatch(hide_loader());
		}, 2000);
	};

	const handle_open_modal = () => {
		set_is_modal_open(true);
	};

	const handle_close_modal = () => {
		set_is_modal_open(false);
	};

	const handle_open_success_toast = () => {
		dispatch(
			show_toast({
				title: 'Success',
				message: 'This is a success toast',
				type: 'success',
			}),
		);
	};

	const handle_open_error_toast = () => {
		dispatch(
			show_toast({
				title: 'Error',
				message: 'This is an error toast',
				type: 'error',
			}),
		);
	};

	const handle_open_warning_toast = () => {
		dispatch(
			show_toast({
				title: 'Warning',
				message: 'This is a warning toast',
				type: 'warning',
			}),
		);
	};

	const handle_checkbox_press = () => {
		if (checkbox_status === 'unchecked') {
			set_checkbox_status('checked');
		} else if (checkbox_status === 'checked') {
			set_checkbox_status('indeterminate');
		} else {
			set_checkbox_status('unchecked');
		}
	};

	const menu_items = [
		{
			title: 'Option 1',
			on_press: () => {
				dispatch(show_toast({ title: 'Menu', message: 'Option 1 selected' }));
			},
		},
		{
			title: 'Option 2',
			on_press: () => {
				dispatch(show_toast({ title: 'Menu', message: 'Option 2 selected' }));
			},
		},
		{
			title: 'Option 3',
			on_press: () => {
				dispatch(show_toast({ title: 'Menu', message: 'Option 3 selected' }));
			},
		},
	];

	const { SPACE } = utils.get_responsive_styles(redux_device_info);

	return (
		<>
			<View style={[styles.container, { paddingHorizontal: SPACE }]}>
				<Button title='Open Bottom Sheet' onPress={handle_open_bottom_sheet} />
				<Button title='Open Generic Modal' onPress={handle_open_generic_modal} />
				<Button title='Open Toast' onPress={handle_open_toast} />
				<Button title='Show Loader' onPress={handle_show_loader} />
				<Button title='Open Modal' onPress={handle_open_modal} />
				<Button title='Success Toast' onPress={handle_open_success_toast} />
				<Button title='Error Toast' onPress={handle_open_error_toast} />
				<Button title='Warning Toast' onPress={handle_open_warning_toast} />
				<Toggle label='Toggle Switch' is_checked={is_toggle_checked} on_change={set_is_toggle_checked} />
				<View style={styles.label_container}>
					<Label text='Label 1' style={{ backgroundColor: theme.colors.primary_500 }} />
					<Label text='Label 2' show_dot={false} />
					<Label text='Label 3' style={{ backgroundColor: theme.colors.info_400 }} />
				</View>
				<Menu
					menu_items={menu_items}
					anchor={
						<View style={{ padding: 10, borderRadius: 10, borderWidth: 1, alignSelf: 'flex-start' }}>
							<Text>Menu</Text>
						</View>
					}
				/>
				<CheckboxWithoutController
					label='Checkbox Without Controller'
					status={checkbox_status}
					onPress={handle_checkbox_press}
				/>
			</View>
			<BottomSheet is_open={is_bottom_sheet_open} on_close={handle_close_bottom_sheet}>
				<View style={{ padding: 20, gap: 20 }}>
					<Text>Bottom Sheet</Text>
				</View>
			</BottomSheet>
			<Modal visible={is_modal_open} on_close={handle_close_modal}>
				<View style={{ backgroundColor: theme.colors.white, padding: 20, borderRadius: 10, margin: 20 }}>
					<Text style={{ fontSize: 18, marginBottom: 10 }}>Custom Modal</Text>
					<Text style={{ marginBottom: 20 }}>This is a custom modal component</Text>
					<Button title='Close' onPress={handle_close_modal} />
				</View>
			</Modal>
		</>
	);
};

export default Home;
