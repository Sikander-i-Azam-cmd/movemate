import { useState, useEffect } from "react"; console.log("new version");

function App() {
  const [view, setView] = useState("main");
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
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
      { id: 1, text: "Chase", link: "https://www.chase.com", status: "not_started" },
      { id: 2, text: "Bank of America", link: "https://www.bankofamerica.com", status: "not_started" },
      { id: 3, text: "Wells Fargo", link: "https://www.wellsfargo.com", status: "not_started" },
    ],
    "Credit Cards": [
      { id: 4, text: "Capital One", link: "https://www.capitalone.com", status: "not_started" },
      { id: 5, text: "American Express", link: "https://www.americanexpress.com", status: "not_started" },
    ],
    Insurance: [
      { id: 6, text: "State Farm", link: "https://www.statefarm.com", status: "not_started" },
    ],
    Utilities: [
      { id: 7, text: "Electric / Gas Provider", link: "https://www.google.com/search?q=electric+gas+provider+change+address", status: "not_started" },
    ],
    Subscriptions: [
      { id: 8, text: "Netflix", link: "https://www.netflix.com", status: "not_started" },
      { id: 9, text: "Spotify", link: "https://www.spotify.com", status: "not_started" },
    ],
    "Delivery Apps": [
      { id: 10, text: "Uber Eats", link: "https://www.ubereats.com", status: "not_started" },
    ],
    "Shopping / Ecommerce": [
      { id: 11, text: "Amazon", link: "https://www.amazon.com", status: "not_started" },
    ],
    "Government / DMV": [
      { id: 12, text: "DMV", link: "https://www.usa.gov/motor-vehicle-services", status: "not_started" },
    ],
    Healthcare: [
      { id: 13, text: "Health Insurance Provider", link: "https://www.google.com/search?q=health+insurance+provider+change+address", status: "not_started" },
    ],
    "Work / Payroll": [
      { id: 14, text: "Employer Payroll", link: "https://www.google.com/search?q=employer+payroll+change+address", status: "not_started" },
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

  const normalizeItem = ({ completed, ...item }) => ({
    ...item,
    status: item.status || (completed ? "completed" : "not_started"),
  });

  const mergeCategories = (defaults, saved = {}) =>
    Object.fromEntries(
      Object.entries(defaults).map(([cat, defaultItems]) => [
        cat,
        saved[cat] ? saved[cat].map(normalizeItem) : defaultItems,
      ])
    );

  const [categories, setCategories] = useState(() => {
    return defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem("movemate-categories", JSON.stringify(categories));
  }, [categories]);

  const getItemStatus = (item) => item.status || (item.completed ? "completed" : "not_started");

  const updateItemStatus = (cat, id, status) => {
    setCategories({
      ...categories,
      [cat]: categories[cat].map(i =>
        i.id === id ? { ...i, status } : i
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
        { id: Date.now(), text: name, link: finalLink, status: "not_started" },
      ],
    });

    setNewItem("");
  };

  const getCategoryProgress = (cat) => {
    const items = categories[cat];
    return {
      total: items.length,
      done: items.filter(i => getItemStatus(i) === "completed").length,
    };
  };

  const progress = (() => {
    const all = Object.values(categories).flat();
    const done = all.filter(i => getItemStatus(i) === "completed").length;
    return all.length ? Math.round((done / all.length) * 100) : 0;
  })();

  const savedName = `${firstName} ${lastName}`.trim();
  const savedAddress = [street, address2, city, state, zip, country].filter(Boolean).join(", ");

  const generateSummaryText = () => {
    let text = "MoveMate Checklist\n\n";
    Object.keys(categories).forEach(cat => {
      text += `${cat}\n`;
      categories[cat].forEach(item => {
        text += `${getItemStatus(item) === "completed" ? "✔" : "•"} ${item.text}\n`;
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
          const remaining = categories[cat].filter(i => getItemStatus(i) !== "completed");
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
    const selectedItem = items.find(i => i.id === selectedItemId);
    const selectedStatus = selectedItem ? getItemStatus(selectedItem) : "not_started";

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
          .map(item => {
            const itemStatus = getItemStatus(item);
            const itemRowStyle = item.id === selectedItemId
              ? selectedRow
              : itemStatus === "completed"
                ? completedRow
                : itemStatus === "in_progress"
                  ? inProgressRow
                  : row;

            return (
              <div
                key={item.id}
                style={itemRowStyle}
                onClick={() => {
                  setSelectedItemId(item.id);
                  if (itemStatus === "not_started") updateItemStatus(activeCategory, item.id, "in_progress");
                }}
              >
                <div>
                  <span style={itemStatus === "completed" ? checkmarkDone : checkmark}>
                    {itemStatus === "completed" ? "✓" : ""}
                  </span>
                  <span style={{ marginLeft: 8 }}>{item.text}</span>
                </div>

                <div style={{ display: "flex", gap: 20 }}>
                  {item.link && <a href={item.link} target="_blank" onClick={(e) => e.stopPropagation()}>Go</a>}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(activeCategory, item.id);
                    }}
                    style={dangerBtn}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}

        {selectedItem && (
          <div style={actionPanel}>
            <div style={actionHeader}>
              <div>
                <div style={eyebrow}>Guided action</div>
                <h3 style={actionTitle}>{selectedItem.text}</h3>
              </div>
              <span style={selectedStatus === "completed" ? statusDone : selectedStatus === "in_progress" ? statusProgress : statusOpen}>
                {selectedStatus === "completed" ? "Completed" : selectedStatus === "in_progress" ? "In progress" : "Not started"}
              </span>
            </div>

            <p style={actionCopy}>Go to this site and update your address.</p>

            {selectedItem.link && (
              <a href={selectedItem.link} target="_blank" style={primaryBtn}>
                Go to site
              </a>
            )}

            <div style={infoSection}>
              <strong>Saved info</strong>
              <div style={infoGrid}>
                <span style={infoLabel}>Name</span>
                <span style={infoValue}>{savedName}</span>
                <span style={infoLabel}>Email</span>
                <span style={infoValue}>{email}</span>
                <span style={infoLabel}>Phone</span>
                <span style={infoValue}>{phone}</span>
                <span style={infoLabel}>Address</span>
                <span style={infoValue}>{savedAddress}</span>
              </div>
            </div>

            <button
              onClick={() => {
                updateItemStatus(activeCategory, selectedItem.id, "completed");
              }}
              style={selectedStatus === "completed" ? secondaryBtn : primaryBtn}
            >
              Mark as Completed
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setSelectedItemId(null);
            setView("main");
          }}
          style={secondaryBtn}
        >
          Back
        </button>
      </Centered>
    );
  }

  // ---------------- MAIN ----------------
  return (
    <Centered>
      <h1>MoveMate</h1>

      <div style={profileCard}>
        <div style={profileHeader}>
          <div>
            <div style={eyebrow}>User address profile</div>
            <h2 style={profileTitle}>Your Move Profile</h2>
          </div>
          <button onClick={() => setIsEditingProfile(!isEditingProfile)} style={editBtn}>
            {isEditingProfile ? "Done" : "Edit"}
          </button>
        </div>

        {!isEditingProfile && (
          <div style={profileGrid}>
            <div style={profileItem}>
              <span style={infoLabel}>Full name</span>
              <strong style={profileValue}>{savedName}</strong>
            </div>
            <div style={profileItem}>
              <span style={infoLabel}>Email</span>
              <strong style={profileValue}>{email}</strong>
            </div>
            <div style={profileItem}>
              <span style={infoLabel}>Phone</span>
              <strong style={profileValue}>{phone}</strong>
            </div>
            <div style={profileItemWide}>
              <span style={infoLabel}>Full address</span>
              <strong style={profileValue}>{savedAddress}</strong>
            </div>
          </div>
        )}

        {isEditingProfile && (
          <div style={profileForm}>
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
          </div>
        )}
      </div>

      <p>Progress: {progress}%</p>

      {Object.keys(categories).map(cat => {
        const { total, done } = getCategoryProgress(cat);
        return (
          <button key={cat} style={categoryBtn} onClick={() => {
            setActiveCategory(cat);
            setSelectedItemId(null);
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

const selectedRow = {
  ...row,
  borderColor: "var(--accent-border)",
  background: "var(--accent-bg)",
  boxShadow: "var(--shadow-hover)",
};

const inProgressRow = {
  ...row,
  borderColor: "var(--accent-border)",
  background: "var(--accent-bg)",
};

const completedRow = {
  ...row,
  borderColor: "var(--success-border)",
  background: "var(--success-bg)",
  opacity: 0.72,
};

const checkmark = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18,
  height: 18,
  border: "1px solid var(--border-strong)",
  borderRadius: 6,
  color: "transparent",
  fontSize: 13,
  fontWeight: 900,
  verticalAlign: "middle",
};

const checkmarkDone = {
  ...checkmark,
  borderColor: "var(--success-border)",
  background: "var(--success-bg)",
  color: "#15803d",
};

const buttonBase = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "14px 18px",
  border: "1px solid transparent",
  borderRadius: 12,
  font: "inherit",
  fontWeight: 700,
  cursor: "pointer",
  boxSizing: "border-box",
  letterSpacing: 0,
  textDecoration: "none",
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

const actionPanel = {
  margin: "20px 0 18px",
  padding: 20,
  border: "1px solid var(--accent-border)",
  borderRadius: 12,
  background: "linear-gradient(180deg, var(--action-bg), var(--surface))",
  boxShadow: "var(--shadow-hover)",
};

const actionHeader = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 12,
};

const eyebrow = {
  color: "var(--accent)",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 0.4,
  textTransform: "uppercase",
};

const actionTitle = {
  margin: "2px 0 0",
  paddingTop: 0,
  borderTop: "none",
};

const statusOpen = {
  padding: "4px 10px",
  borderRadius: 999,
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
  fontSize: 12,
  fontWeight: 800,
  whiteSpace: "nowrap",
};

const statusProgress = {
  ...statusOpen,
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
};

const statusDone = {
  ...statusOpen,
  background: "var(--success-bg)",
  color: "#15803d",
};

const actionCopy = {
  marginBottom: 14,
};

const infoSection = {
  marginTop: 16,
  padding: 16,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "90px 1fr",
  gap: "8px 12px",
  marginTop: 12,
};

const infoLabel = {
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 700,
};

const infoValue = {
  color: "var(--text-h)",
  fontSize: 14,
  wordBreak: "break-word",
};

const profileCard = {
  marginBottom: 28,
  padding: 22,
  border: "1px solid var(--accent-border)",
  borderRadius: 12,
  background: "linear-gradient(180deg, var(--action-bg), var(--surface))",
  boxShadow: "var(--shadow-hover)",
};

const profileHeader = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 18,
};

const profileTitle = {
  margin: "2px 0 0",
  fontSize: 26,
};

const editBtn = {
  ...secondaryBtn,
  width: "auto",
  minWidth: 82,
  marginTop: 0,
  padding: "10px 14px",
};

const profileGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const profileItem = {
  padding: 14,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const profileItemWide = {
  ...profileItem,
  gridColumn: "1 / -1",
};

const profileValue = {
  display: "block",
  marginTop: 4,
  lineHeight: "140%",
  wordBreak: "break-word",
};

const profileForm = {
  paddingTop: 4,
};

export default App;
