using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TwitterHashtagSearchNg2.Startup))]
namespace TwitterHashtagSearchNg2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
