import moment from 'moment'
import { useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { colors } from '../src/utils/Color'

const DateModal = ({ setModalVisible, setFormData, formData }) => {
    const currentDate = moment()
    const weekdays = moment.weekdaysShort()

    const [isMonthView, setIsMonthView] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [selectedYear, setSelectedYear] = useState(null)
    const [selectedDay, setSelectedDay] = useState(null)

    const getSixMonths = () => {
        const monthsList = [];

        for (let i = 0; i < 6; i++) {
            const monthDate = moment().add(i, 'months');

            monthsList.push({
                label: monthDate.format('MMM'),
                year: monthDate.year(),
                monthIndex: monthDate.month(),
            });
        }

        return monthsList;
    };
    const sixMonths = getSixMonths();

    const getCalendarData = (selectedMonth, selectedYear) => {
        if (!selectedMonth || !selectedYear) {
            return { daysArray: [], emptySlots: [] };
        }

        const monthStart = moment()
            .year(selectedYear)
            .month(selectedMonth.monthIndex)
            .startOf('month');

        const daysInMonth = monthStart.daysInMonth();
        const firstDayOfWeek = monthStart.day();

        return {
            daysArray: Array.from({ length: daysInMonth }, (_, i) => i + 1),
            emptySlots: Array.from({ length: firstDayOfWeek }, (_, i) => i),
        };
    };

    const calendarData = getCalendarData(selectedMonth, selectedYear);


    const handleSelectMonth = (month) => {
        setSelectedMonth(month)
        setSelectedYear(month.year)
        setIsMonthView(false)
        setSelectedDay(null)
    }

    const handleSelectDay = (day) => {
        setSelectedDay(day)
    }

    const handleBackToMonth = () => {
        setIsMonthView(true)
        setSelectedMonth(null)
        setSelectedYear(null)
        setSelectedDay(null)
    }

    const handleDone = () => {
        if (selectedDay && selectedMonth && selectedYear) {


            setFormData({ ...formData, pickupDate: `${selectedDay} / ${selectedMonth.monthIndex + 1} / ${selectedYear}` })
        }
        setModalVisible(false)

    }

    const formatTitle = () => {
        if (!selectedMonth) return 'Select a Month'

        let title = `${selectedYear}`
        if (selectedMonth) title += ` / ${selectedMonth.label}`
        if (selectedDay) title += ` / ${selectedDay}`

        return title
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>{formatTitle()}</Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {isMonthView ? (
                        <View style={styles.monthGrid}>
                            {sixMonths.map((month, index) => (
                                <TouchableOpacity
                                    key={`${month.label}-${index}`}
                                    style={styles.monthItem}
                                    onPress={() => handleSelectMonth(month)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.monthText}>{month.label}</Text>
                                    <Text style={styles.monthYearText}>{month.year}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <View>
                            <TouchableOpacity
                                onPress={handleBackToMonth}
                                style={styles.backBtn}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.backText}>Back to Months</Text>
                            </TouchableOpacity>

                            <View style={styles.weekdaysRow}>
                                {weekdays.map((day, index) => (
                                    <View key={index} style={styles.weekdayContainer}>
                                        <Text style={styles.weekdayText}>{day}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.daysGrid}>
                                {calendarData.emptySlots.map((_, index) => (
                                    <View key={`empty-${index}`} style={styles.dayItem} />
                                ))}

                                {calendarData.daysArray.map((day) => {
                                    const isSelected = selectedDay === day
                                    const dayDate = moment()
                                        .year(selectedYear)
                                        .month(selectedMonth.monthIndex)
                                        .date(day)
                                    const isPast = dayDate.isBefore(currentDate, 'day')

                                    return (
                                        <TouchableOpacity
                                            key={day}
                                            style={[
                                                styles.dayItem,
                                                isSelected && styles.dayItemSelected,
                                                isPast && styles.dayItemPast
                                            ]}
                                            onPress={() => handleSelectDay(day)}
                                            activeOpacity={0.7}
                                        >
                                            <Text
                                                style={[
                                                    styles.dayText,
                                                    isSelected && styles.dayTextSelected,
                                                    isPast && styles.dayTextPast
                                                ]}
                                            >
                                                {day}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>

                            {selectedDay && (
                                <TouchableOpacity
                                    style={styles.doneBtn}
                                    onPress={handleDone}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.doneText}>Confirm</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </ScrollView>
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
        maxHeight: '80%',
        borderWidth: 1,
        borderColor: colors.border
    },
    modalTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center'
    },
    monthGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    monthItem: {
        width: '31%',
        paddingVertical: 16,
        marginBottom: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        backgroundColor: colors.card
    },
    monthText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600'
    },
    monthYearText: {
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 4
    },
    backBtn: {
        marginBottom: 16,
        paddingVertical: 8
    },
    backText: {
        color: colors.accent,
        fontSize: 15,
        fontWeight: '500'
    },
    weekdaysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    weekdayContainer: {
        width: '14%',

    },
    weekdayText: {
        color: colors.accent,
        fontSize: 13,
        fontWeight: '700'
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },
    dayItem: {
        width: '12.5%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
        marginHorizontal: '0.5%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card
    },
    dayItemSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary
    },
    dayItemPast: {
        opacity: 0.4
    },
    dayText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '500'
    },
    dayTextSelected: {
        color: colors.text,
        fontWeight: '700'
    },
    dayTextPast: {
        color: colors.textSecondary
    },
    doneBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 20,
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

export default DateModal
