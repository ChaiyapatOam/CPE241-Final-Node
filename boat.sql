-- 1.สรุปการจ่ายเงินในแต่ละ Booking

SELECT customer.first_name,customer.last_name,booking.id,SUM(payment.price) FROM payment,booking,customer
WHERE payment.booking_id = booking.id
AND customer.id = booking.customer_id
GROUP BY booking.id;

-- 2.แสดงจำนวนผู้เข้าพักในแต่ละ room type ในวันที่ดูข้อมูล
SELECT roomtype.type_id,SUM(booking.guest_number) as guest_num
FROM booking,room,roomtype
WHERE booking.room_id = room.id
AND room.type_id = roomtype.type_id
AND CURRENT_DATE BETWEEN booking.check_in_date AND booking.check_out_date
GROUP BY roomtype.type_id;

-- 3.แสดงการจองห้องพักใน Room type และจำนวนคนที่เข้าพักที่ยอดนิยมที่สุด (ไม่รู้ถูกป่าว)
SELECT name,guest_number FROM
(SELECT roomtype.name,guest_number,COUNT(guest_number) as count
FROM   booking,room,roomtype
WHERE booking.room_id = room.id
AND room.type_id = roomtype.type_id
GROUP  BY roomtype.name,guest_number
ORDER BY roomtype.name,count DESC) as Table1
GROUP BY name

-- 4.แสดงรายการของที่ขายดีที่สุดในแต่ละ Room type
SELECT roomtype.type_id,booking_product.product_id,SUM(booking_product.quantity) as sum FROM booking_product,booking,room,roomtype
WHERE booking_product.booking_id = booking.id
AND booking.room_id = room.id
AND room.type_id = roomtype.type_id
GROUP BY roomtype.type_id
ORDER BY sum DESC
LIMIT 5;