-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_address_id_fkey" FOREIGN KEY ("customer_address_id") REFERENCES "customer_addresses"("customer_address_id") ON DELETE CASCADE ON UPDATE CASCADE;
