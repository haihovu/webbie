import {ExdeploymentService, DeploymentParams} from './exdeployment.service';
import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  params: DeploymentParams = new DeploymentParams();
  paramStr: string;
  constructor(private deployServ: ExdeploymentService) {}
  ngOnInit(): void {
    const ret = this.deployServ.queryParams();
    ret.then(params => {
      console.info('Params = ' + JSON.stringify(params));
    });
  }

  deploy() {
    const ret = this.deployServ.deploy(this.params);
    ret.then(param => {
      if (param != null) {
        this.params = param;
        this.paramStr = JSON.stringify(param);
        console.info('Res = ' + this.params + ' or ' + this.paramStr);
      } else {
        console.warn('Param is null');
      }
    });
  }
}
