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

        public media(string url, string caption, string credit) {
            this.ure = url;
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
    }

    class text {
        public string headline;
        public string text;

        public text(string headline, string text) {
            this.headline = headline;
            this.text = text;
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

        public Title(media media, start_date start_date, text text) {
            this.media = media;
            this.start_date = start_date;
            this.text = text;
        }
    }

    class TimelineJS {
        public Title title;
        public List<Event> events;

        public TimelineJS(Title title, List<Event> events) {
            this.title = title;
            this.events = events;
        }
    }
}


