using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrumpRussia {

    // Classes for json that timeline.js expects 

    class details {
        public string description;
        public string link;
        public string dateDescription;  // e.g. "June 2016"

        public string title;         // not in Google Doc - scraped from story
        //public string mediaOutlet;      // not in Google Doc - scraped from story
    }

    class data {
        public string date;
        public details details;

        public data(string date, string description, string link, string dateDescription, string title) {
            this.date = date;

            details = new details();
            details.description = description;
            details.link = link;
            details.dateDescription = dateDescription;
            details.title = title;
        }  
    }

    class Topic {
        public string name;
        public List<data> data;

        public Topic(string name) {
            this.name = name;
            data = new List<data>();
        }
    }
}
