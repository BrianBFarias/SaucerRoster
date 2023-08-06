from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .models import User
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.db import IntegrityError
from .models import User,Post,rating
from django.core.serializers import serialize


# Create your views here.

# This returns a lsit of dictionary containing posts and their hot sauce scores
def posts(API, request):
    postings=[]
    for post in Post.objects.all():
        this_spice =0
        this_flavor=0
        for rating in post.rating.all():
            this_spice += rating.spice
            this_flavor += rating.flavor

        spice_rank = [0]* round(this_spice/post.rating.count())
        flavor_rank = [0]* round(this_flavor/post.rating.count())
        if(API):
            post ={
            'post':post.serialize(request.user),
            'spice':spice_rank,
            'flavor':flavor_rank
        }
        else:
            post ={
            'post':post,
            'spice':spice_rank,
            'flavor':flavor_rank
        }
            
        postings.append(post)
    return postings

def index(request):
    
    postings = posts(False, request)

    return render(request, "pages/index.html", {
        'spice':sorted(postings, key=lambda posting: posting['spice'], reverse=True)[0:5],
        'flavor':sorted(postings, key=lambda posting: posting['flavor'], reverse=True)[0:5]
    })

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "pages/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "pages/login.html")
    

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "pages/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()

        except IntegrityError:
            return render(request, "pages/register.html", {
                "message": "Username already taken."
            })
        except ValueError:
            return render(request, "pages/register.html", {
                "message": "Username empty."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "pages/register.html")
    
# search for hotsauce/brand
def search(request):
    if request.method == 'POST':
        search = request.POST['search']
        if Post.objects.filter(product__icontains = search):
            return sauce(request, Post.objects.filter(product__icontains = search)[0].id)

        elif Post.objects.filter(brand__icontains = search):
            return sauce(request, Post.objects.filter(brand__icontains = search)[0].id)
        
        return render(request, "pages/index.html", {
        'invalid': True
    })
    
    else:
        return index(request)

# add listing
@login_required
def add(request):
    if request.method == 'POST':
        try:
            image = request.FILES['image_field']
            brand = request.POST['brand']
            product = request.POST['product']
            description = request.POST['description']
            spice_rating = request.POST['radios']
            flavor_rating = request.POST['radiof']
        except:
            return render(request, "pages/add.html", {
                'error':True
            })

        rate = rating.objects.create(poster = request.user, spice=spice_rating, flavor=flavor_rating)
        rate.save()

        post = Post.objects.create(brand = brand, product=product, description = description, image=image )
        post.save()
        post.rating.add(rate)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "pages/add.html")
    

def explore(request):
    return render(request, "pages/explore.html")

def Allposts(request):
    start = int(request.GET.get("start") or 0)
    end = int(request.GET.get("end") or (start + 9))

    postings = posts(True, request)
    return JsonResponse([post['post'] for post in postings[start:end]], safe=False)

def sauce(request, post_id):

    post = Post.objects.get(id=post_id)

    return render(request, 'pages/product.html', {
        'product':post
    })

@login_required
@csrf_exempt
def review(request, post_id):
    spice_rating = int(request.GET.get("spice") or 3)
    flavor_rating = int(request.GET.get("flavor") or 3)

    ratings = Post.objects.get(id=post_id).rating.all()

    if (ratings.filter(poster=request.user)):
        return ratingA(request, post_id)
    
    else:
        rate = rating.objects.create(poster = request.user, spice=spice_rating, flavor=flavor_rating)
        rate.save()

        Post.objects.get(id=post_id).rating.add(rate)  

    return ratingA(request, post_id)

@login_required
def post(request, post_id):
    post = Post.objects.get(id=post_id)
    return JsonResponse(post.serialize(request.user))


def ratingA(request, post_id):
    post = Post.objects.get(id =post_id)
    this_spice = 0.00
    this_flavor= 0.00
    for rating in post.rating.all():
        this_spice += rating.spice
        this_flavor += rating.flavor

    spice_rank = this_spice/post.rating.count()
    flavor_rank = this_flavor/post.rating.count()

    return JsonResponse({'spice_rank':spice_rank, 'flavor_rank': flavor_rank}, safe=False)