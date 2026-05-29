const STORAGE_KEY = "movemateProfile";

const fieldIds = [
  "fullName",
  "email",
  "phone",
  "street",
  "city",
  "state",
  "zip",
  "country",
];

const form = document.getElementById("profileForm");
const fillButton = document.getElementById("fillPage");
const statusEl = document.getElementById("status");

const getProfileFromForm = () =>
  Object.fromEntries(
    fieldIds.map((id) => [id, document.getElementById(id).value.trim()])
  );

const setStatus = (message, type = "info") => {
  statusEl.textContent = message;
  statusEl.dataset.type = type;
};

const saveProfile = async () => {
  await chrome.storage.local.set({ [STORAGE_KEY]: getProfileFromForm() });
  setStatus("Saved locally.");
};

const loadProfile = async () => {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const profile = result[STORAGE_KEY] || {};

  fieldIds.forEach((id) => {
    document.getElementById(id).value = profile[id] || "";
  });
};

form.addEventListener("input", () => {
  saveProfile().catch(() => {
    setStatus("Could not save profile.", "error");
  });
});

fillButton.addEventListener("click", async () => {
  const profile = getProfileFromForm();
  await chrome.storage.local.set({ [STORAGE_KEY]: profile });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    setStatus("No active tab found.", "error");
    return;
  }

  sendFillMessage(tab.id, profile);
});

const sendFillMessage = (tabId, profile, hasInjected = false) => {
  chrome.tabs.sendMessage(tabId, { type: "MOVEMATE_FILL_PAGE", profile }, (response) => {
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

        sendFillMessage(tabId, profile, true);
      });
      return;
    }

    const count = response?.filledCount || 0;
    setStatus(count ? `Filled ${count} field${count === 1 ? "" : "s"}.` : "No matching fields found.");
  });
};

loadProfile().catch(() => {
  setStatus("Could not load saved profile.", "error");
});
