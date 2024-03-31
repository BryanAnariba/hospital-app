import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-page',
  templateUrl: './progress-page.component.html',
  styleUrl: './progress-page.component.css'
})
export class ProgressPageComponent {

  public progress: number = 0;
  public progressTwo: number = 10;

  public get currentProgress (): string {
    return `${this.progress}%`;
  }

  public get currentProgressTwo (): string {
    return `${this.progressTwo}%`;
  }
}
