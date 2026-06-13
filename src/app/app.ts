import { Component, signal ,HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('alaman-front');
  mouseX = 0;
  mouseY = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // طرح 10 بكسل باش يجي الماوس في منتصف الدائرة بالضبط (نصف قطر الدائرة)
    this.mouseX = event.clientX - 5;
    this.mouseY = event.clientY - 5;
  }
}
