import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styleUrl: './incrementator.component.css'
})
export class IncrementatorComponent implements OnInit{

  ngOnInit(): void {
    this.bgColorClassValue = `btn ${this.bgColorClassValue}`;
  }

  @Input()
  public bgColorClassValue?: string = 'btn-primary';

  @Input()
  public progress: number = 0;

  @Output() 
  public outputValue: EventEmitter<number> = new EventEmitter();

  public onChangeValue(value: number): number {
    if (this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
      return this.progress = 100;
    }

    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0);
      return this.progress = 0;
    }

    this.outputValue.emit(this.progress + value);
    return this.progress = this.progress + value;
  }

  public onChange(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;    
    }

    this.outputValue.emit(this.progress);
  }
}
