import { Pressable, View } from 'react-native';
import React, { ReactNode, useMemo, useRef } from 'react';

import GBottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import SvgImage from 'src/common/SvgImage';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';

interface Props {
	children: ReactNode;
	on_close: () => void;
	is_open: boolean;
}

const BottomSheet = ({ children, on_close, is_open }: Props) => {
	const bottom_sheet_ref = useRef<GBottomSheet>(null);

	const snap_points = useMemo(() => ['75%'], []);

	const handle_close = () => {
		bottom_sheet_ref.current?.close();

		on_close();
	};

	return (
		<GBottomSheet
			ref={bottom_sheet_ref}
			index={is_open ? 0 : -1} // closed initially
			snapPoints={snap_points}
			enableDynamicSizing={false}
			onClose={on_close}
			style={{ flex: 1 }}
			backdropComponent={(props) => (
				<BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.1} onPress={handle_close} />
			)}>
			<BottomSheetScrollView showsVerticalScrollIndicator={false} style={{ padding: 16, height: '100%' }}>
				<View style={{ alignItems: 'flex-end' }}>
					<Pressable hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }} onPress={handle_close}>
						<SvgImage name={ImageLink_keys.close} />
					</Pressable>
				</View>
				{children}
			</BottomSheetScrollView>
		</GBottomSheet>
	);
};

export default BottomSheet;
