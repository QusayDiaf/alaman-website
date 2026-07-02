import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.css'],
})
export class Portfolio {
  view: boolean = false;
  activeProject: { title: string; desc: string } | null = null;

  viewdetiled(title: string, desc: string) {
    this.activeProject = { title, desc };
    this.view = true;
  }

  closeview() {
    this.view = false;
  }
  isCisModalOpen: boolean = false;
  isTapModalOpen: boolean = false;
  isAeoModalOpen: boolean = false;
}