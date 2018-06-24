using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrumpRussia {

    class media {
        public string url;
        public string caption;
        public string credit;

        public media(string url, string caption = "", string credit = "") {
            this.url = url;
            this.caption = caption;
            this.credit = credit;
        }
    }

    class start_date {
        public string month;
        public string day;
        public string year;

        public start_date(string month, string day, string year) {
            this.month = month;
            this.day = day;
            this.year = year;
        }

        public start_date(DateTime date) {
            this.month = date.Month.ToString();
            this.day = date.Day.ToString();
            this.year = date.Year.ToString();
        }
    }

    class text {
        public string headline;
        [Newtonsoft.Json.JsonProperty("text")]
        public string theText;

        public text(string headline, string text) {
            this.headline = headline;
            this.theText = text;
        }
    }
    
    class Title {
        public media media;
        public text text;

        public Title(media media, text text) {
            this.media = media;
            this.text = text;
        }
    }

    class Event {
        public media media;
        public start_date start_date;
        public text text;
        public string group;

        public Event(string url, string link, DateTime date, string text, string group, string mediaOutlet) {
            this.media = new media(url, "", mediaOutlet);
            this.start_date = new start_date(date);
            this.text = new text(text, link);
            this.group = group;
        }
    }

    class TimelineJS {
        public Title title;
        public List<Event> events;

        public TimelineJS(List<Event> events, Title title = null) {
            this.title = title;
            this.events = events;
        }
    }
}


