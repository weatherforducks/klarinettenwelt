const sections = [
  "home",
  "blog",
  "gallery",
  "contact",
  "impressum",
  "privacy"
];

const dict = {
  en: {
    home: "Home",
    blog: "Blog",
    gallery: "Gallery",
    galleryTitle: "Gallery",
    watchYouTube: "Watch on YouTube ↗",
    contact: "Contact",
    homeTitle: "Klarinettenwelt",
    homeText:
      "Stories, observations and knowledge about clarinets, sound, material and instrument making.",
    blogTitle: "Blog",
    blogText:
      "Articles about clarinets, mouthpieces, restoration, sound and instrument history.",
    blogSoon: "The first articles are coming soon.",
    contactTitle: "Contact",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    orEmail: "Or email:"
  },

  de: {
    home: "Home",
    blog: "Blog",
    gallery: "Galerie",
    galleryTitle: "Galerie",
    watchYouTube: "Auf YouTube ansehen ↗",
    contact: "Kontakt",
    homeTitle: "Klarinettenwelt",
    homeText:
      "Geschichten, Beobachtungen und Wissen über Klarinetten, Klang, Material und Instrumentenbau.",
    blogTitle: "Blog",
    blogText:
      "Artikel über Klarinetten, Mundstücke, Restaurierung, Klang und Instrumentengeschichte.",
    blogSoon: "Die ersten Beiträge erscheinen demnächst.",
    contactTitle: "Kontakt",
    name: "Name",
    email: "E-Mail",
    message: "Nachricht",
    send: "Senden",
    orEmail: "Oder per E-Mail:"
  },

  ua: {
    home: "Додому",
    blog: "Блог",
    gallery: "Галерея",
    galleryTitle: "Галерея",
    watchYouTube: "Дивитися на YouTube ↗",
    contact: "Контакт",
    homeTitle: "Klarinettenwelt",
    homeText:
      "Історії, спостереження та знання про кларнети, звук, матеріал і виготовлення інструментів.",
    blogTitle: "Блог",
    blogText:
      "Статті про кларнети, мундштуки, реставрацію, звук та історію інструментів.",
    blogSoon: "Перші матеріали з’являться незабаром.",
    contactTitle: "Контакт",
    name: "Ім’я",
    email: "Електронна пошта",
    message: "Повідомлення",
    send: "Надіслати",
    orEmail: "Або напишіть:"
  }
};

function showSection(id) {
  const activeSection = sections.includes(id) ? id : "home";

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.hidden = sectionId !== activeSection;
    }
  });

  const panel = document.querySelector(".panel");

  if (panel) {
    panel.style.display = activeSection === "home" ? "none" : "";
    panel.classList.toggle("panel-wide", activeSection === "blog");
  }

  const hero = document.querySelector(".hero");

  if (hero) {
    const backgrounds = {
      home: "./assets/rock.JPG",
      blog: "./assets/hero.JPG",
      gallery: "./assets/contact.jpeg",
      contact: "./assets/gallery.jpeg",
      impressum: "./assets/rock.JPG",
      privacy: "./assets/rock.JPG"
    };

    hero.className = `hero ${activeSection}`;
    hero.style.backgroundImage =
      `url("${backgrounds[activeSection]}")`;
  }
}

function setLang(lang) {
  const selectedLanguage = dict[lang] ? lang : "de";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translation = dict[selectedLanguage][key];

    if (translation !== undefined) {
      element.textContent = translation;
    }
  });

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.lang === selectedLanguage
    );
  });

  document.documentElement.lang =
    selectedLanguage === "ua" ? "uk" : selectedLanguage;

  localStorage.setItem("kw_lang", selectedLanguage);
}

document.querySelectorAll("[data-section]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const sectionId = link.dataset.section;

    if (sections.includes(sectionId)) {
      showSection(sectionId);
      window.location.hash = sectionId;
    }
  });
});

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => {
    setLang(button.dataset.lang);
  });
});

window.addEventListener("hashchange", () => {
  const sectionFromHash =
    window.location.hash.replace("#", "") || "home";

  showSection(sectionFromHash);
});

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

setLang(localStorage.getItem("kw_lang") || "de");

const initialSection =
  window.location.hash.replace("#", "") || "home";

showSection(initialSection);
const musicBtn = document.getElementById("music-btn");
const musicPath = document.getElementById("music-path");
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.3;
const speakerOn =
  "M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z";

const speakerOff =
  "M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z";

if (musicBtn && musicPath && bgMusic) {
  musicBtn.addEventListener("click", async () => {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();

        musicPath.setAttribute("d", speakerOn);
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("aria-label", "Pause music");
      } catch (error) {
        console.error("Music could not start:", error);
      }
    } else {
      bgMusic.pause();

      musicPath.setAttribute("d", speakerOff);
      musicBtn.classList.remove("playing");
      musicBtn.setAttribute("aria-label", "Play music");
    }
  });
}