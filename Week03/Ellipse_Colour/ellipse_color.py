from graphics import *
import math

#Định nghĩa số liệu màn hình output
def Screen(name, x, y, outline):
    console = GraphWin(name, x, y)
    console.setBackground(outline)
    return console

#Định nghĩa hàm vẽ 
def Draw(console, x, y, color):
    point = Point(x, y)
    point.setFill(color)
    point.setOutline(color)
    point.draw(console)

#Hàm lấy màu pixel tại tọa độ x, y
def getPixel(console, x, y, color):
    color_pixel = Point(x, y)
    color_pixel.setOutline(color)
    color_pixel.draw(console)
    overlapping = console.find_overlapping(x, y, x, y)
    if overlapping:
        outline = console.itemcget(overlapping[0], 'outline')
        color_pixel.undraw()
        return outline

#Vẽ 4 điểm đối xứng trên Ellipse có tâm (x_c, y_c)
def Draw_Point(console, x_c, y_c, x, y, color):
    Draw(console, x + x_c, y + y_c, color)
    Draw(console, x + x_c, -y + y_c, color)
    Draw(console, x_c - x, y_c - y, color)
    Draw(console, x_c - x, y_c + y, color)

#Thuật toán tô loang màu BoundaryFill
def BoundaryFill_color(console, x, y, outline_color, boundary_color, fill_color):
    current_color = getPixel(console, x, y, outline_color)
    if current_color != boundary_color and current_color != fill_color:
        Draw(console, x, y, fill_color)
        #Loang 4 điểm
        BoundaryFill_color(console, x - 1, y, outline_color, boundary_color, fill_color)
        BoundaryFill_color(console, x, y + 2, outline_color, boundary_color, fill_color)
        BoundaryFill_color(console, x + 2, y, outline_color, boundary_color, fill_color)
        BoundaryFill_color(console, x, y - 1, outline_color, boundary_color, fill_color)
	    #Loang 8 điểm
        #BoundaryFill_color(console, x + 1, y - 1, outline_color, boundary_color, fill_color)
        #BoundaryFill_color(console, x + 1, y + 1, outline_color, boundary_color, fill_color)
        #BoundaryFill_color(console, x - 1, y + 1, outline_color, boundary_color, fill_color)
        #BoundaryFill_color(console, x - 1, y - 1, outline_color, boundary_color, fill_color)

#Thuật toán tô dòng quét ScanLine
def ScanLine_color(console, array_pos, ymin, ymax, color):
    for i in range(ymin + 2, ymax - 1):
        intersection = [x for [x, y] in array_pos if y == i]
        if intersection[0] > intersection[1]:
            intersection[0], intersection[1] = intersection[1], intersection[0]
            for point in range(intersection[0] + 2, intersection[1] - 1):
                Draw(console, point, i, color)

#Hàm lựa chọn thuật toán để tô màu
def Coloring_algorithm(console, array_pos, x_c, y_c, a, b, outline_color, boundary_color, fill_color, key):
    if key == 1:
        BoundaryFill_color(console, x_c, y_c, outline_color, boundary_color, fill_color)
    if key == 2:
        ScanLine_color(console, array_pos, y_c - b, y_c + b, fill_color)

#Vẽ ellipse bằng thuật toán Brasenham
def Bresenham_ellipse(console, x_c, y_c, a, b, outline_color, boundary_color, fill_color, key):
    x, y = 0, b
    x0 = (a*a)/math.sqrt((a*a) + (b*b))
    p = (a*a)*(1 - 2*b) + (b*b)
    Draw_Point(console, x_c, y_c, x, y, boundary_color)
    array_pos = []
    while x <= x0:
        for i in [[x + x_c, y + y_c], [-x + x_c, y + y_c], [x + x_c, -y + y_c], [-x + x_c, -y + y_c]]:
            array_pos.append(i)
        if p < 0:
            p += 2*(b*b)*(2*x + 3)
        else:
            p += 2*(b*b)*(2*x + 3) + 4*(a*a)*(1 - y)
            y -= 1
        x += 1
        Draw_Point(console, x_c, y_c, x, y, boundary_color)

    x, y = a, 0
    p = (b*b)*(1 - 2*a) + (a*a)
    Draw_Point(console, x_c, y_c, x, y, boundary_color)
    while x > x0:
        for i in [[x + x_c, y + y_c], [-x + x_c, y + y_c], [x + x_c, -y + y_c], [-x + x_c, -y + y_c]]:
            array_pos.append(i)
        if p < 0:
            p += 2*(a*a)*(2*y + 3)
        else:
            p += 2*(a*a)*(2*y + 3) + 4*(b*b)*(1 - x)
            x -= 1
        y += 1
        Draw_Point(console, x_c, y_c, x, y, boundary_color)

    Coloring_algorithm(console, array_pos, x_c, y_c, a, b, outline_color, boundary_color, fill_color, key)

    console.getMouse()

x_c, y_c, a, b = list([int(i) for i in input("Nhap toa do (x, y) voi ban truc lon va be (a, b): ").split()])
outline_color, boundary_color, fill_color = list([i for i in input("Nhap mau nen, mau vien va mau muon to: ").split()])
key = int(input("Nhan 1 de chon thuat toan BoundaryFill va nhan 2 de chon thuat toan ScanLine: "))

console = Screen(f"Duong ellipse ({x_c}, {y_c}) co ban truc ({a}, {b})", 1000, 1000, outline_color)
Bresenham_ellipse(console, x_c, y_c, a, b, outline_color, boundary_color, fill_color, key)