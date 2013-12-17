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
                        Name = "Alin Bumbes",
                        Email = "admin@alin.com",
                        Password = Cryptography.GetHash("admin"),
                        Type = UserType.Admin
                    };

                    var validator = new UserValidator();
                    ValidationResult results = validator.Validate(adminUser);
                    var xx = results.IsValid;
                    session.Save(adminUser);

                    var user = new User
                    {
                        Name = "Un user",
                        Email = "user@alin.com",
                        Password = Cryptography.GetHash("user"),
                        Type = UserType.User
                    };
                    session.Save(user);

                    //MUSIC GENRES
                    var muzicapopulara = new MusicGenre("Muzica populara");
                    session.Save(muzicapopulara);

                    var sarba = new MusicGenre("Sarbe");
                    sarba.Parent = muzicapopulara;
                    session.Save(sarba);

                    var hora = new MusicGenre("Hore");
                    hora.Parent = muzicapopulara;
                    session.Save(hora);

                    var doina = new MusicGenre("Doine");
                    doina.Parent = muzicapopulara;
                    session.Save(doina);
                    
                    var muzicaUsoara = new MusicGenre("Muzica usoara");
                    session.Save(muzicaUsoara);

                    var blues = new MusicGenre("Blues");
                    blues.Parent = muzicaUsoara;
                    session.Save(blues);

                    var rockAndRoll = new MusicGenre("Rock and roll");
                    rockAndRoll.Parent = muzicaUsoara;
                    session.Save(rockAndRoll);

                    var pop = new MusicGenre("Pop");
                    pop.Parent = muzicaUsoara;
                    session.Save(pop);

                    var hiphop = new MusicGenre("Hip hop");
                    hiphop.Parent = muzicaUsoara;
                    session.Save(hiphop);


                    //EVENT TYPES
                    var eventNunta = new EventType("Nunta", 800);
                    session.Save(eventNunta);
                    var eventBotez = new EventType("Botez", 500);
                    session.Save(eventBotez);
                    var eventConcertLive = new EventType("Concert live", 15000);
                    session.Save(eventConcertLive);

                    //SONGS
                    var songMariesiMarioara = new Song();
                    songMariesiMarioara.Name = "Marie si Marioara";
                    songMariesiMarioara.DurationMin = 2;
                    songMariesiMarioara.MusicGenre = sarba;
                    session.Save(songMariesiMarioara);

                    var ceSeAude = new Song();
                    ceSeAude.Name = "Ce se-aude mai neicuta";
                    ceSeAude.DurationMin = 2.7;
                    ceSeAude.MusicGenre = sarba;
                    session.Save(ceSeAude);

                    var haiHaiCuTrasioara = new Song();
                    haiHaiCuTrasioara.Name = "Hai hai cu trasioara";
                    haiHaiCuTrasioara.DurationMin = 2.3;
                    haiHaiCuTrasioara.MusicGenre = hora;
                    haiHaiCuTrasioara.Author = "Liviu Vasilica";
                    session.Save(haiHaiCuTrasioara);


                    tx.Commit();
                }
            }
        }

    }
}
