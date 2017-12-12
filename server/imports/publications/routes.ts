import { Meteor } from 'meteor/meteor';
import { Routes } from '../../../both/collections/routes.collection';


Meteor.publish('routes', function() {
    if(this.userId) {
        return Routes.find({},{ sort: {'sorting_date': -1}});
    } else {
        return Routes.find(
            {published: true},
            {
                fields: {
                    'title': 1,
                    'short_description': 1,
                    'duration': 1,
                    'distance': 1,
                    'access_by_train': 1,
                    'images': 1,
                    'main_image_id': 1,
                    'main_icon': 1,
                    'url': 1,
                    'coordinates': 1,
                    'zoom': 1,
                    'center_lat': 1,
                    'center_lng': 1,
                    'atractions': 1,
                    'travel_date': 1,
                    'sorting_date': 1,
                    'published': 1
                },
                sort: {
                    'sorting_date': -1
                }
            }
        );
    }
});

Meteor.publish('oneRoute', function(id: string) {
    if(this.userId) {
        return Routes.find({_id: id});
    } else {
        return Routes.find({_id: id, published: true});
    }
});

Meteor.publish('oneRouteByUrl', function(url: string) {
    if(this.userId) {
        return Routes.find({url: url});
    } else {
        return Routes.find({url: url, published: true});
    }
});

Meteor.publish('latestRoute', function(url: string) {
  return Routes.find({ published: true}, {sort: {
        'sorting_date': -1
      }, limit: 1});
});

Meteor.publish('searchRoutes', function(searchValue: string) {
  if(!searchValue) {
    return Routes.find({
      $and: [{}, false ]
    });
  }

  return Routes.find(
    { $text: {$search: searchValue}, published: true },
    {
      fields: {
        score: { $meta: "textScore" }
      },
      sort: {
        score: { $meta: "textScore" }
      },
      limit: 10
    }
  );
});

Meteor.publish('routeMapDetails', function(id: string) {
    if(this.userId) {
        return Routes.find({_id: id});
    } else {
        return Routes.find({_id: id, published: true},
            {fields: {'coordinates':1, 'zoom':1, 'center_lat': 1, 'center_lng': 1}});
    }
});