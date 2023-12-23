import { Injectable } from '@angular/core';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GoogleGeminiService {
  getModel(): GenerativeModel {
    console.log(process.env['GEMINI_API_KEY']);
    const api = new GoogleGenerativeAI(process.env['GEMINI_API_KEY'] || '');
    return api.getGenerativeModel({
      model: 'gemini-pro-vision',
      generationConfig: {
        maxOutputTokens: 4096,
      },
    });
  }
}
