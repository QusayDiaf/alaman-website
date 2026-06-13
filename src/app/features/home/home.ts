import { Component ,HostListener} from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { Hero } from '../sections/hero/hero';
import { Services } from '../sections/services/services';
import { Portfolio } from '../sections/portfolio/portfolio';
import { About } from '../sections/about/about';
import { Contact } from '../sections/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, Footer, Hero, Services, Portfolio, About, Contact],
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