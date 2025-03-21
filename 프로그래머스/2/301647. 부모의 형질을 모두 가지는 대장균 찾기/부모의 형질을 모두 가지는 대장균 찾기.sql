-- 코드를 작성해주세요
#A가 부모, B가 자식
SELECT B.ID, B.GENOTYPE, A.GENOTYPE AS PARENT_GENOTYPE
FROM ECOLI_DATA A
JOIN ECOLI_DATA B ON A.ID = B.PARENT_ID
WHERE A.GENOTYPE = (A.GENOTYPE & B.GENOTYPE)
ORDER BY B.ID