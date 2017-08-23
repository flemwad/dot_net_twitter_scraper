using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LinqToTwitter;
using System.Configuration;
using System.Threading;
using System.Threading.Tasks;
using TwitterHashtagSearchNg2.Models;

namespace TwitterHashtagSearchNg2.Controllers
{
    public class SearchController : ApiController
    {
        private SingleUserAuthorizer auth;
        private TwitterContext twitCtx;

        SearchController()
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

        [HttpGet]
        public async Task<IHttpActionResult> GetByHashtag(string hashtag, int count, string maxId)
        {
            ulong searchMaxId = UInt64.MinValue;
            bool maxIdExists = ulong.TryParse(maxId, out searchMaxId);
            hashtag = '\u0023' + hashtag;

            var searchQuery = maxIdExists ?
                (from search in twitCtx.Search
                 where search.Type == SearchType.Search &&
                       search.Query == hashtag &&
                       search.Count == count &&
                       search.ResultType == ResultType.Popular &&
                       search.MaxID == searchMaxId
                 select search) :
                 (from search in twitCtx.Search
                  where search.Type == SearchType.Search &&
                        search.Query == hashtag &&
                        search.ResultType == ResultType.Popular &&
                        search.Count == count
                  select search);

            var searchResponse = await searchQuery.SingleOrDefaultAsync();

            List<Tweet> tweetsToReturn = new List<Tweet>();
            if (searchResponse != null)
                searchResponse.Statuses.ForEach(tweet =>
                    tweetsToReturn.Add(new Tweet {
                        id = tweet.StatusID.ToString(),
                        text = tweet.Text,
                        timestamp = tweet.CreatedAt,
                        likeNumber = tweet.FavoriteCount ?? 0,
                        retweetNumber = tweet.RetweetCount,
                        handle = tweet.User.ScreenNameResponse,
                        author = tweet.User.Name,
                        picture = tweet.User.ProfileImageUrl
                    })
                );

            return this.Json(new SearchResponse {
                count = searchResponse.Statuses.Count,
                maxId = searchResponse.Statuses.Last().StatusID.ToString() ?? String.Empty,
                tweets = tweetsToReturn
            });
        }

    }
}
