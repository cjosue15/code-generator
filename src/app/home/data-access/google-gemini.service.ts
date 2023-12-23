import { Injectable } from '@angular/core';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GoogleGeminiService {
  getModel(): GenerativeModel {
    // see the readme for more information on how to get your api key.
    const api = new GoogleGenerativeAI('YOUR_API_KEY');
    return api.getGenerativeModel({
      model: 'gemini-pro-vision',
      generationConfig: {
        maxOutputTokens: 4096,
      },
    });
  }
}
