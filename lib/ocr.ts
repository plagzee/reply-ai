// lib/ocr.ts
import Constants from 'expo-constants';
//@ts-ignore
import { OCR_SPACE_API_KEY } from '@env';

// lib/ocr.ts
export async function extractTextFromImage(imageUri: string): Promise<string> {
    const formData = new FormData();

    formData.append('file', {
        uri: imageUri,
        name: 'screenshot.jpg',
        type: 'image/jpeg',
    } as any); // `as any` to bypass TS warning for FormData

    formData.append('isOverlayRequired', 'false');
    formData.append('apikey', process.env.OCR_SPACE_API_KEY || '');
    formData.append('language', 'eng');

    const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    });

    const data = await response.json();

    if (!data || !data.ParsedResults || !data.ParsedResults.length) {
        throw new Error('OCR failed to extract text');
    }

    return data.ParsedResults[0].ParsedText;
}

