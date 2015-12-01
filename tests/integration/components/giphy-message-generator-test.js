import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('giphy-message-generator', 'Integration | Component | giphy message generator', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{giphy-message-generator}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#giphy-message-generator}}
      template block text
    {{/giphy-message-generator}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
