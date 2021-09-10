# (Currency Exchange Calculator)

#### (This program takes in two currency codes and an amount of currency to calculate the exchange rate between two currencies.)

#### By (Connor Hansen)

## Technologies Used

* JavaScript
* Node Package Manager
* JQuery
* CSS
* HTML
* ExchangeRate-API

## Description

_This application has been created to demonstrate making API calls from user inputs and displaying results to HTML._

* Use the parameters to calculate the amount one currency equals in another.
* 5 US Dollars will equal 31.45 Danish Krone.
  - Current exchange rate for $1.00 USD is: 6.29 DKK
  - Exchange rate for $5.00 USD is: 31.45 DKK
* 10 Euros will equal 11.86 US Dollars.
  - Current exchange rate for $1.00 EUR is: 1.19 USD
  - Exchange rate for $10.00 EUR is: 11.86 USD
* 10 Euros will equal 74.60 Danish Krone.
  - Current exchange rate for $1.00 EUR is: 7.46 DKK
  - Exchange rate for $10.00 EUR is: 74.60 DKK

## Setup/Installation Requirements
- _To get your API Key, sign up for [ExchangeRate-API](https://www.exchangerate-api.com/)_
- _To clone and run from [GitHub Repo](https://github.com/chansen1395/currency-exchange):_

- _Use a program such as VSCode to view and run the program._
  - _In bash at a folder of your choice, type the following:_
    - $ git clone https://github.com/chansen1395/currency-exchange
    - $ code .
    - $ npm install
  - _Once your environment has been set up, create a .env file in the project's root directory:_
    - $ touch .env
  - _In the .env file, enter the following, but replace {YOUR-KEY-HERE} with your API key:_
    - API_KEY={YOUR-KEY-HERE}
  - _Once this has been completed, run the program by typing this in the console:_
    - $ npm run start

## Known Bugs

* _If the current and target currency are the same, the conversion will take place and be equal. Not necessarily a bug, but implementation with error handling could be smoother._
* _If no amount is entered to exchange, the current exchange rate will be empty, but the API throws an error instead of displaying "0" for the calculated exchange rates._
* _If an error is thrown, the error message displays. However, due to current implementation, the error-box will be empty but still visible when the user submits correct input on subsequent entries._

## License

{Let me know if you run into any issues or have questions, ideas or concerns. I encourage you to contact me or make a contribution to the code.}

## Contact Information

- _{<chansen13@georgefox.edu>}_
- _{[GitHub Repo - main](https://github.com/chansen1395/currency-exchange)}_