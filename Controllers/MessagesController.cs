using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PusherServer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Web.Http;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace messages_dotnet.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class MessagesController : Controller
    {
        private readonly Entities.Options.Pusher _pusherOptions;

        public MessagesController(IOptionsMonitor<Entities.Options.Pusher> pusherOptionsAccessor)
        {
            _pusherOptions = pusherOptionsAccessor.CurrentValue;
        }

        [HttpPost]
        [Route("auth")]
        public ActionResult Auth(string channel_name, string socket_id)
        {
            var pusher = new Pusher(_pusherOptions.PUSHER_APP_ID, _pusherOptions.PUSHER_KEY, _pusherOptions.PUSHER_SECRET);
            var auth = pusher.Authenticate(channel_name, socket_id);
            var json = auth.ToJson();
            return new ContentResult { Content = json, ContentType = "application/json" };
        }
    }
}