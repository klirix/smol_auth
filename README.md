# Smol auth microservice

It's so smol it doesn't use DB, and keeps all data in-memory.
It essentially means that if service to be restarted, everybody who tries to enter will be invalidated, but well, it's almost pure.

It uses mailgun email service, therefore the API key is required.

# Configuration

### Environment variables

MAILGUN_KEY - API key for Mailgun (required)

MAILGUN_DOMAIN - Domain name for Mailgun (required)

JWT_SECRET - Secret to sign the tokens with (default: ```"hahaha privacy yeah hight :-D BENIS"```)

BASE_HOST - base for the url, used for email link (default: ```"http://localhost:3000"```)

# Usage

To spin up dev verison use `yarn dev`/`npm run dev`
To spin up prod verison use `yarn start`/`npm start`

# Endpoints

GET ```/enter/:email``` - requests an entery and returns a reference to entry session

GET ```/check/:ref``` - checks if entry session is validated, if so, returns a signed jwt, otherwise ```"Not yet"```, or ```"Wrong code"``` if ref is invalid

GET ```/confirm/:code``` - validates entry session and returns ```"Good"``` otherwise ```"Yeah right fuck off"``` if code is invalid

That's it