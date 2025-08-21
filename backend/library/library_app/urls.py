from django.urls import path, include

urlpatterns = [
    path('admin/', include('library_app.views.admin.urls')),
    path('client/', include('library_app.views.client.urls')),
]