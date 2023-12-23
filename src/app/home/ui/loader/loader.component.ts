import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <span
      class="w-full h-full border-[5px] border-solid border-orange-600 border-b-white rounded-full inline-block animate-loader"
    ></span>
  `,
  standalone: true,
  imports: [NgClass],
})
export class LoaderComponent {}
