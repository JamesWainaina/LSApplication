<template>
    <div class="form-container">
        <h1>{{ customerId ? 'Update Customer' : 'Add Customer' }}</h1>
        <q-form @submit="submitForm">
            <q-input v-model="name" label="Name" required />
            <q-input v-model="email" label="Email" type="email" required />
            <q-input v-model="address" label="Address" required />
            <q-btn label="Submit" type="submit" color="primary" />
        </q-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const name = ref('');
        const email = ref('');
        const address = ref('');
        const customerId = ref<number | null>(null); // Initialize customerId
        const router = useRouter();

        // Function to fetch customer details if updating
        const fetchCustomerDetails = async (id: number) => {
            try {
                const response = await fetch(`http://localhost:3000/api/customers/${id}`);
                const customer = await response.json();
                name.value = customer.name;
                email.value = customer.email;
                address.value = customer.address;
            } catch (error) {
                console.error('Error fetching customer details:', error);
            }
        };

        onMounted(() => {
            const query = router.currentRoute.value.query;
            if (query.id) {
                customerId.value = Number(query.id);
                fetchCustomerDetails(customerId.value); // Fetch details for the customer to update
            }
        });

        const submitForm = async () => {
            try {
                const method = customerId.value ? 'PUT' : 'POST'; // Determine method based on customerId
                const url = customerId.value
                    ? `http://localhost:3000/api/customers/${customerId.value}`
                    : 'http://localhost:3000/api/customers';

                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name.value, email: email.value, address: address.value }),
                });

                if (!response.ok) {
                    throw new Error('Failed to save customer');
                }

                // Clear the form after submission
                name.value = '';
                email.value = '';
                address.value = '';
                router.push({ name: 'CustomerList' }); // Navigate back to the customer list
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };

        return { name, email, address, customerId, submitForm };
    },
});
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: auto;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: white;
    max-width: 400px;
}
</style>
