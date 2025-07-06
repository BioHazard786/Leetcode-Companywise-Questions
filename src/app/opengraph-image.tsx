import { ImageResponse } from "next/og";

export const alt = "LeetCode Company-wise Questions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: "bold" }}>
          🎯 LeetCode Practice
        </div>
        <div style={{ fontSize: 32, textAlign: "center", maxWidth: "80%" }}>
          Company-wise Questions • Algorithms • Data Structures
        </div>
        <div style={{ fontSize: 24, opacity: 0.8 }}>
          Practice coding interviews with problems from top tech companies
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
