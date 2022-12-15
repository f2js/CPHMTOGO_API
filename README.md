# CPHMTOGO API DOCUMENTATION

### Group members: 
<a href = "https://github.com/f2js/CPHMTOGO_API/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=f2js/CPHMTOGO_API"/>
</a>

Click for a link to their github: 

[@josefmarcc ](https://github.com/josefmarcc)
[@fdinsen](https://github.com/fdinsen)
[@sebastianbentley ](https://github.com/SebastianBentley)
[@dahlfrederik ](https://github.com/dahlfrederik)

## Info
This repository functions as the backend server for the based on a monolithic architecture. 
This is the starting point of the application (our "legacy code") and we will integrate different services to this base application to make if follow a loosely coupled service oriented architecture. 

## **BASKET ENDPOINT**

**GET /basket/:username**

Retrieves the basket for the specified username.

**Parameters:**

- **username** : The username of the user whose basket should be retrieved.

**Response:**

- **200 OK** : The basket was successfully retrieved. The response body contains the basket data in JSON format.
- **404 Not Found** : No basket was found for the specified username.
- **400 Bad Request** : The **username** parameter is missing.
- **500 Internal Server Error** : An error occurred while retrieving the basket.

**POST /basket/**

Adds an item to the basket.

**Request body:**

- **restaurant** : The restaurant from which the item was ordered.
- **items** : The items to be added to the basket.
- **user** : The user who is adding the items to the basket.

**Response:**

- **200 OK** : The item was successfully added to the basket. The response body contains the updated basket data in JSON format.
- **400 Bad Request** : The request body is missing or invalid.
- **500 Internal Server Error** : An error occurred while adding the item to the basket.

**POST /basket/toorder**

Converts the basket to an order.

**Request body:**

- **user** : The user whose basket should be converted to an order.

**Response:**

- **200 OK** : The basket was successfully converted to an order. The response body contains the created order data in JSON format.
- **404 Not Found** : No basket was found for the specified user.
- **500 Internal Server Error** : An error occurred while converting the basket to an order.

## **MENU ENDPOINT**

**GET /menu/:id**

Retrieves the menu for the restaurant with the specified ID.

**Parameters:**

- **id** : The ID of the restaurant whose menu should be retrieved.

**Response:**

- **200 OK** : The menu was successfully retrieved. The response body contains the menu data in JSON format.
- **404 Not Found** : No restaurant was found with the specified ID.
- **500 Internal Server Error** : An error occurred while retrieving the menu.

## **ORDER ENDPOINT**

## GET /menu/:id

This endpoint retrieves the menu for the restaurant with the specified ID.

### Parameters

- **id** : The ID of the restaurant whose menu should be retrieved. This parameter is included in the URL path.

### Response

If the request is successful, this endpoint returns a JSON object with the following properties:

- **menu** : A JSON object containing the menu data for the restaurant with the specified ID.

### Errors

If no restaurant was found with the specified ID, this endpoint returns a **404 Not Found** error.

If there was an error retrieving the menu, this endpoint returns a **500 Internal Server Error**.

## **RESTAURANT ENDPOINT**

## GET /restaurants

This endpoint retrieves all restaurants.

### Return Value

If the request is successful, this endpoint returns a JSON object with the following properties:

- **restaurants** : An array of JSON objects representing the retrieved restaurants. Each object has the following properties:
  - **name** : The name of the restaurant.
  - **rating** : The rating of the restaurant.
  - **openHours** : The hours during which the restaurant is open.
  - **minDeliveryPrice** : The minimum delivery price for the restaurant.
  - **location** : A JSON object representing the location of the restaurant, with the following properties:
    - **city** : The city where the restaurant is located.
    - **street** : The street where the restaurant is located.
    - **houseNumber** : The house number where the restaurant is located.
    - **latitude** : The latitude of the restaurant's location.
    - **longitude** : The longitude of the restaurant's location.
  - **menu** : A JSON object representing the menu for the restaurant, with the following properties:
    - **id** : The ID of the menu item.
    - **name** : The name of the menu item.
    - **price** : The price of the menu item.
  - **tags** : An array of strings representing the tags for the restaurant.

### Errors

If there is an error retrieving the restaurants, this endpoint returns a **500 Internal Server Error**.

## GET /restaurants/:id

This endpoint retrieves the restaurant with the specified ID.

### Parameters

- **id** : The ID of the restaurant to be retrieved. This parameter is included in the URL path.

### Return Value

If the request is successful, this endpoint returns a JSON object with the following properties:

- **restaurant** : A JSON object representing the retrieved restaurant, with the same properties as the objects in the **restaurants** array for the **GET /restaurants** endpoint.

### Errors

If no restaurant was found with the specified ID, this endpoint returns a **404 Not Found** error.

If there is an error retrieving the restaurant, this endpoint returns a **500 Internal Server Error**.

## GET /restaurants/tag/:tag

This endpoint retrieves all restaurants with the specified tag.

### Parameters

- **tag** : The tag to be used to filter the retrieved restaurants. This parameter is included in the URL path.

### Return Value

If the request is successful, this endpoint returns a JSON object with the following properties:

- **restaurants** : An array of JSON objects representing the retrieved restaurants, with the same properties as the objects in the **restaurants** array for the **GET /restaurants** endpoint.

### Errors

If there is an error retrieving the restaurants, this endpoint returns a **500 Internal Server Error**.

## GET /restaurants/location/:city

This endpoint retrieves all restaurants in the specified city.

### Parameters

- **city** : The city to be used to filter the retrieved restaurants. This parameter is included in the URL path.

### Return Value

If the request is successful, this endpoint returns a JSON object with the following

## **USER ENDPOINT**

## POST /users/signup

This endpoint allows a user to sign up for an account.

### Request Body

The request body should be a JSON object with the following properties:

- **name** : The name of the user.
- **username** : The username for the user's account.
- **email** : The email address for the user's account.
- **password** : The password for the user's account.

### Return Value

If the request is successful, this endpoint returns a JSON object with the following properties:

- **message** : A string indicating that the user was successfully created.
- **id** : The ID of the newly created user.

### Errors

If the request is missing any of the required properties, this endpoint returns a **400 Bad Request** error with a **message** property indicating which properties are missing.

If the provided email address is invalid, this endpoint returns a **400 Bad Request** error with a **message** property indicating that the email address is invalid.

If the provided username is already taken, this endpoint returns a **400 Bad Request** error with a **message** property indicating that the username is already taken.

If there is an error creating the user, this endpoint returns a **500 Internal Server Error** error.

## POST /users/login

This endpoint allows a user to log in to their account.

### Request Body

The request body should be a JSON object with the following properties:

- **username** : The username for the user's account.
- **password** : The password for the user's account.

### Return Value

If the request is successful, this endpoint returns a JSON object with the following properties:

- **message** : A string indicating that the login was successful.

In addition, a **auth-token** header is included in the response, containing a JSON Web Token (JWT) for the authenticated user. This token can be used to authenticate subsequent requests.

### Errors

If the request is missing any of the required properties, this endpoint returns a **400 Bad Request** error with a **message** property indicating which properties are missing.

If no user was found with the provided username, this endpoint returns a **400 Bad Request** error with a **message** property indicating that the user was not found.

If the provided password is incorrect, this endpoint returns a **400 Bad Request** error with a **message** property indicating that the password is invalid.

If there is an error logging in, this endpoint returns a **500 Internal Server Error** error.

## GET /users/

This endpoint allows an administrator to retrieve all users in the system.

### Request Headers

This endpoint requires the following request headers:

- **Authorization** : A valid JWT for an authenticated user with **admin** role.

### Return Value

If the request is successful, this endpoint returns a JSON object with the following properties:

- **users** : An array of JSON objects representing the retrieved users. Each object has the following properties:
