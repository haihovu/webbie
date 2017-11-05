# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20170902_2212'),
    ]

    operations = [
        migrations.AddField(
            model_name='exdeploymentparams',
            name='adminPasswd',
            field=models.CharField(max_length=128, null=True),
        ),
    ]
