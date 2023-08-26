from django.contrib import admin
from .models import User,Post,rating,comment
# Register your models here.

class other(admin.ModelAdmin):
    list_filter = ('brand',)
    filter_horizontal = ("rating","comments",)
    list_display = ('product', 'brand', 'id')

admin.site.register(User)
admin.site.register(Post, other)
admin.site.register(rating)
admin.site.register(comment)
