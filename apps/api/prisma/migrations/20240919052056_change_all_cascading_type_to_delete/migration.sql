-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_shift_id_fkey";

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "outlets"("outlet_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shifts"("shift_id") ON DELETE CASCADE ON UPDATE CASCADE;
