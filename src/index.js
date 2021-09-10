import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRate from './exchange.js';

function clearFields() {
  $('#exchange').val("");
  // $('.showAPOD').text("");
  // $('.showMarsCam').text("");
  // $('.showDONKI').text("");
}

$(document).ready(function() {
  $('#exchange').click(function() {
    let currencyType = $('#toExchange').val();
    let currencyAmount = $('#amount').val();
    clearFields();
    $('.showErrors').empty();
    
    let promise = ExchangeRate.getRate(currencyType);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $(".showRate").append(`<p>Current exchange rate for 1 ` + body.base_code + ` is ` + body.conversion_rate.toFixed(2) + ` ` + body.target_code + `</p>`);
      $(".showAmount").append(`<p>Exchange rate for ${currencyAmount} ` + body.base_code + ` is ` + (body.conversion_rate.toFixed(2) * currencyAmount) + ` ` + body.target_code + `</p>`);
    }, function(error) {
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
