# Kofile Challenge

**Summary**

  There are 3 parts to this repository which corresponds to 3 parts of Kofile's coding challenge. You can read about the 3 parts at [Kofile Challenge](https://gist.github.com/ericve25/4058b6625fc0976700b88bd0135eb060#file-fees-json). I will breafly go over part 1 and part 2 since they were the trivial parts of this challenge. Part 3 was to me the important part of the challenge. This is because part 3 uses solutions from part 1 and part 2. Part 3 use of part 1 and part 2 shows how I would refactor what is in my opinion not the best code from part 1 and part 2. I wanted to leave these first 2 parts the way they are so I could show my ability to refactor code. Talking to Eric it sounded that refactoring code is something the team is working on. 
  
**Set up**

  1. Clone Repository
  2. `cd KofileAPI`
  3. `npm install`
  4. run command for each part to view output
  
# Part 1: Fees
Files:

1. data/fees.json
2. data/orders.json
3. lib/scripts/challenges/part_one.js
4. package.json

**solution**
This challenge was pretty straight forward. 

  1. Read orders from a json file and parse the information to access the data for each order to be processed.
  2. Read a fees json file and parse information to access correct fees data for current order item types.
  3. Save the information in an object that containes the information to be printed later. 
  ```
  { 
    "order_id": order.order_number,
    "items_type_price": [],
    "order_total": 0
  }
  ```
  4. Save each one of these object to an array to be printed in the correct format.
  5. After processing each order and saving output object to an array. Print the data in the correct format.
  
**Run code**

In the package.json file I created a script part_one to execute the correct file.

$ `npm run part_one`

Output:

<img width="637" alt="screen shot 2017-01-07 at 2 17 39 pm" src="https://cloud.githubusercontent.com/assets/4467931/21745623/9dad60b2-d4e4-11e6-8c28-28c24edd558e.png">

# Part 2: Distributions
Files:

1. data/fees.json
2. data/orders.json
3. lib/scripts/challenges/part_two.js
4. package.json

**solution**
This challenge was pretty straight forward. 

  1. Read orders from a json file and parse the information to access the data for each order to be processed.
  2. Read a fees json file and parse information to access correct fees and distribution data for order and item type.
  3. Get the total price with the fees data the same way we got it for part 1(function should be extra and re-used).
  4. Use destribution data and total price of an item to calculate the amount of money going into each fund and into
  the 'other' fund.
  5. Since we don't want to have duplicate fund names in a single order we have to check if our array of fundistributions 
  contains a name with the current fund. If it does we add the amounts if not we create a new object in the array. (this 
  implementation is refactored in part 3).
  ```
  {
    "order_id": order.order_number,
    "funds_info": [],
  }
  ```
  ```
  funds_info: [
    {
      "name": "Recording Fee",
      "amount": 10
    },
    {
      "name": "Other",
      "amount": 1.01
    }
  ]
  ```
  6. Since, an item can have multiple pages we can have an amount left after money is distributed into all the given funds. 
  Add the amount left to a fund called 'Other'.
  7. I created two methods, one that updatesOrderFunds that are not 'Other' and one that updatesOtherOrderFunds when we have 
  and amount left over(these methods are combined into a more flexible method in part 3).
  8. We also want to keep the total distribution for all funds. I created an object to keep the total distribution. This is 
  calculated at the same time as we go through all the funds/orders so we don't have to iterate again and add all the funds.
  9. After processing each order and saving output object to an array. Print the data in the correct format.
  
**Run code**

In the package.json file I created a script part_one to execute the correct file.

$ `npm run part_two`

Output:

<img width="639" alt="screen shot 2017-01-07 at 2 46 43 pm" src="https://cloud.githubusercontent.com/assets/4467931/21745785/2ba08342-d4e8-11e6-987a-33f56995ca29.png">


**Note**
I want to re-iterate that part 1 and part 2 code is not the best and I refactored the solutions in part 3 to show the actual quality of code I like to write.

# Part 3: API

**Tech-Stack:**

 1. npm to manage my dependecies
 2. express to create my server
 3. mocha/supertests for testing API
 4. javascript
 
**File Structure**
```
  root
    data
      fees.json
      orders.json
    lib
      scripts
        challenges
          part_one.js
          part_two.js
    routes
      index.js
      orders
        funds_distribution.js
        index.js
        prices.js
        services
          ordersFeesProcessor.js
          ordersFundsDistributionProcessor.js
          utils
            fundOrdersTypeData.js
            itemTotalPrice.js
    tests
      orders.js
  app.js
  package.json
  README.md
```

Directories:
- data: holds the data json files.
- lib: contains our scripts directory.
- scripts: contains all the scripts we can run in their respective directories.
- routes: contains directories of all our specific routes and an index.js file to combine and export our routes
- orders: contains routes for order requests and index.js to combine and export our routes and services directory 
- services:  contains different service objects our routes apis use and utils directory
- utils: contains functions that are re-usable in our service objects
- tests: contains all our tests

files: 
- app.js: file that runs our server to test and use our API
- package.json: manages our dependecies

**Description**
This api contains 2 end-points, ```/orders/prices``` and ```orders/funds_distribution```. These are both post requests that take data in json format in the body of the request. I added body-parser middleware to my express server to help with parsing the request body. 

# orders/prices Endpoint: 

Files
routes/orders/prices.js
routes/orders/services/orderFeesProcessor.js
routes/orders/services/utils/itemTotalPrice.js
routes/orders/services/utils/findOrderTypeData.js

```
  module.exports = (req, res) => {
    const data = ordersFeesProcessor(req.body);
    res.status(200).json({ data });
  };
```

  1. Takes a post request containing json data in the body. 
  2. Pass the data to service ordersFeesProcessor.
  3. This processor parses the given data and returns a json object containing the prices for each order. A lot of the code written in part 1 was re-used for this. I extracted the function itemTotalPrice since it's used in multiple files. Also, extracted findOrderTypeData function that is being used in multiple places. An array of objects is returned.
  ```
  [
    { 
      "order_id": "20150111000001",
      "items_type_price": [],
      "order_total": 0
    }
  ]
  ```
  4. If no errors accurs, return status: 200 and data: prices.
  
Example Data Response:
```
  {
  "data": [
    {
      "order_id": "20150111000001",
      "items_type_price": [
        {
          "type": "Real Property Recording",
          "price": 28
        },
        {
          "type": "Real Property Recording",
          "price": 26
        }
      ],
      "order_total": 54
    },
    {
      "order_id": "20150117000001",
      "items_type_price": [
        {
          "type": "Real Property Recording",
          "price": 27
        },
        {
          "type": "Real Property Recording",
          "price": 45
        }
      ],
      "order_total": 72
    },
    {
      "order_id": "20150118000001",
      "items_type_price": [
        {
          "type": "Real Property Recording",
          "price": 30
        },
        {
          "type": "Birth Certificate",
          "price": 23
        }
      ],
      "order_total": 53
    },
    {
      "order_id": "20150123000001",
      "items_type_price": [
        {
          "type": "Birth Certificate",
          "price": 23
        },
        {
          "type": "Birth Certificate",
          "price": 23
        }
      ],
      "order_total": 46
    }
  ]
}
```
  
**Tests**
Automation:
- Tested that the end-point existed in the test/orders.js file.
Manual: 
I use Postman to make post request with data in body and test my api output.

# /prices/funds_distribution Endpoint: 

Files
routes/orders/funds_distribution.js
routes/orders/services/orderFundsDistributionProcessor.js
routes/orders/services/utils/itemTotalPrice.js
routes/orders/services/utils/findOrderTypeData.js

```
  module.exports = (req, res) => {
    const data = ordersFundsDistributionProcessor(req.body);
    res.status(200).json({ data });
  };
```

  1. Takes a post request containing json data in the body. 
  2. Pass the data to service ordersFundsDistributionProcessor.
  3. This processor parses the given data and returns a json object containing the total funds distributions of each order and all orders combined. I re-used code form part 2 of the challenge to calculate distributions. I use the refactored itemTotalPrice and findOrderTypeData functions in this file. I also combined updateOrderFunds and updateOtherFundAmount functions into a more flexible updateFunds function. I updated some of the varible naming to get remove unnecessary words. The biggest refactor was instead of having an array of objects:
  ```
  [
    {
      "name": "Recording Fee",
      "amount": 10
    }
  ]
  ```
 I instead have the name be the key and the amount be the value. This made the code faster since I didn't have to iterate the array to find the object with the correct name. I just had to look if the key existed in the given object. 
 ```
 {
    "Recording Fee": 10,
 }
 ```
  4. If no errors accur, return status: 200 and data: distribution are returned in the response of the request.
  
Example Data Response:
```
{
  "data": {
    "orders_distribution": [
      {
        "order_id": "20150111000001",
        "funds_distribution": {
          "Recording Fee": 10,
          "Records Management and Preservation Fee": 20,
          "Records Archive Fee": 20,
          "Courthouse Security": 2,
          "other": 2
        }
      },
      {
        "order_id": "20150117000001",
        "funds_distribution": {
          "Recording Fee": 10,
          "Records Management and Preservation Fee": 20,
          "Records Archive Fee": 20,
          "Courthouse Security": 2,
          "other": 20
        }
      },
      {
        "order_id": "20150118000001",
        "funds_distribution": {
          "Recording Fee": 5,
          "Records Management and Preservation Fee": 10,
          "Records Archive Fee": 10,
          "Courthouse Security": 1,
          "other": 5,
          "County Clerk Fee": 20,
          "Vital Statistics Fee": 1,
          "Vital Statistics Preservation Fee": 1
        }
      },
      {
        "order_id": "20150123000001",
        "funds_distribution": {
          "County Clerk Fee": 40,
          "Vital Statistics Fee": 2,
          "Vital Statistics Preservation Fee": 2,
          "other": 2
        }
      }
    ],
    "total_distribution": {
      "Recording Fee": 25,
      "Records Management and Preservation Fee": 50,
      "Records Archive Fee": 50,
      "Courthouse Security": 5,
      "other": 29,
      "County Clerk Fee": 60,
      "Vital Statistics Fee": 3,
      "Vital Statistics Preservation Fee": 3
    }
  }
}
```
 
 
**Tests**
Automation:
- Tested that the end-point existed in the test/orders.js file.
Manual: 
I use Postman to make post request with data in body and test my api output.


# Error-Handling

I added middleware to my express server to return a status: 404 and 'We encountered a problem and are looking into it!' if an error accurs.

```
  app.use(function (err, req, res, next) {
    res.status(404).send('We encountered a problem and are looking into it!')
  });
```
# test api

1. Start server with: $```npm start```
2. Use Postman to make POST request to ```localhost:4000/orders/funds_distribution``` and ```localhost:4000/orders/prices``` with correct request in body(look at data/orders.json file for format to pass in body)

# Unfinished

This are some of the things I would have liked to add.

  1. Integration tests for service objests.
  2. Unit tests for utils
  3. More API tests
  4. Better error handling and information.
  

# Summary

I didn't add everything I wanted to add but i'm satisfied for it being a challenge solution. I would also like to add that this is my first creating a Node.js api. I usually write my apis in Ruby on Rails but I wanted to do it in Node.js because this shows my greatest strength as a developer. I have been programming since I was 16(10+ years). I love what I do, so I have spent time learning why languages/frameworks work the way they work. Learning how the internet works from the time you type something into the url to when it loads the webpage. This allows me to learn new technologies extremely fast and with little to no help. I don't just know how to use a given technology. I know how and why it works. 

I would love to discuss my code and answer any questions you may have. 


