import { useEffect, useState } from 'react';
import { Keyboard, ModalProps, Platform, Modal as RNModal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import theme from 'src/utils/theme';

interface Props extends ModalProps {
	children: any;
	on_close: () => void;
}

const ModalComp = ({ children, visible, on_close, ...rest }: Props) => {
	const [is_keyboard_open, set_is_keyboard_open] = useState(false);

	const { transparent } = rest;

	function onKeyboardChange(_: any, is_showing: boolean) {
		set_is_keyboard_open(is_showing);
	}

	useEffect(() => {
		const sub1 = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', (e) =>
			onKeyboardChange(e, false),
		);
		const sub2 = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', (e) =>
			onKeyboardChange(e, true),
		);

		return () => {
			sub1.remove();
			sub2.remove();
		};
	}, []);

	return (
		<RNModal visible={visible} {...rest}>
			<TouchableOpacity
				activeOpacity={1}
				onPressOut={() => {
					if (!is_keyboard_open && !transparent) {
						on_close();
					}
				}}
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: transparent ? 'transparent' : theme.colors.grey_400,
				}}>
				<TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
			</TouchableOpacity>
		</RNModal>
	);
};

const Modal = ({ children, visible, ...rest }: Props) => {
	if (!visible) {
		return null;
	}

	return (
		<ModalComp visible={true} {...rest}>
			{children}
		</ModalComp>
	);
};

export default Modal;
