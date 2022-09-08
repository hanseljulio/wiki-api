# wiki-api

This is a RESTful API that allows users to create, update, post, and delete one or many articles. 
MongoDB is used as the database, can be used with Postman to test functionality of API.

## GET/POST/DELETE ALL Articles

- GET All Articles (READ in database)
  - /articles - Fetches all alrticles

- POST a new article (CREATE in database)
  - /articles - create one new article

- DELETE all articles
  - /articles - delete all the articles


## GET/PUT/PATCH/DELETE specific articles

- GET specific article
  - /articles/test - Fetches the article on test

- PUT/PATCH a specific article (UPDATE in database)
  - /articles/test - updates the article on test

- DELETE specific article
  - /articles/test - delete test article
