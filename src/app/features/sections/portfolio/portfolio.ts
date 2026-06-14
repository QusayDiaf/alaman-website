import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.css'],
})
export class Portfolio implements OnInit, OnDestroy {
  private rAF: number | null = null;
  private resizeHandler: (() => void) | null = null;
  private mousemoveHandler: ((e: MouseEvent) => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // التأكد من أن الكود يعمل فقط في المتصفح وليس أثناء الـ SSR (Server Side Rendering)
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initConstellation();
      }, 0);
    }
  }

  initConstellation() {
    const canvas = document.getElementById('projects-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const config = {
      star: { color: 'rgba(47, 77, 160, 0.25)', width: 3, randomWidth: true },
      line: { color: 'rgba(47, 77, 160, 0.15)', width: 0.3 },
      position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
      width: window.innerWidth,
      height: window.innerHeight,
      velocity: 0.1,
      length: Math.floor(window.innerWidth / 7),
      distance: 120,
      radius: window.innerWidth / 5,
      stars: [] as any[]
    };

    class Star {
      x: number; y: number; vx: number; vy: number; radius: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (config.velocity - (Math.random() * 0.5));
        this.vy = (config.velocity - (Math.random() * 0.5));
        this.radius = config.star.randomWidth ? (Math.random() * config.star.width) : config.star.width;
      }
      create() {
        if (!context) return;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
      }
    }

    const setCanvas = () => {
      const section = document.getElementById('projects');
      if (section) {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
      }
    };

    const setContext = () => {
      context.fillStyle = config.star.color;
      context.strokeStyle = config.line.color;
      context.lineWidth = config.line.width;
    };

    const createStars = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < config.length; i++) {
        if (!config.stars[i]) config.stars.push(new Star());
        const star = config.stars[i];

        if (star.y < 0 || star.y > canvas.height) {
          star.vy = -star.vy;
        } else if (star.x < 0 || star.x > canvas.width) {
          star.vx = -star.vx;
        }
        star.x += star.vx;
        star.y += star.vy;
        star.create();
      }
      drawLines();
    };

    const drawLines = () => {
      for (let i = 0; i < config.length; i++) {
        for (let j = 0; j < config.length; j++) {
          const iStar = config.stars[i];
          const jStar = config.stars[j];
          if (
            (iStar.x - jStar.x) < config.distance &&
            (iStar.y - jStar.y) < config.distance &&
            (iStar.x - jStar.x) > -config.distance &&
            (iStar.y - jStar.y) > -config.distance
          ) {
            if (
              (iStar.x - config.position.x) < config.radius &&
              (iStar.y - config.position.y) < config.radius &&
              (iStar.x - config.position.x) > -config.radius &&
              (iStar.y - config.position.y) > -config.radius
            ) {
              context.beginPath();
              context.moveTo(iStar.x, iStar.y);
              context.lineTo(jStar.x, jStar.y);
              context.stroke();
              context.closePath();
            }
          }
        }
      }
    };

    const loop = () => {
      createStars();
      this.rAF = window.requestAnimationFrame(loop);
    };

    setCanvas();
    setContext();
    loop();

    // ربط مستمعات الأحداث
    this.mousemoveHandler = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      config.position.x = e.clientX - rect.left;
      config.position.y = e.clientY - rect.top;
    };

    this.resizeHandler = () => {
      if (this.rAF) window.cancelAnimationFrame(this.rAF);
      setCanvas();
      setContext();
      config.stars = [];
      loop();
    };

    window.addEventListener('mousemove', this.mousemoveHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy() {
    // تنظيف الأحداث والأنيميشن لمنع تسريب الذاكرة (Memory Leak)
    if (isPlatformBrowser(this.platformId)) {
      if (this.rAF) window.cancelAnimationFrame(this.rAF);
      if (this.mousemoveHandler) window.removeEventListener('mousemove', this.mousemoveHandler);
      if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    }
  }
}