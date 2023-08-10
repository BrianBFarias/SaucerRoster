# from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import now


class User(AbstractUser):
    pass

class rating(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    spice = models.IntegerField(default=0)
    flavor = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.poster}"
    
def reviewed(user, rating):
    reviewed = False
    for review in rating.all():
        if review.poster == user:
            reviewed = True
    return reviewed

class Post(models.Model):
    brand = models.CharField(max_length=100*20, null=True)
    product = models.CharField(max_length=100*20, null=True)
    description = models.CharField(max_length=100*20, null=True)
    rating = models.ManyToManyField(rating, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to = "images/")

    def __str__(self):
        return f"{self.product}: {self.brand}"
    
    def serialize(self, user):
        return{
            'id':self.id,
            "brand": self.brand,
            'product': self.product,
            'reviewed': reviewed(user, self.rating),
            'num_reviews': self.rating.count(),
            'description': self.description,
            'image':self.image.url
        }

