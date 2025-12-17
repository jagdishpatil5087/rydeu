import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from 'react';
import { Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearAuth, getUser } from '../src/utils/authStorage';
import { colors } from '../src/utils/Color';
import DateModal from './DateModal';
import TimeModal from './TimeModal';




const cities = [
    { label: 'Select City', value: '' },
    { label: 'Mumbai', value: 'Mumbai' },
    { label: 'Pune', value: 'Pune' },
    { label: 'Nashik', value: 'Nashik' },
    { label: 'Nagpur', value: 'Nagpur' },
];

const HomeScreen = () => {
    const [additionalReq, setAdditionalReq] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [timeModalVisible, setTimeModalVisible] = useState(false);

    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        from: '',
        to: '',
        pickupDate: "",
        pickupTime: '',
        passengers: '1',
        baggage: '0',
        email: '',
        phone: ''
    });



    const [userData, setUserData] = useState({ name: "", email: "" });

    const handleLogout = () => {
        clearAuth();
        navigation.navigate('Login');

    };

    const handleSearch = () => {
        if (!formData.from || !formData.to) {
            alert('Please select both Pickup and Drop locations');
            return;
        }
        if (formData.from === formData.to) {
            alert('Pickup and Drop locations cannot be the same');
            return;
        }
        console.log("Searching with data:", formData);
        alert('Searching for rides...');
    };

    const updateFormData = (field, value) => {
        setFormData(prev => {
            const newData = { ...prev, [field]: value };

            if (field === 'from' && value === prev.to) {
                newData.to = '';
            }
            return newData;
        });
    };

    useEffect(() => {
        const loadToken = async () => {
            const user = await getUser();
            setUserData(user);
        };

        setTimeout(() => {
            loadToken();
        }, 1000);

    }, []);

    return (

        <SafeAreaView style={styles.container} >

            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                <StatusBar barStyle="light-content" backgroundColor={colors.background} />

                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{userData?.name.charAt(0).toUpperCase()}</Text>
                        </View>
                        <View style={styles.userDetails}>
                            <Text style={styles.userName}>{userData?.name}</Text>
                            <Text style={styles.userEmail}>{userData?.email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Feather name="log-out" size={20} color={colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.formcontainer}>
                    <Text style={styles.title}>Book Your Ride</Text>

                    <Text style={styles.label}>From</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formData.from}
                            onValueChange={(itemValue) => updateFormData('from', itemValue)}
                            style={styles.picker}
                            dropdownIconColor={colors.text}
                            itemStyle={{ color: colors.text }}
                        >
                            {cities.map((city) => (
                                <Picker.Item
                                    key={city.value}
                                    label={city.label}
                                    value={city.value}
                                    color={colors.text}
                                    style={{ backgroundColor: colors.card }}
                                />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.label}>To</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formData.to}
                            onValueChange={(itemValue) => updateFormData('to', itemValue)}
                            style={styles.picker}
                            dropdownIconColor={colors.text}
                            itemStyle={{ color: colors.text }}
                        >
                            {cities
                                .filter((city) => city.value !== formData.from)
                                .map((city) => (
                                    <Picker.Item
                                        key={city.value}
                                        label={city.label}
                                        value={city.value}
                                        color={colors.text}
                                        style={{ backgroundColor: colors.card }}
                                    />
                                ))}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Pickup Date</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder="DD-MM-YYYY"
                            placeholderTextColor={colors.textSecondary}
                            style={[styles.input, styles.inputWithButton]}
                            value={formData.pickupDate}
                            editable={false}
                        />
                        <TouchableOpacity
                            style={styles.inlineButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <Feather name="calendar" size={20} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Pickup Time</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder="HH : MM"
                            placeholderTextColor={colors.textSecondary}
                            style={[styles.input, styles.inputWithButton]}
                            value={formData.pickupTime}
                            editable={false}
                        />
                        <TouchableOpacity
                            style={styles.inlineButton}
                            onPress={() => setTimeModalVisible(true)}
                        >
                            <Feather name="clock" size={20} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Passengers</Text>

                    <View style={styles.counterRow}>
                        <Text style={styles.counterLabel}>Number of Passengers</Text>

                        <TouchableOpacity
                            style={styles.counterBtn}
                            onPress={() =>
                                updateFormData(
                                    'passengers',
                                    Math.max(1, (Number(formData.passengers) || 1) - 1)
                                )
                            }
                        >
                            <Feather name="minus" size={20} color={colors.text} />
                        </TouchableOpacity>

                        <Text style={styles.counterValue}>
                            {formData.passengers || 1}
                        </Text>

                        <TouchableOpacity
                            style={styles.counterBtn}
                            onPress={() =>
                                updateFormData(
                                    'passengers',
                                    (Number(formData.passengers) || 1) + 1
                                )
                            }
                        >
                            <Feather name="plus" size={20} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Baggage</Text>

                    <View style={styles.counterRow}>
                        <Text style={styles.counterLabel}>Number of Bags</Text>

                        <TouchableOpacity
                            style={styles.counterBtn}
                            onPress={() =>
                                updateFormData(
                                    'baggage',
                                    Math.max(0, (Number(formData.baggage) || 0) - 1)
                                )
                            }
                        >
                            <Feather name="minus" size={20} color={colors.text} />
                        </TouchableOpacity>

                        <Text style={styles.counterValue}>
                            {formData.baggage || 0}
                        </Text>

                        <TouchableOpacity
                            style={styles.counterBtn}
                            onPress={() =>
                                updateFormData(
                                    'baggage',
                                    (Number(formData.baggage) || 0) + 1
                                )
                            }
                        >
                            <Feather name="plus" size={20} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="example@email.com"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType="email-address"
                        style={styles.input}
                        value={formData.email}
                        onChangeText={(text) => updateFormData('email', text)}
                    />
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        placeholder="+91 XXXXX XXXXX"
                        placeholderTextColor={colors.textSecondary}
                        keyboardType="phone-pad"
                        style={styles.input}
                        value={formData.phone}
                        onChangeText={(text) => updateFormData('phone', text)}
                    />

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={additionalReq}
                            onValueChange={setAdditionalReq}
                            color={additionalReq ? colors.primary : colors.textSecondary}
                        />
                        <Text style={styles.checkboxText}>
                            I have additional requirements
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Feather name="search" size={20} color={colors.text} style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Search Available Rides</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <DateModal setModalVisible={setModalVisible} setFormData={setFormData} formData={formData} />
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={timeModalVisible}
                    onRequestClose={() => setTimeModalVisible(false)}
                >
                    <TimeModal
                        setModalVisible={setTimeModalVisible}
                        setFormData={setFormData}
                        formData={formData}
                    />
                </Modal>
            </ScrollView>

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: colors.text,
        fontSize: 30,
        fontWeight: '600',
    },
    userDetails: {
        marginLeft: 12,
    },
    userName: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    userEmail: {
        color: colors.textSecondary,
        fontSize: 14,
        marginTop: 2,
    },
    logoutButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.card,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    formcontainer: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },
    title: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 24,
    },
    label: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        marginTop: 4,
    },
    input: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 14,
        color: colors.text,
        fontSize: 15,
        marginBottom: 16,
    },
    pickerContainer: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    picker: {
        color: colors.text,
        height: 55,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    inputWithButton: {
        flex: 1,
        marginBottom: 0,
        marginRight: 12,
    },
    inlineButton: {
        backgroundColor: colors.primary,
        width: 48,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    checkboxText: {
        color: colors.text,
        marginLeft: 10,
        fontSize: 14,
    },
    searchButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: colors.text,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },

    counterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
    counterLabel: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: 15,
    },
    counterValue: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 15,
        minWidth: 20,
        textAlign: 'center',
    },
    counterBtn: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;