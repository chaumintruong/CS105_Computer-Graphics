#include "pch.h"
#include "Line_Algorithm.h"
#include "math.h"
//#define Round(x) (int)(x + 0.5)
void Line_Algorithm::DDA(CDC* pDC, CPoint A, CPoint B, COLORREF color)
{
	DDA(pDC, A.x, A.y, B.x, B.y, color);
}

void Line_Algorithm::Bresenham(CDC* pDC, CPoint A, CPoint B, COLORREF color)
{
	Bresenham(pDC, A.x, A.y, B.x, B.y, color);
}

void Line_Algorithm::DDA(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color)
{
	if((x1 == x2) && (y1 == y2)) /*nếu 2 điểm đó trùng nhau*/
	{
		pDC->SetPixel(x1, y1, color);
		return;
	}

	if(abs(x2 - x1) >= abs(y2 - y1))
	{
		if (x1 <= x2)
			DDA_slow(pDC, x1, y1, x2, y2, color);
		else
			DDA_slow(pDC, x2, y2, x1, y1, color);
	}
	else
	{
		if (y1 <= y2)
			DDA_fast(pDC, x1, y1, x2, y2, color);
		else
			DDA_fast(pDC, x2, y2, x1, y1, color);
	}
}

void Line_Algorithm::Bresenham(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color)
{
	if((x1 == x2) && (y1 == y2)) /*nếu 2 điểm trùng nhau*/
	{
		pDC->SetPixel(x1, y1, color);
		return;
	}

	if (abs(x2 - x1) >= abs(y2 - y1))
	{
		if (x1 <= x2)
			Bresenham_slow(pDC, x1, y1, x2, y2, color);
		else
			Bresenham_slow(pDC, x2, y2, x1, y1, color);
	}
	else
	{
		if (y1 <= y2)
			Bresenham_fast(pDC, x1, y1, x2, y2, color);
		else
			Bresenham_fast(pDC, x2, y2, x1, y1, color);
	}
}

void Line_Algorithm::DDA_slow(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color) /*tăng hoặc giảm chậm*/
{
	pDC->SetPixel(x1, y1, color);
	float y_steps = (float)(y2 - y1) / (x2 - x1);
	float y = y1;

	while (x1 < x2)
	{
		x1++;
		y += y_steps;
		pDC->SetPixel(x1, round(y), color);
	}
}

void Line_Algorithm::DDA_fast(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color) /*tăng hoặc giảm nhanh*/
{
	pDC->SetPixel(x1, y1, color);
	float x_steps = (float)(x2 - x1) / (y2 - y1);
	float x = x1;

	while (y1 < y2)
	{
		y1++;
		x += x_steps;
		pDC->SetPixel(round(x), y1, color);
	}
}

void Line_Algorithm::Bresenham_slow(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color) /*tăng hay giảm chậm*/
{
	int Dx = x2 - x1;
	int Dy = y2 - y1;

	int y_steps = (Dy >= 0) ? 1 : -1;

	Dx = abs(Dx);
	Dy = abs(Dy);

	/*giải thuật chính*/
	int pos1 = Dy << 1; // pos1 = 2 * Dy
	int pos2 = (Dy - Dx) << 1; // pos1 = 2 * (Dy - Dx)
	int p = pos1 - Dx;

	pDC->SetPixel(x1, y1, color);

	for (int i = 0; i < Dx; i++)
	{
		if (p < 0)
			p += pos1;
		else
		{
			p += pos2;
			y1 += y_steps;
		}

		++x1;
		pDC->SetPixel(x1, y1, color);
	}
}

void Line_Algorithm::Bresenham_fast(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color) /*tăng hay giảm nhanh*/
{
	int Dx = x2 - x1;
	int Dy = y2 - y1;

	int x_steps = (Dy >= 0) ? 1 : -1;

	Dx = abs(Dx);
	Dy = abs(Dy);

	/*giải thuật chính*/
	int pos1 = Dx << 1; // pos1 = 2 * Dx
	int pos2 = (Dx - Dy) << 1; // pos1 = 2 * (Dx - Dy)
	int p = pos1 - Dy;

	pDC->SetPixel(x1, y1, color);

	for (int i = 0; i < Dx; i++)
	{
		if (p < 0)
			p += pos1;
		else
		{
			p += pos2;
			x1 += x_steps;
		}

		++y1;
		pDC->SetPixel(x1, y1, color);
	}
}

