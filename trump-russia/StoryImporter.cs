using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.IO;

using Newtonsoft.Json;



namespace TrumpRussia {

    class RawStory {
        public string Year;
        public string Day;
        public DateTime? Date;
        public string DateDescription;
        public string Topic;
        public string Description;
        public string Link;
    } 

    class StoryImporter {

        private static List<RawStory> rawStories = new List<RawStory>();
        private static int goodStories = 0;

        private static string[] topics = new string[] {
            "Major Events"
            , "Investigations"
            , "Russians, Hacking"
            , "Trump"
            , "Cohen"
            , "Manafort and Gates"
            , "Kushner"
            , "Trump Jr."
            , "Flynn"
            , "Papadopolous"
            , "Page"
            , "Sessions, Stone, Other"
        };


        public static int Import(string htmlFile) {

            string text = File.ReadAllText(htmlFile, Encoding.UTF8);

            int lineNum = 0;
            int max = 10000;
            var lines = text.Split(new[] { "<tr " }, StringSplitOptions.None);
            foreach (string line in lines) {
                lineNum++;
                if ((lineNum > max) || (lineNum < 5))
                    continue;

                ImportLine(line);
            }

            MakeSql();
            return goodStories;
        }

        private static void ImportLine(string line) {
            var cols = line.Split(new[] { "<td " }, StringSplitOptions.None);
            if (cols.Length < 2)
                return;

            ImportColumns(cols);
        }

        private static void ImportColumns(string[] cols) {

            int firstTopic = 4;
            for (int col = 0; col < topics.Count(); col++) {

                var fields = cols[firstTopic + col].Split(new[] { " href=" }, StringSplitOptions.None);
                if (fields.Length < 2)
                    continue;
                
                var linkAndDescription = fields[1].Split('>');

                var description = linkAndDescription[1]
                    .Replace("</a", "")
                    .Replace("<br", "");

                var link = linkAndDescription[0].Replace("\"", "");

                var story = new RawStory();
                story.Year = Year(cols[1]);
                story.Day = Day(cols[2]);
                story.Date = Date(story.Year, story.Day);
                story.DateDescription = Year(cols[1]) + " " + Day(cols[2]);
                story.Topic = topics[col].Replace("SESSIONS, STONE AND OTHER", "Sessions, Stone, Other");
                story.Description = description;
                story.Link = link;

                rawStories.Add(story);
            }
        }

        private static string Year(string txt) {
            // class="s7" dir="ltr">1998</td>
            txt = txt.Replace("</td>", "");
            txt = txt.Substring(txt.LastIndexOf("ltr\">") + 5);

            if (!txt.Contains(">"))
                return txt;

            //txt = txt.Substring(txt.LastIndexOf(">") + 1);
            if (txt.Contains("</span>"))
                txt = txt.Substring(txt.LastIndexOf("</span>") - 4);
            txt = txt.Replace("</span>", ""); 
            return txt;
        }

        private static string Day(string txt) {
            var originaltxt = txt;

            // class="s10"></td>
            txt = txt.Replace("</td>", "");
            txt = txt.Substring(txt.LastIndexOf("\">") + 2);

            if (txt.Contains("</span>"))
                txt = txt.Substring(txt.LastIndexOf(@";\>") + 1);
            txt = txt.Replace("</span>", "");

            if (txt.Contains(">"))
                Console.WriteLine("ERROR" + txt);
            txt = txt.Trim();
            return txt;
        }

        private static DateTime? Date(string year, string monthDay) {

            var specialDates = new Dictionary<string, string> {
                {"June", "June 1"},
                {"August", "August 1"},
                {"April 10-11", "April 10"},
                {"May 13-14", "May 13"}
            };
            string specialMonthDay;
            if (specialDates.TryGetValue(monthDay.Trim(), out specialMonthDay))
                monthDay = specialMonthDay;


            monthDay = monthDay.Replace("Aug.10", "Aug. 10"); 

            var monthAndDay = monthDay.Split(new[] { " " }, StringSplitOptions.None);
            if (monthAndDay.Count() != 2)
                return null;

            var month = Month(monthAndDay[0]);
            var day = monthAndDay[1].Trim();

            if (month == "0")
                return null;

            string dateStr = month + "/" + day + "/" + year;

            DateTime date;
            if (DateTime.TryParse(dateStr, out date))
                return date;
            else {
                Console.WriteLine("ERROR: " + year + " | " + monthDay);
                return null;
            }
        }
            

        private static string Month(string txt) {

            var months = new Dictionary<string, string> {
                {"Jan.", "1"},
                {"January", "1"},
                {"Feb.", "2"},
                {"Feb", "2"},
                {"March", "3"},
                {"April", "4"},
                {"May", "5"},
                {"June", "6"},
                {"July", "7"},
                {"August", "8"},
                {"Aug.", "8"},
                {"Sept.", "9"},
                {"Oct.", "10"},
                {"October", "10"},
                {"Nov.", "11"},
                {"November", "10"},
                {"Dec.", "12"},
            };

            string month;
            if (months.TryGetValue(txt, out month)) 
                return month.Trim();
            else 
                return "0";
        }



        private static void MakeSql() {

            using (TextWriter tw = new StreamWriter("c:\\trump-russia\\sql\\3 INSERT Story.sql")) {

                tw.WriteLine("USE TrumpRussia");
                tw.WriteLine("GO");
                tw.WriteLine("");
                tw.WriteLine("DELETE FROM Story");
                tw.WriteLine("");

                foreach (RawStory story in rawStories) {

                    if (story.Date == null) {
                        Console.WriteLine(story.Day);
                        continue;
                    }

                    goodStories++;
                    tw.WriteLine(
                        "INSERT INTO Story VALUES ("
                        + "(SELECT ID FROM Topic WHERE Name = '" + story.Topic + "'), "
                        + "'" + story.Description + "', "
                        + "'" + story.Link + "', "
                        + "'" + story.Date.ToString() + "', " // Date
                        + "'" + story.DateDescription + "', " 

                        + "1, "  // MediaOutletID
                        + "'', " // Title
                        + "'', " // Authors
                        + "'', " // Keywords
                        + "'', " // Image
                        + "'')" // Body
                    );
                }
            }
        }


        public static int MakeJson(string outputFileName) {

            string connectionString = "Server=SCOTT-PC\\SQLExpress;Database=TrumpRussia;Trusted_Connection=True;";

            var topics = new List<Topic>();
            int stories = 0;
            string query = "SELECT * FROM TopicView ORDER BY TopicID, Date";
            using (SqlConnection conn = new SqlConnection(connectionString)) {
                using (SqlCommand cmd = new SqlCommand(query, conn)) {
                    cmd.CommandType = CommandType.Text;
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                                        
                    Topic currentTopic = null; 
                    while (reader.Read()) {
                        var topicName = reader["Topic"].ToString();
                        if (currentTopic == null || (topicName != currentTopic.name)) {
                            currentTopic = new Topic(topicName);
                            topics.Add(currentTopic);
                        }

                        currentTopic.data.Add(Makedata(reader));
                        stories++;
                    }
                }
            }
            Console.WriteLine("Topics: " + topics.Count().ToString());

            WriteTopicsToJson(outputFileName, topics);
            return stories; 
        }

        private static data Makedata(SqlDataReader reader) {
            return new data(
                reader["date"].ToString()
                , reader["description"].ToString()
                , reader["link"].ToString()
                , reader["dateDescription"].ToString()
                , reader["title"].ToString()
            );
         }

        private static void WriteTopicsToJson(string outputFileName, List<Topic> topics) {
            string json = JsonConvert.SerializeObject(topics);
            var niceJson = Newtonsoft.Json.Linq.JToken.Parse(json).ToString();
            System.IO.File.WriteAllText(outputFileName, niceJson);
        }


        // For Timeline.js  See TimelineJs.cs 
        public static int MakeTimelineJsJson(string outputFileName) {

            string connectionString = "Server=SCOTT-PC\\SQLExpress;Database=TrumpRussia;Trusted_Connection=True;";

            var events = new List<Event>();
            int stories = 0;
            string query = "SELECT Image, Link, Date, Description, Topic, MediaOutlet, Title FROM TopicView ORDER BY TopicID, Date";
            using (SqlConnection conn = new SqlConnection(connectionString)) {
                using (SqlCommand cmd = new SqlCommand(query, conn)) {
                    cmd.CommandType = CommandType.Text;
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read()) {
                        var ev = new Event(
                            reader["Image"].ToString(),
                            ArticleLink(reader["MediaOutlet"].ToString(), reader["Link"].ToString(), reader["Title"].ToString()), 
                            DateTime.Parse(reader["Date"].ToString()),
                            GetHeadline(reader["Description"].ToString(), reader["Topic"].ToString()),
                            reader["Topic"].ToString(),
                            reader["MediaOutlet"].ToString()
                        );
                        events.Add(ev);
                        stories++;
                    }
                }
            }
            Console.WriteLine("Topics: " + topics.Count().ToString());

            WriteTimelineJsToJson(outputFileName, events);
            return stories;
        }

        private static string GetHeadline(string description, string topic) {
            if ((topic == "Major Events") || (topic == "Investigations"))
                return description;

            return description + " (" + topic + ")";
        } 

        private static string ArticleLink(string mediaOutlet, string link, string headline) {

            if (headline != "")
                return  "<a href='" + link + "' target='_blank'>" + mediaOutlet + " / " + headline + "</a>";

            if (link != "")
                return "<a href='" + link + "' target='_blank'>" + mediaOutlet + "</a>";

            return mediaOutlet;
            // "<a href='https://www.state.gov/e/eb/tfs/spi/ukrainerussia/' target='_blank'>Visit W3Schools.com!</a>"
        }


        private static void WriteTimelineJsToJson(string outputFileName, List<Event> events) {
            //"https://d3i6fh83elv35t.cloudfront.net/newshour/app/uploads/2014/10/LisaDesjardins_square-200x0-c-default.jpg"),

            var title = new Title(
                new media("http://kvie.org/wp-content/uploads/2017/12/pbs-newshour.png"),
                //new media("/img/pbs-newshour.png"),
                new text("The giant timeline of everything Russia, Trump and the investigations", "By Lisa Desjardins"));

            var timeline = new TimelineJS(events, title);

            string json = JsonConvert.SerializeObject(timeline);
            var niceJson = Newtonsoft.Json.Linq.JToken.Parse(json).ToString();
            System.IO.File.WriteAllText(outputFileName, niceJson);
        }
    }
}
