import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public parraf: string;
  public aboutTitle: string;
  public titleColor: string;

  public skillsIcons = [
    '../../../assets/icons/html-5.svg',
    '../../../assets/icons/css3.svg',
    '../../../assets/icons/javascript.svg',
    '../../../assets/icons/typescript.svg',
    '../../../assets/icons/angular-icon.svg',
    '../../../assets/icons/react.svg',
    '../../../assets/icons/bootstrap-4.svg',
    '../../../assets/icons/nodejs.svg',
    '../../../assets/icons/iconfinder_google_firebase_1175544.svg',
    '../../../assets/icons/mongodb-icon-1.svg',
    '../../../assets/icons/git.svg',
  ];

  public skillsDescriptions = [
    'html5',
    'css',
    'js',
    'ts',
    'angular',
    'react',
    'bootstrap',
    'node',
    'firebase',
    'mongodb',
    'git',
  ];

  constructor(public translate: TranslateService) {
    this.title = 'Front-end Developer';
    this.subtitle =
      'I design and code beautifully simple things, and I love what I do.';
    this.aboutTitle = 'Hi, I’m Pablo. Nice to meet you.';
  }

  ngOnInit(): void {
    this.firstWordFromId('h1');
  }

  firstWordFromId(selectId) {
    const jsIntro = document.getElementById(selectId);
    const originalString = jsIntro.innerHTML;
    const splitWords = originalString.split(' ');

    jsIntro.innerHTML =
      '<span style="color:#fff;">'.concat(splitWords[0], '</span>') +
      '&#32;' +
      originalString.substr(originalString.indexOf(' ') + 1);
  }

  // scrollReveal(): void {
  //   let html = document.getElementsByTagName('html')[0];
  //   let elementReveal = document.getElementsByClassName('reveal');
  //   let title = document.getElementById('title');

  //   document.addEventListener('scroll', () => {
  //     let top = html.scrollTop;
  //     for (let i = 0; i < elementReveal.length; i++) {
  //       let topElementReveal = elementReveal[i].offsetTop;
  //       if (top > topElementReveal - 300) {
  //         // elementReveal[i].style.opacity = 1;
  //         title.style.height = '50vh';
  //         title.style.marginBottom = '50px';
  //       }
  //     }
  //   });
  // }
}
