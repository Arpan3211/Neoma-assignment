
# E-commerce store Api

The project is a backend project which is build in Node.js, Express and mongoDB , in which api's is create for e-commerce store which can use to [ access, update, delete, create] products and also have a features like search and filter products.


## API Reference


#### Get all products
Retrieve all available products.
```http
  GET /api/products
```
#### Create a new product
Add a new product in the collection.
```http
  POST /api/products
```
#### Update a product
Update an existing product using its  (ID).
```http
  PUT /api/products/:id
```
#### Update product rating by ID
Update the rating of a specific product by its ID.
```http
  PUT /api/products/:id/rating
```
#### Delete a product
Remove a product from the collection using its ID.
```http
  DELETE /api/products/:id
```
### Get products by search and filter 
## Search
End point for search the products by name 
```http
  GET /api/products/search
```
#### EX:- GET /api/products/search?name=iPhone
| Key | Example Value  | Type                |
| :-------- | :------- | :------------------------- |
| `name` | `iPhone` | `string` |


## Filter
```http
  GET /api/products/filter
```
#### EX:- GET /api/products/filter?category=smartphones&minPrice=200&maxPrice=500

| Key | Example Value   | Type                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `smartphones` | `string` |
| `minPrice`      | `200` | `Number` |
| `maxPrice`      | `500` | `Number` |




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

`MONGODB_URI`="mongodb+srv://Arpan:<password>@cluster0.91mtru0.mongodb.net/database"
`CLOUDINARY_CLOUD_NAME`="----------"
`CLOUDINARY_API_KEY`="1234567890"
`CLOUDINARY_API_SECRET`="cloudinary secret key"