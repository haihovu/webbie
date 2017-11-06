# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exdeploymentparams',
            name='id',
        ),
        migrations.AddField(
            model_name='exdeploymentparams',
            name='fqdn',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AddField(
            model_name='exdeploymentparams',
            name='ipAddress',
            field=models.CharField(default='default', max_length=16, serialize=False, primary_key=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='exdeploymentparams',
            name='netmask',
            field=models.CharField(default=b'255.255.255.0', max_length=16),
        ),
    ]
