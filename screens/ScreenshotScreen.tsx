import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { extractTextFromImage } from '../lib/ocr';
import { getScreenshotReply } from '../lib/openRouter';
import { screenshotStyles } from '../styles/screenshotStyles';
import SpicinessSlider from '../components/SpicinessSlider';
import { incrementUsage, getUsage } from '../lib/usage';

export default function ScreenshotScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [ocrText, setOcrText] = useState('');
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [spiciness, setSpiciness] = useState(2); // 0 = chill, 4 = fire

    const handlePickImage = async () => {
        try {

            const usage = await getUsage();
            if (usage >= 15) {
                Alert.alert('Limit reached', 'You have reached the limit of 15 replies today. Please try again tomorrow.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (result.canceled || !result.assets.length) return;

            const uri = result.assets[0].uri;
            setImageUri(uri);
            setReply('');
            setOcrText('');
            setLoading(true);

            const extracted = await extractTextFromImage(uri);
            setOcrText(extracted);

            const aiResponse = await getScreenshotReply(extracted, spiciness);
            setReply(aiResponse);
            await incrementUsage();
        } catch (error) {
            console.error('Error during image processing:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={screenshotStyles.container}>
            <Text style={screenshotStyles.title}>📸 Screenshot Reply</Text>

            <Text style={screenshotStyles.label}>Mood / Spiciness</Text>
            <View style={screenshotStyles.sliderWrapper}>
                <SpicinessSlider spiciness={spiciness} onChange={setSpiciness} />
            </View>

            <TouchableOpacity onPress={handlePickImage} style={screenshotStyles.button}>
                <Text style={screenshotStyles.buttonText}>Pick a Screenshot</Text>
            </TouchableOpacity>
            <Text style={screenshotStyles.helperText}>
                Crop screenshots are generally more accurate ✂️
            </Text>


            {loading && (
                <ActivityIndicator
                    size="large"
                    color="#a97c6d"
                    style={{ marginTop: 16 }}
                />
            )}

            {imageUri && (
                <Image source={{ uri: imageUri }} style={screenshotStyles.imagePreview} />
            )}

            {!!ocrText && (
                <View style={screenshotStyles.resultSection}>
                    <Text style={screenshotStyles.label}>Extracted Text</Text>
                    <Text style={screenshotStyles.ocrText}>{ocrText}</Text>
                </View>
            )}

            {!!reply && (
                <View style={screenshotStyles.resultSection}>
                    <Text style={screenshotStyles.label}>AI Reply</Text>
                    <Text style={screenshotStyles.replyText}>{reply}</Text>
                </View>
            )}
        </ScrollView>
    );
}
