/* global chrome */

const STORAGE_KEY = "movemateProfile";

const fieldIds = [
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

const form = document.getElementById("profileForm");
const fillButton = document.getElementById("fillPage");
const forceFillButton = document.getElementById("forceFillPage");
const profileJsonImport = document.getElementById("profileJsonImport");
const importProfileButton = document.getElementById("importProfile");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("autofillResults");
const filledCountEl = document.getElementById("filledCount");
const skippedCountEl = document.getElementById("skippedCount");
const notFoundCountEl = document.getElementById("notFoundCount");
const filledFieldsEl = document.getElementById("filledFields");
const skippedFieldsEl = document.getElementById("skippedFields");
const notFoundFieldsEl = document.getElementById("notFoundFields");

const fieldLabels = {
  firstName: "First name",
  lastName: "Last name",
  fullName: "Full name",
  email: "Email",
  phone: "Phone",
  address1: "Address line 1",
  address2: "Address line 2",
  city: "City",
  state: "State",
  zip: "Zip / postal code",
  country: "Country",
};

const getProfileFromForm = () =>
  Object.fromEntries(
    fieldIds.map((id) => [id, document.getElementById(id).value.trim()])
  );

const setProfileFormValues = (profile = {}) => {
  fieldIds.forEach((id) => {
    const fallbackValue = id === "address1" ? profile.street : "";
    document.getElementById(id).value = profile[id] || fallbackValue || "";
  });
};

const hasProfileValue = (profile) =>
  Object.values(profile).some((value) => Boolean(value));

const setStatus = (message, type = "info") => {
  statusEl.textContent = message;
  statusEl.dataset.type = type;
};

const clearResults = () => {
  resultsEl.hidden = true;
  [filledFieldsEl, skippedFieldsEl, notFoundFieldsEl].forEach((list) => {
    list.textContent = "";
  });
};

const getDetailText = (key, detail) => {
  const label = fieldLabels[key] || key;
  if (!detail?.matchedBy) return label;
  return `${label} - matched by ${detail.matchedBy}`;
};

const renderList = (list, keys, details) => {
  list.textContent = "";

  if (!keys.length) {
    const item = document.createElement("li");
    item.textContent = "None";
    list.append(item);
    return;
  }

  keys.forEach((key) => {
    const item = document.createElement("li");
    item.textContent = getDetailText(key, details[key]);
    list.append(item);
  });
};

const showResults = (result = {}) => {
  const filled = result.filled || [];
  const skipped = result.skipped || [];
  const notFound = result.notFound || [];
  const details = result.details || {};

  filledCountEl.textContent = String(result.fieldsFilled ?? filled.length);
  skippedCountEl.textContent = String(result.fieldsSkipped ?? skipped.length);
  notFoundCountEl.textContent = String(result.fieldsNotFound ?? notFound.length);
  renderList(filledFieldsEl, filled, details);
  renderList(skippedFieldsEl, skipped, details);
  renderList(notFoundFieldsEl, notFound, details);
  resultsEl.hidden = false;
};

const saveProfile = async () => {
  await chrome.storage.local.set({ [STORAGE_KEY]: getProfileFromForm() });
  setStatus("Saved.", "success");
};

const loadProfile = async () => {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const profile = result[STORAGE_KEY] || {};

  setProfileFormValues(profile);
};

form.addEventListener("input", () => {
  saveProfile().catch(() => {
    setStatus("Could not save profile.", "error");
  });
});

const fillCurrentPage = async ({ forceFill = false } = {}) => {
  const profile = getProfileFromForm();
  await chrome.storage.local.set({ [STORAGE_KEY]: profile });
  clearResults();

  if (!hasProfileValue(profile)) {
    setStatus("Add at least one detail before filling the page.", "error");
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    setStatus("No active tab found.", "error");
    return;
  }

  sendFillMessage(tab.id, profile, { forceFill });
};

fillButton.addEventListener("click", () => {
  fillCurrentPage().catch(() => {
    setStatus("Could not fill the current page.", "error");
  });
});

forceFillButton.addEventListener("click", () => {
  fillCurrentPage({ forceFill: true }).catch(() => {
    setStatus("Could not force fill the current page.", "error");
  });
});

const getImportedProfile = (parsedProfile) => {
  const importedProfile = {};

  fieldIds.forEach((id) => {
    importedProfile[id] = typeof parsedProfile[id] === "string" ? parsedProfile[id].trim() : "";
  });

  if (!importedProfile.address1 && typeof parsedProfile.street === "string") {
    importedProfile.address1 = parsedProfile.street.trim();
  }

  if (!importedProfile.fullName) {
    importedProfile.fullName = [importedProfile.firstName, importedProfile.lastName].filter(Boolean).join(" ");
  }

  return importedProfile;
};

const importProfile = async () => {
  let parsedProfile;

  try {
    parsedProfile = JSON.parse(profileJsonImport.value);
  } catch {
    setStatus("That JSON could not be read. Check the pasted profile and try again.", "error");
    return;
  }

  if (!parsedProfile || Array.isArray(parsedProfile) || typeof parsedProfile !== "object") {
    setStatus("Paste a MoveMate profile JSON object, then try again.", "error");
    return;
  }

  const importedProfile = getImportedProfile(parsedProfile);
  if (!hasProfileValue(importedProfile)) {
    setStatus("No profile fields were found in that JSON.", "error");
    return;
  }

  setProfileFormValues(importedProfile);
  await chrome.storage.local.set({ [STORAGE_KEY]: importedProfile });
  profileJsonImport.value = "";
  clearResults();
  setStatus("Profile imported.", "success");
};

importProfileButton.addEventListener("click", () => {
  importProfile().catch(() => {
    setStatus("Could not import profile.", "error");
  });
});

const sendFillMessage = (tabId, profile, options = {}, hasInjected = false) => {
  chrome.tabs.sendMessage(tabId, { type: "MOVEMATE_FILL_PAGE", profile, forceFill: Boolean(options.forceFill) }, (response) => {
    if (chrome.runtime.lastError) {
      if (hasInjected) {
        setStatus("Open a normal webpage, then try again.", "error");
        return;
      }

      chrome.scripting.executeScript({ target: { tabId }, files: ["content.js"] }, () => {
        if (chrome.runtime.lastError) {
          setStatus("Open a normal webpage, then try again.", "error");
          return;
        }

        sendFillMessage(tabId, profile, options, true);
      });
      return;
    }

    const filledCount = response?.fieldsFilled ?? response?.filledCount ?? 0;
    const skippedCount = response?.fieldsSkipped ?? response?.skippedExistingCount ?? 0;
    const foundSomething = filledCount || skippedCount || response?.totalDetected;

    showResults(response);
    setStatus(
      foundSomething
        ? `${options.forceFill ? "Force filled" : "Filled"} current page. ${filledCount} field${filledCount === 1 ? "" : "s"} updated.`
        : "No matching fields found.",
      filledCount ? "success" : "info"
    );
  });
};

loadProfile().catch(() => {
  setStatus("Could not load saved profile.", "error");
});
