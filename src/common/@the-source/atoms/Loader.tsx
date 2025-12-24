import { ActivityIndicator, StyleSheet, View, Modal } from 'react-native';
import theme from 'src/utils/theme';

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: theme.colors.secondary_text,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		width: '100%',
		height: '100%',
	},
});

const Loader = () => {
	return (
		<Modal visible={true}>
			<View style={styles.wrapper}>
				<ActivityIndicator size='large' color={theme.colors.white} />
			</View>
		</Modal>
	);
};

export default Loader;
