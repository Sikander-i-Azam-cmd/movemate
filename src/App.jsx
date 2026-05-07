import { useState, useEffect } from "react"; console.log("new version");

function App() {
  const [view, setView] = useState("main");
  const [activeCategory, setActiveCategory] = useState(null);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  // ---------------- USER INFO ----------------
  const [firstName, setFirstName] = useState(() => localStorage.getItem("mm-first") || "");
  const [lastName, setLastName] = useState(() => localStorage.getItem("mm-last") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("mm-email") || "");
  const [phone, setPhone] = useState(() => localStorage.getItem("mm-phone") || "");

  const [street, setStreet] = useState(() => localStorage.getItem("mm-street") || "");
  const [address2, setAddress2] = useState(() => localStorage.getItem("mm-address2") || "");
  const [city, setCity] = useState(() => localStorage.getItem("mm-city") || "");
  const [state, setState] = useState(() => localStorage.getItem("mm-state") || "");
  const [zip, setZip] = useState(() => localStorage.getItem("mm-zip") || "");
  const [country, setCountry] = useState(() => localStorage.getItem("mm-country") || "");

  useEffect(() => localStorage.setItem("mm-first", firstName), [firstName]);
  useEffect(() => localStorage.setItem("mm-last", lastName), [lastName]);
  useEffect(() => localStorage.setItem("mm-email", email), [email]);
  useEffect(() => localStorage.setItem("mm-phone", phone), [phone]);

  useEffect(() => localStorage.setItem("mm-street", street), [street]);
  useEffect(() => localStorage.setItem("mm-address2", address2), [address2]);
  useEffect(() => localStorage.setItem("mm-city", city), [city]);
  useEffect(() => localStorage.setItem("mm-state", state), [state]);
  useEffect(() => localStorage.setItem("mm-zip", zip), [zip]);
  useEffect(() => localStorage.setItem("mm-country", country), [country]);

  // ---------------- DATA ----------------
  const defaultCategories = {
    Banks: [
      { id: 1, text: "Chase", link: "https://www.chase.com", completed: false },
      { id: 2, text: "Bank of America", link: "https://www.bankofamerica.com", completed: false },
    ],
    "Delivery Apps": [
      { id: 3, text: "Uber Eats", link: "https://www.ubereats.com", completed: false },
    ],
    Subscriptions: [
      { id: 4, text: "Netflix", link: "https://www.netflix.com", completed: false },
    ],
  };

  // ---------------- UPDATED MASTER LISTS ----------------
  const masterLists = {
    Banks: [
      { name: "Chase", link: "https://www.chase.com" },
      { name: "Bank of America", link: "https://www.bankofamerica.com" },
      { name: "Wells Fargo", link: "https://www.wellsfargo.com" },
      { name: "Citibank", link: "https://www.citi.com" },
      { name: "US Bank", link: "https://www.usbank.com" },
      { name: "PNC Bank", link: "https://www.pnc.com" },
      { name: "TD Bank", link: "https://www.td.com" },
      { name: "Capital One", link: "https://www.capitalone.com" },
      { name: "Ally Bank", link: "https://www.ally.com" },
      { name: "Charles Schwab", link: "https://www.schwab.com" },
      { name: "Fidelity", link: "https://www.fidelity.com" },
      { name: "Goldman Sachs", link: "https://www.goldmansachs.com" },
      { name: "HSBC", link: "https://www.us.hsbc.com" },
      { name: "Regions Bank", link: "https://www.regions.com" },
      { name: "Fifth Third Bank", link: "https://www.53.com" },
    ],

    "Delivery Apps": [
      { name: "DoorDash", link: "https://www.doordash.com" },
      { name: "Uber Eats", link: "https://www.ubereats.com" },
      { name: "Grubhub", link: "https://www.grubhub.com" },
      { name: "Instacart", link: "https://www.instacart.com" },
      { name: "Postmates", link: "https://www.postmates.com" },
      { name: "Caviar", link: "https://www.trycaviar.com" },
      { name: "Seamless", link: "https://www.seamless.com" },
      { name: "Shipt", link: "https://www.shipt.com" },
      { name: "GoPuff", link: "https://www.gopuff.com" },
      { name: "FreshDirect", link: "https://www.freshdirect.com" },
      { name: "HelloFresh", link: "https://www.hellofresh.com" },
      { name: "Blue Apron", link: "https://www.blueapron.com" },
    ],

    Subscriptions: [
      { name: "Netflix", link: "https://www.netflix.com" },
      { name: "Spotify", link: "https://www.spotify.com" },
      { name: "Hulu", link: "https://www.hulu.com" },
      { name: "Disney+", link: "https://www.disneyplus.com" },
      { name: "Amazon Prime", link: "https://www.amazon.com/prime" },
      { name: "Apple Music", link: "https://www.apple.com/music" },
      { name: "YouTube Premium", link: "https://www.youtube.com/premium" },
      { name: "Max (HBO)", link: "https://www.max.com" },
      { name: "Peacock", link: "https://www.peacocktv.com" },
      { name: "Paramount+", link: "https://www.paramountplus.com" },
    ],
  };

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("movemate-categories");
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem("movemate-categories", JSON.stringify(categories));
  }, [categories]);

  const toggleItem = (cat, id) => {
    setCategories({
      ...categories,
      [cat]: categories[cat].map(i =>
        i.id === id ? { ...i, completed: !i.completed } : i
      ),
    });
  };

  const deleteItem = (cat, id) => {
    setCategories({
      ...categories,
      [cat]: categories[cat].filter(i => i.id !== id),
    });
  };

  const findLink = (name) => {
    const lower = name.toLowerCase();
    for (const cat in masterLists) {
      const match = masterLists[cat].find(i => i.name.toLowerCase() === lower);
      if (match) return match.link;
    }
    return `https://www.google.com/search?q=${encodeURIComponent(name + " change address")}`;
  };

  const addItem = (name, link = "") => {
    if (!name.trim()) return;

    const finalLink = link || findLink(name);

    setCategories({
      ...categories,
      [activeCategory]: [
        ...categories[activeCategory],
        { id: Date.now(), text: name, link: finalLink, completed: false },
      ],
    });

    setNewItem("");
  };

  const getCategoryProgress = (cat) => {
    const items = categories[cat];
    return {
      total: items.length,
      done: items.filter(i => i.completed).length,
    };
  };

  const progress = (() => {
    const all = Object.values(categories).flat();
    const done = all.filter(i => i.completed).length;
    return all.length ? Math.round((done / all.length) * 100) : 0;
  })();

  const generateSummaryText = () => {
    let text = "MoveMate Checklist\n\n";
    Object.keys(categories).forEach(cat => {
      text += `${cat}\n`;
      categories[cat].forEach(item => {
        text += `${item.completed ? "✔" : "•"} ${item.text}\n`;
      });
      text += "\n";
    });
    return text;
  };

  const downloadChecklist = () => {
    const blob = new Blob([generateSummaryText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "movemate-checklist.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyChecklist = () => {
    navigator.clipboard.writeText(generateSummaryText());
    alert("Checklist copied!");
  };

  // ---------------- SUMMARY ----------------
  if (view === "summary") {
    return (
      <Centered>
        <h2>Summary</h2>
        <p><strong>{progress}% complete</strong></p>

        {Object.keys(categories).map(cat => {
          const remaining = categories[cat].filter(i => !i.completed);
          if (!remaining.length) return null;

          return (
            <div key={cat}>
              <strong>{cat}</strong>
              {remaining.map(i => (
                <div key={i.id}>• {i.text}</div>
              ))}
            </div>
          );
        })}

        <button onClick={downloadChecklist} style={primaryBtn}>Download</button>
        <button onClick={copyChecklist} style={secondaryBtn}>Copy</button>
        <button onClick={() => setView("main")} style={secondaryBtn}>Back</button>
      </Centered>
    );
  }

  // ---------------- CATEGORY ----------------
  if (view === "category") {
    const items = categories[activeCategory];
    const existing = items.map(i => i.text.toLowerCase());

    const suggestions = (masterLists[activeCategory] || []).filter(item =>
      item.name.toLowerCase().includes(newItem.toLowerCase()) &&
      !existing.includes(item.name.toLowerCase())
    );

    return (
      <Centered>
        <h2>{activeCategory}</h2>

        <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} style={input} />

        <div style={{ position: "relative" }}>
          <input placeholder="Add new..." value={newItem} onChange={(e) => setNewItem(e.target.value)} style={input} />

          {newItem && suggestions.length > 0 && (
            <div style={suggestionBox}>
              {suggestions.map((item, i) => (
                <div key={i} style={suggestionItem} onClick={() => addItem(item.name, item.link)}>
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => addItem(newItem)} style={primaryBtn}>Add</button>

        {items
          .filter(i => i.text.toLowerCase().includes(search.toLowerCase()))
          .map(item => (
            <div key={item.id} style={row}>
              <div>
                <input type="checkbox" checked={item.completed} onChange={() => toggleItem(activeCategory, item.id)} />
                <span style={{ marginLeft: 8 }}>{item.text}</span>
              </div>

              <div style={{ display: "flex", gap: 20 }}>
                {item.link && <a href={item.link} target="_blank">Go</a>}
                <button onClick={() => deleteItem(activeCategory, item.id)} style={dangerBtn}>X</button>
              </div>
            </div>
          ))}

        <button onClick={() => setView("main")} style={secondaryBtn}>Back</button>
      </Centered>
    );
  }

  // ---------------- MAIN ----------------
  return (
    <Centered>
      <h1>MoveMate</h1>

      <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={input} />
      <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={input} />

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
      <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />

      <h3>New Address</h3>

      <input placeholder="Street Address" value={street} onChange={(e) => setStreet(e.target.value)} style={input} />
      <input placeholder="Address Line 2" value={address2} onChange={(e) => setAddress2(e.target.value)} style={input} />

      <div style={{ display: "flex", gap: 14 }}>
        <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} style={input} />
        <input placeholder="State" value={state} onChange={(e) => setState(e.target.value)} style={input} />
      </div>

      <div style={{ display: "flex", gap: 14 }}>
        <input placeholder="Zip" value={zip} onChange={(e) => setZip(e.target.value)} style={input} />
        <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} style={input} />
      </div>

      <p>Progress: {progress}%</p>

      {Object.keys(categories).map(cat => {
        const { total, done } = getCategoryProgress(cat);
        return (
          <button key={cat} style={categoryBtn} onClick={() => {
            setActiveCategory(cat);
            setView("category");
          }}>
            {cat} ({done}/{total})
          </button>
        );
      })}

      <button onClick={() => setView("summary")} style={primaryBtn}>
        Finish
      </button>
    </Centered>
  );
}

// ---------------- STYLES ----------------
const Centered = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center", padding: "64px 20px 80px" }}>
    <div style={panel}>{children}</div>
  </div>
);

const panel = {
  width: "min(100%, 560px)",
  padding: 36,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow)",
  boxSizing: "border-box",
  textAlign: "left",
};

const input = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: 14,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--input-bg)",
  color: "var(--text-h)",
  font: "inherit",
  boxSizing: "border-box",
  outlineColor: "var(--accent)",
  transition: "border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease, background-color 0.18s ease",
};

const row = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  padding: "14px 16px",
  marginBottom: 12,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--row-bg)",
  boxShadow: "var(--shadow-subtle)",
  transition: "border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease, background-color 0.18s ease",
};

const buttonBase = {
  width: "100%",
  padding: "14px 18px",
  border: "1px solid transparent",
  borderRadius: 12,
  font: "inherit",
  fontWeight: 700,
  cursor: "pointer",
  boxSizing: "border-box",
  letterSpacing: 0,
};

const categoryBtn = {
  ...buttonBase,
  marginBottom: 12,
  background: "var(--category-bg)",
  color: "var(--text-h)",
  borderColor: "var(--border)",
};

const primaryBtn = {
  ...buttonBase,
  marginTop: 14,
  background: "var(--accent)",
  color: "white",
  boxShadow: "0 10px 20px rgba(37, 99, 235, 0.18)",
};

const secondaryBtn = {
  ...buttonBase,
  marginTop: 12,
  background: "var(--secondary-bg)",
  color: "var(--text-h)",
  borderColor: "var(--border)",
};

const dangerBtn = {
  padding: "8px 12px",
  border: "1px solid rgba(220, 38, 38, 0.18)",
  borderRadius: 10,
  background: "#dc2626",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 8px 16px rgba(220, 38, 38, 0.16)",
};

const suggestionBox = {
  position: "absolute",
  zIndex: 5,
  top: "calc(100% - 10px)",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  width: "100%",
  boxShadow: "var(--shadow)",
  overflow: "hidden",
  boxSizing: "border-box",
};

const suggestionItem = {
  padding: "12px 14px",
  cursor: "pointer",
  color: "var(--text-h)",
  transition: "background-color 0.18s ease, color 0.18s ease",
};

export default App;
