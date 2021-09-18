#pragma once
class Line_Algorithm
{
	public:

		static void DDA(CDC* pDC, CPoint A, CPoint B, COLORREF color);
		static void Bresenham(CDC* pDC, CPoint A, CPoint B, COLORREF color);

		static void DDA(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color);
		static void Bresenham(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color);

	private:

		static void DDA_slow(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color);
		static void DDA_fast(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color);

		static void Bresenham_slow(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color);
		static void Bresenham_fast(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color);
};

