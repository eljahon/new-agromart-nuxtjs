import Vue from "vue";
const imgUrl  = 'https://imageproxy.cookzy.uz/200/'
const tools = {
  camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  },
  getFileUrl(name) {
    if (name) {
      if (name.includes("https://")) {
        return name;
      } else {
        return `${process.env.VUE_APP_IMG_URL}uploads${name}`;
      }
    }
  },
  cropUrl(url, word) {
    if (word && word.length > 0) {
      return url.substring(word.length);
    }
    return url.substring("/uploads".length);
  },
  getDateTime(stringdate) {
    const date = new Date(stringdate);
    const year = date.getFullYear();
    const month = this.getNol((1 + date.getMonth()).toString());
    const day = this.getNol(date.getDate().toString());
    const hours = this.getNol(date.getHours().toString());
    const minutes = this.getNol(date.getMinutes().toString());
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  },
  getDate(stringdate) {
    const date = new Date(stringdate);
    const year = date.getFullYear();
    const month = this.getNol((1 + date.getMonth()).toString());
    const day = this.getNol(date.getDate().toString());
    return `${day}.${month}.${year}`;
  },
  getNol(e) {
    return e.length > 1 ? e : "0" + e;
  },
  focusI(a) {
    document.getElementById(a).focus();
  },
  emptyObject(obj) {
    return Object.entries(obj).reduce(
      (a, [k, v]) => (v === null || v === "" ? a : ((a[k] = v), a)),
      {}
    );
  },
};
export default tools;
Vue.prototype.$tools = tools;
