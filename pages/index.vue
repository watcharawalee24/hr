<template>
  <!-- 🌷Branner🌷r -->
  <div class="pp">
    <div class="poster-container">
      <div class="poster">
        <img src="/img/branner.jpg" alt="">
      </div>
    </div>
  </div>

  <!-- 🌷Toppic News🌷 -->
  <div class="News">
    <h3>ข่าวสารน่าสนใจ</h3>
  </div>

  <!-- 🌷News Slide🌷 -->
  <div class="container">
    <div class="card-carousel-container">
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
            aria-label="Slide 3"></button>



        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" v-for="item in newsItems">
            <img :src="'/img/' + item.image" class="d-block w-100" alt="Slide 1">
          </div>

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>


  <!-- 🌷TOPPIC GROUP WORK🌷 -->
  <div class="groupwork" id="groupwork">
    <h3>กลุ่มงาน</h3>

  </div>

  <div class="sl-bt">
    <button id="pre-sl" class="press">&laquo;</button>
    <div class="card-g">
      <div class="card-main" v-for="item in fpageItems ">
        <div class="card-img">
          <img :src="'/img/' + item.image" alt="">
          <!-- <li><a href="#" >{{ item.group }}</a></li> -->
          <li><a href="#" @click.prevent="goToCL(item.id)">{{ item.group }}</a></li>

        </div>
      </div>

    </div>
    <button id="next-sl" class="press">&raquo;</button>
  </div>

  <!-- 🌷VideoCard🌷 -->
  <div class="Videocard">
    <h3>วิดีโอแนะนำ</h3>
  </div>

  <div class="container">
  <div class="courses-grid">
    <div class="course-card" data-toggle="modal" data-target="#myModal" v-for="item in randomItems " :key="item.id"
      @click="loadModel(item)">
      <div class="img">
        <img :src="'/img/' + item.image" alt="">
      </div>
      <h3>{{ item.name }}</h3>
      <p>{{ item.subject }}</p>
      <div><a href="#" @click="goToLV(item.id)" class="btn">เข้าชม</a></div>
    </div>

    <!-- ส่วนหน้าต่างย่อยในการ์ด -->
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- ส่วนหน้าต่างย่อยในการ์ด (ส่วนบน)  -->
          <div class="modal-header">
            <img :src="'/img/' + modalItem.image" alt="Header Image">
            <h4 class="modal-title">{{ modalItem.name }}</h4>
            <i class="fa fa-close close-icon" data-dismiss="modal"></i>
          </div>
          <div class="modal-body">
            <div class="section">
              <div class="section-title">
                <i class="fa fa-book"></i>
                <h5>เป้าหมายการเรียนรู้</h5>
              </div>
              <div class="section-content">
                <p>{{ modalItem.content }}</p>
              </div>
            </div>
            <div class="section">
              <div class="section-title">
                <i class="fa fa-users"></i>
                <h5>วิทยากร</h5>
              </div>
              <div class="section-content">
                <p>{{ modalItem.teacher_name }}</p>
              </div>
            </div>
            <div class="section">
              <div class="section-title">
                <i class="fa fa-pencil"></i>
                <h5>ประเด็นการเรียนรู้</h5>
              </div>
              <div style="white-space: pre-line;" class="section-content">
                {{ modalItem.toppic_sub }}
              </div>
            </div>
          </div>
          <!-- ส่วนหน้าต่างย่อยในการ์ด ส่วนล่าง (btn เปิด-ปิด)  -->
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="goToLV(modalItem.id)">Open</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const { data: newsItems } = await useFetch('/api/news');
const news = ref(newsItems.value);

const { data: cardItems } = await useFetch('/api/card');
const card = ref(cardItems.value);

const route = useRoute();
const id = route.params.id;

const goToLV = (id: string) => {
  const item = cardItems.value?.find(item => item.id === id);
  if (item) {
    window.location.href = '/ListVD/' + id;
  }
};

const randomItems = computed(() => {
  const itemsValue = cardItems.value;
  if (!itemsValue) return [];
  const shuffled = [...itemsValue].sort(() => 0.3 - Math.random());
  return shuffled.slice(0, 4);
});

const { data: fpageItems } = await useFetch('/api/fpage');
const fpage = ref(fpageItems.value);
const goToCL = (id: any) => {
  const item = fpageItems.value?.find(item => item.id === id);
  if (item) {
    window.location.href = '/Card/' + id;
  }
};

const modalItem = ref({
  id: '',
  name: '',
  content: '',
  teacher_name: '',
  toppic_sub: [''],
  image: ''
});

const showAllItems = ref(false);
const displayedItems = ref(cardItems.value ? cardItems.value.slice(0, 4) : []);

const toggleCards = () => {
  showAllItems.value = !showAllItems.value;
  displayedItems.value = showAllItems.value ? cardItems.value || [] : cardItems.value?.slice(0, 4) || [];
};

const loadModel = (item: any) => {
  modalItem.value.id = item.id;  // Set the id for modalItem
  modalItem.value.name = item.name;
  modalItem.value.content = item.content;
  modalItem.value.teacher_name = item.teacher_name;
  modalItem.value.toppic_sub = item.toppic_sub;
  modalItem.value.image = item.image;
  console.log(modalItem);
  console.log(item.name);
};
</script>
