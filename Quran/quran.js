

let SurahsContainer = document.querySelector('.surahContainer');
getSurahs();

function getSurahs() {
    fetch( "https://api.alquran.cloud/v1/meta")

    .then(response => response.json())

    .then(data => {
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;

        SurahsContainer.innerHTML = "";
        for (let i = 0; i < numberOfSurahs; i++) {

            SurahsContainer.innerHTML += `
                <div class="surah">
                    <p>${surahs[i].name}</p>
                    <p>${surahs[i].englishName}</p>
                </div>
            `

        }

        let SurahsTitels = document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup');
        let AyatContainer = document.querySelector('.ayat');
        let displayedSurah = null;

        SurahsTitels.forEach((title, index) => {

            title.addEventListener('click', () => {
                title.scrollTo({
                    behavior: 'smooth',
                });



                fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
                    .then(response => response.json())
                    .then(data => {
                        AyatContainer.innerHTML = '';
                        let Ayat = data.data.ayahs;
                        let AyatName = data.data;

                    AyatContainer.innerHTML += `
                    <nav class="ayat-name">
                        <h1 class="surahName">${AyatName.name}</h1>
                        <h1 class="surahNum"> عدد الأيات : <span class="surah-num">( ${AyatName.numberOfAyahs} )</span></h1>
                        <div class="audio">
                            <audio class="ayah-audio" controls>
                                <source src="https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${AyatName.number}.mp3" type="audio/mp3">
                            </audio>
                        </div>
                    </nav>
                    <br>
                    `;

                    let allAyatText = "";

                    Ayat.forEach(aya => {
                        allAyatText += `
                        <span class="aya-text" style="font-family: quran;">${aya.text}</span>
                        <span class="label" style="font-size:24px;color:#399898;font-family: quran; ">﴿${aya.numberInSurah}﴾</span>`;
                    });
                    popup.classList.add('active');
                    document.body.style.overflow = 'hidden';

                    AyatContainer.innerHTML += `
                        <section class="all container">
                            <div id="ayats">
                                ${allAyatText}
                            </div>
                        </section>
                        <br>
                    `; 

                });
    

        });

    });

    let closePopup = document.querySelector('.close-popup');
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    })

    });
}



let fixedNav = document.querySelector(".header"),
    scrollBtn = document.querySelector(".scrollBtn");
        window.addEventListener("scroll", ()=>{
            scrollup()
        })

    scrollBtn.addEventListener('click',()=>{
        window.scrollTo({
            top : 0 ,
            behavior : "smooth"
        })
    })
scrollup()

function scrollup(){

    window.scrollY > 50 ? fixedNav.classList.add('active') : fixedNav.classList.
        remove('active');

    window.scrollY > 100 ? scrollBtn.classList.add('active') : scrollBtn.classList.
        remove('active'); 
}


