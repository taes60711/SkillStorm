<template>
    <div v-if="visible" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <slot></slot>
            <button @click="close" class="modal-close-btn">關閉</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        close() {
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: rgb(103, 102, 102);
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
}

.modal-close-btn {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>