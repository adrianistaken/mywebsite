<template>
    <div>
        <div v-if="posts.length" class="max-w-2xl w-full m-auto p-6">
            <div class="flex flex-col">
                <div class="">
                    <ul>
                        <li v-for="post in posts" :key="post._id" class="mb-3">
                            <PostPreview :title="post.title" :published-at="post.publishedAt" :slug="post.slug"
                                :tags="post.tags" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div v-else class="max-w-2xl w-full m-auto p-6">
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { sanity } from '../lib/sanity';
import PostPreview from './PostPreview.vue';

const posts = ref([]);

onMounted(async () => {
    posts.value = await sanity.fetch('*[_type == "blog"] | order(publishedAt desc)');
});
</script>

<style scoped></style>
