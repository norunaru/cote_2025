#2022년 5월 1일까지 출고완료
#5.2부터는 출고 대기
#미정 = 출고미정
SELECT ORDER_ID, PRODUCT_ID, DATE_FORMAT(OUT_DATE,'%Y-%m-%d'), 
    CASE
        WHEN OUT_DATE IS NULL THEN '출고미정'
        WHEN OUT_DATE <= '2022-05-01' THEN '출고완료'
        WHEN OUT_DATE > '2022-05-01' THEN '출고대기'
    END
AS 출고여부
FROM FOOD_ORDER
ORDER BY ORDER_ID ASC