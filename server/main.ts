import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Routes } from '../both/collections/routes.collection';
import { WebApp } from 'meteor/webapp';

import './imports/publications/users';
import './imports/publications/routes';
import './imports/publications/images';

Meteor.startup(() => {

	Routes.rawCollection().createIndex({
		"title": "text",
	    "body": "text",
	    "short_description": "text",
	    "atractions.name": "text",
	    "atractions.description": "text"
	});

	if (Meteor.isServer) {
    	process.env.MAIL_URL="smtp://dviraciu.marsrutai%40gmail.com:kokiemarsrutai@smtp.gmail.com:465/";
  	}

	Accounts.config({
		forbidClientAccountCreation: true
	});

	WebApp.addHtmlAttributeHook(() => ({ lang: 'lt-LT' }));

});
