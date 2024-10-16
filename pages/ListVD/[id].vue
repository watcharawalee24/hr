<template>

  <div class="navbar navbar-light bg-light" v-for="item in filteredCardItems" :key="item.id">
    <h4><a class="navbar-brand">{{ item.name }}</a></h4>

    <!-- <div class="search_two">
      <div class="input-searchh">
        <div class="icon">
          <span class="fa fa-search"></span>
        </div>
        <input type="search" name="search" id="" placeholder="ค้นหาเรื่องที่ต้องการ">
      </div>
    </div> -->
  </div>

  <br>
  <div class="r">
    <div class="video" id="videoContainer">
      <video id="myVideo" :src="videoUrl" width="full" height="600" poster="#" controls autoplay></video>
    </div>
    <div class="p">
      <div class="bod">
        <h3>{{ currentVideo.subject }}</h3>
        <p>{{ currentVideo.name }}</p>
      </div>
      <div class="button-container">
        <button class="pretest-button">
          <i class="far fa-file-alt"></i><span class="hover-text">แบบทดสอบก่อนเรียน</span>
        </button>
        <div class="share-container">
          <button id="shareButton" style="font-size: small;"><i class="fas fa-share"></i>แชร์</button>
          <ul id="shareOptions" class="share-options">
            <li><a href="#" id="copyLink"><i class="fas fa-copy"></i> คัดลอกลิงค์</a></li>
            <li><a href="#" id="shareFacebook"><i class="fab fa-facebook-square"></i> แชร์ไปยังเฟสบุ๊ค</a></li>
            <li><a href="#" id="shareTwitter"><i class="fab fa-twitter"></i> แชร์ไปยังทวิตเตอร์</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>


  <!-- 🍓ส่วน List video 🍓-->
  <div class="container_VD">
    <div class="video-item" v-for="item in items">
      <div class="thumbnail">
        <div class="img_VD">
          <img :src="'/img/' + item.image" alt="">
          <!-- <img src="/img/cardKL1.jpg" alt=""> -->
        </div>
      </div>
      <div class="details">
        <h3>{{ item.subject }}</h3>
        <h7>{{ item.name }}</h7>
        <p>{{ item.subtopic }}</p>
        <p><a href="javascript:void(0);" @click="playVideo(item)">เข้าชม</a></p>
      </div>
    </div>
  </div>

</template>



<script setup lang="ts">

import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';


const { data: cardItems } = await useFetch('/api/card');
const filteredCardItems = computed(() => {
  const clickedCardId = route.params.id; // Assuming the ID is passed via route params
  return cardItems?.value?.filter(item => item.id === clickedCardId) || [];
});

const route = useRoute();
const id = route.params.id;

const { data: items } = await useFetch('/api/listgroup/'+id);
const currentVideo = ref(items.value.length!=0 ? items.value[0] : { subject: '', name: '', video: '' });
// const currentVideo = ref({ subject: '', name: '', video: '' });

const videoUrl = ref("/video/");
const playVideo = (item: any) => {
  videoUrl.value = "/video/" + item.video;
  currentVideo.value = item;
};

onMounted(() => {console.log(items);
  playVideo (items.value[0]);
  const pretestButton = document.querySelector('.pretest-button');
  const shareButton = document.getElementById('shareButton');
  const shareOptions = document.getElementById('shareOptions');
  const copyLinkButton = document.getElementById('copyLink');
  const shareFacebookButton = document.getElementById('shareFacebook');
  const shareTwitterButton = document.getElementById('shareTwitter');

  if (pretestButton) {
    pretestButton.addEventListener('click', function () {
      if (currentVideo.value && confirm('เริ่มทำแบบทดสอบ?')) {
        const newTab = window.open(currentVideo.value.url, '_blank');
        if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
          alert('โปรดอนุญาตให้เบราว์เซอร์เปิดหน้าต่างใหม่');
        }
      }
    });
  }

  if (shareButton && shareOptions) {
    shareButton.addEventListener('click', function () {
      if (shareOptions.style.display === 'block') {
        shareOptions.style.display = 'none';
      } else {
        shareOptions.style.display = 'block';

        // ปิดรายการแชร์เมื่อคลิกอื่นนอกจากปุ่มแชร์หรือรายการแชร์
        document.addEventListener('click', closeShareOptionsOutsideClick);
      }
    });
  }

  function closeShareOptionsOutsideClick(event) {
  if (event.target !== shareButton && !shareOptions.contains(event.target)) {
    shareOptions.style.display = 'none';
    document.removeEventListener('click', closeShareOptionsOutsideClick);
  }
}

if (copyLinkButton) {
      copyLinkButton.addEventListener('click', function (event) {
        event.preventDefault();
        const currentURL = window.location.href; // ดึง URL ของหน้าเว็บปัจจุบัน
        navigator.clipboard.writeText(currentURL).then(function () {
          alert('คัดลอกลิงค์แล้ว');
        }).catch(function (error) {
          console.error('การคัดลอกลิงค์ล้มเหลว: ', error);
        });
      });
    }

    if (shareFacebookButton) {
      shareFacebookButton.addEventListener('click', function (event) {
        event.preventDefault();
        const currentURL = encodeURIComponent(window.location.href); // เข้ารหัส URL
        const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;
        window.open(facebookShareURL, '_blank', 'width=600,height=400');
      });
    }

    if (shareTwitterButton) {
      shareTwitterButton.addEventListener('click', function (event) {
        event.preventDefault();
        const currentURL = encodeURIComponent(window.location.href); // เข้ารหัส URL
        const twitterShareURL = `https://twitter.com/intent/tweet?url=${currentURL}`;
        window.open(twitterShareURL, '_blank', 'width=600,height=400');
      });
    }
  });

</script>