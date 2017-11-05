import json
import logging
from logging import Handler, StreamHandler, Formatter, Logger, INFO

mylogger = logging.getLogger(__name__)
myHandler = StreamHandler()
for x in mylogger.handlers:
    mylogger.removeHandler(x)
myHandler.formatter = Formatter('%(asctime)s: %(levelname)s - %(filename)s.%(funcName)s: %(message)s')
mylogger.addHandler(myHandler)
mylogger.setLevel(INFO)

STATUS_OK = 0
STATUS_FAILED = 1

class Response(object):
    """"""
    def __init__(self):
        """

        """
        self.status = STATUS_FAILED
        self.data = None
        self.msg = None

    def export_json(self):
        """

        :return:
        :rtype: dict
        """
        return {'status': self.status, 'data': json.dumps(self.data), 'msg': self.msg}