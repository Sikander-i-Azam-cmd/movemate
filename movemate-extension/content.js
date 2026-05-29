const fieldMatchers = {
  fullName: ["full name", "fullname", "name"],
  email: ["email", "e-mail"],
  phone: ["phone", "telephone", "tel", "mobile"],
  street: ["street address", "address line 1", "address1", "address_1", "address", "street"],
  city: ["city", "town", "locality"],
  state: ["state", "province", "region", "address-level1"],
  zip: ["zip", "zipcode", "zip code", "postal", "postal code", "postcode"],
  country: ["country", "country-name"],
};

const getLabelText = (field) => {
  const labels = [];

  if (field.id) {
    const explicitLabel = document.querySelector(`label[for="${CSS.escape(field.id)}"]`);
    if (explicitLabel) labels.push(explicitLabel.textContent);
  }

  const wrappingLabel = field.closest("label");
  if (wrappingLabel) labels.push(wrappingLabel.textContent);

  return labels.join(" ");
};

const getFieldSignature = (field) =>
  [
    field.name,
    field.id,
    field.placeholder,
    field.getAttribute("aria-label"),
    field.getAttribute("autocomplete"),
    getLabelText(field),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const findProfileKeyForField = (field) => {
  const signature = getFieldSignature(field);

  return Object.entries(fieldMatchers).find(([, aliases]) =>
    aliases.some((alias) => signature.includes(alias))
  )?.[0];
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

const fillPage = (profile) => {
  const fields = Array.from(document.querySelectorAll("input, textarea, select"))
    .filter((field) => !field.disabled && !field.readOnly && field.type !== "hidden");

  const filledKeys = new Set();
  let filledCount = 0;

  fields.forEach((field) => {
    const key = findProfileKeyForField(field);
    const value = key ? profile[key] : "";

    if (!key || !value || filledKeys.has(key)) return;
    if (setNativeValue(field, value)) {
      filledKeys.add(key);
      filledCount += 1;
    }
  });

  return filledCount;
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "MOVEMATE_FILL_PAGE") return false;

  const filledCount = fillPage(message.profile || {});
  sendResponse({ filledCount });
  return true;
});
