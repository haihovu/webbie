from django.conf.urls import url

from api import views

urlpatterns = [
    url('deploy', views.deploy, name='deploy'),
    url('upload', views.upload, name='deploy'),
    url('queryparams', views.query_params, name='queryparams'),
]