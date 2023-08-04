from django.contrib import admin
from .models import User,Post,rating
# Register your models here.

class other(admin.ModelAdmin):
    filter_horizontal = ("rating",)
    list_display = ('product', 'brand')

admin.site.register(User)
admin.site.register(Post, other)
admin.site.register(rating)
