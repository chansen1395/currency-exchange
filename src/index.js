import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRate from './exchange.js';

// function clearFields() {
//   $('#exchange').val("");
//   // $('.showAPOD').text("");
//   // $('.showMarsCam').text("");
//   // $('.showDONKI').text("");
// }


$(document).ready(function () {
  // let promise = ExchangeRate.getCurrencies();
  // promise.then(function (response) {
  ExchangeRate.getCurrencies();
  (function (response) {
    const body = JSON.parse(response);
    let currCount = body.conversion_rates.length;
    let currSelect = 0;
    // console.log(i);
    console.log(body.conversion_rates.length);
    while (currCount >= 1) {
      $('#toExchange').append(`<option value="` + body.conversion_rates[currSelect] + `">${body.conversion_rates[currSelect]}</option>`);
      currCount--;
      currSelect++;
    }
  });
  // }, function (error) {
  //   $('.showErrors').text(`There was an error processing your request: ${error} Unsupported currency type: ${currencyType}`);
  // });


  $('#exchange').click(function () {
    let currencyType = $('#toExchange').val();
    let currencyAmount = $('#amount').val();
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    // try {
    //   ExchangeRate.getRate(currencyType);
    // } catch (error) {
    //   $('.showErrors').text(error);
    //   // expected output: ReferenceError: nonExistentFunction is not defined
    //   // Note - error messages will vary depending on browser
    // }

    // clearFields();

    $('.showErrors, .showRate, .showAmount').empty();
    let promise = ExchangeRate.getRate(currencyType);
    promise.then(function (response) {
      const body = JSON.parse(response);
      $(".showRate").append(`<p>Current exchange rate for $1.00 ` + body.base_code + ` is ` + formatter.format(body.conversion_rate.toFixed(2)).replace('$', '') + ` ` + body.target_code + `</p>`);
      $(".showAmount").append(`<p>Exchange rate for ${formatter.format(currencyAmount)} ` + body.base_code + ` is ` + formatter.format(body.conversion_rate.toFixed(2) * currencyAmount).replace('$', '') + ` ` + body.target_code + `</p>`);
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error} Unsupported currency type: ${currencyType}`);
    });

    // let promise1 = MarsCam.getAPOD(earth_date);
    // promise1.then(function(response) {
    //   const body = JSON.parse(response);
    //   $(".showAPOD").append(`<img src='` + body.hdurl + `'style='height:600px;'/><br>
    //   <p class="card">Explanation: ` + body.explanation + `</p>`);
    // });

    // let promise2 = MarsCam.getDONKI();
    // promise2.then(function(response) {
    //   const body = JSON.parse(response);
    //   let i = 0;
    //   if (body.length > 3) {
    //     i = body.length - 3;
    //   }
    //   while (i < body.length) {
    //     $(".showDONKI").append(`<h5>Flare Name: ` + body[i].instruments[0].displayName + `</h5>`);
    //     $(".showDONKI").append(`<li>Peak Time: ` + body[i].peakTime + `</li>`);
    //     $(".showDONKI").append(`<li>Flare Class: ` + body[i].classType + `</li>`);
    //     i++;
    //   }
    // });
  });
});
