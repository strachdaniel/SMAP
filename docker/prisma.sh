cd ../modul-auth
prisma generate
prisma migrate deploy
cd ../modul-dochazka
prisma generate
prisma migrate deploy
cd ../modul-knihovna
prisma generate
prisma migrate deploy

  