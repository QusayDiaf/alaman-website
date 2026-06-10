import { Component } from '@angular/core';
import { Contact } from '../sections/contact/contact';
import { Portfolio } from '../sections/portfolio/portfolio';
import { Services } from '../sections/services/services';
import { About } from '../sections/about/about';
import { Hero } from '../sections/hero/hero';
import { RouterLink } from '@angular/router';
import { Footer } from '../../shared/footer/footer';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [ Hero, About, Services, Portfolio, Contact ,Footer,Navbar, ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
