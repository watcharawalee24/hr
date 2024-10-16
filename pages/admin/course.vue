<template>
  <div class="mt-5 container">
    <div class="card">
      <div class="card-header">
        <h4>Course List</h4>
        <button class="btn btn-primary float-end" @click="showCreateForm">Add New Course</button>
      </div>
      <div class="card-body">
        <div class="mb-4">
          <input
            type="text"
            v-model="searchQuery"
            class="form-control"
            placeholder="Search courses by gropwork_id or name"
          />
        </div>
        <div v-if="isLoading">
          <div class="text-center">Loading...</div>
        </div>
        <div v-else>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Name</th>
                <th>Image</th>
                <th>Content</th>
                <th>Teacher Name</th>
                <th>Topic Sub</th>
                <th>Group Work ID</th>
                <th>Actions</th>
                <th>Add Video</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in filteredCourses" :key="course.id">
                <td>{{ course.subject }}</td>
                <td>{{ course.name }}</td>
                <td>
                  <img v-if="course.image" :src="`/img/${course.image}`" alt="Course Image" style="width: 100px; height: 100px;" />
                  <span v-else>No Image</span>
                </td>
                <td>{{ course.content }}</td>
                <td>{{ course.teacher_name }}</td>
                <td>{{ course.toppic_sub }}</td>
                <td>{{ course.group_work_id }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="showEditForm(course)">Edit</button>
                  <button class="btn btn-danger btn-sm" @click="deleteCourse(course.id)">Delete</button>
                </td>
                <td>
                  <button class="btn btn-primary" @click="showVideos(course.id)">Add New Video</button>
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
            <h5 class="modal-title">{{ isEditing ? 'Edit Course' : 'Add New Course' }}</h5>
            <button type="button" class="btn-close" @click="hideForm"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveCourse">
              <div class="row">
                <div class="col-md-6 mb-4">
                  <label for="subject" class="form-label">Subject:</label>
                  <input type="text" id="subject" v-model="currentCourse.subject" class="form-control" required />
                </div>
                <div class="col-md-6 mb-4">
                  <label for="name" class="form-label">Name:</label>
                  <input type="text" id="name" v-model="currentCourse.name" class="form-control" required />
                </div>
              </div>
              <div class="col-md-6 mb-4">
  <label for="image" class="form-label">Image:</label>
  <input type="file" id="image" @change="handleImageUpload" accept="image/*" class="form-control" required />
</div>
              <div class="row">
                <div class="col-md-6 mb-4">
                  <label for="content" class="form-label">Content:</label>
                  <textarea id="content" v-model="currentCourse.content" class="form-control" rows="4" required></textarea>
                </div>
                <div class="col-md-6 mb-4">
                  <label for="toppic_sub" class="form-label">Topic Sub:</label>
                  <textarea type="text" id="toppic_sub" v-model="currentCourse.toppic_sub" class="form-control" rows="4" required></textarea>
                </div>
              </div>
              <div class="mb-4">
                <label for="teacher_name" class="form-label">Teacher Name:</label>
                <input type="text" id="teacher_name" v-model="currentCourse.teacher_name" class="form-control" required />
              </div>
              <div class="row">
                <div class="mb-4">
                  <label for="group_work_id" class="form-label">Group Work ID:</label>
                  <select id="group_work_id" v-model="currentCourse.group_work_id" class="form-control">
                    <option value="" disabled>Select Group Work ID</option>
                    <option v-for="i in 11" :key="i" :value="i">{{ i }}</option>
                  </select>
                </div>
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
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';

export default {
  async setup() {
    const course = ref([]);
    const isLoading = ref(true);
    const showForm = ref(false);
    const isEditing = ref(false);
    const currentCourse = ref({
      id: '',
      subject: '',
      name: '',
      image: '',
      content: '',
      teacher_name: '',
      toppic_sub: '',
      group_work_id: ''
    });
    const searchQuery = ref(''); // ตัวแปรสำหรับช่องค้นหา

    const fetchCourses = async () => {
      isLoading.value = true;
      try {
        const response = await fetch('/api/CRUD/get');
        const data = await response.json();
        course.value = data;
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const filteredCourses = computed(() => {
      if (!searchQuery.value) return course.value;
      return course.value.filter(course =>
        String(course.group_work_id).toLowerCase().includes(searchQuery.value.toLowerCase()) || // แปลงเป็น string เพื่อให้ค้นหาได้
        course.subject.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const saveCourse = async () => {
      const courseData = { ...currentCourse.value };

      try {
        const response = isEditing.value
          ? await fetch(`/api/CRUD/put/${courseData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData),
          })
          : await fetch('/api/CRUD/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData),
          });

        if (response.ok) {
          fetchCourses(); // Refresh the video list
          hideForm(); // Hide the form
        } else {
          console.error('Error saving course:', await response.text());
        }
      } catch (error) {
        console.error('Error saving course:', error);
      }
    };

    const deleteCourse = async (id: string) => {
      if (confirm('Are you sure you want to delete this course?')) {
        try {
          const response = await fetch(`/api/CRUD/delete/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            await fetchCourses();
          } else {
            console.error('Error deleting course:', await response.text());
          }
        } catch (error) {
          console.error('Error deleting course:', error);
        }
      }
    };

    const showCreateForm = () => {
      isEditing.value = false;
      currentCourse.value = {
        id: '',
        subject: '',
        name: '',
        image: '',
        content: '',
        teacher_name: '',
        toppic_sub: '',
        group_work_id: ''
      };
      showForm.value = true;
    };

    const showEditForm = (course: any) => {
      isEditing.value = true;
      currentCourse.value = { ...course };
      showForm.value = true;
    };

    const hideForm = () => {
      showForm.value = false;
    };

    const showVideos = (courseId: string) => {
      window.location.href = `/admin/list?course_id=${courseId}`;
    };

    const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // อ่านไฟล์เป็น Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      currentCourse.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
    
    // หรือถ้าคุณต้องการเก็บเฉพาะชื่อไฟล์
    // currentCourse.value.image = file.name;
  }
};
    onMounted(fetchCourses);

    return {
      course,
      isLoading,
      showForm,
      isEditing,
      currentCourse,
      fetchCourses,
      saveCourse,
      showCreateForm,
      hideForm,
      deleteCourse,
      showEditForm,
      showVideos,
      searchQuery, // ส่งค่าตัวแปรค้นหาไปยัง template
      filteredCourses, // ส่งค่าตารางที่กรองแล้วไปยัง template
      handleImageUpload,
    };
  }
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
  justify-content: center;
  margin: 20px 0;
}
</style>
