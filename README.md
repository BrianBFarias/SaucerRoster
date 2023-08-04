# Saucer Roster
## Distinctiveness and Complexity

This project satisfies the requirements given because it uses all the applied skills I've learned on every project up till now.
This entire project is based off a Django framework, I have a python backend with models and an API functionality to return specific serialized models, I also have a javscript for fronted modifications, and I styled everyting with css. I implemented a search bar similar to that of the Wiki project, however, I implemented it to filter for any posts that contain the provided input in either their brand or product name while returning the first post if multiple posts are found. The explore page has a similar structure to that of the index page of teh Linker project in that only up to 20 posts are shown at once. If there are more than 20 posts available to view a next button will appear at the bottom allowing to user to browse through all the posts. The add page implements something similar to when I needed to  create a listing for the ecommerce Project, however, instead of implementing an image url the user must upload an image that is saved within the Django framework. Finally, I used a proccess similar to when I wanted to display that a message had already been read in the Mail project to show when a user had already rated a product. With all these factors combined this project is more immersive, complex, and distinct than any project I've done yet.

### Whats in each File I created:
the folder SaucerRoster contains the main app for the website

Outside this folder (in the main directory) is a static folder. This contains all uploaded images for each model when created.

The static inside SaucerRoster file contains 2 folders, 1 containing all the css and js for all the required HTML files and another contains images needed by the website (in this case just the logo)

Under static there is a templates/pages folder. This contains all the HTML files (each page)

The rest of the files are apart of Django's framework and were supplied upon the creation of the project/app

### Accessing project:
```
python3 manage.py makemigrations

python3 manage.py migrate

python3 manage.py runserver
```
![SaucerRoster](https://github.com/BrianBFarias/SaucerRoster/assets/92887307/713dbf9e-99b9-4e84-ab4a-34f78ff58dac)

