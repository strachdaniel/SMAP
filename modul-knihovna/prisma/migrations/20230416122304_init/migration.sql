-- CreateTable
CREATE TABLE "Reader" (
    "reader_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Reader_pkey" PRIMARY KEY ("reader_id")
);

-- CreateTable
CREATE TABLE "Borrow" (
    "borrow_id" SERIAL NOT NULL,
    "reader_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "borrowed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returned_at" TIMESTAMP(3),

    CONSTRAINT "Borrow_pkey" PRIMARY KEY ("borrow_id")
);

-- CreateTable
CREATE TABLE "Book" (
    "book_id" SERIAL NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subcategory_id" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "PairedCategory" (
    "paired_category_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "subcategory_id" INTEGER NOT NULL,

    CONSTRAINT "PairedCategory_pkey" PRIMARY KEY ("paired_category_id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "subcategory_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("subcategory_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reader_reader_id_key" ON "Reader"("reader_id");

-- CreateIndex
CREATE UNIQUE INDEX "Borrow_borrow_id_key" ON "Borrow"("borrow_id");

-- CreateIndex
CREATE UNIQUE INDEX "Book_book_id_key" ON "Book"("book_id");

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_id_key" ON "Category"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PairedCategory_paired_category_id_key" ON "PairedCategory"("paired_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_subcategory_id_key" ON "Subcategory"("subcategory_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_name_key" ON "Subcategory"("name");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "Subcategory"("subcategory_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PairedCategory" ADD CONSTRAINT "PairedCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PairedCategory" ADD CONSTRAINT "PairedCategory_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "Subcategory"("subcategory_id") ON DELETE RESTRICT ON UPDATE CASCADE;
