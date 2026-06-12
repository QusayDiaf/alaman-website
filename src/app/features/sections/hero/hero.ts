import { Component, AfterViewInit, OnDestroy } from '@angular/core';

// إخبار المترجم بوجود الدالة المخصصة على كائن الـ window العالمي
declare var initConnectiveMesh: () => () => void;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [], 
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero implements AfterViewInit, OnDestroy {

  // متغير لحفظ دالة التدمير الخاصة بالأنيميشن لمنع تسريب الذاكرة (Memory Leak)
  private destroyAnimation: (() => void) | null = null;

  ngAfterViewInit() {
    // استدعاء الأنيميشن فوراً بعد إدخال الـ HTML داخل المتصفح
    if (typeof initConnectiveMesh === 'function') {
      this.destroyAnimation = initConnectiveMesh();
      console.log('Connective mesh animation started successfully.');
    } else {
      console.error('initConnectiveMesh script is not loaded in angular.json scripts array.');
    }
  }

  ngOnDestroy() {
    // تنظيف الأنيميشن وإيقاف الـ Event Listeners عند مغادرة الكومبوننت
    if (this.destroyAnimation) {
      this.destroyAnimation();
    }
  }
}