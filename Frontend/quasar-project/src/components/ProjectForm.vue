<template>
    <div class="form-container">
        <h1>Add Project</h1>
        <q-form @submit="submitForm">
            <q-input v-model="name" label="Project Name" required />
            <q-input v-model="description" label="Description" required />
            <q-input v-model="customerId" label="Customer ID" type="number" required />
            <q-btn label="Submit" type="submit" color="primary" />
        </q-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const name = ref('');
        const description = ref('');
        const customerId = ref('');
        const router = useRouter();

        const submitForm = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name.value, description: description.value, customerId: customerId.value }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create project');
                }

                // Clear the form after submission
                name.value = '';
                description.value = '';
                customerId.value = '';
                router.push({ name: 'ProjectList' }); // Navigate back to the project list
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };

        return { name, description, customerId, submitForm };
    },
});
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    /* Stack children vertically */
    align-items: center;
    /* Center horizontally */
    justify-content: center;
    /* Center vertically */
    height: 100vh;
    /* Full viewport height */
    margin: auto;
    /* Center the container */
    padding: 20px;
    /* Optional padding */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* Optional shadow for aesthetics */
    border-radius: 8px;
    /* Optional rounded corners */
    background-color: white;
    /* Optional background color */
    max-width: 400px;
    /* Limit the width of the form */
}
</style>
