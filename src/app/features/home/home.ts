import { Component ,HostListener} from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { Hero } from '../sections/hero/hero';
import { Portfolio } from '../sections/portfolio/portfolio';
import { Contact } from '../sections/contact/contact';
import { Services } from '../sections/services/services';
import { RouterLink } from "@angular/router";
import { About } from '../sections/about/about';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, Footer, Hero, Portfolio, Contact, Services, RouterLink, About],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  showbtn = false; 
  @HostListener('window:scroll')
     checkscroll() {
        this.showbtn = window.scrollY > 300;
    }
}