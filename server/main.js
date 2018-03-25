import { Meteor } from 'meteor/meteor';
import {Stores} from "../collections/collection";


Meteor.startup(() => {
  // code to run on server at startup

    //Api config
    var Api = new Restivus({
        useDefaultAuth: false,
        prettyJson: true
    });

    // Necessary endpoints for store
    Api.addRoute('stores', {
       get:function () {
           return Stores.find().fetch();
       }
    });
    Api.addRoute('stores/:sqlId/:user', {
        delete:function () {
            if (Stores.remove({sqlId: this.urlParams.sqlId, user: this.urlParams.user})) {
                return {status: 'success', data: {message: 'Store removed'}};
            }
            return {
                statusCode: 404,
                body: {status: 'fail', message: 'Store not found'}
            };
        },
    });
    Api.addRoute('stores/:sqlId/:user/:title/:desc/:lat/:long', {
        post:function () {
            var collection = {sqlId:this.urlParams.sqlId, user:this.urlParams.user,
                title:this.urlParams.title, desc:this.urlParams.desc,
                lat:this.urlParams.lat, long:this.urlParams.long};
            if(Stores.insert(collection)){
                return {status: 'success', data: {message: 'Store added'}};
            }
            return {
                statusCode: 404,
                body: {status: 'fail', message: 'Store not added'}
            };

        }
    })
    
});
