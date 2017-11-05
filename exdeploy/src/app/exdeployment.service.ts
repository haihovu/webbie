import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HtmlAstPath} from '@angular/compiler';
import {getLineAndCharacterOfPosition} from 'typescript';

export class DeploymentParams {

  ipAddress: string;
  netmask: string;
  adminPasswd: string;
  fqdn: string;

  constructor() {
    this.ipAddress = '';
    this.netmask = '';
    this.fqdn = '';
    this.adminPasswd = '';
  }
}

function getHostUrl() {
  return '';
}

@Injectable()
export class ExdeploymentService {

  constructor(private http: HttpClient) {
  }

  deploy(params: DeploymentParams): Promise<DeploymentParams> {
    console.info('Params:  ' + JSON.stringify(params));
    let xsrftoken: string = 'bogus';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; ++i) {
      const parts = cookies[i].split('=');
      if (parts.length === 2) {
        if (parts[0].trim() === 'XSRF-TOKEN') {
          xsrftoken = parts[1].trim();
        }
      }
    }
    let myheaders = new HttpHeaders().set('sssX-CSRFToken', xsrftoken);
    const prom = this.http.post(getHostUrl() + '/exdeploy/api/deploy', JSON.stringify(params), {headers: myheaders}).toPromise();
    return prom.then(resp => {
      console.info('Response: ' + JSON.stringify(resp));
      return resp as DeploymentParams;
    }).catch(exception => {
      console.warn('Exception : ' + JSON.stringify(exception) + ' -> ' + exception.toString());
    });
  }
  queryParams(): Promise<any> {
    console.info('Cookie: ' + document.cookie + ', window.location: ' + JSON.stringify(window.location));
    const prom = this.http.get(getHostUrl() + '/exdeploy/api/queryparams').toPromise();
    return prom.then(resp => {
      console.info('Response: ' + JSON.stringify(resp));
      return resp;
    }).then(params => {
      console.info('Params = ' + JSON.stringify(params));
      return params;
    }).catch(exception => {
      console.warn('Exception : ' + JSON.stringify(exception) + ' -> ' + exception.statusCode);
    });
  }
}
