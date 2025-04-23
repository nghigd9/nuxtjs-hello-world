<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Global Modals/Components -->
    <SearchModal />
    <ReportErrorModal ref="reportErrorModal" />
  </div>
</template>

<script setup>
// Keep your global providers/refs here
const reportErrorModal = ref(null);

const useErrorReport = () => {
  const openReportModal = () => {
    console.log('Opening report error modal');
    reportErrorModal.value?.openModal();
  };

  return {
    openReportModal
  };
};
provide('errorReport', useErrorReport());

// Import global CSS if not done elsewhere (e.g., in nuxt.config)
// import '~/assets/scss/global.scss';
</script>