<template>
  <div class="classes-page p-6">
    <h1 class="text-2xl font-bold mb-4">Classes</h1>
    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else>
      <div v-for="classItem in classes" :key="classItem.id" class="mb-4">
        <div
          class="cursor-pointer bg-blue-100 hover:bg-blue-200 p-4 rounded shadow flex justify-between items-center"
          @click="toggleClass(classItem.id)"
        >
          <div>
            <span class="font-semibold">{{ classItem.className }}</span>
            <!-- <span class="ml-2 text-sm text-gray-600">({{ classItem.data }})</span> -->
          </div>
          <span>
            <svg v-if="expandedClass === classItem.id" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01-1.04-1.08l4.65-4.25a.75.75 0 011.08 0l4.65 4.25a.75.75 0 01-1.08 1.04L10 10.707l-3.71 4.06z" clip-rule="evenodd" /></svg>
          </span>
        </div>
        <div v-if="expandedClass === classItem.id" class="ml-8 mt-2">
          <div v-for="section in classItem.sections" :key="section.id" class="bg-white p-3 rounded mb-2 border">
            <div class="flex justify-between">
              <span class="font-medium">Section: {{ section.sectionName }}</span>
              <!-- <span class="text-sm text-gray-600">{{ section.data }}</span> -->
               <router-link :to="`/students/${classItem.id}/${section.id}`" class="text-sm text-blue-500 bg-blue-100 px-3 py-1 rounded">Students</router-link>
               <router-link :to="`/classes/${classItem.id}/sections/${section.id}/routine`" class="text-sm text-blue-500 ml-4 bg-orange-100 px-3 py-1 rounded">Routine</router-link>
               <!-- <button class="text-sm text-blue-500 bg-blue-100 px-3 py-1 rounded">Students</button>
               <button class="text-sm text-blue-500 ml-4 bg-orange-100 px-3 py-1 rounded">Routine</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getClasses } from '../services/classService';

export default {
  name: 'ClassesPage',
  setup() {
    const classes = ref([]);
    const loading = ref(true);
    const expandedClass = ref(null);


    const fetchClasses = async () => {
      loading.value = true;
      try {
        const classData = await getClasses();
        classes.value = classData;
        
      } catch (e) {
        classes.value = [];
      }
      loading.value = false;
    };

    const toggleClass = (classId) => {
      expandedClass.value = expandedClass.value === classId ? null : classId;
    };

    onMounted(fetchClasses);

    return {
      classes,
      loading,
      expandedClass,
      toggleClass,
    };
  },
};
</script>

<style scoped>
.classes-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>
