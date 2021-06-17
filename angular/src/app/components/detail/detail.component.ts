import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService],
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project;
  public loading: boolean;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute,
    public auth: AuthService,
  ) {
    this.url = Global.url;
    this.loading = true;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id) {
    this._projectService.getProject(id).subscribe(
      (response) => {
        this.project = response.project;
        this.loading = false;
        document.getElementById('detail-container').style.height = 'auto';
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  deleteProject(id) {
    this._projectService.deleteProject(id);
    this._router.navigate(['/proyectos']);
  }

  goBack() {
    this._router.navigate(['/proyectos']);
  }
}
