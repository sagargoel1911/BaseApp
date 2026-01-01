import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import Text from 'src/common/@the-source/atoms/Text';
import theme from 'src/utils/theme';
import Button from 'src/common/@the-source/atoms/Button';
import BottomSheet from 'src/common/@the-source/molecules/BottomSheet';
import { show_generic_modal } from 'src/reducers/app';
import { useAppDispatch } from 'src/store';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
		rowGap: 30,
		paddingVertical: 30,
	},
});

const Home = () => {
	const [is_bottom_sheet_open, set_is_bottom_sheet_open] = useState<boolean>(false);
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

	return (
		<>
			<View style={styles.container}>
				<Button title='Open Bottom Sheet' onPress={handle_open_bottom_sheet} />
				<Button title='Open Generic Modal' onPress={handle_open_generic_modal} />
			</View>
			<BottomSheet is_open={is_bottom_sheet_open} on_close={handle_close_bottom_sheet}>
				<Text>Bottom Sheet</Text>
			</BottomSheet>
		</>
	);
};

export default Home;
