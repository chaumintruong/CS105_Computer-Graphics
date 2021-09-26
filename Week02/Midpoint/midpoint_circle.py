from graphics import *

def draw_8_point(x_c, y_c, x, y):
    Point(x + x_c, y + y_c).draw(console)
    Point(-x + x_c, y + y_c).draw(console)
    Point(x + x_c, -y + y_c).draw(console)
    Point(-x + x_c, -y + y_c).draw(console)
    Point(y + x_c, x + y_c).draw(console)
    Point(-y + x_c, x + y_c).draw(console)
    Point(y + x_c, -x + y_c).draw(console)
    Point(-y + x_c, -x + y_c).draw(console)
    #console.getMouse()

def draw_circle(x_c, y_c, r):
    x, y = 0, r
    p = 5/4 - r
    draw_8_point(x_c, y_c, x, y)
    while x < y:
        if p < 0:
            p += (x << 1) + 3 
        else:
            p += ((x - y) << 1) + 5
            y -= 1
        x += 1
        draw_8_point(x_c, y_c, x, y)
    console.getMouse()

x, y, r = list([int(i) for i in input("Nhap toa do (x, y) va ban kinh duong tron: ").split()])
console = GraphWin(f"Duong tron ({x}, {y}) co ban kinh {r}", 1000, 1000)
Point(x, y).draw(console)
draw_circle(x, y, r)      

