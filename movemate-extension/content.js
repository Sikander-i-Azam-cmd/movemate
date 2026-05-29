const fieldMatchers = [
  {
    key: "firstName",
    aliases: ["first name", "firstname", "first-name", "given name", "given-name", "fname"],
  },
  {
    key: "lastName",
    aliases: ["last name", "lastname", "last-name", "family name", "family-name", "surname", "lname"],
  },
  {
    key: "fullName",
    aliases: ["full name", "fullname", "full-name", "your name", "contact name", "name"],
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
    key: "street",
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
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const getNearbyText = (field) => {
  const textParts = [];
  const parent = field.parentElement;
  const previous = field.previousElementSibling;
  const next = field.nextElementSibling;

  if (previous) textParts.push(previous.textContent);
  if (next?.tagName === "LABEL") textParts.push(next.textContent);
  if (parent && parent !== document.body) textParts.push(parent.textContent);

  return textParts.join(" ");
};

const getLabelText = (field) => {
  const labels = [];

  if (field.id) {
    const explicitLabel = document.querySelector(`label[for="${CSS.escape(field.id)}"]`);
    if (explicitLabel) labels.push(explicitLabel.textContent);
  }

  const wrappingLabel = field.closest("label");
  if (wrappingLabel) labels.push(wrappingLabel.textContent);

  labels.push(getNearbyText(field));
  return labels.join(" ");
};

const getFieldSignature = (field) =>
  normalizeText([
    field.name,
    field.id,
    field.placeholder,
    field.getAttribute("aria-label"),
    field.getAttribute("autocomplete"),
    getLabelText(field),
  ].filter(Boolean).join(" "));

const hasAliasMatch = (signature, alias) => {
  const normalizedAlias = normalizeText(alias);
  const boundaryPattern = new RegExp(`(^|\\b)${normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\b|$)`);
  return boundaryPattern.test(signature);
};

const findProfileKeyForField = (field) => {
  const signature = getFieldSignature(field);
  const autocomplete = normalizeText(field.getAttribute("autocomplete") || "");

  if (autocomplete.includes("given name")) return "firstName";
  if (autocomplete.includes("family name")) return "lastName";
  if (autocomplete === "name" || autocomplete.endsWith(" name")) return "fullName";
  if (autocomplete.includes("email")) return "email";
  if (autocomplete.includes("tel")) return "phone";
  if (autocomplete.includes("street address")) return "street";
  if (autocomplete.includes("address line1")) return "street";
  if (autocomplete.includes("address line2")) return "address2";
  if (autocomplete.includes("address level2")) return "city";
  if (autocomplete.includes("address level1")) return "state";
  if (autocomplete.includes("postal code")) return "zip";
  if (autocomplete.includes("country")) return "country";

  return fieldMatchers.find(({ aliases }) =>
    aliases.some((alias) => hasAliasMatch(signature, alias))
  )?.key;
};

const getProfileValue = (profile, key) => {
  if (!key) return "";
  if (profile[key]) return profile[key];

  if ((key === "firstName" || key === "lastName") && profile.fullName) {
    const nameParts = profile.fullName.trim().split(/\s+/);
    if (key === "firstName") return nameParts[0] || "";
    if (key === "lastName") return nameParts.slice(1).join(" ");
  }

  return "";
};

const fieldHasText = (field) => {
  if (field.tagName === "SELECT") return Boolean(field.value);
  return Boolean(field.value?.trim());
};

const setNativeValue = (field, value) => {
  if (field.tagName === "SELECT") {
    const lowerValue = value.toLowerCase();
    const matchingOption = Array.from(field.options).find((option) =>
      option.value.toLowerCase() === lowerValue ||
      option.textContent.trim().toLowerCase() === lowerValue
    );

    if (!matchingOption) return false;
    field.value = matchingOption.value;
  } else {
    field.value = value;
  }

  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
};

const fillPage = (profile, { forceFill = false } = {}) => {
  const supportedInputTypes = new Set(["", "text", "email", "tel", "search", "number"]);
  const fields = Array.from(document.querySelectorAll("input, textarea, select"))
    .filter((field) => (
      !field.disabled &&
      !field.readOnly &&
      (field.tagName !== "INPUT" || supportedInputTypes.has(field.type))
    ));

  let filledCount = 0;
  let skippedExistingCount = 0;

  fields.forEach((field) => {
    const key = findProfileKeyForField(field);
    const value = getProfileValue(profile, key);

    if (!key || !value) return;
    if (!forceFill && fieldHasText(field)) {
      skippedExistingCount += 1;
      return;
    }

    if (setNativeValue(field, value)) {
      filledCount += 1;
    }
  });

  return { filledCount, skippedExistingCount };
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "MOVEMATE_FILL_PAGE") return false;

  sendResponse(fillPage(message.profile || {}, { forceFill: Boolean(message.forceFill) }));
  return true;
});
