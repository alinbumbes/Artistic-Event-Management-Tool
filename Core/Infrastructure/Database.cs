using System.Configuration;
using Core.Domain;
using Core.Domain.Mappings;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
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

                        var sarba = new MusicGenre("Sarbe");
                        session.Save(sarba);
                        var hora = new MusicGenre("Hore");
                        session.Save(hora);
                        var doina = new MusicGenre("Doine");
                        session.Save(doina);

                    muzicapopulara.Children.Add(sarba);
                    muzicapopulara.Children.Add(hora);
                    muzicapopulara.Children.Add(doina);
                    session.Save(muzicapopulara);

                    var muzicaUsoara = new MusicGenre("Muzica usoara");
                        var blues = new MusicGenre("Blues");
                        session.Save(blues);
                        var rockAndRoll = new MusicGenre("Rock and roll");
                        session.Save(rockAndRoll);
                        var pop = new MusicGenre("Pop");
                        session.Save(pop);
                        var hiphop = new MusicGenre("Hip hop");
                        session.Save(hiphop);

                    muzicaUsoara.Children.Add(blues);
                    muzicaUsoara.Children.Add(rockAndRoll);
                    muzicaUsoara.Children.Add(pop);
                    muzicaUsoara.Children.Add(hiphop);
                    session.Save(muzicaUsoara);

                    tx.Commit();
                }
            }
        }

    }
}
