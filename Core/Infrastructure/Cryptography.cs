using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Infrastructure
{
    public static class Cryptography
    {
        private const string _customHardCodedSalt = "hj2_l;bp2i";

        public static string GetHash(string text)
        {
            // Pass a workFactor parameter to GenerateSalt to explicitly specify the
            // amount of resources required to check the password. The work factor
            // increases exponentially, so each increment is twice as much work. If
            // omitted, a default of 10 is used.
            string mySalt = BCrypt.Net.BCrypt.GenerateSalt(11);

            var hash = BCrypt.Net.BCrypt.HashPassword(text + _customHardCodedSalt, mySalt);

            return hash;

        }

        public static bool Verify(string text, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(text + _customHardCodedSalt, hash);
        }
    }
}
