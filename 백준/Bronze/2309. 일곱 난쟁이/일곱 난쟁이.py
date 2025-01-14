height=[]
for i in range (9):
    height.append(int(input()))
sum_9=sum(height)
target= sum_9-100

# 가짜 난쟁이 찾기
for i in range(1,9):
    for j in range(i):
        if height[i]+height[j]==target:
            a=i
            b=j  # 여기서 바로 del을 하면 배열의 순서가 달라지므로 안된다. 
            break
del height[a]
del height[b]
height= sorted(height)
for i in range(7):
    print(height[i])