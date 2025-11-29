import React, { useEffect, useState } from "react";

const navBtnStyle = {
  background: "transparent",
  border: "1px solid rgba(209,213,219,0.4)",
  color: "#e5e7eb",
  padding: "0.35rem 0.9rem",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "0.8rem",
};

const pillBtnStyle = {
  background: "#1d4ed8",
  border: "none",
  color: "#e5e7eb",
  padding: "0.4rem 0.9rem",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "0.8rem",
};

const pillOutlineBtnStyle = {
  ...pillBtnStyle,
  background: "transparent",
  border: "1px solid #4b5563",
};

function renderContent(blocks) {
  if (!Array.isArray(blocks)) return null;
  return blocks.map((block, i) => {
    if (block.type !== "paragraph") return null;
    const text = (block.children || []).map((c) => c.text).join("");
    return (
      <p
        key={i}
        style={{
          lineHeight: 1.6,
          marginBottom: "0.75rem",
          color: "#e5e7eb",
        }}
      >
        {text}
      </p>
    );
  });
}

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch("http://localhost:1337/api/articles");
        const json = await res.json();
        setArticles(json.data || []);
      } catch (err) {
        console.error("Failed to load articles", err);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "3rem" }}>
        Loading articles...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          padding: "1rem 2rem",
          borderBottom: "1px solid #1f2937",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(90deg,#0f172a,#1d4ed8)",
        }}
      >
        <h1 style={{ margin: 0 }}>DevOps Blog</h1>
        <nav style={{ display: "flex", gap: "0.75rem", fontSize: "0.9rem" }}>
          <button style={navBtnStyle}>Home</button>
          <button style={navBtnStyle}>Categories</button>
          <button style={navBtnStyle}>About</button>
          <button style={navBtnStyle}>Login</button>
        </nav>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem",
          flex: 1,
          width: "100%",
        }}
      >
        {articles.map((item) => (
          <article
            key={item.id}
            style={{
              background: "#020617",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              border: "1px solid #1f2937",
            }}
          >
            <h2 style={{ marginBottom: "0.25rem", color: "#bfdbfe" }}>
              {item.title}
            </h2>
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.85rem",
                marginBottom: "1rem",
              }}
            >
              {item.slug}
            </p>

            {renderContent(item.content)}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginTop: "1.25rem",
                fontSize: "0.85rem",
              }}
            >
              <button style={pillBtnStyle}>👍 Like</button>
              <button style={pillBtnStyle}>💬 Comment</button>
              <button style={pillBtnStyle}>🔖 Save</button>
              <button style={pillOutlineBtnStyle}>Login to interact</button>
            </div>
          </article>
        ))}
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          borderTop: "1px solid #1f2937",
          color: "#6b7280",
          fontSize: "0.8rem",
        }}
      >
        © {new Date().getFullYear()} DevOps Blog · Built with React &amp; Strapi
      </footer>
    </div>
  );
}

export default App;
