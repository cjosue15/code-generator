import { Component, OnInit, inject, signal } from '@angular/core';
import { GenerativeModel } from '@google/generative-ai';

import { GoogleGeminiService } from './data-access/google-gemini.service';
import { DragAndDropComponent } from './ui/drag-and-drop/drag-and-drop.component';
import { PreCodeComponent } from './ui/pre-code/pre-code.component';
import { PROMPT } from './prompt';
import { LoaderComponent } from './ui/loader/loader.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <div class="max-w-[700px] w-full my-[100px] mx-auto">
      <div class="relative">
        <app-drag-and-drop (fileDropped)="getFile($event)" />
        @if (modelLoading()) {
          <div
            class="absolute bg-white/[0.9] inset-0 w-full h-full flex items-center justify-center flex-col gap-y-4"
          >
            <app-loader class="h-[48px] w-[48px] inline-block" />
            <p class="font-bold">
              The model is loading your code, be patient please. 🫶
            </p>
          </div>
        }
      </div>

      @if (!modelLoading() && error()) {
        <span class="text-red-500 inline-block w-full text-center mt-8"
          >Ops there was an error, try again 🥺.</span
        >
      }

      @if (output().length > 0 && !modelLoading() && !error()) {
        <p class="text-xl my-8">Response</p>

        <ng-container
          *ngTemplateOutlet="text; context: { $implicit: isWriting() }"
        ></ng-container>

        <app-pre-code>{{ output() }}</app-pre-code>

        <ng-container
          *ngTemplateOutlet="text; context: { $implicit: isWriting() }"
        ></ng-container>
      }

      <ng-template #text let-writing>
        @if (writing) {
          <p class="font-bold my-4 flex gap-x-4">
            your answer is being written 🤤
            <app-loader class="h-[24px] w-[24px] inline-block" />
          </p>
        }
      </ng-template>
    </div>
  `,
  standalone: true,
  imports: [
    DragAndDropComponent,
    PreCodeComponent,
    LoaderComponent,
    NgTemplateOutlet,
  ],
})
export class HomeComponent implements OnInit {
  #googleGeminiService: GoogleGeminiService = inject(GoogleGeminiService);

  #generativeModel: GenerativeModel | undefined;

  modelLoading = signal(false);

  isWriting = signal(false);

  error = signal(false);

  output = signal('');

  ngOnInit(): void {
    this.#generativeModel = this.#googleGeminiService.getModel();
  }

  async #toBase64(file: File) {
    const base64EncodedDataPromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  async getFile(files: FileList) {
    const file = files[0];
    const data = await this.#toBase64(file);
    this.askModel(data);
  }

  async askModel(data: any) {
    if (!this.#generativeModel) return;

    this.modelLoading.set(true);

    try {
      const result = await this.#generativeModel.generateContentStream([
        PROMPT,
        data,
      ]);

      this.modelLoading.set(false);
      this.output.set('');

      for await (const chunk of result.stream) {
        this.isWriting.set(true);
        const chunkText = chunk.text();
        this.output.update((text) => text + chunkText);
      }

      this.isWriting.set(false);
    } catch (error) {
      this.error.set(true);
    } finally {
      this.isWriting.set(false);
      this.modelLoading.set(false);
    }
  }
}
