using LinqToTwitter;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace TwitterHashtagSearchNg2.Controllers
{
    public class FavoriteController : ApiController
    {

        private SingleUserAuthorizer auth;
        private TwitterContext twitCtx;

        FavoriteController()
        {
            //Register a new SingleUserAuthorizer. This will allow us to query tweets with a simple dev twitter account
            //TODO: Might have to switch this if we need an oauth user for liking a tweet
            auth = new SingleUserAuthorizer
            {
                CredentialStore = new SingleUserInMemoryCredentialStore
                {
                    //TODO: Hide these in lastpass or something
                    ConsumerKey = ConfigurationManager.AppSettings["consumerKey"],
                    ConsumerSecret = ConfigurationManager.AppSettings["consumerSecret"],
                    AccessToken = ConfigurationManager.AppSettings["accessToken"],
                    AccessTokenSecret = ConfigurationManager.AppSettings["accessTokenSecret"]
                }
            };

            twitCtx = new TwitterContext(auth);
        }

        [HttpPost]
        public async Task<IHttpActionResult> FavoriteTweet(string id)
        {
            ulong searchId = UInt64.MinValue;
            bool searchIdExists = ulong.TryParse(id, out searchId);
            if (!searchIdExists) return this.BadRequest();

            var status = await twitCtx.CreateFavoriteAsync(searchId);
            return this.Ok();
        }
    }
}
