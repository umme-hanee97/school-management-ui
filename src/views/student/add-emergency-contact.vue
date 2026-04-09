<template>
  <div
    class="add-emergency-contact p-6 max-w-lg mx-auto bg-white rounded shadow"
  >
    <h2 class="text-2xl font-bold mb-4">Add Emergency Contact</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block mb-1 font-medium">Contact Name</label>
        <input
          v-model="contact.name"
          type="text"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Relationship</label>
        <select
          v-model="contact.relationshipId"
          class="w-full border rounded px-3 py-2"
          required
        >
          <option value="" disabled>Select relationship</option>
          <option v-for="rel in relationships" :key="rel.id" :value="rel.id">
            {{ rel.relationship }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Phone Number</label>
        <input
          v-model="contact.phoneNumber"
          type="tel"
          class="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Email (optional)</label>
        <input
          v-model="contact.email"
          type="email"
          class="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Contact
      </button>
    </form>
  </div>
</template>

<script>
import { studentService } from "@/services";
import lookupService from "@/services/lookupService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  name: "AddEmergencyContact",
  data() {
    return {
      contact: {
        name: "",
        relationshipId: "",
        phoneNumber: "",
        email: "",
        studentId: this.$route.params.studentId || null,
      },
      relationships: [],
    };
  },
  mounted() {
    // Load relationship types from lookupService
    this.loadRelationships();
  },
  methods: {
    async loadRelationships() {
      try {
        // You may need to adjust the response structure depending on your API
        const res = await lookupService.getRelationships();
        // Example: if response is { data: [{ value: 'father', label: 'Father' }, ...] }
        this.relationships = res.data;
      } catch (e) {
        this.relationships = [];
      }
    },
    async submitForm() {
      debugger;
      try {
        const EmergencyContactDto = {
          name: this.contact.name,
          relationshipId: this.contact.relationshipId,
          phoneNumber: this.contact.phoneNumber,
          email: this.contact.email,
          studentId: this.contact.studentId,
        };
        const res = await studentService.addEmergencyContact(EmergencyContactDto);
        if (res.data.status === 200) {
          toast.success("Emergency contact added!");
          this.$router.back();
        } else {
          toast.error("Failed to add contact. Please try again.");
        }
      } catch (e) {
        toast.error(
          "An error occurred while adding the contact. Please try again."
        );
      }
    },
  },
};
</script>

<style scoped>
.add-emergency-contact {
  margin-top: 40px;
}
</style>
