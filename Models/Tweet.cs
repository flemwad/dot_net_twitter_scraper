using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TwitterHashtagSearchNg2.Models
{

    public partial class Tweet
    {

        public Tweet() { }

        public Tweet(string _text, DateTime _timestamp, int _retweetNumber, int _likeNumber, string _handle, string _author, string _picture)
        {
            text = _text;
            timestamp = _timestamp;
            retweetNumber = _retweetNumber;
            handle = _handle;
            author = _author;
            picture = _picture;
        }

        public string id { get; set; }
        public string text { get; set; }
        public DateTime timestamp { get; set; }
        public int retweetNumber { get; set; }
        public int likeNumber { get; set; }
        public string handle { get; set; }
        public string author { get; set; }
        public string picture { get; set; }
    }
}
