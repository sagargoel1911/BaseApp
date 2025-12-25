import { View } from 'react-native';
import React, { useMemo, useRef } from 'react';

import Text from '../atoms/Text';
import Button from '../atoms/Button';
import GBottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const BottomSheet = (props: any) => {
	const bottom_sheet_ref = useRef<GBottomSheet>(null);

	const snap_points = useMemo(() => ['25%', '50%', '100%'], []);

	return (
		<View style={{ flex: 1 }}>
			<Button
				title='Open sheet'
				onPress={() => {
					bottom_sheet_ref.current?.expand();
				}}
			/>

			<GBottomSheet
				ref={bottom_sheet_ref}
				index={0} // closed initially
				snapPoints={snap_points}
				enablePanDownToClose>
				<BottomSheetView style={{ padding: 16, height: '100%' }}>
					<Text>Bottom Sheet Content klwlwkkwlkwl</Text>
				</BottomSheetView>
			</GBottomSheet>
		</View>
	);
};

export default BottomSheet;
