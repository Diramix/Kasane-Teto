// Main setInterval
/*--------------------------------------------*/
setInterval(() => {
    updateBackgroundImage();
    updateVibeBackgroundImage();
    coverAndAssetsImagesElements();
    replaceTextInElements();
    updateText();
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
    if (targetElement) {
        targetElement.style.position = 'relative';
        targetElement.style.overflow = 'hidden';

        let blurElement = targetElement.querySelector('.blur-element');
        if (blurElement) {
            targetElement.removeChild(blurElement);
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

        const newBlurElement = document.createElement('div');
        newBlurElement.classList.add('blur-element');
        newBlurElement.style.position = 'absolute';
        newBlurElement.style.top = 0;
        newBlurElement.style.left = 0;
        newBlurElement.style.width = '100%';
        newBlurElement.style.height = '100%';
        newBlurElement.style.background = `url(${imgBackground}) center center / cover no-repeat`;
        newBlurElement.style.backgroundColor = '#26F4FE';
        newBlurElement.style.filter = 'blur(0px) brightness(0.5)';
        newBlurElement.style.zIndex = '1';
        targetElement.appendChild(newBlurElement);

        const childElements = targetElement.querySelectorAll(':scope > *:not(.additional-image-element):not(.blur-element)');
        childElements.forEach(child => {
            child.style.position = 'relative';
            child.style.zIndex = '3';
        });
    }
};
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
    'ъ': '',  // Удаляем "ъ"
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z',
    'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
    'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

function transliterate(text) {
    // Удаляем символ "ъ" из текста перед преобразованием
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
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const textChanges = [
    { sel: '.NavbarDesktop_navigation__dLUGW *', changes: [
        { st: 'Поиск', rt: 'Розыск' },
        { st: 'Главная', rt: 'БАЗА' },
        { st: 'Подкасты и книги', rt: ['Colorful x Sexy', 'Colorful x Melody'] },
        { st: 'Коллекция', rt: 'Склад' },
    ]},
    { sel: '.VibeBlock_controls__BpDFL *', changes: [
        { st: 'Моя волна', rt: ['teto territory', 'Minecraft Splash', '0401', 'I say love', 'Triple Baka!!!', 'Poteto', 'u― papaupapau — paupapa — !', 'PulseSync🗿', 'Включи эквалайзер...', 'Tetoris', 'Meme', 'F₂O'] },
    ]},
    { sel: '[data-test-id="QUALITY_SETTINGS_CONTEXT_MENU"] *', changes: [
        { st: 'Настройки звука', rt: 'Настройки банки' },
        { st: 'Превосходное', rt: 'TETO, TETO BEAM' },
        { st: 'Оптимальное', rt: 'KOTLETETO' },
        { st: 'Экономичное', rt: 'POTETO' },
        { st: 'Эквалайзер', rt: 'Хардбасс бассы' },
    ]},
    { sel: '.ReleaseNotesModal_root__RSw1p *', changes: [
        { st: 'Что нового?', rt: 'Апдейтов не будет. В Яндексе все стали анимешниками и фанатами ТЕТООООООООООО...' },
    ]}
];

function replaceTextInElements() {
    textChanges.forEach(({ sel, changes }) => {
        const elements = document.querySelectorAll(sel);
        elements.forEach(element => {
            changes.forEach(({ st, rt }) => {
                element.childNodes.forEach(child => {
                    if (child.nodeType === 3 && child.textContent.includes(st)) {
                        child.textContent = Array.isArray(rt) ? child.textContent.replace(st, getRandomElement(rt)) : child.textContent.replace(st, rt);
                    }
                });
            });
        });
    });
}
/*--------------------------------------------*/

document.addEventListener('click', function(event) {
    let target = event.target.closest('[aria-label="Выключить эквалайзер"]');
    if (target) {
        window.open('https://www.youtube.com/watch?v=b3tTC_TkLyE', '_blank');
    }
});
