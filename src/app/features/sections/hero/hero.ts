import { Component, AfterViewInit, OnDestroy } from '@angular/core';


declare var initConnectiveMesh: () => () => void;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [], 
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero implements AfterViewInit, OnDestroy {

  // متغير لتخزين دالة التدمير (Clean-up function) التي ترجعها الجافا سكريبت
  private destroyAnimation: (() => void) | null = null;

  constructor() {}

  ngAfterViewInit(): void {
    // تشغيل الأنيميشن بسلاسة فور اكتمال بناء الواجهة (DOM)
    if (typeof initConnectiveMesh === 'function') {
      this.destroyAnimation = initConnectiveMesh();
      console.log('Connective mesh animation started smoothly.');
    } else {
      console.error(
        'خطأ: لم يتم العثور على دالة initConnectiveMesh. تأكد من إضافة ملف الجافا سكريبت في مصفوفة scripts داخل angular.json'
      );
    }
  }

  ngOnDestroy(): void {
    // تنظيف الذاكرة وإيقاف الـ RequestAnimationFrame والـ Tweens فور مغادرة المستخدم للصفحة
    if (this.destroyAnimation) {
      this.destroyAnimation();
      console.log('Connective mesh animation destroyed successfully.');
    }
  }
}