const categories = {
    nonpolar: {
        title: "비극성",
        text: "물과 잘 섞이지 않는 곁사슬이다. 주로 소수성을 띠고 단백질 안쪽에 모이는 경우가 많다."
    },
    polar: {
        title: "극성 중성",
        text: "중성이지만 물과 상호작용하기 쉬운 곁사슬이다."
    },
    negative: {
        title: "산성",
        text: "음전하를 띠기 쉬운 곁사슬이다. 염기성 아미노산과 잘 끌린다."
    },
    positive: {
        title: "염기성",
        text: "양전하를 띠기 쉬운 곁사슬이다. 산성 분자 (산성 아미노산)와 잘 끌린다."
    },
    special: {
        title: "특수 아미노산",
        text: "크기가 아주 작거나, 구조를 꺾거나, 다른 사슬과 결합을 만드는 특별한 곁사슬입니다."
    }
};

const aminoAcids = [
    { category: "nonpolar", name: "알라닌", english: "Alanine", code: "Ala / A", sidechain: "CH3", image: "alanine.png" },
    { category: "nonpolar", name: "발린", english: "Valine", code: "Val / V", sidechain: "가지 달린 탄화수소", image: "valine.png" },
    { category: "nonpolar", name: "류신", english: "Leucine", code: "Leu / L", sidechain: "큰 탄화수소", image: "leucine.png" },
    { category: "nonpolar", name: "아이소류신", english: "Isoleucine", code: "Ile / I", sidechain: "가지 달린 탄화수소", image: "isoleucine.png" },
    { category: "nonpolar", name: "메티오닌", english: "Methionine", code: "Met / M", sidechain: "황이 들어간 탄화수소", image: "methionine.png" },
    { category: "nonpolar", name: "페닐알라닌", english: "Phenylalanine", code: "Phe / F", sidechain: "벤젠 고리", image: "phenylalanine.png" },
    { category: "nonpolar", name: "트립토판", english: "Tryptophan", code: "Trp / W", sidechain: "큰 고리 구조", image: "tryptophan.png" },

    { category: "polar", name: "세린", english: "Serine", code: "Ser / S", sidechain: "OH 포함", image: "serine.png" },
    { category: "polar", name: "트레오닌", english: "Threonine", code: "Thr / T", sidechain: "OH 포함", image: "threonine.png" },
    { category: "polar", name: "티로신", english: "Tyrosine", code: "Tyr / Y", sidechain: "고리와 OH 포함", image: "tyrosine.png" },
    { category: "polar", name: "아스파라긴", english: "Asparagine", code: "Asn / N", sidechain: "아마이드", image: "asparagine.png" },
    { category: "polar", name: "글루타민", english: "Glutamine", code: "Gln / Q", sidechain: "아마이드", image: "glutamine.png" },

    { category: "negative", name: "아스파르트산", english: "Aspartic acid", code: "Asp / D", sidechain: "COO- 포함", image: "aspartic_acid.png" },
    { category: "negative", name: "글루탐산", english: "Glutamic acid", code: "Glu / E", sidechain: "COO- 포함", image: "glutamic_acid.png" },

    { category: "positive", name: "라이신", english: "Lysine", code: "Lys / K", sidechain: "NH3+ 포함", image: "lysine.png" },
    { category: "positive", name: "아르기닌", english: "Arginine", code: "Arg / R", sidechain: "양전하를 띠는 큰 구조", image: "arginine.png" },
    { category: "positive", name: "히스티딘", english: "Histidine", code: "His / H", sidechain: "고리형 염기", image: "histidine.png" },

    { category: "special", name: "글리신", english: "Glycine", code: "Gly / G", sidechain: "가장 작은 곁사슬", image: "glycine.png" },
    { category: "special", name: "프롤린", english: "Proline", code: "Pro / P", sidechain: "단백질 구조를 꺾기 쉬움", image: "proline.png" },
    { category: "special", name: "시스테인", english: "Cysteine", code: "Cys / C", sidechain: "이황화 결합 가능", image: "cysteine.png" }
];

const categoryTitle = document.querySelector("#categoryTitle");
const categoryText = document.querySelector("#categoryText");
const aminoList = document.querySelector("#aminoList");
const tabs = document.querySelectorAll(".tabs a");

function showCategory(categoryName) {
    const category = categories[categoryName] || categories.nonpolar;

    categoryTitle.textContent = category.title;
    categoryText.textContent = category.text;

    tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.getAttribute("href") === "#" + categoryName);
    });

    aminoList.innerHTML = "";

    aminoAcids
        .filter((amino) => amino.category === categoryName)
        .forEach((amino) => {
            const card = document.createElement("article");
            card.className = "amino-card";
            card.innerHTML = `
                <img src="${amino.image}" alt="${amino.name} 곁사슬 구조">
                <div>
                    <h3>${amino.name}</h3>
                    <p class="english">${amino.english} · ${amino.code}</p>
                    <p><strong>곁사슬:</strong> ${amino.sidechain}</p>
                </div>
            `;
            aminoList.appendChild(card);
        });
}

function categoryFromHash() {
    const hash = location.hash.replace("#", "");
    return categories[hash] ? hash : "nonpolar";
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
        const categoryName = link.getAttribute("href").replace("#", "");
        if (categories[categoryName]) {
            setTimeout(() => {
                document.querySelector("#dictionary").scrollIntoView({ behavior: "smooth" });
            }, 0);
        }
    });
});

window.addEventListener("hashchange", () => {
    showCategory(categoryFromHash());
});

showCategory(categoryFromHash());
