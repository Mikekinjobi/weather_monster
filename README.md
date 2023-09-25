# Weather_Monster

# Setting up the project
- run yarn 

- run yarn build -to compile the src into a dist folder

- create a .env file using the '.env_example' blue-print file in the root folder

# Running the test
- run yarn test 

- note that you should post at least one city and temperature before running the test because the forecasts endpoint requires it  

# Running the app
- run yarn start - to connect the database and run the server

# endpoints 
- /cities - to POST a city - required fields {name: string, latitude: float, longitude: float}

- /cities/:id - to GET, PATCH or DELETE a city - id is a number 

- /temperatures - to POST a city's temperature - required fields { city_id: number, max: number, min: number }

- /forecasts/:id - to get the forecast for a city - id is a number

- /webhooks - to POST a webhook - required fields {city_id: number, callback_url:string} callback url should be a valid endpoint

- /webhooks/:id - to DELETE a webhook - id is a number