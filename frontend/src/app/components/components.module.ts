import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementatorComponent } from './incrementator/incrementator.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IncrementatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    IncrementatorComponent,
  ]
})
export class ComponentsModule { }
