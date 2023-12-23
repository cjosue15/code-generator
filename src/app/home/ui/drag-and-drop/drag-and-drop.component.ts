import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { DropItemComponent } from './drop-item/drop-item.component';

@Component({
  selector: 'app-drag-and-drop',
  template: `
    <div
      class="w-full  h-[250px] rounded-md border-2 border-dashed flex items-center justify-center relative"
      [ngClass]="isDragover ? 'border-blue-700' : 'border-gray-800'"
    >
      <p class="font-bold">Drop files here or click to upload</p>

      <input
        class="opacity-0 inset-0 absolute w-full h-full"
        type="file"
        accept="*"
        [attr.multiple]="multiple ? '' : null"
        (change)="uploadFile($event)"
      />
    </div>

    @for (file of files; track file.lastModified; let index = $index) {
      <app-drop-item [file]="file" (remove)="removedFile($event, index)" />
    }
  `,
  imports: [NgClass, DropItemComponent],
  standalone: true,
})
export class DragAndDropComponent {
  @Input() multiple = false;

  @Output() fileDropped = new EventEmitter<FileList>();

  @Output() fileRemoved = new EventEmitter<File>();

  files: File[] = [];

  #isDragover = false;

  get isDragover(): boolean {
    return this.#isDragover;
  }

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.#isDragover = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.#isDragover = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.#isDragover = false;
    let files = event.dataTransfer!.files;

    if (files.length === 0) return;

    this.#emitFiles(files);
  }

  uploadFile(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.#emitFiles(files);
  }

  #emitFiles(files: FileList): void {
    if (this.multiple) {
      this.files = [...this.files, ...Array.from(files)];
    } else {
      this.files = [files[0]];
    }
    this.fileDropped.emit(files);
  }

  removedFile(event: File, index: number) {
    this.fileRemoved.emit(event);
    this.files.splice(index, 1);
  }
}
