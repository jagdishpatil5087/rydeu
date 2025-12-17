import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../src/utils/Color';



const LoginFailedModal = ({ visible, message, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Login Failed</Text>
                    <Text style={styles.message}>
                        {message || 'Something went wrong. Please try again.'}
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '85%',
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.error,
        marginBottom: 10,
    },
    message: {
        color: colors.text,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    buttonText: {
        color: colors.text,
        fontWeight: '600',
    },
});


export default LoginFailedModal;
