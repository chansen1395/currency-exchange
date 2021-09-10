import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRate from './exchange.js';

$(document).ready(function () {

  // **************************************************
  // Generate dropdown of all currencies to exchange to
  // **************************************************
  const conversionReference = ['AED - United Arab Emirates Dirham', 'AFN - Afghanistan Afghani', 'ALL - Albania Lek', 'AMD - Armenia Dram', 'ANG - Netherlands Antilles Guilder', 'AOA - Angola Kwanza', 'ARS - Argentina Peso', 'AUD - Australia Dollar', 'AWG - Aruba Guilder', 'AZN - Azerbaijan Manat', 'BAM - Bosnia and Herzegovina Convertible Mark', 'BBD - Barbados Dollar', 'BDT - Bangladesh Taka', 'BGN - Bulgaria Lev', 'BHD - Bahrain Dinar', 'BIF - Burundi Franc', 'BMD - Bermuda Dollar', 'BND - Brunei Darussalam Dollar', 'BOB - Bolivia Bolíviano', 'BRL - Brazil Real', 'BSD - Bahamas Dollar', 'BTN - Bhutan Ngultrum', 'BWP - Botswana Pula', 'BYN - Belarus Ruble', 'BZD - Belize Dollar', 'CAD - Canada Dollar', 'CDF - Congo/Kinshasa Franc', 'CHF - Switzerland Franc', 'CLP - Chile Peso', 'CNY - China Yuan Renminbi', 'COP - Colombia Peso', 'CRC - Costa Rica Colon', 'CUC - Cuba Convertible Peso', 'CUP - Cuba Peso', 'CVE - Cape Verde Escudo', 'CZK - Czech Republic Koruna', 'DJF - Djibouti Franc', 'DKK - Denmark Krone', 'DOP - Dominican Republic Peso', 'DZD - Algeria Dinar', 'EGP - Egypt Pound', 'ERN - Eritrea Nakfa', 'ETB - Ethiopia Birr', 'EUR - Euro Member Countries', 'FJD - Fiji Dollar', 'FKP - Falkland Islands (Malvinas) Pound', 'GBP - United Kingdom Pound', 'GEL - Georgia Lari', 'GGP - Guernsey Pound', 'GHS - Ghana Cedi', 'GIP - Gibraltar Pound', 'GMD - Gambia Dalasi', 'GNF - Guinea Franc', 'GTQ - Guatemala Quetzal', 'GYD - Guyana Dollar', 'HKD - Hong Kong Dollar', 'HNL - Honduras Lempira', 'HRK - Croatia Kuna', 'HTG - Haiti Gourde', 'HUF - Hungary Forint', 'IDR - Indonesia Rupiah', 'ILS - Israel Shekel', 'IMP - Isle of Man Pound', 'INR - India Rupee', 'IQD - Iraq Dinar', 'IRR - Iran Rial', 'ISK - Iceland Krona', 'JEP - Jersey Pound', 'JMD - Jamaica Dollar', 'JOD - Jordan Dinar', 'JPY - Japan Yen', 'KES - Kenya Shilling', 'KGS - Kyrgyzstan Som', 'KHR - Cambodia Riel', 'KMF - Comorian Franc', 'KPW - Korea (North) Won', 'KRW - Korea (South) Won', 'KWD - Kuwait Dinar', 'KYD - Cayman Islands Dollar', 'KZT - Kazakhstan Tenge', 'LAK - Laos Kip', 'LBP - Lebanon Pound', 'LKR - Sri Lanka Rupee', 'LRD - Liberia Dollar', 'LSL - Lesotho Loti', 'LYD - Libya Dinar', 'MAD - Morocco Dirham', 'MDL - Moldova Leu', 'MGA - Madagascar Ariary', 'MKD - Macedonia Denar', 'MMK - Myanmar (Burma) Kyat', 'MNT - Mongolia Tughrik', 'MOP - Macau Pataca', 'MRU - Mauritania Ouguiya', 'MUR - Mauritius Rupee', 'MVR - Maldives (Maldive Islands) Rufiyaa', 'MWK - Malawi Kwacha', 'MXN - Mexico Peso', 'MYR - Malaysia Ringgit', 'MZN - Mozambique Metical', 'NAD - Namibia Dollar', 'NGN - Nigeria Naira', 'NIO - Nicaragua Cordoba', 'NOK - Norway Krone', 'NPR - Nepal Rupee', 'NZD - New Zealand Dollar', 'OMR - Oman Rial', 'PAB - Panama Balboa', 'PEN - Peru Sol', 'PGK - Papua New Guinea Kina', 'PHP - Philippines Peso', 'PKR - Pakistan Rupee', 'PLN - Poland Zloty', 'PYG - Paraguay Guarani', 'QAR - Qatar Riyal', 'RON - Romania Leu', 'RSD - Serbia Dinar', 'RUB - Russia Ruble', 'RWF - Rwanda Franc', 'SAR - Saudi Arabia Riyal', 'SBD - Solomon Islands Dollar', 'SCR - Seychelles Rupee', 'SDG - Sudan Pound', 'SEK - Sweden Krona', 'SGD - Singapore Dollar', 'SHP - Saint Helena Pound', 'SLL - Sierra Leone Leone', 'SOS - Somalia Shilling', 'SPL* - Seborga Luigino', 'SRD - Suriname Dollar', 'STN - São Tomé and Príncipe Dobra', 'SVC - El Salvador Colon', 'SYP - Syria Pound', 'SZL - eSwatini Lilangeni', 'THB - Thailand Baht', 'TJS - Tajikistan Somoni', 'TMT - Turkmenistan Manat', 'TND - Tunisia Dinar', 'TOP - Tonga Paanga', 'TRY - Turkey Lira', 'TTD - Trinidad and Tobago Dollar', 'TVD - Tuvalu Dollar', 'TWD - Taiwan New Dollar', 'TZS - Tanzania Shilling', 'UAH - Ukraine Hryvnia', 'UGX - Uganda Shilling', 'USD - United States Dollar', 'UYU - Uruguay Peso', 'UZS - Uzbekistan Som', 'VEF - Venezuela Bolívar', 'VND - Viet Nam Dong', 'VUV - Vanuatu Vatu', 'WST - Samoa Tala', 'XAF - Communauté Financière Africaine (BEAC) CFA Franc BEAC', 'XCD - East Caribbean Dollar', 'XDR - International Monetary Fund (IMF) Special Drawing Rights', 'XOF - Communauté Financière Africaine (BCEAO) Franc', 'XPF - Comptoirs Français du Pacifique (CFP) Franc', 'YER - Yemen Rial', 'ZAR - South Africa Rand', 'ZMW - Zambia Kwacha', 'ZWD - Zimbabwe Dollar'];
  let promise = ExchangeRate.getCurrencies();
  promise.then(function (response) {
    const body = JSON.parse(response);
    var currList = Object.keys(body.conversion_rates);
    for (var j in conversionReference) {
      $('.reference').append(`<li style="font-size:11pt">` + conversionReference[j] + `</li>`);
    }
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
    $('.results, .showErrors').show();
    let currencyFrom = $('#exchangeFrom').val();
    let currencyTo = $('#exchangeTo').val();
    let currencyAmount = Math.abs($('#amount').val());

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
        $(".showRate").append(`<p><b>Current exchange rate for $1.00 ` + body.base_code + ` is:</b><br>` + formatter.format(body.conversion_rate.toFixed(2)).replace('$', '') + ` ` + body.target_code + `</p>`);
        $(".showAmount").append(`<p><b>Exchange rate for ${formatter.format(currencyAmount)} ` + body.base_code + ` is:</b><br>` + formatter.format(body.conversion_result.toFixed(2)).replace('$', '') + ` ` + body.target_code + `</p>`);
      } catch (error) {
        $(".showErrors").text(`Error: Please input a number to convert. ${error.message}`);
      }
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error} Unsupported currency type: ${currencyTo}`);
    });
  });

});
