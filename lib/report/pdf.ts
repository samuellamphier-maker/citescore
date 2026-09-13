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
const LEFT = 54;
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
      margins: { top: 48, bottom: BOTTOM, left: LEFT, right: LEFT },
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

    const width = doc.page.width - LEFT * 2;
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
        LEFT,
        y,
        { width: width - 48, lineBreak: false },
      );
      doc.text(String(pageNo), LEFT, y, {
        width,
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

    write(doc, LEFT, 30, report.sample ? "CITESCORE AUDIT  ·  SAMPLE" : "CITESCORE AUDIT", {
      font: "Courier",
      size: 9,
      color: COPPER,
      width: width * 0.55,
    });
    write(doc, LEFT + width * 0.55, 30, report.auditedAt, {
      font: "Courier",
      size: 9,
      color: SOFT,
      width: width * 0.45,
      align: "right",
    });

    const headerY = 52;
    write(doc, LEFT, headerY, report.product, {
      font: "Times-Bold",
      size: 26,
      color: INK,
      width: width - 130,
    });
    const afterTitle = doc.y + 4;
    write(doc, LEFT, afterTitle, report.oneLiner, {
      font: "Times-Italic",
      size: 12,
      color: SOFT,
      width: width - 130,
    });
    write(doc, LEFT, doc.y + 6, report.url, {
      font: "Courier",
      size: 8,
      color: SOFT,
      width: width - 130,
    });
    const afterMeta = doc.y;

    const boxX = LEFT + width - 108;
    const boxY = headerY;
    doc.save();
    doc.roundedRect(boxX, boxY, 108, 88, 8).lineWidth(1).strokeColor(RULE).stroke();
    doc.restore();
    write(doc, boxX, boxY + 14, String(report.overall), {
      font: "Times-Bold",
      size: 30,
      color: toneColor(report.overall),
      width: 108,
      align: "center",
    });
    write(doc, boxX, boxY + 48, "CITESCORE / 100", {
      font: "Courier",
      size: 7,
      color: SOFT,
      width: 108,
      align: "center",
    });
    write(doc, boxX, boxY + 64, report.grade, {
      font: "Times-Italic",
      size: 10,
      color: INK,
      width: 108,
      align: "center",
    });

    let y = Math.max(afterMeta, boxY + 104) + 8;
    y = line(doc, y, width);

    y = section(doc, y, width, "Executive read");
    y = paragraph(doc, y, width, report.summary, 11);
    y += 6;
    y = paragraph(doc, y, width, report.methodology, 9, true);

    y = section(doc, y, width, "Engine snapshot");
    y = paragraph(
      doc,
      y,
      width,
      "Inferred from on-page GEO signals. Not a live query of ChatGPT, Perplexity, or AI Overviews.",
      8,
      true,
    );
    y += 8;
    y = tableRow(doc, y, width, "Engine", "Status", "Note", true);
    for (const engine of report.engines) {
      y = tableRow(doc, y, width, engine.engine, engine.status, engine.detail, false);
    }

    y = section(doc, y, width, "Dimension breakdown");
    for (const dimension of report.dimensions) {
      const note = `${dimension.note} Weight ${dimension.weight}.`;
      const height = Math.max(28, doc.font("Times-Roman").fontSize(9).heightOfString(note, { width: width - 160 }) + 12);
      y = ensure(doc, y, height + 8);
      write(doc, LEFT, y, dimension.name, {
        font: "Times-Bold",
        size: 10,
        color: INK,
        width: 118,
      });
      write(doc, 178, y, note, {
        font: "Times-Roman",
        size: 9,
        color: SOFT,
        width: width - 168,
      });
      write(doc, LEFT + width - 36, y, String(dimension.score), {
        font: "Times-Bold",
        size: 16,
        color: toneColor(dimension.score),
        width: 36,
        align: "right",
      });
      y = line(doc, y + height, width);
    }

    y = section(doc, y, width, "Ten fixes that would get this site cited");
    y = paragraph(
      doc,
      y,
      width,
      "Ranked by expected citation lift, not by how good they look on a launch tweet.",
      9,
      true,
    );
    y += 10;

    for (const fix of report.fixes) {
      y = ensure(doc, y, 88);
      y = line(doc, y, width);
      y += 10;
      write(doc, LEFT, y, `${fix.rank}.  ${fix.title}`, {
        font: "Times-Bold",
        size: 12,
        color: INK,
        width,
      });
      y = doc.y + 4;
      write(doc, LEFT, y, `${fix.impact} impact · ${fix.effort}  ·  ${fix.where}`, {
        font: "Courier",
        size: 8,
        color: SOFT,
        width,
      });
      y = doc.y + 8;
      y = labeledBlock(doc, y, width, "Why it matters. ", fix.why);
      y += 4;
      y = labeledBlock(doc, y, width, "Do this. ", fix.doThis);
      y += 14;
    }

    doc.end();
  });
}

type WriteOpts = {
  font: string;
  size: number;
  color: string;
  width: number;
  align?: "left" | "center" | "right";
};

function write(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  text: string,
  opts: WriteOpts,
) {
  doc.font(opts.font).fontSize(opts.size).fillColor(opts.color);
  doc.text(text, x, y, {
    width: opts.width,
    align: opts.align ?? "left",
    lineGap: 2,
  });
}

function paragraph(
  doc: PDFKit.PDFDocument,
  y: number,
  width: number,
  text: string,
  size: number,
  italic = false,
) {
  y = ensure(doc, y, 36);
  write(doc, LEFT, y, text, {
    font: italic ? "Times-Italic" : "Times-Roman",
    size,
    color: SOFT,
    width,
  });
  return doc.y + 4;
}

function labeledBlock(doc: PDFKit.PDFDocument, y: number, width: number, label: string, text: string) {
  y = ensure(doc, y, 36);
  doc.font("Times-Bold").fontSize(9).fillColor(INK);
  doc.text(label, LEFT, y, { continued: true, width });
  doc.font("Times-Roman").fillColor(SOFT).text(text, { width });
  return doc.y + 2;
}

function section(doc: PDFKit.PDFDocument, y: number, width: number, title: string) {
  y = ensure(doc, y + 16, 40);
  write(doc, LEFT, y, title, {
    font: "Times-Bold",
    size: 16,
    color: INK,
    width,
  });
  return doc.y + 8;
}

function line(doc: PDFKit.PDFDocument, y: number, width: number) {
  doc.save();
  doc.moveTo(LEFT, y).lineTo(LEFT + width, y).strokeColor(RULE).lineWidth(0.6).stroke();
  doc.restore();
  return y + 2;
}

function tableRow(
  doc: PDFKit.PDFDocument,
  y: number,
  width: number,
  engine: string,
  status: string,
  detail: string,
  header: boolean,
) {
  const height = Math.max(
    22,
    doc.font(header ? "Times-Bold" : "Times-Roman").fontSize(9).heightOfString(detail, {
      width: width - 200,
    }) + 12,
  );
  y = ensure(doc, y, height + 6);
  if (header) {
    doc.save();
    doc.rect(LEFT, y, width, height).fill(CREAM);
    doc.restore();
  }
  write(doc, LEFT + 6, y + 5, engine, {
    font: header ? "Times-Bold" : "Times-Roman",
    size: 9,
    color: INK,
    width: 88,
  });
  write(doc, 150, y + 5, status, {
    font: header ? "Times-Bold" : "Times-Roman",
    size: 9,
    color: INK,
    width: 88,
  });
  write(doc, 244, y + 5, detail, {
    font: header ? "Times-Bold" : "Times-Roman",
    size: 9,
    color: header ? INK : SOFT,
    width: width - 200,
  });
  return line(doc, y + height, width);
}

function ensure(doc: PDFKit.PDFDocument, y: number, min: number) {
  if (y + min > doc.page.height - BOTTOM) {
    doc.addPage();
    return 48;
  }
  return y;
}

export function reportFilename(report: AuditReport) {
  const slug = report.product
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `citescore-${slug || "audit"}.pdf`;
}
