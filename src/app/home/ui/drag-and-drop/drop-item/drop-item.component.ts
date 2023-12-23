import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BytePipe } from '../byte.pipe';

@Component({
  selector: 'app-drop-item',
  template: `
    <div class="border-2 border-black rounded-md p-4 mt-4 flex items-center">
      <div class="mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-file-upload"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path
            d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
          />
          <path d="M12 11v6" />
          <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
        </svg>
      </div>
      <div class="flex flex-col flex-1">
        <span>{{ file.name }}</span>
        <small>{{ file.size | byte: 2 }}</small>
      </div>
      <button (click)="onRemove()" class="text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-trash"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7l16 0" />
          <path d="M10 11l0 6" />
          <path d="M14 11l0 6" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </button>
    </div>
  `,
  standalone: true,
  imports: [BytePipe],
})
export class DropItemComponent {
  @Input({ required: true }) file!: File;

  @Output() readonly remove = new EventEmitter<File>();

  onRemove(): void {
    this.remove.emit(this.file);
  }
}
