import {ExdeploymentService, DeploymentParams} from './exdeployment.service';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Field} from './field/field.component';
import {} from './panel/panel.component';

class Fields {
  ip_addr: Field;
  fqdn: Field;
  netmask: Field;
  gateway: Field;
  password: Field;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('file') file: ElementRef; 
  title = 'app';
  params: DeploymentParams = new DeploymentParams();
  paramStr: string;
  fields: Fields;
  constructor(private deployServ: ExdeploymentService, private http: Http) {
    this.fields = {
      ip_addr: {label: 'IP address', name :'ip_addr', tooltip: 'This is the IP address', type: 'text', value: '0.0.0.0'},
      fqdn: {label: 'FQDN', name :'fqdn', tooltip: 'This is the FQDN', type: 'text', value: 'myserver'},
      netmask: {label: 'Net mask', name :'netmask', tooltip: 'This is the net mask', type: 'text', value: '255.255.255.0'},
      gateway: {label: 'Default gateway', name :'gateway', tooltip: 'This is the default gateway', type: 'text', value: '1.1.1.1'},
      password: {label: 'Admin password', name :'password', tooltip: 'This is the admin password', type: 'text', value: 'password'},
    };
  }

  mgtFields() {
    return [
      this.fields.password
    ];
  }
  
  addressFields() {
    return [
      this.fields.ip_addr, this.fields.fqdn, this.fields.netmask, this.fields.gateway
    ];
  }
  
  ngOnInit(): void {
    const ret = this.deployServ.queryParams();
    ret.then(params => {
      console.info('Params = ' + JSON.stringify(params));
    });
  }

  fileInput(evt) {
    this.deployServ.upload(evt.target.files[0]);
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
