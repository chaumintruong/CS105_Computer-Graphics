from graphics import *
import math

#Vẽ 4 điểm đối xứng trên Ellipse có tâm (x_c, y_c)
def draw_point(x_c, y_c, x, y): 
    Point(x + x_c, y + y_c).draw(console)
    Point(x + x_c, -y + y_c).draw(console)
    Point(x_c - x, y_c - y).draw(console) 
    Point(x_c - x, y_c + y).draw(console)
   
def Midpoint_ellipse(x_c, y_c, a, b):
    x, y = 0, b
    x0 = (a*a)/math.sqrt((a*a) + (b*b))
    p = (b*b) - (a*a)*b + (a*a)/4
    draw_point(x_c, y_c, x, y)
    while x <= x0:
        if p < 0: #Chọn điểm A
            p += (2*x + 3)*(b*b)
        else: #Chọn điểm B
            p += (b*b)*(2*x + 3) - 2*(a*a)*(y - 1)
            y -= 1
        x += 1
        draw_point(x_c, y_c, x, y)
    
    x, y = a, 0
    p = (a*a) - (b*b)*a + (b*b)/4
    draw_point(x_c, y_c, x, y)
    while x > x0:
        if p < 0:
            p += (2*y + 3)*(a*a)
        else:
            p += (a*a)*(2*y + 3) - 2*(b*b)*(x - 1)
            x -= 1
        y += 1
        draw_point(x_c, y_c, x, y)

    console.getMouse()

def Bresenham_ellipse(x_c, y_c, a, b):
    x, y = 0, b
    x0 = (a*a)/math.sqrt((a*a) + (b*b))
    p = (a*a)*(1 - 2*b) + (b*b)
    draw_point(x_c, y_c, x, y)
    while x <= x0:
        if p < 0:
            p += 2*(b*b)*(2*x + 3)
        else:
            p += 2*(b*b)*(2*x + 3) + 4*(a*a)*(1 - y)
            y -= 1
        x += 1
        draw_point(x_c, y_c, x, y)

    x, y = a, 0
    p = (b*b)*(1 - 2*a) + (a*a)
    draw_point(x_c, y_c, x, y)
    while x > x0:
        if p < 0:
            p += 2*(a*a)*(2*y + 3)
        else:
            p += 2*(a*a)*(2*y + 3) + 4*(b*b)*(1 - x)
            x -= 1
        y += 1
        draw_point(x_c, y_c, x, y)

    console.getMouse()

def Algorithm(algo, x_c, y_c, a, b):
    switcher = {
        1: Midpoint_ellipse(x_c, y_c, a, b),
        2: Bresenham_ellipse(x_c, y_c, a, b)
    }
    return switcher.get()

x, y, a, b = list([int(i) for i in input("Nhap toa do (x, y) voi ban truc lon va be: ").split()])
algo = int(input("Chon giai thuat ve duong ellipse: "))

console = GraphWin(f"Duong ellipse ({x}, {y}) co ban truc ({a}, {b})", 1000, 1000)
Point(x, y).draw(console)
      
print(Algorithm(algo, x, y, a, b))

#Bresenham_ellipse(x, y, a, b)
#Midpoint_ellipse(x, y, a, b)

