import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementatorComponent } from './incrementator/incrementator.component';
import { FormsModule } from '@angular/forms';
import { ModalImgComponent } from './modal-img/modal-img.component';

@NgModule({
  declarations: [
    IncrementatorComponent,
    ModalImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    IncrementatorComponent,
    ModalImgComponent,
  ]
})
export class ComponentsModule { }
