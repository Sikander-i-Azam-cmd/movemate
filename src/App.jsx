import { useState, useEffect } from "react"; console.log("new version");

function App() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [copiedKey, setCopiedKey] = useState("");
  const [selectedFlowCategories, setSelectedFlowCategories] = useState([]);
  const [summaryMode, setSummaryMode] = useState("selected");
  const [completionChecks, setCompletionChecks] = useState({
    mailing: false,
    secondaryAddress: false,
    saved: false,
  });

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
  const [moveDate, setMoveDate] = useState(() => localStorage.getItem("mm-move-date") || localStorage.getItem("movemate-move-date") || "");

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
  useEffect(() => localStorage.setItem("mm-move-date", moveDate), [moveDate]);

  // ---------------- DATA ----------------
  const defaultCategories = {
    Banks: [],
    "Credit Cards": [],
    Insurance: [],
    Utilities: [],
    Subscriptions: [],
    "Delivery Apps": [],
    "Shopping / Ecommerce": [],
    "Government / DMV": [],
    Healthcare: [],
    "Work / Payroll": [],
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
      { name: "Truist", link: "https://www.truist.com" },
      { name: "BMO", link: "https://www.bmo.com/en-us/main/personal/" },
      { name: "Santander Bank", link: "https://www.santanderbank.com" },
      { name: "KeyBank", link: "https://www.key.com" },
      { name: "Huntington Bank", link: "https://www.huntington.com" },
      { name: "Citizens Bank", link: "https://www.citizensbank.com" },
      { name: "M&T Bank", link: "https://www.mtb.com" },
      { name: "SoFi", link: "https://www.sofi.com" },
      { name: "Chime", link: "https://www.chime.com" },
      { name: "Navy Federal Credit Union", link: "https://www.navyfederal.org" },
    ],

    "Credit Cards": [
      { name: "Capital One", link: "https://www.capitalone.com" },
      { name: "American Express", link: "https://www.americanexpress.com" },
      { name: "Chase Credit Cards", link: "https://creditcards.chase.com" },
      { name: "Citi Cards", link: "https://www.citi.com/credit-cards" },
      { name: "Discover", link: "https://www.discover.com" },
      { name: "Bank of America Credit Cards", link: "https://www.bankofamerica.com/credit-cards" },
      { name: "Wells Fargo Credit Cards", link: "https://www.wellsfargo.com/credit-cards" },
      { name: "Barclays", link: "https://cards.barclaycardus.com" },
      { name: "Synchrony", link: "https://www.synchrony.com" },
      { name: "US Bank Credit Cards", link: "https://www.usbank.com/credit-cards.html" },
      { name: "Navy Federal Credit Union", link: "https://www.navyfederal.org" },
      { name: "Apple Card", link: "https://card.apple.com" },
      { name: "Truist Credit Cards", link: "https://www.truist.com/credit-cards" },
      { name: "PNC Credit Cards", link: "https://www.pnc.com/en/personal-banking/banking/credit-cards.html" },
      { name: "TD Credit Cards", link: "https://www.td.com/us/en/personal-banking/credit-cards" },
      { name: "Credit One Bank", link: "https://www.creditonebank.com" },
      { name: "Bread Financial", link: "https://www.breadfinancial.com" },
      { name: "Comenity", link: "https://www.comenity.net" },
      { name: "PayPal Credit", link: "https://www.paypal.com/us/digital-wallet/manage-money/paypal-credit" },
      { name: "Venmo Credit Card", link: "https://venmo.com/about/creditcard/" },
      { name: "Target RedCard", link: "https://www.target.com/redcard" },
      { name: "Amazon Store Card", link: "https://www.amazon.com/storecard" },
      { name: "Best Buy Credit Card", link: "https://www.bestbuy.com/site/financing-rewards/learn-about-best-buy-credit-cards/pcmcat102500050032.c" },
      { name: "USAA Credit Cards", link: "https://www.usaa.com/inet/wc/banking_credit_cards_main" },
    ],

    Insurance: [
      { name: "State Farm", link: "https://www.statefarm.com" },
      { name: "GEICO", link: "https://www.geico.com" },
      { name: "Progressive", link: "https://www.progressive.com" },
      { name: "Allstate", link: "https://www.allstate.com" },
      { name: "Liberty Mutual", link: "https://www.libertymutual.com" },
      { name: "Farmers Insurance", link: "https://www.farmers.com" },
      { name: "Nationwide", link: "https://www.nationwide.com" },
      { name: "USAA", link: "https://www.usaa.com" },
      { name: "Travelers", link: "https://www.travelers.com" },
      { name: "Lemonade", link: "https://www.lemonade.com" },
      { name: "Aetna", link: "https://www.aetna.com" },
      { name: "Blue Cross Blue Shield", link: "https://www.bcbs.com" },
      { name: "MetLife", link: "https://www.metlife.com" },
      { name: "The Hartford", link: "https://www.thehartford.com" },
      { name: "Erie Insurance", link: "https://www.erieinsurance.com" },
      { name: "Auto-Owners Insurance", link: "https://www.auto-owners.com" },
      { name: "American Family Insurance", link: "https://www.amfam.com" },
      { name: "AAA Insurance", link: "https://www.aaa.com/insurance" },
      { name: "Mercury Insurance", link: "https://www.mercuryinsurance.com" },
      { name: "Root Insurance", link: "https://www.joinroot.com" },
      { name: "Oscar Health", link: "https://www.hioscar.com" },
      { name: "Anthem", link: "https://www.anthem.com" },
      { name: "Guardian", link: "https://www.guardianlife.com" },
      { name: "Delta Dental", link: "https://www.deltadental.com" },
    ],

    Utilities: [
      { name: "Electric Provider", link: "https://www.google.com/search?q=electric+provider+change+address" },
      { name: "Gas Provider", link: "https://www.google.com/search?q=gas+provider+change+address" },
      { name: "Water Utility", link: "https://www.google.com/search?q=water+utility+change+address" },
      { name: "Trash / Recycling Service", link: "https://www.google.com/search?q=trash+recycling+service+change+address" },
      { name: "Xfinity", link: "https://www.xfinity.com" },
      { name: "Spectrum", link: "https://www.spectrum.com" },
      { name: "AT&T Internet", link: "https://www.att.com/internet" },
      { name: "Verizon", link: "https://www.verizon.com" },
      { name: "T-Mobile Home Internet", link: "https://www.t-mobile.com/home-internet" },
      { name: "Cox", link: "https://www.cox.com" },
      { name: "Optimum", link: "https://www.optimum.com" },
      { name: "Frontier", link: "https://frontier.com" },
      { name: "Quantum Fiber", link: "https://www.quantumfiber.com" },
      { name: "Google Fiber", link: "https://fiber.google.com" },
      { name: "Mediacom", link: "https://mediacomcable.com" },
      { name: "Waste Management", link: "https://www.wm.com" },
      { name: "Republic Services", link: "https://www.republicservices.com" },
      { name: "Recology", link: "https://www.recology.com" },
      { name: "Con Edison", link: "https://www.coned.com" },
      { name: "PG&E", link: "https://www.pge.com" },
      { name: "Duke Energy", link: "https://www.duke-energy.com" },
      { name: "Dominion Energy", link: "https://www.dominionenergy.com" },
      { name: "National Grid", link: "https://www.nationalgridus.com" },
      { name: "Southern California Edison", link: "https://www.sce.com" },
      { name: "Florida Power & Light", link: "https://www.fpl.com" },
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
      { name: "Amazon Fresh", link: "https://www.amazon.com/fresh" },
      { name: "Walmart Grocery", link: "https://www.walmart.com/cp/food/976759" },
      { name: "Kroger Delivery", link: "https://www.kroger.com" },
      { name: "Safeway", link: "https://www.safeway.com" },
      { name: "Albertsons", link: "https://www.albertsons.com" },
      { name: "Whole Foods Market", link: "https://www.wholefoodsmarket.com" },
      { name: "Misfits Market", link: "https://www.misfitsmarket.com" },
      { name: "Hungryroot", link: "https://www.hungryroot.com" },
      { name: "Factor", link: "https://www.factor75.com" },
      { name: "CookUnity", link: "https://www.cookunity.com" },
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
      { name: "Apple TV+", link: "https://tv.apple.com" },
      { name: "SiriusXM", link: "https://www.siriusxm.com" },
      { name: "Audible", link: "https://www.audible.com" },
      { name: "The New York Times", link: "https://www.nytimes.com" },
      { name: "Costco", link: "https://www.costco.com" },
      { name: "Sam's Club", link: "https://www.samsclub.com" },
      { name: "Walmart+", link: "https://www.walmart.com/plus" },
      { name: "Dropbox", link: "https://www.dropbox.com" },
      { name: "iCloud", link: "https://www.icloud.com" },
      { name: "Google One", link: "https://one.google.com" },
      { name: "Microsoft 365", link: "https://www.microsoft.com/microsoft-365" },
      { name: "Adobe", link: "https://www.adobe.com" },
      { name: "Canva", link: "https://www.canva.com" },
      { name: "The Washington Post", link: "https://www.washingtonpost.com" },
      { name: "The Wall Street Journal", link: "https://www.wsj.com" },
    ],

    "Shopping / Ecommerce": [
      { name: "Amazon", link: "https://www.amazon.com" },
      { name: "Walmart", link: "https://www.walmart.com" },
      { name: "Target", link: "https://www.target.com" },
      { name: "eBay", link: "https://www.ebay.com" },
      { name: "Etsy", link: "https://www.etsy.com" },
      { name: "Best Buy", link: "https://www.bestbuy.com" },
      { name: "Home Depot", link: "https://www.homedepot.com" },
      { name: "Lowe's", link: "https://www.lowes.com" },
      { name: "Wayfair", link: "https://www.wayfair.com" },
      { name: "Chewy", link: "https://www.chewy.com" },
      { name: "Macy's", link: "https://www.macys.com" },
      { name: "Nordstrom", link: "https://www.nordstrom.com" },
      { name: "Apple Store", link: "https://www.apple.com/store" },
      { name: "Nike", link: "https://www.nike.com" },
      { name: "Adidas", link: "https://www.adidas.com" },
      { name: "Kohl's", link: "https://www.kohls.com" },
      { name: "Sephora", link: "https://www.sephora.com" },
      { name: "Ulta Beauty", link: "https://www.ulta.com" },
      { name: "Gap", link: "https://www.gap.com" },
      { name: "Old Navy", link: "https://oldnavy.gap.com" },
      { name: "REI", link: "https://www.rei.com" },
      { name: "Zappos", link: "https://www.zappos.com" },
      { name: "IKEA", link: "https://www.ikea.com/us/en/" },
      { name: "Williams Sonoma", link: "https://www.williams-sonoma.com" },
      { name: "Pottery Barn", link: "https://www.potterybarn.com" },
    ],

    "Government / DMV": [
      { name: "DMV", link: "https://www.usa.gov/motor-vehicle-services" },
      { name: "USPS Change of Address", link: "https://moversguide.usps.com" },
      { name: "IRS", link: "https://www.irs.gov/forms-pubs/about-form-8822" },
      { name: "Voter Registration", link: "https://vote.gov" },
      { name: "Social Security Administration", link: "https://www.ssa.gov" },
      { name: "Medicare", link: "https://www.medicare.gov" },
      { name: "Passport Services", link: "https://travel.state.gov" },
      { name: "Selective Service", link: "https://www.sss.gov" },
      { name: "State Tax Agency", link: "https://www.google.com/search?q=state+tax+agency+change+address" },
      { name: "County Clerk", link: "https://www.google.com/search?q=county+clerk+change+address" },
      { name: "USCIS", link: "https://www.uscis.gov" },
      { name: "FEMA", link: "https://www.fema.gov" },
      { name: "Veterans Affairs", link: "https://www.va.gov" },
      { name: "TreasuryDirect", link: "https://www.treasurydirect.gov" },
      { name: "StudentAid.gov", link: "https://studentaid.gov" },
      { name: "TSA", link: "https://www.tsa.gov" },
      { name: "Global Entry", link: "https://ttp.dhs.gov" },
      { name: "State Unemployment Office", link: "https://www.google.com/search?q=state+unemployment+office+change+address" },
      { name: "Local Property Tax Office", link: "https://www.google.com/search?q=local+property+tax+office+change+address" },
      { name: "County Assessor", link: "https://www.google.com/search?q=county+assessor+change+address" },
      { name: "Local School District", link: "https://www.google.com/search?q=local+school+district+change+address" },
    ],

    Healthcare: [
      { name: "Health Insurance Provider", link: "https://www.google.com/search?q=health+insurance+provider+change+address" },
      { name: "Primary Care Doctor", link: "https://www.google.com/search?q=primary+care+doctor+change+address" },
      { name: "Dentist", link: "https://www.google.com/search?q=dentist+change+address" },
      { name: "Vision Provider", link: "https://www.google.com/search?q=vision+provider+change+address" },
      { name: "Pharmacy", link: "https://www.google.com/search?q=pharmacy+change+address" },
      { name: "CVS", link: "https://www.cvs.com" },
      { name: "Walgreens", link: "https://www.walgreens.com" },
      { name: "Kaiser Permanente", link: "https://healthy.kaiserpermanente.org" },
      { name: "UnitedHealthcare", link: "https://www.uhc.com" },
      { name: "Cigna", link: "https://www.cigna.com" },
      { name: "Humana", link: "https://www.humana.com" },
      { name: "HSA Provider", link: "https://www.google.com/search?q=HSA+provider+change+address" },
      { name: "Aetna", link: "https://www.aetna.com" },
      { name: "Anthem", link: "https://www.anthem.com" },
      { name: "Blue Cross Blue Shield", link: "https://www.bcbs.com" },
      { name: "Molina Healthcare", link: "https://www.molinahealthcare.com" },
      { name: "Ambetter", link: "https://www.ambetterhealth.com" },
      { name: "Oscar Health", link: "https://www.hioscar.com" },
      { name: "Delta Dental", link: "https://www.deltadental.com" },
      { name: "VSP Vision Care", link: "https://www.vsp.com" },
      { name: "EyeMed", link: "https://www.eyemed.com" },
      { name: "Express Scripts", link: "https://www.express-scripts.com" },
      { name: "OptumRx", link: "https://www.optumrx.com" },
      { name: "CVS Caremark", link: "https://www.caremark.com" },
      { name: "HSA Bank", link: "https://www.hsabank.com" },
    ],

    "Work / Payroll": [
      { name: "Employer Payroll", link: "https://www.google.com/search?q=employer+payroll+change+address" },
      { name: "ADP", link: "https://www.adp.com" },
      { name: "Workday", link: "https://www.workday.com" },
      { name: "Paychex", link: "https://www.paychex.com" },
      { name: "Gusto", link: "https://gusto.com" },
      { name: "BambooHR", link: "https://www.bamboohr.com" },
      { name: "UKG", link: "https://www.ukg.com" },
      { name: "Fidelity 401(k)", link: "https://www.fidelity.com" },
      { name: "Vanguard 401(k)", link: "https://investor.vanguard.com" },
      { name: "Principal", link: "https://www.principal.com" },
      { name: "Empower", link: "https://www.empower.com" },
      { name: "Health Benefits Portal", link: "https://www.google.com/search?q=employee+health+benefits+portal+change+address" },
      { name: "Rippling", link: "https://www.rippling.com" },
      { name: "TriNet Zenefits", link: "https://www.zenefits.com" },
      { name: "Justworks", link: "https://www.justworks.com" },
      { name: "QuickBooks Payroll", link: "https://quickbooks.intuit.com/payroll/" },
      { name: "Paylocity", link: "https://www.paylocity.com" },
      { name: "Paycom", link: "https://www.paycom.com" },
      { name: "Dayforce", link: "https://www.dayforce.com" },
      { name: "Namely", link: "https://www.namely.com" },
      { name: "Paycor", link: "https://www.paycor.com" },
      { name: "Square Payroll", link: "https://squareup.com/us/en/payroll" },
      { name: "Guideline 401(k)", link: "https://www.guideline.com" },
      { name: "Charles Schwab 401(k)", link: "https://www.schwab.com/workplace" },
      { name: "T. Rowe Price", link: "https://www.troweprice.com" },
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
  const categoryExamples = {
    Banks: "For example: Chase",
    "Credit Cards": "For example: Capital One",
    Insurance: "For example: State Farm",
    Utilities: "For example: Electric provider",
    Subscriptions: "For example: Netflix",
    "Delivery Apps": "For example: Uber Eats",
    "Shopping / Ecommerce": "For example: Amazon",
    "Government / DMV": "For example: DMV",
    Healthcare: "For example: Health insurance provider",
    "Work / Payroll": "For example: Employer payroll",
  };
  const forgottenAccountSuggestions = [
    { name: "USPS Change of Address", cat: "Government / DMV", link: "https://moversguide.usps.com", reason: "Mail forwarding is easy to miss but catches important paper mail." },
    { name: "DMV / Driver License", cat: "Government / DMV", link: "https://www.usa.gov/motor-vehicle-services", reason: "State ID and driver license records often need a separate update.", aliases: ["DMV", "Driver License"] },
    { name: "Vehicle Registration", cat: "Government / DMV", link: "https://www.usa.gov/motor-vehicle-services", reason: "Registration notices may not follow your license address automatically." },
    { name: "Employer Payroll / HR", cat: "Work / Payroll", link: "https://www.google.com/search?q=employer+payroll+change+address", reason: "Payroll and HR addresses affect tax forms and benefits mail.", aliases: ["Employer Payroll", "HR"] },
    { name: "Health Insurance", cat: "Healthcare", link: "https://www.google.com/search?q=health+insurance+provider+change+address", reason: "Benefits, claims, and member mail often rely on this address.", aliases: ["Health Insurance Provider"] },
    { name: "Car Insurance", cat: "Insurance", link: "https://www.google.com/search?q=car+insurance+change+address", reason: "Auto policy rates and documents may depend on your garaging address." },
    { name: "Renters/Home Insurance", cat: "Insurance", link: "https://www.google.com/search?q=renters+home+insurance+change+address", reason: "Property coverage and renewal notices should match the new home." },
    { name: "Bank Mailing Address", cat: "Banks", link: "https://www.google.com/search?q=bank+mailing+address+change", reason: "Statements, notices, checks, and replacement cards can still go to old mail." },
    { name: "Credit Card Billing Address", cat: "Credit Cards", link: "https://www.google.com/search?q=credit+card+billing+address+change", reason: "Billing addresses can affect verification and online checkout." },
    { name: "Amazon Shipping Address", cat: "Shopping / Ecommerce", link: "https://www.amazon.com/a/addresses", reason: "Saved shipping defaults can send packages to the old place." },
    { name: "Utilities", cat: "Utilities", link: "https://www.google.com/search?q=utilities+move+service+change+address", reason: "Service, billing, and final bill addresses may each need review." },
    { name: "Cell Phone Provider", cat: "Utilities", link: "https://www.google.com/search?q=cell+phone+provider+change+billing+address", reason: "Wireless billing addresses are commonly separate from home internet." },
    { name: "Gym Membership", cat: "Subscriptions", link: "https://www.google.com/search?q=gym+membership+change+address", reason: "Membership accounts can keep billing and notices tied to the old address." },
    { name: "Food Delivery Apps", cat: "Delivery Apps", link: "https://www.google.com/search?q=food+delivery+app+change+address", reason: "Delivery defaults can quietly keep pointing at the old home." },
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
    hasCompletedOnboarding ? "welcome" : "onboarding"
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
    localStorage.removeItem("movemate-current-view");
    localStorage.removeItem("movemate-active-category");
    localStorage.removeItem("movemate-selected-item");
  }, []);

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

  const priorityCategories = ["Government / DMV", "Utilities", "Banks", "Insurance", "Work / Payroll"];
  const recommendedCategories = ["Credit Cards", "Healthcare", "Shopping / Ecommerce", "Delivery Apps"];
  const lowerPriorityCategories = ["Subscriptions"];

  const getDaysUntilMove = () => {
    if (!moveDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(`${moveDate}T00:00:00`);
    return Math.ceil((selectedDate - today) / 86400000);
  };

  const getMoveTimeline = () => {
    const daysUntilMove = getDaysUntilMove();

    if (daysUntilMove === null) {
      return {
        label: "Move date not set",
        message: "Add a move date to see timing guidance.",
      };
    }

    if (daysUntilMove <= 7) {
      return {
        label: daysUntilMove < 0 ? "Move date passed" : `${daysUntilMove} days until move`,
        message: "High priority: update essentials first",
      };
    }

    if (daysUntilMove <= 30) {
      return {
        label: `${daysUntilMove} days until move`,
        message: "Good time to start updating key accounts",
      };
    }

    return {
      label: `${daysUntilMove} days until move`,
      message: "You have time, but start with government and financial accounts",
    };
  };

  const getCategoryPriority = (cat) => {
    const { total, done } = getCategoryProgress(cat);
    const isComplete = total > 0 && done === total;
    const daysUntilMove = getDaysUntilMove();
    const isSoon = daysUntilMove !== null && daysUntilMove <= 7;
    const isUpcoming = daysUntilMove !== null && daysUntilMove <= 30;

    if (isComplete) {
      return {
        label: "Completed",
        message: "Already handled",
        score: 0,
        style: priorityBadgeDone,
      };
    }

    if (priorityCategories.includes(cat)) {
      return {
        label: "High Priority",
        message: isSoon ? "Handle before anything else" : isUpcoming ? "Update early" : "Important move record",
        score: isSoon ? 100 : isUpcoming ? 90 : 80,
        style: priorityBadgeHigh,
      };
    }

    if (recommendedCategories.includes(cat)) {
      return {
        label: "Recommended Next",
        message: isSoon ? "Do after essentials" : "Useful to update soon",
        score: isSoon ? 70 : 60,
        style: priorityBadgeRecommended,
      };
    }

    if (lowerPriorityCategories.includes(cat)) {
      return {
        label: "Can Wait",
        message: "Update after essential accounts",
        score: isSoon ? 30 : 20,
        style: priorityBadgeLow,
      };
    }

    return {
      label: "Recommended Next",
      message: "Review when essentials are done",
      score: 50,
      style: priorityBadgeRecommended,
    };
  };

  const getPriorityRecommendations = () =>
    Object.keys(categories)
      .map(cat => ({ cat, ...getCategoryPriority(cat) }))
      .filter(item => item.label !== "Completed")
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

  const getCategoryReadinessWeight = (cat) => {
    if (priorityCategories.includes(cat)) return 3;
    if (recommendedCategories.includes(cat)) return 1.75;
    if (lowerPriorityCategories.includes(cat)) return 1;
    return 1.5;
  };

  const getMoveReadiness = () => {
    const categoryKeys = Object.keys(categories);
    const weightedTotal = categoryKeys.reduce((total, cat) => total + getCategoryReadinessWeight(cat), 0);
    const weightedCompleted = categoryKeys.reduce((total, cat) => {
      const items = categories[cat] || [];
      const completedItems = items.filter(item => getItemStatus(item) === "completed").length;
      const categoryCompletion = items.length ? completedItems / items.length : 0;
      return total + categoryCompletion * getCategoryReadinessWeight(cat);
    }, 0);
    const criticalRemaining = priorityCategories.reduce((total, cat) => {
      const items = categories[cat];
      if (!items) return total;
      if (!items.length) return total + 1;
      return total + items.filter(item => getItemStatus(item) !== "completed").length;
    }, 0);
    const daysUntilMove = getDaysUntilMove();
    const urgencyPenalty = daysUntilMove !== null && daysUntilMove <= 7
      ? Math.min(30, criticalRemaining * 4)
      : daysUntilMove !== null && daysUntilMove <= 30
        ? Math.min(20, criticalRemaining * 2)
        : Math.min(12, criticalRemaining);
    const score = weightedTotal
      ? Math.max(0, Math.min(100, Math.round((weightedCompleted / weightedTotal) * 100 - urgencyPenalty)))
      : 0;

    return {
      score,
      criticalRemaining,
      criticalLabel: `${criticalRemaining} critical ${criticalRemaining === 1 ? "task" : "tasks"} left`,
      message: score >= 90
        ? "You're almost move-ready."
        : score >= 60
          ? "A few important updates remain."
          : "Start with high-priority accounts.",
    };
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

  const getTaskGuidance = (cat, name) => {
    const guidance = {
      Banks: [
        `Log in to ${name}.`,
        "Go to Profile, Personal Info, Contact Info, or Account Settings.",
        "Update your mailing address.",
        "Check billing, statement, and card delivery preferences if shown.",
        "Save the change and look for a confirmation screen or message.",
      ],
      "Credit Cards": [
        `Log in to ${name}.`,
        "Go to Profile, Account Settings, Billing Address, or Contact Information.",
        "Update your mailing address.",
        "Review billing address, statement delivery, and replacement card settings.",
        "Save the change and confirm it appears on the account.",
      ],
      Utilities: [
        `Open your ${name} account or customer portal.`,
        "Find service address, billing address, or move service settings.",
        "Update the service address if the utility is moving with you.",
        "Update the billing address and review autopay details.",
        "Save changes and confirm the effective date or next bill address.",
      ],
      "Government / DMV": [
        `Open the official ${name} page.`,
        "Choose the address change, license, vehicle, voter, tax, or mailing address option.",
        "Enter your new address exactly as it should appear on official records.",
        "Review any ID, vehicle, or mailing record that may need a separate update.",
        "Submit and save the confirmation number or receipt if one is provided.",
      ],
      Subscriptions: [
        `Open ${name} account settings.`,
        "Find profile, billing, subscription, or saved address settings.",
        "Update your mailing or shipping address.",
        "Update billing address and saved payment details if needed.",
        "Save changes and check the next renewal or delivery details.",
      ],
      "Delivery Apps": [
        `Open ${name} profile or saved addresses.`,
        "Update your home, delivery, and checkout default addresses.",
        "Review billing address or payment profile details if shown.",
        "Remove the old address if you no longer want it offered at checkout.",
        "Save changes and confirm the new address is the default.",
      ],
      "Shopping / Ecommerce": [
        `Open ${name} account settings or address book.`,
        "Update your default shipping address.",
        "Update your billing address and saved checkout defaults.",
        "Review saved payment methods if the billing address is tied to a card.",
        "Save changes before placing any new orders.",
      ],
      Insurance: [
        `Log in to ${name} or contact your agent.`,
        "Find profile, policy, contact, or mailing address settings.",
        "Update your mailing and contact address.",
        "Review whether the move affects policy documents, premiums, or renewal notices.",
        "Save the update or request confirmation from your agent.",
      ],
      Healthcare: [
        `Open ${name} member portal or patient profile.`,
        "Find profile, member details, patient info, or contact settings.",
        "Update your mailing and contact address.",
        "Check benefits, claims, pharmacy, and paperless communication preferences.",
        "Save changes and confirm the new address is shown on your profile.",
      ],
      "Work / Payroll": [
        `Open ${name} or your HR portal.`,
        "Find personal info, HR profile, payroll, benefits, or tax form settings.",
        "Update your HR or payroll address.",
        "Confirm tax forms, benefits, retirement, and payroll records use the new address.",
        "Save changes or notify HR if the portal requires approval.",
      ],
    };

    return guidance[cat] || [
      `Open ${name} account settings.`,
      "Update your mailing address.",
      "Confirm billing, shipping, and notification preferences before saving.",
      "Save changes and look for a confirmation message.",
    ];
  };

  const getRequiredInfoChecklist = () => {
    const info = [
      { label: "Full name", value: savedName },
      { label: "New address", value: savedAddress },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
    ];

    if (moveDate) {
      info.push({ label: "Move date", value: moveDate });
    }

    return info;
  };

  const toggleCompletionCheck = (key) => {
    setCompletionChecks(checks => ({
      ...checks,
      [key]: !checks[key],
    }));
  };

  const goToWelcome = () => {
    setCurrentView("welcome");
    setActiveCategory(null);
    setSelectedItemId(null);
    setSearch("");
  };

  const closeDetailPanel = () => {
    if (activeCategory && categories[activeCategory]) {
      setCurrentView("category");
      setSelectedItemId(null);
      return;
    }

    goToWelcome();
  };

  const openProfile = () => {
    setCurrentView("profile");
    setActiveCategory(null);
    setSelectedItemId(null);
    setSearch("");
  };

  const openChecklist = () => {
    setCurrentView("categories");
    setActiveCategory(null);
    setSelectedItemId(null);
    setSearch("");
  };

  const startGuidedFlow = () => {
    const profileKeys = [
      "mm-first",
      "mm-last",
      "mm-email",
      "mm-phone",
      "mm-street",
      "mm-address2",
      "mm-city",
      "mm-state",
      "mm-zip",
      "mm-country",
      "mm-move-date",
    ];

    profileKeys.forEach(key => localStorage.removeItem(key));
    localStorage.removeItem("movemate-move-date");
    localStorage.setItem("movemate-categories", JSON.stringify(defaultCategories));
    localStorage.setItem("movemate-onboarding-complete", "true");
    localStorage.setItem("movemate-onboarding-categories", JSON.stringify(onboardingCategoryOptions.map(option => option.key)));
    localStorage.removeItem("movemate-current-view");
    localStorage.removeItem("movemate-active-category");
    localStorage.removeItem("movemate-selected-item");

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setStreet("");
    setAddress2("");
    setCity("");
    setState("");
    setZip("");
    setCountry("");
    setMoveDate("");
    setCategories(defaultCategories);
    setSelectedOnboardingCategories(onboardingCategoryOptions.map(option => option.key));
    setSelectedFlowCategories([]);
    setSummaryMode("selected");
    setActiveCategory(null);
    setSelectedItemId(null);
    setSearch("");
    setCopiedKey("");
    setIsEditingProfile(false);
    setCompletionChecks({
      mailing: false,
      secondaryAddress: false,
      saved: false,
    });
    setHasCompletedOnboarding(true);
    setCurrentView("profile");
  };

  const openOverallSummary = () => {
    setSummaryMode("overall");
    setActiveCategory(null);
    setSelectedItemId(null);
    setSearch("");
    setCurrentView("complete");
  };

  const selectCategory = (cat) => {
    setSelectedFlowCategories([cat]);
    setSelectedItemId(null);
  };

  const continueToCategory = () => {
    const nextCategory = selectedFlowCategories[0] || activeCategory;
    if (!nextCategory || !categories[nextCategory]) return;
    setActiveCategory(nextCategory);
    setSelectedItemId(null);
    setSearch("");
    setCurrentView("category");
  };

  const openTask = (cat, item) => {
    const isCompleted = getItemStatus(item) === "completed";
    setActiveCategory(cat);
    setSelectedItemId(item.id);
    setCompletionChecks({
      mailing: isCompleted,
      secondaryAddress: isCompleted,
      saved: isCompleted,
    });
    setCurrentView("task");
    if (getItemStatus(item) === "not_started") {
      updateItemStatus(cat, item.id, "in_progress");
    }
  };

  const continueToSelectedTask = () => {
    if (!activeCategory || !categories[activeCategory] || !selectedItemId) return;
    const selectedItem = categories[activeCategory].find(item => item.id === selectedItemId);
    if (!selectedItem) return;
    openTask(activeCategory, selectedItem);
  };

  const markSelectedTaskComplete = () => {
    if (!activeCategory || !selectedItemId) return;
    if (!Object.values(completionChecks).every(Boolean)) return;
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
    const itemName = name.trim();

    setCategories({
      ...categories,
      [activeCategory]: [
        ...categories[activeCategory],
        { id: nextId, text: itemName, link: finalLink, status: "not_started" },
      ],
    });

    setSearch("");
    setSelectedItemId(nextId);
  };

  const addSuggestedItem = (cat, name, link = "") => {
    if (!cat || !name.trim()) return;

    const currentItems = categories[cat] || [];
    const itemName = name.trim();
    const alreadyAdded = currentItems.some(item => item.text.toLowerCase() === itemName.toLowerCase());
    if (alreadyAdded) return;

    const finalLink = link || findLink(itemName);
    const nextId = Math.max(0, ...Object.values(categories).flat().map(item => Number(item.id) || 0)) + 1;

    setCategories({
      ...categories,
      [cat]: [
        ...currentItems,
        { id: nextId, text: itemName, link: finalLink, status: "not_started" },
      ],
    });

    if (cat === activeCategory) {
      setSelectedItemId(nextId);
    }
  };

  const getCategoryProgress = (cat) => {
    const items = categories[cat];
    return {
      total: items.length,
      done: items.filter(i => getItemStatus(i) === "completed").length,
    };
  };

  const getForgottenSuggestions = (cat) => {
    const existingByCategory = Object.fromEntries(
      Object.entries(categories).map(([categoryName, items]) => [
        categoryName,
        items.map(item => item.text.toLowerCase()),
      ])
    );
    const isMissing = (suggestion) => {
      const suggestionNames = [suggestion.name, ...(suggestion.aliases || [])].map(name => name.toLowerCase());
      return !(existingByCategory[suggestion.cat] || []).some(itemName =>
        suggestionNames.some(suggestionName => itemName === suggestionName || itemName.includes(suggestionName) || suggestionName.includes(itemName))
      );
    };
    const activeCategorySuggestions = forgottenAccountSuggestions.filter(suggestion =>
      suggestion.cat === cat && isMissing(suggestion)
    );
    const priorityCatchUps = forgottenAccountSuggestions.filter(suggestion => {
      if (suggestion.cat === cat || !priorityCategories.includes(suggestion.cat) || !isMissing(suggestion)) return false;
      const categoryProgress = categories[suggestion.cat] ? getCategoryProgress(suggestion.cat) : { total: 0, done: 0 };
      return categoryProgress.total === 0 || categoryProgress.done < categoryProgress.total;
    });

    return [...activeCategorySuggestions, ...priorityCatchUps].slice(0, 5);
  };

  const progress = (() => {
    const all = Object.values(categories).flat();
    const done = all.filter(i => getItemStatus(i) === "completed").length;
    return all.length ? Math.round((done / all.length) * 100) : 0;
  })();

  const estimatedTimeSaved = Object.entries(categories).reduce((total, [cat, items]) => {
    const completedItems = items.filter(item => getItemStatus(item) === "completed").length;
    return total + completedItems * getSavedTimeEstimate(cat);
  }, 0);

  const savedName = `${firstName} ${lastName}`.trim();
  const savedAddress = [street, address2, city, state, zip, country].filter(Boolean).join(", ");
  const fullProfileText = [
    savedName && `Name: ${savedName}`,
    email && `Email: ${email}`,
    phone && `Phone: ${phone}`,
    savedAddress && `Address: ${savedAddress}`,
    moveDate && `Move date: ${moveDate}`,
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
    const completedItems = selectedSummaryCategories.flatMap(cat => (
      (categories[cat] || [])
        .filter(item => getItemStatus(item) === "completed")
        .map(item => ({ ...item, cat }))
    ));
    const remainingItems = selectedSummaryCategories.flatMap(cat => (
      (categories[cat] || [])
        .filter(item => getItemStatus(item) !== "completed")
        .map(item => ({ ...item, cat }))
    ));

    let text = "MoveMate Summary\n\n";
    text += `Overall progress: ${progress}%\n`;
    text += `Estimated time saved: ${estimatedTimeSaved} minutes\n`;
    text += `${summaryMode === "overall" ? "Categories included" : "Selected category"}: ${selectedSummaryCategories.join(", ")}\n\n`;

    text += "Updated\n";
    text += completedItems.length
      ? completedItems.map(item => `- ${item.cat}: ${item.text}`).join("\n")
      : "- None yet";
    text += "\n\nNeeds attention\n";
    text += remainingItems.length
      ? remainingItems.map(item => `- ${item.cat}: ${item.text}`).join("\n")
      : "- Nothing remaining";
    text += "\n";

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
    setOnboardingStep(onboardingSteps.length - 1);
    setHasCompletedOnboarding(true);
  };

  const hasSelectedTask = Boolean(
    activeCategory &&
    selectedItemId &&
    categories[activeCategory]?.some(item => item.id === selectedItemId)
  );
  const selectedSummaryCategories = summaryMode === "overall" || !selectedFlowCategories.length ? Object.keys(categories) : selectedFlowCategories;

  const onboardingProgress = Math.round(((onboardingStep + 1) / onboardingSteps.length) * 100);
  const renderedView = (() => {
    if (!hasCompletedOnboarding || currentView === "onboarding") return "onboarding";
    if (currentView === "profile") return "profile";
    if (currentView === "category" && activeCategory && categories[activeCategory]) return "category";
    if (["categories", "checklist"].includes(currentView)) return "categories";
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
    const moveTimeline = getMoveTimeline();

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
              <div style={profileItem}>
                <span style={infoLabel}>Move date</span>
                <strong style={profileValue}>{moveDate || "Not set"}</strong>
              </div>
              <div style={profileItemWide}>
                <span style={infoLabel}>Full address</span>
                <strong style={profileValue}>{savedAddress}</strong>
              </div>
              <div style={profileItemWide}>
                <span style={infoLabel}>Move timeline</span>
                <strong style={profileValue}>{moveTimeline.message}</strong>
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
              <input aria-label="Move Date" type="date" value={moveDate} onChange={(e) => setMoveDate(e.target.value)} style={input} />

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
    const moveTimeline = getMoveTimeline();
    const readiness = getMoveReadiness();

    return (
      <Centered>
        <div style={workspaceHeader}>
          <div>
            <div style={eyebrow}>Step 3 of 5</div>
            <h1 style={workspaceTitle}>Choose what to update next</h1>
          </div>
          <span style={progressBadge}>{progress}% complete</span>
        </div>

        <p style={progressCopy}>Select a category to review its saved services before choosing the exact update to work on.</p>

        <div style={readinessCard}>
          <div style={readinessHeader}>
            <div>
              <div style={eyebrow}>Move readiness score</div>
              <strong style={readinessScore}>{readiness.score}%</strong>
            </div>
            <span style={readinessBadge}>{readiness.criticalLabel}</span>
          </div>
          <div style={readinessTrack}>
            <div style={{ ...readinessFill, width: `${readiness.score}%` }} />
          </div>
          <p style={readinessCopy}>{readiness.message}</p>
        </div>

        <div style={timelineCard}>
          <div style={eyebrow}>Move timeline</div>
          <strong style={timelineTitle}>{moveTimeline.label}</strong>
          <p style={timelineCopy}>{moveTimeline.message}</p>
          <div style={timelinePriorityList}>
            {priorityCategories.map(cat => (
              <span key={cat} style={timelinePriorityItem}>{cat}</span>
            ))}
          </div>
        </div>

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
            const priority = getCategoryPriority(cat);
            return (
              <button
                key={cat}
                style={selectedFlowCategories.includes(cat) ? categoryBtnSelected : categoryBtn}
                onClick={() => selectCategory(cat)}
              >
                <span style={categoryBtnContent}>
                  <span>
                    <strong style={categoryBtnTitle}>{cat} ({done}/{total})</strong>
                    <span style={categoryBtnMeta}>{priority.message}</span>
                  </span>
                  <span style={priority.style}>{priority.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={continueToCategory}
          style={selectedFlowCategories.length ? primaryBtn : primaryBtnDisabled}
          disabled={!selectedFlowCategories.length}
        >
          Next
        </button>
        <button onClick={openOverallSummary} style={secondaryBtn}>
          View Overall Summary
        </button>
        <button onClick={openProfile} style={secondaryBtn}>
          Back
        </button>
      </Centered>
    );
  }

  // ---------------- TASK ----------------
  if (renderedView === "task") {
    const selectedItem = categories[activeCategory].find(i => i.id === selectedItemId);
    const selectedStatus = getItemStatus(selectedItem);
    const taskGuidance = getTaskGuidance(activeCategory, selectedItem.text);
    const requiredInfo = getRequiredInfoChecklist();
    const canCompleteTask = selectedStatus === "completed" || Object.values(completionChecks).every(Boolean);
    const completionConfidenceItems = [
      { key: "mailing", label: "I updated my mailing address" },
      { key: "secondaryAddress", label: "I updated my billing/shipping address if needed" },
      { key: "saved", label: "I confirmed changes were saved" },
    ];
    const launchFocus = {
      Banks: "Mailing address, statement address, and card delivery details",
      "Credit Cards": "Mailing address, billing address, statements, and replacement card delivery",
      Utilities: "Service address, billing address, autopay, and effective date",
      "Government / DMV": "License, vehicle, voter, tax, or official mailing records",
      Subscriptions: "Mailing, billing, saved payment, and subscription delivery details",
      "Delivery Apps": "Home address, delivery defaults, checkout address, and payment profile",
      "Shopping / Ecommerce": "Default shipping address, billing address, and saved checkout details",
      Insurance: "Mailing address, contact address, policy documents, and renewal notices",
      Healthcare: "Mailing address, contact address, benefits, claims, and pharmacy records",
      "Work / Payroll": "HR profile, payroll address, tax forms, benefits, and retirement records",
    };
    const launchPrepItems = [
      { label: "Information ready", value: requiredInfo.map(item => item.label).join(", ") },
      { label: "What to update", value: launchFocus[activeCategory] || "Mailing, billing, shipping, and notification details" },
      { label: "Estimated time", value: getEstimatedTime(activeCategory) },
      { label: "Category guidance", value: taskGuidance[0] },
    ];

    return (
      <Centered>
        <div style={workspaceHeader}>
          <div>
            <div style={eyebrow}>Step 5 of 5</div>
            <h1 style={workspaceTitle}>Update your {selectedItem.text} address</h1>
            <p style={taskSubtitle}>{activeCategory}</p>
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

          <div style={guidanceCard}>
            <div style={eyebrow}>Smart Update Assistant</div>
            <strong style={guidanceTitle}>What to do</strong>
            <div style={guidanceList}>
              {taskGuidance.map((step, index) => (
                <div key={step} style={guidanceStep}>
                  <span style={guidanceNumber}>{index + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={guidanceCard}>
            <div style={eyebrow}>Information you may need</div>
            <div style={requiredInfoGrid}>
              {requiredInfo.map(item => (
                <div key={item.label} style={requiredInfoItem}>
                  <span style={infoLabel}>{item.label}</span>
                  <strong style={detailValue}>{item.value || "Not provided"}</strong>
                </div>
              ))}
            </div>

            <div style={quickCopySectionCompact}>
              <button onClick={() => copyText("detail-address", savedAddress)} style={copiedKey === "detail-address" ? copyBtnDone : copyBtn}>
                {copiedKey === "detail-address" ? "Copied!" : "Copy Full Address"}
              </button>
              <button onClick={() => copyText("detail-full", fullProfileText)} style={copiedKey === "detail-full" ? copyBtnDone : copyBtn}>
                {copiedKey === "detail-full" ? "Copied!" : "Copy Full Profile"}
              </button>
            </div>
          </div>

          <div style={preLaunchCard}>
            <div style={eyebrow}>Before you open {selectedItem.text}</div>
            <strong style={preLaunchTitle}>Prepare your update in MoveMate first.</strong>
            <p style={preLaunchCopy}>
              Copy your details, then open the company page and use the checklist below to confirm the update was saved.
            </p>

            <div style={launchPrepGrid}>
              {launchPrepItems.map(item => (
                <div key={item.label} style={launchPrepItem}>
                  <span style={infoLabel}>{item.label}</span>
                  <strong style={detailValue}>{item.value}</strong>
                </div>
              ))}
            </div>

            <div style={launchCopyActions}>
              <button onClick={() => copyText("launch-address", savedAddress)} style={copiedKey === "launch-address" ? copyBtnDone : copyBtn}>
                {copiedKey === "launch-address" ? "Copied!" : "Copy Full Address"}
              </button>
              <button onClick={() => copyText("launch-full", fullProfileText)} style={copiedKey === "launch-full" ? copyBtnDone : copyBtn}>
                {copiedKey === "launch-full" ? "Copied!" : "Copy Full Profile"}
              </button>
            </div>

            <div style={linkCard}>
              <span style={infoLabel}>{selectedItem.text} page</span>
              <a href={selectedItem.link} target="_blank" rel="noreferrer" style={detailLink}>
                {selectedItem.link}
              </a>
            </div>

            <button onClick={() => openUpdatePage(selectedItem.link)} style={launchPrimaryBtn}>
              Open {selectedItem.text} Page
            </button>
          </div>

          <div style={guidanceCard}>
            <div style={eyebrow}>Completion confidence</div>
            <strong style={guidanceTitle}>Confirm before marking this done</strong>
            <div style={completionChecklist}>
              {completionConfidenceItems.map(item => (
                <label key={item.key} style={completionCheckLabel}>
                  <input
                    type="checkbox"
                    checked={completionChecks[item.key]}
                    onChange={() => toggleCompletionCheck(item.key)}
                    style={completionCheckInput}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
            {!canCompleteTask && (
              <p style={confidenceNote}>Mark Completed unlocks after these checks are confirmed.</p>
            )}
          </div>

          <div style={modalActions}>
            <button
              onClick={markSelectedTaskComplete}
              style={selectedStatus === "completed" ? secondaryBtn : canCompleteTask ? primaryBtn : primaryBtnDisabled}
              disabled={!canCompleteTask}
            >
              Mark Completed
            </button>
            <button onClick={closeDetailPanel} style={secondaryBtn}>
              Back to {activeCategory}
            </button>
            <button onClick={openChecklist} style={secondaryBtn}>
              Back to Categories
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
    const categoryProgress = getCategoryProgress(activeCategory);
    const isCategoryComplete = items.length > 0 && categoryProgress.done === categoryProgress.total;
    const searchText = search.trim();
    const filteredItems = items.filter(i => i.text.toLowerCase().includes(searchText.toLowerCase()));
    const forgottenSuggestions = getForgottenSuggestions(activeCategory);

    const suggestions = (masterLists[activeCategory] || []).filter(item =>
      searchText &&
      item.name.toLowerCase().includes(searchText.toLowerCase()) &&
      !existing.includes(item.name.toLowerCase())
    );
    const hasExistingSearchMatch = existing.includes(searchText.toLowerCase());
    const hasExactSuggestionMatch = (masterLists[activeCategory] || []).some(item =>
      item.name.toLowerCase() === searchText.toLowerCase()
    );
    const canAddCustomItem = Boolean(searchText && !hasExistingSearchMatch && !hasExactSuggestionMatch && suggestions.length === 0);

    return (
      <Centered>
        <div style={workspaceHeader}>
          <div>
            <div style={eyebrow}>Step 4 of 5</div>
            <h1 style={workspaceTitle}>Choose your {activeCategory} account</h1>
          </div>
          <span style={progressBadge}>{categoryProgress.done}/{categoryProgress.total} done</span>
        </div>

        <p style={progressCopy}>
          Search common providers or add a custom account. Nothing is added until you choose it.
        </p>
        <p style={exampleHint}>{categoryExamples[activeCategory]}</p>

        {isCategoryComplete && (
          <div style={summaryCard}>
            <div style={eyebrow}>Category complete</div>
            <p style={progressCopy}>Every saved item in {activeCategory} is marked complete. You can choose another category or add another service.</p>
          </div>
        )}

        {forgottenSuggestions.length > 0 && (
          <div style={forgottenCard}>
            <div>
              <div style={eyebrow}>You may have forgotten</div>
              <strong style={forgottenTitle}>People often forget these during a move.</strong>
            </div>
            <div style={forgottenList}>
              {forgottenSuggestions.map(suggestion => (
                <div key={`${suggestion.cat}-${suggestion.name}`} style={forgottenSuggestion}>
                  <span style={forgottenSuggestionText}>
                    <strong style={serviceCardTitle}>{suggestion.name}</strong>
                    <span style={serviceCardMeta}>{suggestion.cat} - {suggestion.reason}</span>
                  </span>
                  <button
                    onClick={() => addSuggestedItem(suggestion.cat, suggestion.name, suggestion.link)}
                    style={forgottenAddBtn}
                  >
                    Add to checklist
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ position: "relative" }}>
          <input
            placeholder={`Search ${activeCategory} accounts...`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={input}
          />

          {searchText && suggestions.length > 0 && (
            <div style={suggestionBox}>
              {suggestions.map((item, i) => (
                <div key={i} style={suggestionItem} onClick={() => addItem(item.name, item.link)}>
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {canAddCustomItem && (
          <button onClick={() => addItem(searchText)} style={primaryBtn}>
            Add "{searchText}"
          </button>
        )}

        <div style={servicePickerGrid}>
          {filteredItems.map(item => {
            const itemStatus = getItemStatus(item);
            const itemRowStyle = item.id === selectedItemId
              ? serviceCardSelected
              : itemStatus === "completed"
                ? serviceCardCompleted
                : itemStatus === "in_progress"
                  ? serviceCardProgress
                  : serviceCard;

            return (
              <div
                key={item.id}
                style={itemRowStyle}
                onClick={() => setSelectedItemId(item.id)}
              >
                <div style={serviceCardContent}>
                  <span style={itemStatus === "completed" ? checkmarkDone : checkmark}>
                    {itemStatus === "completed" ? "✓" : ""}
                  </span>
                  <span>
                    <strong style={serviceCardTitle}>{item.text}</strong>
                    <span style={serviceCardMeta}>{getStatusLabel(itemStatus)}</span>
                  </span>
                </div>

                <div style={serviceCardActions}>
                  {item.id === selectedItemId && <span style={selectedServiceBadge}>Selected</span>}
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
        </div>

        {!filteredItems.length && (
          <div style={emptyServiceState}>
            {searchText ? "No added accounts match your search." : "No accounts added yet. Search above to add one."}
          </div>
        )}

        <button
          onClick={continueToSelectedTask}
          style={hasSelectedTask ? primaryBtn : primaryBtnDisabled}
          disabled={!hasSelectedTask}
        >
          Next
        </button>
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
    const moveTimeline = getMoveTimeline();
    const readiness = getMoveReadiness();
    const priorityRecommendations = getPriorityRecommendations();
    const completedItems = selectedSummaryCategories.flatMap(cat => (
      (categories[cat] || [])
        .filter(item => getItemStatus(item) === "completed")
        .map(item => ({ ...item, cat }))
    ));
    const remainingItems = selectedSummaryCategories.flatMap(cat => (
      (categories[cat] || [])
        .filter(item => getItemStatus(item) !== "completed")
        .map(item => ({ ...item, cat }))
    ));

    return (
      <Centered>
        <div style={summaryCard}>
          <div style={eyebrow}>Move workflow complete</div>
          <h2 style={summaryTitle}>Your MoveMate summary is ready.</h2>
          <p style={progressCopy}>You have a clean record of what was updated and what still needs attention.</p>

          <div style={readinessCard}>
            <div style={readinessHeader}>
              <div>
                <div style={eyebrow}>Move readiness score</div>
                <strong style={readinessScore}>{readiness.score}%</strong>
              </div>
              <span style={readinessBadge}>{readiness.criticalLabel}</span>
            </div>
            <div style={readinessTrack}>
              <div style={{ ...readinessFill, width: `${readiness.score}%` }} />
            </div>
            <p style={readinessCopy}>{readiness.message}</p>
          </div>

          <div style={timelineCard}>
            <div style={eyebrow}>Move timeline</div>
            <strong style={timelineTitle}>{moveTimeline.label}</strong>
            <p style={timelineCopy}>{moveTimeline.message}</p>
            <div style={timelinePriorityList}>
              {priorityCategories.map(cat => (
                <span key={cat} style={timelinePriorityItem}>{cat}</span>
              ))}
            </div>
          </div>

          <div style={prioritySummaryCard}>
            <div style={eyebrow}>Smart priority engine</div>
            <strong style={timelineTitle}>Recommended order</strong>
            <div style={prioritySummaryList}>
              {priorityRecommendations.length ? priorityRecommendations.map(item => (
                <div key={item.cat} style={prioritySummaryRow}>
                  <span>
                    <strong style={prioritySummaryName}>{item.cat}</strong>
                    <span style={categoryBtnMeta}>{item.message}</span>
                  </span>
                  <span style={item.style}>{item.label}</span>
                </div>
              )) : (
                <div style={emptyServiceState}>Everything selected is marked complete.</div>
              )}
            </div>
          </div>

          <div style={summaryStatsGrid}>
            <div style={summaryStat}>
              <span style={infoLabel}>{summaryMode === "overall" ? "Categories included" : "Selected category"}</span>
              <strong style={summaryStatValue}>{selectedSummaryCategories.join(", ")}</strong>
            </div>
            <div style={summaryStat}>
              <span style={infoLabel}>Overall progress</span>
              <strong style={summaryStatValue}>{progress}%</strong>
            </div>
            <div style={summaryStat}>
              <span style={infoLabel}>Items completed</span>
              <strong style={summaryStatValue}>{completedItems.length}</strong>
            </div>
            <div style={summaryStat}>
              <span style={infoLabel}>Items remaining</span>
              <strong style={summaryStatValue}>{remainingItems.length}</strong>
            </div>
            <div style={summaryStatWide}>
              <span style={infoLabel}>Estimated time saved</span>
              <strong style={summaryStatValue}>{estimatedTimeSaved} minutes</strong>
            </div>
          </div>

          <div style={summaryGroup}>
            <strong>What you updated</strong>
            {completedItems.length ? completedItems.map(item => (
              <div key={`${item.cat}-${item.id}`}>✓ {item.cat}: {item.text}</div>
            )) : <div>None yet</div>}
          </div>

          <div style={summaryGroup}>
            <strong>Still needs attention</strong>
            {remainingItems.length ? remainingItems.map(item => (
              <div key={`${item.cat}-${item.id}`}>• {item.cat}: {item.text}</div>
            )) : <div>Nothing remaining</div>}
          </div>

          <div style={quickActionsGrid}>
            <button onClick={downloadChecklist} style={primaryBtn}>Download Summary / Checklist</button>
            <button onClick={openChecklist} style={secondaryBtn}>Back to Categories</button>
            <button onClick={startGuidedFlow} style={secondaryBtn}>Start New Guided Flow</button>
          </div>
        </div>
      </Centered>
    );
  }

  // ---------------- MAIN ----------------
  const readiness = getMoveReadiness();

  return (
    <Centered>
      <div style={dashboardHero}>
        <div>
          <div style={eyebrow}>Step 1 of 5</div>
          <h1 style={dashboardTitle}>Ready to update your move details?</h1>
        </div>
      </div>

      <div style={readinessCard}>
        <div style={readinessHeader}>
          <div>
            <div style={eyebrow}>Move readiness score</div>
            <strong style={readinessScore}>{readiness.score}%</strong>
          </div>
          <span style={readinessBadge}>{readiness.criticalLabel}</span>
        </div>
        <div style={readinessTrack}>
          <div style={{ ...readinessFill, width: `${readiness.score}%` }} />
        </div>
        <p style={readinessCopy}>{readiness.message}</p>
      </div>

      <button onClick={startGuidedFlow} style={primaryBtn}>
        Start Guided Flow
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

const summaryStatsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 10,
  marginBottom: 18,
};

const summaryStat = {
  padding: 14,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--row-bg)",
  boxShadow: "var(--shadow-subtle)",
};

const summaryStatWide = {
  ...summaryStat,
  gridColumn: "1 / -1",
};

const summaryStatValue = {
  display: "block",
  marginTop: 4,
  color: "var(--text-h)",
  lineHeight: "135%",
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

const readinessCard = {
  display: "grid",
  gap: 10,
  margin: "0 0 18px",
  padding: 18,
  border: "1px solid var(--accent-border)",
  borderRadius: 12,
  background: "linear-gradient(180deg, var(--action-bg), var(--surface) 72%)",
  boxShadow: "var(--shadow-subtle)",
};

const readinessHeader = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
};

const readinessScore = {
  display: "block",
  marginTop: 4,
  color: "var(--text-h)",
  fontSize: 34,
  lineHeight: "100%",
};

const readinessBadge = {
  padding: "6px 10px",
  border: "1px solid var(--accent-border)",
  borderRadius: 999,
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
  fontSize: 12,
  fontWeight: 900,
  whiteSpace: "nowrap",
};

const readinessTrack = {
  width: "100%",
  height: 10,
  overflow: "hidden",
  border: "1px solid var(--border)",
  borderRadius: 999,
  background: "var(--secondary-bg)",
};

const readinessFill = {
  height: "100%",
  borderRadius: 999,
  background: "var(--accent)",
  transition: "width 0.28s ease",
};

const readinessCopy = {
  margin: 0,
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 800,
  lineHeight: "145%",
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

const quickActionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 10,
};

const checklistOverviewCard = {
  margin: "0 0 24px",
  padding: 22,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-hover)",
};

const timelineCard = {
  display: "grid",
  gap: 8,
  margin: "0 0 18px",
  padding: 16,
  border: "1px solid var(--accent-border)",
  borderRadius: 12,
  background: "var(--action-bg)",
  boxShadow: "var(--shadow-subtle)",
};

const timelineTitle = {
  display: "block",
  color: "var(--text-h)",
  lineHeight: "135%",
};

const timelineCopy = {
  margin: 0,
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 700,
  lineHeight: "145%",
};

const timelinePriorityList = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 2,
};

const timelinePriorityItem = {
  padding: "5px 8px",
  border: "1px solid var(--border)",
  borderRadius: 999,
  background: "var(--surface)",
  color: "var(--text-h)",
  fontSize: 12,
  fontWeight: 800,
};

const prioritySummaryCard = {
  display: "grid",
  gap: 12,
  margin: "0 0 18px",
  padding: 16,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const prioritySummaryList = {
  display: "grid",
  gap: 10,
};

const prioritySummaryRow = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  padding: 12,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--row-bg)",
};

const prioritySummaryName = {
  display: "block",
  color: "var(--text-h)",
  lineHeight: "135%",
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

const servicePickerGrid = {
  display: "grid",
  gap: 12,
  marginTop: 14,
};

const serviceCard = {
  ...row,
  alignItems: "flex-start",
  minHeight: 76,
  marginBottom: 0,
  cursor: "pointer",
};

const serviceCardSelected = {
  ...serviceCard,
  borderColor: "var(--accent-border)",
  background: "var(--accent-bg)",
  boxShadow: "var(--shadow-hover)",
};

const serviceCardProgress = {
  ...serviceCard,
  borderColor: "var(--accent-border)",
  background: "var(--accent-bg)",
};

const serviceCardCompleted = {
  ...serviceCard,
  borderColor: "var(--success-border)",
  background: "var(--success-bg)",
};

const serviceCardContent = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
};

const serviceCardTitle = {
  display: "block",
  lineHeight: "135%",
};

const serviceCardMeta = {
  display: "block",
  marginTop: 2,
  color: "var(--text)",
  fontSize: 13,
  fontWeight: 700,
};

const serviceCardActions = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  flex: "0 0 auto",
};

const selectedServiceBadge = {
  padding: "4px 8px",
  borderRadius: 999,
  background: "var(--accent)",
  color: "white",
  fontSize: 12,
  fontWeight: 800,
  whiteSpace: "nowrap",
};

const emptyServiceState = {
  marginTop: 12,
  padding: 16,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--secondary-bg)",
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 700,
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

const categoryBtnSelected = {
  ...categoryBtn,
  borderColor: "var(--accent-border)",
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
};

const categoryBtnContent = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  width: "100%",
  textAlign: "left",
};

const categoryBtnTitle = {
  display: "block",
  lineHeight: "135%",
};

const categoryBtnMeta = {
  display: "block",
  marginTop: 2,
  color: "var(--text)",
  fontSize: 12,
  fontWeight: 700,
  lineHeight: "135%",
};

const priorityBadgeBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0 auto",
  maxWidth: 150,
  padding: "5px 8px",
  border: "1px solid var(--border)",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 900,
  lineHeight: "120%",
  textAlign: "center",
  whiteSpace: "normal",
};

const priorityBadgeHigh = {
  ...priorityBadgeBase,
  borderColor: "rgba(220, 38, 38, 0.22)",
  background: "rgba(254, 226, 226, 0.72)",
  color: "#b91c1c",
};

const priorityBadgeRecommended = {
  ...priorityBadgeBase,
  borderColor: "var(--accent-border)",
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
};

const priorityBadgeLow = {
  ...priorityBadgeBase,
  background: "var(--secondary-bg)",
  color: "var(--text)",
};

const priorityBadgeDone = {
  ...priorityBadgeBase,
  borderColor: "var(--success-border)",
  background: "var(--success-bg)",
  color: "#15803d",
};

const primaryBtn = {
  ...buttonBase,
  marginTop: 14,
  background: "var(--accent)",
  color: "white",
  boxShadow: "0 10px 20px rgba(37, 99, 235, 0.18)",
};

const primaryBtnDisabled = {
  ...primaryBtn,
  opacity: 0.5,
  cursor: "not-allowed",
};

const secondaryBtn = {
  ...buttonBase,
  marginTop: 12,
  background: "var(--secondary-bg)",
  color: "var(--text-h)",
  borderColor: "var(--border)",
};

const forgottenCard = {
  display: "grid",
  gap: 12,
  margin: "0 0 18px",
  padding: 18,
  border: "1px solid var(--accent-border)",
  borderRadius: 12,
  background: "linear-gradient(180deg, var(--action-bg), var(--surface) 72%)",
  boxShadow: "var(--shadow-subtle)",
};

const forgottenTitle = {
  display: "block",
  marginTop: 4,
  color: "var(--text-h)",
  lineHeight: "135%",
};

const forgottenList = {
  display: "grid",
  gap: 10,
};

const forgottenSuggestion = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  padding: 12,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const forgottenSuggestionText = {
  display: "block",
  minWidth: 0,
};

const forgottenAddBtn = {
  ...buttonBase,
  width: "auto",
  minWidth: 132,
  minHeight: 38,
  padding: "9px 11px",
  borderColor: "var(--accent-border)",
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
  fontSize: 13,
  whiteSpace: "nowrap",
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

const taskSubtitle = {
  margin: "8px 0 0",
  color: "var(--text)",
  fontSize: 15,
  fontWeight: 800,
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

const guidanceCard = {
  display: "grid",
  gap: 12,
  marginBottom: 12,
  padding: 16,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const guidanceTitle = {
  display: "block",
  lineHeight: "140%",
};

const guidanceList = {
  display: "grid",
  gap: 10,
};

const guidanceStep = {
  display: "grid",
  gridTemplateColumns: "28px 1fr",
  gap: 10,
  alignItems: "flex-start",
  color: "var(--text)",
  fontSize: 14,
  lineHeight: "145%",
};

const guidanceNumber = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: 999,
  background: "var(--accent-bg)",
  color: "var(--accent-strong)",
  fontSize: 12,
  fontWeight: 900,
};

const completionChecklist = {
  display: "grid",
  gap: 10,
};

const completionCheckLabel = {
  display: "grid",
  gridTemplateColumns: "20px 1fr",
  gap: 10,
  alignItems: "flex-start",
  color: "var(--text-h)",
  fontSize: 14,
  fontWeight: 700,
  lineHeight: "145%",
  cursor: "pointer",
};

const completionCheckInput = {
  width: 16,
  height: 16,
  marginTop: 2,
  accentColor: "var(--accent)",
  cursor: "pointer",
};

const confidenceNote = {
  margin: 0,
  color: "var(--text)",
  fontSize: 13,
  fontWeight: 700,
};

const requiredInfoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 10,
};

const requiredInfoItem = {
  padding: 12,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--row-bg)",
};

const preLaunchCard = {
  display: "grid",
  gap: 12,
  marginBottom: 12,
  padding: 18,
  border: "1px solid var(--accent-border)",
  borderRadius: 12,
  background: "linear-gradient(180deg, var(--action-bg), var(--surface) 72%)",
  boxShadow: "var(--shadow-hover)",
};

const preLaunchTitle = {
  display: "block",
  color: "var(--text-h)",
  fontSize: 18,
  lineHeight: "135%",
};

const preLaunchCopy = {
  margin: 0,
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 700,
  lineHeight: "145%",
};

const launchPrepGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
};

const launchPrepItem = {
  padding: 12,
  border: "1px solid var(--border)",
  borderRadius: 12,
  background: "var(--surface)",
  boxShadow: "var(--shadow-subtle)",
};

const launchCopyActions = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const launchPrimaryBtn = {
  ...primaryBtn,
  marginTop: 0,
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

const infoLabel = {
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 700,
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

const exampleHint = {
  margin: "-6px 0 18px",
  color: "var(--text)",
  fontSize: 13,
  fontWeight: 700,
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

export default App;
