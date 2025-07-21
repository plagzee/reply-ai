import { StyleSheet } from 'react-native';

export const screenshotStyles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#fff5f0',
        flexGrow: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#5a3e36',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#a97c6d',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    imagePreview: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginTop: 10,
        resizeMode: 'contain',
    },
    resultSection: {
        marginTop: 24,
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        color: '#5a3e36',
        marginBottom: 6,
    },
    ocrText: {
        backgroundColor: '#f9ece7',
        padding: 10,
        borderRadius: 8,
        color: '#4a3b35',
    },
    replyText: {
        backgroundColor: '#e8d6cf',
        padding: 10,
        borderRadius: 8,
        marginTop: 8,
        fontStyle: 'italic',
        color: '#3c2e28',
    },
    sliderWrapper: {
        marginVertical: 16,
        paddingHorizontal: 20,
        width: '100%',
    },
    helperText: {
        fontSize: 13,
        color: '#777',
        marginBottom: 8,
        textAlign: 'center',
    },

});
