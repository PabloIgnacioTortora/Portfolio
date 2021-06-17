import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProjectsComponent } from '../app/components/projects/projects.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Portfolio DEVELOPER';
  langs: string[] = [];
  project = ProjectsComponent;
  skillsDescriptions: string[];

  constructor(
    public translate: TranslateService,
    public auth: AuthService,
    private router: Router
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.translate.addLangs(['en', 'es']);
    this.langs = this.translate.getLangs();
  }

  ngOnInit(): void {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('header-desktop').style.top = '0';
      } else {
        document.getElementById('header-desktop').style.top = '-100px';
      }
      prevScrollpos = currentScrollPos;
    };

    setTimeout(function () {
      document.getElementById('whatsapp-button').classList.add('whatsapp');
    }, 20000);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['sobre-mi']);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  year = moment().format('YYYY');
}
