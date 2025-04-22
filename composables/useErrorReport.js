export const useErrorReport = () => {
  // Use inject to access the provided value
  const errorReportFn = inject('errorReport', null);
  
  const reportError = () => {
    if (errorReportFn) {
      errorReportFn.openReportModal();
    } else {
      console.error('Error report functionality not available');
    }
  };
  
  return {
    reportError
  };
};