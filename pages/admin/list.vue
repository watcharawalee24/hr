<template>
  <div class="mt-5 container">
    <div class="card">
      <div class="card-header">
        <h4>List Video</h4>
        <button class="btn btn-primary float-end" @click="showCreateForm">Add New Video</button>
      </div>
      <div class="card-body">
        <div v-if="isLoading">
          <div class="text-center">Loading...</div>
        </div>
        <div v-else>
          <table class="table table-bordered">
            <thead>
              <tr>
                <!-- <th>ID</th> -->
                <!-- <th>Course ID</th> -->
                <th>Episode</th>
                <th>Name</th>
                <th>Image</th>
                <th>Video</th>
                <th>Subtopic</th>
                <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="video in listVideos" :key="video.id" >
                <!-- <td>{{ video.id }}</td> -->
                <!-- <td>{{ video.course_id }}</td> -->
                <td>{{ video.subject }}</td>
                <td>{{ video.name }}</td>
                <td>
                  <img v-if="video.image" :src="`/img/${video.image}`" alt="Course Image"
                    style="width: 100px; height: 100px;" />
                  <span v-else>No Image</span>
                </td>
                <!-- <td>
                  <img v-if="video.video" :src="`/video/${video.video}`" alt="Course video"
                    style="width: 100px; height: 100px;" />
                  <span v-else>No video</span>
                </td> -->

                <td>{{ video.video }}</td>
                <td>{{ video.subtopic }}</td>
                <td>{{ video.url }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="showEditForm(video)">Edit</button>
                  <button class="btn btn-danger btn-sm" @click="deleteVideo(video.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Form Modal -->
    <div v-if="showForm" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Video' : 'Add New Video' }}</h5>
            <button type="button" class="btn-close" @click="hideForm"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveVideo">
              <div class="row">
                <div class="col-md-6 mb-4">
                  <label for="course_id" class="form-label">Course ID:</label>
                  <input type="text" id="course_id" v-model="currentVideo.course_id" class="form-control" disabled />
                </div>
                <div class="col-md-6 mb-4">
                  <label for="subject" class="form-label">Episode:</label>
                  <input type="text" id="subject" v-model="currentVideo.subject" class="form-control" required />
                </div>
              </div>
              <div class="mb-4">
                <label for="name" class="form-label">Name:</label>
                <input type="text" id="name" v-model="currentVideo.name" class="form-control" required />
              </div>
              <div class="mb-4">
  <label for="image" class="form-label">Image:</label>
  <input type="file" id="image" @change="handleImageUpload" class="form-control" accept="image/*" required />
</div>
<div class="mb-4">
  <label for="video" class="form-label">Video:</label>
  <input type="file" id="video" @change="handleVideoUpload" class="form-control" accept="video/*" required />
</div>
              <div class="mb-4">
                <label for="subtopic" class="form-label">Subtopic:</label>
                <input type="text" id="subtopic" v-model="currentVideo.subtopic" class="form-control" />
              </div>
              <div class="mb-4">
                <label for="url" class="form-label">URL สำหรับทำข้อสอบ:</label>
                <input type="text" id="url" v-model="currentVideo.url" class="form-control" />
              </div>
              <div class="text-end">
                <button class="btn btn-primary">{{ isEditing ? 'Update' : 'Save' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="listpege">
    <router-link to="/admin/course" class="btn btn-primary">Go to Admin Course</router-link>
  </div>

</template>


<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    const courseId = route.query.course_id;
    const listVideos = ref([]);
    const isLoading = ref(true);
    const showForm = ref(false);
    const isEditing = ref(false);
    const currentVideo = ref({
      id: '',
      course_id: '',
      subject: '',
      name: '',
      img: '',
      video: '',
      subtopic: '',
      url: ''
    });
    const fetchVideos = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(`/api/listCRUD/get`);
    const data = await response.json();
    listVideos.value = data.filter(video => video.course_id === courseId);
  } catch (error) {
    console.error('Error fetching videos:', error);
  } finally {
    isLoading.value = false;
  }
};
    // Show create form
    const showCreateForm = () => {
      isEditing.value = false;
      currentVideo.value = {
        id: '',
        course_id: courseId,
        subject: '',
        name: '',
        img: '',
        video: '',
        subtopic: '',
        url: ''
      };
      showForm.value = true;
    };


    // Show edit form
    const showEditForm = (video: any) => {
      currentVideo.value = { ...video };
      isEditing.value = true;
      showForm.value = true;
    };

    // Hide form modal
    const hideForm = () => {
      showForm.value = false;
    };

    // Reset current video form
    const resetCurrentVideo = () => {
      currentVideo.value = {
        id: '',
        course_id: '',
        subject: '',
        name: '',
        image: '',
        video: '',
        subtopic: '',
        url: ''
      };
    };

    // Save or update video
    const saveVideo = async () => {
      const videoData = { ...currentVideo.value };

      try {
        const response = isEditing.value
          ? await fetch(`/api/listCRUD/put/${videoData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(videoData),
          })
          : await fetch('/api/listCRUD/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(videoData),
          });

        if (response.ok) {
          fetchVideos(); // Refresh the video list
          hideForm(); // Hide the form
        } else {
          console.error('Error saving video:', await response.text());
        }
      } catch (error) {
        console.error('Error saving video:', error);
      }
    };
    // Delete a video
    const deleteVideo = async (id: string) => {
      if (confirm('Are you sure you want to delete this video?')) {
        try {
          const response = await fetch(`/api/listCRUD/delete/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            fetchVideos(); // Refresh the video list after deletion
          } else {
            console.error('Error deleting video:', await response.text());
          }
        } catch (error) {
          console.error('Error deleting video:', error);
        }
      }
    };
    const handleImageUpload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          currentVideo.value.image = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
    const handleVideoUpload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          currentVideo.value.video = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };


    // Handle file change for image upload

    onMounted(fetchVideos);

    return {
      listVideos,
      isLoading,
      showForm,
      isEditing,
      currentVideo,
      fetchVideos,
      showCreateForm,
      showEditForm,
      saveVideo,
      deleteVideo,
      hideForm, 
      handleImageUpload,
      handleVideoUpload,// Add this function to the return object
    };
  },
};
</script>


<style scoped>
.table img {
  object-fit: cover;
  border-radius: 4px;
}

.modal-lg {
  max-width: 800px;
}

.modal-body {
  padding: 70px 50px;
}

.form-label {
  font-weight: 400;
  margin-bottom: 8px;
}

textarea.form-control {
  resize: none;
}

.text-end button {
  width: 120px;
}

.btn-close {
  cursor: pointer;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.listpege {
  display: flex;
  /* ใช้ Flexbox */
  justify-content: center;
  /* กำหนดให้อยู่กลาง */
  margin: 20px 0;
  /* กำหนดระยะห่าง */
}

.btn {
  /* ถ้าต้องการเพิ่มสไตล์ให้ปุ่ม */
  padding: 10px 20px;
  /* ขนาดปุ่ม */
}
</style>