using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TwitterHashtagSearch.Models
{
    public class SearchResponse
    {
        public int count { get; set; }

        public string maxId { get; set; }

        public List<Tweet> tweets { get; set; }
    }
}