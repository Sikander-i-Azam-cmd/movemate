/* global chrome */

const targetFields = [
  "firstName",
  "lastName",
  "fullName",
  "email",
  "phone",
  "address1",
  "address2",
  "city",
  "state",
  "zip",
  "country",
];

const fieldMatchers = [
  {
    key: "firstName",
    aliases: ["first name", "firstname", "first-name", "given name", "given-name", "fname", "first"],
  },
  {
    key: "lastName",
    aliases: ["last name", "lastname", "last-name", "family name", "family-name", "surname", "lname", "last"],
  },
  {
    key: "fullName",
    aliases: ["full name", "fullname", "full-name", "your name", "contact name", "customer name", "recipient name"],
  },
  {
    key: "email",
    aliases: ["email", "e-mail", "email address", "email-address"],
  },
  {
    key: "phone",
    aliases: ["phone", "telephone", "tel", "mobile", "phone number", "phone-number"],
  },
  {
    key: "address2",
    aliases: ["address line 2", "address line2", "address2", "address_2", "address-line-2", "apt", "apartment", "suite", "unit"],
  },
  {
    key: "address1",
    aliases: ["street address", "address line 1", "address line1", "address1", "address_1", "address-line-1", "street", "addr1"],
  },
  {
    key: "city",
    aliases: ["city", "town", "locality", "address-level2"],
  },
  {
    key: "state",
    aliases: ["state", "province", "region", "address-level1"],
  },
  {
    key: "zip",
    aliases: ["zip", "zipcode", "zip code", "postal", "postal code", "postcode"],
  },
  {
    key: "country",
    aliases: ["country", "country-name"],
  },
];

const normalizeText = (value = "") =>
  value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/[.,]/g, " ")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const stateAliases = {
  al: ["alabama"],
  ak: ["alaska"],
  az: ["arizona"],
  ar: ["arkansas"],
  ca: ["california"],
  co: ["colorado"],
  ct: ["connecticut"],
  de: ["delaware"],
  dc: ["district of columbia", "washington dc", "washington d c"],
  fl: ["florida"],
  ga: ["georgia"],
  hi: ["hawaii"],
  id: ["idaho"],
  il: ["illinois"],
  in: ["indiana"],
  ia: ["iowa"],
  ks: ["kansas"],
  ky: ["kentucky"],
  la: ["louisiana"],
  me: ["maine"],
  md: ["maryland"],
  ma: ["massachusetts"],
  mi: ["michigan"],
  mn: ["minnesota"],
  ms: ["mississippi"],
  mo: ["missouri"],
  mt: ["montana"],
  ne: ["nebraska"],
  nv: ["nevada"],
  nh: ["new hampshire"],
  nj: ["new jersey"],
  nm: ["new mexico"],
  ny: ["new york"],
  nc: ["north carolina"],
  nd: ["north dakota"],
  oh: ["ohio"],
  ok: ["oklahoma"],
  or: ["oregon"],
  pa: ["pennsylvania"],
  ri: ["rhode island"],
  sc: ["south carolina"],
  sd: ["south dakota"],
  tn: ["tennessee"],
  tx: ["texas"],
  ut: ["utah"],
  vt: ["vermont"],
  va: ["virginia"],
  wa: ["washington"],
  wv: ["west virginia"],
  wi: ["wisconsin"],
  wy: ["wyoming"],
};

const countryAliases = {
  us: ["united states", "united states of america", "usa", "u s", "u s a", "america"],
};

const stateAliasLookup = Object.entries(stateAliases).reduce((lookup, [abbreviation, names]) => {
  lookup[abbreviation] = abbreviation;
  names.forEach((name) => {
    lookup[normalizeText(name)] = abbreviation;
  });
  return lookup;
}, {});

const countryAliasLookup = Object.entries(countryAliases).reduce((lookup, [code, names]) => {
  lookup[code] = code;
  names.forEach((name) => {
    lookup[normalizeText(name)] = code;
  });
  return lookup;
}, {});

const cssEscape = (value) => {
  if (window.CSS?.escape) return CSS.escape(value);
  return value.replace(/["\\]/g, "\\$&");
};

const getUsefulText = (element) =>
  normalizeText(element?.textContent || "").slice(0, 220);

const getNearbyText = (field) => {
  const textParts = [];
  const parent = field.parentElement;
  const grandparent = parent?.parentElement;
  const previous = field.previousElementSibling;
  const next = field.nextElementSibling;

  if (previous) textParts.push(getUsefulText(previous));
  if (next?.tagName === "LABEL") textParts.push(getUsefulText(next));
  if (parent && parent !== document.body) textParts.push(getUsefulText(parent));
  if (grandparent && grandparent !== document.body && getUsefulText(parent).length < 24) {
    textParts.push(getUsefulText(grandparent));
  }

  return textParts.join(" ");
};

const getLabelText = (field) => {
  const labels = [];

  if (field.id) {
    const explicitLabel = document.querySelector(`label[for="${cssEscape(field.id)}"]`);
    if (explicitLabel) labels.push(explicitLabel.textContent);
  }

  const wrappingLabel = field.closest("label");
  if (wrappingLabel) labels.push(wrappingLabel.textContent);

  labels.push(getNearbyText(field));
  return labels.join(" ");
};

const getFieldSignals = (field) => [
  { matchedBy: "autocomplete", text: field.getAttribute("autocomplete") },
  { matchedBy: "name", text: field.name },
  { matchedBy: "id", text: field.id },
  { matchedBy: "placeholder", text: field.placeholder },
  { matchedBy: "aria-label", text: field.getAttribute("aria-label") },
  { matchedBy: "label", text: getLabelText(field) },
  { matchedBy: "container text", text: getNearbyText(field) },
].map((signal) => ({ ...signal, normalized: normalizeText(signal.text || "") }))
  .filter((signal) => signal.normalized);

const hasAliasMatch = (signature, alias) => {
  const normalizedAlias = normalizeText(alias);
  const boundaryPattern = new RegExp(`(^|\\b)${normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\b|$)`);
  return boundaryPattern.test(signature);
};

const getFieldSelector = (field) => {
  const tag = field.tagName.toLowerCase();
  if (field.id) return `${tag}#${cssEscape(field.id)}`;
  if (field.name) return `${tag}[name="${field.name.replace(/"/g, '\\"')}"]`;
  if (field.getAttribute("autocomplete")) {
    return `${tag}[autocomplete="${field.getAttribute("autocomplete").replace(/"/g, '\\"')}"]`;
  }
  if (field.placeholder) return `${tag}[placeholder="${field.placeholder.replace(/"/g, '\\"')}"]`;
  return tag;
};

const findProfileKeyForField = (field) => {
  const signals = getFieldSignals(field);
  const autocomplete = signals.find((signal) => signal.matchedBy === "autocomplete")?.normalized || "";
  const autocompleteMatches = [
    ["given name", "firstName"],
    ["family name", "lastName"],
    ["email", "email"],
    ["tel", "phone"],
    ["street address", "address1"],
    ["address line1", "address1"],
    ["address line 1", "address1"],
    ["address line2", "address2"],
    ["address line 2", "address2"],
    ["address level2", "city"],
    ["address level1", "state"],
    ["postal code", "zip"],
    ["country", "country"],
  ];
  const autocompleteMatch = autocompleteMatches.find(([alias]) => autocomplete.includes(alias));

  if (autocomplete === "name") {
    return { key: "fullName", matchedBy: "autocomplete", matchedText: autocomplete, selector: getFieldSelector(field) };
  }

  if (autocompleteMatch) {
    return {
      key: autocompleteMatch[1],
      matchedBy: "autocomplete",
      matchedText: autocompleteMatch[0],
      selector: getFieldSelector(field),
    };
  }

  const exactNameSignal = signals.find((signal) =>
    signal.matchedBy !== "container text" && signal.normalized === "name"
  );
  if (exactNameSignal) {
    return {
      key: "fullName",
      matchedBy: exactNameSignal.matchedBy,
      matchedText: "name",
      selector: getFieldSelector(field),
    };
  }

  const exactAddressSignal = signals.find((signal) =>
    signal.matchedBy !== "container text" && signal.normalized === "address"
  );
  if (exactAddressSignal) {
    return {
      key: "address1",
      matchedBy: exactAddressSignal.matchedBy,
      matchedText: "address",
      selector: getFieldSelector(field),
    };
  }

  for (const signal of signals) {
    for (const matcher of fieldMatchers) {
      const alias = matcher.aliases.find((candidate) => hasAliasMatch(signal.normalized, candidate));
      if (alias) {
        return {
          key: matcher.key,
          matchedBy: signal.matchedBy,
          matchedText: alias,
          selector: getFieldSelector(field),
        };
      }
    }
  }

  return null;
};

const getProfileValue = (profile, key) => {
  if (!key) return "";
  if (profile[key]) return profile[key];
  if (key === "address1") return profile.address1 || profile.street || "";

  if ((key === "firstName" || key === "lastName") && profile.fullName) {
    const nameParts = profile.fullName.trim().split(/\s+/);
    if (key === "firstName") return nameParts[0] || "";
    if (key === "lastName") return nameParts.slice(1).join(" ");
  }

  if (key === "fullName") {
    return [profile.firstName, profile.lastName].filter(Boolean).join(" ");
  }

  return "";
};

const fieldHasText = (field) => {
  if (field.tagName === "SELECT") return Boolean(field.value);
  return Boolean(field.value?.trim());
};

const getSelectAliases = (value, key) => {
  const normalizedValue = normalizeText(value);

  if (key === "state") {
    const stateCode = stateAliasLookup[normalizedValue];
    if (!stateCode) return [normalizedValue];
    return [stateCode, ...(stateAliases[stateCode] || [])].map(normalizeText);
  }

  if (key === "country") {
    const countryCode = countryAliasLookup[normalizedValue];
    if (!countryCode) return [normalizedValue];
    return [countryCode, ...(countryAliases[countryCode] || [])].map(normalizeText);
  }

  return [normalizedValue];
};

const getOptionAliases = (option, key) => {
  const optionTexts = [option.value, option.textContent].map(normalizeText).filter(Boolean);
  const expandedAliases = optionTexts.flatMap((optionText) => getSelectAliases(optionText, key));
  return [...new Set([...optionTexts, ...expandedAliases])];
};

const findSelectOption = (field, value, key) => {
  const valueAliases = getSelectAliases(value, key);
  const options = Array.from(field.options);
  const directMatch = options.find((option) =>
    [option.value, option.textContent].some((text) =>
      valueAliases.includes(normalizeText(text || ""))
    )
  );

  if (directMatch) return directMatch;

  return options.find((option) =>
    getOptionAliases(option, key).some((optionAlias) => valueAliases.includes(optionAlias))
  );
};

const setNativeValue = (field, value, key) => {
  if (field.tagName === "SELECT") {
    const matchingOption = findSelectOption(field, value, key);
    if (!matchingOption) return { success: false };
    field.value = matchingOption.value;
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
    return {
      success: true,
      selectedOption: {
        value: matchingOption.value,
        text: matchingOption.textContent.trim(),
      },
    };
  }

  field.value = value;
  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
  return { success: true };
};

const fillPage = (profile, { forceFill = false } = {}) => {
  const supportedInputTypes = new Set(["", "text", "email", "tel", "search", "number"]);
  const fields = Array.from(document.querySelectorAll("input, textarea, select"))
    .filter((field) => (
      !field.disabled &&
      !field.readOnly &&
      (field.tagName !== "INPUT" || supportedInputTypes.has(field.type))
    ));

  const result = {
    totalDetected: 0,
    fieldsDetected: 0,
    fieldsFilled: 0,
    fieldsSkipped: 0,
    fieldsNotFound: 0,
    filled: [],
    skipped: [],
    notFound: [],
    details: {},
  };
  const matchedKeys = new Set();

  fields.forEach((field) => {
    const match = findProfileKeyForField(field);
    const key = match?.key;
    const value = getProfileValue(profile, key);

    if (!key || !value) return;
    matchedKeys.add(key);
    result.totalDetected += 1;

    if (!forceFill && fieldHasText(field)) {
      result.fieldsSkipped += 1;
      if (!result.skipped.includes(key) && !result.filled.includes(key)) result.skipped.push(key);
      if (result.details[key]?.status !== "filled") {
        result.details[key] = {
          status: "skipped",
          matchedBy: match.matchedBy,
          matchedText: match.matchedText,
          selector: match.selector,
          reason: "existing value",
        };
      }
      return;
    }

    const fillResult = setNativeValue(field, value, key);

    if (fillResult.success) {
      result.fieldsFilled += 1;
      if (!result.filled.includes(key)) result.filled.push(key);
      result.skipped = result.skipped.filter((item) => item !== key);
      result.details[key] = {
        status: "filled",
        matchedBy: match.matchedBy,
        matchedText: match.matchedText,
        selector: match.selector,
        selectedOption: fillResult.selectedOption,
      };
    } else {
      result.details[key] = {
        status: "notFilled",
        matchedBy: match.matchedBy,
        matchedText: match.matchedText,
        selector: match.selector,
        reason: "no matching select option",
      };
    }
  });

  targetFields.forEach((key) => {
    if (!getProfileValue(profile, key)) return;
    if (matchedKeys.has(key)) return;
    if ((key === "firstName" || key === "lastName") && !profile[key] && matchedKeys.has("fullName")) return;
    if (key === "fullName" && !profile.fullName && (matchedKeys.has("firstName") || matchedKeys.has("lastName"))) return;
    result.notFound.push(key);
    result.details[key] = {
      status: "notFound",
      matchedBy: null,
      selector: null,
    };
  });

  result.fieldsDetected = result.totalDetected;
  result.fieldsNotFound = result.notFound.length;
  result.filledCount = result.fieldsFilled;
  result.skippedExistingCount = result.fieldsSkipped;

  return result;
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "MOVEMATE_FILL_PAGE") return false;

  sendResponse(fillPage(message.profile || {}, { forceFill: Boolean(message.forceFill) }));
  return true;
});
