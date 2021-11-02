# Node DB1 Project Starter Code

## Introduction

- Relational Databases
- Writing Basic SQL Queries
- Writing Basic Queries using Knex.js

## Instructions

### Task 1: Project Setup and Submission

Your assignment page on Canvas should contain instructions for submitting this project. If you are still unsure, reach out to School Staff.

### Task 2: Minimum Viable Product

### 2.1 Write Basic SQL Queries

Visit [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/trysql.asp?filename=trysql_select_all) using Chrome and build the queries below. Once they work copy them to the `queries.sql` file at the root of the project.

- Find all customers with postal code 1010. Returns 3 records.
SELECT * FROM Customers where postalCode = 1010;
CustomerID	CustomerName	ContactName	Address	City	PostalCode	Country
12	Cactus Comidas para llevar	Patricio Simpson	Cerrito 333	Buenos Aires	1010	Argentina
54	Océano Atlántico Ltda.	Yvonne Moncada	Ing. Gustavo Moncada 8585 Piso 20-A	Buenos Aires	1010	Argentina
64	Rancho grande	Sergio Gutiérrez	Av. del Libertador 900	Buenos Aires	1010	Argentina

- Find the phone number for the supplier with the id 11. Should be (010) 9984510.
SELECT Phone FROM Suppliers where SupplierID = 11;
Phone
(010) 9984510

- List first 10 orders placed, sorted descending by the order date. The order with date 1997-02-12 should be at the top.
SELECT * FROM Orders
order by OrderDate DESC
limit 10;
OrderID	CustomerID	EmployeeID	OrderDate	ShipperID
10443	66	8	1997-02-12	1
10442	20	3	1997-02-11	2
10440	71	4	1997-02-10	2
10441	55	3	1997-02-10	2
10439	51	6	1997-02-07	3
10438	79	3	1997-02-06	2
10436	7	3	1997-02-05	2
10437	87	8	1997-02-05	1
10435	16	8	1997-02-04	2
10433	60	3	1997-02-03	3

- Find all customers that live in London, Madrid, or Brazil. Returns 18 records.
SELECT * FROM Customers
WHERE City = 'London' 
OR city = 'Madrid'
OR Country = 'Brazil';
Number of Records: 18
CustomerID	CustomerName	ContactName	Address	City	PostalCode	Country
4	Around the Horn	Thomas Hardy	120 Hanover Sq.	London	WA1 1DP	UK
8	Bólido Comidas preparadas	Martín Sommer	C/ Araquil, 67	Madrid	28023	Spain
11	B's Beverages	Victoria Ashworth	Fauntleroy Circus	London	EC2 5NT	UK
15	Comércio Mineiro	Pedro Afonso	Av. dos Lusíadas, 23	São Paulo	05432-043	Brazil
16	Consolidated Holdings	Elizabeth Brown	Berkeley Gardens 12 Brewery	London	WX1 6LT	UK
19	Eastern Connection	Ann Devon	35 King George	London	WX3 6FW	UK
21	Familia Arquibaldo	Aria Cruz	Rua Orós, 92	São Paulo	05442-030	Brazil
22	FISSA Fabrica Inter. Salchichas S.A.	Diego Roel	C/ Moralzarzal, 86	Madrid	28034	Spain
31	Gourmet Lanchonetes	André Fonseca	Av. Brasil, 442	Campinas	04876-786	Brazil
34	Hanari Carnes	Mario Pontes	Rua do Paço, 67	Rio de Janeiro	05454-876	Brazil
53	North/South	Simon Crowther	South House 300 Queensbridge	London	SW7 1RZ	UK
61	Que Delícia	Bernardo Batista	Rua da Panificadora, 12	Rio de Janeiro	02389-673	Brazil
62	Queen Cozinha	Lúcia Carvalho	Alameda dos Canàrios, 891	São Paulo	05487-020	Brazil
67	Ricardo Adocicados	Janete Limeira	Av. Copacabana, 267	Rio de Janeiro	02389-890	Brazil
69	Romero y tomillo	Alejandra Camino	Gran Vía, 1	Madrid	28001	Spain
72	Seven Seas Imports	Hari Kumar	90 Wadhurst Rd.	London	OX15 4NB	UK
81	Tradição Hipermercados	Anabela Domingues	Av. Inês de Castro, 414	São Paulo	05634-030	Brazil
88	Wellington Importadora	Paula Parente	Rua do Mercado, 12	Resende	08737-363	Brazil


- Add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.
INSERT into Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ("The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "Bag End", "111","Middle Earth");
Result:
You have made changes to the database. Rows affected: 1
SELECT * FROM Customers
WHERE city = "Bag End";
Number of Records: 1
CustomerID	CustomerName	ContactName	Address	City	PostalCode	Country
92	The Shire	Bilbo Baggins	1 Hobbit-Hole	Bag End	111	Middle Earth

- Update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.
UPDATE Customers
SET PostalCode = "11122"
WHERE ContactName = "Bilbo Baggins";
Result:
You have made changes to the database. Rows affected: 1
SELECT * FROM Customers
WHERE ContactName = "Bilbo Baggins";
Result:
Number of Records: 1
CustomerID	CustomerName	ContactName	Address	City	PostalCode	Country
92	The Shire	Bilbo Baggins	1 Hobbit-Hole	Bag End	11122	Middle Earth


**Clicking the `Restore Database` button in the page will repopulate the database with the original data and discard all changes you have made**.

### 2.2 Build a RESTful API for the Accounts Resource

We have provided some records inside the "accounts" table of the `budget.db3` database. You can restore the database (even after deleting the database) by running the following command:

```js
npm run resetdb
```

#### Accounts Schema

| field  | data type        | metadata                                            |
| ------ | ---------------- | --------------------------------------------------- |
| id     | unsigned integer | primary key, auto-increments, generated by database |
| name   | string           | required, unique                                    |
| budget | numeric          | required                                            |

#### Write Model Functions

- Write the following db access functions inside `api/accounts/accounts-model.js` using Knex:

  - `getAll` resolves to an array of accounts (or an empty array)
  - `getById` resolves to an account by the given id
  - `create` resolves to the newly created account
  - `updateById` resolves to the updated account
  - `deleteById` resolves to the deleted account

- Here is a cheatsheet for working with SQLite with Knex:

```js
db('foo-table') // returns a promise that resolves to an **array** with all records in the table
db('foo-table').where({ role: 'Student', active: true }) // resolves to an **array** of all records that satisfy the where
db('foo-table').where('name', 'Mary') // is an alternative for when there is just one where condition
db('foo-table').where('id', 7).first() // will resolve to the **record** we want (if the id is unique for a table) or undefined
db('foo-table').insert({ bar: 'baz' }) // resolves to an **array** containing the **ids of the records** inserted into the table
db('foo-table').where('id', id).update({ bar: 'new bar' }) // resolves to the **number of records** affected by the update
db('foo-table').where('id', id).delete() // resolves to the **number of records** affected by the delete
```

#### Write Middleware

- Write the following middlewares inside `api/accounts/accounts-middleware.js`:

  - `checkAccountPayload` returns a status 400 with if `req.body` is invalid:

    - If either name or budget are undefined, return `{ message: "name and budget are required" }`
    - If name is not a string, return `{ message: "name of account must be a string" }`
    - If the _trimmed_ name is shorter than 3 or longer than 100, return `{ message: "name of account must be between 3 and 100" }`
    - If budget is not a number, return `{ message: "budget of account must be a number" }`
    - If budget is a negative number or over one million, return  `{ message: "budget of account is too large or too small" }`

  - `checkAccountId` returns a status 404 with a `{ message: "account not found" }` if `req.params.id` does not exist in the database

  - `checkAccountNameUnique` returns a status 400 with a `{ message: "that name is taken" }` if the _trimmed_ `req.body.name` already exists in the database

### Write Accounts API

- Write CRUD for the `accounts` resource, using the middlewares and model functions above wherever appropriate:

  - `[GET] /api/accounts` returns an array of accounts (or an empty array if there aren't any).
  - `[GET] /api/accounts/:id` returns an account by the given id.
  - `[POST] /api/accounts` returns the created account. Leading or trailing whitespace on budget `name` should be trimmed before saving to db.
  - `[PUT] /api/accounts/:id` returns the updated account. Leading or trailing whitespace on budget `name` should be trimmed before saving to db.
  - `[DELETE] /api/accounts/:id` returns the deleted account.

- Manually test your endpoints with a REST client like `Insomnia` or `Postman` to check they are working as expected.
- Test your endpoints automatically by running `npm test`.

#### Important Notes

- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install additional libraries or add additional scripts.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work.
- Perform basic professional polishing including spell-checking and grammar-checking on your work.

### Task 3: Stretch Problems

The following exercises **require research**, the concepts needed to complete them have not been covered in class yet.

- Run more queries.

  - Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted. Should be 69.
  - Find all suppliers who have names longer than 20 characters. Returns 11 records.
  - Add a `query string` option to the `GET /api/accounts` endpoint. The `query string` may contain `limit`, `sortby` and `sortdir` keys. If these keys are provided, use these values to limit and sort the `accounts` which are selected from the database. Reference the docs for sorting and limiting in [knexjs.org](http://knexjs.org/).

  ```js
  // sample req.query object
  {
    limit: 5,
    sortby: 'id',
    sortdir: 'desc'
  }
  ```
