import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// import { DialogModule } from 'primeng/dialog'; 
// import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ProductListDemo } from "../../../shared/dialog/dialog/dialog";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.css'],
})
export class Portfolio {

  visible: boolean = false;
  view :boolean = false;
  showDialog() {
    this.visible = true;
  }
  viewdetiled(){
    this.view= !this.view;
  }
  closeview(){
      this.view=!this.view
  }
  
  
}