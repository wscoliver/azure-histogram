var _ = require('lodash');
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    // context.log(context)
    var inputSentence = req.query.sentence || (req.body && req.body.sentence)
    if (inputSentence) {
      // We take a sentence and create a histogram of letters.
      var alphabets = /[(a-zA-Z)]/g
      var alphabetList = inputSentence.match(alphabets)
      var histogram = _.reduce(alphabetList, function(result, value, key){
        if(result[value]) {
            result[value]++
        } else {
            result[value] = 1
        }
        return result
      }, {})
      res = {
          status: 200,
          body: { "results": histogram }
      }
    } 
    else {
        res = {
            status: 400,
            body: "Please pass a sentence on the query string or in the request body"
        };
    }
    context.done(null, res);
};
