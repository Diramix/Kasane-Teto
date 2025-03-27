// Main setInterval
/*--------------------------------------------*/
setInterval(() => {
    updateBackgroundImage();
    updateVibeBackgroundImage();
    coverAndAssetsImagesElements();
    updateText();
    enchancedTracks();
}, 300);
/*--------------------------------------------*/

// Скрипт для смены темы
/*--------------------------------------------*/
function yandexThemeUpdate() {
  const body = document.body;
  if (!body.classList.contains('ym-dark-theme') && !body.classList.contains('ym-light-theme')) {
    body.classList.add('ym-light-theme');
  } else if (body.classList.contains('ym-dark-theme')) {
    body.classList.replace('ym-dark-theme', 'ym-light-theme');
  }
};
yandexThemeUpdate();
/*--------------------------------------------*/

// Change fullscreen player background image script
/*--------------------------------------------*/
function updateBackgroundImage() {
    const imgElements = document.querySelectorAll('[class*="FullscreenPlayerDesktopPoster_cover"]');
    let imgBackground = "";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/400x400')) {
            imgBackground = img.src.replace('/400x400', '/1000x1000');
        }
    });

    if (imgBackground) {
        const newBackgroundWithGradient = `linear-gradient(180deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.75) 100%), url(${imgBackground}) center center / cover no-repeat`;
        const normalNewBackground = `url(${imgBackground}) center center / cover no-repeat`;

        const img = new Image();
        img.src = imgBackground;

        img.onload = () => {
            const elementsWithGradient = [
                '.FullscreenPlayerDesktop_modalContent__Zs_LC'
            ];

            const elementsWithoutGradient = [
                '.Diva-Cover',
                '.CoverImage'
            ];

            elementsWithGradient.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.background = newBackgroundWithGradient;
                }
            });

            elementsWithoutGradient.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.background = normalNewBackground;
                }
            });
        };
    }
};
/*--------------------------------------------*/

// Change vibe block background image script
/*--------------------------------------------*/
function updateVibeBackgroundImage() {
    const imgElements = document.querySelectorAll('[class*="PlayerBarDesktop_cover"]');
    let imgBackground = "";
    const additionalImage = "http://127.0.0.1:2007/assets/My-vibe.png";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/100x100')) {
            imgBackground = img.src.replace('/100x100', '/1000x1000');
        }
    });

    const targetElement = document.querySelector('.MainPage_vibe__XEBbh');
    if (targetElement && isElementInViewport(targetElement)) {
        targetElement.style.position = 'relative';
        targetElement.style.overflow = 'hidden';

        let blurElement = targetElement.querySelector('.blur-element');
        if (!blurElement) {
            blurElement = document.createElement('div');
            blurElement.classList.add('blur-element');
            blurElement.style.position = 'absolute';
            blurElement.style.top = 0;
            blurElement.style.left = 0;
            blurElement.style.width = '100%';
            blurElement.style.height = '100%';
            blurElement.style.backgroundColor = '#D46A83';
            blurElement.style.filter = 'blur(0px) brightness(0.5)';
            blurElement.style.zIndex = '1';
            targetElement.appendChild(blurElement);
        }
        
        if (blurElement.style.background !== `url(${imgBackground}) center center / cover no-repeat`) {
            blurElement.style.background = `url(${imgBackground}) center center / cover no-repeat`;
        }

        let additionalImageElement = targetElement.querySelector('.additional-image-element');
        if (!additionalImageElement) {
            additionalImageElement = document.createElement('div');
            additionalImageElement.classList.add('additional-image-element');
            additionalImageElement.style.position = 'absolute';
            additionalImageElement.style.top = 0;
            additionalImageElement.style.left = 0;
            additionalImageElement.style.width = '100%';
            additionalImageElement.style.height = '100%';
            additionalImageElement.style.background = `url(${additionalImage}) center center / cover no-repeat`;
            additionalImageElement.style.borderRadius = '10px';
            additionalImageElement.style.zIndex = '2';
            additionalImageElement.style.imageRendering = 'crisp-edges';
            targetElement.appendChild(additionalImageElement);
        }

        const childElements = targetElement.querySelectorAll(':scope > *:not(.additional-image-element):not(.blur-element)');
        childElements.forEach(child => {
            if (child.style.zIndex !== '3') {
                child.style.position = 'relative';
                child.style.zIndex = '3';
            }
        });
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}
/*--------------------------------------------*/

// CoverImage для исправления багов с обложкой в фуллскрине
// Элемент для отображения картинок в фуллскрине
/*--------------------------------------------*/
function coverAndAssetsImagesElements() {
    let container = document.querySelector('.FullscreenPlayerDesktopContent_root__tKNGK');
    
    if (container) {
        if (!container.querySelector('.CoverImage')) {
            let newElement = document.createElement('div');
            newElement.classList.add('CoverImage');
            container.appendChild(newElement);
        }

        if (!container.querySelector('.AssetsImages')) {
            let newElement = document.createElement('div');
            newElement.classList.add('AssetsImages');
            container.appendChild(newElement);
        }
    }
};
/*--------------------------------------------*/

// Скрипт для добавления элемента Diva Cover
/*--------------------------------------------*/
const observer = new MutationObserver(() => {
  ['Diva-Cover', 'Diva-Perfect-Mark'].forEach(className => {
    if (document.querySelector('.PlayButtonWithCover_coverImage__DhS1R') && !document.querySelector(`.${className}`)) {
      document.querySelector('.PlayQueue_root__ponhw')?.appendChild(Object.assign(document.createElement('div'), { className }));
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
/*--------------------------------------------*/

// Kasane Teto!
/*--------------------------------------------*/
const isThemeTitleText = document.querySelector('.themeTitleText')
if (!isThemeTitleText) {
    const themeTitleText = document.createElement('div');
    themeTitleText.className = 'ThemeTitleText';

    themeTitleText.style.position = 'fixed';
    themeTitleText.style.visibility = 'visible';
    themeTitleText.style.fontFamily = '"Vocaloid", sans-serif';
    themeTitleText.style.fontSize = '16px';
    themeTitleText.style.fontWeight = '1000';
    themeTitleText.style.left = '50%';
    themeTitleText.style.marginLeft = '-66px';
    themeTitleText.style.top = '10px';
    themeTitleText.style.color = 'var(--main-color)';
    themeTitleText.style.zIndex = '1';

    themeTitleText.textContent = 'Kasane Teto!';

    document.body.appendChild(themeTitleText);
}
/*--------------------------------------------*/

// Скрипт для добавления элемента Miku-Run
/*--------------------------------------------*/
const newElement = document.createElement('div');
newElement.className = 'mikuRun';
document.body.appendChild(newElement);
/*--------------------------------------------*/

/*Управление handleEvents.json*/
/*--------------------------------------------*/
let settings = {};

function log(text) {
    console.log('[Customizable LOG]: ', text)
}

async function getSettings() {
    try {
        const response = await fetch("http://127.0.0.1:2007/get_handle?name=Vocaloid Miku!");
        if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);
        const data = await response.json();
        if (!data?.data?.sections) {
            console.warn("Структура данных не соответствует ожидаемой.");
            return {};
        }
        return Object.fromEntries(data.data.sections.map(({ title, items }) => [
            title,
            Object.fromEntries(items.map(item => [
                item.id,
                item.bool ?? item.input ?? Object.fromEntries(item.buttons?.map(b => [b.name, b.text]) || [])
            ]))
        ]));
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return {};
    }
}

let settingsDelay = 1000;
let baseUrl = 'http://127.0.0.1:2007/assets/fullscreen-lyrics.jpg'
let baseBlur = 0;
let updateInterval;

async function setSettings(newSettings) {
    // Кастом картинка в SyncLyrics
    const syncLyricsBackground = document.querySelector('.SyncLyrics_root__6KZg4');
    let style = document.getElementById('sync-lyrics-style');
    if (!style) {
        style = document.createElement('style');
        style.id = 'sync-lyrics-style';
        document.head.appendChild(style);
    }

    function updateBackground(url) {
        if (style.textContent !== `.SyncLyrics_root__6KZg4 { background-image: url("${url}"); }`) {
            style.textContent = `.SyncLyrics_root__6KZg4 { background-image: url("${url}"); }`;
        }
    }

    const newUrl = newSettings?.['SyncLyrics']?.backgroundUrl?.text || baseUrl;
    applyBackground = !!newSettings['SyncLyrics'].coverImage;

    if (applyBackground) {
        const checkBackground = setInterval(() => {
            const img = [...document.querySelectorAll('[class*="FullscreenPlayerDesktopPoster_cover"]')]
                .find(img => img.src && img.src.includes('/400x400'));

            if (img) {
                updateBackground(img.src.replace('/400x400', '/1000x1000'));
                clearInterval(checkBackground);
            }
        }, settingsDelay);
    } else {
        updateBackground(newUrl);
    }

    // Blur Filter
    let blurStyle = document.getElementById("blur-style");
    if (!blurStyle) {
        blurStyle = document.createElement("style");
        blurStyle.id = "blur-style";
        document.head.appendChild(blurStyle);
    }

    const newBlur = parseInt(newSettings['SyncLyrics'].blurFilter.text, 10) || 0;
    if (baseBlur !== newBlur) {
        baseBlur = newBlur;
        blurStyle.textContent = `.SyncLyrics_root__6KZg4::after { backdrop-filter: blur(${baseBlur}px); content: ''; position: absolute; inset: 0; }`;
    }

    let combinedStyle = document.getElementById('combined-style');
    if (!combinedStyle) {
        combinedStyle = document.createElement('style');
        combinedStyle.id = 'combined-style';
        document.head.appendChild(combinedStyle);
    }
    
    combinedStyle.textContent = `
        .Diva-Perfect-Mark {
            display: ${newSettings['Очередь'].togglePerfectMark ? 'block' : 'none'} !important;
        }
    
        .PlayQueue_content__zIUvd * [aria-label="Трек скачан"],
        .PlayQueue_content__zIUvd * [aria-label="Этот трек можете слушать только вы"] {
            display: ${newSettings['Очередь'].toggleDownloadAndVisibleIcon ? 'block' : 'none'} !important;
        }
    
        .AssetsImages:after {
            display: ${newSettings['Fullscreen'].toggleFullscreenMikuXD ? 'block' : 'none'} !important;
        }
    `;

    // Auto Play
    if (newSettings['Developer'].devAutoPlayOnStart && !window.hasRun) {
        document.querySelector(`section.PlayerBar_root__cXUnU * [data-test-id="PLAY_BUTTON"]`)
        ?.click();
        window.hasRun = true;
    }

    // Update theme settings delay
    if (Object.keys(settings).length === 0 || settings['Особое'].setInterval.text !== newSettings['Особое'].setInterval.text) {
        const newDelay = parseInt(newSettings['Особое'].setInterval.text, 10) || 1000;
        if (settingsDelay !== newDelay) {
            settingsDelay = newDelay;

            // Обновление интервала
            clearInterval(updateInterval);
            updateInterval = setInterval(update, settingsDelay);
        }
    }
}

async function update() {
    const newSettings = await getSettings();
    await setSettings(newSettings);
    settings = newSettings;
}

function init() {
    update();
    updateInterval = setInterval(update, settingsDelay);
}

init();
/*--------------------------------------------*/

// TransTetor
/*--------------------------------------------*/
const translitMap = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z',
    'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R',
    'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
    'Ы': 'Y', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya', 'Ь': "'", 'ь': "'",
    'ъ': '',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z',
    'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
    'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

function transliterate(text) {
    text = text.replace(/ъ/g, '');
    return text.replace(/\([^)]*\)/g, '').split('').map(char => translitMap[char] || char).join('');
}

function updateText() {
    document.querySelectorAll(".SyncLyricsLine_root__r62BN").forEach(element => {
        element.textContent = transliterate(element.textContent);
    });
}
/*--------------------------------------------*/

/*лоКАЛизация*/
/*--------------------------------------------*/
async function autoReplaceText() {
    const cacheKey = 'translations';
    let translations = JSON.parse(localStorage.getItem(cacheKey)) || { textChanges: [] };
    const modifiedNodes = new WeakSet();

    async function loadTranslations() {
        try {
            const response = await fetch('http://127.0.0.1:2007/assets/lang.json');
            if (!response.ok) throw new Error('Ошибка загрузки');
            const data = await response.json();
            localStorage.setItem(cacheKey, JSON.stringify(data));
            return data;
        } catch (error) {
            console.error(error);
            return translations;
        }
    }

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function replaceTextInNode(node, changes) {
        let text = node.textContent;
        changes.forEach(({ st, rt }) => {
            if (text.includes(st)) text = text.replaceAll(st, Array.isArray(rt) ? getRandomItem(rt) : rt);
        });
        if (text !== node.textContent) {
            node.textContent = text;
            modifiedNodes.add(node);
        }
    }

    function applyTextChanges() {
        translations.textChanges.forEach(({ sel, changes }) => {
            document.querySelectorAll(sel.join(',')).forEach(element => {
                const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
                let node;
                while ((node = walker.nextNode()) && !modifiedNodes.has(node)) {
                    replaceTextInNode(node, changes);
                }
            });
        });
    }

    translations = await loadTranslations();
    applyTextChanges();
    new MutationObserver(applyTextChanges).observe(document.body, { childList: true, subtree: true });
}
autoReplaceText();
/*--------------------------------------------*/

// Ссылко-кнопки
/*--------------------------------------------*/
document.addEventListener('click', function(event) {
    const actions = [
        // Эквалайзер
        {
            selector: '[aria-label="Выключить эквалайзер"]',
            url: 'https://www.youtube.com/watch?v=b3tTC_TkLyE'
        },
        // Гифка
        {
            selector: '.ReleaseNotesModal_modalHeader__gp9SA',
            url: 'https://www.youtube.com/watch?v=BIkPw5pOp4Y'
        }
    ];

    for (const action of actions) {
        if (event.target.closest(action.selector)) {
            window.open(action.url, '_blank');
            break;
        }
    }
});
/*--------------------------------------------*/

// Enchanced Tracks
/*--------------------------------------------*/
let trackData = [];

async function enchancedTracks() {
    try {
        const response = await fetch("http://127.0.0.1:2007/assets/effects.json");
        if (!response.ok) throw new Error("Failed to load track data");
        trackData = await response.json();
    } catch (error) {}

    const trackName = document.querySelector('section.PlayerBar_root__cXUnU * .Meta_title__GGBnH')?.textContent.trim();
    const artistName = document.querySelector('section.PlayerBar_root__cXUnU * [data-test-id="SEPARATED_ARTIST_TITLE"]')?.textContent.trim();
    const currentTimecode = document.querySelector('section.PlayerBar_root__cXUnU * [data-test-id="TIMECODE_TIME_START"]')?.textContent.trim();

    const activeStyles = new Set();

    trackData.forEach(({ track }) => {
        const { title, artist, times } = track;
        if (artistName === artist && trackName === title) {
            times.forEach(({ tc, tcend, cssFile }) => {
                const cssUrl = `http://127.0.0.1:2007/assets/${cssFile}.css`;
                if (currentTimecode >= tc && currentTimecode < tcend) {
                    activeStyles.add(cssFile);
                    if (tc === "00:00" && !document.querySelector('section.PlayerBar_root__cXUnU * [data-test-id="PAUSE_BUTTON"]')) {
                        return; // Не применяем стиль, если нет кнопки паузы
                    }
                    if (!document.querySelector(`style[data-css-file="${cssFile}"]`)) {
                        applyStyle(cssUrl, cssFile);
                    }
                }
            });
        }
    });

    document.querySelectorAll("style[data-css-file]").forEach(styleElement => {
        if (!activeStyles.has(styleElement.getAttribute("data-css-file"))) {
            styleElement.remove();
        }
    });
}

async function applyStyle(cssUrl, cssFile) {
    try {
        const response = await fetch(cssUrl);
        if (!response.ok) throw new Error("Failed to load CSS");
        const cssText = await response.text();

        const styleElement = document.createElement('style');
        styleElement.textContent = cssText;
        styleElement.setAttribute('data-css-file', cssFile);
        document.head.appendChild(styleElement);
    } catch (error) {}
}
/*--------------------------------------------*/

// webosu
/*--------------------------------------------*/
const iframe = document.createElement('iframe');
iframe.src = "https://webosu.online/";
iframe.className = "osuplay";
iframe.style.border = "none";
document.body.appendChild(iframe);
/*--------------------------------------------*/

// Achtung Alert
/*--------------------------------------------*/
fetch('http://127.0.0.1:2007/assets/Alert.html')
    .then(response => response.text())
    .then(html => {
        const background = document.createElement('div');
        background.classList.add('notification_background');
        background.innerHTML = html;

        const button = background.querySelector('.notification_ok_button');
        button.onclick = function() {
            background.style.transition = 'opacity 0.5s ease';
            background.style.opacity = '0';
            setTimeout(() => background.remove(), 500);
        };

        document.body.appendChild(background);
    });
/*--------------------------------------------*/