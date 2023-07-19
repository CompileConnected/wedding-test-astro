<template>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 content-around pt-[2rem]">
        <img v-for="image in images" :key="image.id" :src="image.url" alt="Image" class="w-full h-full" />
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Gallery',
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const images = props.images;

        return {
            images
        };
    }
});
</script>