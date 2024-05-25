---- Booking Room

-- Insert into customer table
INSERT INTO customer (first_name, last_name, phone, email)
SELECT 'asdsd','sdsds',13,'sdsd' FROM customer 
WHERE NOT EXISTS (SELECT phone FROM customer 
      WHERE phone =13 LIMIT 1) LIMIT 1;

-- Get the inserted customer ID
SET @CustomerID = (SELECT id FROM customer 
      WHERE phone =13 LIMIT 1);

-- Insert into booking table
INSERT INTO booking (check_in_date, check_out_date, guest_number, room_id, customer_id, reception_staff)
VALUES ('2024-01-01', '2024-02-02', 3, 1, @CustomerID,1);

-- Get Price from room type
SET @Price = ((SELECT price from roomtype 
              where type_id = (SELECT type_id from room where id = 1)LIMIT 1) LIMIT 1);

-- Get the inserted booking ID
SET @BookingID = LAST_INSERT_ID();

-- Insert into payment table
INSERT INTO payment (price, booking_id)
VALUES (@Price, @BookingID);

-----------------------------------------------------------------------------------
--- 2. Add roomservice and add payment

-- Insert into roomservice table
INSERT INTO roomservice (service_id, booking_id)
VALUES (2, 1);

-- Get the inserted roomservice ID
SET @RoomServiceID = LAST_INSERT_ID();

-- Insert into payment table
INSERT INTO payment (title, price, booking_id)
SELECT service_name, cost, rs.booking_id
FROM service s
JOIN roomservice rs ON rs.service_id = s.service_id
WHERE rs.id = @RoomServiceID;

3. Add product Booking
-- Insert into bookingproduct table
INSERT INTO booking_product (product_id, booking_id, quantity)
VALUES (1,20,5);

-- Update product stock
UPDATE product SET stock = CASE 
    WHEN stock - 5 >= 0 THEN stock - 5 
    ELSE 0 
    END 
where id = 1;

-- Get the inserted bookingproduct ID
SET @BookingProductID = LAST_INSERT_ID();

-- Insert into payment table
INSERT INTO payment (title, price, booking_id)
SELECT name, price, bp.booking_id
FROM product p
JOIN booking_product bp ON bp.product_id = p.id
WHERE bp.id = @BookingProductID;

---------------------------------------------
4. Add Room promotion
-- Insert into bookingproduct table
INSERT INTO promotion (promotion_code, start_date, expired_date, amount, discount_percent)
VALUES ('X69X69','2024-01-01','2024-02-02',20,5);

-- Get the inserted bookingproduct ID
SET @PromotionID = LAST_INSERT_ID();

-- Insert into payment table
INSERT INTO room_promotion (Roomtype_id, promotion_id)
VALUES (1,@PromotionID),(2,@PromotionID);