const searchForm = document.querySelector(".search-form");
const searchBar = document.querySelector(".search-bar");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchData = searchBar.value.trim();

    // 빈칸일 경우 버튼 / 엔터 키 쳐도 아무 반응 없도록
    if (searchData === "") {
        return;
    }

    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchData)}`;
    // 입력한 키워드로 페이지 이동
});
