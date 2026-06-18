import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero implements AfterViewInit, OnDestroy {

  private animationFrameId: number | null = null;
  private animateHeader = true;

  private width!: number;
  private height!: number;
  private largeHeader!: HTMLElement | null;
  private canvas!: HTMLCanvasElement | null;
  private ctx!: CanvasRenderingContext2D | null;
  private points: any[] = [];
  private target!: { x: number; y: number };

  private mouseMoveListener: any;
  private scrollListener: any;
  private resizeListener: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initConnectiveMesh();
    }
  }

  ngOnDestroy(): void {
    this.animateHeader = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.mouseMoveListener);
      window.removeEventListener('scroll', this.scrollListener);
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private initConnectiveMesh(): void {
    // ✅ أوقف الـ Canvas على شاشات الموبايل (أقل من 768px)
    if (window.innerWidth < 768) return;

    this.largeHeader = document.getElementById('large-header');
    this.canvas = document.getElementById('x-canvas') as HTMLCanvasElement;

    if (!this.largeHeader || !this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    this.target = { x: this.width / 2, y: this.height / 2 };

    this.points = [];
    const puntitos = 20;
    for (let x = 0; x < this.width; x += this.width / puntitos) {
      for (let y = 0; y < this.height; y += this.height / puntitos) {
        const px = x + Math.random() * (this.width / puntitos);
        const py = y + Math.random() * (this.height / puntitos);
        this.points.push({
          x: px,
          originX: px,
          y: py,
          originY: py,
          active: 0,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          circle: {
            radius: 2 + Math.random() * 2,
            active: 0
          }
        });
      }
    }

    for (let i = 0; i < this.points.length; i++) {
      const closest: any[] = [];
      const p1 = this.points[i];
      for (let j = 0; j < this.points.length; j++) {
        const p2 = this.points[j];
        if (p1 !== p2) {
          if (closest.length < 5) {
            closest.push(p2);
          } else {
            for (let k = 0; k < 5; k++) {
              if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                closest[k] = p2;
                break;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    this.addEventListeners();
    this.animate();
  }

  private animate = (): void => {
    if (!this.ctx || !this.canvas) return;

    if (this.animateHeader) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (const p of this.points) {
        p.x += p.vx;
        p.y += p.vy;

        if (Math.abs(p.x - p.originX) > 30) p.vx *= -1;
        if (Math.abs(p.y - p.originY) > 30) p.vy *= -1;

        const dist = this.getDistance(this.target, p);
        if (dist < 4000) {
          p.active = 0.3;
          p.circle.active = 0.6;
        } else if (dist < 20000) {
          p.active = 0.1;
          p.circle.active = 0.3;
        } else if (dist < 40000) {
          p.active = 0.02;
          p.circle.active = 0.1;
        } else {
          p.active = 0;
          p.circle.active = 0;
        }

        this.drawLines(p);
        this.drawCircle(p);
      }
    }
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private drawLines(p: any): void {
    if (!this.ctx || !p.active) return;
    for (const closestPoint of p.closest) {
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(closestPoint.x, closestPoint.y);
      this.ctx.strokeStyle = `rgba(95,205,255,${p.active})`;
      this.ctx.stroke();
    }
  }

  private drawCircle(p: any): void {
    if (!this.ctx || !p.circle.active) return;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.circle.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = `rgba(95,205,255,${p.circle.active})`;
    this.ctx.fill();
  }

  private addEventListeners(): void {
    this.mouseMoveListener = (e: MouseEvent) => {
      this.target.x = e.clientX + window.scrollX;
      this.target.y = e.clientY + window.scrollY;
    };

    this.scrollListener = () => {
      this.animateHeader = window.scrollY <= this.height;
    };

    this.resizeListener = () => {
      this.resizeCanvas();
    };

    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', this.mouseMoveListener);
    }
    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('resize', this.resizeListener);
  }

  private resizeCanvas(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.largeHeader && this.canvas) {
      this.largeHeader.style.height = this.height + 'px';
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  private getDistance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }
}