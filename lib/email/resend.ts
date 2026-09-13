import { Resend } from "resend";
import { appUrl, emailFrom, resendApiKey } from "@/lib/env";
import type { AuditJob } from "@/lib/jobs/types";
import type { AuditReport } from "@/lib/sample-report";
import { reportFilename } from "@/lib/report/pdf";
import { site } from "@/lib/site";

function client() {
  const key = resendApiKey();
  if (!key) throw new Error("RESEND_API_KEY is not set.");
  const from = emailFrom();
  if (!from) throw new Error("EMAIL_FROM is not set.");
  return { resend: new Resend(key), from };
}

function reportLinks(job: AuditJob) {
  const base = appUrl();
  return {
    web: `${base}/r/${job.downloadToken}`,
    pdf: `${base}/api/reports/${job.downloadToken}/pdf`,
  };
}

export async function sendReportEmail(job: AuditJob, report: AuditReport, pdf: Buffer) {
  const { resend, from } = client();
  const links = reportLinks(job);
  const filename = reportFilename(report);
  const { error } = await resend.emails.send({
    from,
    to: job.email,
    subject: `Your CiteScore audit for ${report.product} — ${report.overall}/100`,
    html: `
      <div style="font-family:Georgia,Times,serif;color:#1b1814;line-height:1.6;max-width:560px">
        <p style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#5c564c">CiteScore</p>
        <h1 style="font-weight:normal;font-size:28px;margin:8px 0 12px">Your audit is ready.</h1>
        <p>${report.product} scored <strong>${report.overall}/100</strong> (${report.grade}). The PDF is attached; the same report is on the web if you want to print it again.</p>
        <p><a href="${links.web}">Open the web report</a> · <a href="${links.pdf}">Download PDF</a></p>
        <p style="color:#5c564c;font-size:13px">${report.methodology}</p>
        <p style="color:#5c564c;font-size:13px">Paid ${site.priceLabel}. Refunds within 14 days if the file is missing, unreadable, or about the wrong URL.</p>
      </div>
    `,
    text: [
      `Your CiteScore audit for ${report.product} is ready.`,
      `Score: ${report.overall}/100 (${report.grade}).`,
      `Web: ${links.web}`,
      `PDF: ${links.pdf}`,
      "",
      report.methodology,
    ].join("\n"),
    attachments: [
      {
        filename,
        content: pdf,
      },
    ],
  });
  if (error) throw new Error(error.message);
}

export async function sendFailureEmail(job: AuditJob, reason: string) {
  const { resend, from } = client();
  const { error } = await resend.emails.send({
    from,
    to: job.email,
    subject: "We’re on your CiteScore audit",
    html: `
      <div style="font-family:Georgia,Times,serif;color:#1b1814;line-height:1.6;max-width:560px">
        <p style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#5c564c">CiteScore</p>
        <h1 style="font-weight:normal;font-size:28px;margin:8px 0 12px">We’re on it.</h1>
        <p>We received payment for an audit of <strong>${job.siteUrl || "your site"}</strong>, but the automatic run hit a snag. A human will finish or retry it — you do not need to pay again.</p>
        <p style="color:#5c564c;font-size:13px">${reason}</p>
        <p>If we cannot deliver a readable report on the right URL, email us within 14 days for a refund of ${site.priceLabel}.</p>
      </div>
    `,
    text: [
      "We’re on your CiteScore audit.",
      `URL: ${job.siteUrl || "(missing)"}`,
      reason,
      "You do not need to pay again. If we cannot deliver, reply within 14 days for a refund.",
    ].join("\n"),
  });
  if (error) throw new Error(error.message);
}

export function emailConfigured() {
  return Boolean(resendApiKey() && emailFrom());
}
