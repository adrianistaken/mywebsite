<template>
    <div>
        <h1>Blog</h1>
        <ul v-if="posts.length">
            <li v-for="post in posts" :key="post._id">
                <router-link :to="'/blog/' + post.slug.current">
                    {{ post.title }}
                </router-link>
            </li>
        </ul>
        <p v-else>Loading...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { sanity } from '../lib/sanity';

const posts = ref([]);

onMounted(async () => {
    posts.value = await sanity.fetch('*[_type == "blog"] | order(publishedAt desc)');
});
</script>

<style scoped></style>
