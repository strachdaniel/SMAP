-- CreateTable
CREATE TABLE "attendance" (
    "attendance_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "payroll" TEXT,
    "vacation_free_days" INTEGER,
    "vacation_taken_days" INTEGER,
    "sickdays" INTEGER,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "attendance_sheet" (
    "attendance_sheet_id" SERIAL NOT NULL,
    "attendance_id" INTEGER NOT NULL,
    "contract_id" INTEGER NOT NULL,
    "working_time_fund" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendance_sheet_pkey" PRIMARY KEY ("attendance_sheet_id")
);

-- CreateTable
CREATE TABLE "day" (
    "day_id" SERIAL NOT NULL,
    "attendance_sheet_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "day_pkey" PRIMARY KEY ("day_id")
);

-- CreateTable
CREATE TABLE "dayli_criteria" (
    "dayli_criteria_id" SERIAL NOT NULL,
    "day_id" INTEGER NOT NULL,
    "criteria_id" INTEGER NOT NULL,
    "value" INTEGER,
    "note" TEXT,
    "hours" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dayli_criteria_pkey" PRIMARY KEY ("dayli_criteria_id")
);

-- CreateTable
CREATE TABLE "employee" (
    "employee_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "employment_type" (
    "employment_type_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employment_type_pkey" PRIMARY KEY ("employment_type_id")
);

-- CreateTable
CREATE TABLE "wage_statement" (
    "wage_statement_id" SERIAL NOT NULL,
    "valid_from" DATE NOT NULL,
    "valid_to" DATE NOT NULL,
    "wage" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "contract_id" INTEGER NOT NULL,

    CONSTRAINT "wage_statement_pkey" PRIMARY KEY ("wage_statement_id")
);

-- CreateTable
CREATE TABLE "contract" (
    "contract_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "employee_category_id" INTEGER NOT NULL,
    "employment_type_id" INTEGER NOT NULL,
    "employed_from" TIMESTAMP(3) NOT NULL,
    "employed_to" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'active',
    "work_percentage" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("contract_id")
);

-- CreateTable
CREATE TABLE "employee_category" (
    "employee_category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_category_pkey" PRIMARY KEY ("employee_category_id")
);

-- CreateTable
CREATE TABLE "criteria" (
    "criteria_id" SERIAL NOT NULL,
    "employee_category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_to" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "value_once" INTEGER,
    "value_min" INTEGER,
    "value_max" INTEGER,
    "hour_rate" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "criteria_pkey" PRIMARY KEY ("criteria_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attendance_attendance_id_key" ON "attendance"("attendance_id");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_sheet_attendance_sheet_id_key" ON "attendance_sheet"("attendance_sheet_id");

-- CreateIndex
CREATE UNIQUE INDEX "day_day_id_key" ON "day"("day_id");

-- CreateIndex
CREATE UNIQUE INDEX "dayli_criteria_dayli_criteria_id_key" ON "dayli_criteria"("dayli_criteria_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_employee_id_key" ON "employee"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employment_type_employment_type_id_key" ON "employment_type"("employment_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "wage_statement_wage_statement_id_key" ON "wage_statement"("wage_statement_id");

-- CreateIndex
CREATE UNIQUE INDEX "contract_contract_id_key" ON "contract"("contract_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_category_employee_category_id_key" ON "employee_category"("employee_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "criteria_criteria_id_key" ON "criteria"("criteria_id");

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_sheet" ADD CONSTRAINT "attendance_sheet_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "attendance"("attendance_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_sheet" ADD CONSTRAINT "attendance_sheet_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contract"("contract_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "day" ADD CONSTRAINT "day_attendance_sheet_id_fkey" FOREIGN KEY ("attendance_sheet_id") REFERENCES "attendance_sheet"("attendance_sheet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dayli_criteria" ADD CONSTRAINT "dayli_criteria_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "day"("day_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dayli_criteria" ADD CONSTRAINT "dayli_criteria_criteria_id_fkey" FOREIGN KEY ("criteria_id") REFERENCES "criteria"("criteria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wage_statement" ADD CONSTRAINT "wage_statement_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contract"("contract_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_employee_category_id_fkey" FOREIGN KEY ("employee_category_id") REFERENCES "employee_category"("employee_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_employment_type_id_fkey" FOREIGN KEY ("employment_type_id") REFERENCES "employment_type"("employment_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criteria" ADD CONSTRAINT "criteria_employee_category_id_fkey" FOREIGN KEY ("employee_category_id") REFERENCES "employee_category"("employee_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
