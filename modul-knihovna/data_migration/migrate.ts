const { PrismaClient } = require("@prisma/client");
const MongoClient = require("mongodb").MongoClient;
const { ObjectID } = require("mongodb");

const MONGO_URI =
  "mongodb+srv://admin:admin@knihovna.nnh0f.gcp.mongodb.net/?retryWrites=true&w=majority";
const MONGO_DB = "dev";
const MONGO_COLLECTION = "books";
const POSTGRES_URI =
  "postgresql://postgres:password@localhost:5432/my_database?schema=public";

const prismaPostgres = new PrismaClient({
  datasources: {
    db: {
      url: POSTGRES_URI,
    },
  },
});

const mongoClient = new MongoClient(MONGO_URI);

async function migrateData() {
  await mongoClient.connect();
  const mongoCollection = mongoClient.db(MONGO_DB).collection(MONGO_COLLECTION);
  const mongoData = await mongoCollection.find().toArray();

  const postgresData = mongoData.map((mongoItem) => {
    return {
      isbn: mongoItem.isbn,
      title: mongoItem.title,
      author: mongoItem.author,
      created_at: mongoItem.created_at,
    };
  });

  await prismaPostgres.$connect();
  //   postgresData.forEach(async (item) => {
  //     await prismaPostgres.Book.create({
  //       data: item,
  //     });
  //   })
  await prismaPostgres.Book.createMany({
    data: postgresData,
  });

  await prismaPostgres.$disconnect();
  await mongoClient.close();
}

migrateData()
  .then(() => console.log("Migration completed successfully."))
  .catch((error) => console.error("Migration failed:", error));
