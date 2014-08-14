using System;
using System.Configuration;
using Core.Domain;
using Core.Domain.Mappings;
using Core.Domain.Validation;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using FluentValidation.Results;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace Core.Infrastructure
{
    public static class Database
    {
        public static readonly string DatabaseConnectionString = ConfigurationManager.AppSettings["DatabaseConnectionString"];


        public static void Configure()
        {
            //for MS SQL Server
            Fluently.Configure()
               .Database(MsSqlConfiguration.MsSql2008
                    .ConnectionString(c => c.FromConnectionStringWithKey(DatabaseConnectionString)))
                    .Mappings(m => m.FluentMappings.AddFromAssemblyOf<UserMap>())
                    .ExposeConfiguration(cfg =>
                    {
                        var recreateSchema = bool.Parse(ConfigurationManager.AppSettings["RecreateDatabaseSchema"]);
                        if (recreateSchema)
                        {
                            var schema = new SchemaExport(cfg);
                            schema.Drop(false, true);
                            schema.Create(false, true);
                        }
                    })
                    .BuildConfiguration();
        }


        public static ISessionFactory BuildSessionFactory()
        {
            ISessionFactory factory = null;

            IPersistenceConfigurer configurator = MsSqlConfiguration.MsSql2008.ConnectionString(
                c => c.FromConnectionStringWithKey(DatabaseConnectionString));

            factory = Fluently.Configure()
                .Database(configurator)
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<UserMap>())
                .BuildSessionFactory();

            if (bool.Parse(ConfigurationManager.AppSettings["RecreateDatabaseSchema"]))
            {
                Seed(factory);
            }

            return factory;
        }


        private static void Seed(ISessionFactory factory)
        {
            //seed permissions
            using (var session = factory.OpenSession())
            {
                using (var tx = session.BeginTransaction())
                {
                    //USERS
                    var adminUser = new User
                    {
                        UserName = "admin",
                        Contact = "admin@admin.com",
                        Password = Cryptography.GetHash("admin"),
                        IsAdmin = true
                    };


                    session.Save(adminUser);

                    var user = new User
                    {
                        UserName = "user",
                        Contact = "0745634231",
                        Password = Cryptography.GetHash("user"),
                        IsAdmin = false
                    };
                    session.Save(user);




                    //EVENT TYPES
                    var eventNunta = new EventType()
                    {
                        Name = "Nunta",
                        PricePerHour = 300,
                        MinimumDurationInHours = 4
                    };
                    session.Save(eventNunta);
                    var eventBotez = new EventType()
                    {
                        Name = "Botez",
                        PricePerHour = 150,
                        MinimumDurationInHours = 3
                    };
                    session.Save(eventBotez);
                    var eventConcertLive = new EventType()
                    {
                        Name = "Concert live",
                        PricePerHour = 500,
                        MinimumDurationInHours = 1
                    };
                    session.Save(eventConcertLive);

                    //SONGS
                    var songMariesiMarioara = new Song();
                    songMariesiMarioara.Name = "Marie si Marioara";
                    songMariesiMarioara.DurationMin = 2;
                    session.Save(songMariesiMarioara);

                    var ceSeAude = new Song();
                    ceSeAude.Name = "Ce se-aude mai neicuta";
                    ceSeAude.DurationMin = 2.7;
                    session.Save(ceSeAude);

                    var haiHaiCuTrasioara = new Song();
                    haiHaiCuTrasioara.Name = "Hai hai cu trasioara";
                    haiHaiCuTrasioara.DurationMin = 2.3;
                    haiHaiCuTrasioara.Author = "Liviu Vasilica";
                    session.Save(haiHaiCuTrasioara);

                    tx.Commit();
                }
            }
        }

    }
}
