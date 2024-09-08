-- CreateEnum
CREATE TYPE "WorkerType" AS ENUM ('WASHING', 'IRONING', 'PACKING');

-- CreateTable
CREATE TABLE "Agent" (
    "agent_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT,
    "role_id" INTEGER NOT NULL,
    "outlet_id" INTEGER,
    "worker_type" "WorkerType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("agent_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Outlet" (
    "outlet_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DECIMAL(11,7) NOT NULL,
    "longitude" DECIMAL(11,7) NOT NULL,

    CONSTRAINT "Outlet_pkey" PRIMARY KEY ("outlet_id")
);

-- CreateTable
CREATE TABLE "WorkLog" (
    "work_log_id" SERIAL NOT NULL,
    "order_item_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "worker_type" "WorkerType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkLog_pkey" PRIMARY KEY ("work_log_id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "shift_id" SERIAL NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "outlet_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("shift_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_username_key" ON "Agent"("username");

-- CreateIndex
CREATE INDEX "Agent_role_id_idx" ON "Agent"("role_id");

-- CreateIndex
CREATE INDEX "Agent_outlet_id_idx" ON "Agent"("outlet_id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "WorkLog_agent_id_idx" ON "WorkLog"("agent_id");

-- CreateIndex
CREATE INDEX "WorkLog_order_item_id_idx" ON "WorkLog"("order_item_id");

-- CreateIndex
CREATE INDEX "Shift_agent_id_idx" ON "Shift"("agent_id");

-- CreateIndex
CREATE INDEX "Shift_outlet_id_idx" ON "Shift"("outlet_id");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Agent"("agent_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("outlet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Worker_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("outlet_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Admin_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("outlet_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Driver_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("outlet_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "Agent"("agent_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "OrderItem"("order_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "Agent"("agent_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_outlet_id_fkey" FOREIGN KEY ("outlet_id") REFERENCES "Outlet"("outlet_id") ON DELETE RESTRICT ON UPDATE CASCADE;
