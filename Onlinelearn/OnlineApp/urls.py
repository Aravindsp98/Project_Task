from django.urls import path
from .views import UserSignUp, UserLogin, AdminLogin,AdminSignUp,CourseList,CourseDetail,CartList,CartDetail,OrderList,OrderDetail
from django.conf.urls.static import static
from Onlinelearn import settings
urlpatterns = [
    path('users/', UserSignUp.as_view()),
    path('users/login/', UserLogin.as_view()),
    path('admin/', AdminSignUp.as_view()),
    path('admin/login/', AdminLogin.as_view()),
    path('courses/', CourseList.as_view()),
    path('courses/<int:pk>/', CourseDetail.as_view()),
    path('cart/', CartList.as_view()),
    path('cart/<int:pk>/', CartDetail.as_view()),
    path('orders/', OrderList.as_view()),
    path('orders/<int:user_id_id>/', OrderDetail.as_view()),
]