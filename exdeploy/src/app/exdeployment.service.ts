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
  return 'https://localhost/';
}

@Injectable()
export class ExdeploymentService {

  constructor(private http: HttpClient) {
  }

  getXsrfToken(): string {
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
    console.info('FOund xsrf token ' + xsrftoken);
    return xsrftoken;
  }

  getHeaders(xsrf: boolean): HttpHeaders {
    let ret = new HttpHeaders();
    if(xsrf) {
      ret = ret.set('X-XSRF-TOKEN', this.getXsrfToken());
    }
    console.info('Headers: ' + JSON.stringify(ret));
    return ret;
  }

  upload(f: File) {
    const data: FormData = new FormData();
    data.append('file', f, f.name);
    let headers = this.getHeaders(true);
    headers.append('Accept', 'application/json');
    console.info();
    this.http.post('https://localhost/exdeploy/api/upload', data, { headers: headers }).subscribe(data => {
      console.info(data);
    }, error => {
      console.warn(error);
    });
  }

  deploy(params: DeploymentParams): Promise<any> {
    console.info('Params:  ' + JSON.stringify(params));
    
    let myheaders = this.getHeaders(true);
    const prom = this.http.post(getHostUrl() + 'exdeploy/api/deploy', JSON.stringify(params), {headers: myheaders}).toPromise();
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
