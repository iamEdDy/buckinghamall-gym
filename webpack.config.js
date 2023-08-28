const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
    monthlyplan: './js/monthly-plan.js',
    quaterlyplan: './js/quaterly-plan.js',
    annualplan: './js/annual-plan.js',
    verifymember: './js/verify-member.js',
    paymentconfirmed: './js/payment-confirmed.js',
  },
  output: {
    filename: '[name].bundle.js', // Output filename with dynamic placeholders
    path: path.resolve(__dirname, 'dist')
  },
  // Other configuration options, loaders, and plugins
};
