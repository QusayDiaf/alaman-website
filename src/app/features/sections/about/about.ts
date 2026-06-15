import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements OnInit, OnDestroy {
  @ViewChild('bgCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private animationFrameId!: number;
  
  // إعدادات الأنيميشن
  private config = {
    starColor: 'rgba(47, 77, 160, 0.35)', // لون النجوم متناسق مع هويتك الزرقاء
    lineColor: 'rgba(74, 70, 163, 0.15)', // لون الخطوط المتصلة
    starWidth: 3,
    velocity: 0.2,
    distance: 120, // المسافة التي ترتبط عندها النجوم بخطوط
    radius: 150,   // دائرة التأثير حول الماوس
    densityDivider: 7 // كلما قل الرقم زادت كثافة النجوم
  };

  private mousePosition = { x: 0, y: 0 };

  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    this.resizeCanvas();
    this.initStars();
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
    this.initStars();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mousePosition.x = event.clientX - rect.left;
    this.mousePosition.y = event.clientY - rect.top;
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
  }

  private initStars() {
    const canvas = this.canvasRef.nativeElement;
    const starsLength = Math.floor(canvas.width / this.config.densityDivider);
    this.stars = [];

    for (let i = 0; i < starsLength; i++) {
      this.stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: this.config.velocity - Math.random() * (this.config.velocity * 2),
        vy: this.config.velocity - Math.random() * (this.config.velocity * 2),
        radius: Math.random() * this.config.starWidth
      });
    }
    
    // وضع الماوس بالمنتصف كوضع افتراضي
    this.mousePosition.x = canvas.width / 2;
    this.mousePosition.y = canvas.height / 2;
  }

  private animate() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. رسم وتحديث النجوم
    this.ctx.fillStyle = this.config.starColor;
    this.stars.forEach(star => {
      // تحريك النجم
      star.x += star.vx;
      star.y += star.vy;

      // الارتداد من الحواف
      if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
      if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;

      // رسم النجم
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // 2. رسم الخطوط بين النجوم القريبة والماوس
    this.ctx.strokeStyle = this.config.lineColor;
    this.ctx.lineWidth = 0.4;

    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        const iStar = this.stars[i];
        const jStar = this.stars[j];

        // التحقق من المسافة بين النجمين
        const distStars = Math.hypot(iStar.x - jStar.x, iStar.y - jStar.y);

        if (distStars < this.config.distance) {
          // التحقق من المسافة بين النجم وموقع الماوس لإظهار الشبكة حول الماوس
          const distMouse = Math.hypot(iStar.x - this.mousePosition.x, iStar.y - this.mousePosition.y);

          if (distMouse < this.config.radius) {
            this.ctx.beginPath();
            this.ctx.moveTo(iStar.x, iStar.y);
            this.ctx.lineTo(jStar.x, jStar.y);
            this.ctx.stroke();
          }
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}