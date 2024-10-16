<template>
    <div>
        <nav>
            <div class="nav">
                <h2 class="LOGO"><a href="#"><i class="fa fa-lightbulb-o"></i> E-Learning KM </a>
                </h2>
                <button class="btn-hamburger">
                    <i class="fa fa-bars" style="font-size:36px"></i>
                </button>

                <ul>
                    <li><nuxt-link to="/" exact-active-class="active" class="home-link">หน้าแรก</nuxt-link></li>
                    <li><nuxt-link to="/Card/all" exact-active-class="active" class="home-link">คลังความรู้</nuxt-link>
                    </li>
                    <li><a href="#" id="aboutUsLink">เกี่ยวกับเรา</a></li>
                    <li class="dropdown">
                        <nuxt-link class="dropdown-toggle">กลุ่มงาน</nuxt-link>
                        <ul class="dropdown-content">
                            <li v-for="item in fpageItems" :key="item.id">
                                <a href="#" @click.prevent="goToCL(item.id)">{{ item.group }}</a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </nav>
        <slot />
        <footer id="footer">
            <div class="footer-top">
                <div class="container">
                    <div class="footer-top-con">
                        <div class="footer-top-item">
                            <h4>ติดต่อเรา</h4>
                            <div class="footer-top-item-con">
                                <div class="info">
                                    <p class="info-title">กองบริหารทรัพยากรบุคคล สำนักงานปลัดกระทรวงสาธารณสุข
                                        88/20 หมู่ 4 ถนนติวานนท์ ตำบลตลาดขวัญ
                                        อำเภอเมือง จังหวัดนนทบุรี
                                        11000 โทรศัพท์ 0 2590 1421 โทรสาร 0 2590 1424 </p>
                                </div>
                            </div>
                        </div>
                        <div class="footer-top-item">
                            <h4></h4>
                            <p></p>
                        </div>
                        <div class="footer-top-item">
                            <h4>Stay connected</h4>
                            <p><i class="fa fa-facebook-square" aria-hidden="true"></i>Facebook</p>
                            <p><i class="fa fa-instagram" aria-hidden="true"></i>Instragram</p>
                            <p><i class="fa fa-twitter-square" aria-hidden="true"></i>twitter</p>
                            <p><i class="fa fa-youtube-play" aria-hidden="true"></i>Youtube</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <P>Copyright © 2024 กองบริหารทรัพยากรบุคคล สำนักงานปลัดกระทรวงสาธารณสุข. All rights reserved.
                </P>
            </div>
        </footer>

    </div>
</template>

<script setup lang="ts">
const { data: fpageItems } = await useFetch('/api/fpage');
const fpage = ref(fpageItems.value);
const goToCL = (id: any) => {
    const item = fpageItems.value?.find(item => item.id === id);
    if (item) {
        window.location.href = '/Card/' + id; // Redirect to '/Card/{id}' if id exists
    }
};
onMounted(() => {
    const btnHamburger = document.querySelector(".btn-hamburger");
    if (btnHamburger) {
        btnHamburger.addEventListener('click', () => {
            const navList = document.querySelector('nav ul');
            if (navList) {
                navList.classList.toggle('nav-active');
            }
        });
    }

    // 🌟ส่วนเกี่ยวกับเรา🌟
    const aboutUsLink = document.getElementById('aboutUsLink');
    if (aboutUsLink) {
        aboutUsLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const footer = document.getElementById('footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 🌟ส่วนกลุ่มงาน🌟
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', (event) => {
            event.preventDefault();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target as Node) && !dropdownToggle.contains(event.target as Node)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // 🌟ส่วนเลื่อนการ์ด🌟
    const preSlButton = document.getElementById('pre-sl');
    const nextSlButton = document.getElementById('next-sl');
    if (preSlButton && nextSlButton) {
        preSlButton.addEventListener('click', () => {
            const cardContainer = document.querySelector('.card-g');
            if (cardContainer) {
                cardContainer.scrollBy({
                    left: -300, // Adjust scroll distance as needed
                    behavior: 'smooth'
                });
            }
        });
        nextSlButton.addEventListener('click', () => {
            const cardContainer = document.querySelector('.card-g');
            if (cardContainer) {
                cardContainer.scrollBy({
                    left: 300, // Adjust scroll distance as needed
                    behavior: 'smooth'
                });
            }
        });
    }
});
</script>