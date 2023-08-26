# from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.utils.timezone import now


class User(AbstractUser):
    pass

class rating(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    spice = models.IntegerField(default=0)
    flavor = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.poster} - {self.id}"
    
def reviewed(user, rating):
    reviewed = False
    for review in rating.all():
        if review.poster == user:
            reviewed = True
    return reviewed

def liked(user, likes):
    liked = False
    for liker in likes.all():
        if liker == user:
            liked = True
    return liked
    

class comment(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name='poster')
    timestamp = models.DateTimeField(default=timezone.now)
    comment = models.CharField(max_length=100*20, null=True)
    likes = models.ManyToManyField(User, blank=True, related_name='likes')

    def __str__(self):
        return f"{self.poster} - {self.id}"
    
    def serialize(self, user):
        return{
            'id': self.id,
            'liked': liked(user, self.likes),
            'likes':self.likes.count(),
            'comment': self.comment,
            'poster':self.poster.username,
            'timestamp':self.timestamp
        }

class Post(models.Model):
    brand = models.CharField(max_length=100, null=True)
    product = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=2000, null=True)
    rating = models.ManyToManyField(rating, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to = "images/")
    comments = models.ManyToManyField(comment, blank=True)

    def __str__(self):
        return f"{self.product}: {self.brand}"
    
    def serialize(self, user):
        return{
            'id':self.id,
            "brand": self.brand,
            'product': self.product,
            'reviewed': reviewed(user, self.rating),
            'num_reviews': self.rating.count(),
            'num_comments': self.comments.count(),
            'description': self.description,
            'image':self.image.url
        }

