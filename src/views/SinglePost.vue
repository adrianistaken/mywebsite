<script setup>
import { ref, onMounted, h } from 'vue';
import { useRoute } from 'vue-router';
import { sanity, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/vue';

const route = useRoute();
const post = ref(null);

onMounted(async () => {
    post.value = await sanity.fetch(
        '*[_type == "blog" && slug.current == $slug][0]',
        { slug: route.params.slug }
    );
});

// Custom render components for Portable Text
const customComponents = {
    types: {
        centeredSection: ({ value }) => {
            return h('div', { class: "interjection-container flex flex-row gap-3 justify-center items-center text-center my-3" }, [
                h('p', { class: "text-lg font-medium italic" }, value.text),
                value.image
                    ? h('img', { src: urlFor(value.image).width(800).url(), class: "w-15" })
                    : null
            ]);
        }
    }
};
</script>

<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>
        <p>{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
        <PortableText :value="post.content" :components="customComponents" />
    </div>
    <p v-else>Loading...</p>
</template>

<style scoped>
.interjection-container {
    max-width: 100%;
    background-color: red;
}

.interjection-container img {
    max-width: 50%;
}
</style>