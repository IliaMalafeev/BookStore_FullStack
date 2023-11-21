# BookStore fullstack web application

![Snippet screenshot](./README_assets/snippet_for_readme.jpg)



## Fully functional web application fullstack project

This project is a part of my personal portfolio and is designed to accumulate and demonstrate 
technical stack that I have learned throughout my coding journey.

It is a fully complete and functional example of online bookstore library and shop. 
User can browse through various web app pages in order to search for books, 
checkout books, leave reviews and ratings and so on.
Design of the website is completely done by me as well as the book covers design etc.


### Technical stack

<br>

<div align="center">

<img src="README_assets/java.svg" width="55" height="55" alt="java">
<img src="README_assets/ts.svg" width="55" height="55" alt="ts">
<img src="README_assets/html.svg" width="55" height="55" alt="html">
<img src="README_assets/css.svg" width="55" height="55" alt="css">
<img src="README_assets/spring.svg" width="55" height="55" alt="spring">
<img src="README_assets/reactjs.svg" width="55" height="55" alt="react">
<img src="README_assets/hibernate.svg" width="55" height="55" alt="hibernate">
<img src="README_assets/postgresql.svg" width="55" height="55" alt="postgresql">
<img src="README_assets/tailwind.svg" width="55" height="55" alt="tw">
<img src="README_assets/docker.svg" width="55" height="55" alt="docker">
<img src="README_assets/stripe.svg" width="55" height="55" alt="stripe">
<img src="README_assets/git.svg" width="55" height="55" alt="git">

</div>

<br>

* Programming and markup languages: **Java, TypeScript, HTML, CSS** \
* Frameworks and libraries: **Spring Framework, ReactJS, Hibernate, Tailwind** \
* Database and other tools: **PostgreSQL, Docker, Stripe, Git**

**Deployed version** - [coming soon]()



## Brief overview of functionality and purpose


### General project structure

This project consists of **two major parts**, as could be seen in the folder structure.

* **Backend** - REST API server-side application written in Java with usage of 
Spring Framework and PostgreSQL database.

* **Frontend** - Client side web application written in Typescript with usage of 
React and various additional tools like Tailwind etc.

**PostgreSQL** is used as DataBase system for server side to store all the data required for the application.

**Docker** containerization system is implemented to allow easy build and 
test run on any environment if required.

**Stripe payment** service is applied for processing payments made by users of the website. 


### General project functionality

In order to follow best practices and to make this project as "real-world-like" 
as possible I have implemented some common functionalities throughout this project.
Following is a brief description of those functionalities:

* **Authentication & Authorization** - implemented by using **Spring Security in conjunction with JWT** 
technologies. Only "Home", "Search" and few other pages are available to unauthenticated users. 
Other user-specific pages and application functions are available only after authentication.
Users are able to **Log in** and **Register** to the service. **JWTs** are generated via backend API 
and sent to user's frontend client, and then validated by backend each time a user tries to 
access any secured endpoint. **Admin** page and functionality is only available for **authorized** users. 
All user information including **authority** is stored in DataBase after registration and encoded into JWT.


* **Pagination** - pagination logic is implemented for both frontend and backend, and is used on various 
website pages that fetch / show big amount of items to make appearance more user-friendly. For example, 
pagination is used on "Search" page, "History" page, "All book reviews" page and so on.


* **Books search** - search mechanism of the application allows users to search through all the books 
available at the store either **by title** or **by genre**.


* **Book checkout** - allows user to check out (rent) any book that is available and in stock. 
User gets the book displayed on the "shelf", and the book's "copies available" count gets decreased. 
The book is then available for 7 days free of charge. If user has any outdated books, checkout functionality 
becomes unavailable until outstanding fees are paid.


* **Bookshelf management** - shelf page provides a user with ability to manage current loans or 
display previous loans history. Current loans total count is limited, so only 5 books can be simultaneously
checked out by each user. Management functions are as follows:
  * **Renew loan** - allows user to renew loan expiry date back to 7 days from the current moment. 
  Only available if user has no outdated loans or fees pending.
  * **Return book** - allows user to return the book back to the store. 
  No fee is created unless returned book was overdue at the moment. Book's "copies available" value
  gets increased.
  * **History tab** - displays all records of previously checked books. Can be used to track the list 
  of books read by user.


* **Book's reviews and ratings** - functionality that allows users to leave a review for any book.
User is encouraged to **rate the book and leave a comment**. A review can be created without the comment text
while rating is required.
  * **Book's rating** will be fetched as an average among all book's reviews and shown on book's specific page
  * **Latest reviews** are shown on the bottom of book's specific page as well
  * **All book's reviews** are available for the user on a separate page that can be accessed from book's 
  specific page


* **Discussions service** - allows users to open private discussions with administration. 
  * **New discussion tab** - user is encouraged to **open a discussion on any topic** and leave a message for 
  administration. This discussion can later be answered and closed by admin.
  * **All discussions tab** - provides a list of all person's discussions. Discussions answered by 
  administration are marked as "closed" and have admin reply attached, others are marked as "pending reply".
 

* **Payment service** - implemented by using **Stripe Payments** service as payment processor. Functionality 
allows users to pay outstanding fees. User enters credit card information and payment request with certain 
amount is created and processed by Stripe system. All **receipts** are available for application owner within 
his Stripe account and also are automatically sent to users via e-mail by Stripe. As this is a pet project for 
portfolio, a banner with test credit card info is present right on the payment page allowing user to test 
payment functionality without entering any valid credit card information.


* **Administration tools** - allows **authorized** users access to management instruments, that include
adding or deleting books, changing item quantities, closing discussions etc.
  * **Add book tab** - provides a form for administrator to **create a new book item** and add it to the 
  DataBase. Each book must contain "title", "author", "description", "copies", "copies available", 
  "cover image", "list of genres" fields filled out in order to be added to the database.
  * **Quantities tab** - displays a list of all book items available in the database and allows authorized 
  admin user to change "copies available" count of any book (increase or decrease) or to delete a book 
  completely.
  * **Discussions tab** -  displays a list of all open discussions and allows authorized admin user to add 
  administration response to any discussion and thus close it.



## REST API endpoints and Client routes

Following is the list of all endpoints available within the project with short descriptions.


### Back-end

#### Open (unauthenticated) endpoints

Following is the list of endpoints that **does not require authentication** and are available to all users.


#### GET

* `.../api/books?page={pageNumber}&books-per-page={itemsPerPage}` - get paginated list of all books.


* `.../api/books/{bookId}` - get a book with `id` passed as a path variable.


* `.../api/books/search/by-title?page={pageNumber}&books-per-page={itemsPerPage}&title-query={titleQuery}` -
get paginated list of all books with `title` value containing `titleQuery` value from url param.


* `.../api/books/search/by-genre?page={pageNumber}&books-per-page={itemsPerPage}&genre-query={genreQuery}` -
get paginated list of all books with `genres` value containing `genreQuery` value from url param.


* `.../api/genres` - get a list of all genres.


* `.../api/reviews/{bookId}?page={pageNumber}&reviews-per-page={itemsPerPage}&latest={true/false}` - get
paginated list of all reviews for the book with `id` passed as a path variable. If `latest` is set to `true` then
returned list is sorted by reviews `id` value in descending order.


* `.../api/reviews/average-rating/{bookId}` - get book's average rating, calculated from all book's reviews.


#### POST

* `.../api/auth/register` - register (create) a new user. This request will generate and return **JWT** that
  is used to access all secure endpoints of the application. Requires a valid personRegistrationDTO passed
  as a request body:

  ```json
  {
    "firstName": "Person first name",
    "lastName": "Person last name",
    "dateOfBirth": "1990-11-21",
    "email": "userEmail@email.com",
    "password": "userPassword"
  }
  ```


* `.../api/auth/authenticate` - log in to the service using your credentials. This request will generate
  and return **JWT** that is used to access all secure endpoints of the application. Requires a valid
  personLoginDTO passed as a request body:

  ```json
  {
    "email": "userEmail@email.com",
    "password": "userPassword"
  }
  ```


#### Secured (authenticated) endpoints

Following is the list of endpoints that **require authentication** and are available only to authenticated users.


#### GET

* `.../api/admin/secure/open-discussions?page={pageNumber}&discussions-per-page={itemsPerPage}` - get
  paginated list of all open discussions. Requires JWT passed as `Authorization` header (Bearer token).


* `.../api/books/secure/is-checked-out/{bookId}` - check if a book with `id` passed as a path variable is
  currently checked out by user. Requires JWT passed as `Authorization` header (Bearer token).


* `.../api/books/secure/is-reviewed/{bookId}` - check if a book with `id` passed as a path variable is
  already reviewed by user. Requires JWT passed as `Authorization` header (Bearer token).


* `...api/checkouts/secure/current-loans-count` - get the amount of user's current checkouts.
  Requires JWT passed as `Authorization` header (Bearer token).


* `...api/checkouts/secure/current-checkouts` - get a list of all user's current checkouts.
  Requires JWT passed as `Authorization` header (Bearer token).


* `.../api/discussions/secure?page={pageNumber}&discussions-per-page={itemsPerPage}` - get paginated list
  of all person's discussions. Requires JWT passed as `Authorization` header (Bearer token).


* `.../api/history-records/secure?page={pageNumber}&records-per-page={itemsPerPage}` - get paginated list
  of all person's history records. Requires JWT passed as `Authorization` header (Bearer token).


* `.../api/payment/secure` - get the amount of person's current fees pending. Requires JWT passed
  as `Authorization` header (Bearer token).


#### POST

* `.../api/admin/secure/add-book` - add new book to database. Requires JWT passed as `Authorization` header 
(Bearer token) and a valid bookDTO passed as a request body:
  ```json
  { 
    "title": "Book title",
    "author": "Author Name",
    "description": "Book description",
    "copies": 10,
    "copiesAvailable": 10,
    "img": "data:image/jpeg;base64,/9j/4AAQS...",
    "genres": [
      {"description": "Science Fiction"},
      {"description": "Fantasy"},
      {"description": "Romance"}
    ]
  }
  ```


* `.../api/admin/secure/close-discussion` - add an administration response to any open discussion and
close that discussion. Requires JWT passed as `Authorization` header (Bearer token) and a valid discussionDTO
passed as a request body:

  ```json
  { 
    "id": 1,
    "personEmail": "Person e-mail",
    "personFirstName": "Person first name",
    "personLastName": "Person last name",
    "title": "Discussion title (subject)",
    "question": "Discussion question",
    "adminEmail": "Administrator user e-mail",
    "response": "Administration response message",
    "closed": true
  }
  ```


* `.../api/books/secure/review/{bookId}` - add a review for a book with `id` passed as a path variable.
Requires JWT passed as `Authorization` header (Bearer token) and a valid reviewDTO passed as a request body:

  ```json
  {
    "date": "2023-11-21T12:54:59.841",
    "rating": 4.5,
    "reviewDescription": "Comment message"
  }
  ```


* `.../api/discussions/secure/add-discussion` - add new open discussion. Requires JWT passed
as `Authorization` header (Bearer token) and a valid discussionDTO passed as a request body:

  ```json
  {
    "title": "Discussion title (subject)",
    "question": "Discussion question"
  }
  ```


* `.../api/payment/secure/payment-intent` - create payment intent via Stripe. Requires JWT passed
as `Authorization` header (Bearer token) and a valid paymentInfoDTO passed as a request body:

  ```json
  {
    "amount": 23,
    "currency": "USD",
    "receiptEmail": "userEmail@email.com"
  }
  ```


#### PUT

* `.../api/admin/secure/increase-quantity/{bookId}` - increase `copies` & `copiesAvailable` values 
of the book with `id` passed as a path variable by 1. Requires JWT passed as `Authorization` header
(Bearer token).


* `.../api/admin/secure/decrease-quantity/{bookId}` - decrease `copies` & `copiesAvailable` values
of the book with `id` passed as a path variable by 1. Requires JWT passed as `Authorization` header
(Bearer token).


* `.../api/books/secure/checkout/{bookId}` - check out the book with `id` passed as a path variable.
Requires JWT passed as `Authorization` header (Bearer token).


* `.../api/books/secure/renew-checkout/{bookId}` - renew existing checkout of a book with `id` passed as
a path variable. Requires JWT passed as `Authorization` header (Bearer token).


* `.../api/books/secure/return/{bookId}` - return the book with `id` passed as a path variable. Requires
JWT passed as `Authorization` header (Bearer token).


* `.../api/payment/secure/payment-complete` - reset user's fees pending amount to 0 after payment is
successfully complete. Requires JWT passed as `Authorization` header (Bearer token).


#### DELETE

* `.../api/admin/secure/delete-book/{bookId}` - delete the book with `id` passed as a path variable 
from database. Requires JWT passed as `Authorization` header (Bearer token).



## Additional libraries and APIs

This project is mostly typical full-stack application powered by popular developing tools. For example, 
backend application is build with **Spring Boot 3** and uses main features of Spring REST, Spring JPA, 
Spring Security etc. Frontend application is created as **Vite + React + TypeScript** project and mostly 
uses ReactJS functionality.

However, a few extra libraries / dependencies were used in both frontend and backend applications. 
Below is a brief description of those libraries.


### Back-end

#### JWT

Backend REST API application uses Spring Security in conjunction with JWT for authentication & authorization.

All logic related to generating, issuing and validating JWTs is written manually with use of:
* **[io.jsonwebtoken ---> jjwt-api](https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-api)**;
* **[io.jsonwebtoken ---> jjwt-impl](https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-impl)**;
* **[io.jsonwebtoken ---> jjwt-jackson](https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt-jackson)**

Maven dependencies are available via links above.

#### Stripe

Payment services in this project are powered with **[Stripe](https://stripe.com)**.
It is one of the biggest and most popular payment processors available with huge variety of services.

Maven dependency is available here:
**[com.stripe ---> stripe-java](https://mvnrepository.com/artifact/com.stripe/stripe-java)**.

#### Model Mapper

DTO classes are implemented in this project for each entity class that is transferred between REST API 
and frontend client via HTTP. Model Mapper simplifies conversions between entity classes and dto classes.

Maven dependency is available here: 
**[org.modelmapper ---> modelmapper](https://mvnrepository.com/artifact/org.modelmapper/modelmapper)**.

#### Project Lombok

Project Lombok is used to reduce the amount of boilerplate code throughout the project. Easy to get into and
can be included as a maven dependency while building project template with Spring Boot. 


### Front-end

#### React Router

Client side routing is powered by **[React Router](https://reactrouter.com)**.
Library allows configuration of Route components to provide easy navigation throughout the 
application web pages.

Quick start with React Router using npm: `npm install react-router-dom`. Additional info is available 
via link above.

#### Swiper

Books carousel on home page is configured using **[Swiper](https://swiperjs.com/react)**. 
Easy to use, a lot of configuration options.

Quick start with Swiper using npm: `npm install swiper`. Additional info is available via link above.

#### JWT Decode

JWTs obtained from REST API backend application contain valuable info encoded into payload, for example user's 
authorities, that allow access to some pages or functions of frontend client application. This jwt-decode npm 
package provides a number of functions useful when jwt payload info needs to be extracted and decoded.

Quick start with jwt-decode using npm: `npm install jwt-decode`. Additional info is available via link above.

#### Stripe

Payment services in this project are powered with **[Stripe](https://stripe.com)**.
It is one of the biggest and most popular payment processors available with huge variety of services.

Quick start with Stripe using npm: 
* `npm install jwt-decode`;
* `npm install @stripe/react-stripe-js`;
* `npm install @stripe/stripe-js`

Additional info is available via link above.

#### Styles

All the css styles in this project are configured using **[Tailwind CSS](https://tailwindcss.com)**.
Powerful & popular framework designed to economize tons of css code and .css files and build designs 
and layouts directly in markup code. Additional info is available via link above.