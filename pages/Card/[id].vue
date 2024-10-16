<template>

  <!-- 🎯หน้ากลุ่มงาน🎯  -->

  <div class="navbar1 navbar-light bg-light">
    <div class="navbar-content1">
      <h4 class="navbar-brand1">{{ topic }}</h4>
      <div class="Group">
        <p>โลกแห่งการเรียนรู้ ไม่มีวันจบสิ้น ยิ่งเรียนยิ่งรู้ ยิ่งเพิ่มพลังทางปัญญา</p>
      </div>
      <div class="image-navbar-brand1">
        <img src="/img/PG1.png" alt="E-Learning KM">
      </div>
    </div>
  </div>


 <section class="courses">
  <div class="search_twoo">
    <div class="input-searchh">
      <div class="icon">
        <span class="fa fa-search"></span>
      </div>
      <input type="search" name="search" id="searchInput" placeholder="ค้นหาเรื่องที่ต้องการ" v-model="searchQuery"  >
    </div>
  </div>


  <!-- <section class="courses"> -->
    <div class="hontainer">
      <h2><i class="fa fa-book" style="font-size:30px; margin:1px 5px ;"></i> หลักสูตรการฝึกอบรม{{ topic }} </h2>
      <p>รวมเนื้อหาของ{{ topic }}พร้อมแบบฝึกก่อนเรียนทดสอบประสิทธิภาพก่อนเรียน</p>
      <div id="app">
        <div class="All">
          <h2 v-if="!showAllItems">
            <i class="fa fa-reorder" style="margin:1px 5px;"> </i> เนื้อหา
            <a href="#" class="see-more" @click.prevent="toggleCards">ดูเพิ่มเติม <i class="fa fa-angle-right" style="margin:1px 5px;"></i></a>
          </h2>
          <h2 v-else>
            <i class="fa fa-angle-down" style="margin:1px 5px;"></i> เนื้อหาทั้งหมด
            <a href="#" class="see-more" @click.prevent="toggleCards">ย้อนกลับ <i class="fa fa-angle-down"style="margin:1px 5px;"></i></a>
          </h2>
        </div>
      </div>

        
      <div class="container">
        <!-- ส่วนแผ่นการ์ด -->
        <div class="courses-grid">
          <div class="course-card" data-toggle="modal" data-target="#myModal" v-for="item in filteredItems"
            :key="item.id" @click="loadModel(item)">
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
    </div>
  </section>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
var url = '';
if (id == "all") {
  url = '/api/card/';
}
else {
  url = '/api/cardgroup/' + id;
}

const { data: cardItems } = await useFetch(url)
const displayedItems = ref(cardItems.value);

const searchQuery = ref(''); // To hold the search query

// Function to filter items based on search query
const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) {
    return cardItems.value || [];
  }
  const query = searchQuery.value.toLowerCase();
  return (cardItems.value || []).filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.subject.toLowerCase().includes(query)
  );
});


const modalItem = ref({
  id: '',
  name: '',
  content: '',
  teacher_name: '',
  toppic_sub: '',
  image: ''
});

const goToLV = (id: string) => {
  const item = cardItems.value.find(item => item.id === id);
  if (item) {
    window.location.href = '/ListVD/' + id;
  }
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

const showAllItems = ref(false);
const toggleCards = () => {
  showAllItems.value = !showAllItems.value;
  if (showAllItems.value) {
    displayedItems.value = cardItems.value || [];
  } else {
    displayedItems.value = cardItems.value?.slice(0, 4) || [];
  }
};

const topicMapping: Record<string, string> = {
  '1': 'กลุ่มงานอัตรากำลัง',
  '2': 'กลุ่มภารกิจอำนวยการ',
  '3': 'กลุ่มงานสรรหาบุคคล',
  '4': 'กลุ่มงานการจ้างงานทางเลือก',
  '5': 'กลุ่มงานยุทธศาสตร์',
  '6': 'กลุ่มงานบรรจุแต่งตั้ง',
  '7': 'กลุ่มงานเครื่องราชอิสริยาภรณ์',
  '8': 'กลุ่มงานประเมินบุคคลและวิชาการ',
  '9': 'กลุ่มงานเงินเดือน',
  '10': 'กลุ่มงานความต่อเนื่องฯ',
  '11': 'กลุ่มงานเทคโนโลยีสารสนเทศ',
};

const topicId = Array.isArray(id) ? id[0] : id;
const topic = topicMapping[topicId] || 'รวมคลังความรู้';

onMounted(() => {
  console.log(`หัวข้อปัจจุบัน: ${topic}`);
});

</script>
