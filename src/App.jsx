import { useState, useEffect } from "react"; console.log("new version");

function App() {
  const [activeCategory, setActiveCategory] = useState(() => localStorage.getItem("movemate-active-category") || null);
  const [selectedItemId, setSelectedItemId] = useState(() => {
    const savedItemId = Number(localStorage.getItem("movemate-selected-item"));
    return Number.isFinite(savedItemId) && savedItemId > 0 ? savedItemId : null;
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [copiedKey, setCopiedKey] = useState("");

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

  const onboardingSteps = ["Welcome", "Personal Info", "New Address", "Accounts", "Ready"];
  const onboardingCategoryOptions = [
    { key: "Banks", label: "Banks", description: "Checking, savings, and brokerage accounts" },
    { key: "Credit Cards", label: "Credit Cards", description: "Cards, statements, and billing addresses" },
    { key: "Utilities", label: "Utilities", description: "Electric, gas, water, and internet providers" },
    { key: "Government / DMV", label: "Government", description: "DMV, registration, and official records" },
    { key: "Shopping / Ecommerce", label: "Shopping", description: "Retail accounts and delivery addresses" },
    { key: "Subscriptions", label: "Subscriptions", description: "Streaming, memberships, and recurring services" },
    { key: "Delivery Apps", label: "Delivery Apps", description: "Food, grocery, and local delivery defaults" },
    { key: "Insurance", label: "Insurance", description: "Policy records and renewal notices" },
    { key: "Healthcare", label: "Healthcare", description: "Benefits, claims, and provider records" },
    { key: "Work / Payroll", label: "Work / Payroll", description: "HR, benefits, and tax documents" },
  ];

  const hasExistingMoveMateData = () =>
    localStorage.getItem("movemate-categories") ||
    localStorage.getItem("mm-first") ||
    localStorage.getItem("mm-last") ||
    localStorage.getItem("mm-email") ||
    localStorage.getItem("mm-phone") ||
    localStorage.getItem("mm-street");

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("movemate-categories");
    if (!savedCategories) return defaultCategories;

    try {
      return mergeCategories(defaultCategories, JSON.parse(savedCategories));
    } catch {
      return defaultCategories;
    }
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    const completedOnboarding = localStorage.getItem("movemate-onboarding-complete") === "true";
    const savedCategories = localStorage.getItem("movemate-categories");
    const savedStep = Number(localStorage.getItem("movemate-onboarding-step"));
    const finishedWizard = savedCategories && savedStep === onboardingSteps.length - 1;
    const startedOnboarding = localStorage.getItem("movemate-onboarding-step") || localStorage.getItem("movemate-onboarding-categories");
    return completedOnboarding || finishedWizard || (!startedOnboarding && Boolean(hasExistingMoveMateData()));
  });
  const [currentView, setCurrentView] = useState(() => (
    hasCompletedOnboarding ? (localStorage.getItem("movemate-current-view") || "welcome") : "onboarding"
  ));
  const [onboardingStep, setOnboardingStep] = useState(() => {
    const savedStep = Number(localStorage.getItem("movemate-onboarding-step"));
    return Number.isInteger(savedStep) && savedStep >= 0 && savedStep < onboardingSteps.length ? savedStep : 0;
  });
  const [selectedOnboardingCategories, setSelectedOnboardingCategories] = useState(() => {
    const savedSelection = localStorage.getItem("movemate-onboarding-categories");
    if (!savedSelection) return onboardingCategoryOptions.map(option => option.key);

    try {
      const parsed = JSON.parse(savedSelection);
      return Array.isArray(parsed) && parsed.length ? parsed : onboardingCategoryOptions.map(option => option.key);
    } catch {
      return onboardingCategoryOptions.map(option => option.key);
    }
  });

  useEffect(() => {
    if (!hasCompletedOnboarding) return;
    localStorage.setItem("movemate-categories", JSON.stringify(categories));
  }, [categories, hasCompletedOnboarding]);

  useEffect(() => {
    if (!hasCompletedOnboarding) return;
    localStorage.setItem("movemate-onboarding-complete", "true");
  }, [hasCompletedOnboarding]);

  useEffect(() => {
    if (!hasCompletedOnboarding) return;
    localStorage.setItem("movemate-current-view", currentView);
  }, [currentView, hasCompletedOnboarding]);

  useEffect(() => {
    if (activeCategory) {
      localStorage.setItem("movemate-active-category", activeCategory);
    } else {
      localStorage.removeItem("movemate-active-category");
    }
  }, [activeCategory]);

  useEffect(() => {
    if (selectedItemId) {
      localStorage.setItem("movemate-selected-item", String(selectedItemId));
    } else {
      localStorage.removeItem("movemate-selected-item");
    }
  }, [selectedItemId]);

  useEffect(() => {
    localStorage.setItem("movemate-onboarding-step", String(onboardingStep));
  }, [onboardingStep]);

  useEffect(() => {
    localStorage.setItem("movemate-onboarding-categories", JSON.stringify(selectedOnboardingCategories));
  }, [selectedOnboardingCategories]);

  const getItemStatus = (item) => item.status || (item.completed ? "completed" : "not_started");

  const getStatusLabel = (status) => {
    if (status === "completed") return "Completed";
    if (status === "in_progress") return "In progress";
    return "Not started";
  };

  const getEstimatedTime = (cat) => {
    const estimates = {
      Banks: "5-8 min",
      "Credit Cards": "4-7 min",
      Insurance: "8-12 min",
      Utilities: "10-15 min",
      Subscriptions: "2-4 min",
      "Delivery Apps": "2-4 min",
      "Shopping / Ecommerce": "3-5 min",
      "Government / DMV": "10-20 min",
      Healthcare: "8-12 min",
      "Work / Payroll": "5-10 min",
    };

    return estimates[cat] || "5-10 min";
  };

  const getSavedTimeEstimate = (cat) => {
    const higherImpactCategories = ["Government / DMV", "Insurance"];
    return higherImpactCategories.includes(cat) ? 6 : 3;
  };

  const getHelperText = (cat, name) => {
    const helpers = {
      Banks: `Updating ${name} helps make sure statements, replacement cards, and account notices reach your new address.`,
      "Credit Cards": `Keeping ${name} current helps prevent missed billing notices, card deliveries, and account verification issues.`,
      Insurance: `Your insurer needs the right address so policy documents, renewal notices, and coverage records stay accurate.`,
      Utilities: `Updating this provider helps avoid service interruptions, final bill confusion, or missed account notices.`,
      Subscriptions: `A current address keeps billing, deliveries, and account verification smooth after your move.`,
      "Delivery Apps": `Update ${name} so deliveries, saved addresses, and checkout defaults point to the right place.`,
      "Shopping / Ecommerce": `Keeping ${name} updated helps prevent packages from being sent to your old address.`,
      "Government / DMV": `Government records often drive mail, registration, and ID requirements, so this one is worth handling carefully.`,
      Healthcare: `A current address helps benefits, claims, provider records, and important health mail stay aligned.`,
      "Work / Payroll": `Payroll and HR need your current address for tax documents, benefits, and official employment records.`,
    };

    return helpers[cat] || `Updating ${name} helps important account notices and saved address details follow you to the right place.`;
  };

  const goToWelcome = () => {
    setCurrentView("welcome");
    setActiveCategory(null);
    setSelectedItemId(null);
    setSearch("");
    setNewItem("");
  };

  const closeDetailPanel = goToWelcome;

  const openProfile = () => {
    setCurrentView("profile");
    setActiveCategory(null);
    setSelectedItemId(null);
    setSearch("");
    setNewItem("");
  };

  const openChecklist = () => {
    setCurrentView("categories");
    setActiveCategory(null);
    setSelectedItemId(null);
    setSearch("");
    setNewItem("");
  };

  const findNextTask = (cat, currentId = null) => {
    const items = categories[cat] || [];
    const currentIndex = currentId ? items.findIndex(item => item.id === currentId) : -1;
    const afterCurrent = currentIndex >= 0 ? items.slice(currentIndex + 1) : items;
    if (!currentId) {
      return items.find(item => getItemStatus(item) !== "completed") || items[0] || null;
    }

    return (
      afterCurrent.find(item => getItemStatus(item) !== "completed") ||
      items.find(item => item.id !== currentId && getItemStatus(item) !== "completed") ||
      items.find(item => item.id !== currentId) ||
      null
    );
  };

  const openCategory = (cat) => {
    const nextTask = findNextTask(cat);
    setActiveCategory(cat);
    setSelectedItemId(nextTask ? nextTask.id : null);
    setSearch("");
    setNewItem("");
    if (nextTask && getItemStatus(nextTask) === "not_started") {
      updateItemStatus(cat, nextTask.id, "in_progress");
    }
    setCurrentView(nextTask ? "task" : "complete");
  };

  const goToNextTask = () => {
    if (!activeCategory) {
      setCurrentView("categories");
      return;
    }

    const nextTask = findNextTask(activeCategory, selectedItemId);
    if (nextTask) {
      setSelectedItemId(nextTask.id);
      if (getItemStatus(nextTask) === "not_started") {
        updateItemStatus(activeCategory, nextTask.id, "in_progress");
      }
      setCurrentView("task");
      return;
    }

    setCurrentView("complete");
  };

  const markSelectedTaskComplete = () => {
    if (!activeCategory || !selectedItemId) return;
    updateItemStatus(activeCategory, selectedItemId, "completed");
  };

  const openUpdatePage = (link) => {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  };

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
    const nextId = Math.max(0, ...Object.values(categories).flat().map(item => Number(item.id) || 0)) + 1;

    setCategories({
      ...categories,
      [activeCategory]: [
        ...categories[activeCategory],
        { id: nextId, text: name, link: finalLink, status: "not_started" },
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

  const progressStats = (() => {
    const categoryEntries = Object.entries(categories);
    const all = categoryEntries.flatMap(([, items]) => items);
    const completedCount = all.filter(i => getItemStatus(i) === "completed").length;
    const remainingCount = all.length - completedCount;
    const estimatedTimeSaved = categoryEntries.reduce((total, [cat, items]) => {
      const completedItems = items.filter(i => getItemStatus(i) === "completed").length;
      return total + completedItems * getSavedTimeEstimate(cat);
    }, 0);

    return {
      completedCount,
      remainingCount,
      estimatedTimeSaved,
    };
  })();

  const progressMessage = (() => {
    if (progressStats.completedCount === 0) {
      return "Start with one quick update to build momentum.";
    }

    if (progress === 100) {
      return "All set. Your move updates are complete.";
    }

    if (progress >= 70) {
      return "You're in the home stretch. A few important updates remain.";
    }

    if (progress >= 35) {
      return "Nice progress. Your most important accounts are getting aligned.";
    }

    return "Every completed update reduces missed mail and account friction.";
  })();

  const recommendedNextSteps = (() => {
    const priorityOrder = [
      "Government / DMV",
      "Utilities",
      "Banks",
      "Credit Cards",
      "Insurance",
      "Healthcare",
      "Work / Payroll",
      "Shopping / Ecommerce",
      "Delivery Apps",
      "Subscriptions",
    ];

    const categorySummaries = Object.entries(categories)
      .map(([cat, items]) => {
        const remaining = items.filter(i => getItemStatus(i) !== "completed");
        return {
          cat,
          remaining,
          remainingCount: remaining.length,
          priority: priorityOrder.indexOf(cat) === -1 ? priorityOrder.length : priorityOrder.indexOf(cat),
        };
      })
      .filter(summary => summary.remainingCount > 0)
      .sort((a, b) => a.priority - b.priority || b.remainingCount - a.remainingCount);

    const recommendations = [];
    const addRecommendation = (cat, title, description) => {
      if (recommendations.some(item => item.cat === cat) || recommendations.length >= 3) return;
      recommendations.push({ cat, title, description });
    };

    const government = categorySummaries.find(item => item.cat === "Government / DMV");
    if (government) {
      addRecommendation(
        government.cat,
        "Update DMV next",
        "Government records are often required for IDs, registration, and official mail."
      );
    }

    const utilities = categorySummaries.find(item => item.cat === "Utilities");
    if (utilities) {
      addRecommendation(
        utilities.cat,
        "Utilities are commonly forgotten",
        "Handle service providers early to avoid missed notices or billing confusion."
      );
    }

    const financialRemaining = ["Banks", "Credit Cards"].reduce((total, cat) => {
      const items = categories[cat] || [];
      return total + items.filter(i => getItemStatus(i) !== "completed").length;
    }, 0);
    const firstFinancialCategory = categorySummaries.find(item => ["Banks", "Credit Cards"].includes(item.cat));

    if (financialRemaining > 0 && firstFinancialCategory) {
      addRecommendation(
        firstFinancialCategory.cat,
        `You still have ${financialRemaining} financial ${financialRemaining === 1 ? "account" : "accounts"} remaining`,
        "Banks and cards are high-impact updates because they affect statements, cards, and verification."
      );
    }

    categorySummaries.forEach(({ cat, remainingCount }) => {
      addRecommendation(
        cat,
        `${cat} has ${remainingCount} ${remainingCount === 1 ? "task" : "tasks"} left`,
        "This category has the most remaining work and is a good next focus."
      );
    });

    if (!recommendations.length) {
      return [
        {
          cat: null,
          title: "Everything is complete",
          description: "Your checklist is wrapped up. You can download or copy your summary anytime.",
        },
      ];
    }

    return recommendations.slice(0, 3);
  })();

  const commonlyForgotten = [
    {
      cat: "Utilities",
      title: "Utilities and service providers",
      description: "Avoid billing confusion and missed notices after your move.",
    },
    {
      cat: "Government / DMV",
      title: "DMV and government records",
      description: "Keep registration, IDs, and official mail aligned.",
    },
    {
      cat: "Healthcare",
      title: "Healthcare and benefits",
      description: "Update benefits, claims, and provider records before mail gets missed.",
    },
  ].filter(item => categories[item.cat]?.some(task => getItemStatus(task) !== "completed"));

  const savedName = `${firstName} ${lastName}`.trim();
  const savedAddress = [street, address2, city, state, zip, country].filter(Boolean).join(", ");
  const fullProfileText = [
    savedName && `Name: ${savedName}`,
    email && `Email: ${email}`,
    phone && `Phone: ${phone}`,
    savedAddress && `Address: ${savedAddress}`,
  ].filter(Boolean).join("\n");

  const copyText = (key, text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => {
      setCopiedKey(currentKey => currentKey === key ? "" : currentKey);
    }, 1400);
  };

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

  const goToNextOnboardingStep = () => {
    setOnboardingStep(step => Math.min(step + 1, onboardingSteps.length - 1));
  };

  const goToPreviousOnboardingStep = () => {
    setOnboardingStep(step => Math.max(step - 1, 0));
  };

  const toggleOnboardingCategory = (cat) => {
    setSelectedOnboardingCategories(selected => (
      selected.includes(cat)
        ? selected.filter(item => item !== cat)
        : [...selected, cat]
    ));
  };

  const completeOnboarding = () => {
    const selectedCategories = selectedOnboardingCategories.length
      ? selectedOnboardingCategories
      : onboardingCategoryOptions.map(option => option.key);

    const personalizedCategories = Object.fromEntries(
      Object.entries(defaultCategories).filter(([cat]) => selectedCategories.includes(cat))
    );

    localStorage.setItem("movemate-categories", JSON.stringify(personalizedCategories));
    localStorage.setItem("movemate-onboarding-complete", "true");
    localStorage.setItem("movemate-onboarding-step", String(onboardingSteps.length - 1));
    setCategories(personalizedCategories);
    setCurrentView("welcome");
    setActiveCategory(null);
    setSelectedItemId(null);
    setSearch("");
    setNewItem("");
    setOnboardingStep(onboardingSteps.length - 1);
    setHasCompletedOnboarding(true);
  };

  const onboardingProgress = Math.round(((onboardingStep + 1) / onboardingSteps.length) * 100);
  const renderedView = (() => {
    if (!hasCompletedOnboarding || currentView === "onboarding") return "onboarding";
    if (currentView === "profile") return "profile";
    if (["categories", "checklist", "category"].includes(currentView)) return "categories";
    if (
      currentView === "task" &&
      activeCategory &&
      categories[activeCategory] &&
      categories[activeCategory].some(item => item.id === selectedItemId)
    ) return "task";
    if (currentView === "complete") return "complete";
    return "welcome";
  })();

  if (renderedView === "onboarding") {
    const isAccountStep = onboardingStep === 3;
    const canContinue = !isAccountStep || selectedOnboardingCategories.length > 0;

    return (
      <OnboardingShell>
        <div style={wizardTopline}>
          <span style={eyebrow}>MoveMate setup</span>
          <span style={wizardStepCount}>Step {onboardingStep + 1} of {onboardingSteps.length}</span>
        </div>

        <div style={wizardProgressTrack}>
          <div style={{ ...wizardProgressFill, width: `${onboardingProgress}%` }} />
        </div>

        <div style={wizardStepDots}>
          {onboardingSteps.map((step, index) => (
            <span
              key={step}
              style={index <= onboardingStep ? wizardStepDotActive : wizardStepDot}
            >
              {index + 1}
            </span>
          ))}
        </div>

        {onboardingStep === 0 && (
          <div style={wizardHero}>
            <span style={wizardBadge}>Personalized move checklist</span>
            <h1 style={wizardTitle}>Make your address updates feel manageable.</h1>
            <p style={wizardCopy}>
              MoveMate builds a focused checklist for the accounts, services, and records that need your new address after a move.
            </p>
            <div style={wizardFeatureGrid}>
              <div style={wizardFeature}>
                <strong>Guided tasks</strong>
                <span>See what to update first and why it matters.</span>
              </div>
              <div style={wizardFeature}>
                <strong>Saved profile</strong>
                <span>Keep your move details ready for quick copying.</span>
              </div>
            </div>
            <button onClick={goToNextOnboardingStep} style={wizardPrimaryBtn}>
              Start Your Move
            </button>
          </div>
        )}

        {onboardingStep === 1 && (
          <div>
            <h1 style={wizardTitle}>Tell us who is moving.</h1>
            <p style={wizardCopy}>This information stays in your browser and helps you copy common details while updating accounts.</p>
            <div style={wizardTwoColumn}>
              <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={input} />
              <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={input} />
            </div>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
            <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={input} />
          </div>
        )}

        {onboardingStep === 2 && (
          <div>
            <h1 style={wizardTitle}>Add your new address.</h1>
            <p style={wizardCopy}>MoveMate will keep this ready for account updates, forms, and quick reference.</p>
            <input placeholder="Street Address" value={street} onChange={(e) => setStreet(e.target.value)} style={input} />
            <div style={wizardTwoColumn}>
              <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} style={input} />
              <input placeholder="State" value={state} onChange={(e) => setState(e.target.value)} style={input} />
            </div>
            <div style={wizardTwoColumn}>
              <input placeholder="Zip" value={zip} onChange={(e) => setZip(e.target.value)} style={input} />
              <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} style={input} />
            </div>
          </div>
        )}

        {onboardingStep === 3 && (
          <div>
            <h1 style={wizardTitle}>Choose the accounts that apply.</h1>
            <p style={wizardCopy}>Your dashboard will start with these categories. You can add or delete checklist items later.</p>
            <div style={wizardCategoryGrid}>
              {onboardingCategoryOptions.map(option => {
                const isSelected = selectedOnboardingCategories.includes(option.key);
                return (
                  <button
                    key={option.key}
                    onClick={() => toggleOnboardingCategory(option.key)}
                    style={isSelected ? wizardCategorySelected : wizardCategory}
                  >
                    <span style={isSelected ? wizardCheckSelected : wizardCheck}>
                      {isSelected ? "✓" : ""}
                    </span>
                    <span style={wizardCategoryText}>
                      <strong>{option.label}</strong>
                      <span>{option.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {onboardingStep === 4 && (
          <div style={wizardHero}>
            <span style={wizardBadge}>Checklist ready</span>
            <h1 style={wizardTitle}>Your personalized moving checklist is ready.</h1>
            <p style={wizardCopy}>
              You selected {selectedOnboardingCategories.length || onboardingCategoryOptions.length} categories. Your guided workflow is ready with progress tracking, focused tasks, and copy-ready move details.
            </p>
            <div style={wizardSummaryCard}>
              <span style={infoLabel}>Selected categories</span>
              <strong style={wizardSummaryValue}>
                {(selectedOnboardingCategories.length ? selectedOnboardingCategories : onboardingCategoryOptions.map(option => option.key)).join(", ")}
              </strong>
            </div>
            <button onClick={completeOnboarding} style={wizardPrimaryBtn}>
              Enter Guided Flow
            </button>
          </div>
        )}

        {onboardingStep > 0 && onboardingStep < 4 && (
          <div style={wizardActions}>
            <button onClick={goToPreviousOnboardingStep} style={wizardSecondaryBtn}>
              Back
            </button>
            <button onClick={goToNextOnboardingStep} style={canContinue ? wizardPrimaryBtn : wizardPrimaryBtnDisabled} disabled={!canContinue}>
              Continue
            </button>
          </div>
        )}

        {onboardingStep === 4 && (
          <button onClick={goToPreviousOnboardingStep} style={wizardSecondaryBtn}>
            Back
          </button>
        )}
      </OnboardingShell>
    );
  }

  // ---------------- PROFILE ----------------
  if (renderedView === "profile") {
    return (
      <Centered>
        <div style={workspaceHeader}>
          <div>
            <div style={eyebrow}>Step 2 of 5</div>
            <h1 style={workspaceTitle}>Confirm your move profile</h1>
          </div>
          <button onClick={goToWelcome} style={editBtn}>Back</button>
        </div>

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
                <strong style={profileValue}>{savedName || "Not added yet"}</strong>
              </div>
              <div style={profileItem}>
                <span style={infoLabel}>Email</span>
                <strong style={profileValue}>{email || "Not added yet"}</strong>
              </div>
              <div style={profileItem}>
                <span style={infoLabel}>Phone</span>
                <strong style={profileValue}>{phone || "Not added yet"}</strong>
              </div>
              <div style={profileItemWide}>
                <span style={infoLabel}>Full address</span>
                <strong style={profileValue}>{savedAddress || "Not added yet"}</strong>
              </div>
            </div>
          )}

          {!isEditingProfile && (
            <div style={quickCopySection}>
              <button onClick={() => copyText("profile-address", savedAddress)} style={copiedKey === "profile-address" ? copyBtnDone : copyBtn}>
                {copiedKey === "profile-address" ? "Copied!" : "Copy Full Address"}
              </button>
              <button onClick={() => copyText("profile-email", email)} style={copiedKey === "profile-email" ? copyBtnDone : copyBtn}>
                {copiedKey === "profile-email" ? "Copied!" : "Copy Email"}
              </button>
              <button onClick={() => copyText("profile-phone", phone)} style={copiedKey === "profile-phone" ? copyBtnDone : copyBtn}>
                {copiedKey === "profile-phone" ? "Copied!" : "Copy Phone"}
              </button>
              <button onClick={() => copyText("profile-full", fullProfileText)} style={copiedKey === "profile-full" ? copyBtnDone : copyBtn}>
                {copiedKey === "profile-full" ? "Copied!" : "Copy Full Profile"}
              </button>
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

        <button onClick={openChecklist} style={primaryBtn}>
          Continue to Categories
        </button>
      </Centered>
    );
  }

  // ---------------- CATEGORY SELECTION ----------------
  if (renderedView === "categories") {
    return (
      <Centered>
        <div style={workspaceHeader}>
          <div>
            <div style={eyebrow}>Step 3 of 5</div>
            <h1 style={workspaceTitle}>Choose what to update next</h1>
          </div>
          <span style={progressBadge}>{progress}% complete</span>
        </div>

        <p style={progressCopy}>Select a category and MoveMate will guide you through one task at a time.</p>

        <div style={checklistOverviewCard}>
          <div style={recommendationHeader}>
            <div>
              <div style={eyebrow}>Checklist overview</div>
              <h2 style={recommendationTitle}>All update categories</h2>
            </div>
            <span style={recommendationBadge}>{Object.keys(categories).length}</span>
          </div>

          {Object.keys(categories).map(cat => {
            const { total, done } = getCategoryProgress(cat);
            return (
              <button key={cat} style={categoryBtn} onClick={() => {
                openCategory(cat);
              }}>
                {cat} ({done}/{total})
              </button>
            );
          })}
        </div>

        <button onClick={openProfile} style={secondaryBtn}>
          Back to Move Profile
        </button>
      </Centered>
    );
  }

  // ---------------- TASK ----------------
  if (renderedView === "task") {
    const selectedItem = categories[activeCategory].find(i => i.id === selectedItemId);
    const selectedStatus = getItemStatus(selectedItem);

    return (
      <Centered>
        <div style={workspaceHeader}>
          <div>
            <div style={eyebrow}>Step 4 of 5</div>
            <h1 style={workspaceTitle}>{selectedItem.text}</h1>
          </div>
          <span style={selectedStatus === "completed" ? statusDone : selectedStatus === "in_progress" ? statusProgress : statusOpen}>
            {getStatusLabel(selectedStatus)}
          </span>
        </div>

        <div style={detailModal}>
          <p style={actionCopy}>{getHelperText(activeCategory, selectedItem.text)}</p>

          <div style={detailGrid}>
            <div style={detailStat}>
              <span style={infoLabel}>Category</span>
              <strong style={detailValue}>{activeCategory}</strong>
            </div>
            <div style={detailStat}>
              <span style={infoLabel}>Estimated time</span>
              <strong style={detailValue}>{getEstimatedTime(activeCategory)}</strong>
            </div>
          </div>

          <div style={linkCard}>
            <span style={infoLabel}>Direct update link</span>
            <a href={selectedItem.link} target="_blank" rel="noreferrer" style={detailLink}>
              {selectedItem.link}
            </a>
          </div>

          <div style={infoSection}>
            <strong>Saved info</strong>
            <div style={infoGrid}>
              <span style={infoLabel}>Name</span>
              <span style={infoValue}>{savedName || "Not added yet"}</span>
              <span style={infoLabel}>Email</span>
              <span style={infoValue}>{email || "Not added yet"}</span>
              <span style={infoLabel}>Phone</span>
              <span style={infoValue}>{phone || "Not added yet"}</span>
              <span style={infoLabel}>Address</span>
              <span style={infoValue}>{savedAddress || "Not added yet"}</span>
            </div>

            <div style={quickCopySectionCompact}>
              <button onClick={() => copyText("detail-address", savedAddress)} style={copiedKey === "detail-address" ? copyBtnDone : copyBtn}>
                {copiedKey === "detail-address" ? "Copied!" : "Copy Full Address"}
              </button>
              <button onClick={() => copyText("detail-email", email)} style={copiedKey === "detail-email" ? copyBtnDone : copyBtn}>
                {copiedKey === "detail-email" ? "Copied!" : "Copy Email"}
              </button>
              <button onClick={() => copyText("detail-phone", phone)} style={copiedKey === "detail-phone" ? copyBtnDone : copyBtn}>
                {copiedKey === "detail-phone" ? "Copied!" : "Copy Phone"}
              </button>
              <button onClick={() => copyText("detail-full", fullProfileText)} style={copiedKey === "detail-full" ? copyBtnDone : copyBtn}>
                {copiedKey === "detail-full" ? "Copied!" : "Copy Full Profile"}
              </button>
            </div>
          </div>

          <div style={modalActions}>
            <button onClick={() => openUpdatePage(selectedItem.link)} style={primaryBtn}>
              Open Update Page
            </button>
            <button
              onClick={markSelectedTaskComplete}
              style={selectedStatus === "completed" ? secondaryBtn : primaryBtn}
            >
              Mark Completed
            </button>
            <button onClick={goToNextTask} style={secondaryBtn}>
              Next Task
            </button>
            <button onClick={openChecklist} style={secondaryBtn}>
              Choose Another Category
            </button>
          </div>
        </div>
      </Centered>
    );
  }

  // ---------------- CATEGORY ----------------
  if (renderedView === "category") {
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
                  setCurrentView("task");
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
                      if (selectedItemId === item.id) closeDetailPanel();
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

        <button
          onClick={() => {
            openChecklist();
          }}
          style={secondaryBtn}
        >
          Back
        </button>
      </Centered>
    );
  }

  if (renderedView === "complete") {
    return (
      <Centered>
        <div style={summaryCard}>
          <div style={eyebrow}>Step 5 of 5</div>
          <h2 style={summaryTitle}>Completion / Progress</h2>
          <p><strong>{progress}% complete</strong></p>

          {Object.keys(categories).map(cat => {
            const remaining = categories[cat].filter(i => getItemStatus(i) !== "completed");
            if (!remaining.length) return null;

            return (
              <div key={cat} style={summaryGroup}>
                <strong>{cat}</strong>
                {remaining.map(i => (
                  <div key={i.id}>• {i.text}</div>
                ))}
              </div>
            );
          })}

          <div style={quickActionsGrid}>
            <button onClick={downloadChecklist} style={primaryBtn}>Download</button>
            <button onClick={copyChecklist} style={secondaryBtn}>Copy</button>
            <button onClick={openChecklist} style={secondaryBtn}>Continue Updating</button>
            <button onClick={goToWelcome} style={secondaryBtn}>Back to Overview</button>
          </div>
        </div>

        <div style={commonlyForgottenCard}>
          <div style={recommendationHeader}>
            <div>
              <div style={eyebrow}>Commonly forgotten</div>
              <h2 style={recommendationTitle}>Worth double-checking</h2>
            </div>
            <span style={recommendationBadge}>{commonlyForgotten.length}</span>
          </div>

          <div style={recommendationList}>
            {(commonlyForgotten.length ? commonlyForgotten : [
              {
                cat: null,
                title: "Nothing urgent is hiding here",
                description: "Your commonly forgotten categories are either complete or not part of this checklist.",
              },
            ]).map(item => (
              <button
                key={item.title}
                onClick={() => item.cat && openCategory(item.cat)}
                style={item.cat ? recommendationItem : recommendationItemStatic}
              >
                <span style={recommendationText}>
                  <strong style={recommendationItemTitle}>{item.title}</strong>
                  <span style={recommendationDescription}>{item.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div style={recommendationCard}>
          <div style={recommendationHeader}>
            <div>
              <div style={eyebrow}>Recommended next</div>
              <h2 style={recommendationTitle}>Focus your next update</h2>
            </div>
            <span style={recommendationBadge}>{recommendedNextSteps.length}</span>
          </div>

          <div style={recommendationList}>
            {recommendedNextSteps.map((item, index) => (
              <button
                key={`${item.cat || "complete"}-${item.title}`}
                onClick={() => item.cat && openCategory(item.cat)}
                style={item.cat ? recommendationItem : recommendationItemStatic}
              >
                <span style={recommendationIcon}>{index + 1}</span>
                <span style={recommendationText}>
                  <strong style={recommendationItemTitle}>{item.title}</strong>
                  <span style={recommendationDescription}>{item.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </Centered>
    );
  }

  // ---------------- MAIN ----------------
  return (
    <Centered>
      <div style={dashboardHero}>
        <div>
          <div style={eyebrow}>Step 1 of 5</div>
          <h1 style={dashboardTitle}>Ready to update your move details?</h1>
          <p style={dashboardIntro}>
            MoveMate guides you through your profile, categories, and one address-update task at a time.
          </p>
        </div>
        <span style={dashboardScore}>{progress}%</span>
      </div>

      <div style={dashboardStatsGrid}>
        <div style={dashboardStat}>
          <span style={infoLabel}>Progress summary</span>
          <strong style={dashboardStatValue}>{progressStats.completedCount} of {progressStats.completedCount + progressStats.remainingCount} updates complete</strong>
        </div>
        <div style={dashboardStat}>
          <span style={infoLabel}>Estimated time saved</span>
          <strong style={dashboardStatValue}>{progressStats.estimatedTimeSaved} minutes</strong>
        </div>
        <div style={dashboardStat}>
          <span style={infoLabel}>Remaining work</span>
          <strong style={dashboardStatValue}>{progressStats.remainingCount} important {progressStats.remainingCount === 1 ? "account" : "accounts"}</strong>
        </div>
      </div>

      <div style={progressCard}>
        <div style={progressHeader}>
          <div>
            <div style={eyebrow}>Move progress</div>
            <h2 style={progressTitle}>{progress}% complete</h2>
          </div>
          <span style={progressBadge}>{progressStats.completedCount} done</span>
        </div>

        <p style={progressCopy}>{progressMessage}</p>

        <div style={progressBarTrack}>
          <div style={{ ...progressBarFill, width: `${progress}%` }} />
        </div>

        <div style={progressStatsGrid}>
          <div style={progressStatItem}>
            <span style={infoLabel}>Completed updates</span>
            <strong style={progressStatValue}>
              You've completed {progressStats.completedCount} {progressStats.completedCount === 1 ? "update" : "updates"}
            </strong>
          </div>
          <div style={progressStatItem}>
            <span style={infoLabel}>Estimated time saved</span>
            <strong style={progressStatValue}>{progressStats.estimatedTimeSaved} minutes</strong>
          </div>
          <div style={progressStatItemWide}>
            <span style={infoLabel}>Remaining important accounts</span>
            <strong style={progressStatValue}>
              {progressStats.remainingCount} important {progressStats.remainingCount === 1 ? "account" : "accounts"} remaining
            </strong>
          </div>
        </div>
      </div>

      <button onClick={openProfile} style={primaryBtn}>
        Start Guided Flow
      </button>
      <button onClick={openChecklist} style={secondaryBtn}>
        Choose a Category
      </button>
      <button onClick={() => setCurrentView("complete")} style={secondaryBtn}>
        View Progress
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

const OnboardingShell = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center", padding: "64px 20px 80px" }}>
    <div style={wizardPanel}>{children}</div>
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

const wizardPanel = {
  ...panel,
  width: "min(100%, 720px)",
  padding: 42,
  borderColor: "var(--accent-border)",
  background: "linear-gradient(180deg, var(--action-bg), var(--surface) 34%)",
};

const wizardTopline = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 12,
};

const wizardStepCount = {
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 800,
  whiteSpace: "nowrap",
};

const wizardProgressTrack = {
  width: "100%",
  height: 10,
  overflow: "hidden",
  border: "1px solid var(--border)",
  borderRadius: 999,
  background: "var(--secondary-bg)",
};

const wizardProgressFill = {
  height: "100%",
  borderRadius: 999,
  background: "var(--accent)",
  transition: "width 0.28s ease",
};

const wizardStepDots = {
  display: "flex",
  gap: 8,
  margin: "18px 0 32px",
};

const wizardStepDot = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  border: "1px solid var(--border)",
  borderRadius: 999,
  background: "var(--surface)",
  color: "var(--text)",
  fontSize: 13,
  fontWeight: 900,
};

const wizardStepDotActive = {
  ...wizardStepDot,
  borderColor: "var(--accent-border)",
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
};

const wizardHero = {
  display: "grid",
  gap: 16,
};

const wizardBadge = {
  display: "inline-flex",
  width: "fit-content",
  padding: "6px 10px",
  border: "1px solid var(--accent-border)",
  borderRadius: 999,
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
  fontSize: 13,
  fontWeight: 900,
};

const wizardTitle = {
  margin: 0,
  fontSize: 40,
  lineHeight: "110%",
};

const wizardCopy = {
  margin: "0 0 8px",
  fontSize: 17,
  lineHeight: "155%",
};

const wizardFeatureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: 12,
  margin: "2px 0 4px",
};

const wizardFeature = {
  display: "grid",
  gap: 4,
  padding: 16,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const wizardTwoColumn = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 14,
};

const wizardCategoryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: 12,
};

const wizardCategory = {
  display: "flex",
  width: "100%",
  minHeight: 94,
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 12,
  marginTop: 0,
  padding: 16,
  border: "1px solid var(--border)",
  borderRadius: 12,
  font: "inherit",
  fontWeight: 700,
  cursor: "pointer",
  boxSizing: "border-box",
  letterSpacing: 0,
  textDecoration: "none",
  borderColor: "var(--border)",
  background: "var(--surface)",
  color: "var(--text-h)",
  textAlign: "left",
};

const wizardCategorySelected = {
  ...wizardCategory,
  borderColor: "var(--accent-border)",
  background: "var(--accent-bg)",
};

const wizardCheck = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  border: "1px solid var(--border-strong)",
  borderRadius: 8,
  color: "transparent",
  fontSize: 14,
  fontWeight: 900,
  flex: "0 0 auto",
};

const wizardCheckSelected = {
  ...wizardCheck,
  borderColor: "var(--accent)",
  background: "var(--accent)",
  color: "white",
};

const wizardCategoryText = {
  display: "grid",
  gap: 4,
  color: "var(--text)",
  fontSize: 14,
  lineHeight: "140%",
};

const wizardActions = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 12,
  marginTop: 26,
};

const wizardPrimaryBtn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: 54,
  marginTop: 0,
  padding: "14px 18px",
  border: "1px solid transparent",
  borderRadius: 12,
  background: "var(--accent)",
  color: "white",
  boxShadow: "0 10px 20px rgba(37, 99, 235, 0.18)",
  font: "inherit",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  boxSizing: "border-box",
  letterSpacing: 0,
  textDecoration: "none",
};

const wizardPrimaryBtnDisabled = {
  ...wizardPrimaryBtn,
  opacity: 0.5,
  cursor: "not-allowed",
};

const wizardSecondaryBtn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: 54,
  marginTop: 0,
  padding: "14px 18px",
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--secondary-bg)",
  color: "var(--text-h)",
  font: "inherit",
  fontWeight: 700,
  cursor: "pointer",
  boxSizing: "border-box",
  letterSpacing: 0,
  textDecoration: "none",
};

const wizardSummaryCard = {
  display: "grid",
  gap: 6,
  padding: 18,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const wizardSummaryValue = {
  lineHeight: "150%",
};

const summaryCard = {
  marginBottom: 28,
  padding: 22,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-hover)",
};

const summaryTitle = {
  marginBottom: 12,
};

const summaryGroup = {
  marginBottom: 12,
};

const dashboardHero = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 18,
  marginBottom: 24,
};

const dashboardTitle = {
  margin: "2px 0 10px",
};

const workspaceHeader = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 12,
};

const workspaceTitle = {
  margin: "2px 0 0",
};

const dashboardIntro = {
  marginBottom: 0,
  fontSize: 16,
};

const dashboardScore = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 72,
  height: 72,
  border: "1px solid var(--accent-border)",
  borderRadius: 18,
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
  fontSize: 22,
  fontWeight: 900,
  flex: "0 0 auto",
};

const dashboardStatsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 12,
  marginBottom: 24,
};

const dashboardStat = {
  padding: 14,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const dashboardStatValue = {
  display: "block",
  marginTop: 4,
  lineHeight: "135%",
};

const quickActionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 10,
};

const commonlyForgottenCard = {
  margin: "0 0 24px",
  padding: 22,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-hover)",
};

const checklistOverviewCard = {
  margin: "0 0 24px",
  padding: 22,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-hover)",
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

const detailModal = {
  width: "min(100%, 540px)",
  maxHeight: "calc(100svh - 40px)",
  overflowY: "auto",
  padding: 24,
  border: "1px solid var(--accent-border)",
  borderRadius: 12,
  background: "linear-gradient(180deg, var(--action-bg), var(--surface) 42%)",
  boxShadow: "0 28px 80px rgba(15, 23, 42, 0.28)",
};

const eyebrow = {
  color: "var(--accent)",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 0.4,
  textTransform: "uppercase",
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
  marginBottom: 18,
  fontSize: 15,
};

const infoSection = {
  marginTop: 16,
  padding: 16,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
};

const detailGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginBottom: 12,
};

const detailStat = {
  padding: 14,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const detailValue = {
  display: "block",
  marginTop: 4,
  color: "var(--text-h)",
};

const linkCard = {
  display: "grid",
  gap: 6,
  padding: 14,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const detailLink = {
  display: "block",
  maxWidth: "100%",
  overflowWrap: "anywhere",
  fontSize: 14,
};

const modalActions = {
  display: "grid",
  gap: 10,
  marginTop: 18,
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

const quickCopySection = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginTop: 14,
};

const quickCopySectionCompact = {
  ...quickCopySection,
  marginTop: 14,
};

const copyBtn = {
  ...buttonBase,
  minHeight: 42,
  padding: "10px 12px",
  marginTop: 0,
  borderColor: "var(--border)",
  background: "var(--secondary-bg)",
  color: "var(--text-h)",
  fontSize: 14,
};

const copyBtnDone = {
  ...copyBtn,
  borderColor: "var(--success-border)",
  background: "var(--success-bg)",
  color: "#15803d",
};

const progressCard = {
  margin: "0 0 24px",
  padding: 22,
  border: "1px solid var(--accent-border)",
  borderRadius: 12,
  background: "linear-gradient(180deg, var(--action-bg), var(--surface))",
  boxShadow: "var(--shadow-hover)",
};

const progressHeader = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 10,
};

const progressTitle = {
  margin: "2px 0 0",
  fontSize: 28,
};

const progressBadge = {
  padding: "6px 10px",
  borderRadius: 999,
  background: "var(--success-bg)",
  color: "#15803d",
  fontSize: 12,
  fontWeight: 800,
  whiteSpace: "nowrap",
};

const progressCopy = {
  marginBottom: 14,
  fontSize: 15,
};

const progressBarTrack = {
  width: "100%",
  height: 10,
  marginBottom: 16,
  overflow: "hidden",
  borderRadius: 999,
  background: "var(--secondary-bg)",
  border: "1px solid var(--border)",
};

const progressBarFill = {
  height: "100%",
  borderRadius: 999,
  background: "var(--accent)",
  transition: "width 0.24s ease",
};

const progressStatsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const progressStatItem = {
  padding: 14,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const progressStatItemWide = {
  ...progressStatItem,
  gridColumn: "1 / -1",
};

const progressStatValue = {
  display: "block",
  marginTop: 4,
  color: "var(--text-h)",
  lineHeight: "135%",
};

const recommendationCard = {
  margin: "0 0 24px",
  padding: 22,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-hover)",
};

const recommendationHeader = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 14,
};

const recommendationTitle = {
  margin: "2px 0 0",
  fontSize: 24,
};

const recommendationBadge = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  borderRadius: 999,
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
  fontSize: 14,
  fontWeight: 900,
  flex: "0 0 auto",
};

const recommendationList = {
  display: "grid",
  gap: 10,
};

const recommendationItem = {
  ...buttonBase,
  width: "100%",
  justifyContent: "flex-start",
  gap: 12,
  marginTop: 0,
  padding: 14,
  borderColor: "var(--border)",
  background: "var(--row-bg)",
  color: "var(--text-h)",
  textAlign: "left",
};

const recommendationItemStatic = {
  ...recommendationItem,
  cursor: "default",
};

const recommendationIcon = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 30,
  height: 30,
  borderRadius: 10,
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
  fontSize: 13,
  fontWeight: 900,
  flex: "0 0 auto",
};

const recommendationText = {
  display: "grid",
  gap: 2,
};

const recommendationItemTitle = {
  color: "var(--text-h)",
  lineHeight: "130%",
};

const recommendationDescription = {
  color: "var(--text)",
  fontSize: 14,
  lineHeight: "140%",
};

export default App;
