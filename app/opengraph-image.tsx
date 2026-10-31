import { ImageResponse } from "next/og";
import { socialImageAlt, socialImageSize } from "@/lib/content/meta";
import { site } from "@/lib/site";

export const alt = socialImageAlt;
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f3eee4",
        }}
      >
        <div style={{ width: "100%", height: 16, background: "#b24a22" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            flexGrow: 1,
            padding: "56px 72px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: 3,
              color: "#5c564c",
            }}
          >
            FREE AI ANSWER SNAPSHOT
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 84, color: "#1b1814" }}>
              {site.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: 40,
                lineHeight: 1.25,
                color: "#2c5847",
              }}
            >
              {site.tagline}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5c564c" }}>
            Sold by {site.name}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
