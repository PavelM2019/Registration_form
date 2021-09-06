using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ApplyForm.Models;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Xml.Serialization;
using System.Xml;
using System.Text;
using System.Xml.Linq;

namespace ApplyForm.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult application()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpPost]
        public string application(KlientClass KlientClass)
        {
            
            string filename = KlientClass.surname.Trim() + " " + KlientClass.name.Trim() + " " + KlientClass.middle_name + " "+ DateTime.Now.ToString("yyyyMMddHHmmss") + ".xml";
            string fileText = KlientClass.Phone + " " + KlientClass.Days;
            string strDatatoserver = KlientClass.Datatoserver;


            //string   filename = "file.xml";

           // StreamWriter f = new StreamWriter(@"C:\sitefiles\"+filename);
            //f.WriteLine(KlientClass.Phone);
            //f.WriteLine(KlientClass.email);
            //f.WriteLine(KlientClass.Days);
            //f.WriteLine(KlientClass.startDate.ToString("yyyyMMdd"));
            //f.WriteLine(KlientClass.touristnumber);
            //f.WriteLine(KlientClass.comment+ KlientClass.Data2);
            //f.WriteLine(KlientClass.pasportFio);
            //f.WriteLine(strDatatoserver);
            //f.Close();


            XmlWriterSettings settings = new XmlWriterSettings
            {
                Indent = true,
                CloseOutput = true
            };

            //StreamWriter f = new StreamWriter(@"C:\sitefiles\"+filename);

            using (XmlWriter writer = XmlWriter.Create("c:\\sitefiles\\Rafting_Mugia\\"+ filename, settings))

            //using (XmlWriter writer = XmlWriter.Create("c:\\sitefiles\\гнгнел Pavlo Сергеевич 20210127123941.xml", settings))
            {
                writer.WriteStartDocument();
                writer.WriteComment("This file is generated for 1C.");
                writer.WriteStartElement("SiteData");
               // writer.WriteAttributeString("Phone", KlientClass.Phone);

                writer.WriteStartElement("Phone");
                writer.WriteString(KlientClass.Phone);
                writer.WriteEndElement();

                writer.WriteStartElement("email");
                writer.WriteString(KlientClass.email);
                writer.WriteEndElement();

                writer.WriteStartElement("Days");
                writer.WriteString(KlientClass.Days.ToString());
                writer.WriteEndElement();

                writer.WriteStartElement("startDate");
                writer.WriteString(KlientClass.startDate.ToString("yyyyMMdd"));
                writer.WriteEndElement();

                writer.WriteStartElement("touristnumber");
                writer.WriteString(KlientClass.touristnumber.ToString());
                writer.WriteEndElement();

                writer.WriteStartElement("comment");
                writer.WriteString(KlientClass.comment);
                writer.WriteEndElement();

                writer.WriteStartElement("GrillMenu");
                writer.WriteString(KlientClass.Data2);
                writer.WriteEndElement();

                writer.WriteStartElement("Restplace");
                writer.WriteString(KlientClass.pasportFio);
                writer.WriteEndElement();


                writer.WriteStartElement("Datatoserver");
                writer.WriteString(strDatatoserver);
                writer.WriteEndElement();


                writer.WriteEndElement();
                writer.WriteEndDocument();

                //writer.Flush(); //Flush isn't required--handled by the using block
                //writer.Close(); //close isn't required--handled by the using block

            }
















                return "Спасибо, " + KlientClass.name + " " + KlientClass.middle_name + ", за Вашу заявку!";

          
        }
    }
}
