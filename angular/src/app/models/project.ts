export class Project {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public linkGit: string,
    public linkDeploy: string,
    public year: number,
    public lenguajes: string,
    public image: string
  ) {}
}
