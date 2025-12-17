import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { colors } from '../src/utils/Color';



const TimeModal = ({ setModalVisible, setFormData, formData }) => {
    const [selectedHour, setSelectedHour] = useState(null)
    const [selectedMinute, setSelectedMinute] = useState(null)
    const [selectedPeriod, setSelectedPeriod] = useState('AM')

    // Generate hours (1-12)
    const hours = Array.from({ length: 12 }, (_, i) => i + 1)

    // Generate minutes (0-59) in 5-minute intervals
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

    const formatTime = () => {
        if (!selectedHour) return 'Select Time'

        const hour = selectedHour.toString().padStart(2, '0')
        const minute = selectedMinute !== null
            ? selectedMinute.toString().padStart(2, '0')
            : '__'

        return `${hour}:${minute} ${selectedPeriod}`
    }

    const handleDone = () => {
        if (selectedHour !== null && selectedMinute !== null) {
            const timeString = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`

            // Convert to 24-hour format for easier handling
            let hour24 = selectedHour
            if (selectedPeriod === 'PM' && selectedHour !== 12) {
                hour24 = selectedHour + 12
            } else if (selectedPeriod === 'AM' && selectedHour === 12) {
                hour24 = 0
            }

            const timeObject = {
                hour: selectedHour,
                minute: selectedMinute,
                period: selectedPeriod,
                hour24: hour24,
                formatted: timeString
            }

            console.log('Selected Time:', timeObject)
            setFormData({ ...formData, pickupTime: timeObject.formatted })
        }
        setModalVisible(false)
    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.modalCard}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleCancel}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>{formatTime()}</Text>
                    <View style={{ width: 60 }} />
                </View>

                {/* AM/PM Selector */}
                <View style={styles.periodSelector}>
                    <TouchableOpacity
                        style={[
                            styles.periodButton,
                            selectedPeriod === 'AM' && styles.periodButtonActive
                        ]}
                        onPress={() => setSelectedPeriod('AM')}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.periodText,
                                selectedPeriod === 'AM' && styles.periodTextActive
                            ]}
                        >
                            AM
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.periodButton,
                            selectedPeriod === 'PM' && styles.periodButtonActive
                        ]}
                        onPress={() => setSelectedPeriod('PM')}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.periodText,
                                selectedPeriod === 'PM' && styles.periodTextActive
                            ]}
                        >
                            PM
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Time Pickers */}
                <View style={styles.timePickerContainer}>
                    {/* Hours */}
                    <View style={styles.pickerColumn}>
                        <Text style={styles.pickerLabel}>Hour</Text>
                        <ScrollView
                            style={styles.scrollView}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollContent}
                        >
                            {hours.map((hour) => (
                                <TouchableOpacity
                                    key={hour}
                                    style={[
                                        styles.timeItem,
                                        selectedHour === hour && styles.timeItemSelected
                                    ]}
                                    onPress={() => setSelectedHour(hour)}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.timeText,
                                            selectedHour === hour && styles.timeTextSelected
                                        ]}
                                    >
                                        {hour.toString().padStart(2, '0')}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Separator */}
                    <View style={styles.separator}>
                        <Text style={styles.separatorText}>:</Text>
                    </View>

                    {/* Minutes */}
                    <View style={styles.pickerColumn}>
                        <Text style={styles.pickerLabel}>Minute</Text>
                        <ScrollView
                            style={styles.scrollView}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollContent}
                        >
                            {minutes.map((minute) => (
                                <TouchableOpacity
                                    key={minute}
                                    style={[
                                        styles.timeItem,
                                        selectedMinute === minute && styles.timeItemSelected
                                    ]}
                                    onPress={() => setSelectedMinute(minute)}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.timeText,
                                            selectedMinute === minute && styles.timeTextSelected
                                        ]}
                                    >
                                        {minute.toString().padStart(2, '0')}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Done Button */}
                {selectedHour !== null && selectedMinute !== null && (
                    <TouchableOpacity
                        style={styles.doneBtn}
                        onPress={handleDone}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.doneText}>Confirm</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        padding: 20
    },
    modalCard: {
        backgroundColor: colors.background,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.border
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    cancelText: {
        color: colors.accent,
        fontSize: 16,
        fontWeight: '500'
    },
    modalTitle: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        flex: 1
    },
    periodSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 24
    },
    periodButton: {
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
        minWidth: 80,
        alignItems: 'center'
    },
    periodButtonActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary
    },
    periodText: {
        color: colors.textSecondary,
        fontSize: 18,
        fontWeight: '600'
    },
    periodTextActive: {
        color: colors.text,
        fontWeight: '700'
    },
    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    pickerColumn: {
        flex: 1,
        alignItems: 'center'
    },
    pickerLabel: {
        color: colors.accent,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    scrollView: {
        maxHeight: 240,
        width: '100%'
    },
    scrollContent: {
        paddingVertical: 8,
        alignItems: 'center'
    },
    timeItem: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        marginVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
        minWidth: 80,
        alignItems: 'center'
    },
    timeItemSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary
    },
    timeText: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '500'
    },
    timeTextSelected: {
        color: colors.text,
        fontWeight: '700'
    },
    separator: {
        paddingHorizontal: 8,
        paddingTop: 32
    },
    separatorText: {
        color: colors.accent,
        fontSize: 28,
        fontWeight: '700'
    },
    doneBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 8,
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6
    },
    doneText: {
        color: colors.text,
        fontSize: 17,
        fontWeight: '700'
    }
})

export default TimeModal