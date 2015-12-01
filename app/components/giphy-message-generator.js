import Ember from 'ember';

/**
 * This will parse the string into an array
 * @param  {string} message The message typed by the user
 * @return {array}         An array of words
 */
function parseMessage(message) {
  var new_array = [];
  var old_array = message.split(" ");

  // old_array.forEach(function(word) {
  //   var found = false;
  //   if (found == false) {
  //     CONJUNCTIONS.forEach(function(conjunction) {
  //       if (word == conjunction) {
  //         found = true;
  //       }
  //     });
  //     if (found == false) {
  //       PRONOUNS.forEach(function(pronoun) {
  //         if (word == pronoun) {
  //           found = true;
  //         }
  //       });
  //       if (found == false) {
  //         PREPOSITIONS.forEach(function(preposition) {
  //           if (word == preposition) {
  //             found = true;
  //           }
  //         });
  //       }
  //     }
  //   } else {
  //     new_array.push(word);
  //   }
  // return new_array;
  // });
  return old_array;
}

// api key == dc6zaTOxFJmzC
/**
 * This will return an array of URLs to GIFs.
 * @param  {string} word   The word to query
 * @param  {number} limit  The limit of GIFs fetched
 * @param  {string} apiKey The api key
 * @return {array:string}  An array of URLs to GIFs
 */
function generateQuery(word, limit, offset, apiKey) {
  var url = "http://api.giphy.com/v1/gifs/search?";
  url += "q=" + word;
  url += "&limit=" + limit;
  url += "&offset=" + offset;
  url += "&api_key=" + apiKey;
  // console.log("Queried: " + url);
  var urlArray = [];

  $.ajax({
    url: url,
    async: false,
    dataType: 'json',
    success: function(data) {
      data.data.forEach(function(item) {
        urlArray.push(item.images.downsized.url);
      });
      // console.log(urlArray);
    }
  });

  return urlArray;
}

function Message(text, mediaURL, author) {
  this.text = text;
  this.mediaURL = mediaURL;
  this.author = author;
  this.timeStamp = null;
}

export default Ember.Component.extend({



  actions: {
    findTheStuff() {
      var message = this.get('message');
      var queryArray = parseMessage(message);
      var urlArray = [];
      queryArray.forEach(function(word) {
        var rand = Math.floor(Math.random() * (100 - 0)) + 100;
        var someArray = generateQuery(word, 2, rand, "dc6zaTOxFJmzC");
        urlArray = urlArray.concat(someArray);
        // console.log("URL ARRAY:");
        // console.log(urlArray);
      });
      this.set("urlArray", urlArray);
      console.log(this.get("urlArray"));
    },
    finishTheTask(gifUrl) {
      // console.log(gifUrl);
      var message = new Message(this.get("message"), gifUrl, this.get("author"));
      // var store = this.get("store");
      console.log(message);
      this.store.createRecord('message', message);
      // this.set("store", store);
      console.log("STORE");
      console.log(this.get("store"));
      // this.get('socket').emit('from_client', message);

      this.set("message", null);
      this.set("urlArray", null);
    },

  }

});

// var CONJUNCTIONS = [
//   "And",
//   "Or",
//   "But",
//   "Nor",
//   "So",
//   "For",
//   "Yet",
//   "After",
//   "Although",
//   "As",
//   "As",
//   "If",
//   "As",
//   "Long",
//   "As",
//   "Because",
//   "Before",
//   "Even",
//   "If",
//   "Even",
//   "Though",
//   "If",
//   "Once",
//   "Provided",
//   "Since",
//   "So",
//   "That",
//   "That",
//   "Though",
//   "Till",
//   "Unless",
//   "Until",
//   "What",
//   "When",
//   "Whenever",
//   "Wherever",
//   "Whether",
//   "While",
//   "Accordingly",
//   "Also",
//   "Anyway",
//   "Besides",
//   "Consequently",
//   "Finally",
//   "For",
//   "Example",
//   "For",
//   "Instance",
//   "Further",
//   "Furthermore",
//   "Hence",
//   "However",
//   "Incidentally",
//   "Indeed",
//   "In",
//   "Fact",
//   "Instead",
//   "Likewise",
//   "Meanwhile",
//   "Moreover",
//   "Namely",
//   "Now",
//   "Of",
//   "Course",
//   "On",
//   "the",
//   "Contrary",
//   "On",
//   "the",
//   "Other",
//   "Hand",
//   "Otherwise",
//   "Nevertheless",
//   "Next",
//   "Nonetheless",
//   "Similarly",
//   "So",
//   "Far",
//   "Until",
//   "Now",
//   "Still",
//   "Then",
//   "Therefore",
//   "Thus",
// ];
//
// var PRONOUNS = [
//   "all",
//   "another",
//   "any",
//   "anybody",
//   "anyone",
//   "anything",
//   "both",
//   "each",
//   "either",
//   "everybody",
//   "everyone",
//   "everything",
//   "few",
//   "he",
//   "her",
//   "hers",
//   "herself",
//   "him",
//   "himself",
//   "his",
//   "I",
//   "it",
//   "its",
//   "itself",
//   "many",
//   "me mine",
//   "more",
//   "most",
//   "much",
//   "my",
//   "myself",
//   "neither",
//   "no one",
//   "nobody",
//   "none",
//   "nothing",
//   "one",
//   "other",
//   "others",
//   "our",
//   "ours",
//   "ourselves",
//   "several",
//   "she",
//   "some",
//   "somebody",
//   "someone",
//   "something",
//   "that",
//   "their",
//   "theirs",
//   "them",
//   "themselves",
//   "these",
//   "they",
//   "this",
//   "those",
//   "us",
//   "we",
//   "what",
//   "whatever",
//   "which",
//   "whichever",
//   "who",
//   "whoever",
//   "whom",
//   "whomever",
//   "whose",
//   "you",
//   "your",
//   "yours",
//   "yourself",
//   "yourselves",
// ];
//
// var PREPOSITIONS = [
//   "aboard",
//   "about",
//   "above",
//   "across",
//   "after",
//   "against",
//   "along",
//   "amid",
//   "among",
//   "anti",
//   "around",
//   "as",
//   "at",
//   "before",
//   "behind",
//   "below",
//   "beneath",
//   "beside",
//   "besides",
//   "between",
//   "beyond",
//   "but",
//   "by",
//   "concerning",
//   "considering",
//   "despite",
//   "down",
//   "during",
//   "except",
//   "excepting",
//   "excluding",
//   "following",
//   "for",
//   "from",
//   "in",
//   "inside",
//   "into",
//   "like",
//   "minus",
//   "near",
//   "of",
//   "off",
//   "on",
//   "onto",
//   "opposite",
//   "outside",
//   "over",
//   "past",
//   "per",
//   "plus",
//   "regarding",
//   "round",
//   "save",
//   "since",
//   "than",
//   "through",
//   "to",
//   "toward",
//   "towards",
//   "under",
//   "underneath",
//   "unlike",
//   "until",
//   "up",
//   "upon",
//   "versus",
//   "via",
//   "with",
//   "within",
//   "without",
// ];
