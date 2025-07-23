<template>
  <div class="item-center w-1/3 m-auto mt-10 shadow-2xl rounded-lg p-10">
    <form @submit.prevent="submitForm">
      <input type="text" v-model="formData.id" class="hidden" />
      <div class="w-5/6 m-auto space-y-4">
        <fwb-Input
          label="Name"
          input-class="input-style"
          placeholder="Enter Your Name"
          v-model="formData.name"
        />
        <fwb-Input
          label="Email"
          input-class="input-style"
          placeholder="Enter Your Email"
          v-model="formData.email"
        />
        <div>
          <label class="text-sm font-semibold">Class</label><br />
          <select class="select-style" v-model="formData.classId">
            <option selected disabled>Select One</option>
            <option
              v-for="(value, key) in classes"
              :key="key"
              :value="value.id"
            >
              {{ value.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="text-sm font-semibold">Section</label><br />
          <select class="select-style" v-model="formData.sectionId">
            <option selected disabled>Select One</option>
            <option
              v-for="(value, key) in sections"
              :key="key"
              :value="value.id"
            >
              {{ value.name }}
            </option>
          </select>
        </div>
        <fwb-Input
          type="number"
          label="Roll No."
          input-class="input-style"
          placeholder="Enter Your Roll No"
          v-model="formData.rollNo"
        />
        <div>
          <label class="text-sm font-semibold">Photo</label>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border border-sky-200 rounded-md cursor-pointer bg-slate-50"
            >
              <div
                class="flex flex-col items-center justify-center pt-5 pb-6"
                id="dropzone"
              >
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <div
                class="flex flex-col items-center justify-center w-full h-screen"
              >
                <img
                  id="image-preview"
                  class="hidden w-32 h-32 object-cover rounded-md"
                />
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                @change="showImage"
              />
            </label>
          </div>
        </div>
        <fwb-button gradient="cyan-blue" class="w-full" type="submit"
          >Create Account</fwb-button
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { FwbSelect, FwbInput, FwbFileInput, FwbButton } from "flowbite-vue";
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const classUrl = import.meta.env.VITE_CLASS_URL;
const sectionUrl = import.meta.env.VITE_SECTION_URL;
const studentUrl = import.meta.env.VITE_STUDENT_URL;

const classes = ref([]);
const sections = ref([]);

const name = ref("");
const email = ref("");
const classId = ref("");
const sectionId = ref("");
const rollNo = ref("");

const formData = ref({
  id: "",
  name: "",
  email: "",
  classId: "",
  sectionId: "",
  rollNo: "",
});

const fileB64 = ref(null);

const submitForm = async () => {
  try {
    const payload = {
      id: formData.value.id,
      name: formData.value.name,
      email: formData.value.email,
      classId: formData.value.classId,
      sectionId: formData.value.sectionId,
      rollNo: formData.value.rollNo,
      imageBase64: fileB64.value,
    };
    const response = await axios.post(studentUrl + "/saveData", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.mCode === 1111) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    console.error("Error saving data:", err);
  }
};

onMounted(() => {
  axios
    .get(classUrl + "/getAllData")
    .then((response) => {
      classes.value = response.data;
    })
    .catch((error) => {
      console.log("Error fetching classes:", error);
    });
  axios
    .get(sectionUrl + "/getAllData")
    .then((response) => {
      sections.value = response.data;
    })
    .catch((error) => {
      console.log("Error fetching sections: ", error);
    });
});

function showImage() {
  const fileInput = document.getElementById("dropzone-file");
  const imagePreview = document.getElementById("image-preview");
  const svgDiv = document.getElementById("dropzone");
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      svgDiv.classList.add("hidden");
      imagePreview.classList.remove("hidden");
      imagePreview.src = e.target.result;
      fileB64.value = e.target.result.split(",")[1];
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style></style>