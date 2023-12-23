import { Component } from '@angular/core';

@Component({
  selector: 'app-pre-code',
  template: `
    <pre
      class="font-pre flex overflow-x-auto relative bg-gray-800 text-white rounded-lg p-6"
    >
        <code><ng-content /></code>
      </pre>
  `,
  standalone: true,
  imports: [],
})
export class PreCodeComponent {
  copyToClipboard(): void {}
}
