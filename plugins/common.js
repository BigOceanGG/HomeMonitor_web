import Vue from 'vue';
import format from 'date-fns/format';
import PageLayout from '~/components/PageLayout';
export default (ctx, inject) => {
  Vue.component('page-layout', PageLayout);
  Vue.filter('date', (value, formater = 'YYYY-MM-DD HH:mm:ss') => {
    // console.log(value, formater);
    return format(value, formater);
  });
  inject('formatDate', format);
};
