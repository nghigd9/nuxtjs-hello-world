<template>
  <div class="modal-overlay" :class="{ 'is-active': modelValue }" @click="closeOnOutsideClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
        <button class="modal-close" @click="close">
          <Icon name="uil:times" />
        </button>
      </div>
      
      <div class="modal-body">
        <slot>
          <!-- Default content goes here -->
          No content provided
        </slot>
      </div>
      
      <div class="modal-footer">
        <slot name="footer">
          <button class="modal-button" @click="close">Close</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Modal'
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'close']);

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const closeOnOutsideClick = (event) => {
  if (props.closeOnClickOutside && event.target === event.currentTarget) {
    close();
  }
};

// Close on escape key press
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && props.modelValue) {
      close();
    }
  });
});

// Prevent body scrolling when modal is open
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Clean up
onBeforeUnmount(() => {
  document.body.style.overflow = '';
  document.removeEventListener('keydown', close);
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use 'sass:color';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($bg-primary, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  
  &.is-active {
    opacity: 1;
    visibility: visible;
  }
}

.modal-container {
  background-color: $bg-secondary;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transform: translateY(-20px);
  transition: transform 0.3s;
  
  .is-active & {
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid $border-color;
  
  h2 {
    margin: 0;
    color: $text-white-light;
    font-size: 1.5rem;
  }
}

.modal-close {
  background: transparent;
  border: none;
  color: $text-secondary;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: $primary-color;
  }
}

.modal-body {
  padding: 1.5rem;
  color: $text-secondary;
  font-size: 1rem;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid $border-color;
  gap: 0.75rem;
}

.modal-button {
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: $bg-tertiary;
  color: $text-white;
  border: 1px solid $border-color;
  
  &:hover {
    background-color: color.adjust($bg-tertiary, $lightness: -5%);
  }
  
  &.primary {
    background-color: $primary-color;
    border-color: $primary-color;
    color: $text-white;
    
    &:hover {
      background-color: color.adjust($primary-color, $lightness: -10%);
    }
  }
}
</style>