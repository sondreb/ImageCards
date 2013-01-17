using ImageCards.Resources;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageCards
{
    public static class Resource
    {
        public static dynamic RenderJson()
        {
            StringBuilder str = new StringBuilder();
            str.AppendLine("{");

            var resources = AppResources.ResourceManager.GetResourceSet(CultureInfo.CurrentUICulture, true, true);

            foreach (DictionaryEntry entry in resources)
            {
                object resourceKey = entry.Key;
                string resource = entry.Value.ToString().Replace("\"", "\\\"");

                // Doesn't work very well to have linebreaks, so we'll remove them.
                resource = resource.Replace("\n", "").Replace("\r", "");

                str.AppendFormat("\"{0}\": \"{1}\",\r\n", resourceKey, resource);
            }

            // Remove the last ","
            str.Remove(str.Length - 3, 3);

            str.AppendLine("");
            str.AppendLine("}");

            return str.ToString();
        }
    }
}
