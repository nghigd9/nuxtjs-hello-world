<template>
  <div>
    <Header />
    <div class="body">
      <NuxtPage />
    </div>
    <Footer />
    <SearchModal />
    <ReportErrorModal ref="reportErrorModal" />
  </div>
</template>

<script setup>
// You can provide a composable to open the modal from anywhere
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

// Make the function available globally
provide('errorReport', useErrorReport());
</script>