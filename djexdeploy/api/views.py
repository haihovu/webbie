import json
# Create your views here.
import sys
import traceback
from django.core.files.uploadedfile import UploadedFile

from django.core.files.storage import FileSystemStorage

from django.http.response import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

from api import mylogger, Response, STATUS_OK
from api.models import ExDeploymentParams


class DeploymentParam:
    """"""
    def __init__(self):
        self.ipAddress = None
        self.fqdn = None
        self.netmask = None
        self.adminPassword = None

    def importJson(self, jsonObj):
        """
        :param jsonObj:
        :type jsonObj: dict
        :return:
        :rtype: DeploymentParam
        :raise: TypeError
        """
        if "ipAddress" in jsonObj:
            self.ipAddress = jsonObj["ipAddress"]
            if not self.ipAddress:
                raise TypeError('Empty IP address')
        else:
            raise TypeError('No IP address present')

        if "netnmask" in jsonObj:
            self.netmask = jsonObj['netmask']

        if "fqdn" in jsonObj:
            self.fqdn = jsonObj["fqdn"]

        if "adminPassword" in jsonObj:
            self.adminPassword = jsonObj["adminPassword"]

        return self


def deploy(req):
    """Deploy something
    :param req:
    :type req: django.http.request.HttpRequest
    """
    resp = Response()
    if req.method == 'POST':
        try:
            jsonObj = json.loads(req.body)
            mylogger.info('Received {0} {1} {2}'.format(json.loads(str(req.body)), repr(req.body), str(jsonObj)))
            res = None
            if jsonObj:
                params = DeploymentParam().importJson(jsonObj)
                mylogger.info('IP: {0}'.format(params.ipAddress))
                existing = ExDeploymentParams.objects.filter(ipAddress=params.ipAddress)
                if existing:
                    res = existing[0]
                mylogger.info('Found {0}'.format(repr(res)))

            else:
                raise AssertionError('No deployment param given')

            if not res:
                res = ExDeploymentParams.objects.create(ipAddress=params.ipAddress)
                res.save()
                mylogger.info('Created {0}'.format(repr(res)))

            resp.status = STATUS_OK
            resp.data = res.export_json()

        except Exception as e:
            mylogger.warning('Encountered {0} at {1}'.format(e, traceback.format_tb(sys.exc_info()[2])))
            resp.msg = str(e)
    else:
        resp.msg = 'Only support POST method'

    return HttpResponse(json.dumps(resp.export_json()), content_type='application/json')


def upload(req):
    """Upload a file
    :param req:
    :type req: django.http.request.HttpRequest
    """
    resp = Response()
    if req.method == 'POST':
        try:
            f = req.FILES['file']
            fs = FileSystemStorage()
            fs.save(f.name, f)

            resp.status = STATUS_OK
            resp.data = 'Uploaded ' + str(f)

        except Exception as e:
            mylogger.warning('Encountered {0} at {1}'.format(e, traceback.format_tb(sys.exc_info()[2])))
            resp.msg = str(e)

    else:
        resp.msg = 'Only support POST method'

    return HttpResponse(json.dumps(resp.export_json()), content_type='application/json')


@ensure_csrf_cookie
def query_params(req):
    """Deploy something
    :param req:
    :type req: django.http.request.HttpRequest
    """
    resp = Response()
    try:
        mylogger.info('Received {0}'.format(repr(req.body)))
        res = []
        for rec in ExDeploymentParams.objects.all():
            res.append(rec.export_json())

        resp.status = STATUS_OK
        resp.data = res

    except Exception as e:
        mylogger.warning('Encountered {0} at {1}'.format(e, traceback.format_tb(sys.exc_info()[2])))
        resp.msg = str(e)

    mylogger.info('DEBUG About to return {0}'.format(resp.export_json()))
    return JsonResponse(resp.export_json())


def _json_to_deployment_params(json_obj):
    """

    :param json_obj:
    :return:
    """