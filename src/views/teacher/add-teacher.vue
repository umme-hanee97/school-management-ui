<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Add New Teacher</h1>
        <form @submit.prevent="submitForm" class="space-y-4">
        <FwbInput
            v-model="formData.name"
            label="Name"
            placeholder="Enter teacher's name"
            required
        />
        <FwbInput
            v-model="formData.email"
            type="email"
            label="Email"
            placeholder="Enter teacher's email"
            required
        />
        <FwbInput
            v-model="formData.subject"
            label="Subject"
            placeholder="Enter subject taught by the teacher"
            required
        />
        <FwbFileInput
            v-model="fileB64"
            label="Profile Picture (optional)"
            accept="image/*"
        />
        <FwbButton type="submit" :disabled="isLoading">
            {{ isLoading ? "Saving..." : "Add Teacher" }}
        </FwbButton>
        </form>
        </div>
</template>

<script>
export default {
    setup() {
        const formData = reactive({
            name: "",
            email: "",
            subject: "",
        });
        const fileB64 = ref("");
        const isLoading = ref(false);

        const submitForm = async () => {
            isLoading.value = true;
            try {
                // Simulate API call to save teacher data
                await new Promise((resolve) => setTimeout(resolve, 2000));
                console.log("Teacher Data:", formData);
                console.log("Profile Picture (Base64):", fileB64.value);
                // Reset form after submission
                formData.name = "";
                formData.email = "";
                formData.subject = "";
                fileB64.value = "";
            } catch (error) {
                console.error("Error saving teacher data:", error);
            } finally {
                isLoading.value = false;
            }
        };

        return {
            formData,
            fileB64,
            isLoading,
            submitForm,
        };
    },
}
</script>