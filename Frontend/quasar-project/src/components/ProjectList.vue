<template>
    <div class="table-container">
        <h1>Project List</h1>
        <q-table :rows="projects" :columns="columns">
            <template v-slot:body-cell-actions="props">
                <q-btn @click="goToUpdateProject(props.row.id)" label="Update" color="yellow" />
                <q-btn @click="deleteProject(props.row.id)" label="Delete" color="red" />
            </template>
        </q-table>
        <q-btn @click="goToAddProject" label="Add Project" color="primary" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Project {
    id: number; // Assuming you have an ID field
    name: string;
    description: string;
    customerId: number; // or whatever type customerId should be
}

export default defineComponent({
    setup() {
        const projects = ref<Project[]>([]); // Array to hold projects
        const columns = [
            { name: 'name', label: 'Name', align: 'left' as const, field: 'name' },
            { name: 'description', label: 'Description', align: 'left' as const, field: 'description' },
            { name: 'customerId', label: 'Customer ID', align: 'left' as const, field: 'customerId' },
            { name: 'actions', label: 'Actions', align: 'center' as const, field: 'actions' } // New actions column
        ];

        const router = useRouter();

        const goToAddProject = () => {
            router.push({ name: 'AddProject' });
        };

        const goToUpdateProject = (id: number) => {
            router.push({ name: 'AddProject', query: { id } });
        };

        const deleteProject = async (id: number) => {
            try {
                const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete project');
                }

                // Refetch the project list after deletion
                await fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        };

        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/projects');
                projects.value = await response.json();
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        onMounted(fetchProjects);

        return { projects, columns, goToAddProject, goToUpdateProject, deleteProject };
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
