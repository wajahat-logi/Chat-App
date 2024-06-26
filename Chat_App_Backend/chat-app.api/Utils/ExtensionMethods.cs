﻿using System.Globalization;

namespace chat_app.api.Utils
{
    public static class ExtensionMethods
    {
        public static string MakeDateFormat(this DateTime dt)
        {
            var pc = new PersianCalendar();
            return $"{pc.GetYear(dt)}/{pc.GetMonth(dt)}/{pc.GetDayOfMonth(dt)} {pc.GetHour(dt)}:{pc.GetMinute(dt)}:{pc.GetSecond(dt)}";
        }

        public static string CurrentDate(this DateTime dt)
        {
            return dt.ToString();
        }
    }
}
