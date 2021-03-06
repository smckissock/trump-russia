﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrumpRussia {

    class Program {

        static void Main(string[] args) {

            // Read Google Doc and make SQL scripts
            //int stories = StoryImporter.Import("c:\\trump-russia\\google-doc\\Main Version.html");
            //Console.WriteLine("Inserts for " + stories.ToString(), " stories.");

            // .. Now run sql scripts ..
            
            // Query db and Make Json
            //int stories = StoryImporter.MakeJson("c:\\trump-russia\\data\\data.js"); // for TimelineJs
            //int stories = StoryImporter.MakeTimelineJsJson("c:\\trump-russia\\data.json");
            
            int stories = StoryImporter.MakeDcJson("c:\\trump-russia\\data\\stories.json");

            Console.WriteLine("JSON Created for " + stories.ToString() + " stories.");
            
            Console.ReadLine();
        }
    }
}
