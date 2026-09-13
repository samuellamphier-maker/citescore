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

function toneColor(score: number) {
  const tone = scoreTone(score);
  if (tone === "high") return FOREST;
  if (tone === "mid") return OCHRE;
  return COPPER;
}

function wrapLines(doc: PDFKit.PDFDocument, text: string, width: number) {
  return doc.heightOfString(text, { width });
}

export function renderReportPdf(report: AuditReport): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: { top: 54, bottom: 56, left: 54, right: 54 },
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

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    let page = 1;

    const footer = () => {
      const y = doc.page.height - 38;
      doc.save();
      doc.font("Times-Roman").fontSize(8).fillColor(SOFT);
      doc.text(
        report.sample
          ? "CiteScore sample report — fictional product, illustrative scores."
          : "CiteScore audit — on-page GEO signals, not a live ChatGPT query.",
        54,
        y,
        { width: pageWidth - 80, lineBreak: false },
      );
      doc.text(String(page), 54, y, { width: pageWidth, align: "right" });
      doc.restore();
      page += 1;
    };

    doc.on("pageAdded", footer);

    doc.save();
    doc.rect(0, 0, doc.page.width, 18).fill(FOREST);
    doc.restore();

    doc.fillColor(COPPER).font("Courier").fontSize(9).text(
      report.sample ? "CITESCORE AUDIT  ·  SAMPLE" : "CITESCORE AUDIT",
      { continued: false },
    );
    doc.fillColor(SOFT).font("Courier").fontSize(9).text(report.auditedAt, {
      align: "right",
    });

    doc.moveDown(0.8);
    const headerY = doc.y;
    doc.fillColor(INK).font("Times-Bold").fontSize(28).text(report.product, {
      width: pageWidth - 130,
    });
    doc.fillColor(SOFT).font("Times-Italic").fontSize(12).text(report.oneLiner, {
      width: pageWidth - 130,
    });
    doc.moveDown(0.3);
    doc.fillColor(SOFT).font("Courier").fontSize(8).text(report.url, {
      width: pageWidth - 130,
    });

    const boxX = doc.page.width - doc.page.margins.right - 108;
    const boxY = headerY;
    doc.save();
    doc.roundedRect(boxX, boxY, 108, 96, 8).lineWidth(1).strokeColor(RULE).stroke();
    doc.restore();
    doc.fillColor(toneColor(report.overall)).font("Times-Bold").fontSize(32).text(
      String(report.overall),
      boxX,
      boxY + 18,
      { width: 108, align: "center" },
    );
    doc.fillColor(SOFT).font("Courier").fontSize(7).text("CITESCORE / 100", boxX, boxY + 54, {
      width: 108,
      align: "center",
    });
    doc.fillColor(INK).font("Times-Italic").fontSize(10).text(report.grade, boxX, boxY + 70, {
      width: 108,
      align: "center",
    });

    doc.y = Math.max(doc.y, boxY + 120);
    doc.moveTo(54, doc.y).lineTo(54 + pageWidth, doc.y).strokeColor(RULE).lineWidth(0.8).stroke();
    doc.moveDown(1);

    doc.fillColor(INK).font("Times-Bold").fontSize(16).text("Executive read");
    doc.moveDown(0.35);
    doc.fillColor(SOFT).font("Times-Roman").fontSize(11).text(report.summary, {
      width: pageWidth,
      lineGap: 3,
    });
    doc.moveDown(0.6);
    doc.fillColor(SOFT).font("Times-Italic").fontSize(9).text(report.methodology, {
      width: pageWidth,
      lineGap: 2,
    });

    doc.moveDown(1);
    doc.fillColor(INK).font("Times-Bold").fontSize(16).text("Engine snapshot");
    doc.moveDown(0.2);
    doc.fillColor(SOFT).font("Times-Italic").fontSize(8).text(
      "Inferred from on-page GEO signals. Not a live query of ChatGPT, Perplexity, or AI Overviews.",
    );
    doc.moveDown(0.4);

    const col1 = 54;
    const col2 = 150;
    const col3 = 250;
    const drawRow = (engine: string, status: string, detail: string, header = false) => {
      const height = Math.max(
        22,
        wrapLines(doc.font(header ? "Times-Bold" : "Times-Roman").fontSize(9), detail, pageWidth - 210) + 10,
      );
      if (doc.y + height > doc.page.height - 70) doc.addPage();
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
        .text(engine, col1 + 6, y + 5, { width: 90 });
      doc.text(status, col2, y + 5, { width: 92 });
      doc.fillColor(header ? INK : SOFT).text(detail, col3, y + 5, { width: pageWidth - 210 });
      doc.y = y + height;
      doc.moveTo(54, doc.y).lineTo(54 + pageWidth, doc.y).strokeColor(RULE).lineWidth(0.5).stroke();
    };

    drawRow("Engine", "Status", "Note", true);
    for (const engine of report.engines) {
      drawRow(engine.engine, engine.status, engine.detail);
    }

    doc.moveDown(1.1);
    ensureSpace(doc, 80);
    doc.fillColor(INK).font("Times-Bold").fontSize(16).text("Dimension breakdown");
    doc.moveDown(0.5);

    for (const dimension of report.dimensions) {
      const note = `${dimension.note} Weight ${dimension.weight}.`;
      const h = Math.max(28, wrapLines(doc.font("Times-Roman").fontSize(9), note, pageWidth - 150) + 12);
      if (doc.y + h > doc.page.height - 70) doc.addPage();
      const y = doc.y;
      doc.fillColor(INK).font("Times-Bold").fontSize(10).text(dimension.name, 54, y, { width: 120 });
      doc.fillColor(SOFT).font("Times-Roman").fontSize(9).text(note, 180, y, { width: pageWidth - 170 });
      doc.fillColor(toneColor(dimension.score)).font("Times-Bold").fontSize(16).text(
        String(dimension.score),
        54 + pageWidth - 36,
        y,
        { width: 36, align: "right" },
      );
      doc.y = y + h;
      doc.moveTo(54, doc.y).lineTo(54 + pageWidth, doc.y).strokeColor(RULE).lineWidth(0.5).stroke();
      doc.moveDown(0.25);
    }

    doc.moveDown(0.8);
    ensureSpace(doc, 80);
    doc.fillColor(INK).font("Times-Bold").fontSize(16).text("Ten fixes that would get this site cited");
    doc.moveDown(0.25);
    doc.fillColor(SOFT).font("Times-Italic").fontSize(9).text(
      "Ranked by expected citation lift, not by how good they look on a launch tweet.",
    );
    doc.moveDown(0.6);

    for (const fix of report.fixes) {
      const block =
        wrapLines(doc.font("Times-Bold").fontSize(12), `${fix.rank}. ${fix.title}`, pageWidth) +
        wrapLines(doc.font("Times-Roman").fontSize(9), `Why it matters. ${fix.why}`, pageWidth) +
        wrapLines(doc.font("Times-Roman").fontSize(9), `Do this. ${fix.doThis}`, pageWidth) +
        46;
      if (doc.y + Math.min(block, 90) > doc.page.height - 70) doc.addPage();
      const y = doc.y;
      doc.save();
      doc.roundedRect(54, y, pageWidth, 4, 0).fill(CREAM);
      doc.restore();
      doc.rect(54, y, pageWidth, 0.8).fill(RULE);
      doc.fillColor(INK).font("Times-Bold").fontSize(12).text(`${fix.rank}.  ${fix.title}`, 60, y + 10, {
        width: pageWidth - 20,
      });
      doc.fillColor(SOFT).font("Courier").fontSize(8).text(
        `${fix.impact} impact · ${fix.effort}  ·  ${fix.where}`,
        { width: pageWidth - 20 },
      );
      doc.moveDown(0.25);
      doc.fillColor(INK).font("Times-Bold").fontSize(9).text("Why it matters. ", { continued: true });
      doc.fillColor(SOFT).font("Times-Roman").text(fix.why, { width: pageWidth - 16 });
      doc.moveDown(0.15);
      doc.fillColor(INK).font("Times-Bold").fontSize(9).text("Do this. ", { continued: true });
      doc.fillColor(SOFT).font("Times-Roman").text(fix.doThis, { width: pageWidth - 16 });
      doc.moveDown(0.7);
    }

    footer();
    doc.end();
  });
}

function ensureSpace(doc: PDFKit.PDFDocument, min: number) {
  if (doc.y + min > doc.page.height - 70) doc.addPage();
}

export function reportFilename(report: AuditReport) {
  const slug = report.product
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `citescore-${slug || "audit"}.pdf`;
}
