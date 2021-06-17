import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService],
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: string;
  public loading: boolean;

  constructor(private _projectService: ProjectService) {
    this.url = Global.url;
    this.loading = true;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._projectService.getProjects().subscribe(
      (response) => {
        if (response.projects) {
          this.projects = response.projects;
          this.loading = false;
          document.getElementById('container-project').style.height = 'auto';
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
