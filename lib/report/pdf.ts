import PDFDocument from "pdfkit";
import type { AuditReport } from "@/lib/sample-report";
import { scoreTone } from "@/lib/sample-report";

const INK = "#1b1814";
const SOFT = "#5c564c";
const RULE = "#cfc4ae";
const FOREST = "#2c5847";
const COPPER = "#b24a22";
const OCHRE = "#8a6a24";
const CREAM = "#faf6ee";
const BOTTOM = 64;

function toneColor(score: number) {
  const tone = scoreTone(score);
  if (tone === "high") return FOREST;
  if (tone === "mid") return OCHRE;
  return COPPER;
}

export function renderReportPdf(report: AuditReport): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: { top: 48, bottom: BOTTOM, left: 54, right: 54 },
      info: {
        Title: `${report.product} — CiteScore audit`,
        Author: "CiteScore",
        Subject: "GEO / AI-visibility audit",
      },
    });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk as Buffer));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pageWidth = doc.page.width - 108;
    let pageNo = 1;

    const stampChrome = () => {
      const savedY = doc.y;
      const savedX = doc.x;
      const savedBottom = doc.page.margins.bottom;
      doc.page.margins.bottom = 0;
      doc.save();
      doc.rect(0, 0, doc.page.width, 14).fill(FOREST);
      doc.font("Times-Roman").fontSize(8).fillColor(SOFT);
      const y = doc.page.height - 32;
      doc.text(
        report.sample
          ? "CiteScore sample report — fictional product, illustrative scores."
          : "CiteScore audit — on-page GEO signals, not a live ChatGPT query.",
        54,
        y,
        { width: pageWidth - 48, lineBreak: false },
      );
      doc.text(String(pageNo), 54, y, {
        width: pageWidth,
        align: "right",
        lineBreak: false,
      });
      doc.restore();
      doc.page.margins.bottom = savedBottom;
      doc.x = savedX;
      doc.y = savedY;
      pageNo += 1;
    };

    stampChrome();
    doc.on("pageAdded", stampChrome);

    doc.fillColor(COPPER).font("Courier").fontSize(9);
    doc.text(report.sample ? "CITESCORE AUDIT  ·  SAMPLE" : "CITESCORE AUDIT", 54, 28, {
      width: pageWidth / 2,
    });
    doc.fillColor(SOFT).text(report.auditedAt, 54 + pageWidth / 2, 28, {
      width: pageWidth / 2,
      align: "right",
    });

    const headerY = 52;
    doc.fillColor(INK).font("Times-Bold").fontSize(26).text(report.product, 54, headerY, {
      width: pageWidth - 130,
    });
    const afterTitle = doc.y;
    doc.fillColor(SOFT).font("Times-Italic").fontSize(12).text(report.oneLiner, 54, afterTitle + 4, {
      width: pageWidth - 130,
    });
    doc.fillColor(SOFT).font("Courier").fontSize(8).text(report.url, 54, doc.y + 6, {
      width: pageWidth - 130,
    });

    const boxX = 54 + pageWidth - 108;
    const boxY = headerY;
    doc.save();
    doc.roundedRect(boxX, boxY, 108, 88, 8).lineWidth(1).strokeColor(RULE).stroke();
    doc.restore();
    doc.fillColor(toneColor(report.overall)).font("Times-Bold").fontSize(30).text(
      String(report.overall),
      boxX,
      boxY + 14,
      { width: 108, align: "center" },
    );
    doc.fillColor(SOFT).font("Courier").fontSize(7).text("CITESCORE / 100", boxX, boxY + 48, {
      width: 108,
      align: "center",
    });
    doc.fillColor(INK).font("Times-Italic").fontSize(10).text(report.grade, boxX, boxY + 64, {
      width: 108,
      align: "center",
    });

    doc.y = Math.max(doc.y, boxY + 104);
    rule(doc, pageWidth);

    heading(doc, "Executive read");
    body(doc, report.summary, pageWidth);
    doc.moveDown(0.4);
    doc.fillColor(SOFT).font("Times-Italic").fontSize(9).text(report.methodology, {
      width: pageWidth,
      lineGap: 2,
    });

    heading(doc, "Engine snapshot");
    doc.fillColor(SOFT).font("Times-Italic").fontSize(8).text(
      "Inferred from on-page GEO signals. Not a live query of ChatGPT, Perplexity, or AI Overviews.",
      { width: pageWidth },
    );
    doc.moveDown(0.4);

    drawTableRow(doc, pageWidth, "Engine", "Status", "Note", true);
    for (const engine of report.engines) {
      drawTableRow(doc, pageWidth, engine.engine, engine.status, engine.detail, false);
    }

    heading(doc, "Dimension breakdown");
    for (const dimension of report.dimensions) {
      const note = `${dimension.note} Weight ${dimension.weight}.`;
      const height = Math.max(26, doc.heightOfString(note, { width: pageWidth - 160 }) + 10);
      ensureSpace(doc, height + 8);
      const y = doc.y;
      doc.fillColor(INK).font("Times-Bold").fontSize(10).text(dimension.name, 54, y, { width: 118 });
      doc.fillColor(SOFT).font("Times-Roman").fontSize(9).text(note, 178, y, {
        width: pageWidth - 168,
      });
      doc.fillColor(toneColor(dimension.score)).font("Times-Bold").fontSize(16).text(
        String(dimension.score),
        54 + pageWidth - 36,
        y,
        { width: 36, align: "right" },
      );
      doc.y = y + height;
      rule(doc, pageWidth);
      doc.moveDown(0.15);
    }

    heading(doc, "Ten fixes that would get this site cited");
    doc.fillColor(SOFT).font("Times-Italic").fontSize(9).text(
      "Ranked by expected citation lift, not by how good they look on a launch tweet.",
      { width: pageWidth },
    );
    doc.moveDown(0.5);

    for (const fix of report.fixes) {
      ensureSpace(doc, 90);
      const y = doc.y;
      doc.save();
      doc.rect(54, y, pageWidth, 1).fill(RULE);
      doc.restore();
      doc.fillColor(INK).font("Times-Bold").fontSize(12).text(
        `${fix.rank}.  ${fix.title}`,
        54,
        y + 10,
        { width: pageWidth },
      );
      doc.fillColor(SOFT).font("Courier").fontSize(8).text(
        `${fix.impact} impact · ${fix.effort}  ·  ${fix.where}`,
        { width: pageWidth },
      );
      doc.moveDown(0.25);
      labeled(doc, "Why it matters. ", fix.why, pageWidth);
      labeled(doc, "Do this. ", fix.doThis, pageWidth);
      doc.moveDown(0.55);
    }

    doc.end();
  });
}

function heading(doc: PDFKit.PDFDocument, title: string) {
  ensureSpace(doc, 48);
  doc.moveDown(0.8);
  doc.fillColor(INK).font("Times-Bold").fontSize(16).text(title);
  doc.moveDown(0.3);
}

function body(doc: PDFKit.PDFDocument, text: string, width: number) {
  doc.fillColor(SOFT).font("Times-Roman").fontSize(11).text(text, { width, lineGap: 3 });
}

function labeled(doc: PDFKit.PDFDocument, label: string, text: string, width: number) {
  doc.fillColor(INK).font("Times-Bold").fontSize(9).text(label, { continued: true, width });
  doc.fillColor(SOFT).font("Times-Roman").text(text, { width });
}

function rule(doc: PDFKit.PDFDocument, pageWidth: number) {
  doc.save();
  doc.moveTo(54, doc.y).lineTo(54 + pageWidth, doc.y).strokeColor(RULE).lineWidth(0.6).stroke();
  doc.restore();
}

function drawTableRow(
  doc: PDFKit.PDFDocument,
  pageWidth: number,
  engine: string,
  status: string,
  detail: string,
  header: boolean,
) {
  const height = Math.max(
    20,
    doc.font(header ? "Times-Bold" : "Times-Roman").fontSize(9).heightOfString(detail, {
      width: pageWidth - 200,
    }) + 10,
  );
  ensureSpace(doc, height + 6);
  const y = doc.y;
  if (header) {
    doc.save();
    doc.rect(54, y, pageWidth, height).fill(CREAM);
    doc.restore();
  }
  doc
    .fillColor(INK)
    .font(header ? "Times-Bold" : "Times-Roman")
    .fontSize(9)
    .text(engine, 60, y + 5, { width: 88 });
  doc.text(status, 150, y + 5, { width: 88 });
  doc.fillColor(header ? INK : SOFT).text(detail, 244, y + 5, { width: pageWidth - 200 });
  doc.y = y + height;
  rule(doc, pageWidth);
}

function ensureSpace(doc: PDFKit.PDFDocument, min: number) {
  if (doc.y + min > doc.page.height - BOTTOM) doc.addPage();
}

export function reportFilename(report: AuditReport) {
  const slug = report.product
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `citescore-${slug || "audit"}.pdf`;
}
