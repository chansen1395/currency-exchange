import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRate from './exchange.js';

$(document).ready(function () {

  // **************************************************
  // Generate dropdown of all currencies to exchange to
  // **************************************************
  let promise = ExchangeRate.getCurrencies();
  promise.then(function (response) {
    const body = JSON.parse(response);
    var currList = Object.keys(body.conversion_rates);
    for (var i in currList) {
      $('#exchangeFrom').append(`<option value="` + currList[i] + `">${currList[i]}</option>`);
      $('#exchangeTo').append(`<option value="` + currList[i] + `">${currList[i]}</option>`);
    }
  }, function (error) {
    $('.showErrors').text(`There was an error processing your request: ${error}`);
  });

  // *********************************************
  // Use API calls to generate output for the user
  // *********************************************
  $('#exchange').click(function () {
    $('.showErrors, .showRate, .showAmount').empty();
    $('#results').show();
    let currencyFrom = $('#exchangeFrom').val();
    let currencyTo = $('#exchangeTo').val();
    let currencyAmount = $('#amount').val();

    // Formatter to convert output to xx,xxx.xx
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    // Formatted output to user
    let promise = ExchangeRate.getRate(currencyFrom, currencyTo, currencyAmount);
    promise.then(function (response) {
      const body = JSON.parse(response);
      try {
        $(".showRate").append(`<p>Current exchange rate for $1.00 ` + body.base_code + ` is ` + formatter.format(body.conversion_rate.toFixed(2)).replace('$', '') + ` ` + body.target_code + `</p>`);
        $(".showAmount").append(`<p>Exchange rate for ${formatter.format(currencyAmount)} ` + body.base_code + ` is ` + formatter.format(body.conversion_result.toFixed(2)).replace('$', '') + ` ` + body.target_code + `</p>`);
      } catch (error) {
        $(".showErrors").text(`Error: Please input a number to convert. ${error.message}`);
      }
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error} Unsupported currency type: ${currencyTo}`);
    });
  });
});
