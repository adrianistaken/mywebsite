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
    <div class="max-w-2xl w-full m-auto p-6">
        <div class="flex flex-col">

            <div v-if="post">
                <h1 class="text-2xl">{{ post.title }}</h1>
                <p class="text-xl mb-3">{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
                <div class="font-normal">
                    <PortableText :value="post.content" :components="customComponents" />
                </div>
            </div>
            <p v-else>Loading...</p>
        </div>

        <!-- <router-link to="/about"><button class="btn btn-info">Learn more about me</button></router-link> -->
    </div>


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