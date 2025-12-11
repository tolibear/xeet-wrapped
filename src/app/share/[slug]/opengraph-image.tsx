import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Xeet Wrapped 2024";
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
          background: "linear-gradient(135deg, #000000 0%, #1a0000 50%, #0a0014 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Noise texture overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
            backgroundImage: 
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {/* Brand */}
          <div
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "#FF0033",
              marginBottom: 30,
              letterSpacing: "0.05em",
            }}
          >
            XEET WRAPPED
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            My 2024 on X
          </div>

          {/* Era badge */}
          <div
            style={{
              display: "flex",
              padding: "12px 32px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.1)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: "white",
              }}
            >
              The Builder Era
            </span>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 48,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                3,847
              </span>
              <span
                style={{
                  fontSize: 24,
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                Posts
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 48,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                1,923
              </span>
              <span
                style={{
                  fontSize: 24,
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                Replies
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 48,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                342
              </span>
              <span
                style={{
                  fontSize: 24,
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                Days Active
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: 50,
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Your year in review
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


