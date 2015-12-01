import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr(),
  mediaURL: DS.attr(),
  author: DS.attr(),
  timeStamp: DS.attr(),
});
