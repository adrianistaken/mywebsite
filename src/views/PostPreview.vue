<template>
    <div class="max-w-2xl w-full m-auto p-6 bg-info/25 rounded">
        <div class="flex flex-col">
            <div class="flex justify-between">
                <router-link :to="'/blog/' + slug.current">
                    <h1 class="text-2xl">{{ title }}</h1>
                </router-link>
                <p>{{ new Date(publishedAt).toLocaleDateString() }}</p>
            </div>
            <div>
                <!-- <p>{{ content }}</p> -->
                <p class="font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua. Ut enim ad minim veniam, q...
                </p>
            </div>
            <!-- Show Tags -->
            <div v-if="tags">
                <span v-for="tag in tags" :key="tag" class="px-2 py-1 bg-gray-200 rounded-full text-sm mr-2">
                    {{ tag }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { sanity } from '../lib/sanity';

const props = defineProps({
    title: String,
    publishedAt: String,
    slug: String,
    tags: Array,
    content: String
});

const posts = ref([]);

onMounted(async () => {
    posts.value = await sanity.fetch('*[_type == "blog"] | order(publishedAt desc)');
});
</script>

<style scoped></style>
