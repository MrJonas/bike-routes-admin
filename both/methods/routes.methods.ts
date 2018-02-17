import {Routes} from '../collections/routes.collection';
import {Email} from 'meteor/email';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  contactAutors: function (contact, recapcha) {
    this.unblock();
    check(recapcha, String);
    check(contact.email, String);
    check(contact.message, String);

    if (Meteor.isServer) {
      try {
        const result = HTTP.post(
            'https://www.google.com/recaptcha/api/siteverify',
            {
              params: {
                secret: '6Lc0PyAUAAAAAPEf7lb3-Ch-vnG83PY6Li5AgOxq',
                response: recapcha
              }
            }
        );

        if (result.statusCode = 200 && result.data.success) {
          Email.send({
            from: contact.email,
            to: 'dviraciu.marsrutai@gmail.com',
            replyTo: contact.email || undefined,
            subject: 'DM KLAUSIMAS NUO: ' + contact.email,
            text: "" + contact.message
          });
        } else {
          throw new Meteor.Error('recapcha', "fail");
        }
      } catch (e) {
        throw new Meteor.Error('http', "fail");
      }
    }
  }
});