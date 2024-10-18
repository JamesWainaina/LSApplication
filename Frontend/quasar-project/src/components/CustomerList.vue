<template>
    <div class="table-container">
        <h1>Customer List</h1>
        <q-table :rows="customers" :columns="columns">
            <template v-slot:body-cell-actions="props">
                <q-btn @click="goToUpdateCustomer(props.row.id)" label="Update" color="primary" />
                <q-btn @click="deleteCustomer(props.row.id)" label="Delete" color="red" />
            </template>
        </q-table>
        <q-btn @click="goToAddCustomer" label="Add Customer" color="primary" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Customer {
    id: number;
    name: string;
    email: string;
    address: string;
}

export default defineComponent({
    setup() {
        const customers = ref<Customer[]>([]);
        const columns = [
            { name: 'name', label: 'Name', align: 'left' as const, field: 'name' },
            { name: 'email', label: 'Email', align: 'left' as const, field: 'email' },
            { name: 'address', label: 'Address', align: 'left' as const, field: 'address' },
            { name: 'actions', label: 'Actions', align: 'center' as const, field: 'actions' }
        ];

        const router = useRouter();

        const goToAddCustomer = () => {
            router.push({ name: 'AddCustomer' });
        };

        const goToUpdateCustomer = (id: number) => {
            router.push({ name: 'AddCustomer', query: { id } });
        };

        const deleteCustomer = async (id: number) => {
            try {
                const response = await fetch(`http://localhost:3000/api/customers/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete customer');
                }

                // Refetch the customer list after deletion
                await fetchCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        };

        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/customers');
                customers.value = await response.json();
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        onMounted(fetchCustomers);

        return { customers, columns, goToAddCustomer, goToUpdateCustomer, deleteCustomer };
    },
});
</script>

<style scoped>
.table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: 20px;
    max-width: 600px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
