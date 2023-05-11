from django.db import models
from django.contrib.auth.hashers import make_password, check_password


from django.db import models

class Admin(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

class Course(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    category = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField()

class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    # def __str__(self):
    #     return self.name

class Cart(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    category = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField()
    quantity = models.IntegerField()
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Order(models.Model):
    total_price = models.DecimalField(decimal_places=2, max_digits=10)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    order_id = models.BigAutoField(primary_key=True)
