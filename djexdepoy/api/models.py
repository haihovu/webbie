import json
from django.db import models

# Create your models here.
from django.db.models.fields import CharField
from pexpect.expect import searcher_re


class ExDeploymentParams(models.Model):
    """Parameter model class"""
    ipAddress = CharField(max_length=16, primary_key=True)
    fqdn = CharField(max_length=128, null=True)
    netmask = CharField(max_length=16, default='255.255.255.0')
    adminPasswd = CharField(max_length=128, null=True)

    def __str__(self):
        """To string"""
        return '{ipAddress:' + str(self.ipAddress) + ', fqdn:' + str(self.fqdn) + ', netmask:' + str(self.netmask) + ', adminPasswd:' + str(self.adminPasswd) + '}'

    def export_json(self):
        return {'ipAddress': self.ipAddress, 'fqdn': self.fqdn, 'netmask': self.netmask, 'adminPasswd': self.adminPasswd}