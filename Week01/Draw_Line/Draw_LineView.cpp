
// Draw_LineView.cpp : implementation of the CDrawLineView class
//

#include "pch.h"
#include "framework.h"
// SHARED_HANDLERS can be defined in an ATL project implementing preview, thumbnail
// and search filter handlers and allows sharing of document code with that project.
#ifndef SHARED_HANDLERS
#include "Draw_Line.h"
#endif

#include "Draw_LineDoc.h"
#include "Draw_LineView.h"
#include "Line_Algorithm.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// CDrawLineView

IMPLEMENT_DYNCREATE(CDrawLineView, CView)

BEGIN_MESSAGE_MAP(CDrawLineView, CView)
	// Standard printing commands
	ON_COMMAND(ID_FILE_PRINT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &CDrawLineView::OnFilePrintPreview)
	ON_WM_CONTEXTMENU()
	ON_WM_RBUTTONUP()
END_MESSAGE_MAP()

// CDrawLineView construction/destruction

CDrawLineView::CDrawLineView() noexcept
{
	// TODO: add construction code here

}

CDrawLineView::~CDrawLineView()
{
}

BOOL CDrawLineView::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: Modify the Window class or styles here by modifying
	//  the CREATESTRUCT cs

	return CView::PreCreateWindow(cs);
}

// CDrawLineView drawing

void CDrawLineView::OnDraw(CDC* pDC)
{
	CDrawLineDoc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO: add draw code for native data here
	Line_Algorithm::DDA(pDC, 150, 300, 500, 600, RGB(255, 0, 0));
	Line_Algorithm::Bresenham(pDC, 500, 300, 650, 700, RGB(0, 255, 0));
}


// CDrawLineView printing


void CDrawLineView::OnFilePrintPreview()
{
#ifndef SHARED_HANDLERS
	AFXPrintPreview(this);
#endif
}

BOOL CDrawLineView::OnPreparePrinting(CPrintInfo* pInfo)
{
	// default preparation
	return DoPreparePrinting(pInfo);
}

void CDrawLineView::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: add extra initialization before printing
}

void CDrawLineView::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: add cleanup after printing
}

void CDrawLineView::OnRButtonUp(UINT /* nFlags */, CPoint point)
{
	ClientToScreen(&point);
	OnContextMenu(this, point);
}

void CDrawLineView::OnContextMenu(CWnd* /* pWnd */, CPoint point)
{
#ifndef SHARED_HANDLERS
	theApp.GetContextMenuManager()->ShowPopupMenu(IDR_POPUP_EDIT, point.x, point.y, this, TRUE);
#endif
}


// CDrawLineView diagnostics

#ifdef _DEBUG
void CDrawLineView::AssertValid() const
{
	CView::AssertValid();
}

void CDrawLineView::Dump(CDumpContext& dc) const
{
	CView::Dump(dc);
}

CDrawLineDoc* CDrawLineView::GetDocument() const // non-debug version is inline
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(CDrawLineDoc)));
	return (CDrawLineDoc*)m_pDocument;
}
#endif //_DEBUG


// CDrawLineView message handlers
