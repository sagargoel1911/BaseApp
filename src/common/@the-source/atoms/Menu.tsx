import { Pressable } from 'react-native';
import React, { useState } from 'react';
import { Menu as RN_Paper_Menu, MenuProps } from 'react-native-paper';
import _ from 'lodash';

type MenuItem = {
	title: string;
	on_press: () => void;
};

interface Props extends Omit<MenuProps, 'visible' | 'menu_items' | 'children'> {
	menu_items: MenuItem[];
	anchor: React.ReactNode;
}

const Menu = ({ menu_items, anchor, onDismiss, ...rest }: Props) => {
	const [visible, set_visible] = useState<boolean>(false);

	const open_menu = () => {
		set_visible(true);
	};

	const close_menu = () => {
		set_visible(false);
		onDismiss?.();
	};

	return (
		<RN_Paper_Menu visible={visible} anchor={<Pressable onPress={open_menu}>{anchor}</Pressable>} onDismiss={close_menu} {...rest}>
			{_.map(menu_items, (item) => (
				<RN_Paper_Menu.Item key={item.title} onPress={item.on_press} title={item.title} />
			))}
		</RN_Paper_Menu>
	);
};

export default Menu;
