<template>
    <div class="bookcard">
        <h3>{{book.title}}</h3>
        <p><strong>{{book.year}}</strong></p>
        <p>{{book.description}}</p>
    </div>
</template>
export default {
    props: {
        book: {
            type: Object
        }
    }
}