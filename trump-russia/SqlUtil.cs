using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrumpRussia {

    public class SqlUtil {

        private const string connectionString = "Server=SCOTT-PC\\SQLExpress;Database=TrumpRussia;Trusted_Connection=True;";

        public static SqlDataReader Query(string sql) {

            SqlDataReader reader = null;
            using (SqlCommand command = new SqlConnection(connectionString).CreateCommand()) {
                command.CommandText = sql.Replace("''''", "''"); // if they doubled the ticks twice

                try {
                    command.Connection.Open();
                    reader = command.ExecuteReader(CommandBehavior.CloseConnection);
                }
                catch (Exception ex) {
                    ex.Data.Add("SQL", sql + " SQL ERROR: " + ex.Message);
                    throw ex;
                }
                return reader;
            }
        }


        // Doesn't work!!
        public static void Command(string sql) {

            using (SqlCommand command = new SqlConnection(connectionString).CreateCommand()) {
                command.CommandText = sql.Replace("''''", "''"); // if they doubled the ticks twice

                try {
                    command.Connection.Open();
                }
                catch (Exception ex) {
                    ex.Data.Add("SQL", sql + " SQL ERROR: " + ex.Message);
                    throw ex;
                }
            }
        }
    }
}
