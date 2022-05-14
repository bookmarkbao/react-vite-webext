export interface Ajax_Interceptor_Dx {
  settings: {
    ajaxInterceptor_switchOn: boolean;
    ajaxInterceptor_rules: [];
  };
  originalXHR: any;
  originalFetch: any;
  myXHR: any;
  myFetch: any;
}

export default {}
